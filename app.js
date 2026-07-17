/* =====================================================
   QR Payment Manager — Lógica principal (ES6, sin frameworks)
   Persistencia: LocalStorage. Datos base: data/qr.json
===================================================== */

const STORAGE_KEY = "qr_payments";
const LAST_USED_KEY = "qr_last_used";
const SEED_URL = "data/qr.json";

/** Estado en memoria de la aplicación */
const state = {
  qrPayments: [],
  currentQr: null, // QR abierto actualmente en el modal
};

/* =====================================================
   REFERENCIAS DOM
===================================================== */
const dom = {
  loadingScreen: document.getElementById("loading-screen"),

  sidebar: document.getElementById("sidebar"),
  sidebarOverlay: document.getElementById("sidebar-overlay"),
  menuToggle: document.getElementById("menu-toggle"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),

  statTotal: document.getElementById("stat-total"),
  statCategorias: document.getElementById("stat-categorias"),
  statUltimo: document.getElementById("stat-ultimo"),
  recentGrid: document.getElementById("recent-grid"),
  quickAdd: document.getElementById("quick-add"),
  quickView: document.getElementById("quick-view"),

  searchInput: document.getElementById("search-input"),
  filterType: document.getElementById("filter-type"),
  sortSelect: document.getElementById("sort-select"),
  qrGrid: document.getElementById("qr-grid"),
  qrEmpty: document.getElementById("qr-empty"),

  categoriesGrid: document.getElementById("categories-grid"),

  form: document.getElementById("qr-form"),
  fId: document.getElementById("f-id"),
  fName: document.getElementById("f-name"),
  fType: document.getElementById("f-type"),
  fDescription: document.getElementById("f-description"),
  fImage: document.getElementById("f-image"),
  fImagePreview: document.getElementById("f-image-preview"),
  fColor: document.getElementById("f-color"),
  fStatus: document.getElementById("f-status"),
  fOrder: document.getElementById("f-order"),
  formCancel: document.getElementById("form-cancel"),

  btnExport: document.getElementById("btn-export"),
  importFile: document.getElementById("import-file"),
  btnReset: document.getElementById("btn-reset"),

  modal: document.getElementById("qr-modal"),
  modalClose: document.getElementById("modal-close"),
  modalImg: document.getElementById("modal-img"),
  modalName: document.getElementById("modal-name"),
  modalType: document.getElementById("modal-type"),
  modalDesc: document.getElementById("modal-desc"),
  modalDownload: document.getElementById("modal-download"),
  modalCopy: document.getElementById("modal-copy"),
  modalClient: document.getElementById("modal-client"),

  clientView: document.getElementById("client-view"),
  clientClose: document.getElementById("client-close"),
  clientImg: document.getElementById("client-img"),
  clientName: document.getElementById("client-name"),
  clientInfo: document.getElementById("client-info"),

  toastContainer: document.getElementById("toast-container"),
};

/* =====================================================
   INICIALIZACIÓN
===================================================== */
document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadQrPayments();
  bindEvents();
  populateFilterOptions();
  renderAll();
  hideLoadingScreen();
}

/** Carga los QR desde LocalStorage, o desde el JSON semilla si es la primera vez */
async function loadQrPayments() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    state.qrPayments = JSON.parse(stored);
    return;
  }

  try {
    const response = await fetch(SEED_URL);
    const data = await response.json();
    state.qrPayments = data.qrPayments || [];
  } catch (error) {
    state.qrPayments = [];
  }

  saveQrPayments();
}

/** Persiste el listado actual de QR en LocalStorage */
function saveQrPayments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.qrPayments));
}

function hideLoadingScreen() {
  dom.loadingScreen.classList.add("hidden");
  setTimeout(() => dom.loadingScreen.remove(), 400);
}

/* =====================================================
   NAVEGACIÓN (SIDEBAR / VISTAS)
===================================================== */
function bindEvents() {
  dom.navItems.forEach((item) => {
    item.addEventListener("click", () => switchView(item.dataset.view));
  });

  dom.menuToggle.addEventListener("click", toggleSidebar);
  dom.sidebarOverlay.addEventListener("click", closeSidebar);

  dom.quickAdd.addEventListener("click", () => switchView("agregar"));
  dom.quickView.addEventListener("click", () => switchView("misqr"));

  dom.searchInput.addEventListener("input", renderQrGrid);
  dom.filterType.addEventListener("change", renderQrGrid);
  dom.sortSelect.addEventListener("change", renderQrGrid);

  dom.form.addEventListener("submit", handleFormSubmit);
  dom.formCancel.addEventListener("click", resetForm);
  dom.fImage.addEventListener("change", handleImagePreview);

  dom.btnExport.addEventListener("click", exportData);
  dom.importFile.addEventListener("change", importData);
  dom.btnReset.addEventListener("click", resetData);

  dom.modalClose.addEventListener("click", closeModal);
  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) closeModal();
  });
  dom.modalDownload.addEventListener("click", () => downloadQr(state.currentQr));
  dom.modalCopy.addEventListener("click", () => copyQrInfo(state.currentQr));
  dom.modalClient.addEventListener("click", () => openClientView(state.currentQr));

  dom.clientClose.addEventListener("click", closeClientView);
}

function switchView(viewName) {
  dom.views.forEach((view) => view.classList.toggle("active", view.id === `view-${viewName}`));
  dom.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  closeSidebar();

  if (viewName === "misqr") renderQrGrid();
  if (viewName === "categorias") renderCategories();
  if (viewName === "inicio") renderDashboard();
}

function toggleSidebar() {
  dom.sidebar.classList.toggle("open");
  dom.sidebarOverlay.classList.toggle("open");
}

function closeSidebar() {
  dom.sidebar.classList.remove("open");
  dom.sidebarOverlay.classList.remove("open");
}

/* =====================================================
   RENDER: DASHBOARD
===================================================== */
function renderAll() {
  renderDashboard();
  renderQrGrid();
  renderCategories();
}

function renderDashboard() {
  const total = state.qrPayments.length;
  const categorias = new Set(state.qrPayments.map((qr) => qr.type)).size;
  const lastUsed = getLastUsedQr();

  dom.statTotal.textContent = total;
  dom.statCategorias.textContent = categorias;
  dom.statUltimo.textContent = lastUsed ? lastUsed.name : "—";

  const recent = [...state.qrPayments]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 4);

  renderCardsInto(dom.recentGrid, recent);
}

function getLastUsedQr() {
  const lastId = localStorage.getItem(LAST_USED_KEY);
  if (!lastId) return null;
  return state.qrPayments.find((qr) => String(qr.id) === lastId) || null;
}

/* =====================================================
   RENDER: MIS QR (búsqueda, filtro, orden)
===================================================== */
function populateFilterOptions() {
  const types = [...new Set(state.qrPayments.map((qr) => qr.type))].sort();

  dom.filterType.innerHTML = '<option value="">Todas las categorías</option>' +
    types.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join("");
}

function renderQrGrid() {
  const search = dom.searchInput.value.trim().toLowerCase();
  const type = dom.filterType.value;
  const sortBy = dom.sortSelect.value;

  let list = state.qrPayments.filter((qr) => {
    const matchesSearch = qr.name.toLowerCase().includes(search);
    const matchesType = !type || qr.type === type;
    return matchesSearch && matchesType;
  });

  list = sortQrList(list, sortBy);

  dom.qrEmpty.hidden = list.length > 0;
  renderCardsInto(dom.qrGrid, list);
}

function sortQrList(list, sortBy) {
  const sorted = [...list];

  if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "type") sorted.sort((a, b) => a.type.localeCompare(b.type));
  else sorted.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return sorted;
}

/** Genera las tarjetas QR dentro de un contenedor dado */
function renderCardsInto(container, list) {
  container.innerHTML = list.map(buildQrCardHtml).join("");

  container.querySelectorAll(".qr-card").forEach((card) => {
    const id = card.dataset.id;
    card.querySelector(".js-view").addEventListener("click", () => openModal(id));
    card.querySelector(".js-download").addEventListener("click", () => downloadQr(findQr(id)));
    card.querySelector(".js-edit").addEventListener("click", () => editQr(id));
    card.querySelector(".js-delete").addEventListener("click", () => deleteQr(id));
  });
}

function buildQrCardHtml(qr) {
  const isActive = qr.status === "active";

  return `
    <div class="qr-card" data-id="${qr.id}" style="--accent:${qr.color || "#2563EB"}">
      <div class="qr-card-header">
        <h3 class="qr-card-title">💳 ${escapeHtml(qr.name)}</h3>
        <span class="badge ${isActive ? "" : "badge-inactive"}">${isActive ? "Activo" : "Inactivo"}</span>
      </div>

      <div class="qr-card-image">
        <img src="${qr.image}" alt="${escapeHtml(qr.name)}">
      </div>

      <p class="qr-card-type">${escapeHtml(qr.type)}</p>
      <p class="qr-card-desc">${escapeHtml(qr.description || "")}</p>

      <div class="qr-card-actions">
        <button class="btn btn-secondary btn-sm js-view"><i class="fa-solid fa-eye"></i> Mostrar</button>
        <button class="btn btn-secondary btn-sm js-download"><i class="fa-solid fa-download"></i></button>
        <button class="btn btn-secondary btn-sm js-edit"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-danger btn-sm js-delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
}

/* =====================================================
   RENDER: CATEGORÍAS
===================================================== */
function renderCategories() {
  const counts = {};
  state.qrPayments.forEach((qr) => {
    counts[qr.type] = (counts[qr.type] || 0) + 1;
  });

  const entries = Object.entries(counts);

  dom.categoriesGrid.innerHTML = entries.length
    ? entries.map(([type, count]) => `
      <div class="category-card" data-type="${escapeHtml(type)}">
        <i class="fa-solid fa-folder"></i>
        <p>${escapeHtml(type)}</p>
        <p class="category-count">${count}</p>
      </div>`).join("")
    : '<p class="empty-state">Aún no hay categorías registradas.</p>';

  dom.categoriesGrid.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      dom.filterType.value = card.dataset.type;
      switchView("misqr");
    });
  });
}

/* =====================================================
   FORMULARIO: AGREGAR / EDITAR QR
===================================================== */
function handleImagePreview() {
  const file = dom.fImage.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    dom.fImagePreview.src = reader.result;
    dom.fImagePreview.hidden = false;
  };
  reader.readAsDataURL(file);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const id = dom.fId.value;
  const existing = id ? findQr(id) : null;

  const commitQr = (imageData) => {
    const qr = {
      id: existing ? existing.id : Date.now(),
      name: dom.fName.value.trim(),
      type: dom.fType.value,
      description: dom.fDescription.value.trim(),
      image: imageData || (existing ? existing.image : ""),
      color: dom.fColor.value,
      status: dom.fStatus.value,
      order: Number(dom.fOrder.value) || 1,
    };

    if (existing) {
      state.qrPayments = state.qrPayments.map((item) => (item.id === existing.id ? qr : item));
    } else {
      state.qrPayments.push(qr);
    }

    saveQrPayments();
    populateFilterOptions();
    renderAll();
    resetForm();
    switchView("misqr");
    showToast(existing ? "QR actualizado correctamente" : "QR guardado correctamente");
  };

  const file = dom.fImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => commitQr(reader.result);
    reader.readAsDataURL(file);
  } else {
    commitQr(null);
  }
}

function editQr(id) {
  const qr = findQr(id);
  if (!qr) return;

  dom.fId.value = qr.id;
  dom.fName.value = qr.name;
  dom.fType.value = qr.type;
  dom.fDescription.value = qr.description || "";
  dom.fColor.value = qr.color || "#2563EB";
  dom.fStatus.value = qr.status;
  dom.fOrder.value = qr.order || 1;
  dom.fImagePreview.src = qr.image;
  dom.fImagePreview.hidden = false;
  dom.fImage.value = "";

  switchView("agregar");
}

function deleteQr(id) {
  if (!confirm("¿Eliminar este código QR?")) return;

  state.qrPayments = state.qrPayments.filter((qr) => String(qr.id) !== String(id));
  saveQrPayments();
  populateFilterOptions();
  renderAll();
  showToast("QR eliminado correctamente");
}

function resetForm() {
  dom.form.reset();
  dom.fId.value = "";
  dom.fImagePreview.hidden = true;
  dom.fImagePreview.src = "";
  dom.fColor.value = "#2563EB";
  dom.fOrder.value = 1;
}

function findQr(id) {
  return state.qrPayments.find((qr) => String(qr.id) === String(id));
}

/* =====================================================
   MODAL: VER QR GRANDE
===================================================== */
function openModal(id) {
  const qr = findQr(id);
  if (!qr) return;

  state.currentQr = qr;
  dom.modalImg.src = qr.image;
  dom.modalName.textContent = qr.name;
  dom.modalType.textContent = qr.type;
  dom.modalDesc.textContent = qr.description || "";
  dom.modal.classList.add("open");
}

function closeModal() {
  dom.modal.classList.remove("open");
}

/* =====================================================
   MODO CLIENTE (pantalla completa)
===================================================== */
function openClientView(qr) {
  if (!qr) return;

  closeModal();
  dom.clientImg.src = qr.image;
  dom.clientName.textContent = qr.name;
  dom.clientInfo.textContent = qr.description || qr.type;
  dom.clientView.classList.add("open");

  localStorage.setItem(LAST_USED_KEY, qr.id);
  renderDashboard();
}

function closeClientView() {
  dom.clientView.classList.remove("open");
}

/* =====================================================
   ACCIONES: DESCARGAR / COPIAR
===================================================== */
function downloadQr(qr) {
  if (!qr) return;

  const link = document.createElement("a");
  link.href = qr.image;
  link.download = `${slugify(qr.name)}.${getImageExtension(qr.image)}`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  showToast("QR descargado correctamente");
}

function copyQrInfo(qr) {
  if (!qr) return;

  const info = `${qr.name}\nTipo: ${qr.type}\n${qr.description || ""}`;

  navigator.clipboard.writeText(info)
    .then(() => showToast("Información copiada al portapapeles"))
    .catch(() => showToast("No se pudo copiar la información", true));
}

function getImageExtension(src) {
  const match = src.match(/\.(png|jpg|jpeg|svg)(\?|$)/i);
  return match ? match[1] : "png";
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* =====================================================
   CONFIGURACIÓN: EXPORTAR / IMPORTAR / RESTABLECER
===================================================== */
function exportData() {
  const blob = new Blob([JSON.stringify({ qrPayments: state.qrPayments }, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "qr.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("Datos exportados correctamente");
}

function importData() {
  const file = dom.importFile.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      state.qrPayments = data.qrPayments || [];
      saveQrPayments();
      populateFilterOptions();
      renderAll();
      showToast("Datos importados correctamente");
    } catch (error) {
      showToast("El archivo JSON no es válido", true);
    }
  };
  reader.readAsText(file);
  dom.importFile.value = "";
}

function resetData() {
  if (!confirm("Esto eliminará todos tus QR guardados localmente. ¿Continuar?")) return;

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LAST_USED_KEY);
  loadQrPayments().then(() => {
    populateFilterOptions();
    renderAll();
    showToast("Datos restablecidos correctamente");
  });
}

/* =====================================================
   TOASTS (mensajes de éxito)
===================================================== */
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "toast-error" : ""}`;
  toast.innerHTML = `<i class="fa-solid ${isError ? "fa-circle-exclamation" : "fa-circle-check"}"></i> ${escapeHtml(message)}`;

  dom.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* =====================================================
   UTILIDADES
===================================================== */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}
