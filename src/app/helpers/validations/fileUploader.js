import {get, words} from 'lodash';

export const fileType = type => value => {
    const fileType = get(value, 'fileToBeUploaded.type');
    const reg = new RegExp(words(type).join('|'));
    return value && !reg.test(fileType) ? 'نوع الملف غير صالح' : undefined; 
}

export const maxFileNum = num => value => {
    const chosenFile = get(value, 'fileToBeUploaded', 0) ? 1 : 0
    const length = value? get(value, 'files', []).length +  chosenFile : 0 
    return (length > num) ? `لا يمكن رفع أكثر من ${num} ملف` : undefined;
}