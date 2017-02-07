import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  render() {
    return (
      <section name="Post">
        <h1>Post</h1>
        <Link to="/home">
          Ir a inicio
        </Link>
        <Link to="/random">
          Ir a random
        </Link>
      </section>
    )
  }
}

export default Post;