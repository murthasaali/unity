import React from 'react'
import Account from '../components/account'
import {useParams} from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

function UserDetails() {
    const {userId}=useParams()
    console.log(userId)
  return (
    <div className='w-full h-screen bg-black'>
       
     <div className='w-full h-full flex justify-center p-0'>
                <div className='md:h-[650px] h-[100%] bg-opacity-40 rounded-xl  w-full md:w-[750px] overflow-y-scroll flex flex-col justify-start items-center md:p-4 p-1' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
<Account user={userId} myAccount={false}/>
                </div>
            </div>
    </div>
  )
}

export default UserDetails
