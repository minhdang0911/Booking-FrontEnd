import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { getAllSpecialty } from '../../../services/userService';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            specialtyName: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }
    async componentDidMount() {
        this.props.loadTopDoctor();
        let res = await getAllSpecialty();
        let data = res.data;
        if (res) {
            let specialtyNames = data.map((item) => item.name);

            this.setState({
                specialtyName: specialtyNames,
            });
        }
    }

    handleViewDetailDoctor = (doctor) => {
        console.log('view infor', doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };
    render() {
        let { specialtyName } = this.state;
        console.log('name state', this.state);
        console.log('check top doctors', this.props.topDoctorsRedux);
        let allDoctors = this.state.arrDoctors;
        let { language } = this.props;
        allDoctors = allDoctors.concat(allDoctors).concat(allDoctors);

        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allDoctors &&
                                allDoctors.length > 0 &&
                                allDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }

                                    let nameVi = `${item.positionData.ValueVi},${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}  `;
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div
                                                        className="bg-image section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                </div>

                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
