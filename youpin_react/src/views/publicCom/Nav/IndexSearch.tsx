import { useEffect, useRef, useState } from 'react';
import '../../../css/Nav/Search/search.scss'
import { useNavigate, Link } from 'react-router-dom';

function IndexSearch() {

    const [key, setKey] = useState<string>('')
    const [height, setHeight] = useState<number>(0);
    const PlaceH = useRef<string>();
    let navigate = useNavigate();

    const searchBtn = () => {
        if (key != '') {
            PlaceH.current = key == undefined ? '输入商品名' : key;
            navigate({ pathname: '/result' }, { state: key as string })
        }
    }

    setInterval(() => {
        let sHeight = document.documentElement.scrollTop
        setHeight(sHeight);
    }, 30)

    // const goto =()=>{
    //     navigate({ pathname: '/Personal/cars' })
    // }

    return (
        <div>
            <div className="text-scroll-container">
                <div className="marquee_box text-scroll">
                    <div className='title-container'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACoklEQVRYR+3X3UtTYRwH8O9z5uzF3oyIiIKK6CZCjKggFMxeNBzmztYOgTm7EIL8A7rQztwgIujCrrzaVKJaOQgjugisrruozCIiDLrJYqVEI9PzfGOGImPTnbOzNWLn7nCe5/d8zvc5L88jUOSHKHIfSsBcZ6iUYCnBXBPItf8/eQaj172rfv5gE0gNgkfKhPNka/edl+lupmDAaNRbnniHBkipgXARXDMPEorw+buHogUHjozoZZ+ejdZL0AeihcCGtIhCAkldGQyO1chkUqCHwKblnsOCJBgO+Q7DmNVAegFsXQ61+HregP09ajWl0AB5hsAOMyjbgAPXWitkItFAcj+EmHQoGJMGDgHUCOyxirIFONjjqTHIfpI77YBkqmFpim+FtO2/jJlRkOvziUvWtgQMB9QIyLZ84ywDI7r6nuDu4gUG3N9IVBYxUH1Msr5ogQNBj9sw5FDRApOwiK7eIHgx30hLb/E8KhxUTwsDFyhQLYgpAK8JHjT7O1vqJnMCpiu8sCCg9IFUCWzOJWVbgZGQu5aGUoXysuH2S7c/RqNex/RbHDUgfSRaAG40i7UVGA64X4ComkMIPHUojvZzXXfHk6fP+zqcb77Ej1NCI9FMcF02WHuBuvoB4K6F1TDwyK/HGlMhD3s7V3z9/vmUhPQJoIlkha3/4kzFwilACEy0X45tWSqp4b6O1fGJ+N89CEUjwZW2rGbSDWoFuLjO/avn105OTzWTyeWaOAHSqTgUV1vXvQfpxjO9aQoH1Fcg9y0UyyLBTOnevHK2Uv6eObCtdu9IXZ0+axPQ0wnKXjuAWb1A2TRKbdMfdB+jhB8ULoBP/Hqs2UqdbPqYnuLFRZMf7LmvjdBlNoNZaZMT0MqAZvuUgGYTS21fSvC/T/APsXEzOBI1p8gAAAAASUVORK5CYII=" className="icon" />
                        <span>质量公告：</span>
                    </div>
                    <p className='sc-dlfnuX lmBxwT'>
                        <a className="item" href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=2rj1ao">广东博奥康医疗科技有限公司对一次性使用医用口罩主动召回</a>
                        <a className="item" href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=3kjsrx">济南鑫驰医疗科技有限公司对医用外科口罩主动召回</a>
                    </p>
                </div>
            </div>
            <div className='m-header clearfix header-class'>
                <div className={height >= 300 ? 'm-header-fixed' : ''}>
                    <div className='container'>
                        <div className='clearfix m-header-top'>
                            <Link to={{ pathname: '/' }}><div className='m-logo m-tag-a'></div></Link>
                            <div className="nav-part"></div>
                            <ul className="tab-list">
                                <li data-src="https://m.xiaomiyoupin.com/r/secbuy?type=secbuy" className="tab-item">有品秒杀</li>
                                <li data-src="https://b.xiaomiyoupin.com" className="tab-item">企业采购</li>
                            </ul>
                            <div className="m-card-wrap fr">
                                <div className="m-card-mini">
                                    <div style={{ width: '1.5625rem', height: '1.5625rem', cursor: 'pointer' }}>
                                        <svg fill="#333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.97 41.04">
                                            <path d="M31.74,33.24H16.66c-1.9,0-4.16-1.94-4.49-4.83-.11-.93-.36-3.91-.66-7.35-.39-4.61-.89-10.36-1.17-12.89C9.9,4.3,8.38,3,7.75,3H1.5V0H7.75c2.14,0,4.54,2.05,5.38,6.58H37a4.77,4.77,0,0,1,3.76,1.79,5.5,5.5,0,0,1,1.13,4.5l-.13.67c-.63,3.17-2.3,11.58-3.24,14.56C37.35,31.75,35.39,33.24,31.74,33.24ZM13.5,9.58c.29,2.94.68,7.46,1,11.23.3,3.41.55,6.36.65,7.26a2.5,2.5,0,0,0,1.52,2.17H31.74c2.07,0,3.07-.43,3.9-3,.89-2.82,2.59-11.42,3.15-14.25l.14-.67a2.48,2.48,0,0,0-.51-2A1.84,1.84,0,0,0,37,9.58Z"></path><circle cx="16.47" cy="37.95" r="3"></circle>
                                            <circle cx="34.32" cy="37.95" r="3"></circle>
                                            <circle cx="1.5" cy="1.5" r="1.5"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='m-search'>
                                <div className='search-form'>
                                    <div className="search-icon" onClick={searchBtn}>
                                        <Link to={{ pathname: '/' }}>
                                            <div style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}>

                                                <svg fill="#333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                    <path d="M47.27,43.74,37.5,34A21,21,0,1,0,34,37.5l9.78,9.77a2.5,2.5,0,0,0,3.53-3.53ZM5,21A16,16,0,1,1,21,37,16,16,0,0,1,5,21Z"></path>
                                                </svg>

                                            </div>
                                        </Link>
                                    </div>
                                    <div className="m-autocomplete search-input-con">
                                        <input type="text" placeholder={PlaceH.current} value={key} onChange={(e: any) => { setKey(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexSearch;