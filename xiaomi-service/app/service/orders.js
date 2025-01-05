'use strict';
const Service = require('egg').Service;

class OredersService extends Service {

    async createOrderNo(){
		while(true){
			// 1、生成订单编号，并验证编号是否存在
			let orderId=() => {
				{
					let now = new Date();
					let year = now.getFullYear();
					let month = now.getMonth() + 1;
					let day = now.getDate();
					month = month < 10 ? "0" + month : month;
					day = day < 10 ? "0" + day : day;
			
					let hours = now.getHours();
					let minutes = now.getMinutes();
					let seconds = now.getSeconds();
					let ms = now.getMilliseconds();
					hours = hours < 10 ? "0" + hours : hours;
					minutes = minutes < 10 ? "0" + minutes : minutes;
					seconds = seconds < 10 ? "0" + seconds : seconds;
			
					return `${year}${month}${day}${hours}${minutes}${seconds}${ms}`
				}
			}
			const oId=orderId()
			const total=await this.app.mysql.count('orders', { orderId:oId}); 
			if(total==0)
				return oId;	
		}
		
		
	}


	async createOdId() {
        // 生成一个基于时间戳的整数作为 cartId
        const generateCartId = () => {
            const now = new Date();
            const timestamp = now.getTime(); // 获取当前时间的毫秒数
            const randomPart = Math.floor(Math.random() * 100); // 添加一个两位数的随机数，进一步避免冲突

            // 限制 cartId 在 MySQL INT 类型的范围内：-2147483648 到 2147483647
            let cartId = timestamp + randomPart;

            // 确保 cartId 在 INT 范围内
            const intMin = -2147483648;
            const intMax = 2147483647;

            // 如果 cartId 超出了 INT 范围，进行调整
            if (cartId > intMax) {
                cartId = cartId % intMax; // 保证 cartId 不超过 INT 的最大值
            } else if (cartId < intMin) {
                cartId = intMin + Math.abs(cartId) % (intMax - intMin); // 保证 cartId 不小于 INT 的最小值
            }

            return cartId;
        };

        // 生成一个新的 cartId
        const cartId = generateCartId();

        // 查询数据库，检查生成的 cartId 是否已存在
        const total = await this.app.mysql.count('cart', { cartId: cartId });

        if (total === 0) {
            return cartId; // 如果 cartId 唯一，返回它
        } else {
            return this.createCartId(); // 如果重复，重新生成
        }
    }


    async insertOrder(order){
	//	console.log(order);
		let rs=0;
		try{
			//	1
			let orderNo=await this.createOrderNo();

			// 	2、开启事务
			const conn = await this.app.mysql.beginTransaction(); // 初始化事务
			try{
				// 	3、新增订单记录 一条记录
				const rs1=await conn.insert("orders", {
					orderId:orderNo,
					telId:order.telId,
					addressId:order.addressId,
					orderTotal:order.orderTotal,
					orderDate:conn.literals.now,
					orderState:0
				})
				rs+=rs1.affectedRows; 
				// 	4、循环添加订单明细  N条记录
				for(var i in order.orderDetails){
					let odId=await this.createOdId()
					const rs2=await conn.insert("orderdetails", {
						odId:odId,
						orderId:orderNo,
						goodsId:order.orderDetails[i].goodsId,
						quantity:order.orderDetails[i].quantity,
					})
					rs+=rs1.affectedRows;
				}
				
				
				// 	5、删除购物车记录
				for(var i in order.orderDetails){
					const rs2=await conn.delete("cart", {
						telId:order.telId,
						goodsId:order.orderDetails[i].goodsId,
					})
				}
				// 	7、提交
				await conn.commit(); // 提交事务
				return orderNo;
			}catch(e){
				// 	6、判断是否有误 回滚
				console.log(e)
				 // 错误，回滚
				await conn.rollback(); // 一定记得捕获异常后回滚事务！！
				return false
			}
			
		}catch(e){
			console.log(e)
			return false
		}
	}


    async selectOrdersById(orderId){
		//console.log(orderId);
        try{
            const sql=`
                SELECT orders.* , address.*
                FROM orders 
                JOIN address  ON orders.telId = address.telId AND orders.addressId = address.addressId
                WHERE orders.orderId = ?
            `;
            const result = await this.app.mysql.query(sql, [orderId]);
		//	console.log(result);
            // 返回查询结果
            return result;
        }catch(error){
            console.log(error);
            return false;
        }
    }

}





module.exports = OredersService;