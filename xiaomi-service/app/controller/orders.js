const Controller = require('../utils/baseController');
//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();

class OredersController extends Controller {
    async insertOrders() {
        const { ctx } = this;
        let request = ctx.request.body;

        const result = await ctx.service.orders.insertOrder(request);
        this.returnResult(result);
    }

    async getOrdersById() {
      
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
            let result = await this.ctx.service.orders.selectOrdersById(queryObj.orderId);
            this.returnResult(result);
        }
    }

   



}

module.exports = OredersController;