const Controller = require('../utils/baseController');

//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();


class CartController extends Controller {
    async getCartByTelIdByGoodsId() {
        const { ctx } = this;
        let queryObj = ctx.request.body;
        const rule = {
            goodsId: {
                type: 'int',
                required: true,
                message: "请输入正确的商品编号"
            },

            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            }
        }
       // console.log(queryObj);
        const validDateErrors = parameter.validate(rule, queryObj);
        if (validDateErrors) {
            //console.log(queryObj);
            console.log(validDateErrors);
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.getCartByTelIdByGoodsId(queryObj.telId, queryObj.goodsId);
           // console.log(result);
            this.returnResult(result);
        }
    }



    async insertCart() {
        const { ctx } = this;
        let request = ctx.request.body;
        const rule = {
            state: {
                type: 'int',
                required: true,
                message: "请输入正确的状态"
            },

            goodsId: {
                type:'int',
                required: true,
                message: "请输入正确的商品编号"
            },

            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            },

            quantity: {
                type: 'int',
                required: true,
                message: "请输入正确的数量"
            }
        }

        request.goodsId=parseInt(request.goodsId, 10)
      //  console.log(request);
        const validDateErrors = parameter.validate(rule, request);
        if (validDateErrors) {
            console.log(validDateErrors);
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.insertCart(request);
            //  console.log(result);
            this.returnResult(result);
        }
    }


    async updateQuantityCart() {
        const { ctx } = this;
        let request = ctx.request.body;
        const rule = {
            goodsId: {
                type: 'int',
                required: true,
                message: "请输入正确的商品编号"
            },

            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            },

            quantity: {
                type: 'int',
                required: true,
                message: "请输入正确的数量"
            }
        }


        request.goodsId=parseInt(request.goodsId,10);
       // console.log(request);
        const validDateErrors = parameter.validate(rule, request);
        if (validDateErrors) {

            console.log(validDateErrors);
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.updateQuantityCart(request.telId, request.goodsId, request.quantity);
            //  console.log(result);
            this.returnResult(result);
        }
    }

    async getCartByTelId() {
        const { ctx } = this;
        let queryObj = ctx.query;
        const rule = {
            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            },
        }


        const validDateErrors = parameter.validate(rule, queryObj);
        if (validDateErrors) {

            //console.log(validDateErrors);
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.selectCartByTelId(queryObj.telId);
            //   console.log(result);
            //   console.log(queryObj);
            this.returnResult(result);
        }
    }


    async getCartCountByTelId() {
        const { ctx } = this;
        let queryObj = ctx.query;
        const rule = {
            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            },
        }


        const validDateErrors = parameter.validate(rule, queryObj);
        if (validDateErrors) {

            //console.log(validDateErrors);
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.selectCartCountByTelId(queryObj.telId);
            //   console.log(result);
            //   console.log(queryObj);
            this.returnResult(result);
        }
    }



    async updateCartState() {
        const { ctx } = this;
        let request = ctx.request.body;
        const rule = {
            goodsId: {
                type: 'int',
                required: true,
                message: "请输入正确的商品编号"
            },

            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            },

            state:{
                type:'int',
                required:true
            }
        }

        const validDateErrors = parameter.validate(rule, request);
        if (validDateErrors) {

            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.updateCartState(request.state,request.telId, request.goodsId);
            this.returnResult(result);
        }
    }


    async deleteCartByTeldByGoodsId() {

         
        const { ctx } = this;
        let request = ctx.request.body;
        const rule = {
            goodsId: {
                type: 'int',
                required: true,
                message: "请输入正确的商品编号"
            },

            telId: {
                type: 'string',
                required: true,
                length: 11,
                message: "请输入正确的手机号"
            },
        }
      
        
        const validDateErrors = parameter.validate(rule, request);
        if (validDateErrors) {
            this.badRequest(validDateErrors);
        }
        else {
            let result = await ctx.service.cart.deleteCartByTeldByGoodsId(request.telId, request.goodsId);
            this.returnResult(result);
        }
    }




   

}

module.exports = CartController;
