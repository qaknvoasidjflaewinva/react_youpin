import React, { useContext } from 'react';
import ThemeContext from '../../../tool/ThemeContext';
import axios from 'axios';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

function GoodsTabs() {
    let { goodsTab, setGoodsTab } = useContext(ThemeContext);

    const items: MenuProps['items'] = [
        {
            label: '商品详情  ',
            key: 'goodsDetail',
        },
        {
            label: '评论',
            key: 'comment',
        },
        {
            label: '常见问题',
            key: 'question',
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setGoodsTab(e.key);
    };
    return (
        <div className="tabs">
            <Menu onClick={onClick} selectedKeys={[goodsTab]} mode="horizontal" items={items} />
        </div>
    )
}
export default GoodsTabs;