const Service = require('egg').Service;

class Register extends Service {
    async register(tel_num, password) {
        if (tel_num && password) {
            const sql = "SELECT * FROM users WHERE phone=?";
            let list = await this.ctx.app.mysql.query(sql, tel_num);
            if (list.length == 0) {
                const insql = "insert into users(phone,pwd) values(?,?)";
                let registerList = await this.ctx.app.mysql.query(insql, [tel_num, password]);
                const sesql = "SELECT * FROM users WHERE phone=?";
                let loginResult = await this.ctx.app.mysql.query(sesql, tel_num);
                console.log(loginResult);
                if (registerList.affectedRows) {
                    return {
                        code: 0,
                        msg: "注册成功",
                        id: loginResult[0].id,
                        tel_num: loginResult[0].phone,
                    }
                }

            } else {
                return {
                    code: 1,
                    msg: "注册失败，用户已存在！"
                }
            }
        } else {
            return {
                code: 2,
                msg: "注册失败，姓名，邮箱和密码都不能为空！"
            }
        }
    }
}

module.exports = Register;