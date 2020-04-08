import axios from 'axios';

const HOST_NAME = 'http://localhost:8080';

  export const loginhuzhu = function loginhuzhu(params) {
    return axios.post(HOST_NAME + '/huzhu/loginhuzhu', params)
  }
  export const registerhuzhu = function registerhuzhu(params) {
    return axios.post(HOST_NAME + '/huzhu/registerhuzhu', params)
  }
  export const updatehuzhu = function updatehuzhu(params) {
    return axios.post(HOST_NAME + '/huzhu/updatehuzhu', params)
  }
  export const findbyhzid = function findbyhzid(params) {
    return axios.get(HOST_NAME + '/huzhu/findhzbyid', {params:params})
  }
  export const findfcbyhzid = function findfcbyhzid(params) {
    return axios.get(HOST_NAME + '/fangchan/findbyhzid', {params:params})
  }
  export const findtcbyhzid = function findtcbyhzid(params) {
    return axios.get(HOST_NAME + '/tingchewei/findbyhzid', {params:params})
  }
  export const findallgg = function findallgg() {
    return axios.get(HOST_NAME + '/gonggao/findall')
  }
  export const findbxbyhzid = function findbxbyhzid(params) {
    return axios.get(HOST_NAME + '/baoxiu/findbyhzid', {params:params})
  }
  export const findjfbyhzid = function findjfbyhzid(params) {
    return axios.get(HOST_NAME + '/jiaofei/findbyhzid', {params:params})
  }
  export const findsbbyhzid = function findsbbyhzid(params) {
    return axios.get(HOST_NAME + '/sbhz/findbyhzid', {params:params})
  }
  export const findtsbyhzid = function findtsbyhzid(params) {
    return axios.get(HOST_NAME + '/tousu/findbyhzid', {params:params})
  }
  export const addbaoxiu = function addbaoxiu(params) {
    return axios.post(HOST_NAME + '/baoxiu/addbaoxiuxx', params)
  }
  export const addtousu = function addtousu(params) {
    return axios.post(HOST_NAME + '/tousu/add', params)
  }
  export const addjiaofei = function addjiaofei(params) {
    return axios.post(HOST_NAME + '/jiaofei/update', params)
  }

  