import React from 'react';
import { Icon } from 'antd';
import { get } from 'lodash';
// import Gallery from 'react-grid-gallery';

export const boolean = (value) => {
    let icon = <Icon type="minus-circle" theme="outlined" />;
    if (!(value === null || value === undefined)) {
        icon = value ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="red" />
    }
    return icon;
}


export const select = (value, record, field, { data = [], label_key = 'label', value_key = 'value' }) => {
    const fData = get(field, 'data', []);
    if (fData.length) {
        return get(fData.find(d => (get(d, field.value_key || value_key) == value)), field.label_key || label_key, value)
    }
    return value
}

// export const gallery = (value, record, { absolute=true, serverUrl, image_key = 'path', thumbnailHeight = 200, thumbnail_key, thumbnailWidth = 200 }, props) => {
//     if (value && value.length) {
//         const images = value.map(img => { 
//             const src = absolute? get(img, image_key, '') : `${serverUrl}/${get(img, image_key, '')}`;
//             const thumbnail = thumbnail_key?  absolute? get(img, image_key, '') : `${serverUrl}/${get(img, image_key, '')}` : src;
//             return {
//             src,
//             thumbnail,
//             thumbnailWidth,
//             thumbnailHeight
//         }})
//         return <Gallery {...{ images }} enableImageSelection={false} />
//     }
// }