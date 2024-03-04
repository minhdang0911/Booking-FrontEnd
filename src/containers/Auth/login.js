import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { handleLoginApi } from '../../services/userService';
import './Login.scss';

// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userInfoList: [],
            isShowPassword: false,
            errMessage: '',
        };
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
        console.log(event.target.value);
    };

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
        console.log(event.target.value);
    };

    handleLogin = async () => {
        // const { username, password, userInfoList } = this.state;
        // const userInfo = { username, password };
        // this.setState({
        //     userInfoList: [...userInfoList, userInfo]
        // });
        // // Xử lý đăng nhập, ví dụ: kiểm tra thông tin đăng nhập hợp lệ và hiển thị thông báo
        // console.log('User info list:', this.state.userInfoList);
        // // Đặt các logic xử lý sau khi đăng nhập ở đây
        this.setState({
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('login success');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
            console.log(error.response);
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input
                                value={this.state.username}
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                onChange={(event) => this.handleChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    value={this.props.password}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    onChange={(event) => this.handleChangePassword(event)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i class={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>

                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login" onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>

                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
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
    return {
        navigate: (path) => dispatch(push(path)),

        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
