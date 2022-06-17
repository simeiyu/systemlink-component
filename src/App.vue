<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Intergration from './components/intergration/index.vue';
import DataBase from './components/dataConnector/DataBase.vue';

export default {
  components: {
    AConfigProvider: ConfigProvider,
    Intergration: Intergration,
  },
  data() {
    return {
      locale: zhCN
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
    <Intergration />
  </a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 40px;
}
</style>