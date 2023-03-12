const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");

class homepageController extends Controller{
    getParams(key) {
		if (this.ctx.request.method == "POST") { //获取post请求参数
			return this.ctx.request.body[key];
		} else { //获取get请求参数
			return this.ctx.request.query[key];
		}
	}

	async getAllgoods(){
		try{
			const sql = `select * from goods`

			const list = await this.ctx.app.mysql.query(sql);//[{...}]
			this.ctx.response.body = {state:1, list};
		}catch(e){
			console.log(e)
			this.ctx.response.body = {state: -1};
		}
	}

    async getgoodsBynew() {
		try {
			let classify = "新品"  
			const sql = `select * from goods where classify = ?`
						
			//长度为1的对象数组
			const list = await this.ctx.app.mysql.query(sql,[classify]);//[{...}]
			this.ctx.response.body = {state:1, list};
		}catch(e) {
			console.log(e)
			this.ctx.response.body = {state: -1};
		}
	}

	async getgoodsBytime() {
		try {
			let classify = "秒杀"  
			const sql = `select * from goods where classify = ?`
						
			//长度为1的对象数组
			const list = await this.ctx.app.mysql.query(sql,[classify]);//[{...}]
			this.ctx.response.body = {state:1, list};
		}catch(e) {
			console.log(e)
			this.ctx.response.body = {state: -1};
		}
	}

	async getAllgoodsbyclass() {
		let classx = this.getParams("classx");
		
		if (classx == 1) {
			try{
				let name = this.getParams("name");
				const sql = `select * from goods where classify = ?`
				const list = await this.ctx.app.mysql.query(sql,[name]);//[{...}]
				this.ctx.response.body = {state:1, list};
			}catch(e){
				console.log(e)
				this.ctx.response.body = {state: -1};
			}
		}else{
			try{
				let name = this.getParams("name");
				let names = "%" + name + "%"
				const sql = "select * from goods where title like ?"
				const list = await this.ctx.app.mysql.query(sql,[names]);//[{...}]
				this.ctx.response.body = {state:1, list};
			}catch(e){
				console.log(e)
				this.ctx.response.body = {state: -1};
			}
		}
	}

	async getAllgoodsbyprice() {
		let classx = this.getParams("classx");
		
		if (classx == 1) {
			try{
				let name = this.getParams("name");
				const sql = `select * from goods where classify = ? order by price`
				const list = await this.ctx.app.mysql.query(sql,[name]);//[{...}]
				this.ctx.response.body = {state:1, list};
			}catch(e){
				console.log(e)
				this.ctx.response.body = {state: -1};
			}
		}else{
			try{
				let name = this.getParams("name");
				let names = "%" + name + "%"
				const sql = `select * from goods where title like ? order by price`
				const list = await this.ctx.app.mysql.query(sql,[names]);//[{...}]
				this.ctx.response.body = {state:1, list};
			}catch(e){
				console.log(e)
				this.ctx.response.body = {state: -1};
			}
		}
	}
}

module.exports = homepageController;