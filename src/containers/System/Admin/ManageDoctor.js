import React, { Component } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            saving: false,
            hasOldData: false,
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    buildDataaInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName} `;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataaInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
        console.log('test res', res);
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    render() {
        const { saving } = this.state;
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            isSearchable={true} // Kích hoạt chức năng tìm kiếm
                        />
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
                        value={this.state.contentMarkdown}
                    />
                </div>

                <Button
                    onClick={this.handleSaveContentMarkdown}
                    loading={saving} // Sử dụng loading để hiển thị quá trình lưu
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    type="primary"
                    icon={<SaveOutlined />} // Icon của nút
                    size="large"
                    style={{ marginTop: '20px' }} // Khoảng cách với phần trên
                >
                    {hasOldData === true ? <span>Lưu thông tinn</span> : <span>Tạo thông tin</span>}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
