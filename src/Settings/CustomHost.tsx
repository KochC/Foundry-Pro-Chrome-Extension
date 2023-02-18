
import { Card, H5, Callout } from "@blueprintjs/core";

const CustomHost = () => {
    return (
        <Card>
            <H5>
                Configure your host
            </H5>

            <Callout intent="warning" title="Why?" icon="info-sign">
                In order to make this extension more secure and built trust to the customers, you can specify your own host here, to restrict the access of the extension.
            </Callout>
        </Card>
    );
};

export default CustomHost