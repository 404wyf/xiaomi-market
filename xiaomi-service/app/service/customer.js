'use strict';
const Service = require('egg').Service;

class CustomerService extends Service {
  //注册用户
  async addCustomer(customer) {

    try {
      const result = await this.app.mysql.insert("customer", {
        telid: customer.telid,
        customerName: customer.name,
        password: customer.pwd,
        remarks: customer.remarks
      });
      console.log(result);
      return result.affectedRows === 1;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  //登录验证
  async selectCustomerByTelidAndPwd(tel, pwd) {
    try {
      let result = await this.app.mysql.select("customer", {
        where: {
          telid: tel,
          password: pwd
        },
        limit: 1,
        offset: 0,
      })
      if (result && result.length > 0) {
        // 如果查询结果数组长度大于 0，表示查询到了数据
        //  console.log("查询到的用户:", result);
        return result;
      }
      else {
        return null;
      }

    } catch (e) {
      // console.log(e);
      return null;
    }

  }

}

module.exports = CustomerService;
