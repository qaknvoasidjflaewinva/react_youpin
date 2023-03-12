import { Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";

import IndexPersonList from "./PersonList/IndexPersonCenter";
import PerCars from './PersonList/PerCars';
import IndexNav from '../publicCom/Nav/IndexNav';
import IndexFooter from '../publicCom/Footer/IndexFooter';

function IndexPersonal() {
    // const navigate = useNavigate();

    const [str, setStr] = useState<string>('我的订单');
    const [str1, setStr1] = useState<string>('个人中心>');
    const params = { userid: sessionStorage.getItem('id') }
    console.log(params);


    function show() {
        if (params.userid == null) {
            return (
                <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'absolute', top: '0', left: '0' }}>
                    <h1>你还未登陆</h1>
                    <Link to={'/'} style={{color:'black'}} >返回首页</Link>
                </div>
            )
        } else {
            return (
                <>
                    <IndexNav />
                    <div style={{ fontSize: '14px', marginBottom: '10px', margin: '30px 10px' }}>
                        <Link to={'/'} style={{ color: 'black' }}>首页&gt;</Link>
                        <span>{str1}</span>
                        <span>{str}</span>
                    </div>
                    <div style={{ margin: '5px 0 30px' }}>
                        <Routes>
                            <Route path="/*" element={<IndexPersonList setTitle={setStr} setTitle1={setStr1} />} />
                            <Route path="/cars" element={<PerCars setTitle={setStr} setTitle1={setStr1} />} />
                        </Routes>
                    </div>
                    <IndexFooter />
                </>
            )
        }
    }
    return (

        <div>
            { show()}
        </div>
    )
}

export default IndexPersonal;