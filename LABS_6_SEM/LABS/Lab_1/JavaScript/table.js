const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    if (!table) return;
    table.innerHTML = '';
};

const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    if (typeof window !== 'undefined' && data && data.length > 0) {
        window.currentTableData = data;
    }
    const header = Object.keys(data[0]);

    const headerRow = createHeaderRow(header);
    const thead = document.createElement('thead');
    thead.append(headerRow);
    table.append(thead);

    const bodyRows = createBodyRows(data);
    table.append(bodyRows);
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');
    const headers = Object.keys(data[0]);

    data.forEach(rowData => {
        const tr = document.createElement('tr');
        headers.forEach(key => {
            const td = document.createElement('td');
            td.innerHTML = rowData[key];
            tr.append(td);
        });
        tbody.append(tr);
    });

    return tbody;
};
