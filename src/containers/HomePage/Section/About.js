import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Divider, Typography, Card } from 'antd';
import ReactPlayer from 'react-player';

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

class About extends Component {
    render() {
        return (
            <Layout>
                <div className="section-about">
                    <div className="section-about-header">
                        <Title level={2}>Truyền thông nói về BookingCare</Title>
                    </div>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16} className="move-right">
                            <div className="content-left">
                                <div className="video-container">
                                    <div className="react-player-wrapper">
                                        <ReactPlayer
                                            url="https://www.youtube.com/watch?v=FyDQljKtWnI"
                                            controls
                                            width="100%"
                                            height="100%"
                                            className="react-player"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="move-left">
                            <Card>
                                <Paragraph style={{ fontSize: '16px' }}>
                                    BookingCare là một hệ thống đặt lịch khám giúp người bệnh dễ dàng lựa chọn bác sĩ
                                    chuyên khoa phù hợp dựa trên mạng lưới các bác sĩ chuyên khoa, thông tin được xác
                                    thực rõ ràng, minh bạch hóa các thông tin liên quan đến hoạt động khám chữa bệnh:
                                    thời gian, quy trình, giá cả dịch vụ, trang thiết bị, bảo hiểm, địa chỉ, kinh
                                    nghiệm, đào tạo của bác sĩ…
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
