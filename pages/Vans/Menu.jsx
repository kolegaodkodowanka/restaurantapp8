import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = React.useState([]);
  const [selectedBurgers, setSelectedBurgers] = useState(initializeSelectedBurgers());
  const storedBurgers = localStorage.getItem('selectedBurgers');
const hasSelectedBurgers = storedBurgers ? JSON.parse(storedBurgers).length > 0 : false;


  console.log(selectedBurgers);

  const typeFilter = searchParams.get("type");

  function initializeSelectedBurgers() {
    const storedBurgers = localStorage.getItem('selectedBurgers');
    return storedBurgers ? JSON.parse(storedBurgers) : [];
  }

  React.useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

    const addToCart = (item) => {
        setSelectedBurgers((prevSelectedBurgers) => {
          const existingItem = prevSelectedBurgers.find((cartItem) => cartItem.id === item.id);
      
          if (existingItem) {
            // If item already exists in the cart, update its quantity
            const updatedBurgers = prevSelectedBurgers.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, 100) }
                : cartItem
            );
            localStorage.setItem('selectedBurgers', JSON.stringify(updatedBurgers)); // Update localStorage
            return updatedBurgers;
          } else {
            // If item doesn't exist in the cart, add it with quantity 1
            const updatedBurgers = [...prevSelectedBurgers, { ...item, quantity: 1 }];
            localStorage.setItem('selectedBurgers', JSON.stringify(updatedBurgers)); // Update localStorage
            return updatedBurgers;
          }
        });
      };
      
      const removeFromCart = (itemId) => {
        setSelectedBurgers((prevSelectedBurgers) => {
          const updatedBurgers = prevSelectedBurgers.reduce((newSelectedBurgers, item) => {
            if (item.id === itemId) {
              if (item.quantity > 1) {
                // If item quantity is greater than 1, decrease the quantity by 1
                newSelectedBurgers.push({ ...item, quantity: item.quantity - 1 });
              }
              // If item quantity is 1 or less, don't add it back to the cart
            } else {
              // Keep other items in the cart
              newSelectedBurgers.push(item);
            }
            return newSelectedBurgers;
          }, []);
          localStorage.setItem('selectedBurgers', JSON.stringify(updatedBurgers)); // Update localStorage
          return updatedBurgers;
        });
      };
  const calculateTotalPrice = () => {
    return selectedBurgers.reduce((total, item) => {
      return total + item.price * (item.quantity || 1); // Multiply by quantity if it exists
    }, 0); // Start with a total of 0
  };

  const burgerElements = displayedVans.map((van) => (
    <div key={van.id} className="menu-box">
      <div className="menu-tile">
        <img src={van.imageUrl} alt={van.name} />
        <div className="menu-info">
          <div>
            <h3>{van.name}</h3>
          </div>
          <p className="menu-price">
            {van.price}
            <span className="home-text-red"> PLN</span>
          </p>
          <p className="menu-desc">{van.description}</p>
        </div>
        <button onClick={() => addToCart(van)}>+</button>
      </div>
    </div>
  ));

  const shoppingCart = selectedBurgers.map((item) => (
     <div>
        <div className="cart-box-text">
          <p>{item.quantity || 0}</p>
          <p className="home-text-red">{item.name}</p>
          <p>
            {item.price * item.quantity} <span className="home-text-red">PLN</span>
          </p>
        </div>
        <div className="cart-box-buttons">
          <button className="cart-button" onClick={() => addToCart(item)}>+</button>
          <button className="cart-button" onClick={() => removeFromCart(item.id)}>-</button>
        </div>      
        </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
   
      <div className="menu-list-container">
      <h1>Explore our burger options</h1>
      <div className="menu-list-filter-buttons">
      <button
          onClick={() => handleFilterChange("type", "classic")}
          className={`menu-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
        >
          classic
        </button>
        <button
          onClick={() => handleFilterChange("type", "vegetarian")}
          className={`menu-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          vegatarian
        </button>
        <button
          onClick={() => handleFilterChange("type", "vegan")}
          className={`menu-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
        >
          vegan
        </button>

        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="menu-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="menu-list-cart-container">
      <div className="menu-list">{burgerElements}</div>
      
      <div>
        <div className="menu-cart">
      <h1>Shopping Cart</h1>
      <div className="cart-box">
      {shoppingCart}
        <div className="cart-price">
          <div className="cart-price-summary">
            <p>Together</p>
            <p>{calculateTotalPrice()}  <span className="home-text-red">PLN</span></p>
          </div>
          <div className="cart-price-summary">
            <p>Delivery Cost</p>
            <p>5 <span className="home-text-red">PLN</span></p>
          </div>
          <div className="cart-price-summary">
            <p>Total Amount</p>
            <p>{calculateTotalPrice() + 5}  <span className="home-text-red">PLN</span></p>
          </div>
        </div>
       {/* Conditionally render the button based on the existence of selectedBurgers */}
       {hasSelectedBurgers ? (
          <Link to="/order" className="cart-checkout">
            Proceed to checkout
          </Link>
        ) : (
          <button className="cart-checkout-disabled" disabled>
            Proceed to checkout
          </button>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>

  );
}
