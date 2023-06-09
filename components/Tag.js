import React, { useState } from 'react'
import styles from '../styles/register.module.scss'

const Tag = ({ name,id,categoryHandler }) => {

    const [ active, setActive ] = useState(false)
    console.log(active,"check")

    return (
        <div className={`${styles.categoriesItem}  ${ active?styles.activeCategoriesItem:""}`}  onClick={() =>{ categoryHandler(id);setActive(true)}} >{name}</div>
       
    )
}

export default Tag
