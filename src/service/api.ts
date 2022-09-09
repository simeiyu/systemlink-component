import axios from "./axios";

export async function getSpContext() {
  const prefix = location.href.replace('/#/', '')
  return axios.get(`${prefix}/sp/context`, null)
}
// 查询可编程组件内容
export async function flowGet(data) {
  return axios.get('/systemlink/integration/component/program', data)
}
// 保存可编程组件
export async function flowSave(data) {
  return axios.post('/systemlink/integration/component/program', data)
}
// 启动集成流
export async function flowTurnOn(data) {
  return axios.get('/systemlink/integration/component/program/turn_on_flow', data)
}
// 关闭集成流
export async function flowTurnOff(data) {
  return axios.get('/systemlink/integration/component/program/turn_off_flow', data)
}
// 新增集成组件配置
export async function componentAdd(data) {
  return axios.post('/systemlink/integration/component/instance/add', data)
}
// 集成组件配置查询列表
export async function componentList(data) {
  return axios.get('/systemlink/integration/component/instance/list', data)
}
// 集成组件指定类型
export async function componentMetaType(data) {
  return axios.get('/systemlink/integration/component/meta/type', data)
}