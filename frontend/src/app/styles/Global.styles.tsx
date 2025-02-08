import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        color: #bbcccf;
        font-family: 'Source Sans Pro';
        font-size: 1rem;
        font-weight: bold;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;

        // variables
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;
    }

    body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: ${({ theme: { black01 } }) => black01};
        padding: calc(var(--ten-px) * 4);
    }
`;
