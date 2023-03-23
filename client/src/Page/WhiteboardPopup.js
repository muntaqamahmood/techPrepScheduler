import React from "react";
import "../Styles/whiteboard-popup.css";
import Whiteboard from "./whiteboard";

const WhiteboardPopup = (props) => {
  return props.trigger ? (
    <div className="WBpopup">
      <div className="WBpopup_inner">
        <Whiteboard />

        <button className="WBclose-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default WhiteboardPopup;
