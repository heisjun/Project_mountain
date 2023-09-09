# AR 기술을 이용한 등산 인증 시스템
산에 대한 다양한 정보를 제공하고 등산 배지를 모으며 도전 과제를 통해 성취감을 주고 이용자의 등산 기록을 관리한다. 
사용자의 숙련도, 계절, 교통 등에 따라 알맞은 산을 추천해주기도 한다.
추가적으로 커뮤니티 등을 통해 자신이 아는 등산 정보를 공유하고 다른 사용자의 정보를 구체적으로 이용할 수 있도록 한다. 
이러한 기능들을 통해 등산 초보자에게도 더 쉽게 등산에 도전할 수 있게 하며 숙련자에게도 더 많은 기회가 되도록 한다.

![미리보기](https://github.com/heisjun/Project_mountain/blob/master/%E1%84%89%E1%85%A1%E1%86%AB%E1%84%82%E1%85%A5%E1%86%B7%E1%84%8B%E1%85%A5%E1%84%89%E1%85%A1%E1%86%AB%E1%84%86%E1%85%B5%E1%84%85%E1%85%B5%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5.png)
[시연영상](https://www.youtube.com/watch?v=32DPJ-0kVJM)




# 특징
- 산의 특징, 위치, 높이, 코스, 난이도 등 자세한 설명과 날씨, 교통편, 주변 숙박 시설 같은 부가적인 정보들을 제공하도록 개발
- 다른 등산객들과 산행 정보를 공유할 수 있는 커뮤니티 기능을 제공하도록 개발
- 위해 ‘100대 명산’ 뿐만 아니라 보다 다양한 키워드들을 제공하도록 개발
-   AR Foundation를 사용하여 증강현실 플랫폼을 사용할 수 있도록 지원하고 개발자가 사용할 수 있는 인터페이스를 제공, AR Foundation에서 Plane detection(평면 감지)와 Raycast 기술을 사용하여 개발




# 개발구조도
<img width="744" alt="image" src="https://github.com/heisjun/Project_mountain/assets/82956755/3c336926-9cff-499f-a3a2-547c0f597202">

### ReactNative를 이용한 안드로이드
시스템 사용자를 위한 GUI 개발 도구인 JavaScript 라이브러리인 react와 native를 결합한 react-native와 android studio 에뮬레이터를 이용하여 개발
### Node.js을 이용한 서버 구축
공공데이터 api를 이용하여 산의 정보와 실시간 날씨 데 이터를 axios를 이용하여 받아오고 MongoDB 데이터 베이스와 연결해 정보를 저장
### MongoDB 데이터베이스 구축 
Cluster를 생성하고 내부에 user, bordC, bordF,bordQ, bordR, 16개의 지역별 mountain, mountain_list collection을 만든다.
### Unity를 이용한 AR기능
React-native 내부에 embedding한 유니티 파일을 이용하여 AR카메라를 통해 현실을 비춤
### ReactNative에 Unity 임베딩 
Unity project export 셋팅후 Export된 Unity 파일을 react-native project에 적용


# 결론
AR Foundation 플러그인, Fetch & Axios, Kakao 지도 Android API, AWS의 EC2 & Amazon Simple Storage Service를 적용하여, 기존 등산 앱들이 가지는 단순 정보 전달 기능을 넘어 AR을 통해 등산을 게임과 비슷한 방식으로 인지하고 다양한 정보를 보여주는 등산 인증 시스템을 구현



