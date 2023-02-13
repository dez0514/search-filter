<template>
  <div class="shf-droplist-container">
    <el-dropdown trigger="click" @visible-change="changeDrop">
      <span class="el-dropdown-link">
        <slot name="trigger">
          <div :class="['filter-box', 'flex-center', isplain ? 'plain' : '', showDrop ? 'act' : '']">
            <div class="title-box flex-between">
              <div>
                <slot name="trigger-icon">
                  <icon class="icon-filter" icon-class="filter" />
                </slot>
              </div>
              <div class="title" v-if="title">{{ title }}</div>
            </div>
          </div>
        </slot>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div class="pop-content">
          <slot name="droplist">
            <el-input v-show="isFilter" v-model="filterText" type="text" size="small" clearable />
            <div v-show="listTitle || isShowReset" class="list-title flex-between">
              <div>{{ listTitle }}</div>
              <div v-if="isShowReset" class="reset" @click="handleReset">重置</div>
            </div>
            <div class="list-wrap">
              <div class="obj-item" v-for="(out, index) in classifyList" :key="index">
                <div class="classify" v-if="classify !== ''">{{ out.class }}</div>
                <div v-for="(item, idx) in out.children" :key="`${index}_${idx}`"
                  :class="['list-item', 'flex-between', item[defaultProps.isCheck] ? 'check' : '', !isSwitch ? 'cursor' : '', item[defaultProps.disabled] ? 'disabled' : '']" @click="handleCheck(item)">
                  <div class="flex">
                    <div class="check-wrap">
                      <icon v-if="!isSwitch" class="icon-collect" icon-class="collect" />
                      <icon v-if="isSwitch && item[defaultProps.disabled]" class="icon-filter" icon-class="lock" />
                      <icon v-if="isSwitch && !item[defaultProps.disabled]" class="icon-filter" icon-class="open" />
                    </div>
                    <div class="label">{{ item[defaultProps.label] }}</div>
                  </div>
                  <div v-if="isSwitch" class="check-switch">
                    <el-switch v-model="item[defaultProps.isCheck]" active-color="#1890ff" inactive-color="#b0bcc2" :disabled="item[defaultProps.disabled]"
                    @change="handleCheck(item)" />
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import icon from '../../shf-icon'
export default {
  name: 'shfDroplist',
  components: { icon },
  props: {
    title: { // 触发器的title
      type: String,
      default: ''
    },
    isplain: { // 触发器样式搂空
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => []
    },
    isFilter: { // 筛选框
      type: Boolean,
      default: false
    },
    isShowReset: { // 重置按钮
      type: Boolean,
      default: false
    },
    listTitle: { // list标题 '可见项'
      type: String,
      default: ''
    },
    isSwitch: { // switch 模式，点击switch切换，默认点击整个item切换
      type: Boolean,
      default: false
    },
    classify: { // 分类的字段, 如果为空则不分类
      type: String,
      default: ''
    },
    defaultProps: { // 动态字段
      type: Object,
      default: () => {
        return {
          field: 'key', // 列表唯一键
          label: 'label', // list-item的标题
          isCheck: 'visible', // 是否选中
          disabled: 'disabled'
        }
      }
    }
  },
  data() {
    return {
      filterText: '',
      showDrop: false
    }
  },
  computed: {
    _dataList: {
      get() {
        return this.dataList
      },
      set(val) {
        this.$emit('update: dataList', val)
      }
    },
    filterList() {
      let temp = []
      const { label } = this.defaultProps
      if(this.classify) {
        temp = this._dataList.filter(item => item[label].indexOf(this.filterText) > -1 || item[this.classify].indexOf(this.filterText) > -1)
      } else {
        temp = this._dataList.filter(item => item[label].indexOf(this.filterText) > -1)
      }
      return temp
    },
    classifyList() {
      const noclass = '未分类'
      if(this.classify) {
        let obj = {}
        if (this.filterList.length > 0) {
          this.filterList.forEach(item => {
            if(item[this.classify]) {
              if (!obj[item[this.classify]] || obj[item[this.classify]].length === 0) {
                obj[item[this.classify]] = [item]
              } else {
                obj[item[this.classify]].push(item)
              }
            } else { // 可能存在未分类的数据
              if(!obj[noclass] || obj[noclass].length === 0) {
                obj[noclass] = [{...item, [this.classify]: noclass }]
              } else {
                obj[noclass].push({...item, [this.classify]: noclass })
              }
            }
          })
        }
        const temp = Object.keys(obj).map(item => {
          return {
            class: item,
            children: obj[item]
          }
        })
        const findex = temp.findIndex(item => item.class === '未分类')
        if(findex > -1) {
          const fobj = temp[findex]
          temp.splice(findex, 1)
          temp.push(fobj)
        }
        // console.log('temp===', temp)
        return temp
      } else {
        const temp = [{ class: noclass, children: this.filterList }] // 不分类别， class 不会显示
        // console.log('temp2===', temp)
        return temp
      }
    }
  },
  methods: {
    changeDrop(val) {
      this.showDrop = val
    },
    handleReset() {
      const { field, isCheck, disabled } = this.defaultProps
      this._dataList.forEach((item, index) => {
        if(!item[disabled]) {
          this.$set(this._dataList, index, { ...item, [isCheck]: true })
        }
      })
      const status = this._dataList.map((item) => {
        return { [field]: item[field], [isCheck]: item[isCheck] }
      })
      this.$emit('getStatus', status)
    },
    handleCheck(obj) {
      const { field, isCheck, disabled } = this.defaultProps
      if(this.isSwitch) {
        const status = this._dataList.map((item) => {
          return { [field]: item[field], [isCheck]: item[isCheck] }
        })
        this.$emit('getStatus', status)
        return
      }
      if(obj[disabled]) return
      // 将check情况 emit 出去
      // console.log(obj.field)
      const findex = this._dataList.findIndex(item => item[field] === obj[field])
      if (findex > -1) {
        const temp = this._dataList[findex]
        this.$set(this._dataList, findex, { ...temp, [isCheck]: !temp[isCheck] })
      }
      const status = this._dataList.map((item) => {
        return { [field]: item[field], [isCheck]: item[isCheck] }
      })
      this.$emit('getStatus', status)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.shf-droplist-container {
  display: inline-block;
  vertical-align: top;
}

.pop-content {
  user-select: none;
  padding: 0 10px;
}
.list-title {
  font-size: 14px;
  color: #b0bcc2;
  /* padding-bottom: 5px; */
  padding: 5px 12px;
  .reset {
    color: red;
    cursor: pointer;
  }
}
.filter-box {
  box-sizing: border-box;
  padding: 0 10px;
  height: 34px;
  background: #1890ff;
  color: #fff;
  border: 1px solid transparent;
  transform: border 0.5s;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  &.plain {
    color: #1890ff;
    background: transparent;
    &.act {
      border-color: #1890ff;
    }
  }

  .title-box .title {
    margin-left: 5px;
  }
  .icon-filter {
    font-size: 14px;
  }
}

.list-wrap {
  overflow: hidden;
  overflow-y: auto;
  max-height: 256px;
  min-width: 215px;
  color: #b0bcc2;
  font-size: 14px;
}

.classify {
  line-height: 22px;
  padding: 5px 12px;
}

.list-item {
  padding: 5px 12px;
  &.cursor {
    cursor: pointer;
  }
  .label {
    color: #b0bcc2;
  }

  .check-wrap {
    margin-right: 5px;
    font-size: 16px;
    color: #b0bcc2;
  }
  .check-switch {
    flex-shrink: 0;
    transform: scale(0.7);
    transform-origin: center right;
  }
  &.cursor.check {
    .check-wrap {
      color: #1890ff;
    }
    .label {
      font-weight: 600;
    }
  }
  &.disabled {
    cursor: not-allowed;
    .check-wrap {
      color: #d0d7da;
    }
    &.check .check-wrap {
      color: #74bcff;
    }
  }
}
</style>