document.addEventListener("DOMContentLoaded", function() {
  const width = 600;
  const height = 600;
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  const form = document.getElementById("setting");
  const animEnabled = document.getElementById("anim_enabled");
  const pathEnabled = document.getElementById("path_enabled");
  const blockCoords = document.getElementById("block_coords");
  const blockPath = document.getElementById("block_path");
  const blockScale = document.getElementById("block_scale");
  const blockRotate = document.getElementById("block_rotate");
  const coordsToX = document.getElementById("coords_to_x");
  const coordsToY = document.getElementById("coords_to_y");
  const scaleToX = document.getElementById("scale_to_x");
  const scaleToY = document.getElementById("scale_to_y");
  const rotateTo = document.getElementById("rotate_to");
  const easeBlock = document.getElementById("ease_block");
  const pathCheckBlock = document.getElementById("path_check_block");
  const btnDraw = document.getElementById("btn_draw");
  const btnAnimate = document.getElementById("btn_animate");
  const btnClear = document.getElementById("btn_clear");

  function updateFormVisibility() {
    const anim = animEnabled.checked;
    const path = pathEnabled.checked;

    coordsToX.classList.toggle("hidden", !anim);
    coordsToY.classList.toggle("hidden", !anim);
    scaleToX.classList.toggle("hidden", !anim);
    scaleToY.classList.toggle("hidden", !anim);
    rotateTo.classList.toggle("hidden", !anim);
    easeBlock.classList.toggle("hidden", !anim);
    pathCheckBlock.classList.toggle("hidden", !anim);
    btnDraw.classList.toggle("hidden", anim);
    btnAnimate.classList.toggle("hidden", !anim);

    blockCoords.classList.toggle("hidden", anim && path);
    blockPath.classList.toggle("hidden", !(anim && path));
    blockScale.classList.toggle("hidden", anim && path);
    blockRotate.classList.toggle("hidden", anim && path);
  }

  animEnabled.addEventListener("change", updateFormVisibility);
  pathEnabled.addEventListener("change", updateFormVisibility);

  const draw = (dataForm) => {
    const s = d3.select("svg");
    let pict = drawSmile(s);
    const cx = dataForm.cx.value;
    const cy = dataForm.cy.value;
    const scaleX = dataForm.scale_x.value || 1;
    const scaleY = dataForm.scale_y.value || 1;
    const rotate = dataForm.rotate.value || 0;
    pict.attr("transform", `translate(${cx}, ${cy}) scale(${scaleX}, ${scaleY}) rotate(${rotate})`);
  };

  function getEase(value) {
    if (value === "elastic") return d3.easeElastic;
    if (value === "bounce") return d3.easeBounce;
    return d3.easeLinear;
  }

  const runAnimation = (dataForm) => {
    const s = d3.select("svg");
    let pict = drawSmile(s);
    const easeVal = dataForm.ease_type.value;
    const ease = getEase(easeVal);

    if (pathEnabled.checked) {
      const typePath = parseInt(dataForm.path_type.value, 10);
      let path = drawPath(typePath);
      const first = path.node().getPointAtLength(0);
      pict.attr("transform", `translate(${first.x}, ${first.y})`);
      pict.transition()
        .ease(ease)
        .duration(6000)
        .attrTween("transform", translateAlong(path.node()));
    } else {
      const cx = dataForm.cx.value;
      const cy = dataForm.cy.value;
      const cxFin = dataForm.cx_finish.value;
      const cyFin = dataForm.cy_finish.value;
      const scaleX = dataForm.scale_x.value || 1;
      const scaleY = dataForm.scale_y.value || 1;
      const rotate = dataForm.rotate.value || 0;
      const scaleXFin = dataForm.scale_x_finish.value || 1.5;
      const scaleYFin = dataForm.scale_y_finish.value || 1.5;
      const rotateFin = dataForm.rotate_finish.value || 180;
      pict.attr("transform", `translate(${cx}, ${cy}) scale(${scaleX}, ${scaleY}) rotate(${rotate})`);
      pict.transition()
        .duration(6000)
        .ease(ease)
        .attr("transform", `translate(${cxFin}, ${cyFin}) scale(${scaleXFin}, ${scaleYFin}) rotate(${rotateFin})`);
    }
  };

  btnDraw.addEventListener("click", function() {
    draw(form);
  });

  btnAnimate.addEventListener("click", function() {
    runAnimation(form);
  });

  btnClear.addEventListener("click", function() {
    svg.selectAll("*").remove();
  });

  updateFormVisibility();
});
