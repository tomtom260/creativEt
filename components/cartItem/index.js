export default function({ itemName, unitPrice, creatorName, imageURL, removeFromCart}) {
    return (
        <div className="relative flex space-x-3 rounded-3xl w-fit p-3 pr-9 shadow-md bg-white">

            <button type="button" className="absolute -top-4 -right-4 bg-white shadow-sm rounded-full w-8  h-8 text-center" onClick={removeFromCart.bind(this,itemName)}>x</button>

            <div className="h-40 w-40 rounded-2xl bg-cPurple-light overflow-hidden">
                <img className="h-full w-auto" src={'/assets/images/'+imageURL}></img>
            </div>
            <div className="flex flex-col justify-center">
                <p className="font-medium text-xl text-cPurple-dark">{itemName}</p>
                <p className="font-regular text-lg text-cPurple">{creatorName}</p>

                <p className="font-bold text-md text-white bg-cPurple-dark w-fit rounded-full p-1 mt-2">${unitPrice}</p>
            </div>

        </div>
    );
}