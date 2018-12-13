import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapping';
import { get, has, isEqual, omit } from 'lodash';
import { fetchAllData } from 'helpers/functions'
import { translate } from 'react-i18next'
import mainInput from 'helpers/main/input';
import { fetchData } from 'helpers/apiMethods';
const Option = Select.Option;
export default class selectComponent extends mainInput {
    componentDidMount() {
        const { moduleName, apps, data = [], input: { value }, selectChange, value_key = 'value', setValueLabelKeys, setData, fetch, ux_pattern } = this.props;
        if (!data.length && has(apps, moduleName)) {
            const { value_key = get(apps, `${moduleName}.primary_key`),
                label_key = get(apps, `${moduleName}.select_show`)
            } = this.props;
            setValueLabelKeys(label_key, value_key);
            fetchAllData(get(apps, `${moduleName}.api_url`))
                .then(data => {
                    setData(data)
                });
        } else if (!data.length && fetch) {
            ux_pattern == 'infiniteScrolling' ? this.getScrollingData(this.props, true) :
                fetchAllData(fetch)
                    .then(data => {
                        setData(data)
                    });
        }
        if (value && selectChange) {
            const selectedRow = data.find(d => (isEqual(get(d, value_key), value)));
            selectChange(value, selectedRow, this.props);
        }
    }

    getScrollingData(props, onMount) {
        const { fetch, addToData, setData, api_config, setNextUrl, infiniteScrolling = {}, pageSize = 20 } = props;
        const { nextUrl } = infiniteScrolling;
        if (onMount) {
            return fetchData(fetch, {
                ...api_config,
                params: {
                    ...get(api_config, 'params'),
                    pageSize: pageSize
                }
            })
                .then(({ results, next }) => {
                    setData(results);
                    setNextUrl(next)
                })
        }
        else {
            return fetchData(nextUrl, omit(api_config, 'params'))
                .then(({ results, next }) => {
                    addToData(results, -1);
                    setNextUrl(next);
                })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (!isEqual(nextProps.data, this.props.data)) || 
        (!isEqual(nextProps.input.value, this.props.input.value)) ||
        (!isEqual(nextProps.lang, this.props.lang));
    }
    componentDidUpdate(prevProps, prevState) {
        const { data, input: { value }, selectChange, resetFields, change } = prevProps;
        const { data: nextData = [], input: { value: nextValue }, value_key = 'value' } = this.props;
        if (this.props.data && !isEqual(this.props.data, this.props.data)) {
            if (this.props.data.length == 1) {
                this.props.input.onChange(get(this.props.data[0], value_key));
            }
        }
        if (nextValue == "" && value) {
            selectChange && selectChange(nextValue, null, this.props);
        }
        if (nextData.length && (String(nextValue) != "") && (!isEqual(value, nextValue) || !isEqual(data, nextData))) {
            resetFields && resetFields.map(f => change(f, ''));
            if (selectChange) {
                const selectedRow = nextData.find(d => (isEqual(get(d, value_key), nextValue)));
                selectChange(nextValue, selectedRow, this.props);
            }
        }
    }

    handleChange(value, options) {
        const { input: { onChange }, resetFields, change } = this.props;
        resetFields && resetFields.map(f => change(f, ''));
        onChange(value);
    }
    onScroll(event) {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop;
        event.persist()
        if (currentScroll >= maxScroll) {
            if (get(this.props, 'infiniteScrolling.nextUrl')) {
                this.getScrollingData(this.props)
                    .then(() => event.target.scrollTop = currentScroll);
            }
        }
    }
    render() {
        const { input: { value, ...input }, label, placeholder, data = [], label_key = "label", value_key = "value", t } = this.props;
        return (
            <Select
                onPopupScroll={this.onScroll.bind(this)}
                showSearch
                getPopupContainer={trigger => trigger.parentNode}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(String(input).toLowerCase()) >= 0}
                value={value === '' ? undefined : value}
                {...input}
                onChange={this.handleChange.bind(this)}
                placeholder={placeholder ? placeholder : t(label)}
            >
                {data.map((d) => (
                    <Option value={get(d, value_key)} data={d} key={get(d, value_key)}>{t(get(d, label_key))}</Option>)
                )}

            </Select>
        )
    }
}


export const select = connect(mapStateToProps, mapDispatchToProps)(translate('labels')(selectComponent))
