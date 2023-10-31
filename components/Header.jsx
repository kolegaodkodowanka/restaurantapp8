import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">#BURGEROWNIA</Link>
            <p>(555) 123-4567</p>
            <nav>
                <Link to="/about">Contact</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/order">Order Now</Link>
            </nav>
        </header>
    )
}