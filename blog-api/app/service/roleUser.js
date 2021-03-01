const BaseService = require('./base')

module.exports = class Service extends BaseService{
    constructor(...args){
        super(...args);
        this.model = 'role_user'
    }
}