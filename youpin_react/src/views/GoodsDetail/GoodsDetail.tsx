import React from 'react';
import GoodsShop from './GoodsShop/GoodsShop';
import GoodsDetailImg from './GoodsShop/GoodsDetailImg'
import GoodsMore from './GoodsShop/GoodsMore'
import IndexNav from '../publicCom/Nav/IndexNav';
import IndexSearch from '../publicCom/Nav/IndexSearch';
import IndexFooter from '../publicCom/Footer/IndexFooter';


function GoodsDetail() {

    return (

        <div>
            {/* 商品内容区 */}
            <IndexNav />
            <IndexSearch />
            <div className="detail_container">

                <div className="container">


                    {/* 商品内容区 */}
                    <GoodsShop />

                    {/* 商品详细信息区 */}
                    <GoodsDetailImg />


                    {/* 商品区更多 */}
                    <GoodsMore />
                </div>
            </div>
            <IndexFooter />
        </div>
    )
}
export default GoodsDetail;