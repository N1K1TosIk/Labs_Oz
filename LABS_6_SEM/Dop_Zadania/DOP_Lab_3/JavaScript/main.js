document.addEventListener("DOMContentLoaded", function () {
  const width = 900;
  const height = 320;
  const svg = d3.select("#scene")
    .attr("width", width)
    .attr("height", height);

  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = 15;
  const randomCirclesCount = 10;
  const blue = "#3f51b5";
  const random = (min, max) => Math.random() * (max - min) + min;
  const clear = () => svg.selectAll("*").interrupt().remove();

  function drawInitialCircle() {
    clear();
    svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", baseRadius)
      .attr("fill", blue);
  }

  function drawRandomOutlineCircles() {
    d3.range(randomCirclesCount).forEach(function () {
      svg.append("circle")
        .attr("cx", random(baseRadius, width - baseRadius))
        .attr("cy", random(baseRadius, height - baseRadius))
        .attr("r", baseRadius)
        .attr("fill", "none")
        .attr("stroke", blue)
        .attr("stroke-width", 2);
    });
  }

  function runAnimation() {
    clear();

    const g = svg.append("g")
      .attr("transform", `translate(${centerX},${centerY}) scale(1)`)
      .attr("opacity", 1);

    g.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", baseRadius)
      .attr("fill", blue);

    g
      .transition()
      .duration(1800)
      .ease(d3.easeLinear)
      .tween("grow-fade", function () {
        return function (t) {
          const scale = 1 + 9 * t; 
          g.attr("transform", `translate(${centerX},${centerY}) scale(${scale})`)
            .attr("opacity", 1 - t);
        };
      })
      .on("end", function () {
        g.remove();
        drawRandomOutlineCircles();
      });
  }

  document.getElementById("run-btn").addEventListener("click", runAnimation);
  drawInitialCircle();
});
