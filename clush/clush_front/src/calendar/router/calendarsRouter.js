import {lazy, Suspense} from "react";

const Loading = <div>Loading...</div>;

const Calendars = lazy(() => import("../page/CalendarsPage"));

const todoRouter = [
    {
        path: "",
        element: (
            <Suspense fallback={Loading}>
                <Calendars />
            </Suspense>
        )
    },
]

export default todoRouter;