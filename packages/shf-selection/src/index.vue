<template>
  <div class="shf-select-container">
    <el-dropdown ref="shfSelectDropdown" trigger="click" placement="bottom-start" @visible-change="changeDrop">
      <span class="el-dropdown-link">
        <div :class="['label-box', hasValue ? 'hasval' : '']" slot="reference">
          <div class="label">{{ label }}</div>
          <div class="value" v-if="multiple">{{ value.length > 1 ? `${getLabelByVal(value[0])}+${value.length - 1}` : value.length === 1 ? getLabelByVal(value[0]) : '' }}</div>
          <div class="value" v-else>{{ getLabelByVal(value) }}</div>
          <div class="icon">
            <i v-show="!(!hideFilter && !isRemote && showDrop)" class="el-icon-arrow-down default"></i>
            <i v-show="!hideFilter && !isRemote && showDrop" class="el-icon-search default"></i>
            <i class="el-icon-error clear-icon" @click.stop="handleClear"></i>
          </div>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div class="pop-content">
          <slot name="list" v-bind:scope="filterList">
            <div class="filter-input-wrap">
              <el-input class="filter-input" ref="filterInput" v-if="!hideFilter" v-model="filterText" type="text" size="small" clearable @input="handleDebounceInput" />
            </div>
            <div class="list-wrap">
              <div v-for="(item, index) in filterList" :key="index" :class="['list-item', checkClass(item)]" @click="handleCheck(item)">
                <slot name="option" v-bind:scope="item">
                  <div class="item-left">
                    <div class="check-wrap" v-if="multiple">
                      <i class="icon el-icon-check"></i>
                    </div>
                    <div class="item-label">{{ item[defaultProps.label] }}</div>
                  </div>
                  <div class="item-right" v-if="showItemRight">{{ item[defaultProps.rightContent] }}</div>
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'ShfSelection',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Array],
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    hideFilter: { // 不要筛选
      type: Boolean,
      default: false
    },
    filterDebounce: {
      type: Number,
      default: 500 // ms
    },
    isRemote: {
      type: Boolean, // 远程筛选，就不使用本地filter, 传个remote-method
      default: false
    },
    showItemRight: {
      type: Boolean,
      default: false
    },
    multiple: { // 多选
      type: Boolean,
      default: false
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          rightContent: 'rightContent'
        }
      }
    }
  },
  data() {
    return {
      debounceFunc: null,
      showDrop: false,
      filterText: '',
      valueOrgList: [] // 记录选中的列表所有信息，防止远程搜索时options改变找不到选中值
    }
  },
  watch: {
    value: {
      handler(val, old) {
        if(this.multiple) {
          console.log(val, old)
          if(val.length !== old.length || (val.length > 0 && old.length > 0 && val[0] !== old[0])) {
            this.$nextTick(() => {
              if(this.$refs && this.$refs.shfSelectDropdown) {
                const dp =  this.$refs && this.$refs.shfSelectDropdown.$children[0]
                dp.updatePopper()
              }
            })
          }
        } else if(!this.multiple) {
          if(val !== old) {
            this.$nextTick(() => {
              if(this.$refs && this.$refs.shfSelectDropdown) {
                const dp =  this.$refs && this.$refs.shfSelectDropdown.$children[0]
                dp.updatePopper()
              }
            })
          }
        }
      },
      deep: true
    },
    options: {
      handler() {
        // console.log('====watch2====', newVal, oldVal)
        if(this.multiple && this.value.length > 0) {
          // this.value 中如果有部分数据不在this.valueOrgList里（无法反读到对应的label）
          // 所以不在的那部分，判断 options中有没有，如果有则加到this.valueOrgList
          const temp = this.valueOrgList.map(item => item[this.defaultProps.value])
          const outRest = this.value.filter(item => !temp.includes(item)) // valueOrgList 中没有的
          const addList = this.options.filter(item => outRest.includes(item[this.defaultProps.value])) // 在options中，且在outRest中的
          this.valueOrgList = [...this.valueOrgList, ...addList ]
        } else if (this.value !== '') {
          // 判断 valueOrgList 中存不存在 当前value数据， 如果存在则不管，
          // 如果不存在则 看当前options中有没有，没有就不管理，有则加到valueOrgList
          const findex = this.valueOrgList.findIndex(item => item[this.defaultProps.value] === this.value)
          if(findex === -1) {
            const fidx = this.options.findIndex(item => item[this.defaultProps.value] === this.value)
            if(fidx > -1) {
              this.valueOrgList = this.options.filter(f => f[this.defaultProps.value] === this.value)
            }
          }
        }
        // console.log('this.valueOrgList==', this.valueOrgList)
      },
      deep: true
    }
  },
  computed: {
    hasValue() {
      if (typeof this.value === 'string') {
        return this.value !== ''
      } else {
        return this.value.length !== 0
      }
    },
    filterList() {
      if(this.isRemote) { // 如果是用远程搜索，那就不做筛选
        return this.options
      }
      const temp = this.options.filter(item => item[this.defaultProps.label].indexOf(this.filterText) > -1)
      return temp
    }
  },
  mounted() {
    if(this.filterDebounce >= 0) {
      this.debounceFunc = this.debounce((val) => this.handleInput(val), this.filterDebounce)
    } else {
      this.debounceFunc = this.debounce((val) => this.handleInput(val), 0)
    }
    // console.log('slot==', this.$slot)
  },
  methods: {
    changeDrop(val) {
      this.showDrop = val
      if(val) {
        this.$nextTick(() => {
          if(this.$refs && this.$refs.filterInput) {
            this.$refs.filterInput.focus()
          }
        })
      }
    },
    debounce(fn, wait = 500) {
      let timeout = null
      return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          fn(...arguments)
        }, wait)
      }
    },
    handleInput(val) {
      if(this.isRemote) {
        this.$emit('remoteMethod', val)
      }
    },
    handleDebounceInput(val) {
      console.log('ipt===', val)
      this.debounceFunc(val)
    },
    getLabelByVal(val) {
      let label = val // 默认原样显示
      const all = this.getAllList()
      const findex = all.findIndex(item => item[this.defaultProps.value] === val)
      if(findex > -1) {
        label = all[findex][this.defaultProps.label]
      }
      return label
    },
    checkClass(item) {
      if (typeof this.value === 'string') {
        if(this.value === item[this.defaultProps.value]) return 'ischeck'
        return ''
      } else {
        if(this.value.includes(item[this.defaultProps.value])) return 'ischeck'
        return ''
      }
    },
    getAllList() { // 获取用来下拉列表以及下拉列表中不存在但是默认选择的列表（远程搜索时，可能下拉列表中没有选中的那一条/那多条了）
      // 找到this.valueOrgList中，不在this.options中的部分
      const temp = this.options.map(item => item[this.defaultProps.value])
      const outOpts = this.valueOrgList.filter(item => !temp.includes(item[this.defaultProps.value]))
      const all = this.options.concat(outOpts) // 利用this.options合并 那部分
      return all
    },
    handleCheck(item) {
      if(this.multiple) {
        // 判断在不在this.value， 如果不在就push， 如果已经存在就从this.value中删除
        let vals = this.value
        if(vals.includes(item[this.defaultProps.value])) {
          vals = vals.filter(f => f !== item[this.defaultProps.value])
        } else {
          vals.push(item[this.defaultProps.value])
        }
        // 不能直接从this.options筛选,防止已经选中的丢失label
        const all = this.getAllList()
        this.valueOrgList = all.filter(f => vals.includes(f[this.defaultProps.value]))
        this.$emit('input', vals)
        this.$emit('change', vals)
      } else {
        // 直接替换，不存在丢失label
        this.valueOrgList = this.options.filter(f => f[this.defaultProps.value] === item[this.defaultProps.value])
        this.$emit('input', item[this.defaultProps.value])
        this.showDrop = false
        this.$emit('change', item[this.defaultProps.value])
      }
      this.$nextTick(() => {
        if(this.$refs && this.$refs.shfSelectDropdown) {
          const dp =  this.$refs && this.$refs.shfSelectDropdown.$children[0]
          dp.updatePopper()
        }
      })
    },
    handleClear() {
      this.valueOrgList = []
      if(this.multiple) {
        this.$emit('input', [])
        this.$emit('change', [])
      } else {
        this.$emit('input', '')
        this.$emit('change', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.shf-select-container {
  display: inline-block;
  vertical-align: top;
}
.pop-content {
  user-select: none;
}
.filter-input-wrap {
  padding: 0 10px;
}
.filter-input {
  margin-bottom: 5px;
}
.label-box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 34px;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  font-size: 14px;
  color: #1890ff;
  border: 1px solid #1890ff;

  .label {
    padding-right: 5px;
  }

  .value {
    color: #b0bcc2;
  }

  .icon {
    padding-left: 5px;

    .default {
      display: block;
    }
    .clear-icon {
      display: none;
    }
  }
}

.label-box.hasval:hover {
  .icon .default {
    display: none;
  }
  .icon .clear-icon {
    display: block;
  }
}

.list-wrap {
  overflow: hidden;
  overflow-y: auto;
  max-height: 256px;
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    line-height: 22px;
    padding: 5px 12px;
    color: #b0bcc2;
    cursor: pointer;
    .item-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      padding-right: 10px;
    }
    .item-right {
      flex-shrink: 0;
    }
    &:hover {
      background: rgba(0, 0, 0, .04);
    }
  }
}
.check-wrap {
  margin-right: 5px;
  width: 12px;
  height: 12px;
  border: 1px solid #b0bcc2;
  border-radius: 2px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    transform: scale(0.5);
    display: none;
  }
}
.ischeck {
  font-weight: 600;
  .check-wrap {
    background: #1890ff;
    border-color: transparent;
    color: #fff;
  }
  .check-wrap .icon {
    display: block;
  }
}

</style>
