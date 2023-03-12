import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ThemeContext from '../../../tool/ThemeContext';
import axios from 'axios';

interface IGoodsImgs {
    id: number,
    gid: number,
    imgsrc: string,
    cate: number
};

function GoodsImg() {
    let goodsImgs = useContext(ThemeContext);

    // 渲染商品细节图
    function rendergoodsimg() {

        return (
            goodsImgs.goodsImgs.map((item: IGoodsImgs, index: number) => {
                if (item.cate === 1) {
                    return (
                        <div key={item.id}>
                            <img src={(item.imgsrc)} alt="" />
                        </div>
                    )
                }
            })

        );
    };

    return (

        <div>
            {/* 商品内容区 */}
            <div className="renderImg">
                {rendergoodsimg()}
            </div>
        </div>
    )
}
export default GoodsImg;