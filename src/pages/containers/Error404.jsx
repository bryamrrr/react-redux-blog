import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <section name="Error404">
      <h1>Error404</h1>
      <Link to="/">
        Regresar a Inicio
      </Link>
    </section>
  );
}

export default Error404;
