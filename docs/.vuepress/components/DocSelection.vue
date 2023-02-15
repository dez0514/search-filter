<template>
  <div>
    <shf-selection style="margin-left: 5px" label="机号" v-model="num2" :show-item-right="false" :hide-filter="true"
      :options="list" @change="selectChange" />
    <shf-selection style="margin-left: 5px" label="机号" v-model="multy" :multiple="true" :show-item-right="false"
      :hide-filter="false" :options="list" @change="selectChange" />
    <shf-selection style="margin-left: 5px" label="机号" v-model="mult" :multiple="true" :show-item-right="false"
      :hide-filter="false" :options="list" @change="selectChange">
      <template slot="option" slot-scope="{ scope }">
        <div>{{ scope.label }}</div>
      </template>
    </shf-selection>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
      list: [],
      num2: '',
      mult: [],
      multy: [],
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
    change(val) {
      console.log(val)
    },
    getDataList() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
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