import { useEffect } from 'react';
import { MenuItem } from "@blueprintjs/core";
import { Store } from '../Store'

type CustomLinksProps = {
    store: Store;
}

const CustomLinks = ({ store }: CustomLinksProps) => {

    const init = async () => {
    }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])


    return (
        <>
            {
                store.custom_links.length > 0 ? store.custom_links.map((link) => <MenuItem icon="link" text={link.name} href={link.url} />) : ""
            }
        </>
    );
};

export default CustomLinks;