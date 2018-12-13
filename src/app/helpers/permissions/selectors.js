import {get, flatten, findIndex, filter, find, difference, keys, isEqual} from 'lodash';

export const hide_every = (values, params=[])=>{
    return !params.every(d=>get(values, d))
}

export const hide_every_props = (values, params=[], props)=>{
    return !params.every(d=>get(props, d))
}

export const hide_any = (values, params=[])=>{
    return !params.some(d =>get(values, d))
}
export const hide_any_props = (values, params=[], props)=>{
    return !params.some(d=>get(props, d))
}

export const show_any = (values, params=[])=>{
    return params.some(d =>get(values, d))
}

export const show_any_props = (values, params=[], props)=>{
    return params.some(d =>get(props, d))
}

export const show_every = (values, params=[])=>{
    return params.every(d=>get(values, d))
}

export const show_every_props = (values, params=[], props)=>{
    return params.every(d=>get(props, d))
}

export const show_if_props_equal = (values, {key, value}, props)=>{
    return isEqual(get(props, key), value)
}
export const show_check_index = (values, params, {list, itemIndex}) => {
    let index = params;
    if(params < 0){
        index = list.length + params
    }
    return itemIndex == index
}
export const hide_check_index = (values, params, {list, itemIndex}) => {
    let index = params;
    if(params < 0){
        index = list.length + params
    }
    return itemIndex != index
}
export const hide_check_index_multi = (values, params, {list, itemIndex}) => {
    let index = params.index;
    let indexs = flatten(params.keys.map(d=>filter(list, d).map((d, i, l)=>({index: findIndex(list, d), dataIndex: i, negIndex: i-l.length}))))
    if(index < 0){
        return !find(indexs, {index: itemIndex, negIndex: index})
    }
    return !find(indexs, {index: itemIndex, dataIndex: index})
}

export const object_has_list = (values, {objectKey, listKey}, props) => {
    const object = get(props, objectKey);
    const list =  get(props, listKey);
    return  !difference(list, keys(object)).length;
}

export const hide = () => (false)
export const show = () => (true)