import React from 'react'
import styles from '../styles/input.module.scss'


const Input=(props)=>{

    const{autoFocus, style , blurHandler, className, changeHandler, disabled,errorMessage, required, focusHandler, label, name, placeholder, showEmptyError, showError, type,value, inputClassname}=props;
    const emptyMessage = `Please fill this input field with ${label}`;


    return(
        <div  className={`${styles.input} ${styles.className}`}>
            { label && <label className={styles.inputlabel}>{label}</label> }
            <input style={style}  autoFocus={autoFocus} disabled={disabled?true:false} className={`${styles.inputinput} ${showError || showEmptyError?styles.inputinputerror:''} ${styles.inputClassname}
          `} type={type} placeholder={placeholder} 
             name={name} value={value} onChange={changeHandler} onFocus={focusHandler} onBlur={blurHandler}/>
            {showError && <div style={{color:"red"}} >{errorMessage}</div>}
            {showEmptyError && required  && <div className={styles.inputinputmessage}>{emptyMessage}</div> }
        </div>
    )
}


export default Input