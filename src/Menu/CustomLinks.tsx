import { useEffect } from 'react';
import { MenuItem } from "@blueprintjs/core";
import { useStore } from '../Store'

const CustomLinks = () => {

    const { settings } = useStore()

    const init = async () => { }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])


    return (
        <>
            {
                settings.custom_links.length > 0 ? settings.custom_links.map((link) => <MenuItem icon="link" text={link.name} href={link.url} />) : ""
            }
        </>
    );
};

export default CustomLinks;