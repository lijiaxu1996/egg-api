const BaseService = require('./base')

module.exports = class Service extends BaseService{
    constructor(...args){
        super(...args);
        this.model = 'role'
    }
    async getResource(){
        const {app} = this;
        const resources = await app.mysql.select('resource');
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
        return rootMenus;
    }
    async setResource({roleId,resourceIds}) {
        const {app} = this; //一个角色对应的id,资源对应的id有很多
        await app.mysql.query('DELETE FROM role_resource WHERE role_id=?',[roleId]);
        for(let i=0;i<resourceIds.length;i++){
            const resourceId = resourceIds[i];
            await app.mysql.insert('role_resource',{
                role_id:roleId,
                resource_id:resourceId
            })
        }
    }
    async getUser(){
        return await this.app.mysql.select('user');
     }
     async setUser({roleId,userIds}) {
         const {app} = this; //一个角色对应的id,资源对应的id有很多
         const conn = await app.mysql.beginTransaction();
         try {
            await conn.query('DELETE FROM role_user WHERE role_id=?',[roleId]);
            for(let i=0;i<userIds.length;i++){
                const userId = userIds[i];
                await conn.insert('role_user',{
                    role_id:roleId,
                    user_id:userId
                })
            }
            await conn.commit();
         } catch (error) {
             await conn.rollback();
             throw error;
         }
       
     }
}