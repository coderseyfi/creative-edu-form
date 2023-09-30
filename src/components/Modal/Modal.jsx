import React from 'react'
import './modal.scss'

const Modal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    visibility: isOpen ? 'visible' : 'hidden',
  }

  const overlayClassName = isOpen ? 'modal overlay' : 'modal'

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <div className="modal" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span onClick={handleClose} className="close-ico">
            ×
          </span>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
