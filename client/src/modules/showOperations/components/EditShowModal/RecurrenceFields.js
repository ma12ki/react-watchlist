import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '../../../shared';
import EpisodesInput from './EpisodesInput';
import PremiereDateInput from './PremiereDateInput';
// import styles from './RecurrenceFields.css';

const FormItem = Form.Item;

class RecurrenceFields extends React.Component {
  render() {
    const { form, formItemLayout, editMode, recurring, episodes } = this.props;
    const { getFieldDecorator } = form;
    const label = recurring ? 'Episodes' : 'Premiere Date';
    const inputComponent = recurring ?
      <EpisodesInput /> :
      <PremiereDateInput disabled={editMode} />;
    const initialValue = episodes;

    return (
      <FormItem
        {...formItemLayout}
        label={label}
      >
        {getFieldDecorator('episodes', {
          initialValue,
          rules: [
            { required: !editMode || (editMode && !recurring), message: 'This field is required' },
          ],
        })(
          inputComponent
        )}
      </FormItem>
    );
  }
}

RecurrenceFields.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  recurring: PropTypes.bool.isRequired,
};

export default RecurrenceFields;
