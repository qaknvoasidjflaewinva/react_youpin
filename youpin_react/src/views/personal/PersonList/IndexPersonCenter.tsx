import { useNavigate, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import axios from "axios";

import "../../../css/personal/personlist.css"
import PerOrder from '../PersonList/PerOrder'
import AddressManagement from "../PersonList/AddressManagement";
import { Link } from 'react-router-dom';

function IndexPersonList({ setTitle, setTitle1 }: any) {
    const navigate = useNavigate();
    interface Pres {
        id: number,
        name: string,
        headimg: string
    }
    const [per, setPer] = useState<Pres>()
    let url = 'http://localhost:7001/getcars.do'
    const params = { userid: sessionStorage.getItem('id') }
    useEffect(() => {
        setTitle1('个人中心>')
        axios.post(url, params).then(res => {
            setPer(res.data[0])
        });
    }, [])
    function toOrder() {
        navigate({ pathname: '/Personal/orders' });
        setTitle('我的订单')
    }

    function toAddress() {
        navigate({ pathname: '/Personal/address' });
        setTitle('我的地址')
    }
    function show() {
        if (params.userid == undefined) {
            return (
                <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'absolute', top: '0', left: '0' }}>
                    <h1>你还未登陆</h1>
                    <Link to={'/'} style={{ color: 'black' }}>返回首页</Link>
                </div>
            )
        } else {
            return (
                <div className="center">
                    <div className="IndexPersonList">
                        <div className="perheadimg">
                            <img src={per?.headimg} style={{ width: '54px', height: '54px', margin: '0 auto 8px' }} alt="" />
                            {/* <div style={{ width: '54px', height: '54px', backgroundColor: 'red', margin: '0 auto 8px' }}>img</div> */}
                            {/* <img src="" alt="" /> */}
                            <div>{per?.name}</div>
                            <div>name</div>
                        </div>

                        <ul className='centerli'>
                            <li onClick={toOrder}>我的订单</li>
                            <li onClick={toAddress}>地址管理</li>
                        </ul>

                    </div>
                    <Routes>
                        <Route path="/orders" element={<PerOrder />} />
                        <Route path="/address" element={<AddressManagement />} />
                    </Routes>
                </div>
            )
        }
    }
    return (
        <>{show}</>
    )
}

export default IndexPersonList;