
const Controller = require("egg").Controller;

class LoginController extends Controller {
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

	async login() {
		try {
			let tel_num = this.getParam('tel_num');
			let password = this.getParam('password');
			let list = await this.ctx.service.login.login(tel_num, password);
			// 如果登录成功，设置ctx.session.uid
			if (list.code == 2) {
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

	async getCurrentUser() {
		try {
			let id = this.getParam('id');
			let list = await this.ctx.service.login.getCurrentUser(id);
			this.ctx.response.body = list;
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = LoginController;