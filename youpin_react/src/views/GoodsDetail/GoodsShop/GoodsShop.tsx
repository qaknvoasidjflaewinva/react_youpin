import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeContext from '../../../tool/ThemeContext';
import axios from 'axios';
import { message, Input, Button } from 'antd';

interface IGoods {
    id: number,
    title: string,
    price: number,
    description: string,
    pimgs: string,
    specification: string,
    address: string
};
interface IGoodsImgs {
    id: number,
    gid: number,
    imgsrc: string,
    cate: number
};

function GoodsShop() {
    const [count, setCount] = useState<number>(1);
    const [goods, setGoods] = useState<IGoods | null>(null);
    const [goodsclickimg, setGoodsclickimg] = useState<string>('');
    let { goodsImgs, setGoodsImgs } = useContext(ThemeContext);
    const [spearr, setSpeArr] = useState<string[]>([]);
    const [spe, setSpe] = useState<string>('');
    const [con, setCon] = useState<number>();
    const location = useLocation();

    const gid = (location.state.id as number);
    const uid = sessionStorage.getItem('id');
    useEffect(function () {
        begin();
    }, []);

    async function begin() {
        try {
            //axios发送ajax请求，得到商品的详情和图片
            let goods = await getGoodsById();
            let address = await goodsAddress();
            let goodsA = { ...goods, ...address }


            //通过详情修改状态
            setGoods(goodsA);

            // 获取商品图片
            let list = await getGoodsImgsById();
            //修改状态的值为取到的商品图片
            setGoodsImgs(list);

            // 设置商品大图
            setGoodsclickimg(goods.pimgs)

            // 获取所有商品规格
            setSpeArr(goods?.specification.split('；'))

            // 获取所选商品规格
            setSpe(goods?.specification.split('；')[0])

            // 检查所选商品是否在购物车内
            let con2 = await checkedAdd();
            setCon(con2)

        } catch (e) {
            console.log(e);
        }
    }
    // 获取商品详情
    async function getGoodsById() {
        const url = "http://localhost:7001/getGoodsById.do";
        let res = await axios.get(url, { params: { gid } });
        let data = res.data;
        if (data.state === 1) {
            let goods = data.list[0];
            return goods;
        } else {
            throw new Error("异常")
        }
    }

    // 获取商品图片
    async function getGoodsImgsById() {
        const url = "http://localhost:7001/getGoodsImgById.do";
        let res = await axios.get(url, { params: { gid } });
        let data = res.data;
        if (data.state === 1) {
            let goodsimgs = data.list;
            return goodsimgs;
        } else {
            throw new Error("异常")
        }
    }

    // 点击细节图片 左边显示大图片
    function clickImg(e: any) {
        setGoodsclickimg(e.target.src);
    }

    // 渲染商品细节图 点击图片加边框
    function rendergoodsimg() {
        return (
            goodsImgs.map((item: IGoodsImgs, index: number) => {
                if (item.cate === 0) {
                    return (
                        <div key={item.id} className='goodsimgbox' onClick={clickImg}>
                            <img src={(item.imgsrc)} className={goodsclickimg === item.imgsrc ? "borderActive" : ""} alt="" />
                        </div>
                    )
                }
            })
        );
    };

    // 点击规格 获取并存值
    async function clickSpe(e: any) {
        setSpe(e.target.innerHTML);
        let con = await checkedAdd();
        console.log(con);

        setCon(con)
    }


    //  购买数量 减
    const reduce = (
        <button className='numbtn' onClick={() => {
            if (count > 1) {
                setCount(count - 1)
            } else {
                message.info('到底啦！');
            }
        }}> - </button>
    );
    // 购买 加数量
    const add = (
        <div className='numbtn' onClick={() => { setCount(count + 1) }}> + </div>
    );


    // 检查购物车内是否存在商品
    async function checkedAdd() {
        console.log(uid, gid, typeof spe);

        let res = await axios.get("http://localhost:7001/checkedAdd.do", { params: { uid, gid, spe } });
        let data = res.data;//{state:1, flag:0}, {state:1, flag:1}, {state:-1}
        console.log(data);


        if (data.state == 1) {
            return data.flag;
        } else {
            throw new Error("异常")
        }
    }

    // 购物车添加 更新
    async function addOrUpdate() {
        if (uid != undefined) {
            let con1 = await checkedAdd();
            setCon(con1);

            try {
                console.log(uid, gid, count, spe, con);


                let res = await axios.post("http://localhost:7001/addOrUpdate.do", { uid, gid, count, spe, con });
                let data = res.data;

                if (data.state === 1) {
                    message.success("成功加入购物车")
                    console.log(data);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            message.info("请先登录！")
        }

    }


    // 渲染商品规格
    function renderSpe() {

        return (
            spearr.map((item: string, index: number) => {
                if (item) {
                    return (
                        <button
                            key={index}
                            className={spe === item ? "borderActive" : ""}
                        >{item}</button>
                    )
                }
            })
        );
    };

    // 获取商品默认发货地址
    async function goodsAddress() {
        const url = "http://localhost:7001/getGoodsAddressById.do";
        let res = await axios.get(url, { params: { uid } });
        let data = res.data;
        if (data.state === 1) {
            let address = data.list[0];
            return address;
        } else {
            throw new Error("异常")
        }
    }

    return (
        <div>
            {/* 商品内容区 */}
            <div className="goods_top">
                {/* 商品图片 */}
                <div className="goods_pic">
                    <div className="big_pic">
                        <img src={goodsclickimg} alt="" />
                    </div>
                    <div className="small_pic" >
                        {rendergoodsimg()}
                    </div>
                </div>

                {/* 商品购买详情 */}
                <div className="goods_shop">
                    <h3 className='goods_title'>{goods?.title} </h3>
                    <div className="goods_desc">
                        {goods?.description}
                    </div>

                    <div className="goods_price">
                        <h5 className='buy_title'>售价</h5>
                        <div className="price">
                            <span className="money_symbol">¥</span>
                            <span className="value">{goods?.price} </span>
                        </div>
                    </div>

                    <div className="nav_g address">
                        <span className='buy_title'>配送区域</span>
                        <span className="value">{goods?.address}</span>
                    </div>


                    {spearr.length
                        ? (<div className="nav_g specification">
                            <span className='buy_title'>规格</span>
                            <div className="tag" onClick={clickSpe}>
                                {renderSpe()}
                            </div>
                        </div>)
                        : ''
                    }


                    <div className="nav_g shop_num">
                        <span className="buy_title">数量</span>
                        <div className="buy_num">
                            <Input addonBefore={reduce} addonAfter={add} value={count} className='num_button' />
                        </div>
                    </div>

                    <div className="buy">
                        <Button className='add_cart' onClick={addOrUpdate}>加入购物车</Button>
                        {/* <Button className='buy_now'>立即购买</Button> */}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default GoodsShop;