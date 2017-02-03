import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <section name="About">
        <h1>About</h1>
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

export default About;