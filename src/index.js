import { render } from 'react-dom';
import App from './app';
import React from 'react';
import store from './app/reducers';
import i18n from 'translate';
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux'

render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>,
    document.getElementById('app')
);