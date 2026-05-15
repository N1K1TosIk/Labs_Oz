const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }
        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push({
            column: keySort - 1,
            direction: desc
        });
    }
    return sortArr;
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        clearTable(idTable);
        if (window.currentTableData && window.currentTableData.length > 0) {
            createTable(window.currentTableData, idTable);
        } else {
            const table = document.getElementById(idTable);
            const header = Object.keys(buildings[0]);
            const thead = document.createElement('thead');
            thead.append(createHeaderRow(header));
            table.append(thead);
        }
        return false;
    }

    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift();

    const numericColumns = [4, 5];

    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;

            let comparison;
            if (numericColumns.indexOf(column) !== -1) {
                const a = parseFloat(firstCell);
                const b = parseFloat(secondCell);
                comparison = a - b;
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }

            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }
        return 0;
    });

    table.append(headerRow);
    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);
};
