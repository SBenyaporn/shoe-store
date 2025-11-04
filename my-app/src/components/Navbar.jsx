// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Auth.jsx";

export default function Navbar() {
  const { authed, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  
  useEffect(() => {
    const updateDisplayName = () => {
      try {
        const u = JSON.parse(localStorage.getItem("demo_user") || "null");
       
        const name = u?.fullName || u?.full_name || "";
        if (name) {
          setDisplayName(name.split(" ")[0]); 
        } else {
          setDisplayName("");
        }
      } catch {
        setDisplayName("");
      }
    };

    updateDisplayName();
    
    
    const handleStorageChange = () => updateDisplayName();
    window.addEventListener("storage", handleStorageChange);
    
   
    window.addEventListener("user-updated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("user-updated", handleStorageChange);
    };
  }, [authed]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="container nav-inner-grid">
        
        <div className="nav-left">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Shop">Shop</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </div>

        
        <div className="nav-center">Shoe store</div>

        <div className="nav-right">
          {!authed ? (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/admin/login">Admin</NavLink>
            </>
          ) : (
            <>
              <div className="user-chip" title={displayName ? `เข้าสู่ระบบเป็น ${displayName}` : "เข้าสู่ระบบแล้ว"}>
                <span className="dot-online" aria-hidden="true" />
                <span className="user-chip-text">{displayName || "เข้าสู่ระบบแล้ว"}</span>
              </div>
              <button type="button" className="nav-link-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
