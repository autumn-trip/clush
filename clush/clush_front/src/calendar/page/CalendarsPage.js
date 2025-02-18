import React from 'react';
import CalendarsComponent from "../component/CalendarsComponent";
import BasicLayout from "../../common/page/BasicLayout";

const CalendarsPage = () => {
    return (
        <BasicLayout>
            <div>
                <CalendarsComponent />
            </div>
        </BasicLayout>
    );
};

export default CalendarsPage;