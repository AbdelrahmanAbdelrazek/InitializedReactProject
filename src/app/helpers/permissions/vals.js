import {some} from 'lodash'

export const match_value = ((values, params={}) => {
    return !some([values], params)
})
export const show_match_value = ((values, params={}) => {
    return some([values], params)
})

export const not_match_value = ((values, params={}) => {
    return !some([values], params)
})

