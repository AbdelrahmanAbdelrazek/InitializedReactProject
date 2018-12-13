import React, { Component } from 'react'
import { Upload, Button, Icon } from "antd";
import { post } from 'axios';
// import { serverUrl} from 'config';
import { translate } from "react-i18next";
import { get, words } from 'lodash';

class fileUploaderComponent extends Component {

    state={
        disabled:false
    }

    uploadFile(file) {
        const { input: { onChange, onBlur, value }, fileType = '', uploadUrl, maxFileNum } = this.props;
        const formData = new window.FormData();
        const regex = new RegExp (words(fileType).join('|'));
        onChange({ ...value, fileToBeUploaded: file });
        onBlur({ ...value, fileToBeUploaded: file });
        formData.append('attachment', file);
        
        const length = value? get(value,'files',[]).length : 0;
        const validateLength = maxFileNum ? !(length >= maxFileNum) : true
        if (regex.test(file.type) && validateLength) {
            post(uploadUrl, formData,
                {
                    headers:
                        { "Content-Type": 'multipart/form-data' }
                }
            ).then(({data}) => {
                const files = get(value, 'files', []);
                onChange({
                    fileToBeUploaded: file,
                    files: [...files, { file, response:data[0] }]
                })
                return data;
            })
        }
        return false
    }

    render() {
        const { input: { value }, t, label, fileType = '' } = this.props;
        const uploadedFiles = get(value, 'files', []).map(f => f.file);
        return (
            <Upload showUploadList={true} beforeUpload={this.uploadFile.bind(this)} accept={fileType} fileList={uploadedFiles}>
                <Button> <Icon type="upload" />{label}</Button>
                <span> {get(value, 'response') && t("Upload Successful")} </span>
            </Upload>
        )
    }
}
export const fileUploader = translate("messages")(fileUploaderComponent)