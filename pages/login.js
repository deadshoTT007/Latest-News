import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client';

import { ACCOUNT_LOGIN_WITH_PHONE } from '../components/GraphQl/Queries'
import { secondClient } from './utils/App';
import { useRouter } from 'next/router';

import Link from 'next/link';
import styles from '../styles/register.module.scss'

import Input from '../components/Input';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const phoneNumberRegex = new RegExp(/^(9(8|7))\d{8}$/)
const passwordRegex = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$')


const Login = () => {


  const [doubleDisable, setDoubleDisable] = useState(false)



    const registerForm = {
        fullName: {
          elementConfig: {
            type: "text ",
            placeholder: "Enter phone number",
            name: "fullName",
            label: 'Enter Phone Number'
          },
          //value: "saj",
          value: '',
          valid: false,
          focus: null,
          touched: false,
          autoFocus: true,
          showError: false,
          showEmptyError: false,
          errorMessage: "Username should be atleast 3 character's long",
          validity: {
            required: true,
            minLength: 3,
            trim: false
      
          }
        },
        password1: {
            elementConfig: {
              type: "password",
              placeholder: "Password",
              name: "password1",
              label: 'Password'
            },
            //value: 'shrestha10$',
            value: '',
            valid: false,
            focus: null,
            touched: false,
            autoFocus: true,
            showError: false,
            showEmptyError: false,
            errorMessage: "Password must be atleast 8 characters long and a number",
            validity: {
              required: true,
              regex: passwordRegex,
            }
          },
    }

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const router = useRouter()

  const [userData, setUserData] = useState(registerForm);

  const checkValidity = (values, rules, name, values2 = null) => {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required === false) {
      return true
    }

    if (rules.required) {
      isValid = values.trim() !== "" && isValid
    }
    if (rules.minLength) {
      isValid = values.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = values.length <= rules.maxLength && isValid
    }
    if (rules.regex) {
      isValid = rules.regex.test(values) && isValid
    }
    if (rules.length) {
      isValid = values.length == rules.length && isValid
    }
    if (rules.maxValue) {
      isValid = values <= rules.maxValue;
    }
    // if (values2 && name == "password1")
    // {
    //     isValid = ( values==values2 ) && isValid
    // }
    if (rules.reEnterPassword) {
      // console.log(values == values2, rules, values2, isValid, "values")
      isValid = (values == values2) && isValid
    }
    // console.log("Functions",isValid);

    return isValid;
  }


  const changeHandler = (e) => {

    const { value, name } = e.target;
    console.log(value,"value")
    const updatedFormData = { ...userData };
    const updatedFormElement = { ...updatedFormData[name] };
    let valid = checkValidity(value, updatedFormElement.validity, name);
   
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = valid
    updatedFormData[name] = updatedFormElement;
    console.log(updatedFormElement,"formElement")
    setUserData(updatedFormData);
    setDoubleDisable(false)
  };
  console.log(userData,"reg")


  const errorHandler = () => {
    setShowServerError(false);
  }

  const focusHandler = (e) => {
    const { name } = e.target;
    setUserData((pre) => {
      return { ...pre, [name]: { ...pre[name], focus: true, showError: false, showEmptyError: false } };
    });
  };

  const blurHandler = (e) => {
    const { name } = e.target;
    let newUser = { ...userData };
    if ((newUser[name].value === "" || newUser[name].value === null) && newUser[name].validity.required) {
      newUser = { ...userData, [name]: { ...newUser[name], focus: false, showError: false, showEmptyError: true } };
    } else {
      const showError = !userData[name].valid;
      newUser = { ...userData, [name]: { ...newUser[name], focus: false, showError: showError, showEmptyError: false } }
    }
    setUserData(newUser)
  };


  const submit = (e) => {
    e.preventDefault();
    // if (!doubleDisable) {
    //   setDoubleDisable(true)
  }
  // const newData = { fullName: userData.fullName.value, username: userData.phoneNumber.value, email: userData.email.value, password: userData.password1.value };


  const formDataArray = [];
  for (let key in userData) {
    formDataArray.push({ id: key, formData: userData[key] });
  }

  let disabled = true;
  Object.values(userData).forEach(
    (val) => disabled = val.valid === true && disabled
  );




    const [loginUser, { loading, data: loginData, error }] = useMutation(ACCOUNT_LOGIN_WITH_PHONE, {

        onError: (err) =>
        {
            console.log("received error", err)
        },
        onCompleted: (data) =>
        {
            console.log(data,"loginData")
            if(data?.createToken?.user){
              const login = localStorage.setItem("login_data",JSON.stringify({name:data?.createToken?.user?.firstName,id:data?.createToken?.user?.id}))
              router.push('/')
                // const login = localStorage.setItem("login_username","keraa")

            }
            // console.log('user login successful', data)
        }
    });

    
    
    console.log('sfsdf')
    const loginHandler = (e) => {
        e.preventDefault()
            console.log(username,password,"hee")
            loginUser({ variables: { username: userData.fullName.value, password: userData.password1.value } })
            }


    


    return (
        <div>
          


           <div className={styles.register}>
        <div className={styles.registerleft}></div>
        <div className={styles.registerrightlogin}>
        <ArrowBackIcon style={{marginTop:"80px", marginBottom:"20px", cursor:"pointer"}} onClick={()=>router.push('/')} />
          <div style={{ fontSize: "26px", fontWeight: "600", marginBottom: "30px" }} > Login  </div>
          <div className={styles.registerText}>Don't have an account?<span onClick={()=>router.push('/register')} className={styles.registerLink}> Register</span></div>
          <form>
            {formDataArray.map((inputData, index) => {
              return (
                <Input
                  key={inputData.id}
                  name={inputData.formData.elementConfig.name}
                  type={inputData.formData.elementConfig.type}
                  valid={inputData.formData.valid}
                  placeholder={inputData.formData.elementConfig.placeholder}
                  value={inputData.formData.value}
                  focus={inputData.formData.focus}
                  touched={inputData.formData.touched}
                  defaultValue={inputData.formData.elementConfig.defaultValue}
                  label={inputData.formData.elementConfig.label}
                  style={inputData.formData.style}
                  parentStyle={inputData.formData.parentStyle}
                  smallStyle={inputData.formData.smallStyle}
                  smallParentStyle={inputData.formData.smallParentStyle}
                  showEmptyError={inputData.formData.showEmptyError}
                  showError={inputData.formData.showError}
                  errorMessage={inputData.formData.errorMessage}
                  focusHandler={focusHandler}
                  blurHandler={blurHandler}
                  // style={inputData.formData.style}
                  changeHandler={changeHandler} />
              )
            })}

<button style={{marginTop:30}} type='button' onClick={loginHandler} disabled={!disabled} className={`${styles.registerButton} ${!disabled ? styles.disabled : ""}`}>Submit</button>
</form>

        </div>
      </div>
        </div>
    )
}

export default Login
