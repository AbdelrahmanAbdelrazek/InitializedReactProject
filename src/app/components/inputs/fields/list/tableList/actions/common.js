import React from 'react';
import { Tooltip, Popconfirm, Divider } from 'antd';
export const mainStyle = ({ t, ...props }) => (<span>
    <Tooltip placement="bottom" title={t(`actions:${props.name}`)}>
        <a onClick={props.clickAction}>
            <span className="icon-color"><i className={props.icon} aria-hidden="true"></i>
            </span>
        </a>
    </Tooltip>
    <Divider type="vertical" />
</span>)

export const confirmAction = ({ t, ...props }) =>(
    <Popconfirm title={t(`actions:${props.msg}`)} placement='top' onConfirm={props.clickAction} okText={t("actions:Submit")} cancelText={t("actions:Cancel")}>
        <Tooltip placement="bottom" title={t(`actions:${props.name}`)}>
            <a>
                <span className="icon-color"><i className={props.icon} aria-hidden="true"></i>
                </span>
            </a>
        </Tooltip>
        <Divider type="vertical" />
    </Popconfirm>)