import { fabric } from "fabric";

const createPositions = (canvas: any) => {
  const objectOnCanvas = canvas.getObjects();
  const positions = objectOnCanvas.map((x: any) => {
    return x.type === "image"
      ? {
          obj: x,
          bottomRightPoint: {
            x: x.left + x.scaleX * x.width,
            y: x.top + x.scaleY * x.height,
          },
          topLeftPoint: { x: x.left, y: x.top },
        }
      : {
          obj: x,
          bottomRightPoint: {
            x: x.left + x.width,
            y: x.top + x.height,
          },
          topLeftPoint: { x: x.left, y: x.top },
        };
  });
  return positions;
};

const checkIntersection = (positions: any) => {
  const copyOfPositions = [...positions];
  let overlap = false;

  for (let i = positions.length - 1; i > 0; i--) {
    for (let j = 0; j < copyOfPositions.length - 1; j++) {
      overlap = doOverlap(
        positions[i].topLeftPoint,
        positions[i].bottomRightPoint,
        copyOfPositions[j].topLeftPoint,
        copyOfPositions[j].bottomRightPoint
      );
      if (overlap) {
        alert("overlap");
        return;
      }
    }
  }
};

function doOverlap(l1: any, r1: any, l2: any, r2: any) {
  // To check if either rectangle is actually a line
  // For example : l1 ={-1,0} r1={1,1} l2={0,-1} r2={0,1}

  if (l1.x === r1.x || l1.y === r1.y || l2.x === r2.x || l2.y === r2.y) {
    // the line cannot have positive overlap
    return false;
  }

  // If one rectangle is on left side of other
  if (l1.x > r2.x || l2.x > r1.x) {
    return false;
  }

  // If one rectangle is above other
  if (r1.y < l2.y || r2.y < l1.y) {
    return false;
  }

  return true;
}

export { checkIntersection };
export { createPositions };
