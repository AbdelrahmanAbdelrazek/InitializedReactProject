import axios from 'axios';
import {productionUrl} from 'config';

export function fetchData(api_url, config) {
    if (api_url){
        const url = api_url.includes("http")? api_url : productionUrl.replace('/InvestAPI', '') + api_url ;
        return axios
            .get(url , config)
            .then(({ data }) => data)
            .catch(error => {
                throw error.response;
            })
    }
    return Promise.resolve([])
}

export function postNewItem(api_url, item, config) {
    const url = api_url.includes("http")? api_url :  productionUrl.replace('/InvestAPI', '') + api_url ;    
    return axios
        .post(url, item, config)
        .then(({ data }) => data)
        .catch(error => {
            throw error.response;
        })
}

export function updateItem(api_url, item, itemId, config) {
    const url = api_url.includes("http")? api_url :  productionUrl.replace('/InvestAPI', '') + api_url ;
    return axios
        .put(url +'/' + itemId, item, config)
        .then(({ data }) => (data))
        .catch(error => {
            throw error.response;
        })
}

export function deleteItem(api_url, itemId, config) {
    const url = api_url.includes("http")? api_url :  productionUrl.replace('/InvestAPI', '') + api_url ;
    return axios
        .delete(url +'/' + itemId, config)
        .then(({ data }) => (data))
        .catch(error => {
            throw error.response;
        })
}
