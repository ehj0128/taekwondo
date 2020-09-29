// import { LogicalNot } from "@tensorflow/tfjs";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/account/Login.vue";
import Signup from "../views/account/Signup.vue";
import Introduction from "../views/Introduction.vue";
import Training from "../views/training/Training.vue";
import NewTraining from "../views/training/NewTraining.vue";
import VideoList from "../views/video/VideoList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/training",
    name: "Training",
    component: Training,
  },
  {
    path: "/newtraining",
    name: "NewTraining",
    component: NewTraining,
  },
  {
    path: "/introuduction",
    name: "Introduction",
    component: Introduction,
  },
  {
    path: "/videolist",
    name: "VideoList",
    component: VideoList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
