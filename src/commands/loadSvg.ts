import { fabric } from "fabric";

export const loadSvg = (canvas: any, svgURl: any) => {
  fabric.loadSVGFromURL(svgURl, function (objects) {
    
    canvas.add.apply(canvas, objects);
    canvas.renderAll();
  });
};
