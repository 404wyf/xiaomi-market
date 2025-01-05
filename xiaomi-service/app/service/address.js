'use strict';
const Service = require('egg').Service;

class AddressService extends Service {

    
    async selectAddressByTelIdByDefault(telId,defaultState ) {
        try{
            let result=await this.app.mysql.select("address",{
                 
                where:{
                    telId:telId,
                }
            })
            return result;
        }catch(error){
            return false;
        }
       
    }

}

module.exports = AddressService;