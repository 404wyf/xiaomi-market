/* eslint valid-jsdoc: "off" */

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
  config.keys = appInfo.name + '_1735024256321_2773';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  // 添加 view 配置项
config.view = {
  defaultViewEngine: 'nunjucks',
    mapping: {
    '.tpl': 'nunjucks',
    },
};


  // 添加 view 配置项
  config.cors = {
    origin:"*",
    allowMethods:'PUT,GET,POST,DELET,PATCH,HEAD'
  };


//配置数据库连接
config.mysql = {
	app: true,
	client: {
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '620785',
		database: 'mi'
	}
}


// config/config.default.js
exports.security = {
  csrf: {
      enable: false, // 禁用 CSRF 保护
  },
};


  return {
    ...config,
    ...userConfig,
  };
};
