import { fabric } from "fabric";

export const loadSvg = (canvas: any, svgURl: any) => {
  fabric.loadSVGFromURL(svgURl, function (objects) {
    for(let i = 0; i < objects.length; i++) {
      const type = objects[i].type === "text" ? "textbox" : objects[i].type
      objects[i].type = type;
    }
    console.log(objects[0].type)
    canvas.add.apply(canvas, objects);
    canvas.renderAll();
  });
};
