const Controller = require("egg").Controller;

class GoodsController extends Controller {
    //获取请求参数
    getParams(key) {
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
    // 获取所有商品
    /*  async getAllGoods() {
         try {
             const sql = "select * from goods";
             const list = await this.ctx.app.mysql.query(sql);
             this.ctx.response.body = { state: 1, list };
         } catch (e) {
             console.log(e);
             this.ctx.response.body = { state: -1 };
         }
     } */
    //得到商品详情
    async getGoodsById() {
        try {
            let gid = this.getParams("gid").trim();//商品的主键值
            const sql = `select id,title,price,description,pimgs,specification from goods where id =?`
            //长度为1的对象数组
            const list = await this.ctx.app.mysql.query(sql, [gid]);//[{...}] 
            this.ctx.response.body = { state: 1, list };
        } catch (e) {
            console.log(e)
            this.ctx.response.body = { state: -1 };
        }
    }
    //得到商品发货默认地址
    async getGoodsAddressById() {
        try {
            let userid = this.getParams("uid");//商品的主键值
            const sql = `select address from address where userid =?`
            //长度为1的对象数组
            const list = await this.ctx.app.mysql.query(sql, [userid]);//[{...}] 
            this.ctx.response.body = { state: 1, list };
        } catch (e) {
            console.log(e)
            this.ctx.response.body = { state: -1 };
        }
    }

    //得到商品图片
    async getGoodsImgById() {
        try {
            let gid = this.getParams("gid");//商品的主键值
            const sql = `select goodsimg.id,goodsimg.gid gid,goodsimg.imgsrc,goodsimg.cate from goodsimg inner join goods on goods.id = goodsimg.gid and gid=?`
            //长度为1的对象数组
            const list = await this.ctx.app.mysql.query(sql, [gid]);//[{...}] 
            this.ctx.response.body = { state: 1, list };
        } catch (e) {
            console.log(e)
            this.ctx.response.body = { state: -1 };
        }
    }


    //检查商品在购物车是否存在
    async checkedAdd() {
        try {
            let userid = this.getParams("uid");
            let goodsid = this.getParams("gid");
            let specification = this.getParams("spe");
            console.log(userid, goodsid, specification, 111111);

            const sql = 'select count(*) as flag from cars where userid=? and goodsid=? and specification=?';
            // [{flag:0}]  [{flag:1}]
            let list = await this.ctx.app.mysql.query(sql, [userid, goodsid, specification])
            this.ctx.response.body = { state: 1, ...list[0] };//{state:1, flag:0}, {state:1, flag:1};
        } catch (e) {
            console.log(e);
            this.ctx.response.body = { state: -1 };
        }
    }

    //购物车添加 更新
    async addOrUpdate() {
        try {
            let userid = this.getParams("uid");
            let goodsid = this.getParams("gid");
            let goodsnum = this.getParams("count");
            let specification = this.getParams("spe");
            let con = this.getParams("con");//con==0没有加入， con==1已经加入
            console.log(userid, goodsid, goodsnum, specification, con);

            let sql = null;
            if (con == 0) {//没有添加，添加入购物车
                console.log("添加");
                sql = "insert into cars(userid, goodsid,goodsnum,specification)values(?,?,?,?)";
            } else if (con !== 0) {//已经存在
                console.log("更新");
                sql = "update cars set goodsnum=goodsnum+? where userid=? AND goodsid=? AND goodsnum=? AND specification=?";
                console.log("更新");
            }
            let res = await this.ctx.app.mysql.query(sql, [userid, goodsid, goodsnum, specification])
            this.ctx.response.body = { state: 1, res, affectedRows: res.affectedRows };
        } catch (e) {
            console.log(e);
            this.ctx.response.body = { state: -1 };
        }
    }


    //得到商品评价
    async getCommentBgid() {
        try {
            let gid = this.getParams("gid");//商品的主键值
            const sql = `select users.id userid,users.name username,users.headimg userimg,comments.id comid,comments.fid,comments.time,comments.content from comments inner join users  on  comments.userid =users.id and comments.goodsid=?`
            //长度为1的对象数组
            const list = await this.ctx.app.mysql.query(sql, [gid]);//[{...}] 
            this.ctx.response.body = { state: 1, list };
        } catch (e) {
            console.log(e)
            this.ctx.response.body = { state: -1 };
        }
    }

    async getCommentBygid() {
        try {
            let gid = this.getParams("gid");//商品的主键值
            const { ctx, app } = this;
            const aid = ctx.request.body.aid;

            const sql = `select users.id userid,users.name username,users.headimg userimg,comments.id comid,comments.fid,comments.time,comments.content from comments inner join users  on  comments.userid = users.id and fid = 0 and comments.goodsid=? `
            let commentList = {};
            commentList.firstCom = await app.mysql.query(sql, [gid]);

            for (const key in commentList.firstCom) {//循环一级评论
                const sql1 = `select users.id userid,users.name username,users.headimg userimg,comments.id comid,comments.fid,comments.time,comments.content from comments inner join users  on  comments.userid = users.id and fid = ${commentList.firstCom[key].comid} and comments.goodsid=?`
                commentList.firstCom[key].second = await app.mysql.query(sql1, [gid]);
                for (const twokey in commentList.firstCom[key].second) {//循环二级评论
                    let threeCom = [];
                    await GetThreecom(commentList.firstCom[key].second[twokey].comid)//递归三级评论
                    async function GetThreecom(id) {
                        const sql2 = `select users.id userid,users.name username,users.headimg userimg,comments.id comid,comments.fid,comments.time,comments.content from comments inner join users  on  comments.userid = users.id and fid = ${id} and comments.goodsid=?`
                        const result = await app.mysql.query(sql2, [gid]);
                        if (!result) return;
                        for (const item of result) {//三级评论里一条接着几条，再接不知道多少条所以这里递归。
                            threeCom.push(item);
                            await GetThreecom(item.comid);
                        }
                    }
                    commentList.firstCom[key].second[twokey].threeCom = threeCom;
                }

            }
            ctx.response.body = { state: 1, commentList }


        } catch (e) {
            console.log(e)
            this.ctx.response.body = { state: -1, commentList };
        }
    }


    // 增加一个评论
    async addComment() {
        try {
            let userid = this.getParams("uid");
            let goodsid = this.getParams("gid");
            let time = new Date();
            let content = this.getParams("sendcom");
            let fid = this.getParams('fid')
            // let fid = -1;
            const sql = "insert into comments(userid,fid,goodsid,time,content)value(?,?,?,?,?)";
            let res = await this.ctx.app.mysql.query(sql, [userid, fid, goodsid, time, content]);
            this.ctx.response.body = { state: res.affectedRows };
        } catch (e) {
            console.log(e);
            this.ctx.response.body = { state: -1 };
        }
    }
    // 删除评论
    async delComment() {
        try {
            let id = this.getParams("delId");

            const sql = "delete from comments where id=? ";
            let res = await this.ctx.app.mysql.query(sql, [id]);
            this.ctx.response.body = { state: res.affectedRows };
        } catch (e) {
            console.log(e);
            this.ctx.response.body = { state: -1 };
        }
    }
    // 追加评论
    async addComSon() {
        try {

        } catch (e) {
            console.log(e);
        }
    }



}
module.exports = GoodsController;