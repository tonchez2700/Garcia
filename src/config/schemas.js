import * as Yup from 'yup';


export const RegistrationSchema = {
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    paternal_surname: '',
    maternal_surname: '',
    phone: '',
    address: '',
    postal_code: ''
};
export const RecoverySchema = {
    email: '',
};