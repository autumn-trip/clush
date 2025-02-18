import React from 'react';
import TodoRegisterComponent from "../component/TodoRegisterComponent";
import BasicLayout from "../../common/page/BasicLayout";

const TodoRegisterPage = () => {
    return (
        <BasicLayout>
            <div>
                <TodoRegisterComponent />
            </div>
        </BasicLayout>
    );
};

export default TodoRegisterPage;