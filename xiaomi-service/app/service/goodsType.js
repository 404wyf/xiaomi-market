'use strict';
const Service = require('egg').Service;

class GoodsTypeService extends Service {
	 

	async getGoodsTypeAll() {
		let result;
		try {
			const sql = `
		SELECT * from  goodstype `

			result = await this.app.mysql.query(sql);
			//console.log(result);
			return result;
		} catch (error) {
			return null;
		}
		 
	}


	async getGoodsTypeAllByPC() {
		let result;
		try {
			const sql = `
	 	 SELECT 
		goodstype.goodsTypeid, 
		goodstype.goodsTypeName, 
		GROUP_CONCAT(goods.goodsName ORDER BY goods.goodsName ASC) AS goodsNames
		FROM goodstype
		JOIN goods ON goodstype.goodsTypeid = goods.goodsTypeid
		GROUP BY goodstype.goodsTypeid, goodstype.goodsTypeName;`;

			result = await this.app.mysql.query(sql);

			// 处理结果，将 goodsNames 字符串转换为数组
			if (result && Array.isArray(result)) {
				result.forEach(item => {
					if (item.goodsNames) {
						// 将 goodsNames 字符串按逗号分割成数组
						item.goodsNames = item.goodsNames.split(',');
					}
				});
			}

			return result;
		} catch (error) {
			//console.error(error);  // 输出错误信息，方便调试
			return null;
		}

 
	}



}

module.exports = GoodsTypeService;