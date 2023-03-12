import { MinusOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space, message, Modal } from 'antd';
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'


function Car({ o, i, carList, handleChange, clist, qu }: any) {

    const [num1, setNum1] = useState<number>(o.goodsnum);
    const [sun, setSun] = useState<number>(o.price * o.goodsnum);
    const [f, seF] = useState<boolean>(clist[i]);

    useEffect(() => {
        seF(qu)
    },[qu])
    function addnum() {
        let n = num1 + 1;
        setSun(n * o.price)
        setNum1(n)
        let url = 'http://localhost:7001/upcarsnum.do'
        const params = { goodsnum: n, id: o.id }
        axios.post(url, params)
    }

    function reducenum() {
        let n = num1 - 1;
        if (n < 1) {
            setNum1(1)
            setSun(o.price)

        } else {
            setSun(n * o.price)
            setNum1(n)
            let url = 'http://localhost:7001/upcarsnum.do'
            const params = { goodsnum: n, id: o.id }
            axios.post(url, params)
        }
    }

    //删除
    function decar() {

        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title: '确定要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                let url = 'http://localhost:7001/decar.do'
                const params = { id: o.id }
                axios.post(url, params).then(res => {
                    if (res.data.affectedRows = 1) {
                        carList.splice(0)
                        message.info('删除成功');
                    }
                })

            },
        });
    }


    const selectBefore = () => {
        return (
            <Button type='link' size={'small'} className='btnj' onClick={reducenum} icon={<MinusOutlined />}></Button>
        )
    }
    const selectAfter = () => {
        return (
            <Button type='link' size={'small'} className='btnj' onClick={addnum} icon={<PlusOutlined />}></Button>
        )
    }

    function show() {
        // seF(clist[i])
        return (
            <>
                <li style={{ width: '50px' }} >
                    <input onChange={handleChange.bind(null, i, seF)} checked={f} type="checkbox" name='car' />
                </li>
                <li>
                    <img src={o.pimgs} style={{ width: '150px' }} />
                </li>
                <li style={{ width: '300px' }}>
                    <div style={{ marginBottom: '60px', marginTop: '10px' }}>{o.title}</div>
                    <div style={{ fontSize: '14px', color: ' #A3A8B0' }}>{o.specification}</div>
                </li>
                <li style={{ lineHeight: '150px' }}>￥{o.price}</li>
                <li style={{ width: '150px' }} className='num'>
                    <Space direction="vertical">
                        <InputNumber addonBefore={selectBefore()} addonAfter={selectAfter()} min={1} disabled keyboard={false} defaultValue={o.goodsnum} value={num1} className='inpN' />
                    </Space>
                </li>
                <li style={{ width: '150px', lineHeight: '150px' }}>￥{sun}</li>
                <li style={{ width: '150px', lineHeight: '150px' }} ><span onClick={decar} style={{ cursor: 'pointer' }}>删除</span></li>
            </>
        )
    }
    return (
        <>
            {show()}
        </>
    )
}
export default Car;