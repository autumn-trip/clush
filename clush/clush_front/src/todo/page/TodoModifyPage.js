import React from 'react';
import BasicLayout from "../../common/page/BasicLayout";
import TodoModifyComponent from "../component/TodoModifyComponent";

const TodoModifyPage = () => {
    return (
        <BasicLayout>
            <div>
                <TodoModifyComponent />
            </div>
        </BasicLayout>
    );
};

export default TodoModifyPage;