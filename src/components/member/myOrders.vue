<template>
  <div class="page">
    <div class="header">
      <h2>我的訂單</h2>
      <p class="desc">查看目前進行中的訂單。</p>
    </div>

    <div class="card">
      <div class="tabs">
        <Button
          v-for="t in tabs"
          :key="t.value"
          :label="t.label"
          :severity="status === t.value ? 'primary' : 'secondary'"
          @click="status = t.value"
        />
      </div>

      <div class="divider"></div>

      <div v-if="filtered.length === 0" class="hint">
        目前沒有符合狀態的訂單。
      </div>

      <div v-else class="list">
        <div v-for="o in filtered" :key="o.id" class="row">
          <div class="left">
            <div class="title">{{ o.roomType }}</div>
            <div class="sub">{{ o.checkInDate }} ~ {{ o.checkOutDate }}</div>
            <div class="sub">訂單：{{ o.bookingNumber }}</div>
          </div>

          <div class="right">
            <div class="status">{{ o.status }}</div>
            <div class="price">
              NT$ {{ o.totalAmount?.toLocaleString() ?? "-" }}
            </div>
            <div class="actions">
              <Button
                label="查看"
                icon="pi pi-eye"
                severity="secondary"
                @click="dialogVisible = true;"
              />
              <Dialog v-model:visible="dialogVisible" :header="`訂單詳情`" :modal="true" :closable="true" :style="{ width: '600px' }">
                <div class="dialog-content">
                  <p>訂單編號：{{ o.bookingNumber }}</p>
                  <p>房型：{{ o.roomType }}</p>
                  <p>入住日期：{{ o.checkInDate }}</p>
                  <p>退房日期：{{ o.checkOutDate }}</p>
                  <p>幣別:{{o.currency}}</p>
                  <p>入住晚數{{ o.nights }}X 間數{{ o.quantity }}=
                    總金額：NT$ {{ o.totalAmount?.toLocaleString() ?? "-" }}</p>
                  <p>備註:{{ o.remarks }}</p>
                </div>
              </Dialog>
              <Button
                v-if="o.status === '待付款'"
                label="去付款"
                icon="pi pi-credit-card"
                @click="pay(o)"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import Button from "primevue/button";
import api from "../../api/api";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

const status = ref("all");
const message = ref("");

const tabs = [
  { label: "全部", value: "all" },
  { label: "待付款", value: "待付款" },
  { label: "已確認", value: "已確認" },
  { label: "取消/退款", value: "取消/退款" },
];

const orders = ref([
 
]);

// 進入此網頁後，馬上掛載
onMounted(() => {
  myOrders();
});

async function myOrders() {
  try {
    const response = await api.get("/MemberBookingSearch/searchAll");
    orders.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

const filtered = computed(() => {
  if (status.value === "all") return orders.value;
  return orders.value.filter((x) => x.status === status.value);
});

const dialogVisible = ref(false);
function view(o) {
  message.value = `查看訂單：${o.bookingNumber}（範例訊息）`;
}

function pay(o) {
  message.value = `導向付款：${o.bookingNumber}（範例訊息）`;
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

.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
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
  color: black;
  font-weight: 600;
}

.sub {
  color: #666;
  margin-top: 4px;
  font-size: 13px;
}

.right {
  text-align: right;
  min-width: 240px;
}

.status {
  color: black;
  font-weight: 600;
}

.price {
  color: black;
  margin-top: 4px;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 10px;
  flex-wrap: wrap;
}

.message {
  margin-top: 12px;
  color: #0d47a1;
}

@media (max-width: 720px) {
  .row {
    flex-direction: column;
  }

  .right {
    text-align: left;
    min-width: auto;
  }

  .actions {
    justify-content: flex-start;
  }
}
</style>
