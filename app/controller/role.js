const BaseController = require('./base')

module.exports=class Controller extends BaseController {
    constructor(...args){
        super(...args);
        this.model = 'role'
    }
    async getResource(){
        const {ctx,service} = this;
        ctx.body = await service.role.getResource()
    }
    async setResource() {
        const {ctx,service} = this;
        const body = ctx.request.body;
        await service.role.setResource(body);
        this.success('授权成功!')
    }
    async getUser(){
        const {ctx,service} = this;
        ctx.body = await service.role.getUser()
        console.log( ctx.session.user );
    }
    async setUser() {
        const {ctx,service} = this;
        const body = ctx.request.body;
        await service.role.setUser(body);
        this.success('授权成功!')
    }
}