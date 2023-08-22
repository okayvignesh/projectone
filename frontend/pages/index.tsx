import Loading from "@/components/Loading";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";



export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [token, settoken] = useState('')
  const [books, setBooks] = useState([])
  const [error, setError] = useState({ status: false, message: '' })
  const [success, setSuccess] = useState({ status: false, message: '' })


  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      settoken(token)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
    async function fetchbooks() {
      try {
        const books = await axios.get(`${process.env.NEXT_PUBLIC_URL}/book/get-all/${token}`)
        if (books.status === 200) {
          setBooks(books.data.books)
        } else {
          setError({ status: true, message: 'Error fetching books' })
        }
      } catch (error) {
        setError({ status: true, message: 'Error fetching books' })
      }
    }
    fetchbooks();
  }, []);



  function handleClick() {
    router.push(`/update/${token}`)
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    router.push('/login')
  }


  return (
    <>
      {
        loading ? <Loading />
          :
          <div className="container">
            <div className="flex justify-between items-center mt-10">
              <h1 className="text-center text-4xl sm:text-3xl">Home page 🏠</h1>
              <div>
                <button onClick={handleClick} className="hover:border-b-2 hover:border-b-white transition-all duration-200 border-b-transparent border-b-2" >
                  Edit profile
                </button>
                <button onClick={logout} className="mx-10 hover:border-b-2 hover:border-b-white transition-all duration-200 border-b-transparent border-b-2">
                  Logout
                </button>
              </div>
            </div>

            <div className="p-3 px-10 border mt-10">
              <div className="flex items-center justify-between">
                <p className="text-2xl bold italic underline underline-offset-4">Books.</p>
                <div>
                  <Link href={`/categories/add`} className="me-4">
                    <button className="bg-white text-black px-2 py-1 ">+ Categories</button>
                  </Link>
                  <Link href={`/books/add/${token}`}>
                    <button className="bg-white text-black px-2 py-1 ">+ Add</button>
                  </Link>
                </div>
              </div>
              <div className=" mt-5 flex flex-wrap max-h-72 min-h-56 overflow-y-scroll" >
                {
                  books && books.map((value: any, index: number) => {
                    return (
                      <div className="border p-3 m-2 w-[300px] h-[200px] rounded hover:bg-white hover:text-black duration-200 hover:rounded-none relative" key={index}>
                        <p className="text-2xl">{value.title}</p>
                        <p>{value.author}</p>
                        <p className="mt-5">{value.desc.slice(0, 20)}</p>
                        <p className="absolute top-4 right-4">{value.year}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
      }
    </>
  )
}


export async function getServerSideProps() {

  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/users`)
  const users = response.data.users;
  console.log(users)

  return {
    props: { message: `Next.js is awesome` },
  }
}
