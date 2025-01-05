const Controller = require('../utils/baseController');
//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();

class OrderdetailsController extends Controller {
 
    async getOrderdetailsByOrderId() {
      
        const { ctx } = this;
        let queryObj = ctx.query;
        const rule = {
            orderId: {
                type: 'string',
                required: true,
                message: "编号错误"
            }
        }

        //console.log(queryObj);
        const validDateErrors = parameter.validate(rule, queryObj);
        if (validDateErrors) {
            console.log(validDateErrors);
            this.badRequest(false);
        } else {
            let result = await this.ctx.service.orderdetails.selectOrderdetailsByOrderId(queryObj.orderId);
            this.returnResult(result);
        }
    }

  
}

module.exports = OrderdetailsController;