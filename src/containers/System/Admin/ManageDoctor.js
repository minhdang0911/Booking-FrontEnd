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
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            saving: false,
            hasOldData: false,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataaInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataaInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataaInputSelect(resProvince, 'PROVINCE');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }

        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelect = this.buildDataaInputSelect(this.props.allDoctors, 'USERS');
            let dataSelectPrice = this.buildDataaInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataaInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataaInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    buildDataaInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} USD `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
        }

        return result;
    };

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
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
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
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    render() {
        console.log('minh dang state', this.state);
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
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                            className="form-control"
                        ></textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedPrice"
                            options={this.state.listPrice}
                            isSearchable={true}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            isSearchable={true}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            isSearchable={true}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {' '}
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
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
