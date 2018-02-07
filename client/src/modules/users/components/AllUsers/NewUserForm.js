import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddIcon from 'material-ui-icons/Add';

import { Button, Form, Input, Select } from '../../../shared';
import { editUserRequest, userLoadingAllSel } from '../../duck';
import styles from './NewUserForm.css';

const FormItem = Form.Item;
const { Option } = Select;

class NewUserForm extends React.Component {

  componentWillReceiveProps = ({ allUsersLoading: nextAllUsersLoading }) => {
    const { form } = this.props;
    const nextLoading = nextAllUsersLoading[form.getFieldValue('email')];

    if (this.getLoading() !== nextLoading) {
      form.resetFields();
    }
  }

  getLoading = () => {
    const { form, allUsersLoading } = this.props;

    return allUsersLoading[this.getEmailWithSuffix(form.getFieldValue('email'))];
  }

  getEmailWithSuffix = email => `${email}@gmail.com`;

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, role } = await this.validateForm();

    this.props.onAdd({
      email: this.getEmailWithSuffix(email),
      role,
    });
  }

  validateForm = () => {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (err) {
          return reject(err);
        }
        return resolve(values);
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const loading = this.getLoading();

    return (
      <Form layout="inline" className={styles.form} onSubmit={this.handleSubmit}>
        <FormItem label="Email">
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'This field is required' },
            ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="Role">
          {getFieldDecorator('role', {
            rules: [
              { required: true, message: 'This field is required' },
            ],
          })(
            <Select className={styles.roleSelect}>
              <Option value="root" disabled>Root</Option>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          )}
        </FormItem>
        <FormItem  className={styles.buttonItem}>
          <Button ghost htmlType="submit" loading={loading} onClick={this.handleSubmit}>
            <AddIcon />
            {' '}
            Add
          </Button>
        </FormItem>
      </Form>
    );
  }
}

NewUserForm.propTypes = {
  form: PropTypes.object.isRequired,
  allUsersLoading: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

const mapState = state => ({
  allUsersLoading: userLoadingAllSel(state),
});

const mapDispatch = dispatch => ({
  onAdd: user => dispatch(editUserRequest(user)),
});

export default connect(mapState, mapDispatch)(Form.create()(NewUserForm));
