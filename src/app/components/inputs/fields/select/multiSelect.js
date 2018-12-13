import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapping';
import { get} from 'lodash';
import select from './select'
const Option = Select.Option;
class multiSelectComponent extends select {
    handleChange(value, options) {
        const {maxChoices} = this.props;
        const { input: {onChange} } = this.props;
        // onChange(value)
        maxChoices? value.length <= maxChoices && onChange(value): onChange(value);
        
    }
    render() {
        const { input: { value, ...input }, label, placeholder, data = [], label_key = "label", value_key = "value" } = this.props;
        return (
            <Select
                mode="multiple"
                showSearch
                getPopupContainer={trigger => trigger.parentNode}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                value={value == '' ? undefined : value}
                {...input}
                onChange={this.handleChange.bind(this)}
                placeholder={placeholder ? placeholder : label}
            >
                {data.map((d) => (
                    <Option value={get(d, value_key)} data={d} key={get(d, value_key)}>{get(d, label_key)}</Option>)
                )}

            </Select>
        )
    }
}


export const multiSelect = connect(mapStateToProps, mapDispatchToProps)(multiSelectComponent)