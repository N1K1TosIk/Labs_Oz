const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);
    const allSelect = dataForm.getElementsByTagName('select');

    for (let i = 0; i < allSelect.length; i++) {
        setSortSelect(head, allSelect[i]);
        if (i > 0) {
            allSelect[i].disabled = true;
        }
    }
    document.getElementById('fieldsSecondDesc').disabled = true;
};

const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    let nextCheckbox = document.getElementById(nextSelectId + 'Desc');

    nextSelect.disabled = false;
    nextCheckbox.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(parseInt(curSelect.value, 10));
        nextSelect.selectedIndex = 0;
    } else {
        nextSelect.disabled = true;
        nextCheckbox.disabled = true;
    }
};

const resetSort = (idTable, sortForm) => {
    const filterForm = document.getElementById("filter");

    filterForm.reset();
    sortForm.reset();
    setSortSelects(buildings[0], sortForm);

    clearTable(idTable);
    createTable(buildings, idTable);
};

document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');

    const form = document.getElementById("filter");
    const sortForm = document.getElementById("sort");

    form.querySelector('input[type="button"][value="Найти"]').addEventListener("click", function() {
        filterTable(buildings, 'list', form);
        setSortSelects(buildings[0], sortForm);
    });
    form.querySelector('input[type="button"][value="Очистить фильтры"]').addEventListener("click", function() {
        clearFilter('list', buildings, form);
        setSortSelects(buildings[0], sortForm);
    });

    setSortSelects(buildings[0], sortForm);
    document.getElementById("fieldsFirst").addEventListener("change", function() {
        changeNextSelect(this, "fieldsSecond");
    });
    sortForm.querySelector('input[type="button"][value="Сортировать"]').addEventListener("click", function() {
        sortTable('list', sortForm);
    });
    sortForm.querySelector('input[type="button"][value="Сбросить сортировку"]').addEventListener("click", function() {
        resetSort('list', sortForm);
    });
});
