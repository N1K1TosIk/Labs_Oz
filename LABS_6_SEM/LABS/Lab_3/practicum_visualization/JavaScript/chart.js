function createArrGraph(data, key) {
    const groupObj = d3.group(data, (d) => d[key]);

    const arrGraph = [];
    for (const entry of groupObj) {
        const minMax = d3.extent(entry[1].map((d) => d["Высота"]));
        arrGraph.push({ labelX: entry[0], values: minMax });
    }

    return arrGraph;
}

function createAxis(svg, data, attrArea, showMin, showMax) {
    let yValues = [];
    if (showMax) {
        yValues = yValues.concat(data.map((d) => d.values[1]));
    }
    if (showMin) {
        yValues = yValues.concat(data.map((d) => d.values[0]));
    }

    const min = d3.min(yValues);
    const max = d3.max(yValues);

    const scaleX = d3
        .scaleBand()
        .domain(data.map((d) => d.labelX))
        .range([0, attrArea.width - 2 * attrArea.marginX])
        .padding(0.2);

    const scaleY = d3
        .scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attrArea.height - 2 * attrArea.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg
        .append("g")
        .attr(
            "transform",
            `translate(${attrArea.marginX}, ${attrArea.height - attrArea.marginY})`
        )
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg
        .append("g")
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createScatter(svg, data, scaleX, scaleY, attrArea, color, valueIndex, splitOverlaps) {
    const r = 5;

    svg
        .selectAll(`.dot-${valueIndex}-${color}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", (d) => {
            const baseX = scaleX(d.labelX) + scaleX.bandwidth() / 2;
            if (!splitOverlaps || d.values[0] !== d.values[1]) {
                return baseX;
            }
            return valueIndex === 1 ? baseX + r : baseX - r;
        })
        .attr("cy", (d) => scaleY(d.values[valueIndex]))
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("fill", color);
}

function createBars(svg, data, scaleX, scaleY, attrArea, color, valueIndex, shift) {
    const width = scaleX.bandwidth() / 2;

    svg
        .selectAll(`.bar-${valueIndex}-${color}`)
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => scaleX(d.labelX) + shift)
        .attr("y", (d) => scaleY(d.values[valueIndex]))
        .attr("width", width)
        .attr("height", (d) => attrArea.height - 2 * attrArea.marginY - scaleY(d.values[valueIndex]))
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("fill", color);
}

function drawGraph(data, dataForm) {
    const keyX = dataForm.keyX;
    const showMax = dataForm.showMax;
    const showMin = dataForm.showMin;
    const chartType = dataForm.chartType;

    const arrGraph = createArrGraph(data, keyX);
    if (keyX === "Год") {
        arrGraph.sort((a, b) => +a.labelX - +b.labelX);
    }

    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const attrArea = {
        width: parseFloat(svg.style("width")),
        height: parseFloat(svg.style("height")),
        marginX: 70,
        marginY: 50
    };

    const [scaleX, scaleY] = createAxis(svg, arrGraph, attrArea, showMin, showMax);

    if (chartType === "scatter") {
        const splitOverlaps = showMax && showMin;
        if (showMax) {
            createScatter(svg, arrGraph, scaleX, scaleY, attrArea, "red", 1, splitOverlaps);
        }
        if (showMin) {
            createScatter(svg, arrGraph, scaleX, scaleY, attrArea, "blue", 0, splitOverlaps);
        }
        return;
    }

    if (showMax && showMin) {
        createBars(svg, arrGraph, scaleX, scaleY, attrArea, "red", 1, scaleX.bandwidth() / 2);
        createBars(svg, arrGraph, scaleX, scaleY, attrArea, "blue", 0, 0);
    } else if (showMax) {
        createBars(svg, arrGraph, scaleX, scaleY, attrArea, "red", 1, 0);
    } else if (showMin) {
        createBars(svg, arrGraph, scaleX, scaleY, attrArea, "blue", 0, 0);
    }
}
