import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Members from '../views/MemberView.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/members-list', component: Home
    },
    {
      path: '/profiles', component: Members
    }
  ]
});

export default router;