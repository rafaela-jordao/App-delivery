import { readInLocalStorage } from './localStorage';

const requestApi = async (path, method = 'GET', body) => {
  const { token } = readInLocalStorage('user') || {};
  // http://localhost:3001
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:3001`;
  const endpoint = `${baseUrl}${path}`;
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await response.json();

  if (!response.ok) throw json;
  return json;
};

export default requestApi;
