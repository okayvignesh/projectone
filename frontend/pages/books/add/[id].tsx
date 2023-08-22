import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router"
import Loading from '../../../components/Loading'
import Link from "next/link";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import axios from "axios";
import Success, { Error } from "@/components/Alert";

function add() {
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [category, setcategory] = useState([])
    const [state, setState] = useState({
        title: '',
        desc: '',
        year: '',
        category: '',
        author: ''
    })
    const [error, setError] = useState({ status: false, message: '' })
    const [success, setSuccess] = useState({ status: false, message: '' })
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


    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setState({ ...state, [event.target.name]: event.target.value })
    }


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true)
            const books = await axios.post(`${process.env.NEXT_PUBLIC_URL}/book/add-book/${token}`, state)
            if (books.status === 200) {
                setSuccess({ status: true, message: 'Book has been Created!' })
                setState({
                    title: '',
                    desc: '',
                    year: '',
                    category: '',
                    author: ''
                })
            } else {
                setError({ status: true, message: 'Error creating book' })
            }
        } catch (error) {
            setError({ status: true, message: "Internal error" })
        } finally {
            setTimeout(() => {
                setSuccess({ status: false, message: '' })
                setError({ status: false, message: '' })
            }, 2000);
        }
    }


    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className="container mt-10">
                        <Link href='/'>
                            <p className="text-4xl my-10 italic flex items-center">
                                <BsFillArrowLeftCircleFill fill='white' size={30} className="mx-4" />
                                Add Books.
                            </p>
                        </Link>
                        <form onSubmit={handleSubmit}>
                            <div className="flex w-1/2 my-3">
                                <label className="w-1/4">Category:</label>
                                <select className="bg-black outline-none text-white border rounded  p-2 w-full " name="category" onChange={handleChange}>
                                    <option >Select a category</option>
                                    {
                                        category && category.map((value: any, index) => {
                                            return (
                                                <option value={value._id} key={index}>{value.category}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="flex w-1/2 my-3">
                                <label className="w-1/4">Title:</label>
                                <input type="text" className="bg-transparent border rounded p-1 mx-5 w-full" name="title" value={state.title} onChange={handleChange} required />
                            </div>
                            <div className="flex w-1/2 my-3">
                                <label className="w-1/4">Description:</label>
                                <textarea rows={6} className="bg-transparent border rounded p-1 mx-5 w-full" name="desc" value={state.desc} onChange={handleChange} required />
                            </div>
                            <div className="flex w-1/2 my-3">
                                <label className="w-1/4">Year:</label>
                                <input type="number" className="bg-transparent border rounded p-1 mx-5 w-full" name="year" value={state.year} onChange={handleChange} required />
                            </div>
                            <div className="flex w-1/2 my-3">
                                <label className="w-1/4">Author:</label>
                                <input type="text" className="bg-transparent border rounded p-1 mx-5 w-full" name="author" value={state.author} onChange={handleChange} required />
                            </div>
                            <button className="bg-white text-black p-2 mt-5" type="submit">Submit</button>
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
