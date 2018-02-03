import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddIcon from 'material-ui-icons/Add';

import { groupEpisodes, episodeLabel, seasonLabel } from '../../../utils';
import { Input, Button, Form, DatePicker, DateFormat, Tree } from '../../../shared';
import AddEpisodesForm from './AddEpisodesForm';
// import styles from './RecurrenceFields.css';

const FormItem = Form.Item;
const { TreeNode } = Tree;

class RecurrenceFields extends React.Component {
  render() {
    const { form, formItemLayout, recurring } = this.props;
    const { getFieldDecorator } = form;
    const label = recurring ? 'Episodes' : 'Premiere Date';
    const inputComponent = recurring ? <EpisodesInput /> : <PremiereDateInput />;

    return (
      <FormItem
        {...formItemLayout}
        label={label}
      >
        {getFieldDecorator('episodes', {
          rules: [
            { required: true, message: 'This field is required' },
          ],
        })(
          inputComponent
        )}
      </FormItem>
    );
  }
}

class PremiereDateInput extends React.Component {
  handleChange = premiereDateMoment => {
    const value = premiereDateMoment ? [{ season: 0, episode: 0, premiereDate: premiereDateMoment.startOf('day').toISOString() }] : undefined;
    this.props.onChange(value);
  }

  render() {
    const { value } = this.props;
    const internalValue = value ? moment(value[0].premiereDate) : undefined;

    return <DatePicker value={internalValue} onChange={this.handleChange} />;
  }
}

class EpisodesInput extends React.Component {

  handleAddEpisodes = newEpisodes => {
    this.props.onChange(
      [
        ...(this.props.value || []),
        ...newEpisodes,
      ]
    );
  }

  render() {
    const { value = [] } = this.props;
    const seasons = groupEpisodes(value);
    const seasonNodes = seasons.map(episodes => {
      const { season } = episodes[0];
      const episodeNodes = episodes.map(({
        episode,
        premiereDate,
      }) => (
        <TreeNode
          key={`${season}${episode}`}
          selectable={false}
          isLeaf
          title={
            <span>
              {episodeLabel(season, episode)}{' '}-{' '}<DateFormat value={premiereDate} />
            </span>
          }
          />
        ));
      const maxEpisode = episodes.reverse()[0].episode;

      return (
        <TreeNode
          key={season}
          title={seasonLabel(season)}
          selectable={false}
        >
          {episodeNodes}
          <TreeNode
            key={`${season}add`}
            selectable={false}
            isLeaf
            title={
              <AddEpisodesForm
                season={season}
                episode={maxEpisode}
                onAdd={this.handleAddEpisodes}
              >
                <AddIcon /> Add more episodes
              </AddEpisodesForm>
            }
          />
        </TreeNode>
      );
    });

    return (
      <Tree defaultExpandAll>
        {seasonNodes}
        <TreeNode
          key={`addNew`}
          selectable={false}
          isLeaf
          title={
            <AddEpisodesForm
              onAdd={this.handleAddEpisodes}
            >
              <AddIcon /> Add season
            </AddEpisodesForm>
          }
        />
      </Tree>
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
