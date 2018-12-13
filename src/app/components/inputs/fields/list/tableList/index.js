import React from 'react'
import { last } from 'lodash';
import { translate } from 'react-i18next';
import { Button, Table } from 'antd';
import * as ActionsComponents from './actions';
import { list, connectList } from '../';
import {apply_permissions} from 'helpers/functions';

class tableListComponent extends list {
    constructor(props) {
        super(props);
        this.ActionsComponents = ActionsComponents;
    }
    componentDidMount() {
        this.listDiv = last(document.querySelectorAll('.ant-table-body'));
        super.componentDidMount();
    }

    render() {
        const { input: { value, ...input }, data, ux_pattern, type, class: rowClass = () => { }, t, value_key, height = 600 } = this.props;
        const { index } = this.state;
        return (
            <div style={{ display: 'grid', gridGap: '10px' }}>
                {index == -1 && this.extraActions.filter(d => apply_permissions(value, d, "permissions", { list: value, itemIndex: index })).map((action, key) => (
                    <Button className="add-button" key={key} onClick={action.action}>{t(`actions:${action.name}`)}</Button>
                ))}
                <Table
                    className="modal-table"
                    locale={{ emptyText: t('messages:No data') }}
                    {...input}
                    type={type}
                    columns={this.columns}
                    scroll={ux_pattern == 'infiniteScrolling' ? { y: height } : undefined}
                    dataSource={data || []}
                    rowKey={value_key}
                    pagination={this.paginationConfig || false}
                    rowClassName={rowClass} />

            </div>
        )
    }
}

export const tableList = connectList(translate('actions','messages')(tableListComponent))