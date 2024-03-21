import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { rest } from 'lodash';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-addres"> ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng khám Hà An</div>
                    <div className="detail-address">Số 58 ngõ 120, Trường Chinh, Đống Đa, Hà Nội</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && (
                        <div className="short-infor">
                            GIÁ KHÁM: 300.000đ.
                            <span onClick={() => this.showHideDetailInfor(true)}> Xem chi tiết</span>
                        </div>
                    )}

                    {isShowDetailInfor === true && (
                        <>
                            {' '}
                            <div className="title-price">GIÁ KHÁM: </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left"> Giá khám</span>
                                    <span className="right"> 300.000đ</span>
                                </div>
                                <div className="note"> Khám, tư vấn và phương án điều trị </div>
                            </div>
                            <div className="payment">Phòng khám có hình thức thanh toán chi phí bằng tiền mặt</div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}> Ẩn bảng giá </span>
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
