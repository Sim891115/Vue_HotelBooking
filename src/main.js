import { createApp } from "vue";
import router from "./Router/router.js";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
// import Aura from "@primeuix/themes/aura";
import Lara from "@primeuix/themes/lara";
import "primeicons/primeicons.css";
//primevue套件
import ToastService from "primevue/toastservice";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: false,
    },
  },
});

app.use(ToastService);

app.mount("#app");
