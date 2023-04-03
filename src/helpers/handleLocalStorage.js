const saveUserLocal = (userEmail) => {
  localStorage.setItem('user', JSON.stringify({ email: userEmail }));
};

export default saveUserLocal;
