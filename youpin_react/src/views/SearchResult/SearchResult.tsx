import IndexFooter from "../publicCom/Footer/IndexFooter";
import IndexNav from "../publicCom/Nav/IndexNav";
import IndexSearch from "../publicCom/Nav/IndexSearch";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './result.scss'
import axios from "axios";
import { useEffect, useState } from "react";

function SearchResult() {

    interface IGoods {
        id: string,
        title: string,
        classify: string,
        pimgs: string,
        description: string,
        price: number,
    }

    const [result, setResult] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)
    const [goodsList, setList] = useState<IGoods[]>([])
    const navigate = useNavigate()
    const location = useLocation();
    let key = location.state;

    async function search(u: any, p: any) {
        const res = await axios.post(u, p)
        if (res.data.code == 0) {
            setResult(false)
        } else {
            setResult(true)
            setCount(res.data.count);
            setList(res.data.goodsList)
        }
    }

    const getGoods = () => {
        const url = 'http://localhost:7001/searchByKey'
        const param = { key: key };
        search(url, param);
    }

    function gotogood(id: any) {
        navigate({ pathname: '/detail' }, { state: { id } });
        console.log(id);
    }

    const showList = () => {
        return (
            goodsList.map((item: any, index: any) => {
                return (
                    <div key={item.id} onClick={gotogood.bind(null, item.id)} className={(index + 1) % 4 == 1 || index == 0 ? 'pro-item m-tag-a first' : 'pro-item m-tag-a'}>
                        <div className="pro-img-r">
                            <img className="" src={item.pimgs} alt="" style={{ marginTop: "0px" }} />
                        </div>
                        <div className="tag-container">
                            <img src="https://img.youpin.mi-img.com/new_gms/8131fd40_d4fe_43a1_943d_a0edd8462824.png" className="common-tag common-tag-img" alt="" style={{ height: '20px', display: item.description.indexOf('必买') == -1 ? 'none' : 'inline-block' }} />
                            <img src="https://img.youpin.mi-img.com/new_gms/2a663c7f_0661_4660_a930_eec0e955edfc.png" className="common-tag common-tag-img" alt="" style={{ height: '20px' }}></img>
                            <img src="https://img.youpin.mi-img.com/new_gms/2643a0f2_c7ec_4b40_ae6d_069891ce16a6.png" className="common-tag common-tag-img" alt="" style={{ height: '20px' }}></img>
                        </div>
                        <p className="pro-name" title={item.title}>{item.title}</p>
                        <p className="pro-price">
                            <span className="pro-unit">¥</span>
                            <span className="m-num-r">{item.price}</span>
                            <span className="pro-flag">起</span>
                        </p>
                    </div>
                )
            })
        )
        // console.log(goodsList);

    }

    const noResult = () => {
        return (
            <div className="no-result">
                <div className="m-exception  m-no-result">
                    <div className="e-img"></div>
                    <p className="e-info">抱歉，暂无任何商品</p></div>
                <div style={{ marginTop: '21px' }}>
                    <Link className="m-btn-sm m-btns" to={{ pathname: '/' }} style={{ width: '109px' }}>继续逛</Link>
                </div>
            </div>
        )
    }

    useEffect(getGoods, [key]);

    return (
        <div>
            <IndexNav />
            <IndexSearch />
            <div className="result-container" style={{ minHeight: '68.7vh' }}>
                <div className="container">
                    <div className="search-tit">
                        为您找到
                        <span style={{ color: '#845f3f' }}>{count}</span>
                        条结果
                    </div>
                    <div className="sort-group">
                        <div className="sort-button">
                            <div className="sort-button-wrap">
                                <div className="sort-button-text sort-button-text-active">综合</div>
                                <img className="sort-button-line" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAXSURBVAiZY2RgYDBmYGBgYGKAguHKAABGgABn3ypM0wAAAABJRU5ErkJggg==" alt="按钮分隔符"></img>
                            </div>
                        </div>
                        <div className="sort-button">
                            <div className="sort-button-wrap">
                                <div className="sort-button-text">新品</div>
                                <img className="sort-button-line" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAXSURBVAiZY2RgYDBmYGBgYGKAguHKAABGgABn3ypM0wAAAABJRU5ErkJggg==" alt="按钮分隔符"></img>
                            </div>
                        </div>
                        <div className="sort-button">
                            <div className="sort-button-wrap">
                                <div className="sort-button-text">销量</div>
                                <img className="sort-button-line" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAXSURBVAiZY2RgYDBmYGBgYGKAguHKAABGgABn3ypM0wAAAABJRU5ErkJggg==" alt="按钮分隔符"></img>
                            </div>
                        </div>
                        <div className="sort-button">
                            <div className="sort-button-wrap">
                                <div className="sort-button-text">价格↑</div>
                            </div>
                        </div>
                    </div>
                    <div className="product-list clear-fix">
                        {result ? showList() : noResult()}
                    </div>
                </div>
            </div>
            <IndexFooter />
        </div>
    )

}

export default SearchResult;