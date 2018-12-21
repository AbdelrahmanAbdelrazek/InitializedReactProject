import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'antd';
import { Field, reduxForm } from 'redux-form';
import { mapDispatchToProps } from './mapping';
import RenderField from 'components/inputs';
import loginFields from './LoginFields';
import { serverFieldMapper } from 'helpers/functions';
import { translate } from 'react-i18next';
import { postItem } from 'helpers/apiMethods';
import { withRouter } from "react-router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.fields = loginFields.map(f => serverFieldMapper(f));
        this.state = {
            submitting: false,
            error: ''
        }
    }

    handleSubmit(values) {
        const { addUser, redirect_to, history } = this.props;
        this.setState({ submitting: true })
        return postItem('/auth', values)
            .then(res =>
                postItem('/Authenticate')
                    .then(res => {
                        this.setState({ submitting: false });
                        addUser(res);
                        localStorage.setItem('user', JSON.stringify(res));
                        redirect_to && history.push(redirect_to);
                    })
            )
            .catch(({ response }) => {
                if (response.status == 401) {
                    this.setState({
                        error: 'Invalid username or password'
                    })
                }
                this.setState({
                    ...this.state,
                    submitting: false
                })
            })
    }

    render() {
        const { t, handleSubmit, className } = this.props;
        const { error, submitting } = this.state;
        return (
            <div className={className}>
                <Form style={{ direction: 'rtl' }}>
                    {error && <Alert
                        message={t(`messages:${this.state.error}`)}
                        type="error"
                        closable
                        onClose={() => this.setState({ error: '' })}
                    />}
                    {
                        this.fields.map(field =>
                            <Field key={field.name} name={field.name} component={RenderField} {...field} />
                        )
                    }
                    <Button onClick={handleSubmit(this.handleSubmit.bind(this))} disabled={submitting} loading={submitting} type='primary'>{t("Sign in")}</Button>
                </Form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'loginForm',
})(withRouter(connect(null, mapDispatchToProps)(translate('actions')(Login))));