import Header from "./Header"
import MainNews from "./MainNews"
import AddComment from "../components/AddComment"
import React, { useState, useEffect } from "react"
const Index = () => {

    const [ category, setCategory ] = useState(null)
    const [userData, setUserData] = useState(null)


	console.log(userData,"indexUserData")

	const categorySelectHandler = (cat) => {
		console.log(cat,"cat")
		console.log(cat)
		setCategory(cat)
}

useEffect(()=>{
	setUserData(JSON.parse(localStorage.getItem('login_data')))
},[])

console.log(category,"index Category")

	return (
		<>
		<Header userData={userData} setUserData={setUserData} category={category}  categorySelectHandler={categorySelectHandler} />
		<MainNews userData={userData} category={category} categorySelectHandler={categorySelectHandler} />
		</>
			
	)
}

export default Index