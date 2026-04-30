import React from 'react'
import advertiseBanner from '../../assets/middle_ad.png'
import Image from '../layout/Image'
import Container from '../layout/Container'
import { Link } from 'react-router-dom'

const MiddleAd = () => {
  return (
    <section className='mt-12 sm:mt-16 md:mt-24 lg:mt-32'>
      <Container>
        <div className="overflow-hidden group cursor-pointer">
          <Link to={"/shop"}>
            <Image 
              className={"w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"} 
              imageLink={advertiseBanner} 
              altText={"Special Promotion"}
            />
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default MiddleAd