<script lang="ts" setup>
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
        <span>历史升级包</span>
      </div>
    </template>
    <el-table
      :data="uploadHistory"
      border
      :default-sort="{ prop: 'upTime', order: 'ascending' }"
      style="width: 100%"
    >
      <el-table-column prop="upTime" label="上传时间" sortable width="170" />
      <el-table-column prop="name" label="升级包名" width="300" />
      <el-table-column prop="md5" label="MD5" />
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
