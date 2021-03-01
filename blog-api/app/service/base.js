const {Service} = require('egg');
module.exports = class BaseService extends Service {
//    async list(pageNum,pageSize,where) {
//        let data = await this.app.mysql.select(this.model,{
//            where,
//            order: [['id','asc']],
//            offset: (pageNum-1)*pageSize,
//            limit:pageSize
//        });
//        let total = await this.app.mysql.count(this.model,where);
//        return { data , total};
//     }
    async create(model){
        return await this.app.mysql.insert(this.model,model).affectedRows>0;
    }
    async update(model){
        return await this.app.mysql.update(this.model,model).affectedRows>0;
    }
    async destroy(id){
        return await this.app.mysql.delete(this.model,{id}).affectedRows>0;
    }
}