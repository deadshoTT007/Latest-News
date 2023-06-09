import React, { useEffect } from 'react';
import { useState } from 'react';


import Link from 'next/link';
import styles from '../styles/register.module.scss'

import Input from '../components/Input';

import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)
const passwordRegex = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$')
const phoneNumberRegex = new RegExp(/^(9(8|7))\d{8}$/)
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { secondClient } from './utils/App';
import { ACCOUNT_REGISTER_WITH_PHONE } from '../components/GraphQl/Mutation';
import { GET_NEW_CATEGORIES } from '../components/GraphQl/Queries';
import { CREATE_USER_INTEREST } from '../components/GraphQl/Mutation';
import { OTP_VERIFICATION } from '../components/GraphQl/Mutation';
import Tag from '../components/Tag';

const registerForm = {
  fullName: {
    elementConfig: {
      type: "text",
      placeholder: "Your fullname",
      name: "fullName",
      label: 'Full Name'
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
  phoneNumber: {
    elementConfig: {
      type: "text",
      placeholder: "Your phone number",
      name: "phoneNumber",
      defaultValue: "+977",
      label: 'Phone number'
    },
    //value: '9841122040',
    value: '',
    valid: false,
    focus: null,
    touched: false,
    autoFocus: true,
    showError: false,
    showEmptyError: false,
    errorMessage: "Phone number should start with 98/97 ",
    validity: {
      required: true,
      regex: phoneNumberRegex
    },
  },
  email: {
    elementConfig: {
      type: "text",
      placeholder: "Your email(optional)",
      name: "email",
      label: 'Email'
    },
    //value: 'sajanamatya10@gmail.com',
    value: '',
    valid: true,
    focus: null,
    touched: false,
    autoFocus: true,
    showError: false,
    showEmptyError: false,
    errorMessage: "Invalid email address",
    validity: {
      required: true,
      regex: emailRegex
    },
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

};


const RegisterForm = (props) => {

  const [doubleDisable, setDoubleDisable] = useState(false)
  const [userData, setUserData] = useState(registerForm);
  const [showServerError, setShowServerError] = useState(false);

  const [categories, setCategories] = useState([])

  const [cat, setCat] = useState([])

  const [otp, setOTP] = useState("")

  const router = useRouter()

  const [showOTP, setShowOTP] = useState(false)

  const [userPreference, setUserPreference] = useState(true)

  const [showForm, setShowForm] = useState(false)


  const [createUserInterest, createUserInterestData] = useMutation(CREATE_USER_INTEREST, {
    client: secondClient,
    // refetchQueries: [{ query: GET_NEWS_COMMENTS }, "newsComment"],
    onError: (err) => {
      console.log(' error changing reaction', err)


    },
    onCompleted: (data) => {
      console.log('successful in submiting user tags', data)
      router.push('/')
      // interestRegisterSuccessful();

    },

  });


  const [register, { loading1, data1 }] = useMutation(ACCOUNT_REGISTER_WITH_PHONE, {
    onError: (err) => {
      console.log('graphql error', JSON.stringify(err))
    },
    onCompleted: (data1) => {

      setShowOTP(true)
      setShowForm(false)

    }

  });

  console.log(cat, "catt")



  const newsCategories = useQuery(GET_NEW_CATEGORIES, {
    fetchPolicy: 'no-cache',
    client: secondClient,
    onError: (err) => {
      console.log('graphql error shovan 9', JSON.stringify(err));
    },
    onCompleted: (data) => {
      setCategories(data.newsCategories)

      // console.log('news cat', data);
      console.log(data.newsCategories, "dataa")
    }
  });


  console.log(categories, "categories")


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


  const signUpHandler = () => {
    try {
      register({
        variables: {
          username: userData.phoneNumber.value,
          password: userData.password1.value,
          fullName: userData.email.value,
        }
      })
    }
    catch (error) {
      consol.log('graphql error', error)
    }
  }


  const changeHandler = (e) => {

    const { value, name } = e.target;
    const updatedFormData = { ...userData };
    const updatedFormElement = { ...updatedFormData[name] };
    let valid = checkValidity(value, updatedFormElement.validity, name);

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = valid
    updatedFormData[name] = updatedFormElement;
    setUserData(updatedFormData);
    setDoubleDisable(false)
  };

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

  console.log(disabled, "disa")

  const categoryHandler = (cat) => {
    console.log(cat, "cat")
    setCat(pre=>new Set([...pre,cat]))
  }

  const otpChangeHandler = (e) => {
    setOTP(e.target.value);
  }

  const [verifyMutation, { loading2, data2, error2 }] = useMutation(OTP_VERIFICATION, {
    onError: (err) => {
      console.log('graphql error', JSON.stringify(err))
      // setotpError(true)
      // setotpErrorMessage(err.message)
    },
    onCompleted: () => {
      // router.push('/login')
      // verifyOtpSuccessful();
      setShowOTP(false)
      setUserPreference(true)
      // updateFCMToken();

    }
  });

  const otpHandler = (e) => {
    e.preventDefault()
    verifyMutation({
      variables: {
        username: userData.phoneNumber.value,
        otp: otp
      }
    })
  }

  const userPreferenceHandler = (e) => {
    e.preventDefault()
    console.log(cat,"cat user")
    createUserInterest({ variables: { newsCatIds: Array.from(cat) } })
  }





  return (
    <>
      <div className={styles.register}>
        <div className={styles.registerleft}></div>
        <div className={styles.registerrightlogin}>
          <ArrowBackIcon style={{ marginTop: "80px", marginBottom: "20px", cursor: "pointer" }} onClick={() => router.back()} />
        {showForm && (
          <>
            <div style={{ fontSize: "26px", fontWeight: "600", marginBottom: "30px" }} > Register  </div>
            <div className={styles.registerText}>Already have an account?<span onClick={() => router.push('/login')} className={styles.registerLink}> Login</span></div>
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
              <button onClick={signUpHandler} type='button' disabled={!disabled} className={`${styles.registerButton} ${!disabled ? styles.disabled : ""}`}>Submit</button>

            </form>
</>
)}


        {showOTP && (
          <>
            <div className={styles.OTPContainer}>
              <div className={styles.main}>Enter OTP</div>
              <input  placeholder="Enter OTP" className={`${styles.inputinput}`} onChange={otpChangeHandler} type="text" />
            </div>
            <button  className={`${styles.registerButton}`} onClick={otpHandler}>Enter OTP </button>
          </>

        )}

        {userPreference && (
          <>
            <div className={styles.userPreference}>User Preference</div>
            <div className={styles.userSelect} name="cars" id="cars">
              {categories && categories.length > 0 && categories.map((category, index) => {
                console.log(typeof cat, cat, "hawacat")
                return (
                  <Tag name={category.name} id={category.id}  categoryHandler={categoryHandler} />
                )
              })}

            </div>
            <button style={{marginTop:"0px"}}  className={`${styles.registerButton}`} onClick={userPreferenceHandler}>Choose your news Preference</button>

          </>
        )}


      </div>
</div>

    </>
  )

}


export default RegisterForm