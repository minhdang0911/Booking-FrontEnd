import React, { Component } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './TableManageUser.scss';

class TableUserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            deleteModalVisible: false,
            userToDelete: null,
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                userRedux: this.props.listusers,
            });
        }
    }

    handleDeleteUser = (id) => {
        this.props.deleteAUser(id);
        this.setState({ deleteModalVisible: false });
        message.success('User deleted successfully');
    };

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    };

    showDeleteModal = (user) => {
        this.setState({ deleteModalVisible: true, userToDelete: user });
    };

    handleCancelDeleteModal = () => {
        this.setState({ deleteModalVisible: false, userToDelete: null });
    };

    render() {
        const { userRedux, deleteModalVisible, userToDelete } = this.state;

        const columns = [
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'FirstName',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'LastName',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button
                            type="primary"
                            style={{ backgroundColor: 'white', color: 'black' }}
                            icon={<EditOutlined />}
                            onClick={() => this.handleEditUser(record)}
                            className="edit-button"
                        />
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => this.showDeleteModal(record)}
                            className="delete-button"
                        />
                    </Space>
                ),
            },
        ];

        return (
            <div className="table-container">
                <Table columns={columns} dataSource={userRedux} rowKey={(record) => record.id} pagination={false} />
                <Modal
                    title="Confirm Delete"
                    visible={deleteModalVisible}
                    onOk={() => this.handleDeleteUser(userToDelete.id)}
                    onCancel={this.handleCancelDeleteModal}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ style: { background: '#1677ff' } }}
                >
                    <p>Are you sure you want to delete this user?</p>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
