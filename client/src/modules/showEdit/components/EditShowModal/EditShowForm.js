import React from 'react';
import PropTypes from 'prop-types';

import { defaultValidationMessages } from '../../../utils';
import { Button, Form } from '../../../shared';
import ShowDetailsFields from './ShowDetailsFields';
import RecurrenceFields from './RecurrenceFields';
// import styles from './EditShowForm.css';

class EditShowForm extends React.Component {
  state = {
    recurring: this.props.show.recurring || false,
  }

  handleRecurrenceChange = recurring => {
    this.setState({ recurring });
    this.props.form.resetFields(['episodes']);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const values = await this.validateForm();
    console.log(values);
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
    const { form, show, editMode } = this.props;
    const { recurring } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <ShowDetailsFields
          form={form}
          formItemLayout={formItemLayout}
          show={show}
          editMode={editMode}
          onRecurrenceChange={this.handleRecurrenceChange}
        />
        <RecurrenceFields
          form={form}
          formItemLayout={formItemLayout}
          episodes={show.episodes || []}
          editMode={editMode}
          recurring={recurring}
        />
        <Button htmlType="submit">Save</Button>
      </Form>
    );
  }
}

EditShowForm.propTypes = {
  form: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form.create({ validateMessages: defaultValidationMessages })(EditShowForm);
