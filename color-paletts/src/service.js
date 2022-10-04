const SERVER_DOMAIN = 'https://632519874cd1a2834c394f69.mockapi.io/api';

export const getColors = async () => {
  try {
    const response = await fetch(`${SERVER_DOMAIN}/colors`);
    return response.json();
  } catch {
    throw new Error('could not fetch the default price');
  }
};