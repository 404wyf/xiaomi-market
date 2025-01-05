'use strict';
const Service = require('egg').Service;

class OrderDetailService extends Service {

    async selectOrderdetailsByOrderId(orderId) {
        try {

            const sql = `
                SELECT 
                    orderdetails.*,goods.*
                    FROM orders
                    JOIN  orderdetails ON orders.orderId = orderdetails.orderId
                    JOIN  goods ON orderdetails.goodsId = goods.goodsId
                    WHERE orders.orderId = ?
            `
            const result = await this.app.mysql.query(sql, [orderId]);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }




}

module.exports = OrderDetailService;