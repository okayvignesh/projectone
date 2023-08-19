import { PiSealCheckFill } from 'react-icons/pi'
import React from 'react';
import { FaCircleXmark } from 'react-icons/fa6'

interface Alertprops {
    message: String
}


const Success: React.FC<Alertprops> = ({ message }) => {
    return (
        <div className="absolute w-1/4 flex align-middle left-1/4 p-5 border-green-500 border-2 rounded top-1">
            <PiSealCheckFill size={30} fill='white' className="mx-3" />
            <p className="text-2xl">{message}</p>
        </div>
    )
}


export const Error: React.FC<Alertprops> = ({ message }) => {
    return (
        <div className="absolute w-1/4 flex align-middle left-1/4 p-5 border-red-500 border-2 rounded top-1">
            <FaCircleXmark size={30} fill='red' className="mx-3" />
            <p className="text-2xl">{message}</p>
        </div>
    )
}

export default Success;