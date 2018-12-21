import React, { Component } from 'react'
import { Upload, Button, Icon } from "antd";
import { translate } from "react-i18next";
import { words } from 'lodash';

class fileUploaderComponent extends Component {
    state = { error: '', fileList: [] }

    beforeUpload(file) {
        const { fileType = '' } = this.props;
        const regex = new RegExp(words(fileType).join('|'));
        if (!regex.test(file.type)) {
            this.setState({ error: 'Invalid file type' })
            return false;
        }
        this.setState({ error: '' })
        return true
    }

    onRemove(item) {
    }

    handleChange({ fileList }) {
        const { input: { onChange }, maxNumOfFiles } = this.props
        const _fileList = fileList.slice(0 - maxNumOfFiles)
            .filter(file => file.status);
        this.setState({ fileList: _fileList })
        onChange(_fileList);
    }

    render() {
        const { input: { value }, t, label, fileType = '', uploadUrl, multiple = true, showUploadList = true } = this.props;
        return (
            <Upload
                multiple={multiple}
                showUploadList={showUploadList}
                action={uploadUrl}
                onRemove={this.onRemove.bind(this)}
                beforeUpload={this.beforeUpload.bind(this)}
                accept={fileType}
                fileList={this.state.fileList}
                onChange={this.handleChange.bind(this)}
            >
                <Button > <Icon type="upload" />{label}</Button>
                {this.state.error && <span className='error'> {t(this.state.error)} </span>}
                {!showUploadList && value.length && <span>{t("Upload Successful")} </span>}
            </Upload>
        )
    }
}
export const fileUploader = translate("messages")(fileUploaderComponent)