/**
 * Created by Athrunsky on 2017/7/20.
 */
// 引用模板
import login from '../page/login.vue'
import userInfo from '../page/userCenter/userInfo.vue'
import modifyPsw from '../page/userCenter/modifyPsw.vue'
import index from '../page/index.vue'
import dataLoading from '../page/dataLoading.vue'
import docindex from '../page/docindex.vue'
import vieworder from '../page/vieworder'
import historyOrder from '../page/historyOrder'
import ordercheck from '../page/ordercheck'
import chooseapparatus from '../page/doctor-function/chooseapparatus.vue'
import chooseoperation from '../page/doctor-function/chooseoperation.vue'
import choosePackage from '../page/doctor-function/choosePackage.vue'
import chooseSupplier from '../page/doctor-function/chooseSupplier.vue'
import buildorder from '../page/doctor-function/build-order.vue'
import content from '../page/content.vue'
import toolsDetail from '../page/nurse-function/toolsDetail.vue'
import packageDetail from '../page/nurse-function/packageDetail.vue'
import historyPackageDetail from '../page/nurse-function/historyPackageDetail.vue'
import historyToolsDetail from '../page/nurse-function/historyToolsDetail.vue'
import orderConfirmSuccess from '../page/orderConfirmSuccess.vue'
import supplierIndex from '../page/supplier-function/supplierIndex.vue'
import Frame from '../frame/subroute.vue'
/*import userIndex from '../page/user/index.vue'
import userInfo from '../page/user/info.vue'
import userLove from '../page/user/love.vue'*/

// 配置路由
export default [
  {
    path: '/',
    component: index
  },
  {
    path: '/content',
    component: content
  },
  {
    path: '/dataLoading',
    component: dataLoading
  },
  {
    path: '/docindex',
    component: docindex
  },
  {
    path: '/buildorder',
    component: buildorder
  },
  {
    path: '/vieworder',
    component: vieworder
  },
  {
    path: '/chooseapparatus/:term',
    component: chooseapparatus
  },
  {
    path: '/chooseoperation',
    component: chooseoperation
  },
  {
    path: '/choosePackage',
    component: choosePackage
  },
  {
    path: '/chooseSupplier',
    component: chooseSupplier
  },
  {
    path: '/ordercheck/:id/:term',
    component: ordercheck
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/modifyPsw',
    component: modifyPsw
  },
  {
    path: '/userInfo',
    component: userInfo
  },
  {
    path: '/toolsDetail/:id/:titleFlag',
    component: toolsDetail
  },
  {
    path: '/packageDetail/:id/:titleFlag',
    component: packageDetail
  },
  {
    path: '/historyPackageDetail/:id',
    component: historyPackageDetail
  },
  {
    path: '/historyToolsDetail/:id',
    component: historyToolsDetail
  },
  {
    path: '/orderConfirmSuccess',
    component: orderConfirmSuccess
  },
  {
    path: '/supplierIndex',
    component: supplierIndex
  },
  {
    path: '/historyOrder',
    component: historyOrder
  },
/*  {
    path: '/user',
    component: Frame,
    children: [
      {path: '/',component: userIndex},
      {path: 'info',component: userInfo},
      {path: 'love',component: userLove}
    ],
  },*/
]
