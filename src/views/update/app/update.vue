<script setup lang="ts">
import choice from "./choice.vue";
import log from "./log.vue";

defineProps({
  uploadHistory: {
    type: Array
  }
});
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>应用升级</span>
      </div>
    </template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="6">
          <choice :uploadHistory="uploadHistory" />
        </el-col>
        <el-col :span="18">
          <log />
        </el-col>
      </el-row>
    </template>
  </el-card>
</template>

<style scoped lang="scss"></style>
