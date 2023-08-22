import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router"
import Loading from '../../components/Loading'
import axios from "axios";
import Success, { Error } from "@/components/Alert";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import Link from "next/link";

function add() {
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: '' })
    const [success, setSuccess] = useState({ status: false, message: '' })
    const [state, setState] = useState({ category: '' })
    const [category, setcategory] = useState([])
    const router = useRouter();


    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (!token) {
            router.push('/login')
        } else {
            setToken(token);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/category/get-all`)
                const data = response.data.categories
                setcategory(data)
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [loading])


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            setLoading(true)
            const category = await axios.post(`${process.env.NEXT_PUBLIC_URL}/category/add`, state)
            if (category.status === 200) {
                setSuccess({ status: true, message: 'Category has been created!' })
                setLoading(false)
                setState({
                    category: ''
                })
            } else {
                setError({ status: true, message: 'Category already exists' })
                setLoading(false)
            }
        } catch (error) {
            setError({ status: true, message: 'Duplicate Entry' })
            setLoading(false)
        } finally {
            setTimeout(() => {
                setError({ status: false, message: '' })
                setSuccess({ status: false, message: '' })
            }, 2000);
        }
    }



    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className="container mt-20">
                        <Link href='/'>
                            <p className="text-4xl my-10 italic flex items-center">
                                <BsFillArrowLeftCircleFill fill='white' size={30} className="mx-4" />
                                Add Categories.
                            </p>
                        </Link>
                        <p className="my-2 underline underline-offset-4">Your categories: </p>
                        <div className="flex border  w-3/4 p-2 flex-wrap">
                            {
                                category && category.length != 0 ? category.map((value: any, index) => {
                                    return (
                                        <div className="border p-1 px-2 rounded cursor-pointer hover:bg-white hover:text-black m-2" key={index}>
                                            {value.category}
                                        </div>
                                    )
                                }) : <p>Nothing here 🌬️ </p>
                            }
                        </div>
                        <form onSubmit={handleSubmit} className="mt-10">
                            <div className="flex w-1/2 my-3">
                                <label className="w-1/4">Category :</label>
                                <input type="text" className="bg-transparent border rounded p-1 mx-5 w-full" name="category" value={state.category} onChange={handleChange} required />
                            </div>
                            <button className="bg-white p-2 text-black" type="submit">
                                Submit
                            </button>
                        </form>


                    </div>
            }
            {
                success.status && <Success message={success.message} />
            }
            {
                error.status && <Error message={error.message} />
            }
        </>

    )
}

export default add
