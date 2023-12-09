import React from "react";
import Modal from "react-modal"
import styled from "styled-components";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '600px',
      overflow: 'auto',
      padding: '15px',
      position: 'relative',
    },
  };

export const GenericModal = ({children, modalIsOpen, closeModal}) => {
    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <CloseButton onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
            </CloseButton>
            {children}
        </Modal>
    )
}

//styles

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: gray;
`