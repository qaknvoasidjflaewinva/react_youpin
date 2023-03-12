import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import IndexNav from '../../publicCom/Nav/IndexNav';
import IndexFooter from '../../publicCom/Footer/IndexFooter';
import IndexSearch from '../../publicCom/Nav/IndexSearch';
import axios from 'axios';
import {
  RightOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import "../css/classify.css";

interface Newgoods {
  id: number,
  title: string,
  price: number,
  pimgs: string,
  classify: any,
  description: string,
  specification: any,
  dimg: any,
}

function Classify() {
  const [allgoods, setAllgoods] = useState<any>(null);
  const [ismethod, setIsmethod] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate()
  //得到值要类型断言
  let v = location.state as any;

  useEffect(function () {
    //监听组件的加载完毕事件
    if (ismethod) {
      begin();
    } else {
      begin2();
    }
  }, [ismethod])

  async function begin() {

    let allgoods = await getAllgoodsbyclass();
    setAllgoods(allgoods);
    console.log(allgoods);
  }

  async function begin2() {

    let allgoods = await getAllgoodsbyprice();
    setAllgoods(allgoods);

  }
  function gotogood(id: any) {
    navigate({ pathname: '/detail' }, { state: { id } });
    console.log(id);

  }

  async function getAllgoodsbyclass() {
    let classx = v.class;
    let name = v.name;

    const url = "http://localhost:7001/getallgoodsbyclass.do";
    let res = await axios.get(url, { params: { name, classx } });
    let data = res.data;
    if (data.state == 1) {
      return data.list;
    } else {
      throw new Error("异常")
    }
  }

  async function getAllgoodsbyprice() {
    let classx = v.class;
    let name = v.name;
    const url = "http://localhost:7001/getallgoodsbyprice.do";
    let res = await axios.get(url, { params: { name, classx } });
    let data = res.data;
    if (data.state == 1) {
      return data.list;
    } else {
      throw new Error("异常")
    }
  }

  function showgoods4() {


    if (allgoods) {
      return (
        allgoods.map((item: Newgoods, index: number) => {
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

  function secletlen() {
    if (allgoods) {
      return allgoods.length
    }
  }

  return (
    <div>
      <IndexNav />
      <IndexSearch />
      <div className='h-cat-sec' style={{ minHeight: '76.5vh' }}>
        <div className='container-c'>
          <div className='search-tit'>为您找到{secletlen()}条结果 </div>
          <div className='sort-group'>
            <div className='sort-outer'>
              <div className='sort-button-wrap' onClick={() => setIsmethod(true)}>综合</div>
              <span className='sort-line'>|</span>
            </div>
            <div className='sort-outer'>
              <div className='sort-button-wrap' onClick={() => setIsmethod(false)}>价格</div>
              <img className="sort-price-arrow " src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAZCAYAAAABmx/yAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAADTSURBVDiN7ZAxbsJAEEXfbCw3HAC5TmtZ8o47CrocgYuQPqRObhDBPeho6NjtEBW1xQGSdtKYRFpskSKlf7V689/uamAgqrpU1eXQ/KEPeu8XIvIBPBVFcWrb9ph2JAV1XTfOuR0w6dCnmc1jjGFQVNVHYA9Mk/suwCyEcL4Cdz2UZTkFtj0SHdt2nd8Xq6qa5Hm+M7OmR/qJmR1EZB5C+HIAWZat70kAItKY2QZAVPUNeL4nJXm/2SqA934lIi/d915jjKu0426sP2YUR3EU/138BvNZOGcgafR+AAAAAElFTkSuQmCC'} />
            </div>
          </div>
          <div className='m-product-list'>
            {showgoods4()}
          </div>
        </div>
      </div>
      <IndexFooter />
    </div>

  )
}

export default Classify