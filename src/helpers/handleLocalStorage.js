const saveUserLocal = (email) => {
  localStorage.setItem('user', email);
};

export default saveUserLocal;
