import Header from "./Header"
import MainNews from "./MainNews"
import AddComment from "../components/AddComment"
import React, { useState } from "react"
const Index = () => {

    const [ category, setCategory ] = useState(null)


	const categorySelectHandler = (cat) => {
		console.log(cat,"cat")
		console.log(cat)
		setCategory(cat)
}

console.log(category,"index Category")

	return (
		<>
		<Header category={category}  categorySelectHandler={categorySelectHandler} />
		<MainNews category={category} categorySelectHandler={categorySelectHandler} />
		</>
			
	)
}

export default Index