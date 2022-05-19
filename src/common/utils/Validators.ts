import validator from 'validator';

export const validateEmail = (str: string) => {
    return validator.isEmail(str);
}