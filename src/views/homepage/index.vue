<template>
  <div class="home">
    home
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <p>svg-icon</p>
    <svg-icon icon-class="dashboard"></svg-icon>
    <svg-icon icon-class="example"></svg-icon>
    <svg-icon icon-class="eye-open"></svg-icon>

    <p>el-icon</p>
    <el-icon><edit /></el-icon>
    <el-icon><aim /></el-icon>
    <el-icon><add-location /></el-icon>
    <el-icon><apple /></el-icon>

    <hr>

    <img :src="require('@/assets/images/file.png')" alt="" />

    <div class="file"></div>
  </div>
</template>

<script lang="ts">
</script>
<style lang="scss" scoped>
.home {
  color: red;
}

.file {
  width: 50px;
  height: 50px;
  background: url('~@/assets/images/file.png') no-repeat center;
  background-size: 100%;
}
</style>
