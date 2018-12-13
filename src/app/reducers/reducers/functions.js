import { set, omit, pick, get, cloneDeep } from 'lodash';

export const set__REDUCER__ = (state, payload) => {
    if (!payload.path) {
        return { ...payload.data }
    }
    let newState = cloneDeep(state);
    set(newState, payload.path, payload.data);
    return newState;
}

export const remove__REDUCER__ = (state, payload) => {
    return omit(state, payload.path);
}

export const reset__REDUCER__ = (state, payload) => {
    return pick(state, payload.path);
}

export const insertInArray__REDUCER__ = (state, payload) => {
    const { path, data, index:_index, operation } = payload
    const isDataArray = Array.isArray(data);
    if (isDataArray && !data.length) {
        return state
    }
    let newState = cloneDeep(state);
    const array = get(newState, path, []);
    const index = _index==-1? array.length : _index;
    isDataArray && index>array.length-1? set(array, index + data.length -1, undefined) : null;
    if (operation === 'rewrite' || (isDataArray && array[index+data.length-1] == undefined)){
        isDataArray? array.splice(index, data.length,  ...data )
        : array.splice(index, 1,  data )
    } else {
        isDataArray? array.splice(index, 0,  ...data )
        : array.splice(index, 0,  data )
    }
    set(newState, payload.path, array);
    return newState;
}
