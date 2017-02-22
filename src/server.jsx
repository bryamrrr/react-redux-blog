import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

import messages from './messages.json';

function requestHandler(request, response) {
  const locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';

  const context = {};

  const html = renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StaticRouter location={request.url} contex={context}>
        <Pages />
      </StaticRouter>
    </IntlProvider>,
  );

  response.setHeader('Content-Type', 'text/html');

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  }

  response.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicación"
        content={html}
      />,
    ),
  );
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3030);
