import { errors } from 'jose';
import * as yup from 'yup'

const login_validate = (values) => {
    const errors = {}
    
    if(!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

    if(!values.password){
        errors.password = 'Required'
    } else if(values.password.length < 8 || values.password.length > 25) {
        errors.password = 'Password length between 8 ~ 25'
    } else if(values.password.includes(' ')) {
        errors.password = 'Password refused blank charactor'
    }

    return errors
}

const register_validate = (values) => {
    const errors = {}

    if(!values.username) {
        errors.username = 'Required'
    } else if(values.username.length > 50) {
        errors.username = 'UserName length at most 50'
    }
    
    if(!values.email) {
        errors.email = 'Required'
    } else {
        errors.email = validateEmail(values.email)
    }

    if(!values.password){
        errors.password = 'Required'
    } else if(values.password.length < 8 || values.password.length > 25) {
        errors.password = 'Password length between 8 ~ 25'
    } else if(values.password.includes(' ')) {
        errors.password = 'Password refused blank charactor'
    }

    if(values.password !== values.cpassword) {
        errors.cpassword = 'Password do not match'
    }

    return errors
}

const login_validate_yup = () => {
    const obj = yup.object().shape({
        email: yup.string().email('Invalid email').required('Password is required'),
        password: yup.string()
          .min(4, 'Must be at least 4 characters')
          .max(25, 'Must be at most 25 characters')
          .required('Password is required'),
      })
    return obj
}

const register_validate_yup = () => {
    const obj = yup.object().shape({
        username: yup.string()
            .max(50, 'Must be at most 50 characters')
            .required('Username is required'),
        email: yup.string().email('Invalid email')
            .required('Password is required'),
        password: yup.string()
          .min(4, 'Must be at least 4 characters')
          .max(25, 'Must be at most 25 characters')
          .required('Password is required'),
        cpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
      })
      console.log(obj)
    return obj
}

export {
    login_validate,
    register_validate,
    login_validate_yup,
    register_validate_yup
}