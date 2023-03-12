import { useEffect, useState, Fragment } from 'react'
import { MinusOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import axios from "axios";

function AddAddress({ setNo }: any) {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [isDefault, setDef] = useState<number>(0)

    function ono() {
        setNo('none')
    }

    function isD(e: any) {
        if (e.target.checked) {
            setDef(1)
        } else {
            setDef(0)
        }
    }

    //保存
    function save() {
        if (name == '' || phone == '' || address == '') {
            Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                title: '对不起，请填写完整',
                okText: '确认',
                cancelText: '取消',
            })
        } else {
            let url = 'http://localhost:7001/addAddress.do'
            const params = { userid: sessionStorage.getItem('id'), name: name, phone: phone, address: address ,isDefault}
            axios.post(url, params).then(res => {
                console.log(res.data);
                message.info('保存成功');

            });
        }
    }
    return (
        <Fragment>
            <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(125,125,125,0.3)' }}>
                <div style={{ margin: '0 auto', width: '603px', backgroundColor: '#fff', position: 'relative', top: '50px' }}>
                    <div style={{ height: '30px', width: '100%' }} className='Addadtitle'>
                        <div>添加收货地址</div>
                        <svg onClick={ono} style={{ width: '20px' }} fill="#ccc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M32.5.68,18,15.17,3.5.68A2,2,0,0,0,.68,3.5L15.17,18,.68,32.5A2,2,0,0,0,3.5,35.32L18,20.83,32.5,35.32a2,2,0,0,0,2.82-2.82L20.83,18,35.32,3.5A2,2,0,0,0,32.5.68Z"></path></svg>
                    </div>
                    <div className="lines"></div>
                    <div className="input_box">
                        <div >
                            <span>姓名:</span>
                            <input type="text" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        </div>
                        <div >
                            <span>电话:</span>
                            <input type="text" value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }} />
                        </div>
                        <div>
                            <span>地址:</span>
                            <input type="text" value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} />
                        </div>
                        <div style={{ width: '200px' }}>
                            <input type='checkbox' onChange={isD} />
                            设为默认
                        </div>
                        <Button onClick={save} >保存</Button>
                        <Button onClick={ono}>取消</Button>
                    </div>





                </div>
            </div>
        </Fragment>

    )
}
export default AddAddress;