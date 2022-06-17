import axios from "./axios";

// 可编程集成组件
export async function getSpContext() {
  return axios.get('/spContext/get', null)
}
export async function flowSave(data) {
  return axios.post('/integration/flowArrange/route_save', data)
}
export async function flowTurnOn(data) {
  return axios.get('/integration/flowArrange/turn_on_flow', data)
}
export async function flowTurnOff(data) {
  return axios.get('/integration/flowArrange/turn_off_flow', data)
}