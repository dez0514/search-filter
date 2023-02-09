<template>
  <el-select v-bind="$attrs" v-on="$listeners" ref="my_select" :style="{ '--labelWidth': labelWidth }">
    <template slot="prefix">
      <div class="prefix-wrap" ref="prefix">
        <slot name="prefix">
          <div class="label-prefix">{{ label }}</div>
        </slot>
      </div>
    </template>
    <slot>
      <el-option v-for="(item, index) in filterOptions" :key="index" :label="item.label" :value="item.value"></el-option>
    </slot>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
  </el-select>
</template>
<script>
const methodList = ['blur', 'focus']
const methods = {}
methodList.forEach(methodName => {
  methods[methodName] = function (...args) {
    const _ref = this.$refs.my_select
    if (_ref && _ref[methodName]) {
      _ref[methodName](...args)
    }
  }
})

export default {
  name: 'shfSelect',
  inheritAttrs: false, // 此处加上是为了防止一些不必要的问题 https://cn.vuejs.org/v2/api/#inheritAttrs
  mixins: [methods],
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      labelWidth: '15px'
    }
  },
  watch: {
    label(val) {
      this.$nextTick(() => {
        if(val === '') {
          this.labelWidth = '15px'
        } else {
          this.labelWidth = this.$refs.prefix.offsetWidth + 5 + 'px'
        }
      })
    }
  },
  computed: {
    filterOptions() {
      if(!this.filterText) return this.options
      return this.options.filter(item => item.label.indexOf(this.filterText) > -1)
    }
  },
  mounted() {
    console.log(this.$refs)
    if(this.label) {
      this.labelWidth = this.$refs.prefix.offsetWidth + 5 + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-input {
  padding: 0 6px 6px;
}
.prefix-wrap {
  padding: 0 10px 0 5px;
  .label-prefix {
    color: #1890ff;
  }
}
.el-select /deep/ {
  .el-input {
    display: flex;
  }
  .el-input__prefix {
    /* position: relative; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 1px);
  }
  .el-input__inner {
    padding-left: var(--labelWidth);
  }
  .el-select__tags {
    box-sizing: border-box;
    padding-left: var(--labelWidth);
    white-space:nowrap;
    overflow:hidden;
    flex-wrap: nowrap;
  }
  .el-select__tags-text {
    white-space:nowrap;
    overflow:hidden;
    max-width: 85px;
    text-overflow:ellipsis;
  }
}

</style>
