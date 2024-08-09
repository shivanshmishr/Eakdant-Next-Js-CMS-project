import Cookies from 'js-cookie';

export const isAdmin = () => {
  const userData = Cookies.get('userData');
  if (userData) {
    try {
      const userDataJson = JSON.parse(userData);
      return userDataJson.isAdmin === 1;
    } catch (error) {
      console.error('Error parsing JSON data from cookie:', error);
      return false;
    }
  }
  return false;
};
