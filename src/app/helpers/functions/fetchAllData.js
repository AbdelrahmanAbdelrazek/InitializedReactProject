import {fetchData} from 'helpers/apiMethods';

export function fetchAllData(url, config) {
    return new Promise((resolve, reject) => {
        fetchData(url, config)
            .then(response => {
                if (response.next) {
                    fetchAllData(response.next).then(data => {
                        resolve([...response.results, ...data])
                    })
                } else {
                    resolve(response.results);
                }
            })
    })
}