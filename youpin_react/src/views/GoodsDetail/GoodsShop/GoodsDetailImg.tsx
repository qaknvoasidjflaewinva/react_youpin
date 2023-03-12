import React, { useEffect, useState, useContext } from 'react';
import ThemeContext from '../../../tool/ThemeContext';
import axios from 'axios';
import GoodsImg from './GoodsImg';
import GoodsComment from './GoodsComment'
import GoodsQuestion from './GoodsQuestion'
import GoodsTabs from './GoodsTabs'




function GoodsShop() {
    let goodsTab = useContext(ThemeContext);
    return (
        <div >
            <div className="goodsDetailImg">
                <GoodsTabs />
                {goodsTab.goodsTab === "goodsDetail" ? <GoodsImg /> : null}
                {goodsTab.goodsTab === "comment" ? <GoodsComment /> : null}
                {goodsTab.goodsTab === "question" ? <GoodsQuestion /> : null}
            </div>
        </div>
    )
}
export default GoodsShop;