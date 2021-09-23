import { fabric } from "fabric";

export const deleteObject = (canvas: any) => {
  var activeObject = canvas.getActiveObjects();
  console.log(activeObject);
  if (activeObject) {
    activeObject.forEach((object: any) => {
      canvas.remove(object);
    });
    canvas.discardActiveObject();
  }
  canvas.renderAll();
};
