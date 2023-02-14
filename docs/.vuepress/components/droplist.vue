<template>
  <div>
    <shf-droplist
      :data-list="filterList" 
      :default-props="defaultProps" 
      :is-filter="true"
      classify="classify" 
      @getStatus="getStatusList" 
    />
    <shf-droplist style="margin-left: 5px" :data-list="filterList" :default-props="defaultProps" title="列表筛选" list-title="可见项" :isplain="true"
      :is-show-reset="true" :is-switch="true" @getStatus="getStatusList">
      <div slot="trigger-icon">
        <shf-icon style="transform: rotate(90deg);" class="icon-filter" icon-class="open" />
      </div>
    </shf-droplist>
  </div>
</template>
<script>
export default {
  name: 'DocDroplist',
  data() {
    return {
      filterList: [
        {
          field: 'loginid1', // 唯一键
          classify: '基础数据', // '基础数据', '状态'
          title: '机号',
          isCheck: false,
          disabled: true
        },
        {
          field: 'loginid2', // 唯一键
          // classify: '基础数据', // '基础数据', '状态'
          title: '机号',
          isCheck: true,
          disabled: true
        },
        {
          field: 'loginid3', // 唯一键
          classify: '基础数据', // '基础数据', '状态'
          title: '机号',
          isCheck: false
        },
        {
          field: 'loginid4', // 唯一键
          classify: '基础数据', // '基础数据', '状态'
          title: '机号',
          isCheck: false
        }
      ],
      defaultProps: {
        field: 'field', // 列表唯一键
        isCheck: 'isCheck', // 是否选中
        disabled: 'disabled',
        label: 'title',
        classify: 'classify'
      }
    }
  },
  methods: {
    getStatusList(vals) {
      console.log(vals)
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