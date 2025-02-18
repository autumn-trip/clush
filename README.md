Clush 프로젝트


1. 개발한 앱에 대한 설명:
-- Project Clush는 Todo 및 Calendar 기능이 포함된 일정 관리 웹 애플리케이션으로, 사용자가 할 일을 등록하고 관리하며, todo 일정과 calendar를 연동하여 손쉽게 스케줄을 확인할 수 있도록 구성하였습니다.
   또한, 반응형으로 제작하여 PC와 모바일 환경 두 곳에서 보아도 가시성 있게 접근할 수 있도록 구현하였습니다.


2. 소스 빌드 및 실행 방법 메뉴얼 :
-- 백엔드:
   - 데이터베이스 생성 필요합니다. (데이터베이스만 생성허고 IDE와 연동만 시켜 놓으셔도 되고, 아래에 있는 쿼리문을 통하여 생서하셔도 됩니다.)
   - 쿼리:
   - create or replace table clush.calendars
(
    c_id       bigint auto_increment
        primary key,
    created_at timestamp    null,
    updated_at timestamp    null,
    content    varchar(255) not null,
    end_date   datetime(6)  null,
    is_all_day bit          not null,
    location   varchar(255) null,
    priority   int          null,
    start_date datetime(6)  not null,
    title      varchar(255) not null
);

create or replace table clush.todo
(
    t_id         bigint auto_increment
        primary key,
    created_at   timestamp                                       null,
    updated_at   timestamp                                       null,
    content      varchar(255)                                    not null,
    end_date     datetime(6)                                     null,
    priority     int                                             null,
    start_date   datetime(6)                                     not null,
    status       enum ('COMPLETED', 'IN_PROGRESS', 'REGISTERED') not null,
    title        varchar(255)                                    not null,
    username     varchar(255)                                    null,
    calendars_id bigint                                          null,
    constraint FKor2ospkq59qfvwsep6pmiuwja
        foreign key (calendars_id) references clush.calendars (c_id)
);


   - application.properties에서 데이터베이스 username과 password 설정이 필요합니다.
   - test - service 디렉토리에 있는 TodoServiceTests와 CalendarsServiceTests 테스트 구동이 필요합니다. (데이터 베이스에 더미 데이터 생성)
   - 이후 동작해 주시면 됩니다.


-- 프론트엔드:
  - npm install / yarn install을 통한 노드모듈 다운로드가 필요합니다.
  - 이후 동작해 주시면 됩니다. (기본 포트인 localhost:3000 으로 구성하였습니다.)


3. 주력으로 사용한 라이브러리 및 사용 이유
-- 백엔드:
   - Spring Data JPA와 Lombok를 주력으로 활용하였습니다.
   - 이유:
   - JPA : 쿼리를 직접적으로 쓰지 않아도 데이터베이스와의 매핑이 간편하여 활용하였습니다.
   - Lombok : Getter, Setter, Builder 등 패턴을 간소화 할 수 있어서 주력으로 활용하였습니다.
  

-- 프론트엔드:
  - React Router와 SCSS, FullCalendar, axios 라이브러리를 주력으로 활용하였습니다.
  - 이유:
  - React Router : 페이지 간 이동 및 SPA 구조 유지
  - SCSS : 모듈화된 스타일 적용
  - FullCalendar : 캘린더 기능을 손쉽게 구현 가능
  - Axios : 백엔드와의 API 통신


-- API 명세서
![image](https://github.com/user-attachments/assets/74263ddd-9733-427c-8071-7553757ea8bd)

