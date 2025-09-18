import React from "react";
import "../App.css";

function Toolbar({resetSort, setSort, arrow}){
  return(
    <section className="toolbar">
        <div className="toolbar-inner">
          <button className="link-btn" onClick={resetSort}>처음처럼</button>
          <button className="link-btn" onClick={() => setSort("price")}>
            가격{arrow("price")}
          </button>
          <button className="link-btn" onClick={() => setSort("title")}>
            물건명{arrow("title")}
          </button>
        </div>
      </section>
  )
}

export default Toolbar;