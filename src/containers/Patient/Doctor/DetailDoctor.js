import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            } else {
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}
    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameVi = '',
            nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.ValueVi},${detailDoctor.lastName} ${detailDoctor.firstName} `;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}  `;
        }

        console.log('state', detailDoctor);

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className="down">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                    <span>{detailDoctor.Markdown.description}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor"></div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        )}
                    </div>
                    <div className="comment-doctor"></div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
