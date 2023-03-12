import '../../css/Login/login.scss'
import Login from './login_com/Login';
import Register from './register/Register'
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';


function IndexLogin() {
    const onChange = (key: string) => {
        console.log(key);
    };

    const v = useParams();
    console.log(v.param);


    return (
        <div className="mi-sider-layout">
            <div className="mi-sider-layout__sider">
                <div className="mi-sider-layout__banner"></div>
            </div>
            <div className='mi-sider-layout__content'>
                <div className='mi-sider-layout__scroll'>
                    <div className='mi-layout'>
                        <div className='mi-layout__header'>
                            <div className='mi-layout__title'>
                                <div className="mi-layout__logo-wrap">
                                    <svg width="193px" height="193px" viewBox="0 0 193 193" className="mi-layout__logo"><title>编组</title><desc>Created with Sketch.</desc><defs><polygon id="path-1" points="1.78097075e-14 0.000125324675 192.540685 0.000125324675 192.540685 192.540058 1.78097075e-14 192.540058"></polygon></defs><g id="\u9875\u9762-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="\u7F16\u7EC4"><mask id="mask-2" fill="white"><use xlinkHref="#path-1"></use></mask>
                                        <g id="Clip-2"></g>
                                        <path d="M172.473071,20.1164903 C154.306633,2.02148701 128.188344,-1.78097075e-14 96.2706558,-1.78097075e-14 C64.312237,-1.78097075e-14 38.155724,2.0452987 19.9974318,20.1872987 C1.84352597,38.3261656 1.78097075e-14,64.4406948 1.78097075e-14,96.3640227 C1.78097075e-14,128.286724 1.84352597,154.415039 20.0049513,172.556412 C38.1638701,190.704052 64.3141169,192.540058 96.2706558,192.540058 C128.225942,192.540058 154.376815,190.704052 172.53636,172.556412 C190.694653,154.409399 192.540685,128.286724 192.540685,96.3640227 C192.540685,64.3999643 190.672721,38.2553571 172.473071,20.1164903" id="Fill-1" fill="#FF6900" mask="url(#mask-2)"></path><path d="M89.1841721,131.948836 C89.1841721,132.594885 88.640263,133.130648 87.9779221,133.130648 L71.5585097,133.130648 C70.8848896,133.130648 70.338474,132.594885 70.338474,131.948836 L70.338474,89.0100961 C70.338474,88.3584078 70.8848896,87.8251513 71.5585097,87.8251513 L87.9779221,87.8251513 C88.640263,87.8251513 89.1841721,88.3584078 89.1841721,89.0100961 L89.1841721,131.948836 Z" id="Fill-3" fill="#FFFFFF" mask="url(#mask-2)"></path><path d="M121.332896,131.948836 C121.332896,132.594885 120.786481,133.130648 120.121633,133.130648 L104.492393,133.130648 C103.821906,133.130648 103.275491,132.594885 103.275491,131.948836 L103.275491,131.788421 L103.275491,94.9022357 C103.259198,88.4342292 102.889491,81.7863818 99.5502146,78.445226 C96.6790263,75.5652649 91.3251562,74.9054305 85.7557276,74.7669468 L57.4242049,74.7669468 C56.7555977,74.7669468 56.2154484,75.3045896 56.2154484,75.9512649 L56.2154484,128.074424 L56.2154484,131.948836 C56.2154484,132.594885 55.6640198,133.130648 54.9954127,133.130648 L39.3555198,133.130648 C38.6875393,133.130648 38.1498964,132.594885 38.1498964,131.948836 L38.1498964,60.5996188 C38.1498964,59.9447974 38.6875393,59.4121675 39.3555198,59.4121675 L84.4786692,59.4121675 C96.2717211,59.4121675 108.599909,59.9498104 114.680036,66.0380831 C120.786481,72.1533006 121.332896,84.4595571 121.332896,96.2657682 L121.332896,131.948836 Z" id="Fill-5" fill="#FFFFFF" mask="url(#mask-2)"></path><path d="M153.53056,131.948836 C153.53056,132.594885 152.978505,133.130648 152.316164,133.130648 L136.678778,133.130648 C136.010797,133.130648 135.467515,132.594885 135.467515,131.948836 L135.467515,60.5996188 C135.467515,59.9447974 136.010797,59.4121675 136.678778,59.4121675 L152.316164,59.4121675 C152.978505,59.4121675 153.53056,59.9447974 153.53056,60.5996188 L153.53056,131.948836 Z" id="Fill-7" fill="#FFFFFF" mask="url(#mask-2)"></path>
                                    </g>
                                    </g>
                                    </svg>
                                </div>
                                小米帐号
                            </div>
                            <div className='mi-nav'>
                                <a className='mi-nav__item mi-external-url' href="">用户协议</a>
                                <a className='mi-nav__item mi-external-url' href="">隐私政策</a>
                                <a className='mi-nav__item mi-external-url' href="">帮助中心</a>
                                <div className="mi-nav__divider"></div>
                                <a className='mi-nav__item mi-external-url lang' href="">中文简体</a>
                            </div>
                        </div>
                        <div className='mi-layout__container'>
                            <div className='mi-layout__card'>
                                <div className='qr-switch-wrap'>
                                    <div className='mi-qr-login-switch'>
                                        <span role="img" className="anticon mi-qr-login-switch__icon"><svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" className=""><path d="M0 16.977H16.94V.036H0v16.941zM4.235 4.271h8.47v8.47h-8.47v-8.47zM19.06.036v16.941h16.94V.036H19.06zm12.706 12.706h-8.471v-8.47h8.47v8.47zM6.353 10.624h4.235V6.39H6.353v4.235zM0 36.036H16.94V19.095H0v16.94zM4.235 23.33h8.47v8.47h-8.47v-8.47zM29.647 6.389h-4.235v4.235h4.235V6.39zM19.059 36.036h4.235V31.8h-4.235v4.235zm4.235-12.706v8.47h4.235v-8.47h-4.235zm8.47 8.47H27.53v4.236H36v-8.47h-4.234V31.8zm0-8.47H36v-4.235h-4.235v4.235zM19.06 19.095v4.235h4.235v-4.235h-4.235zM6.353 29.683h4.235v-4.235H6.353v4.235z" fill="#FFF" fillRule="nonzero"></path></svg></span>

                                        <div className='tip'>扫码登录</div>
                                    </div>
                                </div>
                                <div className='ant-tabs ant-tabs-top mi-dialog__tabs'>
                                    <div className='ant-tabs-nav'>
                                        <Tabs
                                            defaultActiveKey={v.param}
                                            onChange={onChange}
                                            items={[
                                                {
                                                    label: `登录`,
                                                    key: '1',
                                                    children: <Login />,
                                                },
                                                {
                                                    label: `注册`,
                                                    key: '2',
                                                    children: <Register />,
                                                }
                                            ]}
                                        />
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

export default IndexLogin