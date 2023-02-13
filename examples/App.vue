<template>
  <div id="app">
    <div class="padding">
      <div style="margin-bottom: 10px">
        <div @click.stop="testClick">click.stop can not close popover</div>
        <el-button  @click.stop="testClick">test</el-button>
      </div>
      <shf-droplist 
        style="margin-left: 5px" 
        :data-list="filterList" 
        :default-props="defaultProps"
        :is-filter="true"
        classify="classify"
        @getStatus="getStatusList" 
      />
      <shf-droplist 
        style="margin-left: 5px" 
        :data-list="filterList" 
        :default-props="defaultProps"
        title="列表筛选"
        list-title="可见项"
        :isplain="true"
        :is-show-reset="true"
        :is-switch="true"
        @getStatus="getStatusList" 
      />
      <shf-droplist 
        style="margin-left: 5px" 
        :data-list="filterList" 
        :default-props="defaultProps"
        title="列表筛选"
        list-title="可见项"
        :isplain="true"
        :is-show-reset="true"
        :is-switch="true"
        @getStatus="getStatusList" 
      >
        <!-- <div slot="trigger-icon">
          <shf-icon style="transform: rotate(90deg);" class="icon-filter" icon-class="open" />
        </div> -->
      </shf-droplist>
      <shf-droplist 
        style="margin-left: 5px" 
        :data-list="filterList" 
        :default-props="defaultProps"
        title="列表筛选"
        list-title="可见项"
        :isplain="true"
        :is-show-reset="true"
        :is-switch="true"
        @getStatus="getStatusList" 
      >
        <!-- <div slot="trigger">
          <shf-icon style="transform: rotate(90deg);" class="icon-filter" icon-class="open" />
        </div> -->
        <div slot="droplist">
          <div @click="test">123</div>
        </div>
      </shf-droplist>
      <div style="height: 10px"></div>
      <!-- <shf-select style="margin-left: 5px" label="机号" v-model="num" :options="list" filterable clearable />
      <shf-select style="margin-left: 5px" v-model="value1" clearable :options="list" @change="change">
        <el-option v-for="(item, index) in list" :key="index" :label="item.label" :value="item.value" />
      </shf-select>
      <shf-select v-model="value1" label="设备分组" filterable :options="list" clearable @change="change"></shf-select>
      <shf-select
      label="设备分组5"
        v-model="value"
        filterable
        clearable
        remote
        placeholder="请输入关键词"
        :remote-method="remoteMethod1"
        :loading="loading">
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </shf-select>
      <shf-select
        label="设备分组"
        v-model="mult"
        multiple
        collapse-tags
        placeholder="请选择">
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </shf-select> -->
      <div style="height: 10px"></div>
      <shf-selection style="margin-left: 5px" label="机号" v-model="num2" :show-item-right="false" :hide-filter="true"
        :options="list" @change="selectChange" />
      <shf-selection style="margin-left: 5px" label="机号" v-model="mult" :multiple="true" :show-item-right="false" :hide-filter="false"
        :options="list" @change="selectChange" />
      <shf-selection style="margin-left: 5px" label="机号" v-model="mult" :multiple="true" :show-item-right="false" :hide-filter="false"
        :options="list" @change="selectChange">
        <template slot="option" slot-scope="{ scope }">
          <div>{{ scope.label }}</div>
        </template>
      </shf-selection>
    </div>
    <!-- <div v-for="i in 40" :key="i">{{ i }}</div> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      value1: '',
      list1: [],
      list: [],
      num: '',
      num1: '',
      num2: '',
      mult: [],
      multy: [],
      multys: [],
      filterList: [],
      show: true,
      defaultProps: {
        field: 'field', // 列表唯一键
        isCheck: 'isCheck', // 是否选中
        disabled: 'disabled',
        label: 'title'
      },
      value: 'value:Alabama',
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"
      ]
    }
  },
  mounted() {
    this.getDataList()
    // setTimeout(() => {
    //   this.list = this.list.filter(item => item.value !== '2')
    //   this.show = false
    // }, 6000)
  },
  methods: {
    remoteMethod1(query) {
      if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.list = this.list.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            });
          }, 200);
      } else {
        this.list = []
      }
    },
    test() {
      console.log(123)
    },
    change(val) {
      console.log(val)
    },
    testClick() {
      console.log(123)
    },
    getDataList() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
      setTimeout(() => {
        // this.list = [
        //   { label: '基础数据', value: '1', rightContent: 'extra1' },
        //   { label: '基础数据2', value: '2', rightContent: 'extra2' },
        //   { label: '基础数据3', value: '3', rightContent: 'extra3' }
        // ]
        
        this.filterList = [
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
          },
          {
            field: 'loginid5', // 唯一键
            classify: '基础数据', // '基础数据', '状态'
            title: '机号',
            isCheck: false
          },
          {
            field: 'loginid6', // 唯一键
            classify: '基础数据', // '基础数据', '状态'
            title: '机号',
            isCheck: false
          },
          {
            field: 'loginid7', // 唯一键
            classify: '基础数据', // '基础数据', '状态'
            title: '机号',
            isCheck: false
          },
          {
            field: 'loginid8', // 唯一键
            classify: '基础数据', // '基础数据', '状态'
            title: '机号',
            isCheck: false
          },
          {
            field: 'deviceState9', // 唯一键
            classify: '状态', // '基础数据', '状态'
            formType: 'input', // input, select
            title: '设备状态',
            value: '',
            list: [],
            isCheck: false
          }
        ]
      }, 1000)
    },
    getStatusList(vals) {
      console.log(vals)
    },
    selectChange(val) {
      console.log('change==', val)
    },
    remoteMethod(val) {
      console.log('remote===', val)
      if (!val) return
      this.list.push({ label: '基础数据4', value: '4', rightContent: 'extra4' })
      this.list.push({ label: '基础数据5', value: '5', rightContent: 'extra5' })
      this.list = this.list.filter(item => item.value !== '2')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.padding {
  padding: 10px;
}
</style>
