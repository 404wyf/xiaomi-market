const Controller = require('../utils/baseController');

class GoodsTypeController extends Controller {


	async getGoodsTypeAll() {
		const { ctx } = this;
		const result = await ctx.service.goodsType.getGoodsTypeAll();
			//console.log(result);
		this.returnResult(result);
		// this.ctx.body=result;
	}

	async getGoodsTypeAllByPC() {
		const { ctx } = this;
		const result = await ctx.service.goodsType.getGoodsTypeAllByPC();
		this.returnResult(result);
	}
}

module.exports = GoodsTypeController;