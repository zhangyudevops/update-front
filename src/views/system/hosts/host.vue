<script setup lang="ts">
import { deleteHost, getHosts, updateHost } from "@/api/host";
import { ref, onMounted, reactive } from "vue";

const tableData = ref([]);
const dialogFormEdit = ref(false);

const dialogEditClick = (row: any) => {
  dialogFormEdit.value = true;
  form.ip = row.ip;
  form.username = row.user;
  form.sshPort = row.port;
  form.func = row.type;
};

const form = reactive({
  ip: "",
  username: "",
  sshPort: "",
  func: ""
});

const formLabelWidth = "140px";

const dialogModifyCommit = () => {
  updateHost({
    ip: form.ip,
    user: form.username,
    port: form.sshPort,
    type: form.func
  }).then(res => {
    if (res.code === 0) {
      dialogFormEdit.value = false;
      getHosts().then(res => {
        if (res.code === 0) {
          tableData.value = res.data.hosts;
        } else {
          tableData.value = [];
        }
      });
    }
  });
};

const rowDeleteClick = (row: any) => {
  deleteHost({
    id: row.id
  }).then(res => {
    if (res.code === 0) {
      getHosts().then(res => {
        if (res.code === 0) {
          tableData.value = res.data.hosts;
        } else {
          tableData.value = [];
        }
      });
    }
  });
};

onMounted(() => {
  getHosts().then(res => {
    if (res.code === 0) {
      tableData.value = res.data.hosts;
    } else {
      tableData.value = [];
    }
  });
});
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="ip" label="ip" />
    <el-table-column prop="port" label="port" />
    <el-table-column prop="user" label="user" />
    <el-table-column prop="type" label="type" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="dialogEditClick(scope.row)"
          >修改</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="rowDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogFormEdit"
    title="修改信息"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="form">
      <el-form-item label="IP" :label-width="formLabelWidth">
        <el-input v-model="form.ip" autocomplete="off" disabled />
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
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取消</el-button>
        <el-button type="primary" @click="dialogModifyCommit"> 确认 </el-button>
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
