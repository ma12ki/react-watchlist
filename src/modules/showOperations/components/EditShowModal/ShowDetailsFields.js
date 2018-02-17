import React from 'react';
import PropTypes from 'prop-types';

import { Input, Form, Radio, Switch, ShowTypeIcon } from '../../../shared';
import styles from './ShowDetailsFields.css';

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
          <Input name="title" autoComplete="off" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="a.k.a"
      >
        {getFieldDecorator('aka', {
          initialValue: show.aka,
          rules: [
            { max: 100, message: 'Max 100 characters allowed' },
          ],
        })(
          <Input name="aka" placeholder="also known as" autoComplete="off" />
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
            <Radio.Button value="movie"><div className={styles.showTypeIcon}><ShowTypeIcon type="movie" /></div></Radio.Button>
            <Radio.Button value="show"><div className={styles.showTypeIcon}><ShowTypeIcon type="show" /></div></Radio.Button>
            <Radio.Button value="anime"><div className={styles.showTypeIcon}><ShowTypeIcon type="anime" /></div></Radio.Button>
            <Radio.Button value="comic"><div className={styles.showTypeIcon}><ShowTypeIcon type="comic" /></div></Radio.Button>
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
