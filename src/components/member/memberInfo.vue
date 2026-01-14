<template>
  <Toast />

  <div class="page">
    <!-- 會員等級儀表板 -->
    <div class="levelBox">
      <div class="levelTitle">會員等級儀表板</div>

      <div class="levelRow">
        <div class="levelItem">
          <div class="levelLabel">目前會員等級</div>
          <div class="levelValue">{{ member.currentLevel }}</div>
        </div>

        <div class="levelItem right">
          <div class="levelLabel">目前累積消費</div>
          <div class="levelValue big">
            {{ Number(member.totalSpent || 0).toLocaleString() }}
          </div>
        </div>
      </div>

      <div class="levelRow">
        <div class="levelLabel">距離下一級</div>

        <div v-if="!member.isMaxLevel" class="levelText">
          下一級：<b>{{ member.nextLevel }}</b>，還差
          <b>{{ Number(member.remainingToNext || 0).toLocaleString() }}</b>
        </div>

        <div v-else class="levelText">
          <b>已達最高等級</b>
        </div>
      </div>

      <div class="levelRow">
        <div class="levelLabel">進度</div>
        <ProgressBar :value="member.progressPercent" />
        <div class="levelHint">{{ member.progressPercent }}%</div>
      </div>
    </div>

    <!-- 會員資料表單 -->
    <div class="card">
      <div class="grid">
        <div class="field">
          <label>會員編號</label>
          <InputText v-model="form.userId" disabled />
        </div>

        <div class="field">
          <label>姓名</label>
          <InputText v-model="form.name" placeholder="請輸入姓名" />
        </div>

        <div class="field">
          <label>Email</label>
          <InputText v-model="form.email" placeholder="name@example.com" />
        </div>

        <div class="field">
          <label>手機</label>
          <InputText v-model="form.phone" placeholder="09xx-xxx-xxx" />
        </div>
        <div class="field">
          <label>密碼</label>
          <InputText v-model="form.password" placeholder="請輸入密碼" />
        </div>

        <div class="field full">
          <label>地址</label>
          <InputText v-model="form.address" placeholder="請輸入地址" />
        </div>
      </div>

      <div class="actions">
        <Button
          label="儲存更新"
          icon="pi pi-save"
          @click="save"
          :loading="saving"
        />
        <Button
          label="重設"
          icon="pi pi-refresh"
          severity="secondary"
          @click="reset"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import api from "../../api/api";

const toast = useToast();
const saving = ref(false);

// 用於 reset：以「最後一次載入/儲存」為準
const original = reactive({
  userId: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  password:""
});

const form = reactive({ ...original });

// 儀表板資料
const member = ref({
  totalSpent: 0,
  currentLevel: "-",
  nextLevel: "-",
  remainingToNext: 0,
  progressPercent: 0,
  isMaxLevel: false,
});

// 進度計算：spent / (spent + remaining)
function calcProgress(totalSpent, remainingToNext) {
  const spent = Number(totalSpent || 0);
  const remaining = Number(remainingToNext || 0);
  const denom = spent + remaining;
  if (denom <= 0) return 0;

  const p = Math.round((spent / denom) * 1000) / 10;
  return Math.max(0, Math.min(100, p));
}

// ✅ 進頁就抓：GET /Users/profile（靠 JWT 取目前登入者）
async function loadMemberInfo() {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.add({
      severity: "error",
      summary: "未登入",
      detail: "請先登入後再查看會員資料",
      life: 3000,
    });
    return;
  }

  try {
    const res = await api.get("/Users/profile");
    const data = res.data?.data;

    // ===== 表單 =====
    // 後端回傳：Id, UserName, Email, Phone, AddressLine, MemberLevel, TotalSpent, NextLevel, UpgradeLeftAmount
    const id = data?.id ?? "";
    original.userId = id !== "" ? `MB-${id}` : ""; 
    original.name = data?.userName || "";
    original.email = data?.email || "";
    original.phone = data?.phone || "";
    original.address = data?.addressLine || "";

    Object.assign(form, original);

    // ===== 儀表板 =====
    const totalSpent = Number(data?.totalSpent || 0);
    const currentLevel = data?.memberLevel ?? "-";
    const nextLevel = data?.nextLevel; 
    const remainingToNext = Number(data?.upgradeLeftAmount || 0);

    const isMax = !nextLevel || remainingToNext <= 0;
    const progressPercent = isMax ? 100 : calcProgress(totalSpent, remainingToNext);

    member.value = {
      totalSpent,
      currentLevel,
      nextLevel: isMax ? "-" : nextLevel,
      remainingToNext: isMax ? 0 : remainingToNext,
      progressPercent,
      isMaxLevel: isMax,
    };
  } catch (error) {
    // 401 代表 token 失效（api.js 也會清 token）
    if (error?.response?.status === 401) {
      toast.add({
        severity: "warn",
        summary: "登入已失效",
        detail: "請重新登入",
        life: 3000,
      });
      return;
    }

    toast.add({
      severity: "error",
      summary: "錯誤",
      detail: "載入會員資料失敗（請確認後端是否啟動、API 路徑是否正確）",
      life: 3500,
    });
  }
}

// ✅ 儲存更新（還要做一支：PUT /Users/profile，靠 JWT 決定要更新誰）
async function save() {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.add({
      severity: "error",
      summary: "未登入",
      detail: "請先登入後再儲存",
      life: 3000,
    });
    return;
  }

  saving.value = true;
  try {
    const payload = {
      userName: form.name,     
      email: form.email,
      phone: form.phone,
      addressLine: form.address,
      passwordHash: form.password
    };

    // ⚠️ 後端需要提供這支
    await api.put("/Users/profile", payload);

    // 更新 reset 基準
    Object.assign(original, { ...form });

    toast.add({
      severity: "success",
      summary: "成功",
      detail: "會員資料已更新",
      life: 2500,
    });
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.add({
        severity: "warn",
        summary: "尚未提供更新API",
        detail: "後端目前沒有 PUT /Users/profile，請先建立更新端點",
        life: 3500,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "失敗",
        detail: "儲存失敗，請稍後再試",
        life: 3000,
      });
    }
  } finally {
    saving.value = false;
  }
}

function reset() {
  Object.assign(form, original);
  toast.add({
    severity: "info",
    summary: "已重設",
    detail: "已回到載入/儲存時的資料",
    life: 2000,
  });
}

onMounted(() => {
  loadMemberInfo();
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
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

.full {
  grid-column: 1 / -1;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* 儀表板 */
.levelBox {
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  padding: 14px;
  background: #fff;
  margin-bottom: 16px;
}

.levelTitle {
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.levelRow {
  display: grid;
  gap: 8px;
  margin-bottom: 12px;
}

.levelRow:last-child {
  margin-bottom: 0;
}

.levelItem {
  display: grid;
  gap: 4px;
}

.levelItem.right {
  text-align: right;
}

.levelLabel {
  color: #666;
  font-size: 12px;
}

.levelValue {
  font-size: 18px;
  font-weight: 900;
  color: #111;
}

.levelValue.big {
  font-size: 22px;
}

.levelText {
  color: #333;
  line-height: 1.6;
}

.levelHint {
  text-align: right;
  color: #666;
  font-size: 12px;
}

@media (min-width: 980px) {
  .levelRow:first-of-type {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
}
</style>
