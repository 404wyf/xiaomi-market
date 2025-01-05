'use strict';
const Service = require('egg').Service;

class GoodsService extends Service {
	async getAll() {
		// 查全表
		let result;
		try {
			let sql = `select goodsId,goodsName from goods`;
			result = await this.app.mysql.query(sql);
			return result;
		} catch (error) {
			//  console.log(error);
			return null;
		}

	}


	async getGoodsById(goodsId) {
		let result;
		try {

			result = await this.app.mysql.select('goods', {
				where: { goodsId: goodsId }, // WHERE 条件
				 
			});
			return result;
		} catch (error) {
		    console.log(error);
			return null;
		}

	}

	async getGoodsByGoodsTypeId(goodsTypeId){
		let result;
		try {
			result = await this.app.mysql.select('goods', {  
				where: { goodsTypeId:goodsTypeId }, // WHERE 条件
				orders: [['goodsTypeId','asc' ]], // 排序方式
				
			  });
			return result;
		} catch (error) {
		   console.log(error);
			return null;
		}

	}



}

module.exports = GoodsService;