import React from 'react'
import Navbar from '../components/navbar'
import Herosection from '../components/herosection'
import Catogeries from '../components/catogeries'
import PetCareService from './petCareService'
import Bottombar from '../components/bottombar'

function LandingPge() {
    return (
        <div style={{
            background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
          }}className='w-full h-auto flex flex-col items-center justify-start rounded-t-xl'>
            <Navbar />
            <div className='sticky top-0 z-10 w-full'>

            <Herosection/>
            <Catogeries/>

            
            </div>
           
            <PetCareService/>
            {/* <TopProducts/> */}
            <Bottombar/>
        </div>
    )
}

export default LandingPge