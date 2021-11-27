import url from 'url';

export const API_URL = url.format({
  protocol: 'http',
  hostname: 'localhost',
  port: 8000,
  pathname: '/v1/api'
});

export const CONTENT_TYPE = 'Content-Type';

export const JSON_PATCH = 'application/json-patch+json';
