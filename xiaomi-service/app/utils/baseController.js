// app/core/base_controller.js


const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }

   // 处理 400 错误
   badRequest(errors) {
    this.ctx.status = 400; // 设置状态码为 400
    this.ctx.body = {
      success: false,
      errors,
    };
  }

  returnResult(result){
    if (!result&&result!==0) {  // 这里检查 rs 是否为 null, undefined 或其他 falsy 值
      this.badRequest('No data found or invalid request');  // 返回错误响应
  } else {
      this.success(result);  // 返回成功响应
  }
  }


  // validation(data){
  //   const Parameter = require('parameter');
  //   const parameter = new Parameter();
  //   return parameter.validate(rule,data);
  // }
}
module.exports = BaseController;
