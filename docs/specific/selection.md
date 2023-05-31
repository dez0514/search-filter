# selection 选择器

<demo-block>
::: slot source
<div>
  <DocSelection />
</div>
:::

::: slot sourceCode

```vue
  <!-- 示例 -->
  <!-- template -->
  <shf-selection 
    v-model="mult"
    :options="list" 
    label="机号"
    :defaultProps="{
      label: 'label',
      value: 'value',
      rightContent: 'rightContent'
    }"
    :multiple="true" 
    :show-item-right="false" 
    :hide-filter="false"
    :is-remote="false"
    @remoteMethod="remoteMethods"
    @change="selectChange"
  >
  </shf-selection>
```
```javascript
// in parent component methods
   remoteMethods(text) {
      getListByText({text}).then(res => {
        this.options = res.list
      })
   },
   selectChange(val) {
    console.log(val)
  }
```

:::

</demo-block>

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model     | 选中值（单选：字符串， 多选：数组）   | string | [] | — | — |
| default-props | 部分可以动态的字段 | object | { label，value，rightContent } | {} |
| options | 列表 | object[] | — | [] |
| label | 标题 | string | — | — |
| show-item-right | 是否显示item右 | boolean | — | false |
| hide-filter | 是否隐藏筛选器 | boolean | — | false |
| is-remote | 是否远程搜素，如果为true，则输入框不走筛选，且需要传remoteMethod方法（方法内获取新的list赋值给options） | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 当勾选发生变化时，在父组件中可以获取选中的结果 | — |
| remoteMethod | 当is-remote为true时则输入框不走筛选，且需要传remoteMethod方法 | — |

### Slot
| Name | Description |
|------|--------|
| 名称 | 描述 |
| list | 整个下拉面板内容自定义（点击事件也得自定义），slot-scope 可以获取list，也可以不使用 |
| option | list-item 的插槽， slot-scope 可以获取当前的item对象 |

```vue
<!-- slot示例， 属性略 -->
<shf-selection :options="list" ...>
  <template slot="option" slot-scope="{ scope }">
    <div>{{ scope }}</div>
  </template>
</shf-selection>
```