import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import Success from "@/components/Alert";
import Confetti from 'react-confetti'
import Loading from "@/components/Loading";

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
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/users/register`, data)

            if (response.status === 200) {
                setSuccess(true)
                seterror(false)
                setLoading(true)
                setTimeout(() => {
                    router.push('/login')
                }, 5000);
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
        <>
            {
                success ?
                    <>
                        <Confetti />
                        <p className="text-6xl sm:text-center sm:text-3xl h-screen flex flex-col items-center justify-center">Registration Successfull! 🥳
                            <br />
                            <small className="text-sm block my-5">Redirecting to login page.. 🤫</small>
                        </p>
                        <p className="flex items-center justify-center"></p>
                    </>
                    :
                    loading ? <Loading /> :
                        <div className="container my-10 relative sm:px-4 ">
                            <h1 className="text-4xl">Hello User 👋</h1>
                            <div className="text-2xl my-5">Lets Register Now!! 🗒️</div>
                            <form onSubmit={handleSubmit} className="w-1/4 md:w-1/2 sm:w-full" >
                                <div className="mt-10 columns-2 flex sm:flex-col ">
                                    <label className="w-1/2 align-middle">First Name : </label>
                                    <input type="text" className="w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="firstname" value={data.firstname} onChange={handleInputChange} />
                                </div>
                                <div className="flex columns-2 mt-10 sm:flex-col">
                                    <label className="w-1/2 align-middle" >Last Name : </label>
                                    <input type="text" className="w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="lastname" value={data.lastname} onChange={handleInputChange} />
                                </div>
                                <div className="flex columns-2 mt-10 sm:flex-col">
                                    <label className="w-1/2 align-middle" >Username : </label>
                                    <input type="text" className="w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="username" value={data.username} onChange={handleInputChange} />
                                </div>
                                <div className="flex columns-2 mt-10 sm:flex-col">
                                    <label className="w-1/2 align-middle" >Password : </label>
                                    <input type="password" className=" w-full outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="password" value={data.password} onChange={handleInputChange} />
                                </div>
                                <button className="my-4 sm:mt-10 sm:w-full  bg-green-300 px-5 text-black text-xl py-2 rounded-md mx-auto">Register</button>
                            </form>
                            {
                                error && <p className="text-6xl"> Username Already Exists ❌</p>
                            }
                        </div>
            }


        </>
    )
}