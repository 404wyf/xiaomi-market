const Controller = require('../utils/baseController');

//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();


class AddressController extends Controller {
 
    async getAddressByTelIdByDefault() {
        const { ctx } = this;
        let request = ctx.request.body;
        const rule = {
            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            }
        }
       // console.log(request);
        const validDateErrors = parameter.validate(rule, request);
        if (validDateErrors) {
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.address.selectAddressByTelIdByDefault(request.telId);
           // console.log(result);
            this.returnResult(result);
        }
    }

   

}

module.exports = AddressController;
