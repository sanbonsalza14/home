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
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };
  const resetSort = () => {
    setSortBy(null);
    setSortDir("asc");
  };

  // 정렬된 배열 반환
  const sorted = useMemo(() => {
    if (!sortBy) return rooms;
    const copy = [...rooms];
    copy.sort((a, b) => {
      const A = a[sortBy];
      const B = b[sortBy];
      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [rooms, sortBy, sortDir]);

  // 정렬 방향 화살표 표시
  const arrow = (field) =>
    sortBy === field ? (sortDir === "asc" ? " 🔺" : " 🔻") : "";

  return (
    <>
      {/* 네비게이션 */}
      <AppNavBar />

      {/* 툴바 */}
      <Toolbar resetSort={resetSort} setSort={setSort} arrow={arrow} />

      {/* 리스트 */}
      <main className="wrap">
        {sorted.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            openModal={openModal}
          />
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
