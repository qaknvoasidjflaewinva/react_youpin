import IndexNav from "./publicCom/Nav/IndexNav";
import '../css/clearDefault.css'//清除浏览器默认样式
import IndexFooter from "./publicCom/Footer/IndexFooter";
import IndexLogin from "./login/IndexLogin";
// import 'antd/dist/reset.css';
import Search from "antd/es/transfer/search";

import IndexSearch from "./publicCom/Nav/IndexSearch";
import { BrowserRouter } from "react-router-dom";
import IndexRouterFilter from "../Router/IndexRouter";
import IndexRouter from "../Router/IndexRouter";
import Indexhtml from "./homepage/pages/Indexhtml";

function Main() {
    return (
        <div>
            <IndexNav />
            <IndexSearch />
            {/* <div style={{ height: '100vh' }}>
                <Indexhtml />
            </div> */}
            <Indexhtml />
            
            <IndexFooter />
            {/* <IndexLogin /> */}
        </div>
    )
}

export default Main;