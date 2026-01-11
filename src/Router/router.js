import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import RoomIntro from "../components/RoomIntro.vue";
import OrderInquiry from "../components/Order_Inquiry.vue";
import Booking from "../components/Booking.vue";
import Roomfacility from "../components/Roomfacility.vue";
import Conteact from "../components/Contact.vue";
import MemberCenter from "../components/MemberCenter.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/RoomIntro",
    component: RoomIntro,
  },
  {
    path: "/OrderInquiry",
    component: OrderInquiry,
  },
  {
    path: "/Booking",
    component: Booking,
  },
  {
    path: "/HomePage",
    component: HomePage,
  },
  {
    path: "/Roomfacility",
    component: Roomfacility,
  },
  {
    path: "/Conteact",
    component: Conteact,
  },
  {
    path: "/MemberCenter",
    component: MemberCenter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
