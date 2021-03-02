const BaseController = require('./base')
const svgCaptcha = require('svg-captcha')
const {sign} = require('jsonwebtoken')
module.exports=class Controller extends BaseController {
    constructor(...args){
        super(...args);
        this.model = 'user'
    }
    async captcha(){
        const {ctx} = this;
        let mycaptcha = svgCaptcha.create();  
        ctx.session.captcha ={
            text: mycaptcha.text,//把验证码的内容存到会话session当中
            expires:new Date(Date.now()+60*1000)
        }
        ctx.set('Content-Type','image/svg+xml');
        ctx.body = mycaptcha.data;
    }
    async checkCaptcha(){
        const {ctx} = this;
        const captcha = ctx.request.body.captcha+'';
        console.log(captcha,ctx.session.captcha)
        if(captcha.toLowerCase() === (ctx.session.captcha+'').toLowerCase() && ctx.session.captcha.expires
        .getTime() > Date.now() ){
            ctx.body = '验证通过！'
        }
        else{
            ctx.body = '验证失败！请检查您的验证码是否正确哦'
        }
    }
    async signup (){
        const {ctx,app} = this;
        const user = ctx.request.body;
        const result = await app.mysql.insert('user',user);
        if(result.affectedRows>0){
            this.success({
                id:result.insertId,
            })
        }else{
            this.error('注册失败了哦!')
        }
    }
    async signin(){
        const {ctx,app} = this;
        const {username,password}= ctx.request.body;
        const result = await app.mysql.select('user',{
            where:{username,password},
            limit:1
        })
        if(result.length>0&&result){
            let sginUser = JSON.parse(JSON.stringify(result[0]));
            delete sginUser.password;
            this.success(sign(sginUser,this.config.jwtSecret),{
                expiredAt:new Date(Date.now()+60*1000)
            } )
        }else{
            this.error('登录失败')
        }
    }
    async signout(){
        const {ctx} = this;
        ctx.session.user = null;
        this.success('退出成功!')
    }
}