import axios from "./axios";

// 可编程集成组件
export async function getSpContext() {
  return axios.get('/spContext/get', null)
}
export async function flowSave(data) {
  return axios.post('/systemlink/integration/flowArrange/route_save', data)
}
export async function flowTurnOn(data) {
  return axios.get('/systemlink/integration/flowArrange/turn_on_flow', data)
}
export async function flowTurnOff(data) {
  return axios.get('/systemlink/integration/flowArrange/turn_off_flow', data)
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