import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Order() {
 



  // Initialize state for user inputs
  const [postcode, setPostcode] = useState(localStorage.getItem('postcode') || '');
  const [street, setStreet] = useState(localStorage.getItem('street') || '');
  const [city, setCity] = useState(localStorage.getItem('city') || '');
  const [buildingNumber, setBuildingNumber] = useState(localStorage.getItem('buildingNumber') || '');
  const [doorNumber, setDoorNumber] = useState(localStorage.getItem('doorNumber') || '');
  const [paymentMethod, setPaymentMethod] = useState(localStorage.getItem('paymentMethod') || 'Credit Card');
  const [totalAmount, setTotalAmount] = useState(calculateTotalPrice()); // Calculate initial total amount
  const selectedBurgers = JSON.parse(localStorage.getItem('selectedBurgers')) || [];
  const [cardNumber, setCardNumber] = useState(localStorage.getItem('cardNumber') || '');
  const [expirationDate, setExpirationDate] = useState(localStorage.getItem('expirationDate') || '');
  const [securityCode, setSecurityCode] = useState(localStorage.getItem('securityCode') || '');
  const [ordered, setOrdered] = useState(false);


  const deliveryAddress = `${postcode}, ${street}, ${city}, Building ${buildingNumber}, Door ${doorNumber}`;

  useEffect(() => {
    localStorage.setItem('postcode', postcode);
    localStorage.setItem('street', street);
    localStorage.setItem('city', city);
    localStorage.setItem('buildingNumber', buildingNumber);
    localStorage.setItem('doorNumber', doorNumber);
    localStorage.setItem('paymentMethod', paymentMethod);
    localStorage.setItem('cardNumber', cardNumber);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('securityCode', securityCode);
    localStorage.setItem('ordered', ordered);
  }, [postcode, street, city, buildingNumber, doorNumber, paymentMethod, cardNumber, expirationDate, securityCode,ordered]);

     


  
   




  function handlePlaceOrderClick() {
    f

  }
  
  

  // Function to calculate the total price based on selected burgers
  function calculateTotalPrice() {
    const storedBurgers = localStorage.getItem('selectedBurgers');
    if (storedBurgers) {
      const selectedBurgers = JSON.parse(storedBurgers);
      return selectedBurgers.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0);
    }
    return 0; // Default to 0 if no selected burgers found
  }

  const handleResign = () => {
    localStorage.removeItem('selectedBurgers'); // Clear selected burgers from local storage
  };
  // Handle changes in the address input fields
  function handlePostcodeChange(event) {
    setPostcode(event.target.value);
  }

  function handleStreetChange(event) {
    setStreet(event.target.value);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleBuildingNumberChange(event) {
    setBuildingNumber(event.target.value);
  }

  function handleDoorNumberChange(event) {
    setDoorNumber(event.target.value);
  }

  // Handle changes in the payment method input
  function handlePaymentMethodChange(event) {
    setPaymentMethod(event.target.value);
  }
  function handleCardNumberChange(event) {
    setCardNumber(event.target.value);
  }

  // Handle changes in the expiration date input
  function handleExpirationDateChange(event) {
    setExpirationDate(event.target.value);
  }
  function handleSecurityCodeChange(event) {
    setSecurityCode(event.target.value);
  }
  

  // Handle the form submission
  function handleSubmit(event) {
    event.preventDefault();
    // You can handle the submission logic here, such as sending the order to the server.
    // For now, we'll simply display a confirmation message.
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          {id: 1, quantity: 3},
          {id: 2, quantity: 1}
        ]
      })
    }).then(res => {

      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
  window.location = url
})
 


    setOrdered(!ordered)
     alert(`Order placed!\n\nDelivery Address: ${deliveryAddress}\nPayment Method: ${paymentMethod}\nTotal Amount: ${totalAmount + 5} PLN`);
  }

  function Timer() {
    const initialTime = 90 * 60; // 90 minutes in seconds
    const [timeRemaining, setTimeRemaining] = useState(
      localStorage.getItem('timeRemaining') || initialTime
    );
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, [timeRemaining]);
  
    useEffect(() => {
      // Store timeRemaining in local storage whenever it changes
      localStorage.setItem('timeRemaining', timeRemaining.toString());
    }, [timeRemaining]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <div className="App">
        <h3>Estimated Time Delivery</h3>
        <p>
          Time Remaining: <span className="home-text-red">{formatTime(timeRemaining)}</span>
        </p>
      </div>
    );
  }

  function OrderPlaced({ deliveryAddress, paymentMethod, totalAmount }) {
    return (
      <div className='order-ordered'>
        <h2>Order placed!</h2>
        <Timer />
        <h4>We're truly grateful for your order at our burger restaurant. Thank you for choosing us to satisfy your cravings!</h4>
         
        <p>Delivery Address: {deliveryAddress}</p>
        <p>Payment Method: {paymentMethod}</p>
        <div className='order-ordered-button'>
        <p>Total Amount: {totalAmount + 5} PLN</p>
        <Link className='resign-ordered-button' to="/menu" onClick={handleResign}>
          Order more
        </Link>
        </div>
      </div>
      
    );
  }
 
  


  return (
    <div className='order-container'>
      <h1>{ordered ? "" : "Order"}</h1>

      
      <form onSubmit={handleSubmit}>
        
      {ordered ? "" : <div className='order-content'> <div>
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={postcode}
            onChange={handlePostcodeChange}
            required
          />
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={handleStreetChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={handleCityChange}
            required
          />
        </div>
        <div>
          <label htmlFor="buildingNumber">Building Number:</label>
          <input
            type="text"
            id="buildingNumber"
            name="buildingNumber"
            value={buildingNumber}
            onChange={handleBuildingNumberChange}
          />
        </div>
        <div>
          <label htmlFor="doorNumber">Door Number:</label>
          <input
            type="text"
            id="doorNumber"
            name="doorNumber"
            value={doorNumber}
            onChange={handleDoorNumberChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        {paymentMethod === 'Credit Card' && (
          <div className='order-card'>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>
        )}
        {paymentMethod === 'Credit Card' && (
          <div className='order-card'>
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              required
            />
          </div>
        )}
        {paymentMethod === 'Credit Card' && (
          <div className='order-card'>
            <label htmlFor="securityCode">Securtity Code:</label>
            <input
              type="text"
              id="securityCode"
              name="securityCode"
              value={securityCode}
              onChange={handleSecurityCodeChange}
              required
            />
          </div>
        )}

        <div>
          <label><p>Total Amount to Pay:</p></label>
          <p>{totalAmount + 5} PLN</p>
        </div>
        <div>
          <label><p>Ordered Products:</p></label>
          <ul>
            {selectedBurgers.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
        <Link className='resign-button' to="/menu" onClick={handleResign}>
          Resign
        </Link>
        <button className='order-button' type="submit" >Place Order</button>
        </div>
        </div>}
        <div>
        {ordered && (
        <OrderPlaced
          deliveryAddress={deliveryAddress}
          paymentMethod={paymentMethod}
          totalAmount={totalAmount}
        />
      )}
       </div>
      </form>


    </div>
    
  );
}

export default Order;






