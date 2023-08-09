<script lang="ts" setup>
import { ref } from "vue";
import { genFileId } from "element-plus";
import SparkMD5 from "spark-md5";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { uploadUpdateFile } from "@/api/upload";

const upload = ref<UploadInstance>();
const selectedFile = ref<File | null>(null);

const handleFileChange = (file: any) => {
  selectedFile.value = file.raw;
};

const calculateMD5 = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();

    reader.onload = (event: any) => {
      spark.append(event.target.result);
      const md5 = spark.end();
      resolve(md5);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    return;
  }

  const md5 = await calculateMD5(selectedFile.value);

  // 使用FormData对象构建文件上传请求
  const formData = new FormData();
  formData.append("file", selectedFile.value);

  // 添加其他表单数据，例如MD5值
  formData.append("md5", md5);

  // 发送文件上传请求
  try {
    // 上传文件
    await uploadUpdateFile({
      file: selectedFile.value,
      md5
    }).then(res => {
      console.log(res);
      const message = document.getElementById("message");
      if (res.code === 0) {
        // 给message 添加字体颜色
        message!.style.color = "#67c23a";
        message.innerHTML = "文件上传成功";
      } else {
        message!.style.color = "#c23a3a";
        message.innerHTML = res.message;
      }
    });
  } catch (error) {
    console.error("File upload failed:", error);
  }
};

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="upload-card-header">
        <span>文件上传</span>
      </div>
    </template>

    <el-upload
      ref="upload"
      class="upload-demo"
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="handleFileChange"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="uploadFile">
        上传
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          只能选择一个文件，重复选择将覆盖旧文件
        </div>
      </template>
    </el-upload>
    <div id="message" />
  </el-card>
</template>

<style scoped lang="scss"></style>
