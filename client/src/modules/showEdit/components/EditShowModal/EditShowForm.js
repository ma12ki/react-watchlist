import React from 'react';
import PropTypes from 'prop-types';

import { defaultValidationMessages } from '../../../utils';
import { Button, Input, Form, Radio, ShowTypeIcon } from '../../../shared';
// import styles from './EditShowForm.css';

const FormItem = Form.Item;

class EditShowForm extends React.Component {

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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Title"
        >
          {getFieldDecorator('title')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="A.K.A"
        >
          {getFieldDecorator('aka')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Type"
        >
          {getFieldDecorator('type')(
            <Radio.Group>
              <Radio.Button value="movie"><ShowTypeIcon type="movie" /></Radio.Button>
              <Radio.Button value="show"><ShowTypeIcon type="show" /></Radio.Button>
              <Radio.Button value="anime"><ShowTypeIcon type="anime" /></Radio.Button>
              <Radio.Button value="comic"><ShowTypeIcon type="comic" /></Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <Button htmlType="submit">Save</Button>
      </Form>
    );
  }
}

EditShowForm.propTypes = {
  form: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form.create({ validateMessages: defaultValidationMessages })(EditShowForm);
