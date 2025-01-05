'use strict';
const Service = require('egg').Service;

class CartService extends Service {

    async createCartId() {
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




    async getCartByTelIdByGoodsId(telId, goodsId) {
        try {
            let result = await this.app.mysql.count('cart', {
                goodsId: goodsId,
                telId: telId
            });
            //  console.log(result);
            return result;

        } catch (error) {
            return null;
        }

    }


    async insertCart(cart) {
        try {
            let cartId = await this.createCartId();
            // 	2、开启事务
            const conn = await this.app.mysql.beginTransaction(); // 初始化事务
            try {
                // 	3、新增订单记录 一条记录
                const rs1 = await conn.insert("cart", {
                    cartId: cartId,
                    goodsId: cart.goodsId,
                    telId: cart.telId,
                    quantity: cart.quantity,
                    state: cart.state
                })
                await conn.commit(); // 提交事务
                return rs1;
            } catch (error) {
                console.log(error)
                await conn.rollback(); // 一定记得捕获异常后回滚事务！！
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }



    async updateQuantityCart(telId, goodsId, quantity) {
        try {

            // 使用 SQL 更新操作，在原先的 quantity 基础上增加 quantity
            let result = await this.app.mysql.query(
                'UPDATE cart SET quantity = quantity + ? WHERE telId = ? AND goodsId = ?',
                [quantity, telId, goodsId]
            );
            return result;
        } catch (error) {
            return false;
        }
    }


    async selectCartByTelId(telId) {
        try {
            const sql = `
            SELECT  cart.*,goods.*
            FROM cart  
            INNER JOIN goods  ON cart.goodsId = goods.goodsId
            WHERE cart.telId = ?;`;
            const result = await this.app.mysql.query(sql, [telId]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async selectCartCountByTelId(telId) {
        try {

            // const sql = `
            //         SELECT DISTINCT g.goodsTypeId
            //         FROM cart c
            //         INNER JOIN goods g ON c.goodsId = g.goodsId
            //         WHERE c.telId = ?;
            //     `;
            const sql=`SELECT DISTINCT goodsId FROM cart
                        WHERE cart.telId=?`;
            const result = await this.app.mysql.query(sql, [telId]);
            // console.log(result.length);
            // 返回去重后的 goodsTypeId 数组
            return result.length;

        } catch (error) {
            return false;
        }
    }



    async updateCartState(state, telId, goodsId) {
        try {
            const sql = `
            UPDATE cart
            SET state = ?
            WHERE telId = ? AND goodsId = ?;
        `;
            const result = await this.app.mysql.query(sql, [state, telId, goodsId]);
            return result;
        } catch (error) {
            return false;
        }
    }


    async deleteCartByTeldByGoodsId(telId, goodsId) {
        try {

            const result = await this.app.mysql.delete("cart", {
                telId: telId,
                goodsId: goodsId
            });

            return result;
        } catch (error) {
            return false;
        }
    }

}

module.exports = CartService;
