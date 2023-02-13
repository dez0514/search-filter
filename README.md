# search-form-ui
attention please: This is just a test for my own project, please forgive me if this caused any offence!
注：仅用于我自己测试使用，如有冒犯，请见谅。

## Usage (由于是基于elementUi写的组件，所以引入之后，也会全量引入elementUi)
```
// install
npm i shf-ui

// use in Vue main.js
import shfUI from 'shf-ui'
import 'shf-ui/lib/shf-ui.css'
Vue.use(shfUI)

```

## Components

```vue
  <!-- template -->
  <shf-droplist 
    :data-list="filterList"
    :default-props="{
      field: 'key', // 列表唯一键，返回状态时一一对应 
      label: 'label', // list-item的标题
      isCheck: 'visible', // list-item是否选中
      disabled: 'disabled' // list-item是否禁用
    }"
    title="列表筛选"
    list-title="可见项"
    :isplain="true"
    :is-show-reset="true"
    :is-switch="true"
    :is-filter="false"
    classify="typekey"
    @getStatus="getStatusList" 
  >
  </shf-droplist>
  <!-- 
    data-list：列表数据
    default-props：部分可以动态的字段(值与列表里属性名一致) { field, label, isCheck, disabled }
    title：触发器的标题
    isplain: 触发器样式是否搂空， 
    list-title：列表的标题
    is-show-reset：是否显示重置按钮， 
    is-switch：switch 模式，点击switch切换，默认点击整个item切换， 
    is-filter: 是否显示筛选框 
    classify：分类的字段（按照该字段给列表分类，不传或传空则不分类）
  -->
  <!-- slot 插槽使用例子 -->
  <shf-droplist ...属性略...>
    <div slot="trigger-icon">
      <shf-icon style="transform: rotate(90deg);" class="icon-filter" icon-class="open" />
    </div>
  </shf-droplist>
  <!-- 插槽
    trigger： 整个触发器的内容
    trigger-icon：触发器icon
    droplist: 整个面板内容（全都自定义，属性几乎都失效）
   -->
```

```javascript
 // 事件: getStatus ，当勾选发生变化时，在父组件中可以获取选中的结果
 // in parent component methods
 getStatusList(val) {
  console.log(val) // [{ key: 'xxx', visible: true }, { key: 'xxxx', visible: false },...]
 }
```

```vue
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
  <!-- 
    v-model：选中值（单选：字符串， 多选：数组）
    options：列表
    label：标题
    show-item-right：item右侧是否显示额外字段例如数量
    hide-filter: 默认有筛选，可隐藏 
    defaultProps: list-item的动态字段：{ label，value，rightContent }
    is-remote：是否远程搜素，如果为true，则输入框不走筛选，且需要传remoteMethod方法（方法内获取新的list赋值给options），
    @change: 选项改变时回调 selectChange(val) { console.log(val) }
  -->
  <!-- slot插槽： 
    list: 整个下拉面板内容自定义（点击事件也得自定义），slot-scope 可以获取list，也可以不使用
    option：list-item 的插槽， slot-scope 可以获取当前的item对象
  -->
  <shf-selection :options="list" ...属性略...>
    <template slot="option" slot-scope="{ scope }">
      <div>{{ scope }}</div>
    </template>
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
