function parseNumericValue(value) {
    if (value == null) return Number.NaN;
    const raw = String(value).trim().replace(",", ".");
    if (raw === "" || raw === "-") return Number.NaN;
    const num = Number(raw);
    return Number.isFinite(num) ? num : Number.NaN;
}

function groupForChart(data, xKey) {
    const grouped = d3.group(data, (d) => d[xKey]);
    const result = [];

    for (const [labelX, values] of grouped.entries()) {
        const lengths = values.map((v) => v.length).filter(Number.isFinite);
        const capacities = values.map((v) => v.capacity).filter(Number.isFinite);

        result.push({
            labelX: String(labelX),
            length_max: lengths.length ? d3.max(lengths) : Number.NaN,
            length_min: lengths.length ? d3.min(lengths) : Number.NaN,
            capacity_max: capacities.length ? d3.max(capacities) : Number.NaN,
            capacity_min: capacities.length ? d3.min(capacities) : Number.NaN,
        });
    }

    if (xKey === "year") {
        result.sort((a, b) => Number(a.labelX) - Number(b.labelX));
    } else {
        result.sort((a, b) => a.labelX.localeCompare(b.labelX, "ru"));
    }

    return result;
}
