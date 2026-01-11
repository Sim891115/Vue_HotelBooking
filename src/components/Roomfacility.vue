<template>
  <main class="page-container">
    <h1 class="page-title">飯店設施</h1>
    <p class="page-desc">
      從放鬆到運動、從美食到親子空間，提供你完整的旅宿體驗。
    </p>

    <!-- 小功能：分類篩選 -->
    <section class="filter-bar" aria-label="設施分類篩選">
      <button
        class="filter-btn"
        type="button"
        :class="{ 'is-active': activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >
        全部
      </button>

      <button
        class="filter-btn"
        type="button"
        :class="{ 'is-active': activeFilter === 'leisure' }"
        @click="activeFilter = 'leisure'"
      >
        休閒放鬆
      </button>

      <button
        class="filter-btn"
        type="button"
        :class="{ 'is-active': activeFilter === 'dining' }"
        @click="activeFilter = 'dining'"
      >
        餐飲
      </button>

      <button
        class="filter-btn"
        type="button"
        :class="{ 'is-active': activeFilter === 'kids' }"
        @click="activeFilter = 'kids'"
      >
        親子
      </button>

      <button
        class="filter-btn"
        type="button"
        :class="{ 'is-active': activeFilter === 'business' }"
        @click="activeFilter = 'business'"
      >
        商務
      </button>
    </section>

    <h2 class="section-title">設施（6）</h2>

    <section class="facility-list" aria-label="飯店設施列表">
      <!-- 1 健身房 -->
      <article
        class="facility-card"
        v-show="activeFilter === 'all' || activeFilter === 'leisure'"
      >
        <div class="facility-photo">
          <img src="../assets/健身房.jpg" alt="健身房" />
        </div>
        <div class="facility-info">
          <h3>健身房 Fitness Center</h3>
          <p><strong>開放時間：</strong> 06:00–22:00</p>
          <p><strong>位置：</strong> 2F</p>
          <p class="facility-feature">
            <strong>設施特色：</strong><br />
            配備跑步機、飛輪、重量訓練器材與伸展區。提供毛巾與飲水，讓你旅行也能維持節奏。
          </p>
          <div class="card flex justify-center">
            <button class="detail-btn" @click="visibleGym = true">
              查看更多
            </button>
            <Dialog
              v-model:visible="visibleGym"
              modal
              header="健身房 Fitness Center"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <hr />
              <p>開放時間：06:00–22:00</p>
              <p>位置：2F</p>
              <p>注意事項：需刷房卡入場；請穿著運動鞋。</p>

              <button class="detail-btn" @click="visibleGym = false">
                我知道了
              </button>
            </Dialog>
          </div>
        </div>
      </article>

      <!-- 2 泳池 -->
      <article
        class="facility-card"
        v-show="activeFilter === 'all' || activeFilter === 'leisure'"
      >
        <div class="facility-photo">
          <img src="../assets/泳池.jpg" alt="景觀泳池" />
        </div>
        <div class="facility-info">
          <h3>景觀泳池 Skyline Pool</h3>
          <p><strong>開放時間：</strong> 08:00–20:00</p>
          <p><strong>位置：</strong> 頂樓</p>
          <p class="facility-feature">
            <strong>設施特色：</strong><br />
            城市景觀第一排，設有躺椅休憩區與淋浴更衣空間。適合午後放鬆或夜間小酌。
          </p>

          <div class="card flex justify-center">
            <button class="detail-btn" @click="visibleSwimPool = true">
              查看更多
            </button>
            <Dialog
              v-model:visible="visibleSwimPool"
              modal
              header="景觀泳池 Skyline Pool"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <hr />
              <p>開放時間：08:00–20:00</p>
              <p>位置：頂樓</p>
              <p>
                12歲以下須家長陪同；請自備泳帽（若飯店規定可於現場租借/購買）。
              </p>

              <button class="detail-btn" @click="visibleSwimPool = false">
                我知道了
              </button>
            </Dialog>
          </div>
        </div>
      </article>

      <!-- 3 SPA -->
      <article
        class="facility-card"
        v-show="activeFilter === 'all' || activeFilter === 'SPA'"
      >
        <div class="facility-photo">
          <img src="../assets/SPA.jpg" alt="SPA 芳療" />
        </div>
        <div class="facility-info">
          <h3>芳療 SPA & Massage</h3>
          <p><strong>開放時間：</strong> 12:00–22:30（採預約制）</p>
          <p><strong>位置：</strong> 3F</p>
          <p class="facility-feature">
            <strong>設施特色：</strong><br />
            提供精油芳療、深層按摩、足部放鬆等服務。讓你把疲憊留在這裡，輕盈回到旅程。
          </p>

          <div class="card flex justify-center">
            <button class="detail-btn" @click="visibleSPA = true">
              查看更多
            </button>
            <Dialog
              v-model:visible="visibleSPA"
              modal
              header="景觀泳池 Skyline Pool"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <hr />
              <p>開放時間：12:00–22:30（採預約制）</p>
              <p>位置：3F</p>
              <p>建議提前預約；療程與價格依現場公告。</p>

              <button class="detail-btn" @click="visibleSPA = false">
                我知道了
              </button>
            </Dialog>
          </div>
        </div>
      </article>

      <!-- 4 全日餐廳 -->
      <article
        class="facility-card"
        v-show="activeFilter === 'all' || activeFilter === 'dining'"
      >
        <div class="facility-photo">
          <img src="../assets/餐廳.jpg" alt="全日餐廳" />
        </div>
        <div class="facility-info">
          <h3>全日餐廳 All Day Dining</h3>
          <p>
            <strong>供餐時段：</strong> 早餐 06:30–10:00｜午晚餐 11:30–21:00
          </p>
          <p><strong>位置：</strong> 1F</p>
          <p class="facility-feature">
            <strong>設施特色：</strong><br />
            精選在地食材與多國料理，提供自助餐與單點。適合家庭聚餐、商務簡餐或輕食咖啡。
          </p>

          <div class="card flex justify-center">
            <button class="detail-btn" @click="visibleDinig = true">
              查看更多
            </button>
            <Dialog
              v-model:visible="visibleDinig"
              modal
              header="全日餐廳 All Day Dining"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <hr />
              <p>開放時間：早餐 06:30–10:00｜午晚餐 11:30–21:00</p>
              <p>位置：1F</p>
              <p>早餐是否含在房價依訂房方案為準；座位依現場狀況安排。</p>

              <button class="detail-btn" @click="visibleDinig = false">
                我知道了
              </button>
            </Dialog>
          </div>
        </div>
      </article>

      <!-- 5 兒童遊戲室 -->
      <article
        class="facility-card"
        v-show="activeFilter === 'all' || activeFilter === 'kids'"
      >
        <div class="facility-photo">
          <img src="../assets/兒童遊戲室.jpg" alt="兒童遊戲室" />
        </div>
        <div class="facility-info">
          <h3>兒童遊戲室 Kids Club</h3>
          <p><strong>開放時間：</strong> 09:00–18:00</p>
          <p><strong>位置：</strong> 2F</p>
          <p class="facility-feature">
            <strong>設施特色：</strong><br />
            設有閱讀角、積木區與互動遊具。讓孩子盡情放電，大人也能安心喘口氣。
          </p>

          <div class="card flex justify-center">
            <button class="detail-btn" @click="visibleKids = true">
              查看更多
            </button>
            <Dialog
              v-model:visible="visibleKids"
              modal
              header="兒童遊戲室 Kids Club"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <hr />
              <p>開放時間：09:00–18:00</p>
              <p>位置：2F</p>
              <p>需家長陪同；請遵守現場遊戲規範與年齡建議。</p>

              <button class="detail-btn" @click="visibleKids = false">
                我知道了
              </button>
            </Dialog>
          </div>
        </div>
      </article>

      <!-- 6 商務中心 -->
      <article
        class="facility-card"
        v-show="activeFilter === 'all' || activeFilter === 'business'"
      >
        <div class="facility-photo">
          <img src="../assets/商務中心.jpg" alt="商務中心" />
        </div>
        <div class="facility-info">
          <h3>商務中心 Business Center</h3>
          <p><strong>開放時間：</strong> 24 小時</p>
          <p><strong>位置：</strong> B1</p>
          <p class="facility-feature">
            <strong>設施特色：</strong><br />
            提供電腦與列印、基本文具、安靜工作座位與高速網路。臨時開會、趕簡報都很方便。
          </p>

          <div class="card flex justify-center">
            <button class="detail-btn" @click="visibleBusiness = true">
              查看更多
            </button>
            <Dialog
              v-model:visible="visibleBusiness"
              modal
              header="商務中心 Business Center"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <hr />
              <p>開放時間：24 小時</p>
              <p>位置：B1</p>
              <p>列印可能需付費；詳細規範依現場公告。</p>

              <button class="detail-btn" @click="visibleBusiness = false">
                我知道了
              </button>
            </Dialog>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import Dialog from "primevue/dialog";
import { ref } from "vue";

const visible = ref(false);
const visibleGym = ref(false);
const visibleSwimPool = ref(false);
const visibleSPA = ref(false);
const visibleDinig = ref(false);
const visibleKids = ref(false);
const visibleBusiness = ref(false);
const activeFilter = ref("all");
</script>

<style scoped>
/* === 基本設定：沿用你客房介紹的整體風格 === */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
  background-color: #ffffff;
  color: #333;
}

/* 固定式導覽列 */
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: black;
  border-bottom: 1px solid #ddd;
  z-index: 999;
}

.navbar-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
}

.logo {
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 15px;
}

.nav-links a:hover {
  color: #000;
  text-decoration: underline;
}

/* 目前頁面標示（可選） */
.nav-links a.is-active {
  text-decoration: underline;
  text-underline-offset: 6px;
}

/* 頁面主內容 */
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 30px;
  margin-bottom: 6px;
  font-weight: 600;
}

.page-desc {
  color: #777;
  margin-bottom: 24px;
}

/* 分類篩選區 */
.filter-bar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.filter-btn {
  border: 1px solid #e5e5e5;
  background: #fff;
  color: #333;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
}

.filter-btn:hover {
  border-color: #bbb;
}

.filter-btn.is-active {
  background: #000;
  color: #fff;
  border-color: #000;
}

.section-title {
  font-size: 22px;
  margin: 10px 0 12px;
  font-weight: 600;
}

/* 設施列表：兩欄布局 */
.facility-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 30px;
}

/* 卡片 */
.facility-card {
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}

.facility-photo {
  width: 100%;
  height: 270px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.facility-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.facility-info {
  padding: 20px;
}

.facility-info h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.facility-info p {
  margin: 4px 0;
  color: #555;
  line-height: 1.6;
}

.facility-feature {
  margin-top: 10px;
}

/* 更多按鈕 */
.detail-btn {
  margin-top: 14px;
  border: 1px solid #000;
  background: #000;
  color: #fff;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.detail-btn:hover {
  opacity: 0.9;
}

/* 隱藏卡片（篩選用） */
.is-hidden {
  display: none !important;
}

/* === Modal === */
.modal {
  position: fixed;
  inset: 0;
  display: none;
  z-index: 2000;
}

.modal.is-open {
  display: block;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

.modal-card {
  position: relative;
  width: min(560px, calc(100% - 32px));
  margin: 80px auto;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid #eee;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.modal-close {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.modal-body {
  padding: 16px 18px;
  color: #555;
}

.modal-notes {
  margin-top: 6px;
  color: #444;
  line-height: 1.7;
}

.modal-footer {
  padding: 14px 18px 18px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-ok {
  border: 1px solid #000;
  background: #000;
  color: #fff;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.modal-ok:hover {
  opacity: 0.9;
}

/* 手機稍微調整（避免太擠） */
@media (max-width: 520px) {
  .facility-list {
    grid-template-columns: 1fr;
  }

  .facility-photo {
    height: 210px;
  }
}
</style>
