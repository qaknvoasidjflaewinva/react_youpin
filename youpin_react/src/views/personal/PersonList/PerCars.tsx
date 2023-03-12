import { useEffect, useState } from 'react'
import axios from 'axios'
import Car from './Car';
import { Button } from 'antd';


function PerCars({ setTitle, setTitle1 }: any) {
    interface cars {
        id: number,
        title: string,
        specification: string,
        price: number,
        pimgs: string,
        goodsnum: number,
        goodsid: number
    }
    const [carLists, setCarList] = useState<cars[]>([]);
    const [de, setDe] = useState<number>(carLists.length);
    const [n, setN] = useState<number>(carLists.length);
    const [qu, setQu] = useState<boolean>(false);
    const [clist, setClist] = useState<boolean[]>([]);
    const [sn, setSn] = useState<number>(0);
    const [toal, setToal] = useState<number>(0);


    let url = 'http://localhost:7001/getcars.do'
    const params = { userid: 1 }


    useEffect(function () {
        setTitle('')
        setTitle1("购物车")
        CarsList()
        begin()
        axios.get(url, { params }).then(res => {
            setCarList(res.data)
            setN(res.data.length)
        });
    }, [de, n])

    const CarsList = () => {
        if (carLists == undefined || carLists.length == 0) {

            return (
                <div style={{ position: 'relative', left: '520px', width: '300px' }}>
                    <div style={{ width: '300px', margin: '180px auto 30px', fontSize: "30px", color: '#CACACA' }}>购物车还是空的</div>
                    <Button href='/Personal' style={{ marginLeft: '50px' }}>去逛逛吧</Button>
                </div>
            )
        } else {
            if (clist.length > 0) {
                return (
                    carLists.map((o: any, i: number) => {
                        return (
                            <ul key={o + i} className='cartile' style={{ height: '150px', borderTop: '1px solid #e7e7e7 ', padding: '20px 0 5px' }}>
                                <Car o={o} i={i} carList={carLists} handleChange={handleChange} clist={clist} qu={qu} />
                            </ul>
                        )
                    })
                )
            }
        }
    }

    //多选


    function begin() {
        setClist([...Array.from({ length: n }, () => (false))])
    }

    function handleChange(index: number, f: any) {
        let flag = true
        clist[index] = !clist[index]
        setClist(clist)
        f(clist[index])
        clist?.forEach((tf) => {
            if (!tf) {
                flag = false
            }
        })
        setQu(flag)
        sc()
    }
    function sc() {
        let n = 0
        let toal = 0
        clist?.forEach((tf, i) => {
            if (tf) {
                n++;
                toal += carLists[i].price * carLists[i].goodsnum
            }
        })
        setSn(n)
        setToal(toal)
    }


    //全选
    function Qux() {

        setQu(!qu)
        if (!qu) {
            for (let i = 0; i < clist.length; i++) {
                clist[i] = true
            }
        } else {
            for (let i = 0; i < clist.length; i++) {
                clist[i] = false
            }
        }
        sc()
    }



    return (
        <div style={{ minWidth: '1200px' }}>
            <ul className='cartile'>
                <li style={{ width: '30px' }}><input type="checkbox" onChange={Qux} checked={qu} name='car' /></li>
                <li>全选</li>
                <li style={{ width: '320px' }}>商品信息</li>
                <li>单价</li>
                <li style={{ width: '150px' }}>数量</li>
                <li style={{ width: '150px' }}>金额</li>
                <li style={{ width: '50px' }}>操作</li>
            </ul>
            {CarsList()}
            <div className='sun'>
                <div>
                    <input type="checkbox" name='car' checked={qu} onChange={Qux} />
                    <h1>全选</h1>

                    <span style={{ fontSize: '18px' }}>已选{sn}件</span>
                </div>
                <div>
                    <div style={{ fontSize: '18px' }}>合计</div>
                    <div style={{ fontSize: '18px' }}>￥{toal}</div>
                    <button style={{ fontSize: '30px', marginRight: '130px' }}>结算</button>
                </div>
            </div>
        </div>
    )
}
export default PerCars;