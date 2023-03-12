const Service = require('egg').Service;

class Search extends Service {
    async searchByKey(key) {
        const sql = "SELECT * FROM goods where title like ? or description like ? or classify like ? order by goods.price desc";
        let list = await this.ctx.app.mysql.query(sql, [`%${key}%`, `%${key}%`, `%${key}%`]);
        if (list.length == 0) {
            return {
                code: 0,
                msg: "未找到相关信息"
            }
        } else {
            return {
                goodsList: list,
                count: list.length
            }
        }
    }
}

module.exports = Search;