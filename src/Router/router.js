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
    redirect: "HomePage",
    component: HomePage,
  },
  {
    path: "/RoomIntro",
    name: "RoomIntro",
    component: RoomIntro,
  },
  {
    path: "/OrderInquiry",
    name: "OrderInquiry",
    component: OrderInquiry,
  },
  {
    path: "/Booking",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/Roomfacility",
    name: "Roomfacility",
    component: Roomfacility,
  },
  {
    path: "/Conteact",
    name: "Conteact",
    component: Conteact,
  },
  {
    path: "/MemberCenter",
    name: "MemberCenter",
    component: MemberCenter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
