import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    // async componentDidMount() {
    //     let id = this.props.doctorId;
    //     if (id) {
    //         let res = await getProfileDoctorById(id);
    //         this.setState({
    //             dataProfile: res,
    //         });
    //     }
    // }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }

        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.state.doctorId);
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.ValueVi},${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}  `;
        }
        console.log('stateeeee', dataProfile);
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                <span>{dataProfile.Markdown.description}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    Gía khám:
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.VI ? (
                        <NumberFormat
                            value={dataProfile.Doctor_infor.priceTypeData.ValueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                            className="currency"
                        />
                    ) : (
                        ''
                    )}
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.EN ? (
                        <NumberFormat
                            value={dataProfile.Doctor_infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                            className="currency"
                        />
                    ) : (
                        ''
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
