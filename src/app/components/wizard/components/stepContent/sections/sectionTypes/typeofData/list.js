import React, { Component } from 'react'
import {Table} from 'antd';
import {map} from 'lodash';
export class list extends Component {
    constructor(props) {
        super(props);
        this.columns = map(props.data[0] || {},(k,v)=>({title:k,dataIndex:k}))
    }
  render() {
    const data=this.props;
    return (
            <Table columns={this.columns} dataSource={data} />
    )
  }
}
