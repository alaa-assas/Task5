import React, { type ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import './ModalCustom.css'
import BtnCustom from '../BtnCustom/BtnCustom';

 type ModalProps = {
    show: boolean;
    body: string | ReactNode;
    submitText?: string;
    cancelText?: string;
    onHide: () => void;
    onSubmit?: () => void;
  };

const ModalCustom: React.FC<ModalProps> = ({show,onHide,body,onSubmit,submitText = 'Submit', cancelText = 'Cancel'
}) => {
  return (
    <Modal show={show} onHide={onHide} className=''
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer className='d-flex justify-content-around border border-0 flex-md-row flex-column'>
        {onSubmit && (
          <BtnCustom name={submitText} classExtra="modal-custom-btn p-3 fs-2"  type="button"  onClick={onSubmit}/>
        )}
        <BtnCustom name={cancelText} classExtra="modal-custom-btn p-3 fs-2"  type="button"  onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCustom;