import {Suspense} from "react";
import Router from "./router/Router.tsx";

function App() {

    return (
        <Suspense fallback={<div>loading...</div>}>
            <Router />
        </Suspense>
    )
}

export default App
