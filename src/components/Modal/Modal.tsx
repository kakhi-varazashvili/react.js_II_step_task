import { CgClose } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import "./modal.css";

export type Modaltypes = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  altDescription: string;
  modalImage: string;
  numberOfLikes: number;
  numberOfViews: number;
  numberOfDownloads: number;
};

const Modal = ({
  isModalOpen,
  handleModalClose,
  altDescription,
  modalImage,
  numberOfLikes,
  numberOfViews,
  numberOfDownloads,
}: Modaltypes) => {
  return isModalOpen ? (
    <div className="image-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleModalClose}>
            <CgClose />
          </button>
        </div>

        <div className="modal-body">
          <img src={modalImage} alt={altDescription} />
          <div className="image-info">
            <span className="image-info-element">
              <FcLike /> {numberOfLikes}
            </span>
            <span className="image-info-element">
              <FaEye /> {numberOfViews}
            </span>
            <span className="image-info-element">
              <FiDownload /> {numberOfDownloads}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
