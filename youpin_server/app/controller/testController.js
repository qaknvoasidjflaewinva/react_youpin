
const Controller = require("egg").Controller;

class TestController extends Controller {
	//获取请求参数
	getParam(key) {
		//得到请求方式: "GET","POST"
		let method = this.ctx.request.method;//"GET", "POST"
		if(method == 'GET') {
			let v = this.ctx.request.query[key];
			return v;
		}else if(method=="POST"){
			let v = this.ctx.request.body[key];
			return v;
		} 
	}
	
	async getStr() {
		try {
			this.ctx.response.body = "Hello Egg!";
		}catch(e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}
}
module.exports = TestController;