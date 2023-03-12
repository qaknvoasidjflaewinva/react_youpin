import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeContext from '../tool/ThemeContext';
import Classify from '../views/homepage/pages/Classify';
import IndexLogin from '../views/login/IndexLogin';
import Main from '../views/Main';
import IndexFooter from '../views/publicCom/Footer/IndexFooter';
import LoginFilter from '../tool/LoginFilter';
import SearchResult from '../views/SearchResult/SearchResult';

import React, { useState, useContext } from 'react';
import GoodsDetail from '../views/GoodsDetail/GoodsDetail';
import IndexPersonal from '../views/personal/IndexPersonal.tsx';
interface IGoodsImgs {
    id: number,
    gid: number,
    imgsrc: string,
    cate: number
};

function IndexRouterFilter() {
    let [goodsImgs, setGoodsImgs] = useState<IGoodsImgs[]>([]);
    let [goodsTab, setGoodsTab] = useState<string>('goodsDetail');
    return (
        /*       <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Main />} />
                      <Route path="/login/:param" element={<IndexLogin />} />
                      <Route path="/result" element={<SearchResult />} />   
                      <Route path="/classify" element={<Classify />} />   
                  </Routes>
              </BrowserRouter> */


        <ThemeContext.Provider value={{ goodsImgs, setGoodsImgs, goodsTab, setGoodsTab }}>
            <BrowserRouter>
                <Routes>
                    {/* <Route path='/' element={<LoginFilter>< GoodsDetail /></LoginFilter>} /> */}
                    <Route path="/" element={<Main />} />
                    <Route path="/login/:param" element={<IndexLogin />} />
                    <Route path="/result" element={<SearchResult />} />
                    <Route path="/classify" element={<Classify />} />
                    <Route path='/detail' element={< GoodsDetail />} />
                    <Route path='/publish' element={<LoginFilter></LoginFilter>} />
                    <Route path='/Personal/*' element={<IndexPersonal />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}
export default IndexRouterFilter;