import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
    
            <img className="home-image" src="home-hero.jpg" alt="" />
            <div className="home-text">
                <div className="flex-item home-text-main">
                <h1>Discover the Irresistible Taste of Our Burgers</h1>
                <Link to="menu" className="home-text-button">Check our options</Link>
                </div>
            <p className="flex-item">Welcome to our <span className="home-text-red"> mouthwatering </span> burger paradise! Dive into a world of culinary delight where every bite is <span className="home-text-red">a burst of flavor</span>. At our burger site, we craft the perfect burger experience, from classic to gourmet.
            Savor juicy, handcrafted patties cooked to perfection, <span className="home-text-red">nestled between fresh, toasted buns</span>. Our extensive menu caters to every palate, featuring a variety of protein options, including succulent beef, tender chicken, and plant-based alternatives.
Top it off with an array of <span className="home-text-red">tantalizing</span> toppings, from crispy bacon to creamy avocado, and drizzle with our signature sauces for an unforgettable taste sensation.
Whether you're a traditionalist or an adventurous foodie, our burger creations will satisfy your cravings. Join us for an <span className="home-text-red">unforgettable</span> burger journey today!</p>
            </div> 
        </div>
    )
}