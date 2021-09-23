import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import Draggable from "react-draggable";
import { openImageFile } from "../../commands/openImageFile";
import { insertText } from "../../commands/insertText";
import { rasterizeSVG } from "../../commands/toSvg";
import { CSSProperties } from "react";
import { showPDFPreview } from "../../commands/showPDFPreview";
import { addImage } from "../../commands/addImage";
import qrcode from "../../assets/fakeQR.jpg";
import barcode from "../../assets/barcode.png";
import { loadSvg } from "../../commands/loadSvg";
import svg from "../../assets/preview.svg";
import json from "../../assets/oldTicket.json";
import { ImageOptionPanel } from "./ImageOptionPanel";
import { TextOptionPanel } from "./TextOptionPanel";
import { insertVariableText } from "../../commands/insertVariableText";
import { HyperLinkPanel } from "./HyperLinkPanel";
import {
  checkIntersection,
  createPositions,
} from "../../commands/checkIntersection";
import { addHyperLink } from "../../commands/addHyperLink";
import { loadJson } from "../../commands/loadJson";
import { saveAsJson } from "../../commands/saveAsJson";
import { ActiveSelectionPanel } from "./activeSelection";

const panelStyle = {
  width: "200px",
  height: "250px",
  top: "100px",
  left: "40px",
  position: "absolute",
} as CSSProperties;

const MoveablePanel = (props: any) => {
  const [objectType, setObjectType] = useState<string>("");
  const [object, setObject] = useState();
  const logSvg = () => {
    console.log(rasterizeSVG(props.canvas));
  };

  const getType = (types: any) => {
    return types.textType === undefined ? types.type : types.textType;
  };

  if (props.canvas) {
    props.canvas.on("selection:created", (e: any) => {
      const targetType = e.target?.get("type");
      const textType = e.target?.textType;
      const types = { type: targetType, textType: textType };
      const type = getType(types);
      console.log(type);
      setObject(e!.target);
      setObjectType(type);
    });
  }

  const returnOptionPanel = (panel: string) => {
    console.log(panel);

    switch (panel) {
      case "textbox":
        return (
          <TextOptionPanel
            canvas={props.canvas}
            object={object}
            keyPress={props.keyPress}
          />
        );
      case "image":
        return <ImageOptionPanel object={object} canvas={props.canvas} />;
      case "hyperlink":
        return <HyperLinkPanel object={object} canvas={props.canvas} />;
      case "activeSelection":
        return (
          <ActiveSelectionPanel
            canvas={props.canvas}
            object={object}
            keyPress={props.keyPress}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div style={panelStyle} className="border">
      <div>
        <input
          type="file"
          name="file"
          onChange={(e) => openImageFile(e, props.canvas)}
        />
        <button onClick={() => insertText("HI", props.canvas)}>Text</button>
        <button onClick={logSvg}>to svg</button>
        <button onClick={() => saveAsJson(props.canvas)}>save as json</button>
        <button onClick={() => showPDFPreview(props.canvas)}>
          Show Preview
        </button>
        <button
          onClick={() =>
            addImage(props.canvas, qrcode, { width: 150, height: 150 })
          }
        >
          QR-CODE
        </button>
        <button
          onClick={() =>
            addImage(props.canvas, barcode, { width: 250, height: 100 })
          }
        >
          Barcode
        </button>
        <button onClick={() => addHyperLink("Dein Link", props.canvas)}>
          Add Hyperlink
        </button>
        <button onClick={() => loadSvg(props.canvas, svg)}>Load Svg</button>
        <button onClick={() => loadJson(props.canvas, json)}>Load json</button>
      </div>
      <button onClick={() => checkIntersection(createPositions(props.canvas))}>
        Check Intersection
      </button>

      <select
        className="w-100"
        onChange={(e) => insertVariableText(e.target.value, props.canvas)}
      >
        <option value="0">Text Variablen</option>
        <option value="%Zeit%">Zeit</option>
        <option value="%Tickettyp%">Tickettyp</option>
        <option value="%Adresse%">Adresse</option>
      </select>
      {returnOptionPanel(objectType)}
    </div>
  );
};

export { MoveablePanel };
