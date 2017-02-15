import React, { Component, PropTypes } from 'react';

import api from '../../api.js';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      comments: []
    }
  }

  async componentDidAmount() {
    const [
      user,
      comments
    ] = await Promise.all([
      api.users.getSingle(this.props.userId),
      api.users.getComments(this.props.id)
    ]);

    this.setState({
      loading: false,
      user,
      comments
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`}>
        <h2>{this.props.title}</h2>
        <p>
          {this.props.body}
        </p>
        {!this.props.loading && (
          <div>
          </div>
        )}
      </article>
    )
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string
}

export default Post;