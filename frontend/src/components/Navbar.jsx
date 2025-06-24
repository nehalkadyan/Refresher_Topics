import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between p-2 lg:px-26 h-17 items-center'>
        {/* logo */}
        <div>
           <h1 className='font-bold lg:text-3xl'>Medium</h1>
        </div>

        {/* nav options */}
        <div>
          <ul className='flex gap-2 lg:gap-5 text-xs lg:text-sm items-center'>
            <li>Our Story</li>
            <li>Membership</li>
            <li>Write </li>
            <li>Signin</li>
            <li className='bg-black p-2 lg:p-2 lg:px-4 cursor-pointer text-white text-xs lg:text-sm font-semibold rounded-4xl'>Get Started</li>
          </ul>
        </div>
    </nav>
  )
}

export default Navbar