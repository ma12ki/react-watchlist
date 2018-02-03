import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from 'lodash';

import { Input, Button, DatePicker, Form, Select, Modal } from '../../../shared';
import styles from './AddEpisodesForm.css';

const FormItem = Form.Item;
const { Option } = Select;

const recurrenceTypes = Object.freeze({
  instantly: { unit: 'days', amount: 0 },
  weekly: { unit: 'days', amount: 7 },
  biweekly: { unit: 'days', amount: 14 },
  monthly: { unit: 'months', amount: 1 },
});

class AddEpisodesForm extends React.Component {
  state = {
    showForm: false,
  }

  showForm = () => {
    this.setState({ showForm: true });
  }

  hideForm = () => {
    this.setState({ showForm: false });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const values = await this.validateForm();
    this.hideForm();
    this.props.onAdd(this.generateEpisodes(values));
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

  generateEpisodes = ({ season, episodes, recurrenceType, startDate }) => {
    const { episode: startingEpisode = 0 } = this.props;
    return range(1, Number(episodes) + 1)
      .map((episode, i) => {
        const { unit, amount } = recurrenceTypes[recurrenceType];
        const premiereDate = moment(startDate).add(unit, amount * i).startOf('day').toISOString();

        if (episode + startingEpisode > 999) {
          throw 'Episode overflow';
        }

        return {
          season: Number(season),
          episode: episode + startingEpisode,
          premiereDate,
        };
      });
  }

  validateSeason = (_rule, value, cb) => {
    const { disabledSeasons } = this.props;
    if (value != null && disabledSeasons.includes(Number(value))) {
      return cb('Season already in use');
    }
    cb();
  }

  renderForm() {
    const { form, season } = this.props;
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
          label="Season #"
        >
          {getFieldDecorator('season', {
            initialValue: season,
            rules: [
              { required: true, message: 'Required' },
              { validator: this.validateSeason },
            ],
          })(
            <Input disabled={season != null} name="season" type="number" min="1" max="99" step="1" placeholder="1 - 99" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
           label="# of episodes"
        >
          {getFieldDecorator('episodes', {
            rules: [
              { required: true, message: 'Required' },
            ],
          })(
            <Input name="episodes" type="number" min="1" max="999" step="1" placeholder="1 - 999" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Recurrence Type"
        >
          {getFieldDecorator('recurrenceType', {
            rules: [
              { required: true, message: 'Required' },
            ],
          })(
            <Select name="recurrenceType">
              <Option value="instantly">All at once</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="biweekly">Bi-weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Start Date"
        >
          {getFieldDecorator('startDate', {
            rules: [
              { required: true, message: 'Required' },
            ],
          })(
            <DatePicker name="startDate" />
          )}
        </FormItem>
        <Button htmlType="submit">Add</Button>
      </Form>
    );
  }

  render() {
    const { children, season } = this.props;
    const { showForm } = this.state;
    const title = season == null ? 'Add season' : 'Add episodes';

    return (
      <React.Fragment>
        <Button onClick={this.showForm}>{children}</Button>
        <Modal
          visible={showForm}
          title={title}
          footer={null}
          destroyOnClose={true}
          onCancel={this.hideForm}
        >
          {this.renderForm()}
        </Modal>
      </React.Fragment>
    );
  }
}

AddEpisodesForm.propTypes = {
  form: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  season: PropTypes.number,
  disabledSeasons: PropTypes.array,
  episode: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
};

AddEpisodesForm.defaultProps = {
  disabledSeasons: [],
};

export default Form.create()(AddEpisodesForm);
