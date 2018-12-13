import Axios from "axios";
import { set } from 'lodash';
// import { adminUrl } from 'config';

export const unique = (value, currentFieldValue, asyncErrors, field, currentApp) => {
    // const url = String(value).includes("http") ? value : `${adminUrl}${get(currentApp, 'api_url')}/CheckUnique`
    const params = { columnName: field.name, value: currentFieldValue }
    return Axios.get(value, { params })
        .then(res => true)
        .catch(res => {
            throw set({...asyncErrors}, field.name, `${field.label} already exists`)
        })
}