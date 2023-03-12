import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Per() {
    interface orders {
        id: number,
        title: string,
        specification: string
        num: number,
        time: string,
        total: number,
        goodsid: number
        addressid: number
    }
    const [orderList, setOrderList] = useState<orders[]>();

    let url = 'http://localhost:7001/getorder.do'
    const params = { userid: sessionStorage.getItem('id') }
    
    useEffect(() => {
        const promise = axios.get(url, { params }).then(res => {
            setOrderList(res.data)
        });
    }, [])



    function order() {
        if (params.userid == undefined || orderList == undefined) {
            return (
                <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'absolute', top: '0',left:'0' }}>
                    <h1>你还未登陆</h1>
                    <Link to={'/'}>返回首页</Link>
                </div>
            )
        } else {
            return (
                orderList.map((o, n) => {
                    let year = o.time.substring(0, 10)
                    // let time = o.time.substring(11, 19)
                    return (
                        <div key={o.id} className='orderList' style={{ display: 'flex', flexWrap: 'nowrap', marginTop: '20px' }}>
                            <div>{o.title}</div>
                            <div>{o.specification}</div>
                            <div>{o.num}</div>
                            <div>{year}</div>
                            <div>{o.total}</div>
                            {/* <button className='obtng' onClick={addGoods.bind(null, o)}>再次加入购物车</button> */}
                            <button className='obtng' onClick={deleteo.bind(null, o)}>删除</button>
                        </div>
                    )
                })
            )
        }

    }

    function addGoods(order: orders) {
        let url = 'http://localhost:7001/addOrUpdate.do'
        const params = { userid: 1, goodsid: order.goodsid, specification: order.specification }
        const promise = axios.post(url, params).then(res => {
            if (res.data.affectedRows = 1) {
                // navigate({ pathname: '/cars' });
                console.log(res.data);

            }
        });
    }

    function deleteo(order: orders) {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title: '确定要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                let url = 'http://localhost:7001/deleteorder.do'
                const params = { id: order.id }
                const promise = axios.post(url, params).then(res => {
                    if (res.data.affectedRows = 1) {
                        message.info('删除成功');
                        setOrderList([])
                    }
                });

            },
        });


    }
    return (
        <div style={{ minWidth: '1000px' }}>
            <div className='orderList' style={{ display: 'flex', flexWrap: 'nowrap', marginTop: '20px', borderBottom: '1px solid #e7e7e7' }}>
                <div>标题</div>
                <div>规格</div>
                <div>数量</div>
                <div>时间</div>
                <div>总价</div>
                <div style={{ width: '200px' }}>操作</div>
            </div>
            <div>
                {order()}
            </div>
        </div>
    )
}

export default Per;