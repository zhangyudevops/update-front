<script setup lang="ts">
import { reactive, ref } from "vue";
import { addHost } from "@/api/host";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const addHostClick = () => {
  addHost({
    ip: form.ip,
    user: form.username,
    port: form.sshPort,
    type: form.func
  }).then(res => {
    if (res.code === 0) {
      dialogFormVisible.value = false;
    } else {
      const msg = document.getElementById("msg");
      if (msg) {
        msg.innerHTML = res.message;
      }
    }
  });
};

const form = reactive({
  ip: "",
  username: "app",
  sshPort: "22",
  func: ""
});
</script>

<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true"> 添加主机 </el-button>

  <el-dialog
    v-model="dialogFormVisible"
    title="添加主机"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="form">
      <el-form-item label="IP" :label-width="formLabelWidth">
        <el-input v-model="form.ip" autocomplete="off" />
      </el-form-item>
      <el-form-item label="普通用户" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="port" :label-width="formLabelWidth">
        <el-input v-model="form.sshPort" autocomplete="off" />
      </el-form-item>
      <el-form-item label="功能名" :label-width="formLabelWidth">
        <el-input v-model="form.func" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div id="msg" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addHostClick"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
