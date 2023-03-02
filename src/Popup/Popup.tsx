import { useEffect } from 'react';

const CustomLinks = () => {

    const init = async () => { }

    const reset = () => {
        chrome.storage.sync.clear()
    }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])


    return (
        <>
            <button onClick={reset}>Reset</button>
        </>
    );
};

export default CustomLinks;