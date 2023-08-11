import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import Success from '../components/Alert'
import { PiSealCheckFill } from 'react-icons/pi'

export default function Register() {
    const router = useRouter();
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    })
    const [success, setSuccess] = useState(false)
    const [error, seterror] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log(data)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/users/register`, { data })

            if (response.status === 200) {
                setSuccess(true)

                router.push('/login')
            }
        } catch (error) {
            console.log(error)
            seterror(true)
            setSuccess(false)
        }
    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    return (
        <div className="container my-10 relative">
            <h1 className="text-4xl">Hello User 👋</h1>
            <div className="text-2xl my-5">Lets Register Now!! 🗒️</div>
            <form onSubmit={handleSubmit} className="w-1/4 md:w-1/2" >
                <div className="mt-10 columns-2 flex ">
                    <label className="w-1/2 align-middle">First Name : </label>
                    <input type="text" className="w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="firstname" value={data.firstname} onChange={handleInputChange} />
                </div>
                <div className="flex columns-2 mt-10">
                    <label className="w-1/2 align-middle" >Last Name : </label>
                    <input type="text" className="w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="lastname" value={data.lastname} onChange={handleInputChange} />
                </div>
                <div className="flex columns-2 mt-10">
                    <label className="w-1/2 align-middle" >Username : </label>
                    <input type="text" className="w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="username" value={data.username} onChange={handleInputChange} />
                </div>
                <div className="flex columns-2 mt-10">
                    <label className="w-1/2 align-middle" >Password : </label>
                    <input type="password" className=" w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="password" value={data.password} onChange={handleInputChange} />
                </div>
                <button className="my-4  bg-green-300 px-5 text-green-500 text-xl py-2 rounded-md mx-auto">login</button>
            </form>
            {
                success && <p className="text-6xl"> Welcome Onboard {data.username} 👋</p>
            }
            {
                error && <p className="text-6xl"> Username Already Exists ❌</p>
            }
            {
                !success && <Success message={'Success'} />
            }

        </div>
    )
}