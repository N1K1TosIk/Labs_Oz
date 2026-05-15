function getChartFormSettings(form) {
    const xKey = form.querySelector('input[name="chart_x"]:checked').value;
    const selectedYKeys = Array.from(form.querySelectorAll('input[name="chart_y"]:checked')).map((el) => el.value);
    const chartType = form.querySelector('select[name="chart_type"]').value;
    return { xKey, selectedYKeys, chartType };
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chart-form");
    const oyGroup = document.getElementById("oy-group");
    const oyError = document.getElementById("oy-error");

    const sourceData = window.bridgesData.map((it) => ({
        name: it.name,
        region: it.region,
        year: parseNumericValue(it.year),
        length: parseNumericValue(it.length),
        capacity: parseNumericValue(it.capacity),
    }));

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const settings = getChartFormSettings(form);
        if (!settings.selectedYKeys.length) {
            oyGroup.classList.add("error");
            oyError.textContent = "Выберите хотя бы одно значение";
            return;
        }

        oyGroup.classList.remove("error");
        oyError.textContent = "";
        const groupedData = groupForChart(sourceData, settings.xKey);
        drawBridgeChart(groupedData, settings.selectedYKeys, settings.chartType);
    });

    form.querySelectorAll('input[name="chart_y"]').forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            oyGroup.classList.remove("error");
            oyError.textContent = "";
        });
    });

    const initialData = groupForChart(sourceData, "region");
    drawBridgeChart(initialData, ["length_max"], "scatter");
});
