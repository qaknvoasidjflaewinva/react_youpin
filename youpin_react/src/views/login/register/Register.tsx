import { useEffect, useState, useRef } from 'react';
import { message, notification } from 'antd';
import axios from 'axios';
import './scss/register.scss'
import { useNavigate } from 'react-router-dom';

function Register() {

    const [messageApi, contextHolder] = message.useMessage();
    const timerCount = 60 // 默认60秒
    const [count, setCount] = useState(timerCount)
    const timerRef = useRef<any>(null) // 记录时间的定时器
    const [accState, setAccState] = useState<any>([true, true])
    const [codeState, setCodeState] = useState<boolean>(true)
    const [isChecked, setChecked] = useState<boolean>(false)
    const [no, setNo] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [code, setCode] = useState<string>("")
    const [labStyle1, setLab1] = useState<any>({})
    const [labStyle2, setLab2] = useState<any>({})
    const [labStyle3, setLab3] = useState<any>({})
    const [input, setInput] = useState<any>({})
    const [hasGot, setGot] = useState<boolean>(false)
    const navigate = useNavigate();
    const codeNum = useRef<any>();
    // const 

    const tel_REG = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/


    const codeJudge = () => {
        if (code.length < 6) {
            setCodeState(false)
        } else {
            setCodeState(true)
            return true;
        }
    }

    const judge = () => {

        if ((!tel_REG.test(no) || no == '') && pwd.length < 6) {
            setAccState([false, false])
        } else if ((!tel_REG.test(no) || no == '') && pwd.length >= 6) {
            setAccState([false, true])
        } else if ((tel_REG.test(no)) && pwd.length < 6) {
            setAccState([true, false])
        } else {
            return true;
        }
    }

    async function getAccount() {
        const url = 'http://localhost:7001/register'
        const params = { tel_num: no, password: pwd }
        const res = await axios.post(url, params)
        console.log(res.data);
        if (res.data.code == 0) {
            sessionStorage.setItem('id', res.data.id);
            messageApi.open({
                type: 'success',
                content: '注册成功,即将自动登录~',
            });
            setTimeout(() => {
                navigate({ pathname: '/' });
            }, 1500);
        } else if (res.data.code == 1) {
            setInput({
                backgroundColor: '#FCF2F3',
                border: '1px solid #F0605D'
            })
            messageApi.open({
                type: 'error',
                content: '用户已存在，请使用其他手机号~',
            });
        }
    }

    function RegBtn(e: any) {
        e.preventDefault();
        if (judge() && codeJudge() && JSON.parse(code) == codeNum.current) {
            getAccount();
        } else {
            messageApi.open({
                type: 'error',
                content: '验证码错误',
            });
        }
    }

    const getCode = () => {
        if (judge()) {
            setGot(true)
            // setCodeNum(parseInt((Math.random() * (999999 + 1 - 100000) + 100000).toString()));
            codeNum.current = parseInt((Math.random() * (999999 + 1 - 100000) + 100000).toString())
            sendCode();
            setTimeout(
                openNotification, 2500
            )
        } else {
            return 0
        }
    }

    const openNotification = () => {
        notification.open({
            message: '小米',
            description:
                '【小米】登录/注册小米账号验证码：' + codeNum.current + '，请勿转发，转发将导致账号被盗。本验证码5分钟有效。注册后将绑定此安全手机。',
            onClick: () => {
                console.log('小米');
            },
        });
    };

    const hasNo = () => {
        if (no.length != 0) {
            setLab1({ fontSize: '7px', top: '10px' })
            setAccState([true, true ? true : false])
        } else {
            setLab1({})
        }
    }

    const hasPwd = () => {
        if (pwd.length != 0) {
            setLab2({ fontSize: '7px', top: '10px' })
            setAccState([true, true ? true : false])
        } else {
            setLab2({})
        }
    }

    const hasCode = () => {
        if (code.length != 0) {
            setLab3({ fontSize: '7px', top: '10px' })
        } else {
            setLab3({})
        }
    }

    const cutCount = () => {
        setCount((prevState) => prevState - 1) // 为什么这里要用函数- 如果用count 发现count闭包了 不会发生变化了
    }

    const sendCode = () => {
        // 要发送验证码
        cutCount()
        timerRef.current = setInterval(cutCount, 1000)
    }

    useEffect(() => {
        if (count === 0) {
            clearInterval(timerRef.current) // 清空定时器
            setCount(timerCount)
            setGot(false)// 重新将技术器设置为60秒
        }
    }, [count])

    useEffect(hasNo, [no])
    useEffect(hasPwd, [pwd])
    useEffect(hasCode, [code])

    return (
        <form action="">
            {contextHolder}
            <div className="mi-input mi-text-field__input">
                <input style={input} onClick={hasNo} type="text" name="account" className="mi-input__input" value={no} onChange={(e: any) => {
                    setNo(e.target.value)
                }} />
                <label className="mi-floating-label" style={labStyle1}>手机号码</label>
            </div>
            <span style={{ marginTop: '10px', display: accState[0] == true ? 'none' : 'block', color: '#F0605D' }}>请输入正确的手机号</span>
            <div className="mi-input mi-text-field__input pwd">
                <input style={input} onClick={hasPwd} type="password" name="password" className="mi-input__input" value={pwd} onChange={(e: any) => { setPwd(e.target.value) }} />
                <label className="mi-floating-label" style={labStyle2}>密码</label>
                <div className='visual'></div>
            </div>
            <span style={{ marginTop: '10px', display: accState[1] == true ? 'none' : 'block', color: '#F0605D' }}>请输入6位以上的密码</span>
            <div className="mi-input mi-text-field__input">
                <input type="text" name="account" className="mi-input__input" value={code} onChange={(e: any) => {
                    setCode(e.target.value)
                }} />
                <label className="mi-floating-label" style={labStyle3}>验证码</label>
                <label className='get-code' onClick={getCode} style={{ display: hasGot ? 'none' : 'block' }}>获取验证码</label>
                <label id='time' className='get-code' style={{ left: '225px', cursor: 'text', display: hasGot ? 'block' : 'none' }}>{count}s后可再次获取</label>
            </div>
            <span style={{ marginTop: '10px', display: codeState ? 'none' : 'block', color: '#F0605D' }}>请输入6位验证码</span>
            <div className='check-box'>
                <input type="checkbox" checked={isChecked} onChange={(e: any) => { setChecked(isChecked ? false : true) }} />&nbsp;
                <span> 已阅读并同意小米帐号 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a></span>
            </div >
            <button onClick={RegBtn} className='login-btn' style={{ opacity: isChecked ? '1' : '.4' }} disabled={!isChecked}>注册</button>
            <div className='tab-actions'>
                <div className='tab'>收不到验证码？</div>
            </div>
            <div className='sns-login'>
                <div className='sns-login-title'>其他方式登陆</div>
                <div className='login-content'>
                    <div className='mi-sns-login__list'>
                        <div className='mi-sns-login__item'>
                            <span className='mi-sns-login__icon' title='支付宝登录'>
                                <svg viewBox="0 0 46 46" width="1em" height="1em" aria-label="alipay">
                                    <path d="M10.35 25.898c-.543.439-1.125 1.076-1.294 1.886-.23 1.109-.048 2.496 1.021 3.583 1.296 1.32 3.263 1.68 4.112 1.744 2.31.165 4.77-.978 6.626-2.285a14.633 14.633 0 003.162-3.133c-2.667-1.376-5.996-2.898-9.555-2.75-1.818.076-3.12.454-4.072.956zm33.821 6.09A22.878 22.878 0 0046.001 23C46 10.319 35.683 0 23 0S0 10.319 0 23c0 12.684 10.315 23 23 23 7.654 0 14.441-3.761 18.624-9.53-4.82-2.4-9.646-4.785-14.48-7.156-1.916 2.184-4.746 4.372-7.943 5.324-2.01.598-3.822.825-5.715.438-1.875-.383-3.257-1.261-4.062-2.142-.41-.449-.88-1.02-1.222-1.699.032.086.055.137.055.137s-.196-.337-.346-.876a4.202 4.202 0 01-.16-1.401c-.02-.362.005-.726.077-1.081.187-.91.575-1.967 1.58-2.952 2.203-2.157 5.154-2.274 6.684-2.265 2.265.014 6.201 1.005 9.515 2.178.918-1.957 1.507-4.048 1.886-5.44H13.717v-1.49h7.075v-2.982h-8.567v-1.489h8.565v-2.979c0-.41.081-.745.745-.745h3.352v3.724H34.2v1.49h-9.312v2.98h7.45s-.748 4.17-3.088 8.28c5.192 1.854 12.494 4.71 14.92 5.664z" fill="#1989fa"></path>
                                </svg>
                            </span>
                        </div>
                        <div className='mi-sns-login__item'>
                            <span className='mi-sns-login__icon' title='微信登录'>
                                <svg viewBox="0 0 46 46" width="1em" height="1em" aria-label="wechat">
                                    <g fill="#50b674">
                                        <path d="M14.345 17.311a1.505 1.505 0 103.01 0 1.505 1.505 0 00-3.01 0zm6.74-.04a1.505 1.505 0 103.01 0 1.505 1.505 0 00-3.01 0zm3.756 6.732a1.045 1.045 0 102.09 0 1.045 1.045 0 00-2.09 0zm5.31.084a1.045 1.045 0 102.092 0 1.045 1.045 0 00-2.091 0z"></path>
                                        <path d="M23 0A23.001 23.001 0 006.736 39.263 23 23 0 0046 22.999 22.984 22.984 0 0023 0zm-3.93 28.311c-1.212 0-2.175-.25-3.387-.501l-3.387 1.673.961-2.885c-2.426-1.674-3.849-3.849-3.849-6.525 0-4.601 4.35-8.197 9.662-8.197 4.725 0 8.906 2.886 9.743 6.774a6.763 6.763 0 00-.921-.042c-4.601 0-8.197 3.429-8.197 7.652.01.676.11 1.348.293 1.998-.335 0-.628.042-.92.042zm14.135 3.387l.71 2.426-2.634-1.463c-.961.25-1.924.502-2.885.502-4.601 0-8.199-3.136-8.199-6.974 0-3.837 3.596-6.984 8.196-6.984 4.35 0 8.197 3.136 8.197 6.984 0 2.133-1.423 4.057-3.387 5.52z"></path>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <div className='mi-sns-login__item'>
                            <span className='mi-sns-login__icon' title='QQ登录'>
                                <svg viewBox="0 0 46 46" width="1em" height="1em" aria-label="qq">
                                    <path d="M23 0C10.31 0 0 10.31 0 23s10.31 23 23 23 23-10.31 23-23S35.69 0 23 0zm10.363 29.926c-.053.053-.106.053-.159.106-.634-.159-1.374-.74-1.692-1.216-.158-.159-.211-.423-.475-.53 0 .953-.582 1.852-1.005 2.486-.159.211-.635.582-.635.793.16.106.37.159.582.212.476.211 1.163.581 1.428 1.004.105.159.264.317.317.476.74 1.745-1.64 2.168-2.855 2.432s-3.49-.476-4.124-.846c-.37-.264-.74-.846-1.322-.846-.159.106-.635.053-.9.053-.74 1.48-4.6 2.168-6.661 1.375-.635-.212-1.956-.793-1.692-1.798.211-.846.899-1.322 1.586-1.639.264-.159.846-.211 1.005-.476-.582-.423-1.11-1.269-1.375-1.956-.159-.37-.212-1.163-.423-1.428-.37.529-1.428 1.64-2.326 1.48-.16-.21-.318-.422-.423-.687-.212-.687-.106-1.797.105-2.432.37-1.322.74-2.273 1.428-3.225.211-.317.529-.529.74-.846-.423-.423-.317-1.692-.053-2.22.159-.37.423-.318.476-.9-.106-.158 0-.37-.053-.581-.211-.952.159-2.115.423-2.855.9-2.38 2.432-4.072 4.706-5.023.529-.212 1.163-.37 1.745-.476.264-.053.528 0 .74-.106 5.34-.053 8.037 2.75 9.041 7.032.159.688 0 1.586 0 2.274 1.216.264 1.48 2.696.476 3.384V23c.37.634.846 1.269 1.163 1.956.318.74.423 1.586.635 2.485.211.687-.106 2.274-.423 2.485z" fill="#18acfc"></path>
                                </svg>
                            </span>
                        </div>
                        <div className='mi-sns-login__item'>
                            <span className='mi-sns-login__icon' title='微博登录'>
                                <svg viewBox="0 0 46 46" width="1em" height="1em" aria-label="weibo"><g fill="#ea5d5c"><path d="M20.156 21.662c-4.35.21-7.862 2.55-7.862 5.478s3.513 5.144 7.862 4.935c4.35-.21 7.862-2.97 7.862-5.897-.042-2.885-3.555-4.725-7.862-4.516zm2.927 7.402c-1.338 1.756-3.972 2.593-6.523 1.17-1.213-.668-1.171-1.965-1.171-1.965s-.502-4.14 3.847-4.642c4.391-.543 5.186 3.68 3.847 5.437z"></path><path d="M20.156 26.262a.613.613 0 00-.167.836c.125.251.502.293.752.084.251-.21.377-.585.21-.836-.126-.251-.46-.293-.795-.084zm-2.05.585a1.53 1.53 0 00-1.38 1.506c0 .67.67 1.17 1.465 1.087.794-.083 1.463-.71 1.463-1.422s-.627-1.254-1.547-1.17z"></path><path d="M23 0C10.287 0 0 10.287 0 23s10.287 23 23 23 23-10.287 23-23S35.713 0 23 0zm8.866 28.144c-1.799 3.847-7.695 5.73-12.044 5.394-4.14-.334-9.493-1.714-10.036-6.816 0 0-.293-2.3 1.923-5.269 0 0 3.178-4.475 6.858-5.77 3.722-1.255 4.14.877 4.14 2.174-.209 1.087-.543 1.714.837 1.296 0 0 3.638-1.715 5.143-.21 1.213 1.214.21 2.928.21 2.928s-.502.544.543.753c.962.167 4.224 1.673 2.425 5.52zm-3.597-10.622a.733.733 0 01-.71-.71c0-.42.334-.712.71-.712 0 0 4.475-.836 3.931 4.015v.083a.723.723 0 01-.71.628.705.705 0 01-.712-.711c0-.084.711-3.304-2.509-2.593zm7.57 4.642c-.126.836-.544.502-1.004.502-.586 0-1.046-.753-1.046-1.339 0-.501.21-1.003.21-1.003.041-.21.543-1.547-.335-3.513-1.59-2.718-4.768-2.718-5.144-2.593-.376.168-.962.251-.962.251-.585 0-1.045-.46-1.045-1.045 0-.502.334-.878.752-1.004 0 0 0 .042.042.042s.084.042.084.042c.46-.084 2.049-.21 3.554.167 2.802.67 6.566 3.764 4.893 9.493z"></path></g></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <button onClick={sendCode}>TEST</button> */}
        </form>


    )
}

export default Register;