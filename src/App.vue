<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { getSpContext } from './service/api';
import Intergration from './components/intergration/index.vue';
import DataConnector from './components/dataConnector/index.vue';
import { onBeforeMount, ref } from 'vue';
import { get } from 'lodash';

/**
 * Intergration 可编程集成组件
 * 
 * DataConnector 数据连接器 
 *  - props 
 *    - componentType: 'DataBase' | 'MQTT' | 'Kafka'
 */

export default {
  components: {
    AConfigProvider: ConfigProvider,
    Intergration: Intergration,
    DataConnector: DataConnector,
  },
  setup() {
    let currentComponent = ref('Intergration')
    let spContext = ref();
    let componentType = ref('');
    onBeforeMount(async () => {
      const res = await getSpContext();
      currentComponent.value = get(res, 'data.component');
      componentType.value = get(res, 'data.componentType');
      spContext.value = {
        appId: get(res, 'data.appId'),
        userId: get(res, 'data.userId'),
        nodeId: get(res, 'data.nodeId'),
        componentId: get(res, 'data.componentId'),
      }
    })
    return {
      locale: zhCN,
      spContext: spContext,
      componentType: componentType,
      currentComponent: currentComponent
    }
  },
  methods: {
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },
  },
};

</script>

<template>
  <a-config-provider :locale="locale" :getPopupContainer="getPopupContainer">
    <component :is="currentComponent" :spContext="spContext" :componentType="componentType" />
  </a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: auto;
}

#app::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
#app::-webkit-scrollbar-thumb {
  /*滚动条里面*/
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1);
}
#app::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
}
/* .ant-tabs-content-top {
  height: 100%;
} */
</style>