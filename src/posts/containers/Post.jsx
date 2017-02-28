import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Post.css';

import actions from '../../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.props.user && !!this.props.comments) return this.setState({ loading: false });

    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ]);

    return this.setState({ loading: false });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
        <h2 className={styles.title}>
          <Link to={`/post/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
        <p>
          {this.props.body}
        </p>
        {!this.state.loading && (
          <div>
            <Link to={`/user/${this.props.user.id}`}>
              {this.props.user.name}
            </Link>
            <span>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.length,
                }}
              />
            </span>
            <Link to={`/post/${this.props.id}`} >
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state, props) {
  return {
    comments: state.comments.filter(comment => comment.postId === props.id),
    user: state.users[props.userId],
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
