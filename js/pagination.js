export function createPagination(rowsPerPage = 5) {

    let currentPage = 1;
    let totalPages = 1;
    let data = [];

    function setData(newData) {
        data = newData || [];
        totalPages = Math.ceil(data.length / rowsPerPage) || 1;

        // Si la página actual supera el total, la ajustamos
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
    }

    function getPaginatedData() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }

    function next() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }

    function prev() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function first() {
        currentPage = 1;
    }

    function last() {
        currentPage = totalPages;
    }

    function getPageInfo() {
        return {
            currentPage,
            totalPages
        };
    }

    function reset() {
        currentPage = 1;
    }

    return {
        setData,
        getPaginatedData,
        next,
        prev,
        first,
        last,
        getPageInfo,
        reset
    };
}
