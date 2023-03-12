const Controller = require("egg").Controller;

class SearchController extends Controller {
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

    async searchByKey() {
        try {
            let key = this.getParam('key');
            let list = await this.ctx.service.search.searchByKey(key);
            this.ctx.response.body = list;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = SearchController;