import React from 'react'
import styles from '../styles/categories.module.scss'
import { useLazyQuery, gql, useQuery } from '@apollo/client';
import { secondClient } from './utils/App';
import { GET_NEW_CATEGORIES } from '../components/GraphQl/Queries';




const CategoriesBox = ({categorySelectHandler,category}) => {

    console.log(category,"keracategory")


    const { data, loading, error } = useQuery(GET_NEW_CATEGORIES, {
        client: secondClient,
        onError: (err) =>
        {
            console.log('graphql error shovan profile', JSON.stringify(err))
        },
        onCompleted: (data) =>
        {
            // console.log('categories data', data)
            // console.log('data from shovan profile', data)
            console.log(data)
        }
    });

    console.log(data)
    const newsCategory = data?.newsCategories



    return (
        <div className={styles.CategoriesBoxContainer}>
            {newsCategory && newsCategory.map((cat,index)=>{
                console.log(cat.id,category?.id,"check")
                console.log(cat,"caaat")
                return (
                    <div onClick={()=>categorySelectHandler(cat.id)} key={index} className={`${styles.categories} ${cat.id==category ? styles.activeCategory :""}`}  >{cat.name}</div>
                )
            })}
        </div>
    )
}

export default CategoriesBox
