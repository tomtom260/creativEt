import Router from "next/router";
import { useEffect, useState } from "react";
import CartItem from "../components/cartItem/index.js";

function cart() {

    
    
    const [Items, setItems] = useState([]);

    useEffect(()=>{
        setItemsData();
        // setItems([
        //     {
        //         ItemId:"sku-01",
        //         ItemName:"Omo",
        //         UnitPrice:225,
        //         ImageURL: '/omo.jpg',
        //         CreatorName: 'yohannes',
        //         Quantity:1
        //     },
        //     {
        //         ItemId:"sku-02",
        //         ItemName:"Holy Icons",
        //         CreatorName: 'yonathan',
        //         UnitPrice:250,
        //         ImageURL: '/holyIcons.jpg',
        //         Quantity:1
        //     }
        //     ])
    },[])

    const setItemsData = ()=>{
        setItems([
            {
                ItemId:"sku-01",
                ItemName:"Omo",
                UnitPrice:225,
                ImageURL: '/omo.jpg',
                CreatorName: 'yohannes',
                Quantity:1
            },
            {
                ItemId:"sku-01a",
                ItemName:"Omoi",
                UnitPrice:225,
                ImageURL: '/defaultProfile.png',
                CreatorName: 'yohannes',
                Quantity:1
            },
            {
                ItemId:"sku-01",
                ItemName:"Omoa",
                UnitPrice:225,
                ImageURL: '/omo.jpg',
                CreatorName: 'yohannes',
                Quantity:1
            },
            {
                ItemId:"sku-01",
                ItemName:"Omod",
                UnitPrice:225,
                ImageURL: '/carriage.jpg',
                CreatorName: 'yohannes',
                Quantity:1
            },
            {
                ItemId:"sku-01",
                ItemName:"Omoc",
                UnitPrice:225,
                ImageURL: '/defaultProfile.png',
                CreatorName: 'yohannes',
                Quantity:1
            },
            {
                ItemId:"sku-01",
                ItemName:"Omov",
                UnitPrice:225,
                ImageURL: '/omo.jpg',
                CreatorName: 'yohannes',
                Quantity:1
            },
            {
                ItemId:"sku-01",
                ItemName:"Omob",
                UnitPrice:225,
                ImageURL: '/carriage.jpg',
                CreatorName: 'yohannes',
                Quantity:1
            },

            {
                ItemId:"sku-02",
                ItemName:"Holy Icons",
                CreatorName: 'yonathan',
                UnitPrice:250,
                ImageURL: '/defaultProfile.png',
                Quantity:1
            }
            ])
    }

    const data = {

        process:"Cart",
        successUrl:"http://localhost/account",
        merchantId:"SB1326",
        merchantOrderId:"kajhk-kjh",
        expiresAfter:24,
        Items: Items,
        totalItemsDeliveryFee:0,
        totalItemsTax1:0
    }

    const removeFromCart = (removedItem) => {
        // console.log(removedItem)
        const itemCopy = Items.filter((item)=>{
            if(item.ItemName !=  removedItem){
                return item
            }
        })
        setItems(
            itemCopy
        )
    }

    const submitForm = async (e) => {
        // console.log("btn clicked")
        // console.log(JSON.stringify({data: data}))
        e.preventDefault();
        // const paymentURI = "/api/payment";
        const paymentURI = "http://localhost:3002/Home/CheckoutCart"
        const response = await fetch(paymentURI, {
           method: "POST",
           body: JSON.stringify(data),
           headers: {
               "Content-Type": "application/json",
           }
        });

        const data2 = await response.json();
        console.log(data2)
        Router.push(data2.redirectUrl)

    }
    return (
        <div className="bg-cPurple-light w-screen min-h-full flex flex-col justify-center items-center space-y-2">
            {
                data.Items.map((item) => {
                    console.log(item)
                    return <CartItem
                        itemName={item.ItemName}
                        unitPrice={item.UnitPrice}
                        creatorName={item.CreatorName}
                        imageURL={item.ImageURL}
                        removeFromCart={removeFromCart}
                    ></CartItem>
                })
            }
            
            <form method="POST" onSubmit={submitForm}>
                <button type="submit" >Submit</button>
            </form>

        </div>
    );
}

export default cart;