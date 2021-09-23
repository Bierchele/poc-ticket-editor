import { fabric } from "fabric";

export const loadJson = (canvas: any, jsonUrl: any) => {
  canvas.loadFromJSON(jsonUrl, canvas.renderAll.bind(canvas), function(o: any, object: any) {
    fabric.log(o, object);
});
};
