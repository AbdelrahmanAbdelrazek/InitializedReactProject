import {get} from 'lodash';
export const mapStateToProps = ({selectors = {}, mainApp, mapViewer}, ownProps) => ({
    lang: mainApp.language,
    selectors,
    apps: mainApp.apps,
    info: get(mapViewer, 'info.info', {}),
    ...selectors[ownProps.moduleName] || {},
    value_key: get(selectors[ownProps.moduleName], 'value_key', ownProps.value_key)
})

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
        addToData: (data, index, operation) => {
            dispatch({
                type: 'insertInArraySelectors',
                path: `${moduleName}.data`,
                operation,
                index,
                data
            })
        },
        setNextUrl: (nextUrl) => {
            dispatch({
                type: 'setSelectors',
                path: `${moduleName}.infiniteScrolling.nextUrl`,
                data: nextUrl
            })
        },
        addNewSelector: (moduleName, data) => {
            dispatch({
                type: 'setSelectors',
                path: moduleName,
                data
            })
        },
        removeSelector: (moduleName)=> {
            dispatch({
                type: 'removeSelectors',
                path: moduleName
            })
        }
    }
}
