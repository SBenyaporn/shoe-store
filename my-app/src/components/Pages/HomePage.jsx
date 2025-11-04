// src/components/Pages/HomePage.jsx
import React from "react";
import hero1 from "../../assets/Home/1.1.webp";
import hero2 from "../../assets/Home/1.2.webp";
import hero3 from "../../assets/Home/1.3.webp";
import c1 from "../../assets/1.2.webp";
import c2 from "../../assets/2.webp";
import c3 from "../../assets/3.webp";
import c4 from "../../assets/4.jpg";

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="container">
          <div className="gallery">
            <div className="frame"><img alt="adidas samba" src={hero1} /></div>
            <div className="frame"><img alt="puma collection" src={hero2} /></div>
            <div className="frame"><img alt="nike zoom" src={hero3} /></div>
          </div>
        </div>
      </header>

      
      <main className="container home-coming">
        <h2 className="section-title">Comming Soon</h2>
        <p className="section-sub">รุ่นใหม่เข้าเร็ว ๆ นี้ — แอบส่องรายละเอียดก่อนได้เลย</p>

        <section className="grid grid-compact">
          <article className="card">
            <div className="card-media"><img alt="Jordan 1 Low" src={c1} /></div>
            <div className="card-body">
              <h3>Jordan Air 1 Low</h3>
              <p>ได้แรงบันดาลใจจากรองเท้าบาสระดับตำนานปี 1985 ปรับอัปเดตงานสร้างและวัสดุให้สวมใส่สบาย</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media"><img alt="Puma Speedcat" src={c2} /></div>
            <div className="card-body">
              <h3>Puma Speedcat Ballet Suede</h3>
              <p>แรงบันดาลใจจากรองเท้าแข่ง F1 ผสานลุคแฟชั่น เบาและยืดหยุ่น เหมาะกับวันลุย ๆ</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media"><img alt="Nike Air Max Dn8" src={c3} /></div>
            <div className="card-body">
              <h3>Nike Air Max Dn8</h3>
              <p>รองรับแรงกระแทกด้วย Dynamic Air cushioning ให้การทรงตัวดีขึ้นและเดินสบายตลอดวัน</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media"><img alt="adidas Handball Spezial" src={c4} /></div>
            <div className="card-body">
              <h3>adidas Handball Spezial</h3>
              <p>รุ่นคลาสสิกจากปี 1979 โดดเด่นด้วยหนังกลับและเส้นสามแถบ เรียบง่ายแต่เท่มาก</p>
            </div>
          </article>
        </section>

        <footer>© 2025 Shoe store</footer>
      </main>
    </>
  );
}
