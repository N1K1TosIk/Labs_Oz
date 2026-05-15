function getFormData(form) {
    const keyX = form.querySelector('input[name="ox"]:checked').value;
    const showMax = form.querySelector('input[name="oy"][value="max"]').checked;
    const showMin = form.querySelector('input[name="oy"][value="min"]').checked;
    const chartType = form.querySelector('select[name="chartType"]').value;

    return { keyX, showMax, showMin, chartType };
}

document.addEventListener("DOMContentLoaded", () => {
    const tableId = "build";
    const toggleButton = document.getElementById("toggle-table");
    const form = document.getElementById("settings-form");
    const oyGroup = document.getElementById("oy-group");
    const oyError = document.getElementById("oy-error");

    showTable(tableId, buildings);

    drawGraph(buildings, {
        keyX: "Страна",
        showMax: true,
        showMin: false,
        chartType: "scatter"
    });

    toggleButton.addEventListener("click", () => {
        if (toggleButton.textContent.trim() === "Показать таблицу") {
            showTable(tableId, buildings);
            toggleButton.textContent = "Скрыть таблицу";
            return;
        }

        hideTable(tableId);
        toggleButton.textContent = "Показать таблицу";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const dataForm = getFormData(form);

        if (!dataForm.showMax && !dataForm.showMin) {
            oyGroup.classList.add("error");
            oyError.textContent = "Выберите хотя бы одно значение";
            return;
        }

        oyGroup.classList.remove("error");
        oyError.textContent = "";
        drawGraph(buildings, dataForm);
    });

    form.querySelectorAll('input[name="oy"]').forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            oyGroup.classList.remove("error");
            oyError.textContent = "";
        });
    });
});
