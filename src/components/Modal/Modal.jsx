import PropTypes from "prop-types";

const Modal = ({ text, title }) => {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{text}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

Modal.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;
