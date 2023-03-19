import React from "react";
import {useRouter} from "next/router";

const Response = (params: any) => {
    const router = useRouter();
    console.log("router::", router);
    console.log("router.query", router.query)
    const data = router.query;

    return (
        <div>
            {/*<div className="headingFont">Result</div>*/}
            {JSON.stringify(data, null, 3)}
            <div>
                {Object.keys(data).length > 0 &&
                    <div className={"razorpayValue"}>
                        <div>orderCreationId is:{data?.orderCreationId}</div>
                        <div>razorpayPaymentId is:{data?.razorpayPaymentId}</div>
                        <div>razorpayPaymentId is:{data?.razorpayOrderId}</div>
                        <div>razorpaySignature is:{data?.razorpaySignature}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Response;