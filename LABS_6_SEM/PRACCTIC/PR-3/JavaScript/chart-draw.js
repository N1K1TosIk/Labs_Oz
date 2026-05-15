const CHART_SERIES = {
    length_max: { label: "Макс. длина", color: "#d32f2f" },
    length_min: { label: "Мин. длина", color: "#1976d2" },
    capacity_max: { label: "Макс. пропускная способность", color: "#2e7d32" },
    capacity_min: { label: "Мин. пропускная способность", color: "#f57c00" },
};

function getOverlapOffset(item, key, selectedYKeys, stepPx = 8) {
    const sameValueKeys = selectedYKeys.filter((seriesKey) => item[seriesKey] === item[key]);
    if (sameValueKeys.length <= 1) return 0;
    const index = sameValueKeys.indexOf(key);
    return (index - (sameValueKeys.length - 1) / 2) * stepPx;
}

function createChartScales(svg, groupedData, selectedYKeys) {
    const width = parseFloat(svg.style("width"));
    const height = parseFloat(svg.style("height"));
    const margin = { top: 20, right: 30, bottom: 120, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const yValues = [];
    groupedData.forEach((item) => {
        selectedYKeys.forEach((key) => {
            const value = item[key];
            if (Number.isFinite(value)) yValues.push(value);
        });
    });

    const yMin = d3.min(yValues);
    const yMax = d3.max(yValues);
    const scaleX = d3
        .scaleBand()
        .domain(groupedData.map((d) => d.labelX))
        .range([0, innerWidth])
        .padding(0.2);
    const scaleY = d3
        .scaleLinear()
        .domain([Math.max(0, yMin * 0.9), yMax * 1.1])
        .range([innerHeight, 0]);

    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top + innerHeight})`)
        .call(d3.axisBottom(scaleX))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(scaleY));

    return { scaleX, scaleY, margin, innerHeight };
}

function drawScatter(svg, groupedData, selectedYKeys, chart) {
    selectedYKeys.forEach((key) => {
        const color = CHART_SERIES[key].color;
        svg.selectAll(`.dot-${key}`)
            .data(groupedData)
            .enter()
            .append("circle")
            .attr("r", 4)
            .attr(
                "cx",
                (d) =>
                    chart.scaleX(d.labelX) +
                    chart.scaleX.bandwidth() / 2 +
                    chart.margin.left +
                    getOverlapOffset(d, key, selectedYKeys)
            )
            .attr("cy", (d) => chart.scaleY(d[key]) + chart.margin.top)
            .style("fill", color);
    });
}

function drawLine(svg, groupedData, selectedYKeys, chart) {
    selectedYKeys.forEach((key) => {
        const color = CHART_SERIES[key].color;
        const line = d3.line()
            .defined((d) => Number.isFinite(d[key]))
            .curve(d3.curveMonotoneX)
            .x((d) => chart.scaleX(d.labelX) + chart.scaleX.bandwidth() / 2 + chart.margin.left)
            .y((d) => chart.scaleY(d[key]) + chart.margin.top);

        svg.append("path")
            .datum(groupedData)
            .attr("d", line)
            .attr("stroke", color)
            .attr("stroke-width", 2)
            .attr("fill", "none");

        svg.selectAll(`.line-dot-${key}`)
            .data(groupedData.filter((d) => Number.isFinite(d[key])))
            .enter()
            .append("circle")
            .attr("r", 3)
            .attr(
                "cx",
                (d) =>
                    chart.scaleX(d.labelX) +
                    chart.scaleX.bandwidth() / 2 +
                    chart.margin.left +
                    getOverlapOffset(d, key, selectedYKeys)
            )
            .attr("cy", (d) => chart.scaleY(d[key]) + chart.margin.top)
            .style("fill", color);
    });
}

function drawBars(svg, groupedData, selectedYKeys, chart) {
    const localBand = d3
        .scaleBand()
        .domain(selectedYKeys)
        .range([0, chart.scaleX.bandwidth()])
        .padding(0.08);

    selectedYKeys.forEach((key) => {
        const color = CHART_SERIES[key].color;
        svg.selectAll(`.bar-${key}`)
            .data(groupedData.filter((d) => Number.isFinite(d[key])))
            .enter()
            .append("rect")
            .attr("x", (d) => chart.scaleX(d.labelX) + localBand(key) + chart.margin.left)
            .attr("y", (d) => chart.scaleY(d[key]) + chart.margin.top)
            .attr("width", localBand.bandwidth())
            .attr("height", (d) => chart.innerHeight - chart.scaleY(d[key]))
            .attr("fill", color);
    });
}

function drawLegend(svg, selectedYKeys) {
    const legend = svg.append("g").attr("transform", "translate(730, 20)");

    selectedYKeys.forEach((key, index) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", index * 20)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", CHART_SERIES[key].color);

        legend.append("text")
            .attr("x", 18)
            .attr("y", index * 20 + 10)
            .text(CHART_SERIES[key].label)
            .style("font-size", "12px");
    });
}

function drawBridgeChart(groupedData, selectedYKeys, chartType) {
    const svg = d3.select("#chart-svg");
    svg.selectAll("*").remove();

    if (!groupedData.length || !selectedYKeys.length) return;

    const chart = createChartScales(svg, groupedData, selectedYKeys);

    if (chartType === "scatter") {
        drawScatter(svg, groupedData, selectedYKeys, chart);
    } else if (chartType === "line") {
        drawLine(svg, groupedData, selectedYKeys, chart);
    } else {
        drawBars(svg, groupedData, selectedYKeys, chart);
    }

    drawLegend(svg, selectedYKeys);
}
