import { fetchData } from 'helpers/apiMethods';
import { get } from 'lodash';
import { fetchAllData } from 'helpers/functions';

export function getPaginatedData(props, onMount) {
    const { crud: { fetch }, setItemsCount, addToData, api_config, setTotalPages, pagination = {}, pageSize: propsPageSize, initialPage = 1 } = props;
    const { pageSize = propsPageSize, currentPage = 1 } = pagination;
    const shift = initialPage - 1
    fetchData(fetch, {
        ...api_config,
        params: {
            ...get(api_config, 'params'),
            pageSize,
            page: currentPage + shift
        }
    })
        .then(({ results, totalPages, count }) => {
            setTotalPages(totalPages);
            addToData(results, (currentPage - 1) * pageSize, 'rewrite');
            setItemsCount(count);
            this.loading = false;
            // if (onMount) {
            //     fetchData(fetch, {
            //         ...api_config,
            //         params: {
            //             ...get(api_config, 'params'),
            //             size: pageSize,
            //             page: totalPages
            //         }
            //     })
            //         .then(({ results }) => {
            //             setItemsCount((totalPages - 1) * pageSize + results.length);
            //         })
            // }
        })
}

export function getScrollingData(props, onMount) {
    const { crud: { fetch }, addToData, setData, api_config, setNextUrl, infiniteScrolling = {}, pageSize } = props;
    const { nextUrl } = infiniteScrolling;
    if (onMount) {
        fetchData(fetch, {
            ...api_config,
            params: {
                ...get(api_config, 'params'),
                pageSize
            }
        })
            .then(({ results, next }) => {
                setData(results);
                setNextUrl(next)
                this.loading = false;
            })
    }
    else {
        fetchData(nextUrl, api_config)
            .then(({ results, next }) => {
                addToData(results, -1);
                setNextUrl(next);
                this.loading = false;
            })
    }
}

export function getAllData(props) {
    const { crud: { fetch }, api_config, setData } = props;
    fetchAllData(fetch, api_config)
        .then(data => {
            setData(data);
            this.loading = false;
        });
}