import "../App.css";

function RoomCard({ room, openModal }) {
  return (
    <article className="card" onClick={() => openModal(room)}>
      <h3 className="title">{room.title}</h3>

      <div className="sub">
        <span className="price">{room.price.toLocaleString()}만원</span>
        <button
          className="report"
          onClick={(e) => { e.stopPropagation(); alert("허위매물 신고 접수!"); }}
        >
          🕿 허위매물신고
        </button>
      </div>

      <img className="thumb" src={room.image} alt={room.title} />
    </article>
  );
}
export default RoomCard;
