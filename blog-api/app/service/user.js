const BaseService = require('./base')

module.exports = class Service extends BaseService{
    constructor(...args){
        super(...args);
        this.model = 'user'
    }
    async list(pageNum,pageSize,where) {
        let data = await this.app.mysql.select(this.model,{
            where,
            order: [['id','asc'],['username','asc']],
            offset: (pageNum-1)*pageSize,
            limit:pageSize
        });
        for(let i=0;i<data.length;i++){
            let user = data[i];
            // user.resources = ?
            const resources =await this.app.mysql.query(`SELECT resource.* FROM resource
            INNER JOIN role_resource ON resource.id = role_resource.resource_id
            INNER JOIN role_user ON role_resource.role_id = role_user.role_id
            WHERE role_user.role_id =?;`,[user.id]);
            const rootMenus = [];
            const map = {};
            resources.forEach(resource => {
                resource.children = [];
                map[resource.id] = resource;
                if(resource.parent_id === 0) {
                    rootMenus.push(resource);
                }
                else {
                    map[resource.parent_id].children.push(resource);
                }
            });
            user.resources = rootMenus;
        }
       
        let total = await this.app.mysql.count(this.model,where);
        return { data , total};
     }
}