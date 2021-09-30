import { translateHyperLink } from "./../util/translateHyperLink";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";


export const showPDFPreview = (canvas: any) => {
 const imgData =  canvas.toDataURL("image/JPEG");
 console.log(imgData)
  var pdf =
    canvas.width > canvas.height
      ? new jsPDF({
          orientation: "l",
          unit: "pt", // points, pixels won't work properly
          format: [canvas.width * 0.75, canvas.height * 0.75], // set needed dimensions for any element
        })
      : new jsPDF({
          orientation: "p",
          unit: "mm", // points, pixels won't work properly
          format: [210, 297], // set needed dimensions for any element
        });

  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  translateHyperLink(pdf, canvas);
  //pdf.textWithLink('MY LINK!', 25, 25, {url: "https://amazon.de"});
  pdf.addImage(imgData, 0, 0, width, height,  "JPEG");
  // pdf.save("test.pdf");
  window.open(URL.createObjectURL(pdf.output("blob")));
};
