<script setup lang="ts">
import { getVarConfig, updateVarConfig } from "@/api/config";
import { onMounted, ref } from "vue";
import { Check, Edit } from "@element-plus/icons-vue";

const varData = ref();

const config = async () => {
  await getVarConfig().then(res => {
    if (res.code === 0) {
      // varData.value = Object.keys(res.data.config).map(key => {
      //   return {
      //     name: key,
      //     value: res.data.config[key]
      //   };
      // });
      varData.value = res.data.config;
    } else {
      console.log("获取配置失败");
    }
  });
};

const toggleEditing = (row: any) => {
  row.editing = !row.editing;
};

const commitEdit = async (row: any) => {
  row.editing = false;
  await updateVarConfig({
    id: row.id,
    value: row.value
  }).then(res => {
    if (res.code === 0) {
      row.value = res.data.config;
    } else {
      console.log("更新失败");
    }
  });
};

onMounted(() => {
  config();
});
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-table :data="varData" style="width: 100%">
        <el-table-column label="变量名" prop="name" />
        <el-table-column label="值" prop="value">
          <template #default="scope">
            <template v-if="!scope.row.editing">
              <span style="padding-right: 10px">{{ scope.row.value }}</span>
              <el-button
                type="primary"
                :icon="Edit"
                round
                size="small"
                @click="toggleEditing(scope.row)"
              />
            </template>
            <template v-else>
              <input v-model="scope.row.value" />
              <el-button
                type="success"
                :icon="Check"
                round
                size="small"
                @click="commitEdit(scope.row)"
              />
            </template>
          </template>
        </el-table-column>
        <el-table-column label="参数释义" prop="comment" />
      </el-table>
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
