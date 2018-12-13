export const maxValue = max => value =>
value && value > max
    ? `يجب ان تكون القيمة اقل من ${max}`
    : undefined

export const minValue = min => value =>
(value && value < min)
    ? `القيمة يجب ان تكون اكبر من ${min}`
    : undefined

export const precision = precision => value => {
    const afterDot = value? value.toString().split('.')[1] : undefined; 
    return value && afterDot && afterDot.length > precision? 
`يجب ان تكون الدقة ${precision} او اقل` : undefined
}

export const scale = scale => value => { 
    return value && value.toString().replace('.', '').length > scale? 
`يجب ان يكون المقياس ${scale} او اقل` : undefined
}
