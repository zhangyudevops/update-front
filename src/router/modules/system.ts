export default {
  path: "/system",
  meta: {
    icon: "iconoir:system-shut",
    title: "系统维护",
    showLink: true
  },
  children: [
    {
      path: "/system/hosts",
      name: "HostsEdit",
      component: () => import("@/views/system/hosts/index.vue"),
      meta: {
        title: "主机维护"
      }
    },
    {
      path: "/system/info",
      name: "HostsInfo",
      component: () => import("@/views/system/info/index.vue"),
      meta: {
        title: "节点详情"
      }
    }
  ]
} as RouteConfigsTable;
