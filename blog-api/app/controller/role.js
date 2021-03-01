const BaseController = require('./base')

module.exports=class Controller extends BaseController {
    constructor(...args){
        super(...args);
        this.model = 'role'
    }
}