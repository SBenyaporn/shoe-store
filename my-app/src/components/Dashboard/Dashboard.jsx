import React from "react";
import "./Dashboard.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {
  const kpis = [
    {
      id: "sales",
      value: "32,250",
      label: "ยอดขายรวม",
      delta: "+15% จากเมื่อวาน",
      color: "#16a34a",          
      bg: "#E9F7EE",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M3 12l5 5L21 4" />
        </svg>
      ),
    },
    {
      id: "orders",
      value: "45",
      label: "คำสั่งซื้อทั้งหมด",
      delta: "+20% จากเมื่อวาน",
      color: "#7c3aed",          
      bg: "#F2EAFF",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
          <rect x="3" y="4" width="18" height="14" rx="3"></rect>
          <path d="M3 9h18" />
        </svg>
      ),
    },
    {
      id: "sold",
      value: "30",
      label: "สินค้าขายแล้ว",
      delta: "+25% จากเมื่อวาน",
      color: "#f97316",          
      bg: "#FFF3E8",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M3 7h10v10H3zM13 9h5l3 3v7h-8z" />
        </svg>
      ),
    },
    {
      id: "newcus",
      value: "12",
      label: "ลูกค้าใหม่",
      delta: "33.33% จากเมื่อวาน",
      color: "#ef476f",          
      bg: "#FFE9EF",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
          <circle cx="12" cy="8" r="4"></circle>
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
  ];

  
  const barData = [
    { name: "a", total: 60 },
    { name: "b", total: 90 },
    { name: "c", total: 50 },
    { name: "d", total: 120 },
  ];
  const barColors = ["#22c55e", "#fb923c", "#fda4af", "#ef4444"];

  const pieData = [
    { name: "ออเดอร์ที่ยังไม่ส่ง", value: 100, color: "#f59e0b" },
    { name: "ออเดอร์ที่จัดส่งแล้ว", value: 120, color: "#3b82f6" },
    { name: "ยอดสั่งซื้อรวม", value: 220, color: "#60a5fa" },
  ];

  return (
    <div className="dash">
      <div className="dash-top">
        <div>
          <h2>ยอดขายวันนี้</h2>
          <p>สรุปการขาย</p>
        </div>
        <button type="button" className="btn-export">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 5v10M8 9l4-4 4 4" />
            <path d="M5 19h14a2 2 0 0 0 2-2v-3" />
          </svg>
          <span>ส่งออก</span>
        </button>
      </div>

      {/* KPI cards */}
      <div className="stat-grid">
        {kpis.map(k => (
          <div key={k.id} className="stat-card">
            <span className="stat-icon" style={{ color: k.color, background: k.bg }}>
              {k.icon}
            </span>
            <div className="stat-main">
              <div className="stat-num">{k.value}</div>
              <div className="stat-label">{k.label}</div>
              <div className="stat-delta" style={{ color: k.color }}>{k.delta}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="chart-grid">
        <div className="card">
          <div className="card-head">
            <h3>กระบวนการจัดการร้านรองเท้าแบรนด์ & การดำเนินงาน</h3>
          </div>
          <div className="mini-sep" />
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>ยอดขายรวม</h3>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={2}
                >
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <ul className="legend">
              {pieData.map((e, i) => (
                <li key={i}>
                  <span className="dot" style={{ background: e.color }} />
                  {e.name}
                  <span className="legend-val">{e.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
