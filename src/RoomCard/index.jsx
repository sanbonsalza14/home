import React from "react";
import "../App.css";

function RoomCard({room, openModal}) {
  return(

    <article 
     className="card"
      onClick={() => openModal(room)}
      >
            <h3 className="title">{room.title}</h3>
            <p className="sub">
              {room.price.toLocaleString()}만원🕿 허위매물신고
              </p>
            <img className="thumb" src={room.image} alt={room.title} />
          </article>

  );
}

export default RoomCard;