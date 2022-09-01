import React,{useEffect,useState} from 'react';
import '../payment/Payment.css';
import CheckoutProduct from '../checkoutProduct/CheckoutProduct'
import {useStateValue} from '../StateProvider';
import { Link } from 'react-router-dom';
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer/Reducer';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios';

function Payment() {
    const [{basket,user},dispatch] = useStateValue();
    const stripe = useStripe();
    const elements=useElements();
    const [error,setError] =useState(null);
    const [suceeded, setSuceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      //generate the special stripe secret which allows us to charge a customer
       const getClientSecret = async () =>{
        const response = await axios({
            method:'post',
            //Stripe expect the total in a currencies submits
            url:`/payments/create?total=${getBasketTotal(basket) * 100 }`
        });
        getClientSecret(response.data.clientSecret) 
       }
       getClientSecret();
      return () => {
      
      }
    }, [basket])
    

    const handleSubmit =async (event) =>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,
            {payment_method:
                {
                    card:elements.getElement(CardElement )
                }
            }).then(({paymentIntent})=>{
                //paymentIntent = payment confimation
                setSuceeded(true);
                setError(null);
                setProcessing(false);

                navigate.replace('/orders');
            })
        // if (!stripe || !elements) {
        //     return;
        //   }
    }
    const handleChange =e =>{
         setDisabled(e.empty);
         setError(e.error ? e.error.message : ""); 
    }
  return (
    <div className='payment'>
      <div className='payment__container'>

        <h1>
            Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        {/*Payment section delivery address */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__deliveryAddress'>
            <p>{user?.email}</p>
            <p>Locsin St</p>
            <p>Dumaguete City</p>
            <p>09675215593</p>
            </div>
        </div>
        {/*Payment section Review items */}
        <div className='payment__section'>
        <div className='payment__title'>
            <h3>Review Items and Delivery</h3>
        </div>
        <div className='payments__items'>
            {basket.map(item => (
                <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                /> 
            ))}
        </div>
        </div>
        {/*Payment section -Payment method */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Payment Method</h3>
            </div>
            <div className='payment__details'>
                {/* Stripe magic will go here */}
                <form onSubmit={handleSubmit}>
                    <CardElement  onChange={handleChange}/>
                    <div className='payment__priceContainer'>
                    <CurrencyFormat
                        renderText={(value)=>(
                            <>
                            <h3>Order Total: {value} </h3>
                            </>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₱'}
                        />
                        <button disabled={processing|| disabled || suceeded}><span>{processing ? <p>processing</p> : 'Buy Now'}</span></button>
                    </div>
                    {error && <div>{error}</div>}
                </form> 
            </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
