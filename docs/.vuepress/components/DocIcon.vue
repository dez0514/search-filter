<template>
  <div class="icon-wrapper">
    <div class="item"
      v-for="(item, index) in list"
      :key="index"
      v-clipboard:copy="parse(item)"
      v-clipboard:success="copySuccess"
      v-clipboard:error="copyError"
    >
      <div><shf-icon :icon-class="item" /></div>
      <div class="tit">{{ item }}</div>
    </div>
  </div>
</template>
<script>
const reqSvg = require.context('/packages/shf-icon/icons/svg', false, /\.svg$/)
// console.log('reqSvg==', reqSvg)
const iconArr = reqSvg.keys().map(item => {
  return item.replace('./', '').slice(0, -4)
})
export default {
  name: 'DocIcon',
  data() {
    return {
      list: iconArr
    }
  },
  methods: {
    parse(name) {
      return `<shf-icon :icon-class="${name}" />`
    },
    copySuccess() {
      this.$notify({
        title: '提示',
        message: '复制成功',
        type: 'success'
      });
    },
    copyError() {
      this.$notify({
        title: '提示',
        message: '复制失败',
        type: 'error'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #eee;
    margin: 1px;
    width: 120px;
    height: 120px;
    text-align: center;
    color: #666;
    cursor: pointer;
    .tit {
      margin-top: 10px;
    }
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
