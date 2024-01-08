<script setup lang="ts">
import host from "./host.vue";
import add from "./add.vue";
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>服务器列表</span>
            <add />
          </div>
        </template>
        <host />
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
