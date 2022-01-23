<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="姓名" prop="username">
      <el-input
        v-model="formData.username"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="formData.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="loginReq"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, watch, ref } from 'vue';
import settings from '@/settings';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { ObjTy } from '@/types/common';
let { proxy }: any = getCurrentInstance();

// 表单
let formData = reactive({
    username: 'admin',
    password: '123456'
});

const route = useRoute();
// 响应式
let state: ObjTy = reactive({
    redirect: undefined
});
// 监听路由
watch(
    route,
    (route) => {
        const query = route.query;
        if (query) {
            state.redirect = query.redirect;
        }
    },
    { immediate: true }
);


const store = useStore();
// 登录
let loginReq = () => {

    store
        .dispatch('user/login', formData)
        .then(res => {
            ElMessage({ message: '登录成功', type: 'success' });
            proxy.$router.push({ path: state.redirect || '/' });
        })
        .catch((res) => {
            console.log(res.msg);
        });
};


</script>
<style lang="scss" scoped>
.demo-ruleForm {
    padding: 20px;
}
</style>