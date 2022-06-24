<script>
import { Form, Button, Input, Select, message } from 'ant-design-vue';
import { flowGet, flowSave, flowTurnOn, flowTurnOff } from '../../service/api';
import { reactive, ref, toRef } from 'vue';
import { get } from 'lodash';

const useForm = Form.useForm;
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
  props: ['componentType', 'spContext'],
  setup(props) {
    const formState = reactive({
      ext: 3,
      rule: ''
    });
    const extRef = toRef(formState, 'ext')
    const ruleRef = toRef(formState, 'rule')
    let timer = setInterval(function() {
      if (props.spContext) {
        flowGet({...props.spContext}).then(
          res => {
            if (res.code === 200) {
              extRef.value = get(res, 'data.fileExt', 3);
              ruleRef.value = get(res, 'data.camelRoute', '');
            }
          }
        )
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
    }, 300);
    return {
      extOptions: [{label: 'java', value: 0}, {label: 'groovy', value: 1}, {label: 'yaml', value: 2}, {label: 'xml', value: 3}],
      formState: {
        ext: extRef,
        rule: ruleRef
      }
    }
  },
  methods: {
    // 保存
    onFinish(values) {
      const data = {
        ...this.spContext,
        ext: values.ext.value,
        rule: values.rule.value
      };
      flowSave(data).then(res => {
        if (res.data) {
          message.success('保存成功')
        } else {
          message.error(res.msg)
        }
      })
    },
    // 启动
    onTurnOn() {
      flowTurnOn({...this.spContext}).then(res => {
        if (res.data) {
          message.success('启动成功')
        } else {
          message.error(res.msg)
        }
      })
    },
    // 关闭
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
      <a-select v-model:value="formState.ext.value" :options="extOptions"/>
    </a-form-item>
    <a-form-item
      label="工作流规则"
      name="rule"
    >
      <a-textarea  v-model:value="formState.rule.value"></a-textarea>
    </a-form-item>
    
    <a-form-item class="footer" :wrapper-col="{span: 23}">
      <a-button type="default" style="margin-right: 10px" @click="onTurnOff">关闭</a-button>
      <a-button type="default" style="margin-right: 10px" @click="onTurnOn">启动</a-button>
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less">
.footer {
  text-align: right;
}
</style>
