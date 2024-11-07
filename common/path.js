// 项目域名
// export const BASE_URL = 'https://6ld4218856.goho.co/api'
export const BASE_URL = 'https://frdzlfapi.zsyflive.com/api'

export const BASE_URL_ZLF = 'https://frdzlfapi.zsyflive.com'
//----------项目接口请求路径-----------
const ucommanylogin =BASE_URL + '/commany/login' 
// 获取验证码
const getphonesendmsgE= + '/basic/phone/sendmsgE'
// 注册
const userregister =BASE_URL + '/sign/customer/user/register' 
// 获取企业列表 
const exhibitorlist =BASE_URL + '/sign/customer/user/exhibitor/list' 
// 登录 /api
const userlogin =BASE_URL + '/sign/customer/user/login' 
// 获取展商参加展会的列表
const exhlistuser =BASE_URL + '/sign/customer/user/exh/list' 
// 新增印章 /api/sign/customer/seal/add
const customersealadd =BASE_URL + '/sign/customer/seal/add' 
// 上传图片
const uploadOSS =BASE_URL + '/upload/uploadOSS' 
// 获取章列表
const seallist =BASE_URL + '/sign/customer/seal/list' 
// 获取合同列表
const contractlist =BASE_URL + '/sign/customer/contract/list'





// 业务端接口
const staffuserlogin =BASE_URL + '/sign/staff/user/login'
// 获取业务员详情
const userGetInfo =BASE_URL + '/sign/staff/user/getInfo'
// 获取展会类型列表 (企业)
const exhtypelist =BASE_URL + '/sign/staff/exh/type/list'
// 展会类型列表 /api
const exhtlist =BASE_URL + '/sign/staff/exh/list'
// 获取展商概况
const exhinfoexhibitor =BASE_URL + '/sign/staff/exh/info/exhibitor'
// 获取业绩概况 
const infosaleexh =BASE_URL + '/sign/staff/exh/info/sale'
const referrerCountarrive=BASE_URL_ZLF + '/api/visitor/referrerCount/arrive'
// 查询未订的展会列表  
const boothlistnotbuy=BASE_URL + '/sign/staff/booth/list/notbuy'
// 获取展商列表 /api/sign/staff/exhibitor/list
const staffexhibitorlist=BASE_URL + '/sign/staff/exhibitor/list'
// 获取展商联系人 
const exhibitorcontactlist=BASE_URL + '/sign/staff/exhibitor/contact/list'
// 服务列表 /api/sign/staff/service/list
const staffservicelist=BASE_URL + '/sign/staff/service/list'
// 服务分类  /api/sign/staff/service/category/list
const servicecategorylist=BASE_URL + '/sign/staff/service/category/list'
// 预定展位
const boothbuybooth=BASE_URL + '/sign/staff/booth/buy/booth'
// 预定服务  /api/sign/staff/service/buy
const servicebuy =BASE_URL + '/sign/staff/service/buy'
// 提交合同信息 /api/sign/staff/contract/create
const staffcontractcreate =BASE_URL + '/sign/staff/contract/create'
// 获取预定服务列表
const servicelistbook =BASE_URL + '/sign/staff/service/list/book'
// 获取预定的展位列表 /api
const boothlistbuy =BASE_URL + '/sign/staff/booth/list/buy'
// 删除预定的展位
const boothreturnbooth =BASE_URL + '/sign/staff/booth/return/booth'
// 删除预定的服务  /api/sign/staff/service/del/{ids}
const staffservicedel =BASE_URL + '/sign/staff/service/del/'
// 查询合同模版 
const contracttemplatelist =BASE_URL + '/sign/staff/contract/template/list'
// 新增合同 /api/sign/staff/contract/create
const contractcreate =BASE_URL + '/sign/staff/contract/create'
// 生成合同文件
const staffcontractgenerate =BASE_URL + '/sign/staff/contract/generate'
// 合同详情
const customercontractinfo =BASE_URL + '/sign/customer/contract/info/'
// 业务员签章 /api/sign/staff/contract/stamp
const staffcontractstamp =BASE_URL + '/sign/staff/contract/stamp'
// 删除章 /api/sign/customer/seal/del
const customersealdel =BASE_URL + '/sign/customer/seal/del'
// 展商合同列表 /api/sign/customer/contract/list
const customercontractlist =BASE_URL + '/sign/customer/contract/list'
// 业务员合同列表 /api/sign/staff/contract/list
const staffcontractlist =BASE_URL + '/sign/staff/contract/list'
// 客户添加章和签名 
const customercontractstamp =BASE_URL + '/sign/customer/contract/stamp'
// 预登记列表
const referrerlist='https://frdzlfapi.zsyflive.com' + '/api/visitor/referrer/list'
// 展位售出情况  
const staffinfobooth =BASE_URL + '/sign/staff/exh/info/booth'
// 签单排行 
const infosaleranking =BASE_URL + '/sign/staff/exh/info/sale/ranking'
// 付款记录  /api/sign/finance/payRecord/list
const payRecordlist =BASE_URL + '/sign/finance/payRecord/list'
// 认领到合同  aim/claim
const financeclaimclaim =BASE_URL + '/sign/finance/claim/claim'
// 提交付款记录
const payRecordadd =BASE_URL + '/sign/finance/payRecord/add'
// ---------------------
// 获取字典  /api/basic/dict/type/{dictType}
const basicdicttype =BASE_URL + '/basic/dict/type/'
// 认领记录列表 /api/sign/finance/claim/list
const financeclaimlist =BASE_URL + '/sign/finance/claim/list'
// 获取已预订展位  /api/sign/customer/buy/booth
const customerbuybooth =BASE_URL + '/sign/customer/buy/booth'
// 获取已定服务
const customerbuyservice =BASE_URL + '/sign/customer/buy/service'
// 获取企业参加的展会
const userexhlist =BASE_URL + '/sign/customer/user/exh/list'
// 获取移动端轮播图
const carousellist =BASE_URL + '/sign/carousel/list'
// 未收齐款项合同列表  /api/sign/staff/contract/list/pending
const contractpending =BASE_URL + '/sign/staff/contract/list/pending'
// 展馆列表 /api/sign/staff/booth/gallery/list
const gallerylist =BASE_URL + '/sign/staff/booth/gallery/list'
// 获取展厅列表
const boothhalllist =BASE_URL + '/sign/staff/booth/hall/list'




 export default {
	 boothhalllist,
	 gallerylist,
	 contractpending,
	 carousellist,
	 userexhlist,
	 customerbuyservice,
	 customerbuybooth,
	 financeclaimlist,
	 basicdicttype,
	 payRecordadd,
	 financeclaimclaim,
	 payRecordlist,
	 infosaleranking,
	 staffinfobooth,
	 referrerlist,
	 customercontractstamp,
	 staffcontractlist,
	 customercontractlist,
	 customersealdel,
	 staffcontractstamp,
	 customercontractinfo,
	 staffcontractgenerate,
	 contractcreate,
	 contracttemplatelist,
	 staffservicedel,
	 boothreturnbooth,
	 boothlistbuy,
	 servicelistbook,
	 servicebuy,
	 boothbuybooth,
	 servicecategorylist,
	 staffservicelist,
	 exhibitorcontactlist,
	 staffexhibitorlist,
	 boothlistnotbuy,
	 referrerCountarrive,
	 infosaleexh,
	 exhinfoexhibitor,
	 exhtypelist,
	 exhtlist,
	 userGetInfo,
	 staffuserlogin,
	 contractlist,
	 seallist,
	 uploadOSS,
	 customersealadd,
	 exhlistuser,
	 userlogin,
	 exhibitorlist,
	 userregister,
	 getphonesendmsgE,
	 ucommanylogin
 }
 