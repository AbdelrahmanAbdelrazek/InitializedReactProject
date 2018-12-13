import { get, uniqBy, isEqual, filter, every } from 'lodash';

export const required = isRequired => value => {
    return ((!get(value, 'length', value)) && isRequired ? 'Required' : undefined);
}

export const requiredCustom = list => value => {
    return (filter(value, v => every(list, attr => get(v, attr))).length != value.length) ? "تأكد من ادخال التعديلات" : undefined
}
export const postiveNumber = req => value => {
    return ((value && value < 0) ? 'لا يمكن إدخال رقم سالب' : undefined);
}

export const conditionalNotRequired = list => (value, values) =>
    (!list.some(d => {
        const fieldValue = get(values, d);
        return get(fieldValue, 'length', fieldValue)
    }) && !get(value, 'length', value)) ? 'Required' : undefined

export const maxLength = (max, field) => value => {
    if (get(field, "isFixed", false)) {
        return undefined
    }
    return value && value.length > max
        ? `يجب ان يكون ${max} خانة او اقل`
        : undefined
}


export const minLength = min => value =>
    value && value.length <= min
        ? `يجب ان يكون اكبر من ${min} خانات`
        : undefined

export const isFixed = (isFixed, { maxLength }) => value =>
    value && isFixed && !(value.length == maxLength) ?
        `يجب ان يكون ${maxLength} خانات` : undefined

export const checkUnique = (params, field) => (v, values) => {
    const value = get(values, params.list, []);
    if (value && value.length) {
        const uniqList = uniqBy(value, params.key);
        return (uniqList.length == value.length) ? undefined : `لا يمكن التكرار`
    }
    return undefined
}
export const checkCount = () => (v, values) => {
    const value = values.cads;
    const ground = filter(value, { 'floortypeid': 30 })
    const Mezzanine = filter(value, { 'floortypeid': 40 })
    const GroundExtension = filter(value, { 'floortypeid': 10 })
    const Roof = filter(value, { 'floortypeid': 60 })

    if (Mezzanine.length > 1) {
        return "لا يمكن ادخال اكثر من ميزانين";
    }
    if (GroundExtension.length > 1) {
        return "لا يمكن ادخال اكثر من ملحق ارضي";
    }
    if (Roof.length > 1) {
        return "لا يمكن ادخال اكثر من علوي";
    }
    if (ground.length > 1) {

        return "لا يمكن ادخال اكثر من ارضي";
    }
    if (ground.length < 1) {
        return "لابد من ادخال الطابق الارضي";
    }
}
export const checkGround = () => (v, values) => {
    const value = values.cads;
    const ground = filter(value, { 'floortypeid': 30 })
    if (ground.length < 1) {
        return "لابد من ادخال ارضي";
    }
}


export const match = field => (value, values) =>
    value && !isEqual(get(values, field), value) ? 'Fields do not match' : undefined

export const regexValid = reg => value => value && !(new RegExp(reg, 'i').test(String(value)))
    ? 'Invalid data'
    : undefined

export const emailValid = isEmail => value =>
    value && isEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(value))? 'مدخل غير صحيح' : undefined;