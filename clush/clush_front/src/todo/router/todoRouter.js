import {lazy, Suspense} from "react";

const Loading = <div>Loading...</div>;

const TodoList = lazy(() => import("../page/TodoListPage"));
const TodoRegister = lazy(() => import("../page/TodoRegisterPage"));
const TodoRead = lazy(() => import("../component/TodoReadComponent"));
const TodoModify = lazy(() => import("../page/TodoModifyPage"));

const todoRouter = [
    {
        path: "",
        element: (
            <Suspense fallback={Loading}>
                <TodoList />
            </Suspense>
        )
    },
    {
        path: "register",
        element: (
            <Suspense fallback={Loading}>
                <TodoRegister />
            </Suspense>
        )
    },
    {
        path: "read/:tId",
        element: (
            <Suspense fallback={Loading}>
                <TodoRead />
            </Suspense>
        )
    },
    {
        path: "modify/:tId",
        element: (
            <Suspense fallback={Loading}>
                <TodoModify />
            </Suspense>
        )
    },
]

export default todoRouter;