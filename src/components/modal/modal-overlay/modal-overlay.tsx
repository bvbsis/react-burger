import React from "react";

import overlayStyles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  handleClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = React.memo(({ children, handleClose }) => {
  const onOverlayClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  return (
    <div onClick={onOverlayClick} className={overlayStyles.modalOverlay}>
      {children}
    </div>
  );
});

export default ModalOverlay;
