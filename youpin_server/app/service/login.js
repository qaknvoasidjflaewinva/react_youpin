const Service = require('egg').Service;

class Login extends Service {
    async login(tel_num, password) {
        const sql = "select * from users where phone=?";
        let list = await this.ctx.app.mysql.query(sql, tel_num);
        if (list.length == 0) {
            return {
                code: 0,
                msg: "该用户不存在"
            }
        } else {
            if (list[0].pwd != password) {
                return {
                    code: 1,
                    msg: "密码错误"
                }
            } else {
                return {
                    code: 2,
                    msg: "登录成功",
                    id: list[0].id,
                    tel_num: list[0].phone
                }
            }
        }
    }

    async getCurrentUser(id) {
        const sql = "select * from users where id= ?";
        let list = await this.ctx.app.mysql.query(sql, id);
        console.log(list);
        return {
            id: list[0].id,
            name: list[0].name,
            tel: list[0].phone,
            headImg: list[0].headimg
        };
    }
}

module.exports = Login;