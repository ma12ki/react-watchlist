import React from 'react';
import PropTypes from 'prop-types';

import { Input, Form, Radio, Switch, ShowTypeIcon } from '../../../shared';
// import styles from './ShowDetailsFields.css';

const FormItem = Form.Item;

const ShowDetailsFields = ({ form, formItemLayout, show, editMode, onRecurrenceChange }) => {
  const { getFieldDecorator } = form;

  return (
    <React.Fragment>
      <FormItem
        {...formItemLayout}
        label="Title"
      >
        {getFieldDecorator('title', {
          initialValue: show.title,
          rules: [
            { required: true, message: 'This field is required' },
            { whitespace: true, message: 'This field is required' },
            { max: 100, message: 'Max 100 characters allowed' },
          ],
        })(
          <Input name="title" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="A.K.A"
      >
        {getFieldDecorator('aka', {
          initialValue: show.aka,
          rules: [
            { max: 100, message: 'Max 100 characters allowed' },
          ],
        })(
          <Input name="title" placeholder="Alternative title" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Type"
      >
        {getFieldDecorator('type', {
          initialValue: show.type,
          rules: [
            { required: true, message: 'This field is required' },
          ],
        })(
          <Radio.Group name="type">
            <Radio.Button value="movie"><ShowTypeIcon type="movie" /></Radio.Button>
            <Radio.Button value="show"><ShowTypeIcon type="show" /></Radio.Button>
            <Radio.Button value="anime"><ShowTypeIcon type="anime" /></Radio.Button>
            <Radio.Button value="comic"><ShowTypeIcon type="comic" /></Radio.Button>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Recurring"
      >
        {getFieldDecorator('recurring', {
          initialValue: show.recurring || false,
          valuePropName: 'checked',
          rules: [
            { required: true, message: 'This field is required' },
          ],
        })(
          <Switch name="recurring" disabled={editMode} onChange={onRecurrenceChange} />
        )}
      </FormItem>
    </React.Fragment>
  );
};

ShowDetailsFields.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  onRecurrenceChange: PropTypes.func.isRequired,
};

export default ShowDetailsFields;
