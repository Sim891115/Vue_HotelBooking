<template>
  <Toast />
  <!-- HERO 視覺區 -->
  <header class="hero">
    <div class="hero-overlay">
      <h1>聯絡我們</h1>
      <p>Contact</p>
    </div>
  </header>

  <!-- 主要內容 -->
  <main class="container">
    <!-- 左側：聯絡資訊 -->
    <section class="contact-info">
      <h2>聯絡資訊</h2>
      <ul>
        <li><strong>電話</strong>｜+886-4-1234-5678</li>
        <li><strong>Email</strong>｜service@luxuryhotel.com</li>
        <li><strong>地址</strong>｜台中市西區豪華路 99 號</li>
      </ul>
    </section>

    <!-- 右側：表單 -->
    <section class="contact-form">
      <h2>線上表單</h2>
      <!-- 以下是問題選項 -->
      <form id="contactForm">
        <label>問題類別</label>
        <Select
          v-model="form.category"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="請選擇"
          class="w-full"
        />
        <label for="form.name">姓名</label>
        <InputText
          v-model="form.name"
          type="text"
          id="form.name"
          placeholder="請輸入姓名"
        />

        <label>性別</label>
        <div class="gender">
          <label
            ><input type="radio" name="gender" value="先生" checked />
            先生</label
          >

          <label><input type="radio" name="gender" value="小姐" /> 小姐</label>
        </div>

        <label>聯絡電話</label>
        <input
          type="tel"
          name="phone"
          v-model="phone"
          placeholder="請輸入聯絡電話"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="請輸入 Email"
          required
        />

        <label>訂單編號（選填）</label>
        <input
          type="text"
          name="orderNo"
          v-model="orderNumber"
          placeholder="例如：HT20251201"
        />

        <label>留言內容</label>
        <textarea
          v-model="msg"
          name="message"
          placeholder="請輸入您的需求或意見"
          required
        ></textarea>

        <button type="button" @click="sumbitQuest">送出表單</button>
      </form>
    </section>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <h3>五尊佛大飯店</h3>
        <p>
          以舒適睡眠與高隱私為核心，提供旅人更細緻的住宿體驗。歡迎您蒞臨，享受更從容的旅程節奏。
        </p>
        <div style="margin-top: 12px">
          <a class="badge">Check-in 15:00</a>
          <a class="badge">Check-out 11:00</a>
        </div>
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
          <li>
            <a
              href="https://www.google.com/maps/place/%E8%B3%87%E5%B1%95%E5%9C%8B%E9%9A%9B-%E5%8E%9F+%E8%B3%87%E7%AD%96%E6%9C%83-%E6%95%B8%E4%BD%8D%E6%95%99%E8%82%B2%E7%A0%94%E7%A9%B6%E6%89%80-%E4%B8%AD%E5%8D%80/data=!4m2!3m1!1s0x0:0x334dfd5796c49ff6?sa=X&ved=1t:2428&ictx=111"
              >地址：臺中市南屯區公益路二段51號18樓</a
            >
          </li>
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
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();

// 表單資料
// 問題類別選項
const form = ref({
  category: "",
});
const categoryOptions = [
  { label: "一般詢問", value: "general" },
  { label: "訂單問題", value: "order" },
  { label: "投訴與建議", value: "complaint" },
  { label: "其他", value: "other" },
];
// 姓名
const name = ref("");
const phone = ref("");
const email = ref("");
const orderNumber = ref("");
const msg = ref("");

async function sumbitQuest() {
  try {
    const params = {
      Category: selectQuest.value,
      Name: name.value,
      Gender: selectGender.value,
      Phone: phone.value,
      Email: email.value,
      BookingNumber: orderNumber.value,
      Message: msg.value,
    };

    await api.post("ContactUs/Submit", params);

    toast.add({
      severity: "success",
      summary: "成功",
      detail: "訂單已送出",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "失敗",
      detail: "格式有錯誤",
      life: 3000,
    });
  }
}
</script>

<style scoped>
.hero {
  height: 320px;
  background-image: url("../assets/contact_us_hotel.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 80px;
}

.hero h1 {
  font-size: 42px;
  margin: 0;
}

.hero p {
  font-size: 18px;
  letter-spacing: 2px;
}

/* 主容器 */
.container {
  max-width: 1200px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  padding: 0 40px;
}

/* 聯絡資訊 */
.contact-info h2 {
  font-size: 24px;
  border-bottom: 2px solid #c8a46a;
  padding-bottom: 10px;
}

.contact-info ul {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

.contact-info li {
  margin-bottom: 18px;
  font-size: 16px;
}

/* 表單 */
.contact-form h2 {
  font-size: 24px;
  margin-bottom: 30px;
}

.contact-form label {
  display: block;
  margin-top: 20px;
  font-size: 14px;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.contact-form textarea {
  height: 120px;
  resize: none;
}

.gender {
  margin-top: 10px;
  display: flex;
  gap: 30px;
}

.gender label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

button {
  margin-top: 30px;
  padding: 14px;
  width: 200px;
  background-color: #c8a46a;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #b08e58;
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
