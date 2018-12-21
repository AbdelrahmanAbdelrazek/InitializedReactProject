import axios from 'axios';
import {productionUrl} from 'config';
import {get} from 'lodash';

export function fetchData(api_url, config) {
    if (api_url){
        const url = api_url.includes("http")? api_url : productionUrl + api_url ;
        return axios
            .get(url , config)
            .then(({ data }) => data)
    }
}

export function postNewItem(api_url, item, config) {
    const url = api_url.includes("http")? api_url :  productionUrl + api_url ;    
    return axios
        .post(url, item, config)
        .then(({ data }) => data)
}

export function updateItem(api_url, item, itemId, config) {
    const url = api_url.includes("http")? api_url :  productionUrl + api_url ;
    return axios
        .put(url +'/' + itemId, item, config)
        .then(({ data }) => (data))
}

export function deleteItem(api_url, itemId, config) {
    const url = api_url.includes("http")? api_url :  productionUrl + api_url ;
    return axios
        .delete(url +'/' + itemId, config)
        .then(({ data }) => (data))
}

export function fetchAllData(api_url, config) {
    return new Promise((resolve, reject) => {
        fetchData(api_url, config)
            .then(response => {
                const nextLink = get(response, 'links.next');
                if (nextLink) {
                    fetchAllData(nextLink).then(data => {
                        resolve([...response.data, ...data])
                    })
                } else {
                    resolve(response.data);
                }
            })
    })
}