import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

import axios from 'axios';
import {
  RightOutlined
} from '@ant-design/icons';
// import Carousel from 'antd/lib';
import "../css/indexhtml.css";


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
function Indexhtml() {
  const [newgood, setNewgood] = useState<any>(null);
  const [timegood, setTimegood] = useState<any>(null);
  const [allgoods, setAllgoods] = useState<any>(null);
  const [n, setN] = useState<number>(0);
  const [p, setP] = useState<number>(0);
  const [x, setX] = useState<number>(271.25);
  let navigate = useNavigate();
  useEffect(function () {
    //监听组件的加载完毕事件
    begin();
  }, [])

  async function begin() {
    let newgood = await getScenics();
    setNewgood(newgood);

    let timegood = await getTimegood();
    setTimegood(timegood);

    let allgoods = await getAllgoods();
    setAllgoods(allgoods);
  }


  async function getScenics() {
    const url = "http://localhost:7001/getgoodsBynew.do";
    let res = await axios.get(url);
    let data = res.data;
    if (data.state == 1) {
      return data.list;
    } else {
      throw new Error("异常")
    }
  }

  async function getTimegood() {
    const url = "http://localhost:7001/getgoodsBytime.do";
    let res = await axios.get(url);
    let data = res.data;
    if (data.state == 1) {
      return data.list;
    } else {
      throw new Error("异常")
    }
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

  function gotopae(name: any) {
    navigate({ pathname: '/classify' }, { state: { name, class: 1 } });
  }

  function gotopae2(e: any) {
    console.log(e.target.innerHTML)
    let key = e.target.innerHTML
    // console.log(name);

    navigate({ pathname: '/result' }, { state: key });;

  }
  function gotogood(id: any) {
    navigate({ pathname: '/detail' }, { state: { id } });
    console.log(id);

  }

  function next() {

    let q = timegood.length as number
    if (n >= 0 && n < q - 4) {
      setN(n + 1)
    }


  }
  function prev() {

    let q = timegood.length as number

    if (n > 0 && n <= q - 4) {
      setN(n - 1)
    }

  }

  function next2() {

    let q = newgood.length as number
    if (p >= 0 && p < q - 4) {
      setP(p + 1)
    }


  }
  function prev2() {

    let q = newgood.length as number

    if (p > 0 && p <= q - 4) {
      setP(p - 1)
    }

  }

  function showgoods() {
    if (newgood) {
      return (
        newgood.map((item: any, index: any) => {
          return (
            <div key={item.id} className='swiper-slide' onClick={gotogood.bind(null, item.id)}>
              <div className='m-goods-item-container'>
                <div className='small-item-img'>
                  <div className='m-image-c'>
                    <div className='img-container'>
                      <img src={item.pimgs} style={{ width: '266px', height: '266px' }} />
                    </div>
                  </div>
                </div>
                <div className='m-goods-common-box'>
                  <p className='pro-info'>{item.title}</p>
                  <p className='pro-desc'>{item.description}</p>
                  <p className='pro-price'>
                    <span className='pro-unit'>￥</span>
                    <span className='m-num'>{item.price}</span>
                    <span className='pro-flag'>起</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })


        // <div></div>
      );
    }
  }

  function showgoods2() {
    if (timegood) {
      return (
        timegood.map((item: Newgoods, index: number) => {
          return (

            <div key={item.id} className='swiper-slide' onClick={gotogood.bind(null, item.id)}>
              <div className='m-goods-item-container'>
                <div className='small-item-img'>
                  <div className='m-image-c'>
                    <div className='img-container'>
                      <img src={item.pimgs} style={{ width: '266px', height: '266px' }} />
                    </div>
                  </div>
                </div>
                <div className='bigtrip-box'>
                  <p className='pro-info'>{item.title}</p>
                  <p className='pro-desc'>{item.description}</p>
                  <p className='pro-price'>
                    <span className='pro-unit'>￥</span>
                    <span className='m-num'>{item.price}</span>
                    <span className='pro-flag'>起</span>
                  </p>
                </div>
              </div>

            </div>

          )

        })


        // <div></div>
      );
    }
  }

  function showgoods3() {
    if (timegood) {
      return (
        timegood.map((item: Newgoods, index: number) => {
          return (
            <div key={item.id} className='swiper-slide  bigbox' onClick={gotogood.bind(null, item.id)}>
              <div className='item-pos'>
                <div className='item-inner'>
                  <img src={item.pimgs} className='pro-img' />
                  <div className='pro-text'>
                    <p className='pro-info'>{item.title}</p>
                    <p className='pro-price'>
                      <span className="tag">¥</span>
                      <span>{item.price}</span>
                      <span className="pro-flag">起</span>
                    </p>
                  </div>
                </div>
                <div className='m-progress'>
                  <div className='m-bar-con'></div>
                  <div className='m-info-small'>
                    <div className='m-suppory'>
                      <span>778</span>
                      人支持
                    </div>
                    <span className='tag-f1'>
                      <span className="common-tag common-tag-text" style={{ backgroundColor: 'rgb(249,135,0)' }} >火</span>
                    </span>
                    <div className='fr m-per'>
                      <div><span className="m-num">458</span><span className="m-num-flag">%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })

        // <div></div>
      );
    }
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
    <div style={{ margin: 'auto' }}>
      {/* <div className='scroll-container'>
                <div className='text-scroll'>
                    <div className='tltle-container'>
                        <img src={require('../img/喇叭.png')} alt="" className='icon'/>
                        <span className='title'>质量公告：</span>
                    </div>
                    
                    <p className='sco'>
                    <a className="item" href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=2rj1ao">广东博奥康医疗科技有限公司对一次性使用医用口罩主动召回</a>
                    <a className="item" href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=3kjsrx">济南鑫驰医疗科技有限公司对医用外科口罩主动召回</a>
                    </p>
                </div>
            </div> */}

      <div className='banner-nav'>
        <div className='nav-container'>
          <ul className='nav-list'>
            <li className='nav-itme'>
              <span className='nav-item-span'>手机数码</span>
              <span>/</span>
              <span className='nav-item-span'>电脑办公</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>手机数码</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>小米手机 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>Note</div>
                        <div className='category-3-item' onClick={gotopae2}>K</div>
                        <div className='category-3-item' onClick={gotopae2}>红米</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>游戏手机</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>黑鲨4</div>
                        <div className='category-3-item' onClick={gotopae2}>黑鲨5</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>电脑办公</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>电脑 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>台式</div>
                        <div className='category-3-item' onClick={gotopae2}>笔记本</div>
                        <div className='category-3-item' onClick={gotopae2}>平板</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>办公设备</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>打印机</div>
                        <div className='category-3-item' onClick={gotopae2}>扫描仪</div>
                        <div className='category-3-item' onClick={gotopae2}>路由器</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>大家电</span>
              <span>/</span>
              <span className='nav-item-span'>小家电</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>大家电</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>厨电 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>消毒柜</div>
                        <div className='category-3-item' onClick={gotopae2}>洗碗机</div>
                        <div className='category-3-item' onClick={gotopae2}>水槽</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>空调</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>柜式空调</div>
                        <div className='category-3-item' onClick={gotopae2}>壁挂空调</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>小家电</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>洗护工具 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>剃须刀</div>
                        <div className='category-3-item' onClick={gotopae2}>吹风机</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>口腔清洁</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>牙刷</div>
                        <div className='category-3-item' onClick={gotopae2}>口腔护理</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>美食饮酒</span>
              <span>/</span>
              <span className='nav-item-span'>出行车品</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>美食饮酒</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>食品 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae.bind(null, "水果")}>水果</div>
                        <div className='category-3-item' onClick={gotopae.bind(null, "零食")}>零食</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>酒水</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>白酒</div>
                        <div className='category-3-item' onClick={gotopae2}>啤酒</div>
                        <div className='category-3-item' onClick={gotopae2}>葡萄酒</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>出行车品</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>骑行 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>电动车</div>
                        <div className='category-3-item' onClick={gotopae2}>自行车</div>
                        <div className='category-3-item' onClick={gotopae2}>摩托车</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>汽车装饰</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>坐垫</div>
                        <div className='category-3-item' onClick={gotopae2}>脚垫</div>
                        <div className='category-3-item' onClick={gotopae2}>停车牌</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>运动户外</span>
              <span>/</span>
              <span className='nav-item-span'>医疗健康</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>运动户外</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>有氧燃脂 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>跑步机</div>
                        <div className='category-3-item' onClick={gotopae2}>蹦床</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>体育用具</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>羽毛球</div>
                        <div className='category-3-item' onClick={gotopae2}>乒乓球</div>
                        <div className='category-3-item' onClick={gotopae2}>足球</div>
                        <div className='category-3-item' onClick={gotopae2}>篮球</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>医疗健康</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>按摩椅 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>按摩椅</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>医疗用具</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>助听器</div>
                        <div className='category-3-item' onClick={gotopae2}>口罩</div>
                        <div className='category-3-item' onClick={gotopae2}>呼吸机</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>鞋靴箱包</span>
              <span>/</span>
              <span className='nav-item-span'>首饰手表</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>鞋靴箱包</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>运动户外</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>运动鞋</div>
                        <div className='category-3-item' onClick={gotopae2}>休闲鞋</div>
                        <div className='category-3-item' onClick={gotopae2}>凉鞋</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>装物运行</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>旅行箱</div>
                        <div className='category-3-item' onClick={gotopae2}>男包</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>首饰手表</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>首饰</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>黄金</div>
                        <div className='category-3-item' onClick={gotopae2}>砖石</div>
                        <div className='category-3-item' onClick={gotopae2}>翡翠</div>
                        <div className='category-3-item' onClick={gotopae2}>玛瑙</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>手表</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae.bind(null, "机械表")}>机械表</div>
                        <div className='category-3-item' onClick={gotopae.bind(null, "石英表")}>石英表</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>手机数码</span>
              <span>/</span>
              <span className='nav-item-span'>电脑办公</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>手机数码</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>小米手机 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>Note</div>
                        <div className='category-3-item' onClick={gotopae2}>K</div>
                        <div className='category-3-item' onClick={gotopae2}>红米</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>游戏手机</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>黑鲨4</div>
                        <div className='category-3-item' onClick={gotopae2}>黑鲨5</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>电脑办公</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>电脑 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>台式</div>
                        <div className='category-3-item' onClick={gotopae2}>笔记本</div>
                        <div className='category-3-item' onClick={gotopae2}>平板</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>办公设备</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>打印机</div>
                        <div className='category-3-item' onClick={gotopae2}>扫描仪</div>
                        <div className='category-3-item' onClick={gotopae2}>路由器</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>大家电</span>
              <span>/</span>
              <span className='nav-item-span'>小家电</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>大家电</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>厨电 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>消毒柜</div>
                        <div className='category-3-item' onClick={gotopae2}>洗碗机</div>
                        <div className='category-3-item' onClick={gotopae2}>水槽</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>空调</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>柜式空调</div>
                        <div className='category-3-item' onClick={gotopae2}>壁挂空调</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>小家电</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>洗护工具 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>剃须刀</div>
                        <div className='category-3-item' onClick={gotopae2}>吹风机</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>口腔清洁</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>牙刷</div>
                        <div className='category-3-item' onClick={gotopae2}>口腔护理</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>美食饮酒</span>
              <span>/</span>
              <span className='nav-item-span'>出行车品</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>美食饮酒</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>食品 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae.bind(null, "水果")}>水果</div>
                        <div className='category-3-item' onClick={gotopae.bind(null, "零食")}>零食</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>酒水</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>白酒</div>
                        <div className='category-3-item' onClick={gotopae2}>啤酒</div>
                        <div className='category-3-item' onClick={gotopae2}>葡萄酒</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>出行车品</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>骑行 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>电动车</div>
                        <div className='category-3-item' onClick={gotopae2}>自行车</div>
                        <div className='category-3-item' onClick={gotopae2}>摩托车</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>汽车装饰</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>坐垫</div>
                        <div className='category-3-item' onClick={gotopae2}>脚垫</div>
                        <div className='category-3-item' onClick={gotopae2}>停车牌</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>运动户外</span>
              <span>/</span>
              <span className='nav-item-span'>医疗健康</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>运动户外</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>有氧燃脂 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>跑步机</div>
                        <div className='category-3-item' onClick={gotopae2}>蹦床</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>体育用具</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>羽毛球</div>
                        <div className='category-3-item' onClick={gotopae2}>乒乓球</div>
                        <div className='category-3-item' onClick={gotopae2}>足球</div>
                        <div className='category-3-item' onClick={gotopae2}>篮球</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>医疗健康</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>按摩椅 </span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>按摩椅</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>医疗用具</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>助听器</div>
                        <div className='category-3-item' onClick={gotopae2}>口罩</div>
                        <div className='category-3-item' onClick={gotopae2}>呼吸机</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-itme'>
              <span className='nav-item-span'>鞋靴箱包</span>
              <span>/</span>
              <span className='nav-item-span'>首饰手表</span>
              <div>
                <div className='sub-cate'>
                  <div className='cate-name'>鞋靴箱包</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>运动户外</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>运动鞋</div>
                        <div className='category-3-item' onClick={gotopae2}>休闲鞋</div>
                        <div className='category-3-item' onClick={gotopae2}>凉鞋</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>装物运行</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>旅行箱</div>
                        <div className='category-3-item' onClick={gotopae2}>男包</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='sub-cate'>
                  <div className='cate-name'>首饰手表</div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>首饰</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae2}>黄金</div>
                        <div className='category-3-item' onClick={gotopae2}>砖石</div>
                        <div className='category-3-item' onClick={gotopae2}>翡翠</div>
                        <div className='category-3-item' onClick={gotopae2}>玛瑙</div>
                      </span>
                    </div>
                  </div>
                  <div className='sub-nav-row'>
                    <div className='sub-nav-item-row'>
                      <span className='cete-item'>
                        <span className='sname'>手表</span>
                      </span>
                      <span className='cate-list'>
                        <div className='category-3-item' onClick={gotopae.bind(null, "机械表")}>机械表</div>
                        <div className='category-3-item' onClick={gotopae.bind(null, "石英表")}>石英表</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='banner-box'>
          <Carousel autoplay={true} className='mbanner' >
            <div>
              <img alt="" src={"https://res.youpin.mi-img.com/youpinoper/5f4bc618_6f58_4f14_a5ec_984d88b7c271.png?w=1080&amp;h=450"} />
            </div>
            <div>
              <img src={"https://res.youpin.mi-img.com/youpinoper/9354fb2b_21ab_41ea_8592_39d302bf431b.jpeg?w=1080&amp;h=450"} alt="" />
            </div>
          </Carousel>
        </div>
      </div>

      <div className='p-hero-wrap'>
        <div className="container aborder">
          <div className='line-container'>
            <ul className='p-hreo-nav'>
              <div className='kingkong-column'>
                <li className='m-tag-a'>
                  <div>
                    <div className='m-c'>
                      <div className='img-container' style={{ width: '116px', height: '116px' }}>
                        <img src={"https://img.youpin.mi-img.com/ferriswheel/aa807bb8_acab_41ff_b419_2e391bb26622.png?w=180&amp;h=180"} data-src="https://img.youpin.mi-img.com/ferriswheel/aa807bb8_acab_41ff_b419_2e391bb26622.png?w=180&amp;h=180" alt="上新精选" style={{ width: '116px', height: '116px' }} />
                      </div>
                    </div>
                  </div>
                  <p className='sstitle'>上新精选</p>
                </li>
              </div>
              <div className='kingkong-column'><li className='m-tag-a'>
                <div>
                  <div className='m-c'>
                    <div className='img-container' style={{ width: '116px', height: '116px' }}>
                      <img src={"https://img.youpin.mi-img.com/ferriswheel/599756a6_037d_46dc_b6f8_b5ced6879da1.png?w=180&h=180"} data-src="https://img.youpin.mi-img.com/ferriswheel/aa807bb8_acab_41ff_b419_2e391bb26622.png?w=180&amp;h=180" alt="上新精选" style={{ width: '116px', height: '116px' }} />
                    </div>

                  </div>
                </div>
                <p className='sstitle'>小米众筹</p>
              </li></div>
              <div className='kingkong-column'><li className='m-tag-a'>
                <div>
                  <div className='m-c'>
                    <div className='img-container' style={{ width: '116px', height: '116px' }}>
                      <img src={"https://img.youpin.mi-img.com/ferriswheel/7b76188c_f8fc_41d5_9845_92303f06006d.png?w=180&h=180"} data-src="https://img.youpin.mi-img.com/ferriswheel/aa807bb8_acab_41ff_b419_2e391bb26622.png?w=180&amp;h=180" alt="上新精选" style={{ width: '116px', height: '116px' }} />
                    </div>
                  </div>
                </div>
                <p className='sstitle'>有品秒杀</p>
              </li></div>
              <div className='kingkong-column'><li className='m-tag-a'>
                <div>
                  <div className='m-c'>
                    <div className='img-container' style={{ width: '116px', height: '116px' }}>
                      <img src={"https://img.youpin.mi-img.com/ferriswheel/d5bd4a63_0270_4c22_b1a2_2c5f177d6440.png?w=180&h=180"} data-src="https://img.youpin.mi-img.com/ferriswheel/aa807bb8_acab_41ff_b419_2e391bb26622.png?w=180&amp;h=180" alt="上新精选" style={{ width: '116px', height: '116px' }} />
                    </div>
                  </div>
                </div>
                <p className='sstitle'>生活优选</p>
              </li></div>
              <div className='kingkong-column'><li className='m-tag-a'>
                <div>
                  <div className='m-c'>
                    <div className='img-container' style={{ width: '116px', height: '116px' }}>
                      <img src={"https://img.youpin.mi-img.com/ferriswheel/7dc948e7_8591_4478_9920_eae0ff3a209a.png?w=180&h=180"} data-src="https://img.youpin.mi-img.com/ferriswheel/aa807bb8_acab_41ff_b419_2e391bb26622.png?w=180&amp;h=180" alt="上新精选" style={{ width: '116px', height: '116px' }} />
                    </div>
                  </div>
                </div>
                <p className='sstitle'>小米自营</p>
              </li></div>
            </ul>
          </div>
        </div>
      </div>

      <div className='h-new-sec'>
        <div className='container clearfix'>
          <div className='h-s-t'>
            <h2 className='h-sub'>
              小米有品众筹
              <span>永远好奇 永远好奇</span>
            </h2>
            <span className='h-more'>
              <span onClick={gotopae.bind(null, "众筹")}>更多<RightOutlined /></span>
            </span>
          </div>
          <div className='mt1'>
            <div className='swiper-slide2'>
              <div className='swiper-wrapper'>
                {showgoods3()}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className='h-new-sec'>
        <div className='container clearfix'>
          <div className='h-s-t'>
            <h2 className='h-sub'>
              有品秒杀
              <span className="timestr">
                <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODE4NDU0MzZBMUNFMTFFODhFQUZGMUEzNDU1MUNGRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODE4NDU0MzdBMUNFMTFFODhFQUZGMUEzNDU1MUNGRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MTg0NTQzNEExQ0UxMUU4OEVBRkYxQTM0NTUxQ0ZGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MTg0NTQzNUExQ0UxMUU4OEVBRkYxQTM0NTUxQ0ZGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjQBja0AAANrSURBVHja7JhbSFRRFIbPMZWKykwjJQgs0Ihq6KXMKAfKQNOKohJ6kIh66/YmlUXY5SEqSSroRaSHSssiFYuKktJqXlKE6GqPJuS1C5jJ9G/4J1bDuextI/nQgo9ZM2fvdf69zz5rrz12OBy2xpPFR5yauSn/XMzWzh4rzhpn5icoHTwA30G5R7vT4Bs/3ewU29wDM90a2ZE15PDIFoEGMIffu0GaS5wfIAH85KeTDYBp9D+AQvBa95GtBS1CzBDYI65ngAPgFngjRKg1+Q7c5vUM0Uf1H6Y/D7SC1ToztANcFgu+F2wET8AqUMZAtsaSUMEfguOgmf1ugiReVwJ3giteM1QpxKjRZoNX4DqDrtEUY7Gdav+Y/dvACvCR19XMnvFb1OfAINdPDpgIXqoBiDZqrdSDXSDAEdv8DPD3erb7vUQYJ46DVIu7H1zUXdQWg6vRTRePoAYc5drxsyxwjGJssbhzQbtpHlKvfJMQowIVgWJNMRbbFbNfP39LYtx00zxULTr1cFSNo8xDql+QcSKDrTYRtBnk0R8BW5ymWNg+MBns92jTzrgj/J7HuFqCjgj/PHjk82gSovdGF1NvaYX4XqYjaBlYTP8rc0gs7QTjRnaDbD9BG4Rfz8QYS+tj3Iit9xOUI/y6MdrU61zu5ygoS/ihMRIUcrmfo6Bk4Xdr3mBY+Gka7T+53M+3HkrUFDQk/BdgocFs2X6C+oQ/WzPobtZEFkuWpyxh3EzOYq+fILktzNcUdJUCesX20MhSxsmWCP+tn6BW4a8zmPpm5pT3IklWuLQtFH6Ln6A7wlcb4wwDUap+Ws480+MiKJlxZa7zFPQcdNCfAg4bvtKfmexSWaZE2yHGtXifZzpvmTxh7OVOHwvLjdqAy3U311pwn/4E1sGBvxSj+t9gPIvxa03qoRKRwFJYORaMUkwBK4ZUkRhLTAu0LpDPStFi5ajq7GsgU1NIJts3iIw8wLhdnmd7F1MdJ0Vl1W0stJr4RoZ4ivgCpvIstpQLO9/hHoncUNtMBZWCk/TVKeSuOHnEs04uMnhstRSpBniBa6nS5JGViZNGKWcmyLO+7n84kYNikIM56FUt+s1QFdjOIJdENm7mY9kEVoIFYBbP7YPMQx086aqjdqeIeVaIqTL9s+H//0N/zNB4sV8CDACpgNIYcitWCgAAAABJRU5ErkJggg=="} />
                <span>20:00
                  场
                </span>
              </span>
            </h2>
            <span className='h-more'>
              <span onClick={gotopae.bind(null, "秒杀")}>更多<RightOutlined /></span>

            </span>
          </div>
          <div className='mt1'>
            <div className='swiper-slide2'>
              <div className='swiper-wrapper' style={{ transform: `translate3d(-${n * x}px,0,0)` }}>
                {showgoods2()}

              </div>
              <div className="swiper-button-next m-icons m-icons-next-hover" onClick={next}></div>
              <div className="swiper-button-prev m-icons m-icons-forward-hover swiper-button-disabled" onClick={prev}></div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-new-sec'>
        <div className='container clearfix'>
          <div className='h-s-t'>
            <h2 className='h-sub'>
              每日新品
              <span>每天10点 惊喜不断</span>
            </h2>
            <span className='h-more'>
              <span onClick={gotopae.bind(null, "新品")}>更多<RightOutlined /></span>

            </span>
          </div>
          <div className='mt1'>
            <div className='swiper-slide2'>
              <div className='swiper-wrapper' style={{ transform: `translate3d(-${p * x}px,0,0)` }}>
                {showgoods()}
              </div>
              <div className="swiper-button-next m-icons m-icons-next-hover" onClick={next2}></div>
              <div className="swiper-button-prev m-icons m-icons-forward-hover swiper-button-disabled" onClick={prev2}></div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-cat-sec'>
        <div className='container'>
          <div className='h-s-t'>
            <h2 className='h-sub'>
              为你推荐
            </h2>
          </div>
          <div className='m-product-list'>
            {showgoods4()}
          </div>
        </div>
      </div>



    </div>
  );
}

export default Indexhtml;