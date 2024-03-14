import React, { Component } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
        console.log('handleEditorChange', html, text);
    };

    handleSaveContentMarkdown = () => {
        console.log(this.state);
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select value={this.state.selectedOption} onChange={this.handleChange} options={options} />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            className="form-control"
                            rows="4"
                        ></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button onClick={() => this.handleSaveContentMarkdown()} className="save-content-doctor">
                    Lưu thông tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listusers: state.admin.users,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
