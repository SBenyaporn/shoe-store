// src/components/Dashboard/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const MenuLink = ({ to, icon, children, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `menu-item${isActive ? " active" : ""}`}
  >
    <span className="mi-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
    <span className="mi-text">{children}</span>
  </NavLink>
);

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">
          <img src="/src/assets/Logo (2).png" alt="Logo" className="brand-logo" />
        </div>

        <nav className="menu">
          <MenuLink
            to="dashboard"
            end
            icon={`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke-width="1.8"/></svg>`}
          >
            สรุปการขาย
          </MenuLink>

          <NavLink className="menu-item" to="stock">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="mi-text">คลังสินค้า</span>
          </NavLink>

          <NavLink className="menu-item" to="orders">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 3h12v4H6zM6 7v14h12V7" strokeWidth="1.8" />
                <path d="M9 12h6M9 16h6" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="mi-text">คำสั่งซื้อ</span>
          </NavLink>

          <NavLink className="menu-item" to="payments">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.8" />
                <path d="M3 10h18" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="mi-text">การชำระเงิน</span>
          </NavLink>

          <NavLink className="menu-item" to="shipping">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 7h10v10H3zM13 9h5l3 3v5h-8z" strokeWidth="1.8" />
                <circle cx="7.5" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </span>
            <span className="mi-text">การจัดส่ง</span>
          </NavLink>

          <NavLink className="menu-item" to="customers">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0 1 16 0" />
              </svg>
            </span>
            <span className="mi-text">ลูกค้า</span>
          </NavLink>

          <NavLink className="menu-item" to="employees">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="7" r="3" />
                <path d="M2 21a7 7 0 0 1 14 0" />
                <circle cx="17" cy="8" r="2" />
                <path d="M22 21a5 5 0 0 0-7-4" />
              </svg>
            </span>
            <span className="mi-text">ข้อมูลพนักงาน</span>
          </NavLink>

          <NavLink className="menu-item" to="meetings">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M3 10h18" />
              </svg>
            </span>
            <span className="mi-text">การนัดประชุม</span>
          </NavLink>

          <NavLink className="menu-item" to="tasks">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M8 12l2 2 5-5" />
              </svg>
            </span>
            <span className="mi-text">งานที่มอบหมาย</span>
          </NavLink>

          <NavLink className="menu-item" to="leave">
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 5h16v14H4z" />
                <path d="M8 9h8M8 13h5" />
              </svg>
            </span>
            <span className="mi-text">การจัดการลา</span>
          </NavLink>

          <button type="button" className="menu-item logout-btn" onClick={handleLogout}>
            <span className="mi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            </span>
            <span className="mi-text">ออกจากระบบ</span>
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="user-box">
            <svg
              className="user-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3" />
              <path d="M4 20a8 8 0 0 1 16 0" />
            </svg>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
