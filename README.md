# blog-api

这是我写的cms通用后台管理系统接口

## 参考:
https://www.bilibili.com/video/BV1v54y1y7V1?p=2

### 已经完成的功能
- 用户的增删改查
- 角色的增删改查
- 资源的增删改查
- 分页功能
- JWT权限校验

### 完成接口:
```javascript


  router.get('/', controller.home.index);
  router.resources('user','/api/user',controller.user);
  router.resources('role','/api/role',controller.role);
  router.resources('resource','/api/resource',controller.resource);
  router.resources('roleResource','/api/roleResource',controller.roleResource);
  router.resources('roleUser','/api/roleUser',controller.roleUser);
  //定义资源的返回列表
  router.get('/api/role/getResource',controller.role.getResource);
  router.post('/api/role/setResource',controller.role.setResource);
  router.get('/api/role/getUser',controller.role.getUser);
  router.post('/api/role/setUser',controller.role.setUser);

  //定义验证码
  router.get('/api/captcha',controller.user.captcha);
  // 检查验证码
  router.post('/api/checkCaptcha',controller.user.checkCaptcha);
  //注册 登录 接口实现
  router.post('/signup',controller.user.signup);
  router.post('/signin',controller.user.signin);
  router.post('/signout',controller.user.signout);
```
