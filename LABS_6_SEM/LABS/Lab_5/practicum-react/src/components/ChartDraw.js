import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';

const margin = {
  top: 12,
  bottom: 78,
  left: 48,
  right: 28,
};

const ChartDraw = (props) => {
  const chartRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style('width')));
    setHeight(parseFloat(svg.style('height')));
  }, []);

  const boundsWidth = Math.max(0, width - margin.left - margin.right);
  const boundsHeight = Math.max(0, height - margin.top - margin.bottom);
  const selectedSeries = props.oy
    .map((isOn, checkboxIndex) => {
      if (!isOn) return null;
      return {
        checkboxIndex,
        valueIndex: checkboxIndex === 0 ? 1 : 0,
      };
    })
    .filter((series) => series !== null);
  const valuesY = props.data.flatMap((d) =>
    selectedSeries.map((series) => d.values[series.valueIndex])
  );
  const [min = 0, max = 0] = d3.extent(valuesY);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(props.data.map((d) => d.labelX))
      .range([0, boundsWidth]);
  }, [props.data, boundsWidth]);

  const scaleY = useMemo(() => {
    const low = min > 0 ? min * 0.85 : min * 1.1;
    const high = max > 0 ? max * 1.1 : max * 0.85;
    return d3
      .scaleLinear()
      .domain([low, high])
      .range([boundsHeight, 0]);
  }, [boundsHeight, min, max]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    if (!width || !height || !props.data.length || !selectedSeries.length) return;

    svg
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', boundsWidth)
      .attr('height', boundsHeight)
      .style('fill', '#d8d8d8');

    const xAxis = d3.axisBottom(scaleX);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-30)');

    const yAxis = d3.axisLeft(scaleY);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    if (props.chartType === 'Гистограмма') {
      const seriesScale = d3
        .scaleBand()
        .domain(selectedSeries.map((series) => String(series.checkboxIndex)))
        .range([0, scaleX.bandwidth()])
        .padding(0.12);

      const seriesColor = (checkboxIndex) => (checkboxIndex === 0 ? 'red' : 'blue');

      svg
        .selectAll('.bar-group')
        .data(props.data)
        .enter()
        .append('g')
        .attr('class', 'bar-group')
        .attr(
          'transform',
          (d) => `translate(${margin.left + scaleX(d.labelX)}, ${margin.top})`
        )
        .selectAll('rect')
        .data((d) =>
          selectedSeries.map((series) => ({
            checkboxIndex: series.checkboxIndex,
            value: d.values[series.valueIndex],
          }))
        )
        .enter()
        .append('rect')
        .attr('x', (d) => seriesScale(String(d.checkboxIndex)))
        .attr('y', (d) => scaleY(d.value))
        .attr('width', seriesScale.bandwidth())
        .attr('height', (d) => boundsHeight - scaleY(d.value))
        .style('fill', (d) => seriesColor(d.checkboxIndex));
    } else {
      const seriesColor = (checkboxIndex) => (checkboxIndex === 0 ? 'red' : 'blue');
      selectedSeries.forEach((series, seriesPos) => {
        const dotOffsetX =
          selectedSeries.length === 1 ? 0 : (seriesPos - (selectedSeries.length - 1) / 2) * 8;
        svg
          .selectAll(`.dot-${series.checkboxIndex}`)
          .data(props.data)
          .enter()
          .append('circle')
          .attr('class', `dot-${series.checkboxIndex}`)
          .attr('r', 5)
          .attr('cx', (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2 + dotOffsetX)
          .attr('cy', (d) => scaleY(d.values[series.valueIndex]))
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .style('fill', seriesColor(series.checkboxIndex));
      });
    }
  }, [
    boundsHeight,
    height,
    props.chartType,
    props.data,
    scaleX,
    scaleY,
    selectedSeries,
    width,
  ]);

  return <svg ref={chartRef} />;
};

export default ChartDraw;
