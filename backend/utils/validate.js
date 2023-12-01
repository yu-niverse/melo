export const checkName = (name) => {
  return name.match(/^[a-zA-Z0-9]+$/);
};

export const checkEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const checkPassword = (password) => {
  const check =
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[~`!@#$%^&*()_\-+=|{}\[\]:;"'<>,.?/]/.test(password) ? 1 : 0);
  return check >= 3;
};
