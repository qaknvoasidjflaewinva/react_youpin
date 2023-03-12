import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ThemeContext from '../../../tool/ThemeContext';
import axios from 'axios';
interface Newgoods {
    id: number,
    title: string,
    price: number,
    pimgs: string,
    classify: string,
    description: string,
    specification: any,
    dimg: any,
}

function GoodsMore() {
    const [allgoods, setAllgoods] = useState<any>(null);
    let navigate = useNavigate();
    useEffect(function () {
        //监听组件的加载完毕事件
        begin();
    }, [])

    async function begin() {

        let allgoods = await getAllgoods();
        setAllgoods(allgoods);
    }

    async function getAllgoods() {
        const url = "http://localhost:7001/getallgoods.do";
        let res = await axios.get(url);
        let data = res.data;
        if (data.state == 1) {
            return data.list;
        } else {
            throw new Error("异常")
        }
    }

    function gotogood(id: any) {
        navigate({ pathname: '/detail' }, { state: { id } });
        // eslint-disable-next-line no-restricted-globals
        location.reload()
        console.log(id);

    }

    function showgoods4() {
        if (allgoods) {
            let newslist = [...allgoods];
            let numArr = [];
            let arrLength = newslist.length;
            for (var i = 0; i < arrLength; i++) {
                //取出随机数 
                var number = Math.floor(Math.random() * newslist.length); //生成随机数num
                numArr.push(newslist[number]); //往新建的数组里面传入数值
                newslist.splice(number, 1); //传入一个删除一个，避免重复
                if (newslist.length <= arrLength - 12) {
                    break
                }
            }


            return (
                numArr.map((item: Newgoods, index: number) => {
                    return (
                        <div className='m-goods-container pro-item-category' key={item.id} onClick={gotogood.bind(null, item.id)}>
                            <div className='cate-img-container'>
                                <div className='img-containerx'>
                                    <img src={item.pimgs} alt="" />
                                </div>
                                {/* <p className='des-sm'>{item.description}</p> */}
                            </div>
                            <div className='category-box'>
                                <div className='m-g-c-t'>
                                    <img src="https://img.youpin.mi-img.com/tag/4167059a2a83e6dece26ebc1300abaf8.png?w=192&amp;h=42" className="common-tag2" alt="" />
                                    <img src="https://img.youpin.mi-img.com/new_gms/2c0523c5_8d73_4d0b_9004_7c0f7d78bff5.png" className="common-tag2" alt="" />
                                </div>
                                <p className='pro-info'>{item.title}</p>
                                <p className='pro-price'>
                                    <span className="pro-unit">¥</span>
                                    <span className="m-num">{item.price}</span>
                                    <span className="pro-flag">起</span>
                                </p>
                            </div>
                        </div>
                    )
                })


                // <div></div>
            );
        }
    }

    return (

        <div>

            <div className="goods_more">
                <p className='like_more'>
                    你可能还喜欢
                </p>
                {showgoods4()}
            </div>
        </div>
    )
}
export default GoodsMore;