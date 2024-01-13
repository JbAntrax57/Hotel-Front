const verifyToken = async (to, from, next) => {
    console.log('Hola desde auth')
    const token = localStorage.getItem('authToken');
    if (token === null || token === 'undefined') {
      next('/login');
    } else {
      next();
    }
  };
  
  export default verifyToken;
  