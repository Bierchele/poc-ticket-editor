import { fabric } from "fabric";

export const uploadBackground = (e: any, canvas: fabric.Canvas) => {
  let reader = new FileReader();
  reader.onload = (e: any) => {
    let imgObj = new Image();
    imgObj.src = typeof e.target?.result === "string" ? e.target?.result : "";
    imgObj.onload = () => {
      let image = new fabric.Image(imgObj);
      canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width! / image.width!,
        scaleY: canvas.height! / image.height!,
        selectable: false,
    
     });
     
      image.setControlsVisibility({
        tl: true, //top-left
        mt: false, // middle-top
        tr: false, //top-right
        ml: false, //middle-left
        mr: false, //middle-right
        bl: false, // bottom-left
        mb: false, //middle-bottom
        br: false, //bottom-right
      });

      canvas.add(image);
      canvas.renderAll();
    };
  };
  reader.readAsDataURL(e.target?.files[0]);
};
