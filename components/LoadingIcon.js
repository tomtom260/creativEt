function LoadingIcon() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <img className="h-[100px]" src="./assets/images/logo.png"></img>
            <p className="font-bold">
                Loading...
            </p>
        </div>
    );
}

export default LoadingIcon;