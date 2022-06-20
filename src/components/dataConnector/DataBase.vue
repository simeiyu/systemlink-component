<script>
import { Form, Button, Input, Select, Menu, Row, Col } from 'ant-design-vue';
import { componentAdd } from '../../service/api';
export default {
  name: 'DataBase',
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    AButton: Button,
  },
  data() {
    return {
      database: '',
      databaseOptions: [
        {value: 'sss', label: 'SSS'}
      ],
      formState: {
        name: '',              // 名称
        type: '',              // 数据库类型
        databaseHost: '',      // 主机
        port: '',              // 端口
        username: '',          // 用户名
        password: '',          // 密码
        database: '',          // 数据库名
        parameter: ''          // 连接参数
      }
    };
  },
  methods: {
    onFinish(values) {
      
    },
    onChangeDatabase(value) {
      console.log('--- change database: ', value)
    }
  },
}

</script>

<template>
  <a-space>
    <a-select style="width: 120px" v-model:value="database" placeholder="选择或新增一个数据库" :options="databaseOptions" @change="onChangeDatabase" />
    <a-button>新建</a-button>
  </a-space>
  <a-form
    name="systemlink-database"
    :label-col="{span: 3}" :wrapper-col="{span: 20}"
    :model="formState"
    @finish="onFinish"
  >
    <a-divider orientation="left">通用设置</a-divider>
    <a-form-item label="名称" name="name" :rules="[{ required: true, message: '必填!' }]">
      <a-input v-model:value="formState.name"></a-input>
    </a-form-item>
    <a-form-item label="数据库类型" name="type" :rules="[{ required: true, message: '必填!' }]">
      <a-select v-model:value="formState.type">
        <a-select-option value="Mysql">Mysql</a-select-option>
        <a-select-option value="Microsoft SQL Server">Microsoft SQL Server</a-select-option>
        <a-select-option value="Oracle">Oracle</a-select-option>
        <a-select-option value="PostgreSql">PostgreSql</a-select-option>
      </a-select>
    </a-form-item>
    <a-divider orientation="left">连接设置</a-divider>
    <a-form-item label="主机" name="databaseHost" :rules="[{ required: true, message: '必填!' }]">
      <a-input v-model:value="formState.databaseHost"></a-input>
    </a-form-item>
    <a-form-item label="端口" name="port" :rules="[{ required: true, message: '必填!' }]">
      <a-input-number style="width: 120px" v-model:value="formState.port"></a-input-number>
    </a-form-item>
    <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '必填!' }]">
      <a-input v-model:value="formState.username"></a-input>
    </a-form-item>
    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '必填!' }]">
      <a-input v-model:value="formState.password"></a-input>
    </a-form-item>
    <a-form-item label="数据库名" name="database" :rules="[{ required: true, message: '必填!' }]">
      <a-input v-model:value="formState.database"></a-input>
    </a-form-item>
    <a-form-item label="连接参数" name="parameter">
      <a-input v-model:value="formState.parameter"></a-input>
    </a-form-item>
    <a-form-item class="footer" :wrapper-col="{span: 23}">
      <a-button type="default" style="margin-right: 10px">测试连接</a-button>
      <a-button type="default" style="margin-right: 10px">取消</a-button>
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less">
.footer {
  text-align: right;
}
</style>
