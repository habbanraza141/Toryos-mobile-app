export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const passwordLength = (password: string): boolean => {
  return password.length >= 8;
};

export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/;
  return regex.test(password);
};

export const doPasswordsMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};

export const isNonEmpty = (...fields: string[]): boolean => {
  return fields.every(field => field.trim().length > 0);
};

export const isValidNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};
