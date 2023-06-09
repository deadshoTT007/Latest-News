import React, { useState, useEffect } from 'react'
import styles from '../styles/header.module.scss'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoriesBox from './CategoriesBox';
import { useRouter } from 'next/router'
import { useMutation, gql } from '@apollo/client';
import { CREATE_COMMENT_REACTION } from '../components/GraphQl/Mutation';
import { secondClient } from './utils/App';
import { DELETE_TOKEN_COOKIE } from '../components/GraphQl/Mutation';
import { USER_LOGOUT } from '../components/GraphQl/Mutation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Header = ({ categorySelectHandler, category, showCategories=null, userData, setUserData }) => {
    console.log(category,"headerCategory")

    console.log(userData,"headeruserData")

    const [focus, setFocus] = useState(false)

    let loginCredentials;

    const [dropdownShow, setDropdownShow] = useState(false)


    console.log(userData,"userData")

    console.log(userData, "userData")

    const [userLogOut, { loading, data }] = useMutation(USER_LOGOUT, {
        onError: (err) => {
            console.log(err)
            // setsigninErrorMessage(err.message)
            // setshowModal(true)
        }
    });


    const [deleteTokenCookie, { loading: loadingCookie, data: dataCookie }] = useMutation(DELETE_TOKEN_COOKIE, {
        onError: (err) => {
            console.log(err)
            // setsigninErrorMessage(err.message)
            // setshowModal(true)
        }
    });


    const focusHandler = (value) => {
        setFocus(value)
    }

    const router = useRouter()

    const logoutHandler = async() => {
        userLogOut();
        deleteTokenCookie();
        await localStorage.removeItem('login_data')
        setUserData(localStorage.getItem('login_data'))
        // setUserData(localStorage.setItem("login_data", JSON.stringify({ name: "", id: "" })));
    }

    const [createCommentReaction, createCommentReactionData] = useMutation(CREATE_COMMENT_REACTION, {
        client: secondClient,
        // refetchQueries: [{ query: GET_NEWS_COMMENTS }, "newsComment"],
        onError: (err) => {
            console.log(' error changing reaction', err)


        },
        onCompleted: (data) => {
            console.log('successful in chaging reaction 2', data)
        },

    });

    useEffect(() => {
        // setUserData(JSON.parse(localStorage.getItem("login_data")))
    }, [])


    return (
        <>
            <div className={styles.mainHeaderContainer}>
                <div className={styles.mainHeader}>
                    <div style={{ cursor: "pointer",fontSize:24, fontWeight:600 }} onClick={() => router.push('/')} className={styles.headerLogo}>Daily News</div>
                    {/* className={`${styles.headerSearchContainer} ${focus ? styles.focusheaderSearchContainer : ""} `} */}
                    <div >
                        {/* <SearchIcon /> */}
                        {/* <input onFocus={() => focusHandler(true)} onBlur={() => focusHandler(false)} type="text" className={styles.searchText} placeholder="Search for news" /> */}
                    </div>
                    {userData?.name && (
                        <div className={styles.mainDropdownUserContainer}>
                            <div onClick={() => setDropdownShow(pre => !pre)} style={{ cursor: "pointer" }} className={styles.userContainer}>
                                <AccountCircleIcon onClick={() => router.push('/login')} style={{ fontSize: 30, color: "#5f6368" }} />
                                <div className={styles.username}>{userData.name}</div>
                                <KeyboardArrowDownIcon />
                            </div>
                            {dropdownShow && (
                                <div className={styles.dropdownAction}>
                                    <div onClick={logoutHandler} className={styles.logoutButton}>Logout</div>
                                </div>
                            )}
                        </div>
                    )}
                    {!userData?.name && (
                        <div onClick={() => router.push('/login')} style={{ cursor: "pointer" }} className={styles.login}>Register/Login</div>
                    )
                    }
                    <div className={`${styles.mobileheaderSearchContainer} ${focus ? styles.focusheaderSearchContainer : ""} `}>
                        <SearchIcon />
                        <input onFocus={() => focusHandler(true)} onBlur={() => focusHandler(false)} type="text" className={styles.searchText} placeholder="Search for news" />
                    </div>
                </div>
                { showCategories===false?(
                    <></>
                ):
                <CategoriesBox category={category} categorySelectHandler={categorySelectHandler} />
                }
            </div>
        </>
    )
}

export default Header
