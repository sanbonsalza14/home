import { useMemo, useState } from "react";
import "./App.css";
import data from "./data/data"; // 이미지: public/images/room0~5.jpg
import Navbar from "./AppNavbar";



function App() {
  const [rooms] = useState(data);

  // 모달
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);``~``

  // 정렬
  const [sortBy, setSortBy] = useState(null);     // "price" | "title" | null
  const [sortDir, setSortDir] = useState("asc");  // "asc" | "desc"

  const openModal = (room) => { setSelected(room); setOpen(true); };
  const closeModal = () => setOpen(false);

  const setSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortDir("asc"); }
  };
  const resetSort = () => { setSortBy(null); setSortDir("asc"); };

  const sorted = useMemo(() => {
    const arr = [...rooms];
    if (!sortBy) return arr;
    arr.sort((a, b) => {
      let res = 0;
      if (sortBy === "price") res = a.price - b.price;
      if (sortBy === "title") res = a.title.localeCompare(b.title);  //문자열 비교함수
      return sortDir === "asc" ? res : -res;
    });
    return arr;
  }, [rooms, sortBy, sortDir]);

  // 활성된 필드에만 🔺/🔻 출력 (비활성은 아이콘 없음)
  const arrow = (field) => {
    if (sortBy !== field) return "";
    return sortDir === "asc" ? " ⮝ " : " ⮟";
  };

  return (
    <>
      {/* 상단 네비(검정) : 왼쪽 정렬, 높이 비율 6 */}
      <header className="topbar">
        <div className="nav-left">
          <div className="brand">ShoeShop</div>
          <nav className="menu">
            <a>Main</a>
            <a>로그인</a>
            <a>회원가입</a>
          </nav>
        </div>
      </header>

      {/* 보라색 툴바 : 가운데 정렬, 높이 비율 4 */}
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

      {/* 리스트 */}
      <main className="wrap">
        {sorted.map((room) => (
          <article key={room.id} className="card" onClick={() => openModal(room)}>
            <h3 className="title">{room.title}</h3>
            <p className="sub">{room.price.toLocaleString()}만원🕿 허위매물신고</p>
            <img className="thumb" src={room.image} alt={room.title} />
          </article>
        ))}
      </main>

      {/* 모달 */}
      {open && selected && (
        <>
          <div className="dim" onClick={closeModal} />
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <h3 id="modal-title" className="modal-title">{selected.title}</h3>
            <p className="modal-desc">{selected.content}</p>
            <p className="modal-price">가격 : {selected.price.toLocaleString()}</p>
            <img src={selected.image} alt={selected.title} className="modal-img" />
            <button className="btn-close" onClick={closeModal}>닫기</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
