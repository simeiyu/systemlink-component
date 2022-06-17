<script>
import { Form, Button, Input, Select, Menu, Row, Col } from 'ant-design-vue';
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
      databaseOptions: []
    };
  },
  methods: {
    onFinish() {
      this.visible = true;
    },
  },
}

</script>

<template>
<a-form-item label="Database">
  <a-space>
    <a-select v-model:value="database" />
  </a-space>
</a-form-item>
  <a-row>
    <a-col></a-col>
    <a-col></a-col>
  </a-row>
  <a-form
    name="systemlink-intergration"
    :model="formState"
    :layout="'vertical'"
    @finish="onFinish"
  >
    <a-form-item
      label="请将数据粘贴到文本框"
      name="data"
    >
      <a-textarea  v-model:value="formState.data"></a-textarea>
    </a-form-item>
    
    <a-form-item>
      <a-button type="default">运行</a-button>
      <a-button type="primary" style="margin-left: 10px" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less">

</style>
