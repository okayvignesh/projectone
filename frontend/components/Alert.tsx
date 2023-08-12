import { PiSealCheckFill } from 'react-icons/pi'
import React from 'react';

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

export default Success;