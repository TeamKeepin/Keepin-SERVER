define({ "api": [
  {
    "type": "post",
    "url": "/friend",
    "title": "친구 생성",
    "version": "1.0.0",
    "name": "createFriend",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"보리\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 201,\n    \"message\": \"친구 등록 성공\",\n    \"name\": \"보리\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(name))를 입력하세요.\"\n}\n\n- 400 중복된 값\n{\n    \"status\": 400,\n    \"message\": \"중복된 친구가 있습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "put",
    "url": "/friend/memo/:friendId",
    "title": "친구 메모 수정",
    "version": "1.0.0",
    "name": "editFriendMemo",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"memo\": \"보리는 수박을 좋아해요\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"메모 수정 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 친구 유무 확인\n{\n \"status\": 400,\n \"message\": \"일치하는 친구가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "put",
    "url": "/friend/:friendId",
    "title": "친구 이름 수정",
    "version": "1.0.0",
    "name": "editFriendName",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"쌀보리\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"이름 수정 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 친구 유무 확인\n{\n \"status\": 400,\n \"message\": \"일치하는 친구가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "delete",
    "url": "/friend/:friendId",
    "title": "친구 삭제",
    "version": "1.0.0",
    "name": "editFriendName",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"친구 삭제 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/friend",
    "title": "친구 목록 조회",
    "version": "1.0.0",
    "name": "getFriends",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"친구 조회 성공\",\n \"data\": {\n           \"friends\": [\n            { \n              \"_id\": \"60e46c82c167c37c296bbf58\",\n              \"name\": \"코코\"\n            },\n            { \n              \"_id\": \"60e46d82c167c37c26bbf23\",\n              \"name\": \"밀키\"\n            },\n            ...\n          ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/friend/:friendId",
    "title": "친구 상세 조회",
    "version": "1.0.0",
    "name": "getFriends",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"친구 상세 조회 성공\",\n \"data\": {\n     \"name\": \"코코\",\n     \"total\": 3,\n     \"taken\": 2,\n     \"given\": 1,\n     \"memo\": \"코코는 초콜릿을 너무 좋아한당\"\n  }  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/friend/keepin/:friendId",
    "title": "친구에게 받은/준 keepin 목록 조회",
    "version": "1.0.0",
    "name": "getTakenGivenList",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"친구에게 준/받은 keepin 목록 조회 성공\",\n \"data\": {\n      \"takenList\": [\n          {\n              \"_id\": \"60e5ddb55c157b183255b0d1\",\n              \"title\": \"밀키가 좋아하는 장난감 먹었지\",\n              \"photo\": \"밀키가 좋아하는 강아지 뼈다귀\",\n              \"date\": \"2021.12.02\"\n          },\n          {\n              \"_id\": \"60e650fe2821d6242df82904\",\n              \"title\": \"메렁 메롱\",\n              \"photo\": \"밀키가 좋아하는 강아지 뼈다귀\",\n              \"date\": \"2021.12.02\"\n          }\n      ],\n      \"givenList\": [\n          {\n              \"_id\": \"60e651142821d6242df82908\",\n              \"title\": \"나에게만 선물같아\",\n              \"photo\": \"밀키가 좋아하는 강아지 뼈다귀\",\n              \"date\": \"2021.12.02\"\n          }\n      ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 친구 확인\n{\n \"status\": 400,\n \"message\": \"일치하는 친구가 없습니다\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/friend/search?name=keyword",
    "title": "친구 검색 조회",
    "version": "1.0.0",
    "name": "searchFriends",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n- [QueryString]: keyword에 검색할 단어를 넣음\n{\n    \"name\": \"보리\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"친구 검색 성공\",\n    \"data\": {\n        \"friends\": [\n            {\n                \"_id\": \"60e416d15d759051988d18d0\",\n                \"name\": \"보리\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "post",
    "url": "/keepin",
    "title": "키핀하기 생성",
    "version": "1.0.0",
    "name": "createKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* taken: 준/받은 여부 -> taken: true이면 받은\n* friendIdx: friend name을 표시하기 위함\n\n{\n    \"title\": \"보리 생일\",\n    \"photo\": [\"보리가 좋아하는 강아지 김밥\"],\n    \"taken\": false,\n    \"date\": \"2021-12-02\",\n    \"category\": [\"생일\", \"축하\"],\n    \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n    \"friendIdx\":[\"60e416d15d759051988d18d0\", \"60e416d95d759051988d18d3\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀하기 생성 성공\",\n    \"keepin\": {\n        \"_id\": \"60e1d4070e50e39654b4bb5f\",\n        \"title\": \"보리 생일\",\n        \"photo\": [\"보리가 좋아하는 강아지 김밥\"],\n        \"taken\": false,\n        \"date\": \"2021.12.02\",\n        \"category\": [\n            \"생일\",\n            \"축하\"\n        ],\n        \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n        \"friendIdx\": [\n            \"60e416d15d759051988d18d0\",\n            \"60e416d95d759051988d18d3\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보를 입력하세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "delete",
    "url": "/keepin",
    "title": "키핀 삭제",
    "version": "1.0.0",
    "name": "deleteKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"keepinArray\": [\"60e322167887874ecccad066\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n     \"status\": 200,\n     \"message\": \"키핀 삭제 완료\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"keepinID Array 값이 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin/detail/:keepinIdx",
    "title": "모아보기 상세페이지 조회",
    "version": "1.0.0",
    "name": "getDetailKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [params] keepinIdx: 키핀 아이디에 해당하는 게시물",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀 상세페이지 조회 성공\",\n    \"data\": {\n        \"_id\": \"60e42158909d3063102be165\",\n        \"title\": \"보리 생일\",\n        \"photo\": [\"보리가 좋아하는 강아지 김밥\"],\n        \"friends\": [\n            \"보리\",\n            \"밀키\"\n        ],\n        \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n        \"cateogry\": [\n            \"생일\",\n            \"축하\"\n        ],\n        \"date\": \"2021.12.02\",\n        \"taken\": false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 빈 경우\n{\n    \"status\": 400,\n    \"message\": \"요청바디가 없습니다\".\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin?taken=true",
    "title": "모아보기 준/받은 조회",
    "version": "1.0.0",
    "name": "getTakenKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [Querystring] taken: 준/받은 여부 -> taken: true이면 받은",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"모아보기 준/받은 조회 성공\",\n    \"data\":{\n        \"keepins\":[\n          {\n            \"taken\": true,\n            \"_id\": \"60e420f9909d3063102be161\",\n            \"title\": \"PM이 탕수육 사줬지롱\",\n            \"photo\": \"탕수육 사진\",\n            \"date\": \"2021.06.21\"\n          }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 taken이 빈 값인 경우\n{\n    \"status\": 400,\n    \"message\": \"준/받은 여부를 선택하세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "put",
    "url": "/keepin",
    "title": "키핀 수정",
    "version": "1.0.0",
    "name": "modifyKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* taken: 준/받은 여부 -> taken: true이면 받은\n* friendIdx: friend name을 표시하기 위함\n\n{\n    \"title\": \"보리 생일\",\n    \"photo\": [\"보리가 좋아하는 강아지 김밥\"],\n    \"taken\": false,\n    \"date\": \"2021-12-02\",\n    \"category\": [\"생일\", \"축하\"],\n    \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n    \"friendIdx\":[\"60e416d15d759051988d18d0\", \"60e416d95d759051988d18d3\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n     \"status\": 200,\n     \"message\": \"키핀 수정 완료\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"keepinID Array 값이 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin/all?title=keyword",
    "title": "모아보기 검색어 조회",
    "version": "1.0.0",
    "name": "searchKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [Querystring] title: 제목으로 검색",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀 검색어 조회 성공\",\n    \"data\": {\n      \"keepins\":[\n          {\n            \"taken\": true,\n            \"_id\": \"60e420f9909d3063102be161\",\n            \"title\": \"PM이 탕수육 사줬지롱\",\n            \"photo\": \"탕수육 사진\",\n            \"date\": \"2021.06.21\"\n         }\n         ...\n      ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 빈 경우\n{\n    \"status\": 400,\n    \"message\": \"요청바디가 없습니다\".\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin/category?category=keyword",
    "title": "모아보기 카테고리 별 조회",
    "version": "1.0.0",
    "name": "searchKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [Querystring] category: category로 검색 (생일, 기념일, 축하, 칭찬, 응원, 감사, 깜작, 기타)",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀 카테고리 별 조회 성공\",\n    \"data\": {\n        \"keepins\":[\n          { \n            \"_id\": \"60e420f9909d3063102be161\",\n            \"title\": \"PM이 탕수육 사줬지롱\",\n            \"photo\": \"탕수육 사진\",\n            \"date\": \"2021.06.21\"\n          },\n          ... \n        ]\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 빈 경우\n{\n    \"status\": 400,\n    \"message\": \"요청바디가 없습니다\".\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "put",
    "url": "/my/profile",
    "title": "프로필 편집",
    "version": "1.0.0",
    "name": "editProfile",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\": \"유키핀\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-201 OK\n{\n  \"status\": 201,\n  \"msg\": \"프로필 수정 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인 \n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "My"
  },
  {
    "type": "put",
    "url": "/my/profile",
    "title": "비밀번호 수정",
    "version": "1.0.0",
    "name": "editProfile",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"currentPassword\": \"1234567\",\n \"newPassword\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-201 OK\n{\n  \"status\": 201,\n  \"message\": \"비밀번호 수정 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인 \n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-400 비밀번호 확인 \n{\n \"status\": 400,\n \"message\": \"기존 비밀번호 일치하지 않습니다.\"\n}\n-400 변경할 비밀번호 자리수 확인 \n{\n \"status\": 400,\n \"message\": \"6자리 이상의 비밀번호로 설정해 주세요.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "My"
  },
  {
    "type": "get",
    "url": "/my",
    "title": "유저별 keepin 수 조회",
    "version": "1.0.0",
    "name": "editProfile",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n}\nx",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n  \"status\": 200,\n  \"msg\": \"키핀 수 조회 성공\",\n  \"data\": {\n      \"name\": \"유키핀\",\n      \"total\": 17,\n      \"taken\": 16,\n      \"given\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인 \n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "My"
  },
  {
    "type": "get",
    "url": "/my/profile",
    "title": "프로필 조회",
    "version": "1.0.0",
    "name": "getProfile",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n  \"status\": 200,\n  \"msg\": \"프로필 조회 성공\",\n  \"data\": {\n      \"email\": \"fbduddn97@naver.com\",\n      \"password\": \"$2a$10$svbqi40QZQcWkRc2Jx8clOcoY5Q/urnAvdfcr0eVnIKk6M8.R9iRm\",\n      \"name\": \"yboy\",\n      \"birth\": \"1997.03.22\",\n      \"phone\": \"010-1234-5678\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인 \n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "My"
  },
  {
    "type": "get",
    "url": "/random",
    "title": "랜덤키핀 조회",
    "version": "1.0.0",
    "name": "getRandom",
    "group": "Random",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n \"status\": 200,\n \"message\": \"랜덤 키핀 조회 성공\",\n  \"data\": {\n      \"_id\": \"60e46b35c167c37c296bbf4f\",\n      \"title\": \"햄버거 고마워\",\n      \"photo\": \"ㄹㅇ나룬어룬ㅇㄹㅇㄴ\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/random.ts",
    "groupTitle": "Random"
  },
  {
    "type": "post",
    "url": "/reminder",
    "title": "리마인더 생성",
    "version": "1.0.0",
    "name": "createReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청\n* isImportant : 중요 여부(true/false)\n* daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전)\n\n- 알람 받는 경우, daysAgo 값 요청\n{\n    \"title\": \"할아버지 생일\",\n    \"date\": \"2021-07-05\",\n    \"isAlarm\": true,\n    \"daysAgo\": 2,\n    \"isImportant\": false\n}\n\n- 알람 받지 않는 경우\n{\n    \"title\": \"여자친구 생일\",\n    \"date\": \"2021-08-02\",\n    \"isAlarm\": false,\n    \"isImportant\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 생성 성공\",\n    \"data\": {\n        \"_id\": \"60e4163d5d759051988d18cb\",\n        \"title\": \"더미데이터11\",\n        \"date\": \"2021-08-03\",\n        \"sendDate\": \"2021-07-27\",\n        \"isAlarm\": true,\n        \"isImportant\": true,\n        \"year\": \"2021\",\n        \"month\": \"08\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(title, date, isAlarm, isImportant)를 입력하세요.\"\n}\n\n- 400 daysAgo이 없거나, 유효하지 않은 값 \n{\n    \"status\": 400,\n   \"message\": \"daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "delete",
    "url": "/reminder",
    "title": "리마인더 삭제",
    "version": "1.0.0",
    "name": "deleteReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"reminderArray\": [\"60e322167887874ecccad066\",\"60e3221f7887874ecccad06a\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n     \"status\": 200,\n     \"message\": \"리마인더 삭제 완료\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"reminderID Array 값이 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/detail/:reminderId",
    "title": "리마인더 상세 조회",
    "version": "1.0.0",
    "name": "getDetailReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /reminder/60e5bdc46c3cdb135f1da1dc\n* reminderId : 리마인더 Id",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 상세 조회 성공\",\n    \"data\": {\n        \"isAlarm\": true,\n        \"isImportant\": true,\n        \"_id\": \"60e651b32821d6242df8291a\",\n        \"title\": \"더미데이터4\",\n        \"date\": \"2021.05.01\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"파라미터(reminderId)를 입력하세요.\"\n}\n\n- 400 등록된 리마인더가 없음\n\n{\n    \"status\": 400,\n    \"message\": \"등록된 리마인더가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/date/:year/:month",
    "title": "리마인더 월별 목록 조회",
    "version": "1.0.0",
    "name": "getMonthReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /reminder/date/2021/06\n* year : 조회 연도\n* month: 조회 달",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"월별 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"isAlarm\": true,\n                \"isImportant\": true,\n                \"_id\": \"60e314a82175d36678ecb905\",\n                \"title\": \"남자친구 생일\",\n                \"date\": \"06.04\"\n            },\n            {\n                \"isAlarm\": false,\n                \"isImportant\": false,\n                \"_id\": \"60e1d4230e50e39654b4bb62\",\n                \"title\": \"할머니 생일\",\n                \"date\": \"06.15\"\n            },\n            {\n                \"isAlarm\": false,\n                \"isImportant\": false,\n                \"_id\": \"60e1d4310e50e39654b4bb64\",\n                \"title\": \"엄마 생일\",\n                \"date\": \"06.25\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"파라미터(year, month)를 입력하세요.\"\n}\n\n- 400 파라미터 형식이 맞지 않음\n{\n    \"status\": 400,\n    \"message\": \"파라미터(year, month) 형식을 맞춰주세요.\"\n}\n- 400 등록된 리마인더가 없음\n\n{\n    \"status\": 400,\n    \"message\": \"등록된 리마인더가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/oncoming",
    "title": "[홈화면] 다가오는 리마인더 2개 조회",
    "version": "1.0.0",
    "name": "getOncommingReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"다가오는 리마인더(2개) 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"isImportant\": true,\n                \"_id\": \"60e31f4c8f432a4ec071fce3\",\n                \"title\": \"남자친구 생일\",\n                \"date\": \"07.06\"\n            },\n            {\n                \"isImportant\": true,\n                \"_id\": \"60e30b950fea5314141f0608\",\n                \"title\": \"여자친구 생일\",\n                \"date\": \"08.02\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 다가오는 리마인더가 없음\n\n{\n    \"status\": 400,\n    \"message\": \"다가오는 리마인더가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "post",
    "url": "/user/signin",
    "title": "로그인",
    "version": "1.0.0",
    "name": "SignIn",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"keepin@gmail.com\",\n \"password\": \"1234abcd\", \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"로그인 성공\"   ,\n \"data\": {\n   \"jwt\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n   \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n   \"name\": \"김키핀\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 아이디 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n400 비밀번호 확인\n{\n \"status\": 400,\n \"message\": \"비밀번호가 일치하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/signup",
    "title": "회원가입",
    "version": "1.0.0",
    "name": "SignUp",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"email\": \"whatisthis@naver.com\",\n    \"password\": \"1234567\",\n    \"name\": \"mk\",\n    \"birth\": \"19980322\",\n    \"phoneToken\": \"1\" ,\n    \"phone\": \"01012345678\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\":    ,\n \"data\": {\n   \"jwt\":\"\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 아이디 중복\n{\n \"status\": 400,\n \"message\": \"이미 사용 중인 아이디입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/retoken",
    "title": "토큰 재발급",
    "version": "1.0.0",
    "name": "retoken",
    "group": "token",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n    \"status\": 200,\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTlhZTJmMjhjYjU1NTkyODQ4N2E3YiIsImVtYWlsIjoiaGVsbG9AbmF2ZXIuY29tIiwiaWF0IjoxNjI1OTMxMjMyfQ.pxjJ4ouhO02fBSZ1U6Rw_00CgDRQWoOBFy43EHRoO1o\",\n    \"message\": \"새로운 토큰이 발급 성공\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-401 헤더 값 확인\n{\n \"status\": 401,\n \"message\": \"refreshToken header 값이 없습니다.\"\n}\n-401 토큰 만료\n{\n \"status\": 401,\n \"message\": \"만료된 토큰입니다. 새로운 토큰을 발급 요청해주세요.\"\n}\n-401 유효하지 않은 값\n{\n \"status\": 401,\n \"message\": \"유효하지 않은 토큰입니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/auth.ts",
    "groupTitle": "token"
  }
] });
