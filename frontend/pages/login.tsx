import { useState, ChangeEvent, FormEvent } from "react"
import axios from "axios";


export default function Login() {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [success, setSuccess] = useState(false)
    const [error, seterror] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/users/add`, { username: data.username })

            if (response.status === 200) {
                setSuccess(true)
                return response.data
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
        <div className="container my-10">
            <h1 className="text-4xl">Hello Vignesh 👋</h1>
            <div className="text-2xl my-5">Lets Login Now!! 🔏</div>
            <form onSubmit={handleSubmit}>
                <div className="block mt-10">
                    <label >Username : </label>
                    <input type="text" className="outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="username" value={data.username} onChange={handleInputChange} />
                </div>
                <label >Password : </label>
                <input type="password" className="outline-none rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="password" value={data.password} onChange={handleInputChange} />
                <button className="my-4 mx-4 bg-green-300 px-5 text-green-500 text-xl py-2 rounded-md">login</button>
            </form>
            {
                success && <p className="text-6xl"> Welcome Onboard {data.username} 👋</p>
            }
            {
                error && <p className="text-6xl"> Username Already Exists ❌</p>
            }
        </div>
    )
}
