import '../../../css/Footer/footer.scss'
import '../../../css/Nav/nav.scss'

function IndexFooter() {
    return (
        <div className="footer">
            <div className='container clear-f'>
                <div className='fl m-logo'>
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/youpin-pc/production/YouPin_PC/static3/media/logo.8cef1e8f.png" alt="" />
                </div>
                <div className='f-info fr'>
                    <div className='icon'>
                        <a href="https://www.xiaomiyoupin.com/app/shop/content?id=na056d0394b93a391">
                            <img src="//cdn.cnbj1.fds.api.mi-img.com/youpin-pc/production/YouPin_PC/static3/media/f-logo.76889756.png" />
                        </a>
                    </div>
                    <div>
                        <p className='footer-item'>
                            <span>©xiaomiyoupin.com</span>
                            <span>苏B2-20180351 苏ICP备18025642号-1</span>
                            <img src="//cdn.cnbj1.fds.api.mi-img.com/youpin-pc/production/YouPin_PC/static3/media/record-icon.0c577066.png" alt="logo" style={{ width: '15px', height: '15px', verticalAlign: '-3px' }} />
                            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32010502010244" target="_blank" rel="noopener noreferrer">苏公网安备 32010502010244号 </a>
                        </p>
                        <p className="footer-item">
                            <span>企业名称：有品信息科技有限公司 </span>
                            <a href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=1akvh1" target="_blank" rel="noopener noreferrer">关于我们 </a><a href="https://zhaoshang.xiaomiyoupin.com/" target="_blank" rel="noopener noreferrer">入驻有品 </a>
                            <a href="https://www.mi.com/intellectual?channel=xiaomiyoupin" target="_blank" rel="noopener noreferrer">知识产权侵权投诉 </a>
                        </p>
                        <p className="footer-item">
                            <a href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=921fb3yykmnc5gyp" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb:(102, 102, 102)' }}>平台运营资质证照 </a>
                            <a href="https://m.xiaomiyoupin.com/content/ewen/pageFromId?id=g5tbux" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb:(102, 102, 102)' }}>医疗器械网络交易服务第三方平台备案凭证 </a>
                        </p>
                        <p className="footer-item">
                            <a href="https://www.xiaomiyoupin.com/app/shop/content?id=s2426f03987ef05b5" target="_blank" rel="noopener noreferrer">小米有品平台运营主体变更公告 </a>
                        </p>
                        <p className="footer-item"><span>南京市建邺区白龙江东街8号3栋9层 </span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexFooter;