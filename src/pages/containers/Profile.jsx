import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <section name="Profile">
        <h1>Profile</h1>
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

export default Profile;