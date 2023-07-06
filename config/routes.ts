export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },{
    name: '大数据平台看板',
    path: '/dashBoard',
    component: './DashBoard',
  },

  {
    name:"金融业务管理",
    path:"/bus",
    component: './BusManager'
  },
  {
    name: '金融数据采集与管理',
    path: '/tableManager',
    component: './TableManager',
  },
  {
    name: '金融分析模型管理',
    path: '/modelManager',
    component: './ModelManager',
  },
  {
    name: '用户画像',
    path: '/userPersona',
    component: './UserPersona',
  },
  {
    name:'偏好推荐',
    path:'/userPrefrences',
    component:'./UserPrefrence'
  },
  {
    path: '/userCertificate/:id',
    component: './UserCertificate',
  },{
    path: '/userCertificate/result/:busId/:taskId',
    component: './UserCertificate/Result',
  },
  {
    path: '/recommend/:id',
    component: './Recommend',
  },{
    path: '/recommend/result/:busId/:taskId',
    component: './Recommend/Result',
  },
  {
    path: '/mockData/tableCreate',
    component: './MockData',
  },
  {
    path: '/fe/tableCreate',
    component: './FeatureExtract',
  },  {
    path: '/dataImport/tableCreate',
    component: './DataImport',
  },
  {
    path: '/analyse/rule/create',
    component: './AnalyseManager/Add/Rule',
  },  {
    path: '/analyse/model/create',
    component: './AnalyseManager/Add/Model',
  },
  {
    path: '/analyse/result/:id',
    component: './AnalyseManager/Result',
  },{
    name: '系统用户管理',
    path: '/userManager',
    access: 'canAdmin',
    component: './user/Manager',
  },
  {
    name:"大数据集群管理与监控",
    routes: [
      {
        name: 'HDFS',
        path: 'http://10.16.62.146:9870',
      },
      {
        name:'YARN',
        path:'http://10.16.30.215:8088',
      },
      {
        name:'MapReduce',
        path:'http://10.16.62.146:19888',
      }
      
    ]
  },
  

  {
    path: '/model/add',
    component: './ModelManager/Add',
  },
  {
    path: '/',
    redirect: '/dashBoard',
  },
  {
    component: './404',
  },
];
