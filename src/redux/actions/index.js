export const ADD_USER = 'ADD_USER';

export const saveUserGlobal = (password, email) => ({
  type: ADD_USER,
  password,
  email,
});
