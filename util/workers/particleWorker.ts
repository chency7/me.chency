type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

type WorkerData = {
  type: "update";
  circles: Circle[];
  mouse: { x: number; y: number };
  canvasSize: { w: number; h: number };
  staticity: number;
  ease: number;
};

self.onmessage = (e: MessageEvent<WorkerData>) => {
  if (e.data.type === "update") {
    const { circles, mouse, canvasSize, staticity, ease } = e.data;

    const updatedCircles = circles.map((circle: Circle) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.h - circle.y - circle.translateY - circle.size,
      ];

      const closestEdge = Math.min(...edge);
      const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1);

      let alpha = circle.alpha;
      if (remapClosestEdge > 1) {
        alpha = Math.min(circle.targetAlpha, circle.alpha + 0.02);
      } else {
        alpha = circle.targetAlpha * remapClosestEdge;
      }

      // Update position
      const x = circle.x + circle.dx;
      const y = circle.y + circle.dy;
      const translateX =
        circle.translateX + (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      const translateY =
        circle.translateY + (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      // Check if particle is out of bounds
      if (
        x < -circle.size ||
        x > canvasSize.w + circle.size ||
        y < -circle.size ||
        y > canvasSize.h + circle.size
      ) {
        // Reset particle position
        return {
          ...circle,
          x: Math.random() * canvasSize.w,
          y: Math.random() * canvasSize.h,
          translateX: 0,
          translateY: 0,
          alpha: 0,
        };
      }

      return { ...circle, x, y, translateX, translateY, alpha };
    });

    self.postMessage({ circles: updatedCircles });
  }
};

function remapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
): number {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}
