
import { Card, H5, Code, FormGroup, Callout } from "@blueprintjs/core";
import { version, branch, commit } from '../version';

const About = () => {
    return (
        <>
            <H5>
                About this chrome extension
            </H5>
            <FormGroup
                subLabel="Release version:"
                labelFor="text-input"
            >
                <Code id="text-input" >{version}</Code>
            </FormGroup>
            <FormGroup
                subLabel="Release branch:"
                labelFor="text-input"
            >
                <Code id="text-input" >{branch}</Code>
            </FormGroup>
            <FormGroup
                subLabel="Release commit:"
                labelFor="text-input"
            >
                <Code id="text-input" >{commit}</Code>
            </FormGroup>

            <Callout intent="primary" title="Open-source disclaimer " icon="heart">
                This chrome extension is <a target="_blank" href="https://github.com/KochC/Foundry-Pro-Chrome-Extension">open-source</a> and was started by <a target="_blank" href="http://koch.codes">koch.codes</a>.
                It uses <a target="_blank" href="https://blueprintjs.com/">Blueprint</a> from Palantir for UI components. Feel free to request features and contribute to the code on <a target="_blank" href="https://github.com/KochC/Foundry-Pro-Chrome-Extension">Github</a>.
            </Callout>

        </>
    );
};

export default About