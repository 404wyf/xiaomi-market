const { Controller } = require('egg');

class HomeController extends Controller {
  // 示例方法，返回简单字符串
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  // 添加一个请求处理方法
  async home() {
  	const { ctx } = this;
  	const dataList = {
        list: [
          { id: 1, title: 'This is news 1', url: '/news/1' },
          { id: 2, title: 'This is news 2', url: '/news/2' }
        ]
      };
      await this.ctx.render('../view/home.tpl', dataList);
 }   
}

module.exports = HomeController;
