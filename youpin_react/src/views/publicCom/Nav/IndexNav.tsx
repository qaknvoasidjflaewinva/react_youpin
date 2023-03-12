import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css/Nav/nav.scss'

function IndexNav() {


    interface IUser {
        id: number,
        name: string | null,
        tel: string,
        headImg: string
    }

    const navigate = useNavigate();
    const [userID, setID] = useState<any>(null);
    const [userName, setName] = useState<any>(null)
    const [state, setState] = useState(false);
    const id: any = sessionStorage.getItem('id');

    let userInfo = useRef<IUser>();

    async function getCurrentUser(uid: number) {
        const url = 'http://localhost:7001/getCurrentUser'
        const params = { id: uid };
        const res = await axios.post(url, params)
        userInfo.current = {
            id: res.data.id,
            name: res.data.name,
            tel: res.data.tel,
            headImg: res.data.headImg
        }
        setName(userInfo.current.name ? userInfo.current.name : '用户' + (userInfo.current.tel).slice(7, 11))
        return userInfo.current
    }

    function hasLogin() {
        if (id != null) {
            setID(id)
            getCurrentUser(id);
        } else {
            setID(null)
        }

        if (userID != null) {
            setState(true);
        } else if (userID == null) {
            setState(false);
        }
    }

    const loginOut = () => {
        sessionStorage.removeItem('id')
        console.log(sessionStorage.getItem('id'));
    }

    useEffect(hasLogin, [userID, id]);

    return (
        <div className="nav">
            <div className="nav-bar" id='top'>
                <div className="f-r">
                    <div className="fl label" style={{ display: state ? 'none' : 'block' }}>
                        {/* <a href='#' onClick={goToLogin}>登录</a> */}
                        <Link to={{ pathname: `/login/1` }}>登录</Link>
                        &nbsp;
                        {/* <a href='#' onClick={goToRegister}>注册</a> */}
                        <Link to={{ pathname: `/login/2` }}>注册</Link>
                    </div>
                    <div className="fl label" style={{ display: state ? 'block' : 'none' }}>
                        <div className='user'>
                            <span className='head-img' style={{ backgroundImage: "url(	https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/7135279a-6d32-4d2c-ad12-5d380d7a6b67.jpg)" }}></span>
                            <span className='user-name'>{userName}</span>
                            <span className='down-more'>
                                <svg fill="#ccc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 22.5">
                                    <path d="M39.28.72h0a2.49,2.49,0,0,0-3.5,0L20,16.53,4.23.72A2.48,2.48,0,0,0,.72,4.23L18.24,21.78A2.48,2.48,0,0,0,20,22.5a2.52,2.52,0,0,0,1.77-.72L39.28,4.23A2.5,2.5,0,0,0,39.28.72Z"></path>
                                </svg>
                            </span>
                            <ul className='more'>
                                <a href=''><li>我的订单</li></a>
                                <a href=''><li>退款/售后</li></a>
                                <a href=''><li>我的资产</li></a>
                                <a href=''><li>我的收藏</li></a>
                                <a href=''><li>地址管理</li></a>
                                <a href=''><li onClick={loginOut}>退出登录</li></a>
                            </ul>
                        </div>
                    </div>
                    <span className='fl line'></span>
                    <div className="fl label">
                        <a href='#'>帮助中心</a>
                    </div>
                    <span className='fl line'></span>
                    <div className="fl label">
                        <a href='#'>
                            <span className='img-app'></span>下载APP
                        </a>
                    </div>
                    <span className='fl line'></span>
                    <div className="fl label info">
                        <a href='#'>资质证照 / 协议规则</a>
                        <span className='img-app down'></span>
                        <ul className='site-nav'>
                            <li>资质证照</li>
                            <li>资质证照</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='m-fixedBar'>
                <ul className='fixed-nav'>
                    <li>
                        <a className="m-icons m-icons- m-icons-service-fixed" data-src="" href="#!"></a>
                        <p className="text">联系客服</p>
                        <div className='fixed-pop fixed-service-pop'>
                            <div className='pop-inner'>
                                <p className="info-title">小米有品平台问题，建议反馈，商户和物流问题投诉等请拨打 小米有品客服热线</p>
                                <p className="info-phone">952899</p>
                                <p className="info-day">(周一至周日 8：00-22：00)</p>
                                <p className="info-des">小米/米家自营品牌，手机电视智能硬件商品或订单发货/退款售后问题 请拨打小米自营客服热线</p>
                                <p className="info-phone">400-100-5678</p>
                                <p className="info-day">(周一至周日 8：00-18：00)</p>
                            </div>
                            <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
                        </div>
                    </li>
                    <li>
                        <a className="m-icons m-icons- m-icons-download" data-src="" href="#!"></a>
                        <p className="text">下载 APP</p>
                        <div className='fixed-pop fixed-down-pop'>
                            <div className='pop-inner'>
                                <img className="qr-code" src="//cdn.cnbj1.fds.api.mi-img.com/youpin-pc/production/YouPin_PC/static3/media/code.fcced6cb.png" alt="qr-code"></img>
                                <p className="site-info">
                                    下载小米有品APP<br />
                                    得新人礼包
                                </p>
                            </div>
                            <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
                        </div>
                    </li>
                    <li>
                        <a className="m-icons m-icons- m-icons-gift" data-src="" href="#!"></a>
                        <p className="text">新人有礼</p>
                        <div className='fixed-pop fixed-gift-pop'>
                            <div className='pop-inner'>
                                <div className="gift-bg"></div>
                                <img className="qr-code" src="//cdn.cnbj1.fds.api.mi-img.com/youpin-pc/production/YouPin_PC/static3/media/code.fcced6cb.png" alt="qr-code"></img>
                                <p className="site-info">立即扫码下载·小米有品 APP</p>
                            </div>
                            <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
                        </div>
                    </li>
                    <li>
                        <a className="m-icons m-icons- m-icons-wx-chat" data-src="" href="#!"></a>
                        <p className="text">关注微信</p>
                        <div className='fixed-pop fixed-wx-pop'>
                            <div className='pop-inner'>
                                <img className="qr-code" src="//cdn.cnbj1.fds.api.mi-img.com/youpin-pc/production/YouPin_PC/static3/media/wx_code.52bcbea0.png" alt="qr-code"></img>
                                <p className="site-info">扫码关注「小米有品」微信服务号，签到积分赢大奖</p>
                            </div>
                            <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
                        </div>
                    </li>
                    <li style={{ borderBottom: "none" }}>
                        <a className="m-icons m-icons- m-icons-top" data-src="" href="#!"></a>
                        <p className="text">回到顶部</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default IndexNav;