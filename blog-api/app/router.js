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
}
