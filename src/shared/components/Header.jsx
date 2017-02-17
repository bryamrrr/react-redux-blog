import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.css'

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        React!
      </h1>

      <nav role="navigation">
        <Link to="/">
          Home
        </Link>
      </nav>
    </header>
  )
}

export default Header;