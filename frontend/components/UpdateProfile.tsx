import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/router';
import Loading from './Loading';
import Success, { Error } from './Alert';
import Link from 'next/link';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

function UpdateProfile() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: '' })
    const [success, setsuccess] = useState({ status: false, message: '' })
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/users/${id}`)
            if (response.status === 200) {
                setState(response.data.users)
            } else {
                setError({ status: true, message: 'User not found' })
            }
        }
        fetchUser();
    }, [id])


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }


    async function formSubmit(event: FormEvent) {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_URL}/users/update/${id}`, state)
            console.log(response)
            if (response.status === 200) {
                setsuccess({ status: true, message: response.data })
                setLoading(false)
            }
        } catch (error) {
            setError({ status: true, message: 'Internal Server Error' })
        }
    }

    if (!state) {
        return (
            <>
                <Error message={"user not found"} />
            </>
        )
    }

    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className="container h-screen mt-36">
                        <Link href='/' className='text-xl flex items-center'>
                            <BsFillArrowLeftCircleFill className="me-5" />
                            Back to home 🏠
                        </Link>
                        <p className="text-4xl text-green-400 mt-5">Update Your Profile Details 👇</p>
                        <form onSubmit={formSubmit}>
                            <div className="block mt-5 columns-2">
                                <label className="w-full">FirstName:</label>
                                <input type="text" className="bg-transparent border-white border rounded p-1 mx-5" value={state.firstname} onChange={handleChange} name='firstname' />
                            </div>
                            <div className="block mt-5 columns-2">
                                <label className="w-full">LastName:</label>
                                <input type="text" className="bg-transparent border-white border rounded p-1 mx-5" value={state.lastname} onChange={handleChange} name='lastname' />
                            </div>
                            <div className="block mt-5 columns-2">
                                <label className="w-full">Email:</label>
                                <input type="text" className="bg-transparent border-white border rounded p-1 mx-5" value={state.email} onChange={handleChange} name='email' />
                            </div>
                            <div className="block mt-5 columns-2">
                                <label className="w-full">Phone:</label>
                                <input type="text" className="bg-transparent border-white border rounded p-1 mx-5" value={state.phone} onChange={handleChange} name='phone' />
                            </div>
                            <button className='bg-green-300 text-black p-2 mt-5 rounded' type='submit'>Update</button>
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

export default UpdateProfile
