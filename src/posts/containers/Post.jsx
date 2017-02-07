import React, { Component, PropTypes } from 'react';

import api from '../../api.js';

class Post extends Component {
  render() {
    return
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string
}

export default Post;