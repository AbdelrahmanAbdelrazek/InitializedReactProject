import { get } from "lodash";

export const mapStateToProps = ({ selectors }, ownProps) => {
    const { moduleName, ux_pattern, pageSize: propsPageSize = 20} = ownProps;
    const { pagination = {} } = get(selectors, moduleName, {});
    let { pageSize = propsPageSize, currentPage = 1, totalPages = 0, itemsCount = propsPageSize } = pagination
    let allData = get(selectors, `${moduleName}.data`, ownProps.data||[]);
    let data = null;
    let failed = false;
    if (ux_pattern === 'pagination') {
        const firstIndex = (currentPage - 1) * pageSize;
        data = allData.slice(firstIndex, firstIndex + pageSize).filter(d => d != undefined || d != null)
        let arrayLength = currentPage == totalPages ? (itemsCount - firstIndex) : pageSize
        if (data.length < arrayLength && arrayLength <= pageSize) {
            failed = true;
        }
    }
    return {
        ...get(selectors, moduleName, {}),
        pagination: {
            ...get(selectors, `${moduleName}.pagination`, {}),
            failed
        },
        data: data||allData
    }
}

export const mapDispatchToProps = (dispatch, { moduleName }) => {
    return {
        setValueLabelKeys: (label_key, value_key) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.label_key`,
                data: label_key
            });
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.value_key`,
                data: value_key
            });
        },
        setData: (data) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.data`,
                data
            })
        },
        editData: (index, data) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.data[${index}]`,
                data
            })
        },
        addToData: (data, index, operation) => {
            dispatch({
                type: 'insertInArraySelectors',
                path: `${moduleName}.data`,
                operation,
                index,
                data
            })
        },
        removeFromData: (index) => {
            dispatch({
                type: 'removeSelectors',
                path: `${moduleName}.data`,
                index
            })
        },
        setCurrentPage: (pageNum) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.pagination.currentPage`,
                data: pageNum
            })
        },
        setPageSize: (pageSize) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.pagination.pageSize`,
                data: pageSize
            })
        },
        setTotalPages: (totalPages) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.pagination.totalPages`,
                data: totalPages
            })
        },
        setItemsCount: (itemsCount) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.pagination.itemsCount`,
                data: itemsCount
            })
        },
        setNextUrl: (nextUrl) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.infiniteScrolling.nextUrl`,
                data: nextUrl
            })
        },
    }
}