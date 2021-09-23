export const translateHyperLink = (pdf: any, canvas: any) => {
  const ObjectsInCanvas = canvas.getObjects();
  ObjectsInCanvas.map((obj: any) => {
    if (obj.hasOwnProperty("textType")) {
      pdf.link(obj.width * .75, obj.height * .75, obj.left * 0.75, obj.top * 0.75, { url: obj.url });
    }
  });
};
