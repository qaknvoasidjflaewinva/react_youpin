const Controller = require("egg").Controller;

class RegisterController extends Controller {
    //获取请求参数
    getParam(key) {
        //得到请求方式: "GET","POST"
        let method = this.ctx.request.method;//"GET", "POST"
        if (method == 'GET') {
            let v = this.ctx.request.query[key];
            return v;
        } else if (method == "POST") {
            let v = this.ctx.request.body[key];
            return v;
        }
    }

    async register() {
        try {
            let tel_num = this.getParam('tel_num');
            let password = this.getParam('password');
            let list = await this.ctx.service.register.register(tel_num, password);
            // 如果注册成功，设置ctx.session.uid
            if (list.code == 0) {
                let id = list.id;
                this.ctx.session.id = id;
                this.ctx.session.tel_num = tel_num;
            }
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }
}
module.exports = RegisterController;