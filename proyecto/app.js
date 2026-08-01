/* =========================================================================
   NEXUS TRIBUTARIO — APP.JS
   Modular vanilla JS: icons, loader, sidebar, dropdowns, modal, toasts,
   table/timeline render, and Chart.js dashboards with sample data.
   ========================================================================= */

'use strict';

/* ---------------------------------------------------------------------
   Sample data
   --------------------------------------------------------------------- */
const DATA = {
  months: ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  impuestos: [162, 178, 171, 205, 194, 221],
  facturasEmitidas: [420, 468, 445, 512, 498, 561],
  facturasMonto: [138, 149, 142, 168, 159, 182],
  pagos: { pagado: 78, pendiente: 15, vencido: 7 },

  comprobantes: [
    { id: 'F-000482', sub: 'Factura electrónica', user: 'María Condori', nit: '1029384', tipo: 'Factura', monto: 'Bs 1,240.00', estado: 'pagado' },
    { id: 'F-000481', sub: 'Factura electrónica', user: 'Jorge Quispe', nit: '2938471', tipo: 'Factura', monto: 'Bs 3,890.50', estado: 'pendiente' },
    { id: 'R-000117', sub: 'Recibo de pago', user: 'Construcciones Andina SRL', nit: '1938222', tipo: 'Recibo', monto: 'Bs 12,400.00', estado: 'pagado' },
    { id: 'F-000480', sub: 'Factura electrónica', user: 'Lucía Fernández', nit: '3820192', tipo: 'Factura', monto: 'Bs 640.00', estado: 'vencido' },
    { id: 'D-000029', sub: 'Declaración jurada', user: 'Textiles del Sur SA', nit: '2018475', tipo: 'Declaración', monto: 'Bs 8,120.00', estado: 'pagado' },
    { id: 'F-000479', sub: 'Factura electrónica', user: 'Roberto Salinas', nit: '4092817', tipo: 'Factura', monto: 'Bs 275.00', estado: 'pagado' },
  ],

  timeline: [
    { text: 'Declaración F-200 presentada correctamente', time: 'Hace 24 min', status: 'success' },
    { text: 'Nuevo certificado NIT-3820 generado', time: 'Hace 1 h', status: '' },
    { text: 'Pago pendiente próximo a vencer', time: 'Hace 3 h', status: 'warning' },
    { text: 'Factura F-000480 marcada como vencida', time: 'Hace 5 h', status: 'error' },
    { text: 'Contribuyente Textiles del Sur SA registrado', time: 'Ayer, 18:40', status: '' },
  ],
};

const STATUS_META = {
  pagado: { label: 'Pagado', badge: 'badge-success' },
  pendiente: { label: 'Pendiente', badge: 'badge-warning' },
  vencido: { label: 'Vencido', badge: 'badge-error' },
};

/* ---------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------- */
function initIcons() {
  if (window.lucide) window.lucide.createIcons();
}

/* ---------------------------------------------------------------------
   Loader
   --------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('appLoader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 350);
  });
}

/* ---------------------------------------------------------------------
   Sidebar (mobile toggle)
   --------------------------------------------------------------------- */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');

  const open = () => { sidebar.classList.add('is-open'); overlay.classList.add('is-visible'); };
  const close = () => { sidebar.classList.remove('is-open'); overlay.classList.remove('is-visible'); };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);

  document.querySelectorAll('.nav-item[data-view]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
      item.classList.add('active');
      close();
      showToast({ type: 'info', title: item.querySelector('span').textContent, message: 'Sección disponible próximamente.' });
    });
  });
}

/* ---------------------------------------------------------------------
   Dropdowns (messages, notifications, user menu)
   --------------------------------------------------------------------- */
function initDropdowns() {
  const pairs = [
    ['messagesBtn', 'messagesPanel'],
    ['notifBtn', 'notifPanel'],
    ['userBtn', 'userPanel'],
  ];

  const panels = pairs.map(([btnId, panelId]) => ({
    btn: document.getElementById(btnId),
    panel: document.getElementById(panelId),
  }));

  function closeAll(except) {
    panels.forEach(({ panel }) => {
      if (panel !== except) panel?.classList.remove('is-open');
    });
  }

  panels.forEach(({ btn, panel }) => {
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !panel.classList.contains('is-open');
      closeAll();
      if (willOpen) panel.classList.add('is-open');
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}

/* ---------------------------------------------------------------------
   Theme toggle (dark default, light alternate)
   --------------------------------------------------------------------- */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const icon = () => btn?.querySelector('[data-lucide]');

  const apply = (theme) => {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    icon()?.setAttribute('data-lucide', theme === 'light' ? 'sun' : 'moon');
    initIcons();
  };

  const saved = localStorage.getItem('nexus-theme') || 'dark';
  apply(saved);

  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('nexus-theme', next);
    apply(next);
  });
}

/* ---------------------------------------------------------------------
   Modal
   --------------------------------------------------------------------- */
function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const openBtn = document.getElementById('newProcBtn');
  const closeBtn = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('modalCancel');
  const submitBtn = document.getElementById('modalSubmit');

  const open = () => backdrop.classList.add('is-open');
  const close = () => backdrop.classList.remove('is-open');

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  submitBtn?.addEventListener('click', () => {
    close();
    showToast({ type: 'success', title: 'Trámite creado', message: 'Tu solicitud fue registrada correctamente.' });
  });
}

/* ---------------------------------------------------------------------
   Toasts
   --------------------------------------------------------------------- */
const TOAST_ICONS = { success: 'check-circle-2', warning: 'alert-triangle', error: 'x-circle', info: 'info' };

function showToast({ type = 'info', title, message, duration = 4200 }) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'info' ? '' : type}`;
  toast.innerHTML = `
    <span class="toast-icon"><i data-lucide="${TOAST_ICONS[type] || 'info'}"></i></span>
    <div class="toast-body">
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
    <button class="toast-close" aria-label="Cerrar"><i data-lucide="x"></i></button>
  `;
  container.appendChild(toast);
  initIcons();

  const remove = () => {
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 260);
  };

  toast.querySelector('.toast-close').addEventListener('click', remove);
  setTimeout(remove, duration);
}

/* ---------------------------------------------------------------------
   Table render
   --------------------------------------------------------------------- */
function initTable() {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;

  tbody.innerHTML = DATA.comprobantes.map((row) => {
    const meta = STATUS_META[row.estado];
    return `
      <tr>
        <td>
          <div class="cell-doc">
            <strong>${row.id}</strong>
            <span>${row.sub}</span>
          </div>
        </td>
        <td>
          <div class="cell-user">
            <div class="avatar avatar-sm">${initials(row.user)}</div>
            <div class="cell-doc">
              <strong>${row.user}</strong>
              <span>NIT ${row.nit}</span>
            </div>
          </div>
        </td>
        <td>${row.tipo}</td>
        <td>${row.monto}</td>
        <td><span class="badge ${meta.badge}">${meta.label}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" title="Ver" data-action="view" data-id="${row.id}"><i data-lucide="eye"></i></button>
            <button class="icon-btn" title="Descargar" data-action="download" data-id="${row.id}"><i data-lucide="download"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'view') showToast({ type: 'info', title: `Comprobante ${id}`, message: 'Abriendo vista de detalle…' });
    if (action === 'download') showToast({ type: 'success', title: 'Descarga iniciada', message: `${id} se está descargando.` });
  });

  initIcons();
}

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

/* ---------------------------------------------------------------------
   Timeline render
   --------------------------------------------------------------------- */
function initTimeline() {
  const list = document.getElementById('timelineList');
  if (!list) return;

  list.innerHTML = DATA.timeline.map((item) => `
    <li class="timeline-item">
      <span class="timeline-dot ${item.status}"></span>
      <p>${item.text}</p>
      <span>${item.time}</span>
    </li>
  `).join('');
}

/* ---------------------------------------------------------------------
   Charts
   --------------------------------------------------------------------- */
function chartDefaults() {
  if (!window.Chart) return;
  Chart.defaults.font.family = "'Plus Jakarta Sans', 'Inter', sans-serif";
  Chart.defaults.color = '#B5C3D1';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
}

function styledTooltip() {
  return {
    backgroundColor: '#132F43',
    titleColor: '#FFFFFF',
    bodyColor: '#B5C3D1',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    padding: 10,
    cornerRadius: 10,
    displayColors: false,
  };
}

function initCharts() {
  if (!window.Chart) return;
  chartDefaults();

  const ctxImpuestos = document.getElementById('chartImpuestos');
  if (ctxImpuestos) {
    const ctx = ctxImpuestos.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(0, 230, 184, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 230, 184, 0.02)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: DATA.months,
        datasets: [{
          label: 'Impuestos',
          data: DATA.impuestos,
          borderColor: '#00E6B8',
          backgroundColor: gradient,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#0C2533',
          pointBorderColor: '#00E6B8',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { ...styledTooltip(), callbacks: { label: (c) => `Bs ${c.parsed.y}K` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 12 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: (v) => `${v}K` } },
        },
      },
    });
  }

  const ctxPagos = document.getElementById('chartPagos');
  if (ctxPagos) {
    new Chart(ctxPagos.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Pagado', 'Pendiente', 'Vencido'],
        datasets: [{
          data: [DATA.pagos.pagado, DATA.pagos.pendiente, DATA.pagos.vencido],
          backgroundColor: ['#20D97A', '#FFB020', '#FF5B6E'],
          borderColor: '#0C2533',
          borderWidth: 3,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: { ...styledTooltip(), callbacks: { label: (c) => `${c.label}: ${c.parsed}%` } },
        },
      },
    });
  }

  const ctxFacturacion = document.getElementById('chartFacturacion');
  if (ctxFacturacion) {
    new Chart(ctxFacturacion.getContext('2d'), {
      type: 'bar',
      data: {
        labels: DATA.months,
        datasets: [{
          label: 'Facturación',
          data: DATA.facturasMonto,
          backgroundColor: '#27C4FF',
          hoverBackgroundColor: '#5AD4FF',
          borderRadius: 8,
          maxBarThickness: 34,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...styledTooltip(), callbacks: { label: (c) => `Bs ${c.parsed.y}K` } },
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: (v) => `${v}K` } },
        },
      },
    });
  }
}

/* ---------------------------------------------------------------------
   Search shortcut (Ctrl/Cmd + K)
   --------------------------------------------------------------------- */
function initSearchShortcut() {
  const input = document.getElementById('globalSearch');
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input?.focus();
    }
  });
}

/* ---------------------------------------------------------------------
   Help button
   --------------------------------------------------------------------- */
function initHelp() {
  document.getElementById('helpBtn')?.addEventListener('click', () => {
    showToast({ type: 'info', title: 'Centro de ayuda', message: 'Consulta la documentación o contacta a soporte.' });
  });
}

/* ---------------------------------------------------------------------
   Boot
   --------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initLoader();
  initSidebar();
  initDropdowns();
  initTheme();
  initModal();
  initTable();
  initTimeline();
  initCharts();
  initSearchShortcut();
  initHelp();

  setTimeout(() => {
    showToast({ type: 'success', title: 'Bienvenido de nuevo', message: 'Tu sesión se inició correctamente.' });
  }, 900);
});
