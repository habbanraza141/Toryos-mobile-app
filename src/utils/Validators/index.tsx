export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const passwordLength = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[0-9!@#$%^&(),.?":{}|<>]).+$/;
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
