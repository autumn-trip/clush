import React from 'react';
import TodoListComponent from "../component/TodoListComponent";
import BasicLayout from "../../common/page/BasicLayout";

const TodoListPage = () => {
    return (
        <BasicLayout>
            <div>
                <TodoListComponent />
            </div>
        </BasicLayout>
    );
};

export default TodoListPage;