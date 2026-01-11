<template>
  <Toast position="bottom-center" />

  <div class="page-wrapper">
    <div class="container">
      <div class="header">
        <div class="header-text">
          <h1>訂房流程</h1>
          <p>確認房型與日期，填寫入住資料後送出訂單。</p>
        </div>
        <div class="contact-pill">
          <i class="pi pi-phone"></i> 客服 (02) 1234-5678
        </div>
      </div>

      <div class="card">
        <h2><span class="icon-decoration">📅</span> 訂房資訊</h2>

        <div
          class="info-item full-width"
          v-for="(r, index) in bookingData.rooms"
          :key="index"
        >
          <span class="label">房型</span>
          <span class="value highlight">
            {{ r.roomType }} × {{ r.quantity }} （單價 {{ r.unitPrice }}）
          </span>
        </div>

        <div class="info-item full-width">
          <span class="label">總金額</span>
          <span class="value highlight">
            {{ bookingData.totalAmount }}
          </span>
        </div>
        <div class="divider"></div>

        <h2><span class="icon-decoration">👤</span> 入住資料</h2>

        <div>
          <div class="form-group">
            <label for="name">入住人姓名</label>
            <InputText
              id="name"
              type="text"
              v-model="Name"
              placeholder="請輸入真實姓名"
              class="w-full"
            />
          </div>
          <div class="form-group">
            <label for="GuestIdNumber">身分證字號</label>
            <InputText
              id="GuestIdNumber"
              type="text"
              v-model="guestIdNumber"
              placeholder="請輸入真實姓名"
              class="w-full"
            />
          </div>

          <div class="form-group">
            <label for="phone">聯絡電話</label>
            <InputText
              id="phone"
              type="tel"
              v-model="Phone"
              placeholder="例如：0912-345-678"
              class="w-full"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <InputText
              id="email"
              type="email"
              v-model="Email"
              placeholder="name@example.com"
              class="w-full"
            />
          </div>

          <div class="form-group">
            <label for="cardNumber">信用卡號</label>
            <InputText
              id="cardNumber"
              type="text"
              v-model="CardNumber"
              placeholder="例如：4111 1234 1234 1234"
              maxlength="19"
              class="w-full"
            />
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label for="cardExpiry">卡片到期日</label>
              <InputText
                id="cardExpiry"
                type="text"
                v-model="CardExpiry"
                placeholder="MM/YY"
                inputmode="numeric"
                autocomplete="cc-exp"
                maxlength="5"
                class="w-full"
              />
            </div>

            <div class="form-group half">
              <label for="cardCvc">3碼驗證碼</label>
              <InputText
                id="cardCvc"
                type="password"
                v-model="CardCvc"
                placeholder="CVC"
                autocomplete="cc-csc"
                maxlength="3"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <Button
            label="確認訂單"
            icon="pi pi-check"
            class="p-button-primary btn-submit"
            @click="orderSend"
          />

          <router-link to="/OrderInquiry" class="link-wrapper">
            <Button
              label="返回查詢"
              severity="secondary"
              class="p-button-outlined btn-back w-full"
            />
          </router-link>
        </div>
      </div>

      <footer>
        <p>
          ©
          <span id="year">{{ new Date().getFullYear() }}</span>
          飯店名稱。版權所有。
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue"; // 注意: 依你的 PrimeVue 版本，有些元件不需要手動 import Toast
import { useRoute, useRouter } from "vue-router";

import api from "../api/api";

const toast = useToast();

const route = useRoute(); // ⭐ 讀 query
const router = useRouter(); // 之後用來 push

const bookingData = computed(() => {
  const rooms = route.query.rooms ? JSON.parse(route.query.rooms) : [];

  return {
    checkInDate: route.query.checkInDate || "",
    checkOutDate: route.query.checkOutDate || "",
    rooms,
    totalAmount: rooms.reduce((sum, r) => sum + r.unitPrice * r.quantity, 0),
  };
});

const Name = ref("");
const Phone = ref("");
const Email = ref("");
const guestIdNumber = ref("");
const CardNumber = ref("");
const CardExpiry = ref("");
const CardCvc = ref("");

// 送出訂單
async function orderSend() {
  try {
    const response = await api.post("/bookings/create/Guest", {
      checkinDate: bookingData.value.checkInDate,
      checkoutDate: bookingData.value.checkOutDate,
      currency: "TWD",

      guestIdNumber: guestIdNumber.value,
      guestName: Name.value,
      guestEmail: Email.value,
      guestPhone: Phone.value,

      items: bookingData.value.rooms.map((r) => ({
        roomTypeId: r.roomTypeId,
        quantity: r.quantity,
        unitPrice: r.unitPrice,
        checkinDate: bookingData.value.checkInDate,
        checkoutDate: bookingData.value.checkOutDate,
      })),
    });

    toast.add({
      severity: "success",
      summary: "成功",
      detail: "訂單建立完成",
    });
    console.log("後端回傳：", response.data);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "錯誤",
      detail: "訂單建立失敗",
    });
  }
}
</script>

<style scoped>
/* 全局設定與背景 */
.page-wrapper {
  background-color: #f8f9fa; /* 淺灰背景，降低眼睛疲勞 */
  min-height: 100vh;
  padding: 40px 20px;
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  color: #334155;
}

.container {
  max-width: 600px; /* 限制最大寬度，避免在電腦版過寬 */
  margin: 0 auto;
}

/* Header 區域美化 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 15px;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.header p {
  color: #64748b;
  margin: 0;
  font-size: 14px;
}

.contact-pill {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 卡片主體 */
.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
}

h2 {
  font-size: 18px;
  color: #0f172a;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.icon-decoration {
  margin-right: 8px;
  font-size: 20px;
}

/* 訂房資訊摘要區塊 (新設計) */
.info-summary {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: 1 / -1;
  border-top: 1px dashed #cbd5e1;
  padding-top: 12px;
  margin-top: 4px;
}

.info-item .label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item .value {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
}

.info-item .value.highlight {
  color: #0ea5e9; /* 亮藍色強調房型 */
  font-size: 18px;
}

/* 分隔線 */
.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 32px 0;
  border: none;
}

/* 表單區塊 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #475569;
}

/* PrimeVue 元件覆寫與輔助類別 */
.w-full {
  width: 100%;
}

/* InputText 會自動套用 PrimeVue 樣式，這裡只需微調 */
:deep(.p-inputtext) {
  padding: 12px;
  border-radius: 8px;
}
:deep(.p-inputtext:hover) {
  border-color: #0ea5e9;
}
:deep(.p-inputtext:focus) {
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
  border-color: #0ea5e9;
}

/* 按鈕區域 */
.action-buttons {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-submit {
  width: 100%;
  justify-content: center;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  background-color: #0f172a; /* 深色按鈕更有質感 */
  border: none;
}
.btn-submit:hover {
  background-color: #1e293b;
}

.link-wrapper {
  text-decoration: none;
  display: block;
}

.btn-back {
  width: 100%;
}

/* Footer */
footer {
  margin-top: 40px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}
/* 信用卡到期日 */
.form-row {
  display: flex;
  gap: 12px;
}

.form-row .half {
  flex: 1;
}
/* RWD 手機版微調 */
@media (max-width: 640px) {
  .card {
    padding: 24px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-pill {
    width: 100%;
    justify-content: center;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>
