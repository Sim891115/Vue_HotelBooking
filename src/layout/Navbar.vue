<template>
  <Toast position="bottom-center" />

  <div class="navbar">
    <div class="navbar-container">
      <div class="brand">
        <div class="logo">
          五尊佛飯店 HOTEL
          <small>WUZUNFO GRAND HOTEL</small>
        </div>
      </div>

      <div class="nav-links">
        <router-link to="/HomePage">首頁</router-link>
        <router-link to="/Roomfacility">飯店設施</router-link>
        <router-link to="/Booking">線上訂房</router-link>
        <router-link to="/OrderInquiry">訂單查詢</router-link>
        <router-link to="/RoomIntro">客房介紹</router-link>
        <router-link to="/Conteact">聯絡我們</router-link>
        <router-link v-if="isLogin" to="/MemberCenter">會員中心</router-link>
      </div>

      <div class="nav-cta">
        <button class="btn" type="button" onclick="w3_open()">☰ 選單</button>

        <span v-if="isLogin && memberData" class="member">
          你好，{{ memberData.userName }}
        </span>

        <Button
          v-if="!isLogin"
          label="登入"
          severity="contrast"
          @click="memberVisible = true"
        />

        <Button
          v-else
          label="登出"
          severity="danger"
          @click="logout"
        />
      </div>
    </div>
  </div>

  <!-- 登入視窗 -->
  <Dialog
    v-model:visible="memberVisible"
    header="會員登入"
    :style="{ width: '25rem' }"
    appendTo="body"
  >
    <span class="dialog-hint">請輸入您的帳號密碼:</span>

    <div class="LogOrPsw">
      <div class="fieldRow">
        <label for="email">信箱:</label>
        <InputText id="email" v-model="email" autocomplete="off" />
      </div>

      <div class="fieldRow">
        <label for="password">密碼:</label>
        <InputText
          id="password"
          v-model="password"
          type="password"
          autocomplete="off"
          style="margin-top: 15px"
        />
      </div>
    </div>

    <div class="LogOrRes">
      <Button type="button" label="登入" @click="Login" />
      <Button
        style="margin-left: 12px"
        type="button"
        label="註冊"
        severity="secondary"
        @click="
          memberVisible = false;
          registerVisible = true;
        "
      />
    </div>
  </Dialog>

  <!-- 註冊視窗 -->
  <Dialog
    v-model:visible="registerVisible"
    header="會員註冊"
    :style="{ width: '30rem' }"
    appendTo="body"
  >
    <div class="register-form">
      <div class="form-field">
        <label for="register-name">姓名</label>
        <InputText id="register-name" v-model="name" placeholder="請輸入真實姓名" />
      </div>

      <div class="form-field">
        <label for="register-email">電子信箱</label>
        <InputText
          id="register-email"
          v-model="email"
          type="email"
          placeholder="example@email.com"
        />
      </div>

      <div class="form-field">
        <label for="register-password">密碼</label>
        <InputText
          id="register-password"
          v-model="password"
          type="password"
          placeholder="請設定密碼"
        />
      </div>
    </div>

    <div class="register-footer">
      <Button
        type="button"
        label="返回登入"
        icon="pi pi-arrow-left"
        severity="secondary"
        text
        @click="
          registerVisible = false;
          memberVisible = true;
        "
      />
      <Button
        type="button"
        label="確認註冊"
        icon="pi pi-check"
        @click="register"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import api from "../api/api";

const toast = useToast();

const memberVisible = ref(false);
const registerVisible = ref(false);

const email = ref("");
const password = ref("");
const name = ref("");

const isLogin = ref(false);
const memberData = ref(null);

// 註冊
async function register() {
  if (!email.value || !password.value || !name.value) {
    toast.add({ severity: "error", summary: "錯誤", detail: "欄位請勿留白", life: 3000 });
    return;
  }

  try {
    const payload = {
      FullName: name.value,
      Email: email.value,
      Password: password.value,
    };

    await api.post("/UsersRegister/register", payload);

    registerVisible.value = false;

    toast.add({
      severity: "success",
      summary: "註冊成功",
      detail: "歡迎加入會員！",
      life: 3000,
    });
  } catch (error) {
    const errMsg = error.response?.data || "註冊失敗，請稍後再試";
    toast.add({ severity: "error", summary: "註冊失敗", detail: errMsg, life: 3000 });
  }
}

// 登入：拿 token -> 存 LocalStorage -> 打 /Users/profile -> 顯示你好 userName
async function Login() {
  if (!email.value || !password.value) {
    toast.add({
      severity: "error",
      summary: "錯誤",
      detail: "信箱或密碼不可空白",
      life: 3000,
    });
    return;
  }

  try {
    const payload = { Email: email.value, Password: password.value };

    // 你的登入路由：/UsersLogin/login
    const resp = await api.post("/UsersLogin/login", payload);

    // 依你 swagger 的格式：resp.data.data.token / resp.data.data.userName ...
    const token = resp.data?.data?.token;
    if (!token) {
      toast.add({ severity: "error", summary: "登入失敗", detail: "後端未回傳 token", life: 3000 });
      return;
    }

    localStorage.setItem("token", token);

    // 立刻用 token 取 profile
    const profileResp = await api.get("/Users/profile");
    memberData.value = profileResp.data?.data || null;

    isLogin.value = true;
    memberVisible.value = false;

    toast.add({ severity: "success", summary: "登入成功", detail: "歡迎回來", life: 3000 });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "登入失敗",
      detail: "請確認帳號密碼是否正確",
      life: 3000,
    });
  }
}

// 登出：清 token / 清狀態
function logout() {
  localStorage.removeItem("token");
  memberData.value = null;
  isLogin.value = false;

  toast.add({
    severity: "info",
    summary: "已登出",
    detail: "期待您再次光臨",
    life: 3000,
  });
}

// 重新整理後：若 localStorage 有 token，就自動抓 profile 把 navbar 狀態補回來
onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const profileResp = await api.get("/Users/profile");
    memberData.value = profileResp.data?.data || null;
    isLogin.value = true;
  } catch (error) {
    // token 失效就清掉
    localStorage.removeItem("token");
    memberData.value = null;
    isLogin.value = false;
  }
});
</script>

<style>
:root {
  --container: 1200px;
  --bg: #ffffff;
  --text: #222;
  --muted: #666;
  --border: #e9e9e9;
  --shadow: 0 10px 26px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 16px 40px rgba(0, 0, 0, 0.12);
  --brand: #111;
  --accent: #c7a36a;
  --radius: 14px;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
  background-color: var(--bg);
  color: var(--text);
}

a {
  color: inherit;
}

/* ========= Navbar ========= */
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 999;
}

.navbar-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  gap: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
}

.logo {
  color: white;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1.5px;
  line-height: 1.1;
}

.logo small {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}

.nav-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
  border: 1px solid transparent;
}

.nav-links a:hover {
  background: rgba(199, 163, 106, 0.18);
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(199, 163, 106, 0.35);
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.member {
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.btn {
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: #fff;
  padding: 9px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
  font-size: 14px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

/* ========= Dialog / Form ========= */
.dialog-hint {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.LogOrPsw {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.fieldRow {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.LogOrRes {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 10px 0;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field label {
  font-weight: bold;
  font-size: 0.95rem;
  color: #555;
}

.form-field .p-inputtext {
  width: 100%;
}

.register-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}
</style>
