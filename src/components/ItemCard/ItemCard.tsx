import "./ItemCard.css";
import ImageCustom from "../ImageCustom/ImageCustom";
import ModalCustom from "../ModalCustom/ModalCustom";
import axios from "axios";
import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import BtnCustom from "../BtnCustom/BtnCustom";
import AppToast from "../ToastCustom/ToastCustom";
import type { ToastData } from "../../types/ToastData";

interface ItemCardProps {
  id: number;
  productName: string;
  src: string;
  onEdit?: () => void;
  onDeleteSuccess: () => void
}

const ItemCard: React.FC<ItemCardProps> = ({id,productName,src,onEdit,onDeleteSuccess}) => {
  const navigate = useNavigate();

  const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);


  const handleConfirrmDelete = () => {
    axios
      .delete(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        
        setShowModal(false);
        setToast({
          show: true,
          type: 'success',
          message: 'Delete Item successful!'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          onDeleteSuccess();
      }, 2000);
      })
      .catch(() => {
        setToast({
          show: true,
          type: 'danger',
          message: 'please try again'
        });
      });
  };

  return (
    <div
      className="grid-card card image-hover-container position-relative cursor-pointer d-inline-block overflow-hidden rounded-4 grid-card">
        <div className="card-body">
          <ImageCustom
          src={src}
          fallbackSrc="/Task5/Images/product/default.png"
          alt={productName}
          className="w-100 h-100 object-contain"
        />
        </div>
     
      {/* show when hover Item*/}
      <div
        className="overlay d-flex flex-column align-items-center justify-content-center w-100 h-100 top-0 start-0 position-absolute"
        onDoubleClick={() => navigate(`show/${id}`)}
      >
        <Link to={`show/${id}`} className="text-decoration-none text-dark">
          <p className="item-name pb-4 m-0 lh-1 fs-3 fw-medium text-center">
            {productName}
          </p>
        </Link>
        
        <div className="button-group d-flex gap-2">
          <BtnCustom name={"Edit"} classExtra="btn-edit text-white" onClick={onEdit} />
          <BtnCustom name={"Delete"} classExtra="btn-delete text-white" onClick={handleShow} />
        </div>
      </div>
      {/* Modal for delete Item */}
      <ModalCustom
        show={showModal}
        onHide={handleHide}
        body={
          <p className="text-center fw-semibold fs-22">
            Are you sure you want to delete the product?
          </p>
        }
        onSubmit={handleConfirrmDelete}
        submitText="Yes"
        cancelText="No"
      />
      {toast.type && <AppToast data={toast} />}
    </div>
  );
};

export default ItemCard;
