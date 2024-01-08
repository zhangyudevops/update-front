export default {
  path: "/cluster",
  meta: {
    icon: "carbon:software-resource-cluster",
    title: "集群管理",
    showLink: true
  },
  children: [
    {
      path: "/cluster/info",
      name: "ClusterInfo",
      component: () => import("@/views/cluster/info/index.vue"),
      meta: {
        title: "集群详情"
      }
    }
  ]
} as RouteConfigsTable;
