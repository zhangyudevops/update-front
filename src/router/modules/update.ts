export default {
  path: "/update",
  meta: {
    icon: "emojione:package",
    title: "应用升级",
    showLink: true
  },
  children: [
    {
      path: "/update/setting",
      name: "Setting",
      component: () => import("@/views/update/setting/index.vue"),
      meta: {
        title: "配置变量"
      }
    },
    {
      path: "/update/app",
      name: "App",
      component: () => import("@/views/update/app/index.vue"),
      meta: {
        title: "系统升级"
      }
    }
  ]
} as RouteConfigsTable;
