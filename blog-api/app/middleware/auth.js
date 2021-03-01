const { verify } = require('jsonwebtoken')
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        verify(token, secret, (error, payload) => {
            if (error) {
                reject(error);
            } else {
                resolve(payload);
            }
        })
    })
}
module.exports = (options, app) => {
    return async function (ctx, next) {
        //权限判断
        const authUrls = options.authUrls;
        if (authUrls.includes(ctx.url)) {
            const authorization = ctx.get('authorization');
            if (authorization) {
                try {
                    const user = await verifyToken(authorization, app.config.secret);
                    ctx.session.user = user;
                    await next();
                } catch (error) {
                    ctx.status = 401;
                    ctx.body = 'Token 验证失败'
                }

            } else {
                ctx.status = 401;
                ctx.body = '没有Token'
            }
        } else {
            await next();
        }
    }
}