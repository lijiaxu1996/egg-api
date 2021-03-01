const { Controller } = require("egg");
const uuid = require('uuid');
module.exports = class BaseController extends Controller {
    async index() {
        const {ctx , service} = this;
        const {pageNum,pageSize,...where} = ctx.query;
        let lists = await service[this.model].list(isNaN(pageNum)?1:parseInt(pageNum),isNaN(pageSize)?3:parseInt(pageSize)
        ,where);
        ctx.body =lists;
    }
    //创建用户
    async create() {
        const {ctx,service} = this;
        let model = ctx.request.body;
        // model.uuid = uuid.v4();
        await service[this.model].create(model)?
        this.success('success'):this.error('用户创建失败!')
    }
    //修改用户名
    async update(){
        const {ctx,service} = this;
        let model = ctx.request.body;
        let id = ctx.params.id;
        user.id =id;
        // user.uuid = uuid.v4();
        await service[this.model].update(model)?
        this.success('success'):this.error('修改用户名失败!');
    }
    //删除用户名
    async destroy() {
        const {ctx,service} = this;
        let id = ctx.params.id;
        await service[this.model].destroy(id)?
        this.success('success'):this.error('删除用户名失败!');
    }
    success(data){
       this.ctx.body={
            code:0,
            data
        }
    };
    error(error){
      this.ctx.body={
            code:1,
            error
        }
    }
}