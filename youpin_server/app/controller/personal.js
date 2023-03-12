
const Controller = require("egg").Controller;

class PersaonalController extends Controller {
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

    //获取订单信息
    async getorder() {
        try {
            let userid = this.getParam('userid')
            // let sql = 'SELECT * FROM orders where userid=?';
            let sql2 = 'SELECT orders.id,goods.title as title,orders.specification,orders.num,orders.time,orders.total,orders.goodsid,orders.addressid FROM orders INNER JOIN goods ON orders.goodsid = goods.id WHERE orders.userid = ?'
            let list = await this.ctx.app.mysql.query(sql2, [userid]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    //订单加入购物车
    async addgoods() {
        try {
            let userid = this.getParam('userid')
            let goodsid = this.getParam('goodsid')
            let goodsnum = this.getParam('goodsnum')
            let sql = 'INSERT INTO cars (userid,goodsid,goodsnum) VALUES (?,?,?)'
            let list = await this.ctx.app.mysql.query(sql, [userid, goodsid, goodsnum]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    // //购物车添加 更新
    // async addOrUpdate() {
    //     try {
    //         let userid = this.getParams("uid");
    //         let goodsid = this.getParams("gid");
    //         let goodsnum = this.getParams("count");
    //         let specification = this.getParams("spe");
    //         const sql1 = 'select count(*) as flag from cars where userid=? and goodsid=? and specification=? ';
    //         // [{flag:0}]  [{flag:1}]
    //         let list = await this.ctx.app.mysql.query(sql1, [userid, goodsid, specification])
    //         this.ctx.response.body = list
    //         // let sql = null;
    //         // if (list[0] == 0) {//没有添加，添加入购物车
    //         //     sql = "insert into cars(userid, goodsid,goodsnum)values(?,?,?,?)";
    //         // } else {//已经存在
    //         //     sql = "update cars set goodsnum=goodsnum+? where userid=? AND goodsid=? and specification=?;"

    //         // }
    //         // let res = await this.ctx.app.mysql.query(sql, [userid, goodsid, goodsnum, specification])
    //         // this.ctx.response.body = { state: 1, affectedRows: res.affectedRows };
    //     } catch (e) {
    //         console.log(e);
    //         this.ctx.response.body = { state: -1 };
    //     }
    // }
    // //检查商品在购物车是否存在
    // async checkedAdd() {
    //     try {
    //         let userid = this.getParams("userid");
    //         let goodsid = this.getParams("goodsid");
    //         let specification = this.getParams("specification");
    //         const sql = 'select count(*) as flag from cars where userid=? and goodsid=? and specification=? ';
    //         // [{flag:0}]  [{flag:1}]
    //         let list = await this.ctx.app.mysql.query(sql, [userid, goodsid, specification])
    //         this.ctx.response.body = { state: 1, ...list[0] };//{state:1, flag:0}, {state:1, flag:1};
    //     } catch (e) {
    //         console.log(e);
    //         this.ctx.response.body = { state: -1 };
    //     }
    // }


    //删除订单数据
    async deleteorder() {
        try {
            let id = this.getParam('id')
            let sql = 'DELETE FROM orders WHERE id = ?'
            let list = await this.ctx.app.mysql.query(sql, [id]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    //获取购物车数据
    async getcars() {
        try {
            let userid = this.getParam('userid')
            let sql = 'SELECT cars.id,goods.title,cars.specification,goods.price,goods.pimgs,cars.goodsnum,cars.goodsid FROM cars INNER JOIN goods ON cars.goodsid = goods.id  WHERE cars.userid = ? ORDER BY id DESC'
            let list = await this.ctx.app.mysql.query(sql, [userid]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    //购物车数据更新——数量
    async upcarsnum() {
        try {
            let id = this.getParam('id')
            let goodsnum = this.getParam('goodsnum')
            let sql = 'UPDATE cars SET goodsnum=? WHERE id=?;'
            let list = await this.ctx.app.mysql.query(sql, [goodsnum, id]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    //购物车删除
    async decar() {
        try {
            let id = this.getParam('id')
            let sql = 'DELETE FROM cars WHERE id=?'
            let list = await this.ctx.app.mysql.query(sql, [id]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }
    //结算
    async addSun() {
        try {
            let id = this.getParam('id')
            let sql = 'DELETE FROM cars WHERE id=?'
            let list = await this.ctx.app.mysql.query(sql, [id]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    //获取个人信息
    async getpersonal() {
        try {
            let id = this.getParam('userid')
            let sql = 'SELECT * FROM users WHERE id = ?'
            let list = await this.ctx.app.mysql.query(sql, [id]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    //保存地址
    async addAddress() {
        try {
            let userid = this.getParam('userid')
            let name = this.getParam('name')
            let phone = this.getParam('phone')
            let address = this.getParam('address')
            let isDefault = this.getParam('isDefault')

            let sql = 'INSERT INTO address (userid,name,phone,address,isDefault) VALUES (?,?,?,?,?)'
            let list = await this.ctx.app.mysql.query(sql, [userid, name, phone, address, isDefault]);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

}
module.exports = PersaonalController;