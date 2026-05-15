const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        if (item.tagName !== "INPUT" || item.type === "button") continue;

        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type === "number") {
            if (item.value !== "") {
                valInput = Number(item.value);
            } else if (item.id.includes("From")) {
                valInput = -Infinity;
            } else if (item.id.includes("To")) {
                valInput = Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;

        Object.entries(item).forEach(([key, val]) => {
            const field = correspond[key];

            if (typeof val === "string") {
                const filterVal = datafilter[field];
                result &&= filterVal === "" || val.toLowerCase().includes(filterVal);
            } else if (typeof val === "number") {
                const from = datafilter[field[0]];
                const to = datafilter[field[1]];
                result &&= (val >= from && val <= to);
            }
        });

        return result;
    });

    clearTable(idTable);

    if (tableFilter.length === 0) {
        if (typeof window !== 'undefined') window.currentTableData = [];
        const table = document.getElementById(idTable);
        const header = Object.keys(data[0]);
        const thead = document.createElement("thead");
        thead.append(createHeaderRow(header));
        table.append(thead);
    } else {
        createTable(tableFilter, idTable);
    }
};

const clearFilter = (idTable, data, dataForm) => {
    for (const item of dataForm.elements) {
        if (item.tagName === "INPUT" && item.type !== "button") {
            item.value = "";
        }
    }
    clearTable(idTable);
    createTable(data, idTable);
};
