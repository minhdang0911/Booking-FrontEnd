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
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdowm table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            saving: false,
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameCLinic: '',
            addressClinic: '',
            note: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    buildDataaInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName} ` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataaInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataaInputSelect(resPrice);
            let dataSelectPayment = this.buildDataaInputSelect(resPayment);
            let dataSelectProvince = this.buildDataaInputSelect(resProvince);

            console.log('new', dataSelectPrice, dataSelectPayment, dataSelectProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            isSearchable={true}
                            placeholder="Chọn bác sĩ"
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            className="form-control"
                        ></textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            isSearchable={true}
                            placeholder="Chọn giá"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            isSearchable={true}
                            placeholder="Chọn phương thức thanh toán"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            isSearchable={true}
                            placeholder="Chọn tỉnh thành"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Note</label>
                        <input className="form-control" />
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
                    {hasOldData === true ? (
                        <span>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                    ) : (
                        <span>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    )}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
