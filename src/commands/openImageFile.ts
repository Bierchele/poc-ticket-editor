import { fabric } from "fabric";

export const openImageFile = (e: any, canvas: fabric.Canvas) => {
  let reader = new FileReader();
  reader.onload = (e: any) => {
    let imgObj = new Image();
    imgObj.src = typeof e.target?.result === "string" ? e.target?.result : "";
    imgObj.onload = () => {
      let image = new fabric.Image(imgObj);
      image.set({
        angle: 0,
        padding: 0,
        height: imgObj.height,
        width: imgObj.width,
      });
      image.scaleToHeight(200);
      image.scaleToWidth(200);
      image.setControlsVisibility({
        tl: true, //top-left
        mt: false, // middle-top
        tr: true, //top-right
        ml: false, //middle-left
        mr: false, //middle-right
        bl: true, // bottom-left
        mb: false, //middle-bottom
        br: true, //bottom-right
      });

      canvas.add(image);
      canvas.renderAll();
    };
  };
  reader.readAsDataURL(e.target?.files[0]);
};
