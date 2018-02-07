import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import cn from 'classnames';

import { Table } from '../../../shared';
import { usersLoadingSel, usersSel, getUsersRequest } from '../../duck';
import NewUserForm from './NewUserForm';
import RoleSelect from './RoleSelect';
import DeleteUserButton from './DeleteUserButton';
import styles from './AllUsers.css';

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.onGetUsers();
  }

  getColumns = () => {
    return [
      {
        dataIndex: 'email',
        title: 'Email',
        render(email) {
          return email;
        },
      },
      {
        width: '11rem',
        title: 'Role',
        render: (_, user) => <RoleSelect user={user} />,
      },
      {
        width: '8rem',
        className: styles.rightAlign,
        render: (_, { userId, email }) => <DeleteUserButton userId={userId} email={email} />,
      },
    ];
  }

  render() {
    const { loading, users } = this.props;

    return (
      <React.Fragment>
        <NewUserForm />
        <Table
          className={styles.table}
          rowKey="userId"
          size="middle"
          columns={this.getColumns()}
          dataSource={users}
          loading={loading}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

AllUsers.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  onGetUsers: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  loading: usersLoadingSel(state),
  users: usersSel(state),
});

const mapDispatch = (dispatch) => ({
  onGetUsers: () => dispatch(getUsersRequest()),
});

export default connect(mapState, mapDispatch)(AllUsers);
