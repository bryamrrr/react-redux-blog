import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post.jsx';

import api from '../../api.js';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      loading: true
    };
  }

  async componentDidMount() {
    const [
      user,
      posts
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id)
    ]);

    this.setState({
      user,
      posts,
      loading: false
    });
  }

  render() {
    return (
      <section name="Profile">
        <h2>Perfil de {this.state.user.name}</h2>

        <fieldset>
          <legend>Info básica</legend>
          <input type="email" value={this.state.user.email} disabled />
        </fieldset>

        {this.state.user.address && (
          <fieldset>
            <legend>Dirección</legend>
            {this.state.user.address.street}<br />
            {this.state.user.address.suite}<br />
            {this.state.user.address.city}<br />
            {this.state.user.address.zipcode}<br />
          </fieldset>
        )}

        <section>
          {this.state.posts
            .map(post => (
              <Post
                key={post.id}
                user={this.state.user}
                {...post}
              />
            ))
          }
        </section>
      </section>
    )
  }
}

export default Profile;