import React, { Component } from 'react'
import moment from "moment-hijri";
import { Select } from 'antd';
import { translate } from 'react-i18next';
import months from './months';
import { range, isEqual } from 'lodash'
const Option = Select.Option;

class hijriDatePickerComp extends Component {
    constructor(props) {
        super(props);
        const { startYearMargin=10, endYearMargin = 10} = props;
        const currentDate = moment().locale('en-sa');
        const [year, month, day] = currentDate.format('iYYYY/iM/iD').split('/');
        const currentYear = parseInt(year);
        this.state = {
            year:parseInt(year),
            month:parseInt(month),
            day:parseInt(day)
        }
        this.years = range(currentYear - startYearMargin, currentYear + endYearMargin + 1);
        this.days = range(1, currentDate.iDaysInMonth() + 1);
    }


    componentDidUpdate(prevProps, prevState) {
        const { input: { onChange } } = this.props;
        const { year, month, day } = this.state;
        if (!isEqual(this.state, prevState)) {
            const date = moment(`${year}/${month}/${day}`, 'iYYYY/iM/iD').locale('en-sa');
            this.days = range(1, date.iDaysInMonth() + 1);
            onChange(date);
        }
    }
    
    render() {
        const { className, t } = this.props;
        return (
            <div {...{ className }}>
                <Select placeholder={t('Select year')} onChange={year => this.setState({ ...this.date, year })}>
                    {this.years.map(year => <Option key={year} value={year}> {year} </Option>)}
                </Select>
                <Select placeholder={t('Select month')} onChange={month => this.setState({ ...this.date, month })}>
                    {months.map((month, index) => <Option key={index+1} value={index+1}> {month} </Option>)}
                </Select>
                <Select placeholder={t('Select day')} onChange={day => this.setState({ ...this.date, day })}>
                    {this.days.map(day => <Option key={day} value={day}> {day} </Option>)}
                </Select>
            </div>
        )
    }
}

export const hijriDatePicker = translate('labels')(hijriDatePickerComp)