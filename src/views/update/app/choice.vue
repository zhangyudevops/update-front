<script lang="ts" setup>
import { ref } from "vue";
import { updateSelectedPackage } from "@/api/update";

defineProps({
  uploadHistory: {
    type: Array
  }
});

const value = ref("");
const selectPackage = async () => {
  await updateSelectedPackage({
    name: value.value
  }).then(res => {
    if (res.code === 0) {
      document.getElementById("testSelect")!.innerHTML = "你猜成功没";
      console.log("升级成功");
    } else {
      console.log("升级失败");
    }
  });
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>升级</span>
      </div>
    </template>
    <div>选择升级包进行升级</div>
    <el-select v-model="value" placeholder="Select">
      <el-option
        v-for="item in uploadHistory"
        :key="item.id"
        :value="item.name"
      />
    </el-select>
    <el-button type="primary" plain @click="selectPackage">升级</el-button>
    <div id="testSelect" />
  </el-card>
</template>

<style scoped lang="scss"></style>
