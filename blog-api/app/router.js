'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
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
}
