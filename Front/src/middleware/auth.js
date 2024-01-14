import { api } from 'boot/axios'
const verifyToken = async (to, from, next) => {
  console.log('Hola desde auth')
  const { data } = await api.get('user')
  console.log(data)
  const token = localStorage.getItem('authToken');
  if (token === null || token === 'undefined') {
    next('/login');
  } else {
    next();
  }
};
  
export default verifyToken;
  