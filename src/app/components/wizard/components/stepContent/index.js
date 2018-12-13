import React, { Component } from 'react';
import RenderSection from './sections';
import { reduxForm, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapping';
import { Form } from 'antd';
import { map, get, pickBy } from 'lodash';
import RenderAction from './actions';
import { apply_permissions } from 'helpers/functions';

class StepContent extends Component {
    constructor(props) {
        super(props);
        const { currentStep } = this.props;
        this.actions = {
            ...get(currentStep, 'actions'),
            done:{
                label:'Done',
                htmlType: 'submit',
                permissions:{
                    show_check_index: -1,
                    object_has_list: {objectKey:'mainObject', listKey:'steps'},
                    operation: 'some'
                }
            },
            next: {
                label: 'Next',
                htmlType: 'submit',
                permissions: {
                    hide_check_index: -1
                }
            },
            previous: {
                label: 'Previous',
                permissions: {
                    hide_check_index: 0
                }
            }
        };
    }
    componentDidUpdate(prevProps, prevState) {
        const{currentStep:{name}, reset} = prevProps;
        const{currentStep:{name:nextName}} = this.props;
        if(name !== nextName){
            reset();
        }
    }
    render() {
        const { currentStep, steps } = this.props;
        const { sections } = currentStep;
        const actions = pickBy(this.actions,
            (v) => apply_permissions(v, v, 'permissions',
                { ...this.props, list: steps, itemIndex: steps.indexOf(currentStep.name) })
        )
        return (
            <div style={{ margin: "20px" }} className="wizard-container">
                <Form>
                    {map(sections, (section, key) =>
                        <Form.Item key={key}>
                            <FormSection name={key}>
                                <RenderSection {...section} />
                            </FormSection>
                        </Form.Item>
                    )}
                    {map(actions, (v, k) => {
                        return <RenderAction
                            key={k}
                            actionName={k}
                            {...{ ...this.props, ...v }} />
                    })
                    }
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'stepForm',
    enableReinitialize:true,
})(StepContent));


