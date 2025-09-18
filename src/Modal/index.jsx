import React from "react";
import "../App.css";


function Modal({ selected, closeModal }) {
  if (!selected) return null;

  return (
    <>
      <div className="dim" onClick={closeModal} />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title" className="modal-title">{selected.title}</h3>
        <p className="modal-desc">{selected.content}</p>
        <p className="modal-price">
          가격 : {selected.price.toLocaleString()}
        </p>
        <img src={selected.image} alt={selected.title} className="modal-img" />
        <button className="btn-close" onClick={closeModal}>닫기</button>
      </div>
    </>
  );
}
export default Modal;