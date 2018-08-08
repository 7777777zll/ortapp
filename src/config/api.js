/**
 * Created by Kotori on 2017/5/16.
 * Modify by Athrunsky on 2017//8/2
 */

import axios from 'axios'

// let base = 'http://36.110.7.34:9006/api'
//let base = 'http://192.168.10.252:9006/api'
// let base = 'http://cst:9091/api'
// let base = '/api'
let base = 'api'
export const CountByReadyStatus = {
  get: (params) => {
    return axios.get(`${base}/orthopaedicOrder/countByReadyStatus`, params).then(res => res.data)
  }
}

export const SerachOrder = {
  get: (params) => {
    return axios.get(`${base}/orthopaedicOrder/findByStatus`, params).then(res => res.data)
  },
  orderId: (params) => {
    return axios.get(`${base}/orthopaedicOrder/${params.params}`).then(res => res.data)
  },
  condition: (params) => {
    return axios.get(`${base}/orthopaedicOrder/findOrderByConditionAndPage`, params).then(res => res.data)
  },
  getOrthopaedicApparatus: (params) => {
    return axios.get(`${base}/orthopaedicOrder/getOrthopaedicApparatusGroupByOrderId`, params).then(res => res.data)
  },
  getOrthopaedicPackage: (params) => {
    return axios.get(`${base}/orthopaedicOrder/fuzzyQueryCombo`, params).then(res => res.data)
  },
  packageDeatil: (params) => {
    return axios.get(`${base}/orthopaedicOrder/findConsumablesByOrderId`, params).then(res => res.data)
  },
  put: (params) => {
    return axios.put(`${base}/orthopaedicOrder/${params.params.id}`,params.params).then(res => res.data)
  },
  ortCharge: (params) => {
    return axios.post(`${base}/orthopaedicOrder/ortCharge`,params.params).then(res => res.data)
  },
  findOrtConsumablesByComboId: (params) => {
     return axios.get(`${base}/orthopaedicOrder/findOrtConsumablesByComboId`, params).then(res => res.data)
  },
  getOrderType: () => {
     return axios.get(`${base}/orthopaedicOrder/getOrderType`).then(res => res.data)
  },
}

export const SerachApparatus = {
  get: (params) => {
    return axios.get(`${base}/orthopaedicOrder/fuzzyQueryApparatus`, params).then(res => res.data)
  }
}
// 医生部分
export const Doctor = {
  placeOrder: (params) => {
    return axios.post(`${base}/orthopaedicOrder/postOrder`, params).then(res => res.data)
  },
  getOperationScheduled: (params) => {
    return axios.get(`${base}/orthopaedicOrder/getOperationScheduled`, params).then(res => res.data)
  },
  getSupplier: (params) => {
    return axios.get(`${base}/orthopaedicOrder/findVendorByTerm`,params).then(res => res.data)
  },
  findScheduleById: (params) => {
    return axios.get(`${base}/orthopaedicOrder/findOperationScheduleByScheduleId?inpNo=${params}`).then(res => res.data)
  },
  comboId: (params) => {
    return axios.get(`${base}/orthopaedicOrder/getOrthopaedicApparatusByComboId?comboId=${params}`).then(res => res.data)
  },
  getOrthopaedicApparatusByComboId: (params) => {
    return axios.get(`${base}/orthopaedicOrder/getOrthopaedicApparatusByComboId`, params).then(res => res.data)
  },
  appendOrder: (params) => {
    return axios.get(`${base}/orthopaedicOrder/appendOrder?id=${params.params.id}&additional=${params.params.additional}`).then(res => res.data)
  },
  cancelOrder: (params) => {
    return axios.get(`${base}/orthopaedicOrder/cancelOrder?id=${params.params.id}&cancelReason=${params.params.additional}`).then(res => res.data)
  },
};
// 用户部分
export const Group = {
  getUserinformation: (params) => {
    return axios.post(`${base}/orthopaedicOrder/findGroup`, params).then(res => res.data)
  }
}
export const User = {
  modifyPsw: (params) => {
    return axios.post(`${base}/orthopaedicOrder/ortUpdatePasswords`, params).then(res => res.data)
  }
}

export const demo = {
  get: (params) => {
    return axios.get(`${base2}/repos/typecho-fans/plugins/contents/`, params).then(res => res.data)
  }
}
export const emptyDataInfo = {
  emptyReadyMessage: (params) => {
    return axios.get(`${base}/orthopaedicOrder/emptyReadyMessage?ids=${params}`).then(res => res.data)
  }
}
export const getCondition = {
  getCondition: (params,orderType) => {
    return axios.get(`${base}/orthopaedicOrder/getCondition?term=${params}&orderType=${orderType}`).then(res => res.data)
  }
}