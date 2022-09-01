import React from 'react'
import Product from '../product/Product'
import '../home/Home.css'

function Home() {
  return (
    <>
    <div className='home'>
       <div className='home__container'>
          <img className='home__image' src='https://www.seoclerk.com/pics/000/956/122/f1c0a0417c795024b157a6fd9ed721ed.jpg' alt='home-banner ' />
       
       <div className='home__row'>
            <Product title={'Samsung S5'} 
            id='01'
            price={2.99} rating={5} 
            image={'assets/images/products/digital_01.jpg'}/>

            <Product title={'Lean Startup'}
             price={999.99} rating={4}
             image={'assets/images/products/lean-startup_book-cover.jpeg'}/>
       </div>

       <div className='home__row'>
            <Product />
            <Product />
            <Product />
            
       </div>
       <div className='home__row'>
       <Product title={'Born to Kick'} price={1999.99} rating={4} image={'assets/images/products/mega_accessories_2.jpg'}/>
       </div>
       </div>
    </div>
    </>
  )
}

export default Home
