<template>
  <!-- Hero -->
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-badge">會員中心</div>
      <h1>我的會員中心</h1>
      <p>歡迎來到會員中心! 在此頁面您可以查看和管理您的會員資料與訂單資訊</p>
    </div>
  </section>
  <!-- Main -->
  <section class="member">
    <div class="member-inner">
      <!-- 左側選單 -->
      <Listbox
        :options="options"
        optionLabel="label"
        optionValue="value"
        style="width: 200px"
        v-model="selectPage"
      />

      <!-- 右側內容 -->
      <div class="content">
        <MemberInfo v-if="selectPage === 'memberInfo'" />
        <MyOrders v-else-if="selectPage === 'myOrders'" />
        <OrderInquiry v-else-if="selectPage === 'orderInquiry'" />
        <OrderHistory v-else-if="selectPage === 'orderHistory'" />
      </div>
    </div>
  </section>
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

<script setup>
import { ref, reactive } from "vue";
// import Button from "primevue/button";
// import InputText from "primevue/inputtext";
import Listbox from "primevue/Listbox";

//引入右側內容區顯示內容

import MemberInfo from "./member/MemberInfo.vue";
import OrderInquiry from "./member/OrderInquiry.vue";
import OrderHistory from "./member/OrderHistory.vue";
import MyOrders from "./member/MyOrders.vue";

// 選單選項
const selectPage = ref("memberInfo");
const options = [
  { label: "會員資料", value: "memberInfo" },
  { label: "訂單查詢", value: "orderInquiry" },
  { label: "我的訂單", value: "myOrders" },
  { label: "歷史訂單", value: "orderHistory" },
];
</script>

<style scoped>
.hero {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.08)),
    url("../assets/210513113644708-L.jpg") center/cover no-repeat;
  padding: 2rem 1rem;
  text-align: center;
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
  color: white;
  margin: 0 0 8px;
  font-size: 34px;
  letter-spacing: 1px;
}

.hero p {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}

.member {
  padding: 16px;
}

.member-inner {
  max-width: var(--container);
  display: flex;
  margin: 0 auto;
  gap: 16px;
}
.content {
  flex: 1;
  border: 1px solid #ddd;
  padding: 12px;
  min-height: 200px;
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
  display: block;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
}
</style>
