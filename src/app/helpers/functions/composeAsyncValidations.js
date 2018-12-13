import { map, get, isEmpty, pickBy } from 'lodash';
import * as asyncFuncs from 'helpers/asyncValidations';
import {delayedPromise} from 'helpers/functions';

export const composeAsyncValidations = (fieldsPath, currentAppPath) => (values, dispatch, props, currentField) => {
    const { asyncErrors } = props;
    const fields = get(props, fieldsPath, [])
    const field = fields.find(d => d.name === currentField) || {};
    if (field) {
        const currentFieldValue = get(values, currentField, '');
        const currentApp = get(props, currentAppPath);
        const validatesPromises = map(field, (value, key) =>
            ({ value, fun: get(asyncFuncs, key, null) })).filter(d => d.fun);
        if (validatesPromises.length) {
            return delayedPromise(() => Promise.all(validatesPromises.map(d => d.fun(d.value, currentFieldValue, asyncErrors, field, currentApp, props))), 500).then(() => true)
        }
    }
    return Promise.resolve(true).then(() => {
        const errors = pickBy(asyncErrors, d => (d));
        if (!isEmpty(errors)) {
            throw { ...errors };
        }
        return true
    })
}
