<template>
  <div class="page">
    <div class="header">
      <h2>訂單查詢</h2>
      <p class="desc">輸入訂單編號或 Email 查詢訂單狀態。</p>
    </div>

    <div class="card">
      <div class="filters">
        <div class="field">
          <label>訂單編號</label>
          <InputText
            v-model="query.orderNo"
            placeholder="例如：OD20260104001"
          />
        </div>

        <div class="field">
          <label>Email</label>
          <InputText
            v-model="query.email"
            placeholder="例如：ming@example.com"
          />
        </div>

        <div class="btns">
          <Button label="查詢" icon="pi pi-search" @click="search" />
          <Button
            label="清除"
            icon="pi pi-times"
            severity="secondary"
            @click="clear"
          />
        </div>
      </div>

      <div class="divider"></div>

      <div v-if="loading" class="hint">查詢中...</div>
      <div v-else-if="results.length === 0" class="hint">
        尚無結果（範例：按「查詢」會顯示假資料）。
      </div>

      <div v-else class="list">
        <div v-for="item in results" :key="item.orderNo" class="row">
          <div class="left">
            <div class="title">{{ item.orderNo }} · {{ item.hotel }}</div>
            <div class="sub">
              {{ item.checkIn }} ~ {{ item.checkOut }} · {{ item.roomType }}
            </div>
          </div>
          <div class="right">
            <div class="status">{{ item.status }}</div>
            <div class="price">NT$ {{ item.total.toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const query = reactive({ orderNo: "", email: "" });
const loading = ref(false);
const results = ref([]);

async function search() {
  loading.value = true;
  results.value = [];

  // TODO: 改成 API，例如 GET /orders/inquiry?orderNo=...&email=...
  await new Promise((r) => setTimeout(r, 400));

  results.value = [
    {
      orderNo: "OD20260104001",
      hotel: "範例飯店 Taichung",
      checkIn: "2026-01-10",
      checkOut: "2026-01-12",
      roomType: "雙人房",
      status: "已確認",
      total: 6800,
    },
    {
      orderNo: "OD20251228018",
      hotel: "範例飯店 Kaohsiung",
      checkIn: "2025-12-31",
      checkOut: "2026-01-01",
      roomType: "家庭房",
      status: "已入住",
      total: 9200,
    },
  ];

  loading.value = false;
}

function clear() {
  query.orderNo = "";
  query.email = "";
  results.value = [];
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.header h2 {
  margin: 0;
}
.desc {
  margin: 4px 0 0;
  color: #666;
}

.card {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 14px;
}
.filters {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: end;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-size: 13px;
  color: #444;
}
.btns {
  display: flex;
  gap: 8px;
}
.divider {
  height: 1px;
  background: #eee;
  margin: 14px 0;
}
.hint {
  color: #666;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 12px;
}
.title {
  font-weight: 600;
}
.sub {
  color: #666;
  margin-top: 4px;
  font-size: 13px;
}
.right {
  text-align: right;
}
.status {
  font-weight: 600;
}
.price {
  margin-top: 4px;
  color: #333;
}

@media (max-width: 720px) {
  .filters {
    grid-template-columns: 1fr;
  }
  .btns {
    justify-content: flex-start;
  }
}
</style>
