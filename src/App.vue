<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Intergration from './components/intergration/index.vue';
import DataConnector from './components/dataConnector/index.vue';

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
  data() {
    return {
      locale: zhCN,
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
    <DataConnector componentType='Kafka' />
  </a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.ant-tabs-content-top {
  height: 100%;
}
</style>