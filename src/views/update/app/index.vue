<script setup lang="ts">
import pkg from "./package.vue";
import upload from "./upload.vue";
import update from "./update.vue";
import { onMounted, ref } from "vue";
import { getPackageHistory } from "@/api/package";

// package history table data
const uploadHistory = ref();

const tableData = async () => {
  return getPackageHistory().then(res => {
    if (res.code === 0) {
      uploadHistory.value = res.data.history_list;
    } else {
      uploadHistory.value = "获取历史升级包失败";
    }
  });
};

// 请求挂载数据
onMounted(() => {
  tableData();
});
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <upload />
    </el-col>
    <el-col :span="18">
      <pkg :uploadHistory="uploadHistory" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <update :uploadHistory="uploadHistory" />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  margin-top: 12px;
  //margin-bottom: 20px;
  padding-right: 12px;
  padding-left: 12px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>
