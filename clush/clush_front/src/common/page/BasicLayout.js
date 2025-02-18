import React from 'react';
import {useNavigate} from "react-router-dom";
import "../style/MainPage.scss";

const BasicLayout = ({children}) => {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            {/* PC 전용 레이아웃 */}
            <div className="web-layout">
                <header className="basic-menu">
                    <h1 className="logo" onClick={() => navigate("/")}>Clush</h1>
                    <div className="nav-buttons">
                        <button onClick={() => navigate("/todo")}>Todo</button>
                        <button onClick={() => navigate("/calendar")}>Calendar</button>
                    </div>
                </header>

                <div>
                    {children}
                </div>

                {/* footer */}
                <p>
                    개인정보처리방침 | 사이트맵
                    <br/>
                    대표자: 이중모 | 사업자등록번호:
                    000-00-00000
                    <br/>
                    주소: 서울 서초구 서초대로77길 41 대동2빌딩 10층 3 강의실 | Tel. 010-3559-2192 | Fax.
                    070-0000-0000 | E-mail. harun107@naver.com
                </p>
                <p>Copyright © MoneyBricks. All rights Reserved. Design by 4 team</p>
                <div className="footer-logo">
                    <h1 className="logo" onClick={() => navigate("/")}>Clush</h1>
                </div>
            </div>

            {/* 모바일 전용 레이아웃 */}
            <div className="iphone-frame">
                <div className="notch"></div>
                <header className="basic-menu">
                    <h1 className="logo" onClick={() => navigate("/")}>Clush</h1>
                    <div className="nav-buttons">
                        <button onClick={() => navigate("/todo")}>Todo</button>
                        <button onClick={() => navigate("/calendar")}>Calendar</button>
                    </div>
                </header>
                <div>
                    {children}
                </div>
                <div className="bottom-bar">
                <div className="home-button" onClick={() => navigate("/")}></div>
                </div>

                {/* footer */}
                <p>
                    개인정보처리방침 | 사이트맵
                    <br/>
                    대표자: 이중모 | 사업자등록번호:
                    000-00-00000
                    <br/>
                    주소: 서울 서초구 서초대로77길 41 대동2빌딩 10층 3 강의실 | Tel. 010-3559-2192 | Fax.
                    070-0000-0000 | E-mail. harun107@naver.com
                </p>
                <p>Copyright © MoneyBricks. All rights Reserved. Design by 4 team</p>
                <div className="footer-logo">
                    <h1 className="logo" onClick={() => navigate("/")}>Clush</h1>
                </div>
            </div>
        </div>
    );
};

export default BasicLayout;