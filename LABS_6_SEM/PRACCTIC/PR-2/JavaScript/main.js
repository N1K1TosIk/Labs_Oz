// Нефроида: x=6cos(t)-4cos³(t), y=4sin³(t). Старт: t=π (левая вершина), по часовой
document.addEventListener("DOMContentLoaded", function () {
  const W = 600, H = 600, Cx = W / 2, Cy = H / 2, K = 55;
  const svg = d3.select("#svg").attr("width", W).attr("height", H);
  const form = document.getElementById("form");

  function pt(t) {
    const x = 6 * Math.cos(t) - 4 * Math.pow(Math.cos(t), 3);
    const y = 4 * Math.pow(Math.sin(t), 3);
    return { x: Cx + K * x, y: Cy - K * y };
  }

  function path(n) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = Math.PI - 2 * Math.PI * (i / n);
      pts.push(pt(t));
    }
    return pts;
  }

  function draw(cont) {
    const g = cont.append("g");
    g.append("circle").attr("cx", 0).attr("cy", -20).attr("r", 15).attr("fill", "#ffcc80");
    g.append("rect").attr("x", -12).attr("y", 0).attr("width", 24).attr("height", 28).attr("fill", "#42a5f5");
    g.append("ellipse").attr("cx", 0).attr("cy", -20).attr("rx", 6).attr("ry", 5).attr("fill", "#fff");
    g.append("line").attr("x1", -12).attr("y1", 8).attr("x2", -28).attr("y2", -2).attr("stroke", "#333").attr("stroke-width", 3);
    g.append("line").attr("x1", 12).attr("y1", 8).attr("x2", 28).attr("y2", -2).attr("stroke", "#333").attr("stroke-width", 3);
    g.append("polygon").attr("points", "-10,-32 10,-32 6,-40 0,-46 -6,-40").attr("fill", "#7b1fa2");
    return g;
  }

  function run() {
    svg.selectAll("*").remove();

    const pts = path(150);
    const line = d3.line().x(d => d.x).y(d => d.y);
    const trajPath = svg.append("path")
      .attr("d", line(pts))
      .attr("fill", "none")
      .attr("stroke", "#2196f3")
      .attr("stroke-width", 2);

    const pic = draw(svg);
    const dur = parseInt(String(form.duration.value).replace(",", ".")) || 5000;
    const sc = parseFloat(String(form.scale.value).replace(",", ".")) || 1;
    const rot = parseFloat(String(form.rotation.value).replace(",", ".")) || 90;

    pic.attr("transform", `translate(${pts[0].x},${pts[0].y}) scale(${sc}) rotate(0)`);

    const trajNode = trajPath.node();
    const length = trajNode.getTotalLength();

    // Анимация: двигаем картинку вдоль траектории и одновременно меняем scale/rotate
    pic.transition()
      .duration(dur)
      .ease(d3.easeLinear)
      .attrTween("transform", function () {
        return function (t) {
          const elapsed = t * dur; // мс
          const { x, y } = trajNode.getPointAtLength(t * length);
          const angle = (rot * elapsed) / 1000;
          const s = sc * (0.85 + 0.15 * Math.sin(elapsed * 0.004));
          return `translate(${x},${y}) scale(${s}) rotate(${angle})`;
        };
      });
  }

  document.getElementById("btn-start").onclick = function (e) { e.preventDefault(); run(); };
  document.getElementById("btn-clear").onclick = function (e) {
    e.preventDefault();
    svg.selectAll("*").interrupt();
    svg.selectAll("*").remove();
    const pts = path(150);
    svg.append("path").attr("d", d3.line().x(d => d.x).y(d => d.y)(pts)).attr("fill", "none").attr("stroke", "#2196f3").attr("stroke-width", 2);
  };

  // Траектория при загрузке
  const pts = path(150);
  svg.append("path").attr("d", d3.line().x(d => d.x).y(d => d.y)(pts)).attr("fill", "none").attr("stroke", "#2196f3").attr("stroke-width", 2);
});
