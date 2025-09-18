import { useNavigate } from "react-router-dom";
import "../App.css";

function AppNavBar() {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="nav-left">
        <div className="brand">ShoeShop</div>
        <nav className="menu">
          <a onClick={() => navigate("/")}>Main</a>
          <a onClick={() => navigate("/login")}>로그인</a>
          <a onClick={() => navigate("/signup")}>회원가입</a>
        </nav>
      </div>
    </header>
  );
}

export default AppNavBar;
