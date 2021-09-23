import { image } from 'html2canvas/dist/types/css/types/image';
import { translateHyperLink } from "./../util/translateHyperLink";
import { jsPDF } from "jspdf";
import "svg2pdf.js";

export const showPDFPreview = (canvas: any) => {
  let imgData = new Image(canvas.toDataURL("image/JPEG", 1))
  imgData.crossOrigin ="anonymous"
  var pdf =
    canvas.width > canvas.height
      ? new jsPDF({
          orientation: "l",
          unit: "pt", // points, pixels won't work properly
          format: [canvas.width * 0.75, canvas.height * 0.75], // set needed dimensions for any element
        })
      : new jsPDF({
          orientation: "p",
          unit: "pt", // points, pixels won't work properly
          format: [canvas.width * 0.75, canvas.height * 0.75], // set needed dimensions for any element
        });

  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  translateHyperLink(pdf, canvas);
  //pdf.textWithLink('MY LINK!', 25, 25, {url: "https://amazon.de"});
  pdf.addImage(imgData, 0, 0, width, height, "JPEG");
  // pdf.save("test.pdf");
  window.open(URL.createObjectURL(pdf.output("blob")));
};
