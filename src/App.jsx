import { useState, useMemo } from "react";
import "./App.css";
import AppNavBar from "./AppNavBar";
import Toolbar from "./Toolbar";
import RoomCard from "./RoomCard";
import Modal from "./Modal";
import data from "./data/data";

function App() {
  const [rooms] = useState(data);

  // 모달 상태
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = (room) => {
    setSelected(room);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  // 정렬 상태
  const [sortBy, setSortBy] = useState(null);    // "price" | "title" | null
  const [sortDir, setSortDir] = useState("asc"); // "asc" | "desc"

  const setSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortDir("asc"); }
  };
  const resetSort = () => { setSortBy(null); setSortDir("asc"); };

  // 정렬된 데이터
  const sorted = useMemo(() => {
    const arr = [...rooms];
    if (!sortBy) return arr;
    arr.sort((a, b) => {
      let A = a[sortBy], B = b[sortBy];
      if (typeof A === "string") return (sortDir === "asc" ? 1 : -1) * A.localeCompare(B);
      return sortDir === "asc" ? A - B : B - A;
    });
    return arr;
  }, [rooms, sortBy, sortDir]);

  const arrow = (field) => (sortBy === field ? (sortDir === "asc" ? " 🔺" : " 🔻") : "");

  return (
    <>
      {/* 네비게이션 */}
      <AppNavBar />

      {/* 툴바 */}
      <Toolbar resetSort={resetSort} setSort={setSort} arrow={arrow} />

      {/* 리스트 */}
      <main className="wrap">
        {sorted.map((room) => (
          <RoomCard key={room.id} room={room} openModal={openModal} />
        ))}
      </main>

      {/* 모달 */}
      {open && selected && (
        <Modal selected={selected} closeModal={closeModal} />
      )}
    </>
  );
}
export default App;
