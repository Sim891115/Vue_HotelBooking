<template>
  <div class="page-root">
    <!-- 🔥 Hero / Carousel（滿版） -->
    <section class="hero">
      <div class="carousel-track">
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="img"
          class="slide"
          :class="{ active: index === currentSlide }"
        />
      </div>

      <div class="hero-overlay">
        <div></div>

        <nav class="nav-overlay">
          <!-- <router-link to="/RoomIntro" class="nav_word"> 網站路口 </router-link> -->
          <a @click.prevent="scrollToQuickSearch" href="#quick-search"
            >快速查詢空房</a
          >
        </nav>
      </div>
    </section>

    <!-- 🔹 內容區（限制寬度） -->
    <section class="container">
      <div class="grid grid-3">
        <!-- 公告 -->
        <div class="card" v-if="notSearchRooms">
          <h2>最新公告</h2>
          <ul>
            <li v-for="ann in announcements" :key="ann.id" class="ann-item">
              <div>
                <strong>{{ ann.title }}</strong
                ><br />
                <span class="date">發布日期：{{ ann.publishedAt }}</span>
              </div>
              <!-- <button class="read-btn">閱讀</button> -->
            </li>
          </ul>
        </div>

        <!-- 顯示空房資訊 -->
        <div v-else>
          <div class="card">
            <DataTable
              :value="products"
              showGridlines
              tableStyle="min-width: 50rem"
            >
              <Column field="roomType" header="客房類型">
                <template #body="{ data }">
                  <div class="flex flex-column gap-2">
                    <div class="text-blue-600 font-bold text-lg">
                      {{ data.roomType }}
                    </div>

                    <div class="text-gray-700">
                      {{ data.bedInfo || "—" }}
                    </div>

                    <div class="text-sm text-gray-600">
                      <span
                        v-for="a in data.roomAmenities"
                        :key="a.amenityId"
                        class="mr-2"
                      >
                        {{ a.amenityName }}
                      </span>
                    </div>
                  </div>
                </template>
              </Column>

              <Column field="capacity" header="住客人數"
                ><template #body="slotProps">
                  <div class="flex gap-1">
                    <i
                      v-for="n in slotProps.data.capacity"
                      :key="n"
                      class="pi pi-user text-xl"
                    ></i>
                  </div> </template
              ></Column>
              <Column field="basePrice" header="房間價格"></Column>
              <Column field="remarks" header="預訂須知"></Column>
              <Column field="availableCounts" header="選擇數量">
                <!-- <template #body="{ data }">
                  <Select
                    v-model="data.selectedQty"
                    :options="getCountOptions(data)"
                    placeholder="請選擇數量"
                  />
                </template> -->
                <template #body="{ data }">
                  <Select
                    :modelValue="data.selectedQty"
                    :options="getCountOptions(data)"
                    placeholder="請選擇數量"
                    @update:modelValue="
                      (qty) => {
                        data.selectedQty = qty;
                        updateCart(data, qty);
                      }
                    "
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>

        <!-- 快速查詢 -->
        <div class="card">
          <section ref="quickSearchRef">
            <div
              id="quick-search"
              style="display: flex; justify-content: space-between"
            >
              <h2 id="quick-search-title">快速查詢空房</h2>
              <!-- <Button
                style="height: 30px; margin-top: 25px"
                @click="notSearchRooms = !notSearchRooms"
              >
                顯示空房資訊
              </Button> -->
            </div>

            <label>入住日期</label>
            <br />
            <DatePicker v-model="checkIn" dateFormat="yy/mm/dd" fluid />
            <br />
            <label>退房日期</label>
            <br />
            <DatePicker v-model="checkOut" dateFormat="yy/mm/dd" fluid />
            <br />

            <!-- <div style="gap: 20px">
              <label>房型:</label>
            </div> -->

            <br />
            <Select
              style="width: 100%"
              v-model="roomType"
              :options="rooms"
              optionLabel="room"
              optionValue="code"
              placeholder="請選擇房型"
            />

            <p class="err">{{ errorMsg }}</p>

            <button
              class="btn-send"
              v-if="!notSearchRooms"
              style="width: 100%; margin-bottom: 15px"
              severity="info"
              @click="SearchVacantRoom"
            >
              查詢空房
            </button>

            <button
              class="btn-send"
              v-if="!notSearchRooms"
              style="width: 100%; margin-bottom: 15px"
              severity="info"
              @click="OrederRooms"
            >
              立即訂購
            </button>

            <Button
              v-if="!notSearchRooms"
              style="width: 100%; margin-bottom: 15px"
              label="返回"
              severity="info"
              @click="notSearchRooms = !notSearchRooms"
            />

            <br /><br />

            <button
              class="btn-send"
              v-if="notSearchRooms"
              severity="info"
              @click="notSearchRooms = !notSearchRooms"
            >
              確定
            </button>

            <button class="btn-secondary" @click="clearForm">清除</button>
          </section>
        </div>
      </div>
    </section>
  </div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <h3>五尊佛大飯店</h3>
        <p>
          以舒適睡眠與高隱私為核心，提供旅人更細緻的住宿體驗。歡迎您蒞臨，享受更從容的旅程節奏。
        </p>
        <br /><br />
        <div>
          <a class="badge">Check-in 15:00</a>
          <br />
          <a class="badge">Check-out 11:00</a>
        </div>
      </div>

      <!-- 🔽 Google Map -->
      <!-- <div class="footer-col"> -->
      <div class="map-info">
        <h3>飯店資訊</h3>
        <p>地址：臺中市南屯區公益路二段51號18樓</p>
        <p>電話：04-1234-5678</p>
        <a href="mailto:service@wuzunfo-hotel.example"
          >信箱：service@wuzunfo-hotel.example</a
        >
      </div>

      <div class="map">
        <iframe
          src="https://www.google.com/maps?q=台中市南屯區公益路二段51號&output=embed"
          width="450"
          height="300"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <!-- </div> -->
    </div>

    <div class="footer-bottom">
      <span>五尊佛大飯店 © <span id="year"></span> All Rights Reserved.</span>
      <span>Design & Development: Lab Demo</span>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import { Button } from "primevue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import api from "../api/api";
import img1 from "../assets/1-3.jpeg";
import img2 from "../assets/210513113644708-L.jpg";
import img3 from "../assets/210617142250126-XXL.jpg";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";

const products = ref([]);
const router = useRouter();

/* ===== 從【客房介紹】點擊【立即訂房】後直接跳轉到【快速查詢空房】 ===== */
const route = useRoute();

function applyRoomTypeFromQuery() {
  const rt = route.query.roomType;
  if (!rt) return;

  roomType.value = String(rt); // 直接塞代碼，例如 'single'

  // 讓 Select 更新完後再做滾動（更穩）
  nextTick(() => {
    const el = document.querySelector("#quick-search");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
}

onMounted(() => {
  applyRoomTypeFromQuery();
});

// 如果你從 RoomIntro 點不同房型回到同一個 HomePage，靠 watch 才會更新
watch(
  () => route.query.roomType,
  () => applyRoomTypeFromQuery()
);

/* ===== 輪播 ===== */
const images = [img1, img2, img3];
const currentSlide = ref(0);
let timer = null;

const quickSearchRef = ref(null);

function scrollToQuickSearch() {
  // 平滑滾動到「快速查詢空房」
  quickSearchRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

onMounted(() => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % images.length;
  }, 3000);
  Announcements();
});

onUnmounted(() => clearInterval(timer));

/* ===== 客房介紹 點擊 立即訂房 ===== */
// 你的房型 v-model（名稱依你原本的變數調整）
const selectedRoomType = ref("");

onMounted(() => {
  const rt = route.query.roomType;
  if (rt) selectedRoomType.value = String(rt);
});

/* ===== 公告 ===== */
const announcements = ref([]);

/* ===== 房型 ===== */
const rooms = ref([
  { room: "單人房", code: "single" },
  { room: "雙人房", code: "double" },
  { room: "豪華雙人房", code: "deluxe-double-no-win" },
  { room: "總統套房", code: "triple" },
]);

/* ===== 查詢 ===== */
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const checkIn = ref(new Date());
const checkOut = ref(tomorrow);
const roomType = ref("");
const errorMsg = ref("");
const bedInfo = ref([]);
const remarks = ref([]);
const cartRooms = ref([]);
const notSearchRooms = ref(true);
errorMsg.value = "";

/* ===== 查詢空房 ===== */
async function SearchVacantRoom() {
  // 🔴 先做前端驗證
  if (!roomType.value || !checkIn.value || !checkOut.value) {
    alert("請確認房型、數量、入住日期與退房日期");
    return; // ❗中斷，不呼叫 API
  }

  try {
    const response = await api.get("/GetRoomsAll/fullSearch", {
      params: {
        RoomTypeCode: roomType.value,
        CheckInDate: dayjs(checkIn.value).format("YYYY-MM-DD"),
        CheckOutDate: dayjs(checkOut.value).format("YYYY-MM-DD"),
      },
    });
    const res = response.data;
    products.value = (res.searchResult ?? []).map((r) => ({
      ...r,
      selectedQty: 0,
    }));

    bedInfo.value = res.bedInfo ?? [];
    remarks.value = res.remarks ?? [];

    // notSearchRooms.value = false;
  } catch (error) {
    console.log(error);
    alert("查詢空房失敗，請稍後再試");
  }
}

async function Announcements() {
  try {
    const response = await api.get("/Announcement");
    announcements.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

/* ===== 建立訂單 ===== */
function OrederRooms() {
  // const selected = products.value.find((p) => p.selectedQty > 0); 撈單筆資料

  // 撈多筆資料
  const selected = products.value
    .filter((p) => p.selectedQty > 0)
    .map((p) => ({
      roomType: p.roomType,
      roomTypeId: p.id,
      quantity: p.selectedQty,
      unitPrice: p.basePrice,
    }));

  if (!selected || !roomType.value) {
    alert("請選擇房型與數量");
    return;
  }

  // 2️⃣ 讀取「已存在的 rooms（購物車）」
  const oldRooms = router.currentRoute.value.query.rooms
    ? JSON.parse(router.currentRoute.value.query.rooms)
    : [];

  // 3️⃣ 合併（同 roomTypeId → 更新數量）
  selected.forEach((newRoom) => {
    const exist = oldRooms.find((r) => r.roomTypeId === newRoom.roomTypeId);

    if (exist) {
      exist.quantity = newRoom.quantity; // 覆蓋數量
    } else {
      oldRooms.push(newRoom); // 新增
    }
  });

  router.push({
    path: "/Booking",
    query: {
      checkInDate: dayjs(checkIn.value).format("YYYY-MM-DD"),
      checkOutDate: dayjs(checkOut.value).format("YYYY-MM-DD"),
      rooms: JSON.stringify(cartRooms.value),
    },
  });
}

function clearForm() {
  checkIn.value = "";
  checkOut.value = "";
  roomType.value = "";
  errorMsg.value = "";
}

function getMaxBookableCount(room) {
  if (!room.details || room.details.length === 0) return 0;
  return Math.min(...room.details.map((d) => d.availableCount));
}

function getCountOptions(room) {
  const max = getMaxBookableCount(room);
  return Array.from({ length: max }, (_, i) => i + 1);
}
function updateCart(room, qty) {
  const exist = cartRooms.value.find((r) => r.roomTypeId === room.id);

  if (qty === 0 || qty == null) {
    // 移除
    cartRooms.value = cartRooms.value.filter((r) => r.roomTypeId !== room.id);
    return;
  }

  if (exist) {
    exist.quantity = qty;
  } else {
    cartRooms.value.push({
      roomType: room.roomType,
      roomTypeId: room.id,
      quantity: qty,
      unitPrice: room.basePrice,
    });
  }
}

const year = new Date().getFullYear();
</script>

<style scoped>
/* ===== 基本 ===== */
.page-root {
  min-height: 100vh;
  font-family: sans-serif;
  background: #f5f5f5;
}

/* ===== Hero / Carousel ===== */
.hero {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
}

.carousel-track {
  position: absolute;
  inset: 0;
}

.slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.slide.active {
  opacity: 1;
}

.hero-overlay {
  position: relative;
  z-index: 2;
  color: white;
  padding: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.service {
  font-weight: bold;
}

/* ===== Content ===== */
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 20px;
}

.grid {
  display: grid;
  gap: 20px;
}

.grid-3 {
  grid-template-columns: 2fr 1fr;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ann-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
}

.ann-item:hover {
  background: #f0f0f0;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

.btn-send {
  font-size: 15px;
  background: #4f46e5;
  color: white;
  width: 100%;
  margin-bottom: 15px;
}

.btn-secondary {
  font-size: 15px;
  background: #e5e7eb;
  width: 100%;
}

.err {
  color: red;
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
  padding: 34px 5px 18px;
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
  /* margin: 0 0 8px; */
  font-size: 16px;
  font-weight: 900;
  /* letter-spacing: 1px; */
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

/* google 地圖 */
.footer-col {
  display: flex; /* ★ 讓子元素左右排列 */
  align-items: flex-start;
}
.map-info {
  /* width: 40%; */
  color: #fff;
}
.map {
  /* width: 60%; */
  margin-left: auto; /* ★ 這行就是重點 */
}

.map iframe {
  /* width: 100%;
  height: 100%; */
  border: 0;
  border-radius: 12px;
}

.nav-overlay a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-style: inherit;
  letter-spacing: 1px;

  /* border: 1px solid #000; */
  padding: 10px 20px;
  display: inline-block;
  border-radius: 20px;
  /* 圓角 */
  transition: all 1s ease;

  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}

.nav-overlay :hover {
  background: linear-gradient(to top, #5f5e5953, #dedede5c);
  /* color: black; */
  border-bottom: 2px solid white;
}

.error-msg {
  color: red;
  margin-top: 8px;
}
</style>
