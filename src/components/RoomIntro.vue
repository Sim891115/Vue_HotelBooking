<template>
  <!-- Hero -->
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-badge">精緻客房｜高隱私｜舒適睡眠</div>
      <h1>客房介紹</h1>
      <p>
        我們設計舒適與高隱私性的客房，提供完善備品與貼心服務，讓您在旅途中也能安心放鬆。
      </p>
    </div>
  </section>

  <!-- 主內容 -->
  <div class="page-container">
    <div class="section-head">
      <h2 class="room-section-title">客房（4）</h2>
      <p class="section-note">價格為參考示意；實際以訂房頁為準。</p>
    </div>

    <div class="room-list">
      <!-- 單人房 -->
      <div class="room-card">
        <div class="room-photo">
          <span class="room-tag">人氣首選</span>
          <img src="../assets/Deluxe.jpg" alt="單人房" />
          <div class="room-overlay">
            <div class="overlay-left">
              <strong>單人房</strong>
              每晚 NT$ 2,680 起
            </div>

            <router-link
              class="overlay-btn"
              :to="{
                name: 'HomePage',
                hash: '#quick-search-title',
                query: { roomType: 'single' },
              }"
            >
              立即訂房
            </router-link>
          </div>
        </div>

        <div class="room-info">
          <div class="room-title-row">
            <h3>單人房</h3>
            <span class="room-price">NT$ 2,680 起</span>
          </div>

          <div class="room-meta">
            <div class="meta-item">
              <span class="k">入住人數</span><span class="v">1 人</span>
            </div>

            <div class="meta-item">
              <span class="k">房間大小</span><span class="v">20–24 ㎡</span>
            </div>

            <div class="meta-item">
              <span class="k">床型</span><span class="v">單人床 1 張</span>
            </div>
          </div>

          <p>
            <strong>房型特色：</strong>
            房內空間精巧實用，動線規劃流暢，適合獨旅或商務住宿。配備舒適單人床、獨立書桌與高速
            Wi-Fi，提供安靜放鬆的休息環境，讓您在旅途中也能保有良好作息品質。
          </p>

          <div class="room-actions">
            <a href="#" class="primary">查看詳情</a>
            <a href="#">加入收藏</a>
          </div>
        </div>
      </div>

      <!-- 雙人房 -->
      <div class="room-card">
        <div class="room-photo">
          <span class="room-tag">親子推薦</span>
          <img src="../assets/Deluxe Double.jpg" alt="雙人房" />
          <div class="room-overlay">
            <div class="overlay-left">
              <strong>雙人房</strong>
              每晚 NT$ 3,180 起
            </div>

            <router-link
              class="overlay-btn"
              :to="{
                name: 'HomePage',
                hash: '#quick-search-title',
                query: { roomType: 'double' },
              }"
            >
              立即訂房
            </router-link>
          </div>
        </div>

        <div class="room-info">
          <div class="room-title-row">
            <h3>雙人房</h3>
            <span class="room-price">NT$ 3,180 起</span>
          </div>

          <div class="room-meta">
            <div class="meta-item">
              <span class="k">入住人數</span><span class="v">2 人</span>
            </div>

            <div class="meta-item">
              <span class="k">房間大小</span><span class="v">24–28 ㎡</span>
            </div>

            <div class="meta-item">
              <span class="k">床型</span><span class="v">單人床 2 張</span>
            </div>
          </div>

          <p>
            <strong>房型特色：</strong>
            以實用與舒適為核心設計，配置兩張獨立單人床，適合好友、同事或親子同行。空間寬敞不擁擠，行李擺放便利，兼顧隱私與共享的住宿需求。
          </p>

          <div class="room-actions">
            <a href="#" class="primary">查看詳情</a>
            <a href="#">加入收藏</a>
          </div>
        </div>
      </div>

      <!-- 豪華雙人房 -->
      <div class="room-card">
        <div class="room-photo">
          <span class="room-tag">高級推薦</span>
          <img src="../assets/Family suite.jpg" alt="豪華雙人房" />
          <div class="room-overlay">
            <div class="overlay-left">
              <strong>豪華雙人房</strong>
              每晚 NT$ 4,980 起
            </div>

            <router-link
              class="overlay-btn"
              :to="{
                name: 'HomePage',
                hash: '#quick-search-title',
                query: { roomType: 'deluxe-double-no-win' },
              }"
            >
              立即訂房
            </router-link>
          </div>
        </div>

        <div class="room-info">
          <div class="room-title-row">
            <h3>豪華雙人房</h3>
            <span class="room-price">NT$ 4,980 起</span>
          </div>

          <div class="room-meta">
            <div class="meta-item">
              <span class="k">入住人數</span><span class="v">2-4 人</span>
            </div>

            <div class="meta-item">
              <span class="k">房間大小</span><span class="v">35–40 ㎡</span>
            </div>

            <div class="meta-item">
              <span class="k">床型</span><span class="v">加大雙人床 2 張</span>
            </div>
          </div>

          <p>
            <strong>房型特色：</strong>
            寬敞房型結合高質感設計，搭配舒適加大雙人床與柔和燈光，營造放鬆氛圍。適合情侶或家庭入住，提供充足活動空間，讓住宿體驗更加自在愜意。
          </p>

          <div class="room-actions">
            <a href="#" class="primary">查看詳情</a>
            <a href="#">加入收藏</a>
          </div>
        </div>
      </div>

      <!-- 總統套房 -->
      <div class="room-card">
        <div class="room-photo">
          <span class="room-tag">尊榮頂級</span>
          <img src="../assets/President.jpg" alt="總統套房" />
          <div class="room-overlay">
            <div class="overlay-left">
              <strong>總統套房</strong>
              每晚 NT$ 12,800 起
            </div>
            <router-link
              class="overlay-btn"
              :to="{
                name: 'HomePage',
                hash: '#quick-search-title',
                query: { roomType: 'triple' },
              }"
            >
              立即訂房
            </router-link>
          </div>
        </div>
        <div class="room-info">
          <div class="room-title-row">
            <h3>總統套房</h3>
            <span class="room-price">NT$ 12,800 起</span>
          </div>

          <div class="room-meta">
            <div class="meta-item">
              <span class="k">入住人數</span><span class="v">4-8 人</span>
            </div>

            <div class="meta-item">
              <span class="k">房間大小</span><span class="v">80 ㎡ 以上</span>
            </div>

            <div class="meta-item">
              <span class="k">床型</span
              ><span class="v">特大床 1–2 張 (可加床)</span>
            </div>
          </div>

          <p>
            <strong>房型特色：</strong>
            尊榮級套房設計，擁有獨立起居空間與寬闊視野，適合家庭聚會或重要行程入住。結合高級家具與細緻裝潢，提供極致舒適與隱私的住宿享受。
          </p>

          <div class="room-actions">
            <a href="#" class="primary">查看詳情</a>
            <a href="#">加入收藏</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 左邊導覽列  這裡在幹嘛?-->
  <!-- <div
    class="w3-sidebar w3-bar-block w3-border-right"
    style="display: none"
    id="mySidebar">
    <button onclick="w3_close()" class="w3-bar-item w3-large">
      Close &times;
    </button>
    <a href="#" class="w3-bar-item w3-button">首頁</a>
    <a href="#" class="w3-bar-item w3-button">客房介紹</a>
    <a href="#" class="w3-bar-item w3-button">線上訂房</a>
    <a href="#" class="w3-bar-item w3-button">聯絡我們</a>
  </div> -->
  <router-view />
  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <h3>五尊佛大飯店</h3>
        <p>
          以舒適睡眠與高隱私為核心，提供旅人更細緻的住宿體驗。歡迎您蒞臨，享受更從容的旅程節奏。
        </p>
        <div style="margin-top: 12px">
          <span class="badge">Check-in 15:00</span>
          <span class="badge">Check-out 11:00</span>
        </div>
      </div>

      <div class="footer-col">
        <h4>快速連結</h4>
        <ul class="footer-links">
          <li></li>
          <li><a href="#">客房介紹</a></li>
          <li><a href="#">飯店設施</a></li>
          <li><a href="#">線上訂房</a></li>
          <li></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>聯絡資訊</h4>
        <ul class="footer-links">
          <li><a href="tel:+886-4-1234-5678">電話：04-1234-5678</a></li>
          <li>
            <a href="mailto:service@wuzunfo-hotel.example"
              >信箱：service@wuzunfo-hotel.example</a
            >
          </li>
          <li><a href="#">地址：台中市（示意）</a></li>
          <li><a href="#">服務時間：24 小時</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>五尊佛大飯店 © <span id="year"></span> All Rights Reserved.</span>
      <span>Design & Development: Lab Demo</span>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
/* Hero */
.hero {
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.08)),
    url("../assets/飯店大廳.jpg") center/cover no-repeat;
  color: #fff;
  padding: 56px 20px;
  border-bottom: 1px solid var(--border);
}

.hero-inner {
  max-width: var(--container);
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 13px;
  margin-bottom: 12px;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 34px;
  letter-spacing: 1px;
}

.hero p {
  margin: 0;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}

/* 主內容 */
.page-container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 32px 20px 44px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.room-section-title {
  font-size: 20px;
  margin: 0;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.section-note {
  color: var(--muted);
  font-size: 14px;
  margin: 0;
}

.room-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

@media (max-width: 980px) {
  .room-list {
    grid-template-columns: 1fr;
  }

  .navbar-container {
    flex-wrap: wrap;
  }

  .brand {
    min-width: 0;
  }

  .nav-links {
    width: 100%;
    justify-content: flex-start;
  }
}

.room-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background-color: #fff;
  box-shadow: var(--shadow);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.room-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.room-photo {
  width: 100%;
  height: 260px;
  background-color: #ddd;
  overflow: hidden;
  position: relative;
}

.room-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.05);
  transform: scale(1.02);
}

.room-tag {
  position: absolute;
  left: 14px;
  top: 14px;
  background: rgba(17, 17, 17, 0.78);
  color: #fff;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  z-index: 2;
}

/* 房卡 hover 遮罩 + 立即訂房 */
.room-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.55));
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px;
  gap: 10px;
  z-index: 1;
}

.room-card:hover .room-overlay {
  opacity: 1;
}

.room-overlay .overlay-left {
  color: rgba(255, 255, 255, 0.92);
  font-size: 13px;
  line-height: 1.4;
}

.room-overlay .overlay-left strong {
  display: block;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.room-overlay .overlay-btn {
  text-decoration: none;
  background: rgba(199, 163, 106, 0.92);
  color: #111;
  font-weight: 800;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(199, 163, 106, 0.9);
  transition:
    transform 0.15s ease,
    filter 0.2s ease;
  white-space: nowrap;
}

.room-overlay .overlay-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.room-info {
  padding: 18px 18px 16px;
}

.room-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.room-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.room-price {
  color: #111;
  font-weight: 800;
  font-size: 14px;
  background: rgba(199, 163, 106, 0.16);
  border: 1px solid rgba(199, 163, 106, 0.35);
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.room-info p {
  margin: 6px 0;
  color: #444;
  line-height: 1.7;
  font-size: 14px;
}

.room-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.meta-item {
  background: #fafafa;
  border: 1px solid #f0f0f0;
  padding: 10px 10px;
  border-radius: 12px;
}

.meta-item .k {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 2px;
}

.meta-item .v {
  font-size: 13px;
  font-weight: 700;
  color: #222;
}

.room-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.room-actions a {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  border: 1px solid var(--border);
  background: #fff;
  transition:
    transform 0.15s ease,
    background 0.2s ease;
  flex: 1;
}

.room-actions a:hover {
  transform: translateY(-1px);
  background: #fafafa;
}

.room-actions a.primary {
  border-color: rgba(199, 163, 106, 0.5);
  background: rgba(199, 163, 106, 0.15);
}

/* Sidebar */
.w3-sidebar {
  width: 280px;
}

/* Footer */
footer.site-footer {
  background: #0b0b0b;
  color: rgba(255, 255, 255, 0.86);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 20px;
}

.footer-inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 34px 20px 18px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 18px;
}

@media (max-width: 980px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}

.footer-brand h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 1px;
}

.footer-brand p {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  font-size: 14px;
  max-width: 520px;
}

.footer-col h4 {
  margin: 0 0 10px;
  font-size: 14px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.92);
  text-transform: uppercase;
}

.footer-links {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.footer-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.74);
  font-size: 14px;
  padding: 4px 0;
  display: inline-block;
}

.footer-links a:hover {
  color: #fff;
  text-decoration: underline;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px 20px;
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.82);
}
</style>
