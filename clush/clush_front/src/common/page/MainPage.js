import React from 'react';
import "../style/MainPage.scss";
import BasicLayout from "./BasicLayout";

const MainPage = () => {
    return (
        <BasicLayout>
            <div className="content">
                <h2>Welcome to Clush</h2>
                <p>Manage your tasks and calendar efficiently.</p>
            </div>
        </BasicLayout>
    );
};

export default MainPage;