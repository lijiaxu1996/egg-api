/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614500630647_725';

  // add your middleware config here
  config.middleware = [
    //启动中间件
    'auth',

  ];
  config.auth = {
    authUrls:[
      '/api/role/getUser',
      '/api/role/setUser'
    ]
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.security = {
    csrf:false,
    domainWhiteList:['http://localhost:8080'] //设置可以跨域
  }
  userConfig.jwtSecret = "egg-blog-api-learn"
  userConfig.mysql = {
    client:{
      host:'localhost',
      port:55002,
      user:'root',
      password:'root',
      database:'cms'
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};
