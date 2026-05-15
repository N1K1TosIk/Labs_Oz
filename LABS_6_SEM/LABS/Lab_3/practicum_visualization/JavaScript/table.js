const showTable = (idTable, data) => {
    const table = d3.select("#" + idTable);
    table.selectAll("*").remove();

    table
        .insert("tr", ":first-child")
        .selectAll("th")
        .data(Object.keys(data[0]))
        .enter()
        .append("th")
        .text((d) => d);

    const rows = table
        .selectAll("tr.data-row")
        .data(data)
        .enter()
        .append("tr")
        .attr("class", "data-row");

    rows
        .selectAll("td")
        .data((d) => Object.values(d))
        .enter()
        .append("td")
        .text((d) => d);
};

const hideTable = (idTable) => {
    d3.select("#" + idTable).selectAll("tr").remove();
};
