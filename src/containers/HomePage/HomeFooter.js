import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Divider } from 'antd';
import { InstagramOutlined, FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Footer } = Layout;

class HomeFooter extends Component {
    render() {
        return (
            <Footer style={{ background: 'rgb(239, 239, 239)', padding: '30px 0', color: '#333' }}>
                <Row justify="center" align="middle">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <p
                            style={{
                                textAlign: 'center',
                                marginBottom: 20,
                                fontSize: 16,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            &copy; 2024 BookingCare Clone Fullstack.
                        </p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div style={{ textAlign: 'center' }}>
                            <InstagramOutlined style={{ fontSize: '24px', margin: '0 15px', color: '#c13584' }} />
                            <FacebookOutlined style={{ fontSize: '24px', margin: '0 15px', color: '#1877f2' }} />
                            <YoutubeOutlined style={{ fontSize: '24px', margin: '0 15px', color: '#ff0000' }} />
                        </div>
                    </Col>
                </Row>
                <Divider style={{ margin: '20px 0' }} />
                <Row justify="center">
                    <Col span={24}>
                        <p style={{ textAlign: 'center', color: '#333', fontSize: 14 }}>
                            <a href="#" style={{ color: '#333' }}>
                                Privacy Policy
                            </a>{' '}
                            |{' '}
                            <a href="#" style={{ color: '#333' }}>
                                Terms of Service
                            </a>{' '}
                            |{' '}
                            <a href="#" style={{ color: '#333' }}>
                                Contact Us
                            </a>
                        </p>
                    </Col>
                </Row>
            </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
