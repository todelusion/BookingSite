import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (url: string) => {
    const [data, setData] = useState(null)
	useEffect(() => {
		const fetchData = async() => {
			const res = await axios.get(url)
			setData(res.data)
		}
		fetchData()
	},[])
	return { data }
}

export default useFetch