import React from "react";
import ReactDOM from "react-dom";

const App: React.FC<any> = () => {
    return <>
        <a href={'/api/auth/google'}>Google</a>
    </>;
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
