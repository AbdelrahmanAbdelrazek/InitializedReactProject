import React from 'react'
import { Field } from 'redux-form';
import renderField from 'components/inputs';
import { isEqual, pick, get, set, sortBy, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapping';
import { postItem, updateItem, deleteItem } from 'helpers/apiMethods'
import mainInput from 'helpers/main/input';
import * as fieldValues from 'helpers/fieldValues';
import { apply_permissions, serverFieldMapper } from 'helpers/functions';
import { Button } from 'antd';
import { getPaginatedData, getScrollingData, getAllData } from './loadData';

export class list extends mainInput {
    constructor(props) {
        super(props)
        const { fields = [], t, setCurrentPage, setPageSize, permissions = {}, pagination = {}, pageSize: propsPageSize } = props;
        const { currentPage = 1, pageSize = propsPageSize } = pagination;
        setCurrentPage(currentPage);
        setPageSize(pageSize);
        this.fields = fields.map(f => {
            f.hideLabel = ['boolean', 'multiChecks'].includes(f.field) ? true : f.hideLabel;
            f.label = t(`labels:${f.label}`)
            return serverFieldMapper(f);
        })
        this.state = {};
        this.state.columns = this.buildColumns();
        this.extraActions = [{
            action: this.add_row.bind(this),
            name: 'Add',
            permissions: get(permissions, "actions.create", null)
        }]
        this.onScroll = this.onScroll.bind(this);
        this.loading = false;
        if (!props.input.value) {
            this.handleChange([])
        }
    }
    buildColumns() {
        const { t, actions: pActions = [], permissions = {} } = this.props;
        this.columns = [...this.fields.map(d => ({
            title: t(`labels:${d.label}`),
            key: d.show || d.name,
            dataIndex: d.show || d.name,
            render: (value, record, index) => this.cellRender(d, value, record, index)
        })),
        {
            title: t('labels:actions'),
            key: 'actions',
            dataIndex: 'actions',
            render: (value, record, index) => this.actionRender(record, index)
        }]
        this.actions = [{
            action: this.edit_action,
            name: 'Edit',
            icon: 'fa fa-pencil',
            permissions: get(permissions, "actions.edit", null)
        },
        {
            action: this.delete_action,
            name: 'Delete',
            msg: "Are you sure you want to delete this item?",
            show: 'confirmAction',
            icon: 'fa fa-trash-o',
            permissions: get(permissions, "actions.delete", null)
        },
        ...pActions]
        this.state = {
            index: -1,
            old_data: ""
        }

    }
    shouldComponentUpdate(nextProps, nextState) {
        const { index } = this.state;
        const { data, pagination = {}, input: { value } } = this.props;
        const { currentPage, pageSize, failed, itemsCount } = pagination
        const { data: nextData, pagination: nextPagination = {}, ux_pattern, input: { value: nextValue } } = nextProps;
        const { currentPage: nextCurrentPage, itemsCount: nextItemsCount, pageSize: nextPageSize, failed: nextFailed } = nextPagination;
        return (!isEqual(nextData, data) || !isEqual(nextValue, value))
            || (nextState.index != this.state.index)
            || (index > -1 && !isEqual(nextProps.input.value[index], this.props.input.value[index]))
            || (ux_pattern === 'pagination'
                && (!isEqual(pageSize, nextPageSize)
                    || !isEqual(itemsCount, nextItemsCount)
                    || !isEqual(currentPage, nextCurrentPage)
                    || !isEqual(failed, nextFailed)));
    }

    componentDidMount() {
        const { data = [], crud = {}, setData, setValueLabelKeys, value_key, label_key, ux_pattern } = this.props;
        const { fetch } = crud;
        data ? this.handleChange(data) : null;
        if (ux_pattern == 'infiniteScrolling') {
            this.setScrollEvents();
        }
        if (!data.length) {
            setValueLabelKeys(label_key, value_key);
            fetch ? this.loadData(this.props, true) : null;
        }
        else {
            if (data.length) {
                setData(data);
            }
            else {
                this.handleChange([]);
            }
        }
    }

    setPaginationConfig(currentPage, total, pageSize) {
        const { setCurrentPage } = this.props;
        this.paginationConfig = {
            current: currentPage,
            total,
            pageSize,
            onChange: (page) => setCurrentPage(page)
        }
    }

    loadData(props, onMount) {
        const { ux_pattern } = props;
        if(this.loading){
            return;
        }
        this.loading = true;
        switch (ux_pattern) {
            case 'pagination': {     
                getPaginatedData.call(this, props, onMount);
                break;
            }
            case 'infiniteScrolling': {
                getScrollingData.call(this, props, onMount);
                break;
            }
            default: {
                getAllData.call(this, props);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        const { data, pagination = {} } = this.props;
        const { currentPage, pageSize, failed, itemsCount } = pagination;
        const { data: nextData, pagination: nextPagination = {}, ux_pattern, crud={}} = nextProps;
        const { currentPage: nextCurrentPage, itemsCount: nextItemsCount, pageSize: nextPageSize, failed: nextFailed } = nextPagination;
        const {fetch} = crud;
        if (!isEqual(data, nextData)) {
            this.handleChange(nextData);
            ux_pattern === 'pagination' ? this.setPaginationConfig(nextCurrentPage, nextItemsCount, nextPageSize) : null
        }
        if ((nextFailed != failed) && nextFailed) {
            this.loadData(nextProps);
        }
        if (ux_pattern === 'pagination' &&
            (!isEqual(pageSize, nextPageSize)
                || !isEqual(itemsCount, nextItemsCount)
                || !isEqual(currentPage, nextCurrentPage))) {
            this.setPaginationConfig(nextCurrentPage, nextItemsCount, nextPageSize);
        }
        if (!isEqual(data, nextData) && nextData.length == 0) {
            const { label_key, value_key, setValueLabelKeys } = nextProps;
            setValueLabelKeys(label_key, value_key);
            fetch ? this.loadData(this.props, true) : null;
        }
    }

    handleChange(value) {
        const { onChange } = this.props.input;
        const { setData, sortby, ux_pattern } = this.props;
        const data = sortBy(value, sortby)
        if (ux_pattern != 'pagination') {
            setData(data);
        }
        onChange(value);
    }

    calculateIndex(index) {
        const { pagination = {}, ux_pattern } = this.props;
        const { currentPage, pageSize } = pagination;
        return ux_pattern != 'pagination' ? index : ((currentPage - 1) * pageSize) + index
    }
    save_data(index, ev) {
        const { params = [], values = {}, crud = {}, value_key, fields = [], preSave = (data) => (Promise.resolve(data)), addToData, editData, untouch, touch = () => { }, meta: { error = [{}] }, api_config } = this.props;
        const { createUrl, updateUrl } = crud;
        const { old_data = {} } = this.state;
        const { value, name } = this.props.input;
        const fieldsName = this.fields.map(d => d.name);
        const errors = Array.isArray(error) ? pick(error.reduce((d, o) => ({ ...o, ...d }), 0), fieldsName) : error
        const calculatedIndex = this.calculateIndex(index)
        if (isEmpty(errors)) {
            preSave(pick(value[index], fields.map(f => f.name)), value, values)
                .then(newItem => {
                    if (!isEmpty(old_data)) {
                        if (updateUrl) {
                            const id = value[index][value_key]
                            updateItem(updateUrl, newItem, id, { ...api_config, params: { ...get(api_config, params), ...pick(values, params) } })
                                .then((response) => {
                                    if (window.cadsId && newItem.floorfilepath) {
                                        window.cadsId = window.cadsId.filter(d => (d != id))
                                    }

                                    editData(this.calculateIndex(index), response);
                                    this.edit_index(-1);
                                    this.setState({ old_data: null })

                                })
                        } else {
                            editData(this.calculateIndex(index), newItem);
                            this.edit_index(-1);
                            this.setState({ old_data: null })

                        }
                    }
                    else {
                        if (createUrl) {
                            postItem(createUrl, newItem,
                                { ...api_config, params: { ...get(api_config, 'params'), ...pick(values, params) } })
                                .then((response) => {
                                    addToData(response, calculatedIndex, 'rewrite');
                                    this.setState({ old_data: null })
                                    this.edit_index(-1);
                                    untouch(...fieldsName.map(d => `${name}[${index}].${d}`))

                                });
                        } else {
                            addToData(newItem, calculatedIndex, 'rewrite');
                            this.setState({ old_data: null })
                            this.edit_index(-1);
                            untouch(...fieldsName.map(d => `${name}[${index}].${d}`))
                        }
                    }
                })
        }
        else {
            touch(...fieldsName.map(d => `${name}[${index}].${d}`))
        }
    }

    delete_action = (index, item) => {
        const { params = [], values = {}, crud = {}, value_key, removeFromData, api_config, setItemsCount, pagination = {},  postDelete = () =>{} } = this.props;
        const { itemsCount } = pagination;
        if (crud.deleteUrl) {
            deleteItem(crud.deleteUrl, get(item, value_key), { ...api_config, params: { ...get(api_config, params), ...pick(values, params) } })
                .then(response => {
                    removeFromData(this.calculateIndex(index));
                    setItemsCount(itemsCount - 1);
                    postDelete(index, item, this.props);
                });

        } else {
            removeFromData(this.calculateIndex(index));
            setItemsCount(itemsCount - 1);
            postDelete(index, item, this.props);
        }
    }

    cancel_action = (key) => {
        let { name, value } = this.props.input;
        const { untouch, removeFromData, setItemsCount, pagination = {} } = this.props;
        const { itemsCount } = pagination;
        const fieldsName = this.fields.map(d => d.name);
        value = [...value];
        const { old_data } = this.state
        if (old_data) {
            value[key] = old_data
        } else {
            removeFromData(this.calculateIndex(key));
            setItemsCount(itemsCount - 1);
        }
        this.setState({
            index: -1,
            old_data: null
        })
        untouch(...fieldsName.map(d => `${name}[${key}].${d}`))
    }

    edit_index = (index) => {
        this.setState({
            index
        })
    }

    edit_action = (index, data) => {
        this.setState({
            old_data: data
        })

        this.edit_index(index)
    }

    add_row = () => {
        const { value_key, pagination = {}, addToData, addFrom = 'top', data, setItemsCount, ux_pattern } = this.props;
        const { pageSize = 20, itemsCount, currentPage = 1 } = pagination
        const shift = addFrom == 'top' ? 0 : (ux_pattern == 'pagination' && data.length == pageSize) ? data.length - 1 : data.length;
        addToData(
            set({}, value_key, 'EDIT'),
            (currentPage - 1) * pageSize + shift
        )
        setItemsCount(itemsCount + 1);
        this.edit_index(shift);
        this.listDiv.scrollTop = addFrom == 'top' ? 0 : this.listDiv.scrollHeight - this.listDiv.clientHeight;
    }

    actionRender = (record, index) => {
        const { t } = this.props;
        if (this.state.index == -1) {
            const { t, input: { value } } = this.props;
            const actions = this.actions.filter(d => apply_permissions(record, d, "permissions", { list: value, itemIndex: index })).map((d) => {
                const ActionComponent = get(this.ActionsComponents, d.show, this.ActionsComponents.mainStyle);
                return <ActionComponent key={d.name} {...{ ...d, t, clickAction: () => d.action(index, record, this.props) }} />
            })
            return actions
        }
        else if (this.state.index == index) {
            const actions = [<Button className="save" key='save' onClick={() => this.save_data(index)}>{t("actions:Save")}</Button>,
            <Button className="cancel" key='cancel' onClick={() => this.cancel_action(index)}>{t("actions:Cancel")}</Button>]
            return actions
        }
    }

    setScrollEvents() {
        this.listDiv.addEventListener('scroll', this.onScroll)
    }
    componentWillUnmount() {
        this.listDiv ? this.listDiv.removeEventListener('scroll', this.onScroll) : null;
    }

    onScroll(event) {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop;
        if (currentScroll >= maxScroll) {
            if (get(this.props, 'infiniteScrolling.nextUrl')) {
                getScrollingData.call(this, this.props);
            }
        }
    }

    cellRender({ name: fname, ...field }, data, record, index) {
        const { name, value } = this.props.input;
        if (index == this.state.index) {
            const { values: mainValues } = this.props;
            return apply_permissions({ ...mainValues, ...value[index] }, field, 'permissions') &&
                <Field
                    key={`${name}[${index}].${fname}`}
                    name={`${name}[${index}].${fname}`}
                    component={renderField}
                    {...{ ...field, ...pick(this.props, ['touch', 'untouch', 'change']) }} />
        }
        const label = !this.props.hideLabels && !field.hideLabel? <label>{get(field, 'label')} :</label> : null
        const fieldValue = get(fieldValues, field.field, (text) => text)(data, record, { name: fname, ...field }, { ...field })
        if(fieldValue){
            return <div key={`${name}[${index}].${fname}`}>
                {label} {fieldValue}
            </div>
        }
        else{
                return null
            }
    } 
}

export function connectList(component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
