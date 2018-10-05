import React from 'react'
import { Link } from 'react-router-dom'

/**
  * Navigation Bar on the Application header
  *
  * Used in Main component
  */
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/upload'>Upload</Link></li>
        <li><Link to='/data'>Data Browser</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
