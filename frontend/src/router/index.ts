import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "@/layouts/MainLayout.vue"

import AgentManager from "@/components/agent/AgentManager.vue"

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "agents",
        component: AgentManager
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
