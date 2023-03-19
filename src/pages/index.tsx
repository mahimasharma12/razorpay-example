import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from "react";
// import "./style.css"
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";


const theme = createTheme();

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [orderId, setOrderId] = useState('');
    const [response, setResponse] = useState({})
    const [razorpayId, setRazorpayId] = useState('');
    const router = useRouter();

    useEffect(() => {
        showResponsePage()
    }, [response])

    const showResponsePage = () => {
        return (
            <>

            </>
        )
    }
    const showRazorPay = async () => {
        let data;
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: razorpayId, // Enter the Key ID generated from the Dashboard
            description: "Test Transaction",
            order_id: orderId,
            handler: async function (response) {
                data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                setResponse(data);
                await router.replace({
                    pathname: "/response",
                    query: data,
                });
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        // console.log("here::: after payment:::",data)
        // data && await router.replace({
        //     pathname: "/response",
        //     query: data,
        // })

    }
    return (
        <div className={styles.main}>
            <ThemeProvider theme={theme}>
                <Container>
                    <div className="App">
                        <div className="heading">Payment Gateway For Razorpay Orders</div>
                        <div className="form">
                            <div className="textInput">
                                <TextField id="outlined-basic" label="Razorpay Id" variant="outlined" value={razorpayId}
                                           onChange={e => setRazorpayId(e.target.value)}/>
                            </div>
                            <div className="textInput">
                                <TextField id="outlined-basic" label="Order Id" variant="outlined" value={orderId}
                                           onChange={e => setOrderId(e.target.value)}/>
                            </div>
                            <Button onClick={() => showRazorPay()}>Submit</Button>
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        </div>

    )
}


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
