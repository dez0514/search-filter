# droplist

<div>
  <DocDroplist />
</div>

```vue
  <!-- template -->
  <!-- 示例1 -->
  <shf-droplist
    :data-list="filterList" 
    :default-props="defaultProps" 
    :is-filter="true"
    classify="classify" 
    @getStatus="getStatusList" 
  >
  </shf-droplist>
  <!-- 示例2 -->
  <shf-droplist
    :data-list="filterList" 
    :default-props="defaultProps"  
    title="列表筛选" 
    list-title="可见项" 
    :isplain="true"
    :is-show-reset="true" 
    :is-switch="true" 
    @getStatus="getStatusList"
  >
    <div slot="trigger-icon">
      <shf-icon style="transform: rotate(90deg);" class="icon-filter" icon-class="open" />
    </div>
  </shf-droplist>
```

```vue
// in parent.vue
<script>
export default {
  name: 'parent',
  data() {
    return {
      filterList: [ // 定义列表数据，部分字段需要与 default-props 中一致
        {
          title: '机号',
          key: 'loginid1', // 默认属性名为 field
          label: '基础数据', // 默认属性名为 label
          visible: false, // 默认属性名为 isCheck
          disabled: true // 默认属性名为 disabled
        }
      ],
      defaultProps: {
        field: 'key',
        label: 'label',
        isCheck: 'visible',
        disabled: 'disabled'
      }
    }
  },
  methods: {
    getStatusList(vals) { // 获取勾选状态
      console.log(vals)
    }
  }
}
</script>
```
### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data-list     | 列表数据           | object[] | — | [] |
| default-props | 部分可以动态的字段 | object | { field, label, isCheck, disabled } | {} |
| title | 触发器的标题 | string | — | — |
| isplain | 触发器样式是否搂空 | boolean | — | false |
| list-title | 列表的标题 | string | — | — |
| is-show-reset | 是否显示重置按钮 | boolean | — | false |
| is-switch | switch 模式，点击switch切换，默认点击整个item切换 | boolean | — | false |
| is-filter | 是否显示筛选框  | boolean | — | false |
| classify | 分类的字段（按照该字段给列表分类，不传或传空则不分类） | string | — | - |

### Slot
| Name | Description |
|------|--------|
| 名称 | 描述 |
| trigger | 整个触发器的内容 |
| trigger-icon | 触发器icon |
| droplist | 整个面板内容（全都自定义，属性几乎都失效） |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| getStatus | 当勾选发生变化时，在父组件中可以获取选中的结果 | — |