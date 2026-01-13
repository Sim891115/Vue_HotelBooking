<template>
  <div class="page">
    <div class="header">
      <h2>歷史訂單</h2>
      <p class="desc">查看已完成或已入住的訂單紀錄。</p>
    </div>

    <div class="card">
      <div class="filters">
        <div class="field">
          <label>關鍵字（房型/訂單號）</label>
          <InputText v-model="keyword" placeholder="例如：Taichung / OD2025..." />
        </div>

        <div class="btns">
          <Button label="清除" icon="pi pi-times" severity="secondary" @click="keyword = ''" />
        </div>
      </div>

      <div class="divider"></div>

      <table class="table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>入住/退房</th>
            <th>房型</th>
            <th>狀態</th>
            <th class="right">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in filtered" :key="o.orderNo" style="color: black">
            <td>{{ o.bookingNumber }}</td>
            <td>{{ o.checkInDate }} ~ {{ o.checkOutDate }}</td>
            <td>{{ o.roomType }}</td>
            <td>{{ o.status }}</td>
            <td class="right">
              NT$ {{ o.totalAmount?.toLocaleString() ?? "-" }}
            </td>
          </tr>

          <tr v-if="filtered.length === 0">
            <td colspan="6" class="empty">沒有符合的歷史訂單</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import api from "../../api/api";

const keyword = ref("");

const history = ref([]);

onMounted(() => {
  OrderHistory();
});

async function OrderHistory() {
  try {
    const response = await api.get("/GetBookingHistory/history");
    history.value = response.data;
    console.log(history.value);
  } catch (error) {
    console.log(error);
  }
}

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  if (!k) return history.value;

  return history.value.filter((o) => {
    const orderNo = String(o.bookingNumber ?? "").toLowerCase();
    const roomType = String(o.roomType ?? "").toLowerCase();

    return orderNo.includes(k) || roomType.includes(k);
  });
});
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
  grid-template-columns: 1fr auto;
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

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 8px;
  text-align: left;
}

.table th {
  font-size: 13px;
  color: #444;
  background: #fafafa;
}

.right {
  text-align: right;
}

.empty {
  text-align: center;
  color: #666;
  padding: 18px 8px;
}

@media (max-width: 720px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .right {
    text-align: left;
  }
}
</style>
