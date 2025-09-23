import "../App.css";

function normalizeSrc(src) {
  if (!src) return "/images/room0.jpg";
  return src.startsWith("/") ? src : `/${src}`;
}

function Modal({ selected, closeModal }) {
  if (!selected) return null;
  const imgSrc = normalizeSrc(selected.image);

  return (
    <>
      <div className="dim" onClick={closeModal} />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title" className="modal-title">{selected.title}</h3>
        <p className="modal-desc">{selected.content}</p>
        <p className="modal-price">가격 : <b>{selected.price.toLocaleString()}</b></p>

        <img
          src={imgSrc}
          alt={selected.title}
          className="modal-img"
          onError={(e) => { e.currentTarget.src = "/images/room0.jpg"; }}
        />

        <button className="btn-close" onClick={closeModal}>닫기</button>
      </div>
    </>
  );
}
export default Modal;
