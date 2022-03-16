import React from "react";
import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = React.memo(({ children }) => {
  return <div className={overlayStyles.wrapper}>{children}</div>;
});

export default ModalOverlay;
