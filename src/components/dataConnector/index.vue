<script>
import { message, Form, Button, Input } from 'ant-design-vue';
import { componentAdd, componentList, componentMetaType } from '../../service/api';
import { has, forEach, map } from 'lodash';
export default {
  name: 'DataConnector',
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    AButton: Button,
  },
  props: ['componentType', 'spContext'],
  data() {
    return {
      activeKey: 'add',
      operate: '',
      addFormState: {
        name: '',              // 名称
      },
      metaInfo: {},
      metaInfoLoading: true,
      component: {
        name: '',
        operate: '',
      },
      options: [
        {value: 'sss', label: 'SSS'}
      ],
      setFormState: {}
    };
  },
  created() {
    this.getComponentMetaType();
    this.getComponentList();
  },
  methods: {
    // 集成组件配置查询列表
    getComponentList() {
      componentList({...this.spContext, componentType: this.componentType}).then(
        res => {
          if (res.code === 200) {
            this.list = res.data;
            // 返回数据中的 name 字段做为“设置”标签页中 [数据库] 的选项列表
            this.options = map(res.data, ({name}) => ({value: name, label: name}));
          } else {
            message.error(res.msg)
          }
        }
      )
    },
    // 集成组件指定类型，返回数据中的 metaInfo 解析后赋值给 this.metaInfo
    getComponentMetaType () {
      componentMetaType({...this.spContext, componentType: this.componentType}).then(
        res => {
          this.metaInfoLoading = false;
          if (res.code === 200) {
            this.metaInfo = JSON.parse(res.data.metaInfo);
            const me = this;
            if (has(this.metaInfo, 'properties')) {
              forEach(this.metaInfo.properties, ({type, properties}) => {
                if (type === 'group' && properties) {
                  forEach(properties, item => {
                    me.addFormState[item.name] = '';
                  })
                }
              })
            }
          } else {
            message.error(res.msg)
          }
        }
      )
    },
    // 新增 ——> 保存
    onFinish(values) {
      const name = values.name;
      delete values.name;
      componentAdd({...this.spContext, componentType: this.componentType, name, instanceInfo: JSON.stringify(values)}).then(
        res => {
          if (res.data) {
            message.success('保存成功')
          } else {
            message.error(res.msg)
          }
        }
      )
    },
    // 新增 ——> 重置
    resetFields() {
      for (let prop in this.addFormState) {
        this.addFormState[prop] = '';
      }
    },
    // Tabs 切换
    onTabChange(activeKey) {
      if (activeKey === 'set') {
        // 切换为“设置”标签页时，重新请求“集成组件配置查询列表”
        this.getComponentList();
      }
    }
  },
}

</script>

<template>
<a-tabs v-model:activeKey="activeKey" type="card" @change="onTabChange" :tabBarGutter="8">
  <a-tab-pane key="add" tab="新增">
    <a-typography-title :level="5">{{metaInfo.title}}</a-typography-title>
    <a-form
      name="systemlink-add"
      :label-col="{span: 6}" :wrapper-col="{span: 18}"
      :model="addFormState"
      @finish="onFinish"
    >
      <a-form-item label="名称" name="name" :rules="[{ required: true, message: '必填!' }]">
        <a-input v-model:value="addFormState.name" />
      </a-form-item>
      <div class="load_wrapper" v-if="metaInfoLoading"><a-spin /></div>      
      <div v-for="property in metaInfo.properties">
        <a-divider orientation="left">{{property.title}}</a-divider>
        <a-form-item v-for="item in property.properties" :label="item.title" :name="item.name" :rules="[{ required: item.required, message: '必填!' }]">
          <a-select v-if="!!item.enum" v-model:value="addFormState[item.name]">
            <a-select-option v-for="e in item.enum" :value="e">{{e}}</a-select-option>
          </a-select>
          <a-input v-else v-model:value="addFormState[item.name]"></a-input>
        </a-form-item>
      </div>
      <a-form-item class="footer" :wrapper-col="{span: 24}">
        <!-- <a-button type="default" style="margin-right: 10px">测试连接</a-button> -->
        <a-button type="default" style="margin-right: 10px" @click="resetFields">重置</a-button>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-tab-pane>
  <a-tab-pane key="set" tab="设置" disabled>
    <a-form
      name="systemlink-set"
      :label-col="{span: 6}" :wrapper-col="{span: 18}"
      :model="setFormState"
      @finish="onFinish"
    >
      <a-form-item label="数据库">
        <a-select v-model:value="component.name" placeholder="选择数据库" :options="options" />    
      </a-form-item>
      <a-form-item label="操作类型">
        <a-select v-model:value="component.operate" placeholder="操作类型">
          <a-select-option value="search">查询</a-select-option>
          <a-select-option value="insert">插入</a-select-option>
          <a-select-option value="update">更新</a-select-option>
          <a-select-option value="delete">删除</a-select-option>
          <a-select-option value="insertMulti">批量插入</a-select-option>
          <a-select-option value="updateMulti">批量更新</a-select-option>
          <a-select-option value="deleteMulti">批量删除</a-select-option>
        </a-select> 
      </a-form-item>
    </a-form>
  </a-tab-pane>
</a-tabs>
</template>

<style scoped lang="less">
.footer {
  text-align: right;
}
.ant-divider-horizontal.ant-divider-with-text {
  color: rgba(0, 0, 0, 0.45);
}
// .ant-tabs {
//   height: 100%;
// }
.load_wrapper {
  padding: 40px;
  text-align: center;
}
.ant-tabs-tabpane {
//   padding-top: 16px;
  padding-right: 8px;
//   overflow: auto;
//   &::-webkit-scrollbar {
//     /*滚动条整体样式*/
//     width: 8px;
//     /*高宽分别对应横竖滚动条的尺寸*/
//     height: 1px;
//   }
//   &::-webkit-scrollbar-thumb {
//     /*滚动条里面*/
//     border-radius: 4px;
//     background-color: rgba(0, 0, 0, 0.1);
//   }
//   &::-webkit-scrollbar-track {
//     /*滚动条里面轨道*/
//     border-radius: 4px;
//     background-color: rgba(0, 0, 0, 0);
//   }
}
</style>
