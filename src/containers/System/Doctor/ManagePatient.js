import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeDataPicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDataPicker}
                            value={this.state.currentDate}
                        />
                    </div>

                    <div className="col-12 table-manage-patient">
                        <table>
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                            <tr>
                                <td>Ernst Handel</td>
                                <td>Roland Mendel</td>
                                <td>Austria</td>
                            </tr>
                            <tr>
                                <td>Island Trading</td>
                                <td>Helen Bennett</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <td>Laughing Bacchus Winecellars</td>
                                <td>Yoshi Tannamuri</td>
                                <td>Canada</td>
                            </tr>
                            <tr>
                                <td>Magazzini Alimentari Riuniti</td>
                                <td>Giovanni Rovelli</td>
                                <td>Italy</td>
                            </tr>
                        </table>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
