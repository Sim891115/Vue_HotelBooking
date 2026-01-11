<template>
  <Toast position="bottom-center" />

  <div class="container_Order_Inquiry">
    <h1>訂單查詢</h1>

    <div class="form-group_Order_Inquiry">
      <label for="orderNo">訂單編號</label>
      <InputText
        id="orderNo"
        v-model="bookingNumber"
        placeholder="請輸入訂單編號"
        class="w-100"
      />
    </div>

    <div class="form-group_Order_Inquiry">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model="email"
        placeholder="請輸入 Email"
        class="w-100"
      />
    </div>

    <Button
      type="submit"
      label="查詢訂單"
      severity="secondary"
      class="w-100 btn-spacing"
      @click="searchOrder"
    />

    <div v-if="result?.length" class="result">
      <div v-for="booking in result" :key="booking.id" class="result-card">
        <!-- 訂單層 -->
        <div class="result-item">
          <span>訂單編號：</span>
          <strong>{{ booking.bookingNumber }}</strong>
        </div>

        <div class="result-item">
          <span>訂單狀態：</span>
          <strong>{{ booking.status }}</strong>
        </div>

        <!-- 房型明細 -->
        <div
          v-for="(room, index) in booking.items"
          :key="index"
          class="result-card"
          style="margin-top: 10px"
        >
          <div class="result-item">
            <span>入住日期：</span>
            <strong>{{ room.checkinDate }}</strong>
          </div>

          <div class="result-item">
            <span>退房日期：</span>
            <strong>{{ room.checkoutDate }}</strong>
          </div>

          <div class="result-item">
            <span>房型：</span>
            <strong>{{ room.roomType }}</strong>
          </div>

          <div class="result-item">
            <span>數量：</span>
            <strong>{{ room.quantity }}</strong>
          </div>

          <div class="result-item">
            <span>小計：</span>
            <strong class="price-highlight">
              NT$ {{ room.totalAmount }}
            </strong>
          </div>
        </div>

        <!-- 訂單總金額 -->
        <div class="result-item" style="margin-top: 15px">
          <span>訂單總金額：</span>
          <strong class="total-amount"> NT$ {{ booking.totalAmount }} </strong>
        </div>
      </div>
    </div>

    <footer>© 五尊佛飯店名稱。版權所有。</footer>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref, computed } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import api from "../api/api";
const toast = useToast();
// 表單輸入
const bookingNumber = ref("");
const email = ref("");

const result = ref([]);

// 查詢邏輯
async function searchOrder() {
  // 1. 基本驗證
  if (!bookingNumber.value.trim() || !email.value.trim()) {
    toast.add({
      severity: "error",
      summary: "錯誤",
      detail: "❌ 查無此訂單，請檢查編號或 Email。",
      life: 3000,
    });
    return;
  }

  try {
    const params = { Email: email.value, bookingNumber: bookingNumber.value };
    const response = await api.get("/bookings/query/member", {
      params: params,
    });
    result.value = response.data.data;

    toast.add({
      severity: "success",
      summary: "查詢成功",
      detail: "已找到您的訂單資料！",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "查詢失敗",
      detail: "❌ 查無此訂單，請檢查編號或 Email 是否正確。",
      life: 3000,
    });
  }
}

// 清除查詢
function clearSearch() {
  result.value = null;
  name.value = "";
  email.value = "";
}
</script>

<style scoped>
/* 你原本的設定 */
/* ===== 查詢結果區 ===== */
.result {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* ===== 訂單卡片（最外層） ===== */
.result-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
  animation: fadeIn 0.4s ease;
}

/* ===== 每一列資訊 ===== */
.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;
  border-bottom: 1px dashed #e5e7eb;
  font-size: 0.95rem;
}

.result-item:last-child {
  border-bottom: none;
}

/* 左邊標題 */
.result-item span {
  color: #6b7280; /* 灰藍色 */
  font-weight: 500;
}

/* 右邊內容 */
.result-item strong {
  color: #111827;
  font-weight: 600;
}

/* ===== 房型明細卡片（內層） ===== */
.result-card .result-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px 18px;
  margin-top: 15px;

  box-shadow: inset 0 0 0 1px #e5e7eb;
}

/* 房型明細列縮小一點 */
.result-card .result-card .result-item {
  font-size: 0.9rem;
  padding: 8px 0;
}

/* ===== 金額樣式 ===== */
.price-highlight {
  color: #d32f2f;
  font-weight: 700;
}

/* 訂單總金額特別放大 */
.total-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #b91c1c;
}

/* ===== 動畫 ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container_Order_Inquiry {
  width: 400px;
  margin: 80px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.container_Order_Inquiry h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}
.form-group_Order_Inquiry {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #555;
}
.w-100 {
  width: 100%;
}
.btn-spacing {
  margin-top: 10px;
  font-weight: bold;
}
footer {
  margin-top: 30px;
  text-align: center;
  font-size: 12px;
  color: #888;
}

/* --- 新增的結果樣式 (利用你原本定義的 .result) --- */
.result {
  margin-top: 25px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f1f3f5; /* 淺灰色背景 */
  border: 1px solid #dee2e6;
  animation: fadeIn 0.5s ease; /* 簡單的淡入動畫 */
}

.result h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c7a7b; /* 跟你的按鈕色系搭配 */
  text-align: center;
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
}

.result-item:last-child {
  border-bottom: none;
}

.error-msg {
  margin-top: 20px;
  color: red;
  text-align: center;
  font-weight: bold;
}

.mt-2 {
  margin-top: 10px;
}

/* 簡單的淡入動畫 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card {
  background-color: #fff; /* 白色背景，讓卡片凸顯 */
  border: 1px solid #ddd; /* 淺灰色邊框 */
  border-radius: 8px; /* 圓角 */
  padding: 15px 20px; /* 內距：讓文字不要貼邊 */

  /* 🔥 關鍵：讓卡片之間有距離，不會黏在一起 */
  margin-bottom: 20px;

  /* 增加一點陰影，讓卡片有立體感 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 針對每一行資料 (左邊標題、右邊內容) */
.result-item {
  display: flex; /* 使用 Flex 排版 */
  justify-content: space-between; /* 讓標題靠左、內容靠右 */
  align-items: center; /* 垂直置中 */

  margin-bottom: 10px; /* 行與行之間的距離 */
  padding-bottom: 10px; /* 為了顯示下方的分隔線 */
  border-bottom: 1px dashed #eee; /* 虛線分隔線，增加閱讀性 */
}

/* 讓卡片裡面的最後一行不要有分隔線跟多餘距離 */
.result-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

/* 標題文字稍微淡一點 */
.result-item span {
  color: #666;
  font-size: 0.95rem;
}

/* 內容文字加深 */
.result-item strong {
  color: #333;
  font-weight: 600;
}
</style>
