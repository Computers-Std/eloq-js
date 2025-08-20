let cx = document.querySelector("canvas").getContext("2d");

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function drawTrapezoid(ctx, p1, p2, p3, p4, fColor, sColor) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.closePath();

  // Fill the trapezoid
  ctx.fillStyle = fColor;
  ctx.fill();

  // Stroke the trapezoid
  ctx.strokeStyle = sColor;
  ctx.lineWidth = 2;
  ctx.stroke();
}
