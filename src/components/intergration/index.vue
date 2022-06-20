<script>
import { Form, Button, Input, Select, message } from 'ant-design-vue';
import { flowSave, flowTurnOn, flowTurnOff, getSpContext } from '../../service/api';
export default {
  name: 'Intergration',
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    AButton: Button,
    ASelect: Select,
  },
  data() {
    return {
      extOptions: [{label: 'java', value: 0}, {label: 'groovy', value: 1}, {label: 'yaml', value: 2}, {label: 'xml', value: 3}],
      formState: {
        ext: 3,
        mode: 1,
        appId: 55587,
        rule: ''
      },
      spContext: null
    };
  },
  created() {
    getSpContext().then(res => {
      this.spContext = res && res.data;
    });
  },
  methods: {
    onFinish(values) {
      const data = {
        ...this.formState,
        ...values
      };
      flowSave(data).then(res => {
        if (res.data) {
          message.success('保存成功')
        } else {
          message.error(res.msg)
        }
      })
    },
    onTurnOn() {
      flowTurnOn({...this.spContext}).then(res => {
        if (res.data) {
          message.success('启动成功')
        } else {
          message.error(res.msg)
        }
      })
    },
    onTurnOff() {
      flowTurnOff({...this.spContext}).then(res => {
        if (res.data) {
          message.success('关闭成功')
        } else {
          message.error(res.msg)
        }
      })
    }
  },
}

</script>

<template>
  <a-form
    name="systemlink-intergration"
    :model="formState"
    :label-col="{span: 3}" :wrapper-col="{span: 20}"
    @finish="onFinish"
  >
    <a-form-item
      label="文本方式"
      name="ext"
    >
      <a-select v-model:value="formState.ext" :options="extOptions"/>
    </a-form-item>
    <a-form-item
      label="工作流规则"
      name="rule"
    >
      <a-textarea  v-model:value="formState.rule"></a-textarea>
    </a-form-item>
    
    <a-form-item class="footer">
      <a-button type="default" style="margin-right: 10px" @click="onTurnOff">关闭</a-button>
      <a-button type="default" style="margin-right: 10px" @click="onTurnOn">启动</a-button>
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less">
  .footer {
    .ant-form-item-control-input {
      justify-content: flex-end;
    }
  }
</style>
