import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss';
import { getExtraInforDoctorById } from '../../../services/userService';
import { rest } from 'lodash';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        };
    }

    async componentDidMount() {
        let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
        if (res) {
            this.setState({
                extraInfor: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        console.log('extra inforrrrr', this.state);
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-addres">
                        {' '}
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfor.Doctor_infor && extraInfor.Doctor_infor.nameClinic
                            ? extraInfor.Doctor_infor.nameClinic
                            : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor.Doctor_infor && extraInfor.Doctor_infor.addressClinic
                            ? extraInfor.Doctor_infor.addressClinic
                            : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && (
                        <div className="short-infor">
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                            {extraInfor.Doctor_infor &&
                                extraInfor.Doctor_infor.priceTypeData &&
                                language === LANGUAGES.VI && (
                                    <NumberFormat
                                        value={extraInfor.Doctor_infor.priceTypeData.ValueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                        className="currency"
                                    />
                                )}
                            {extraInfor.Doctor_infor &&
                                extraInfor.Doctor_infor.priceTypeData &&
                                language === LANGUAGES.EN && (
                                    <NumberFormat
                                        value={extraInfor.Doctor_infor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                        className="currency"
                                    />
                                )}
                            <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                                {' '}
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                    )}

                    {isShowDetailInfor === true && (
                        <>
                            {' '}
                            <div className="title-price">
                                {' '}
                                <FormattedMessage id="patient.extra-infor-doctor.price" />{' '}
                            </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">
                                        {' '}
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfor &&
                                            extraInfor.Doctor_infor.priceTypeData &&
                                            language === LANGUAGES.VI && (
                                                <NumberFormat
                                                    value={extraInfor.Doctor_infor.priceTypeData.ValueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                    className="currency"
                                                />
                                            )}
                                        {extraInfor &&
                                            extraInfor.Doctor_infor.priceTypeData &&
                                            language === LANGUAGES.EN && (
                                                <NumberFormat
                                                    value={extraInfor.Doctor_infor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                    className="currency"
                                                />
                                            )}
                                    </span>
                                </div>
                                <div className="note"> {extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor && extraInfor.Doctor_infor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.Doctor_infor.paymentTypeData.ValueVi
                                    : extraInfor.Doctor_infor.paymentTypeData.valueEn}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    {' '}
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
