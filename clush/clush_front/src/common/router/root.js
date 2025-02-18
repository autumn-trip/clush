import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import todoRouter from "../../todo/router/todoRouter";
import calendarsRouter from "../../calendar/router/calendarsRouter";

const Loading = <div>Loading...</div>;

const Main = lazy(() => import("../page/MainPage"));

const root = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={Loading}>
                <Main />
            </Suspense>
        )
    },
    {
        path: "/todo",
        children: todoRouter
    },
    {
        path: "/calendar",
        children: calendarsRouter
    },
])

export default root;