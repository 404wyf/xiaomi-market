const Controller = require('../utils/baseController');

//导入paramter组件
const Parameter = require('parameter'); 
const parameter = new Parameter();


class CustomerController extends Controller {
    //注册
  async register() {
    const { ctx } = this;


    const rule={
        telId:{
            type:'string',
            required:true,
            min :11,
            max:11,
            message:"请输入正确的手机号"
        },
        password:{
            type:'string',min:3,max:8,required:true,message:"请输入3——8位密码"
        },
        customerName:{
            type:'string',required:true,message:"用户名"
        },

        address:{
            type:'string',
            required:true
        }
    }

    //验证请求参数
    const validDateErrors=parameter.validate(rule,ctx.request.body);
   // console.log(validDateErrors);

    if(validDateErrors){
        this.badRequest(validDateErrors);
    }
    else{
        // 获取请求参数
        const params = ctx.request.body;
        // 调用 service 方法
        console.log(params);
        const rs = await ctx.service.customer.addCustomer(params);
        console.log(rs);
       this.returnResult(rs);
    }

  }


  //登录
  async login(){

    const { ctx } = this;
    
    const rule={
        telId:{
            type:'string',
            required:true,
            length:11,
            message:"请输入正确的手机号"
            
       },
       password:{
            type:'string',
            required:true,
            min:3,max:8,
            message:"请输入3——8位密码"

       } 
    }

    let params=this.ctx.request.body;
    
   // console.log("params:"+JSON.stringify(params));
    const validDateErrors=parameter.validate(rule,params);
    if(validDateErrors){
        console.log(validDateErrors);
        this.badRequest(validDateErrors);
    }
    else{
       
        const result = await ctx.service.customer.selectCustomerByTelidAndPwd(params.telId,params.password);
      //  console.log(result);
        this.returnResult(result);
    }
  }
}

module.exports = CustomerController;
