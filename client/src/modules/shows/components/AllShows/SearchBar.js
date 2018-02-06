import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';

import { Input, Checkbox } from '../../../shared';
import { CreateShowButton } from '../../../showOperations';
import styles from './SearchBar.css';

const CheckboxGroup = Checkbox.Group;

const typesOptions = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'show' },
  { label: 'Anime', value: 'anime' },
  { label: 'Comics', value: 'comic' },
];

const followingOptions = [
  { label: 'Following', value: true },
  { label: 'Not following', value: false },
];

class SearchBar extends React.Component {
  handleTitleChange = e => {
    const { value: title } = e.target;
    const { types, following } = this.props.filters;
    this.props.onSetFilters(title, types, following);
  }

  handleTypesChange = types => {
    const { title, following } = this.props.filters;
    this.props.onSetFilters(title, types, following);
  }

  handleFollowingChange = following => {
    const { title, types } = this.props.filters;
    this.props.onSetFilters(title, types, following);
  }

  render() {
    const { title, types, following } = this.props.filters;

    return (
      <div className={styles.container}>
        <Input
          className={styles.title}
          prefix={<SearchIcon className={styles.searchPrefix} />}
          value={title}
          placeholder="Search..."
          onChange={this.handleTitleChange}
          />
        <CheckboxGroup
          className={styles.types}
          options={typesOptions}
          value={types}
          onChange={this.handleTypesChange}
          />
        <CheckboxGroup
          className={styles.following}
          options={followingOptions}
          value={following}
          onChange={this.handleFollowingChange}
        />
        <CreateShowButton />
      </div>
    );
  }
}

SearchBar.propTypes = {
  filters: PropTypes.object.isRequired,
  onSetFilters: PropTypes.func.isRequired,
};

export default SearchBar;
