import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Button, Form, DatePicker } from '../../../shared';
import styles from './PostponeEpisodesForm.css';

const FormItem = Form.Item;

class PostponeEpisodesForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    const { newPremiereDate } = await this.validateForm();

    this.props.onPostpone({
      ...this.props.episode,
      newPremiereDate,
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
    const { form, episode, loading, onCancel } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="New premiere date"
        >
          {getFieldDecorator('newPremiereDate', {
            rules: [
              { required: true, message: 'This field is required' },
            ],
          })(
            <DatePicker name="newPremiereDate" placeholder={moment(episode.currentPremiereDate).format('YYYY-MM-DD')} />
          )}
        </FormItem>
        <div>
          <i>This operation will also affect all subsequent episodes in the same season</i>
        </div>
        <br />
        <div className={styles.buttons}>
          <Button ghost htmlType="button" disabled={loading} onClick={onCancel}>Cancel</Button>
          <Button ghost type="primary" htmlType="submit" loading={loading}>Postpone</Button>
        </div>
      </Form>
    );
  }
}

PostponeEpisodesForm.propTypes = {
  form: PropTypes.object.isRequired,
  episode: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onPostpone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form.create()(PostponeEpisodesForm);
