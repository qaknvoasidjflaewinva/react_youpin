import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ThemeContext from '../../../tool/ThemeContext';
import axios from 'axios';
import { Button, Input, message } from 'antd';

interface IComment {
    userid: number,
    username: string,
    userimg: string | undefined,
    second: any,
    fid: number,
    comid: number,
    time: string,
    content: string,
};

function GoodsComment() {
    const location = useLocation();
    const gid = (location.state.id as number);
    const [comment, setComment] = useState<IComment[]>([]);
    const [sendcom, setSendCom] = useState<string>('');
    const [addcom, setAddCom] = useState<string>()
    const [comindex, setComIndex] = useState<number>()
    const [uid, setUid] = useState<any>()

    const { TextArea } = Input;
    useEffect(function () {
        begin();
    }, []);

    async function begin() {
        try {
            let comment = await getComment();
            const Uid = sessionStorage.getItem('id');
            setUid(Uid)
            setComment(comment);
        } catch (e) {
            console.log(e);
        }
    }

    // 转换时间
    function zhuanhuan(comlist: any) {
        for (let i = 0; i < comlist.length; i++) {
            let comment = comlist[i];
            let d = new Date(comment.time);
            let time = `${d.getFullYear()}:${d.getMonth() + 1}:${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
            comment.time = time;
            let seclist = comment.second;
            for (let i = 0; i < seclist.length; i++) {
                let comment = seclist[i];
                let d = new Date(comment.time);
                let time = `${d.getFullYear()}:${d.getMonth() + 1}:${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
                comment.time = time;
                let thrlist = comment.threeCom;
                for (let i = 0; i < thrlist.length; i++) {
                    let comment = thrlist[i];
                    let d = new Date(comment.time);
                    let time = `${d.getFullYear()}:${d.getMonth() + 1}:${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
                    comment.time = time;
                }
            }
        }
    }

    //axios 查看评论
    async function getComment() {
        try {
            const url = "http://localhost:7001/getCommentBygid.do";
            let res = await axios.get(url, { params: { gid } });
            let list = res.data.commentList.firstCom;
            if (res.data.state === 1) {
                zhuanhuan(list)
                return list;
            }
        } catch (e) {
            console.log(e)
        }
    }
    function renderCom() {
        return (
            comment.map(function (firstCom, index) {
                return (
                    <div key={index} className="comlistbox">
                        <div className="t_div">
                            <div className="myimg">
                                <img src={firstCom.userimg} alt="" />
                            </div>
                            <div className="info">
                                <div className="name">{firstCom.username} </div>
                                <div className="attach">
                                    <span>{firstCom.time} </span>
                                </div>
                            </div>
                            <div className="tips">
                                <Button onClick={addComSon1.bind(null, firstCom.comid)} className={firstCom.comid !== comindex ? "isShow" : "isNotShow"}>回复</Button>
                                <Button onClick={sendComment.bind(null, firstCom.comid)} className={firstCom.comid === comindex ? "isShow" : "isNotShow"}>发表评论</Button>
                                <Button onClick={addComSon2.bind(null, firstCom.comid)} className={firstCom.comid === comindex ? "isShow" : "isNotShow"}>取消回复</Button>
                                <Button className={uid == firstCom.userid ? "isShow" : "isNotShow"} onClick={delCom.bind(null, firstCom.comid)}>删除</Button>
                            </div>
                        </div>
                        <div className="b_div">{firstCom.content}</div>
                        <TextArea rows={2} cols={1}
                            placeholder="写出回复内容"
                            key={firstCom.comid}
                            className={`${firstCom.comid === comindex ? "isShow" : "isNotShow"} comboxstyle`}
                            value={addcom}
                            onChange={(e) => {
                                console.log(firstCom.comid + "====所评论的评论id");
                                setAddCom(e.target.value);
                            }}>
                        </TextArea>
                        <div className="secondcom">
                            {
                                firstCom.second.map((second: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <div className="t_div">
                                                <div className="myimg">
                                                    <img src={second.userimg} alt="" />
                                                </div>
                                                <div className="info">
                                                    <div className="name">{second.username}
                                                        {/*  <div style={{ display: "inline", marginLeft: "20px" }}>
                                                            回复 {firstCom.username}
                                                        </div> */}
                                                    </div>

                                                    <div className="attach">
                                                        <span>{second.time} </span>
                                                    </div>
                                                </div>
                                                <div className="tips">
                                                    <Button onClick={addComSon1.bind(null, second.comid)} className={second.comid !== comindex ? "isShow" : "isNotShow"}>回复</Button>
                                                    <Button onClick={sendComment.bind(null, second.comid)} className={second.comid === comindex ? "isShow" : "isNotShow"}>发表评论</Button>
                                                    <Button onClick={addComSon2.bind(null, second.comid)} className={second.comid === comindex ? "isShow" : "isNotShow"}>取消回复</Button>
                                                    <Button className={uid == second.userid ? "isShow" : "isNotShow"} onClick={delCom.bind(null, second.comid)}>删除</Button>
                                                </div>
                                            </div>
                                            <div className="b_div">{second.content}</div>
                                            <TextArea rows={2} cols={1}
                                                placeholder="写出回复内容"
                                                key={second.comid}
                                                className={`${second.comid === comindex ? "isShow" : "isNotShow"} comboxstyle`}
                                                value={addcom}
                                                onChange={(e) => {
                                                    console.log(second.comid + "====所评论的评论id");
                                                    setAddCom(e.target.value);
                                                }}>
                                            </TextArea>
                                            <div>
                                                {
                                                    second.threeCom.map((threecom: any, index: any) => {
                                                        return (
                                                            <div key={index}>
                                                                <div className="t_div">
                                                                    <div className="myimg">
                                                                        <img src={threecom.userimg} alt="" />
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="name">{threecom.username}
                                                                            {/* <div style={{ display: "inline", marginLeft: "20px" }}>
                                                                                回复 {second.username}
                                                                            </div> */}
                                                                        </div>
                                                                        <div className="attach">
                                                                            <span>{threecom.time} </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tips">
                                                                        <Button onClick={addComSon1.bind(null, threecom.comid)} className={threecom.comid !== comindex ? "isShow" : "isNotShow"}>回复</Button>
                                                                        <Button onClick={sendComment.bind(null, threecom.comid)} className={threecom.comid === comindex ? "isShow" : "isNotShow"}>发表评论</Button>
                                                                        <Button onClick={addComSon2.bind(null, threecom.comid)} className={threecom.comid === comindex ? "isShow" : "isNotShow"}>取消回复</Button>
                                                                        <Button className={uid == threecom.userid ? "isShow" : "isNotShow"} onClick={delCom.bind(null, threecom.comid)}>删除</Button>
                                                                    </div>
                                                                </div>
                                                                <div className="b_div">{threecom.content}</div>
                                                                <TextArea rows={2} cols={1}
                                                                    placeholder="写出回复内容"
                                                                    key={threecom.comid}
                                                                    className={`${threecom.comid === comindex ? "isShow" : "isNotShow"} comboxstyle`}
                                                                    value={addcom}
                                                                    onChange={(e) => {
                                                                        console.log(threecom.comid + "====所评论的评论id");
                                                                        setAddCom(e.target.value);
                                                                    }}>
                                                                </TextArea>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                )
            })
        )
    }


    //渲染查看到的评论
    function renderComment() {
        return (renderCom())
    }

    // 追加评论
    async function addComSon1(addNewbyId: any) {
        setComIndex(addNewbyId)
    }

    // 取消评论
    async function addComSon2(addNewbyId: any) {
        setComIndex(0)
    }



    async function delCom(delId: any) {
        try {
            console.log(delId);
            let res = await axios.get("http://localhost:7001/delComment.do", { params: { delId } })
            let data = res.data;

            if (data.state == 1) {//成功删评论
                // 渲染评论
                let comment = await getComment();
                setComment(comment);
            } else {//失败评论
                throw new Error("异常")
            }
        } catch (e) {
            console.log(e);
        }

    }
    //发布评论
    async function sendComment(fid: number) {
        //commentContent;//状态 评论内容
        if (uid != undefined) {
            if (sendcom !== '') {
                try {
                    console.log(sendcom);
                    let res = await axios.post("http://localhost:7001/addComment.do", { uid, gid, fid, sendcom })
                    let data = res.data;

                    if (data.state === 1) {//成功发评论
                        // 渲染增加的评论
                        let comment = await getComment();
                        setComment(comment);
                        setSendCom('');
                    } else {//失败发评论
                        throw new Error("异常")
                    }
                } catch (e) {
                    console.log(e);
                }

            } else if (addcom !== '') {
                let sendcom = addcom;

                try {
                    console.log(sendcom);
                    let res = await axios.post("http://localhost:7001/addComment.do", { uid, gid, fid, sendcom })
                    let data = res.data;

                    if (data.state === 1) {//成功发评论
                        // 渲染增加的评论
                        let comment = await getComment();
                        setComment(comment);
                        setSendCom('');
                    } else {//失败发评论
                        throw new Error("异常")
                    }
                } catch (e) {
                    console.log(e);
                }


            }
            setComIndex(0)
            setAddCom('')
        } else {
            message.info("请先登录！")

        }

    }

    return (
        <div>
            {/* 商品评论 */}
            <TextArea rows={4} placeholder="写出评论内容" style={{ marginTop: '10px' }} value={sendcom} onChange={(e) => {
                setSendCom(e.target.value);
            }}>
            </TextArea><br />
            <Button onClick={sendComment.bind(null, 0)} style={{ margin: '10px' }} className='add_cart'>发评论</Button>
            <div className="commentbox">
                {renderComment()}
            </div>

        </div>
    )
}
export default GoodsComment;



