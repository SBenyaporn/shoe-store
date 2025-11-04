// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";


import HomePage from "./components/Pages/HomePage.jsx";
import ShopPage from "./components/Pages/ShopPage.jsx";
import ProductDetailPage from "./components/Pages/ProductDetailPage.jsx";
import FavoritesPage from "./components/Pages/FavoritesPage.jsx";
import CartPage from "./components/Pages/CartPage.jsx";
import CheckoutPage from "./components/Pages/CheckoutPage.jsx";
import PaymentPage from "./components/Pages/PaymentPage.jsx";
import SuccessPage from "./components/Pages/SuccessPage.jsx";
import HistoryPage from "./components/Pages/HistoryPage.jsx";
import LoginPage from "./components/Pages/LoginPage.jsx";
import RegisterPage from "./components/Pages/RegisterPage.jsx";


import AdminLogin from "./components/Dashboard/AdminLogin.jsx";
import AdminLayout from "./components/Dashboard/AdminLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Stock from "./components/Dashboard/stock.jsx";
import Orders from "./components/Dashboard/orders.jsx";
import Payments from "./components/Dashboard/payments.jsx";
import Shipping from "./components/Dashboard/shipping.jsx";
import Customers from "./components/Dashboard/customers.jsx";
import Employees from "./components/Dashboard/Employees.jsx";
import Meetings from "./components/Dashboard/Meetings.jsx";
import Tasks from "./components/Dashboard/Tasks.jsx";
import Leave from "./components/Dashboard/Leave.jsx";

export default function App() {
  const { pathname } = useLocation();


  const isAdminRoute = pathname.startsWith("/admin");
  const hideNavbar =
    isAdminRoute || pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/*  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/*  */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin → Dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stock" element={<Stock />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="customers" element={<Customers />} />
          <Route path="employees" element={<Employees />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="leave" element={<Leave />} />
        </Route>

        {/*  */}
        <Route path="/admin-old" element={<Navigate to="/admin/login" replace />} />

        {/*  */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
      </Routes>
    </>
  );
}
