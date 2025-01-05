const GoodsService = require('../service/goods');
const Controller = require('../utils/baseController');
//导入paramter组件
const Parameter = require('parameter');
const parameter = new Parameter();

class GoodsController extends Controller {

	async list() {
		const { ctx } = this;
		const goods = await ctx.service.goods.getAll();
		const list = JSON.parse(JSON.stringify(goods));
		console.log(list);
		const dataList = {
			list: list
		};
		await this.ctx.render('goods.tpl', dataList);
	}

	async getGoodsById() {
		const { ctx } = this;
		const request = ctx.request.body;
		const rule = {
			goodsId: {
				type: 'int',
				required: true,
				message: "请输入正确的编号"
			},

		}

		//验证请求参数
		const goodsId = parseInt(request.goodsId, 10);
		const validDateErrors = parameter.validate(rule, { goodsId });

		if (validDateErrors) {
			this.returnResult(false);
		} else {
			//console.log(goodsId);
			const result = await ctx.service.goods.getGoodsById(goodsId);
		//	console.log(result);
			this.returnResult(result);
		}

	}

	async getGoodsByGoodsTypeId() {
		const { ctx } = this;
		const queryObj = ctx.query;
		const rule = {
			goodsTypeId: {
				type: 'int',
				required: true,
				message: "请输入正确的编号"
			},

		}

		//验证请求参数
		const goodsTypeId = parseInt(queryObj.goodsTypeId, 10);
		const validDateErrors = parameter.validate(rule, { goodsTypeId });

		if (validDateErrors) {
			console.log(validDateErrors);
			this.returnResult(false);
		} else {
		  //  console.log(queryObj.goodsTypeId);
			const result = await ctx.service.goods.getGoodsByGoodsTypeId(goodsTypeId);
			//console.log(result);
			this.returnResult(result);
		}

	}



}

module.exports = GoodsController;