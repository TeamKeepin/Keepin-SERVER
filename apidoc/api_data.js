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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"떠효니🤩\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 201,\n    \"message\": \"친구 등록 성공\",\n    \"name\": \"떠효니🤩\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(name)를 입력하세요.\"\n}\n  \n\n- 400 중복된 값\n{\n    \"status\": 400,\n    \"message\": \"중복된 친구가 있습니다.\"\n}",
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
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "param :friendId 친구의 Idx\n/friend/memo/60ed9e98e51ad110481cd9d7\n\nreq.body json\n{\n    \"memo\" : \"보민이 신발 👟 사이즈 230 << 컨버스 개조아함, 제일 좋아하는 책 장르: 소설 📘, 아기자기 귀여운 거 딱히 좋아하지 않음 🙅🏻, 실용적인 거 좋아함 🙆🏻, 요새 헤드셋 🎧 알아보는 것 같음!\"\n}",
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
          "content": "\n* -400 req.body 내용 빠짐\n{\n \"status\": 400,\n \"message\": \"memo의 내용을 입력해주세요.\"\n}\n-400 친구 유무 확인\n{\n \"status\": 400,\n \"message\": \"일치하는 친구가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
          "content": "\n* * friendId : 친구 id\n* /friend/60ed9e98e51ad110481cd9d7\n\n{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "-400 친구 유무 확인\n{\n \"status\": 400,\n \"message\": \"일치하는 친구가 없습니다.\"\n}\n\n-400 친구 이름 중복\n{\n \"status\": 400,\n \"message\": \"중복된 친구가 있습니다.\"\n}\n\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
          "content": "* * friendId : 친구 id\n* /friend/60ed9e98e51ad110481cd9d7\n\n{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n    \"status\": 200,\n    \"message\": \"친구 조회 성공\",\n    \"data\": {\n        \"friends\": [\n            {\n                \"_id\": \"60ed9ebee51ad110481cd9ef\",\n                \"name\": \"가으니\",\n                \"memo\": \"\"\n            },\n            {\n                \"_id\": \"60ed9e14e51ad110481cd9cb\",\n                \"name\": \"떠효니🤩\",\n                \"memo\": \"\"\n            },\n            {\n                \"_id\": \"60ed9ebae51ad110481cd9ec\",\n                \"name\": \"민지언닝\",\n                \"memo\": \"\"\n            },\n            {\n                \"_id\": \"60eda05e8fb6950b8404cfc8\",\n                \"name\": \"박박이\",\n                \"memo\": \"\"\n            },\n        ]\n    }\n}",
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
          "content": "\n* * friendId : 친구 id\n* /friend/60ed9e98e51ad110481cd9d7\n\n{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n    \"status\": 200,\n    \"message\": \"친구 상세 조회 성공\",\n    \"data\": {\n        \"name\": \"뽀민이💭\",\n        \"total\": 5,\n        \"taken\": 3,\n        \"given\": 2,\n        \"memo\": \"보민이 신발 👟 사이즈 230 << 컨버스 개조아함, 제일 좋아하는 책 장르: 소설 📘, 아기자기 귀여운 거 딱히 좋아하지 않음 🙅🏻, 실용적인 거 좋아함 🙆🏻, 요새 헤드셋 🎧 알아보는 것 같음!\"\n    }\n}",
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
    "url": "/friend/keepin/:friendId?taken=true",
    "title": "친구에게 받은/준 keepin 목록 조회",
    "version": "1.0.0",
    "name": "getTakenGivenList",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[Querystring] taken: 준/받은 여부 -> taken: true이면 받은\n[params]      friendId : 친구 id\n/friend/keepin/60ed9e98e51ad110481cd9d7?taken=true",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n    \"status\": 200,\n    \"message\": \"친구에게 준/받은 keepin 목록 조회 성공\",\n    \"data\": {\n        \"keepins\": [\n            {\n                \"_id\": \"60eda9cd36d5ca07e047a980\",\n                \"title\": \"가장 달콤했던 생일 선물\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626188234438.png\",\n                \"date\": \"2021.06.07\"\n            },\n            {\n                \"_id\": \"60edad7757025c487c8e611a\",\n                \"title\": \"라이언보다네가더귀여워알지\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626191569724.jpg\",\n                \"date\": \"2021.04.20\"\n            },\n            {\n                \"_id\": \"60edadcfd4886805c4ca3497\",\n                \"title\": \"커플 꽃반지 조아\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189254295.png\",\n                \"date\": \"2021.03.28\"\n            }\n        ]\n    }\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n- [QueryString]: keyword에 검색할 단어를 넣음\n{\n    \"name\": \"뽀\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n {\n    \"status\": 200,\n    \"message\": \"친구 검색 성공\",\n    \"data\": {\n        \"friends\": [\n            {\n                \"_id\": \"60ed9e98e51ad110481cd9d7\",\n                \"name\": \"뽀민이💭\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "post",
    "url": "/keepin/all",
    "title": "키핀하기 생성",
    "version": "1.0.0",
    "name": "createKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n    \"title\": \"가장 달콤했던 생일 선물\",\n    \"taken\": true,\n    \"date\": \"2021-06-07\",\n    \"category\": [\"생일\", \"축하\"],\n    \"record\": \"뽀민이 정말 앙큼하다. 나 몰래 케이크 주문해놓고 얼레벌레 들고 등장했다 >,< 귀여워!! 꽃 너무 예뻐서 드라이플라워로 간직할 거당. 케이크 너무 맛있었다. 보민이 생일날엔 더 맛있는 거 사줘야지!!\",\n    \"friendIdx\":[\"60ed9e98e51ad110481cd9d7\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀하기 생성 성공\",\n    }",
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
    "type": "post",
    "url": "/keepin/photo/:keepinIdx",
    "title": "키핀하기 이미지 생성",
    "version": "1.0.0",
    "name": "createKeepinPhoto",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"photo\":[\".jpg\"] *file로 보내주세요\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀하기 생성 완전 성공\",\n}",
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
    "type": "post",
    "url": "/keepin",
    "title": "키핀하기 텍스트 생성",
    "version": "1.0.0",
    "name": "createKeepinText",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n    \"title\": \"가장 달콤했던 생일 선물\",\n    \"taken\": true,\n    \"date\": \"2021-06-07\",\n    \"category\": [\"생일\", \"축하\"],\n    \"record\": \"뽀민이 정말 앙큼하다. 나 몰래 케이크 주문해놓고 얼레벌레 들고 등장했다 >,< 귀여워!! 꽃 너무 예뻐서 드라이플라워로 간직할 거당. 케이크 너무 맛있었다. 보민이 생일날엔 더 맛있는 거 사줘야지!!\",\n    \"friendIdx\":[\"60ed9e98e51ad110481cd9d7\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀하기 생성 성공\",\n    \"data\": {\n        \"keepinIdx\": \"60eda9cd36d5ca07e047a980\"\n    }\n}",
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
    "type": "post",
    "url": "/keepin/delete",
    "title": "키핀 삭제",
    "version": "1.0.0",
    "name": "deleteKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "- 200 OK\n{\n   \"status\": 200,\n   \"message\": \"키핀 삭제 완료\"\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀 상세페이지 조회 성공\",\n    \"data\": {\n        \"_id\": \"60edad7757025c487c8e611a\",\n        \"title\": \"라이언보다네가더귀여워알지\",\n        \"photo\": [\n            \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189174825.jpg\"\n        ],\n        \"friends\": [\n            {\n                \"_id\": \"60ed9e98e51ad110481cd9d7\",\n                \"name\": \"뽀민이💭\"\n            }\n        ],\n        \"record\": \"칭찬 백만 개와 함께 또 깜짝 선물을 주고 가신 보민 선배... 무려 손목보호패드다. 귀여워서 못 쓰겠어.\",\n        \"category\": [\n            \"칭찬\",\n            \"깜짝\"\n        ],\n        \"date\": \"2021.04.20\",\n        \"taken\": true\n    }\n}",
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
    "url": "/keepin?taken=true&recent=true",
    "title": "모아보기 준/받은 및 최신순/오래된순 조회",
    "version": "1.0.0",
    "name": "getTakenKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [Querystring] taken: 준/받은 여부 -> taken: true이면 받은\n* [Querystring] recent: 오래된순/최신순 여부 -> recent: true이면 최신순",
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
        },
        {
          "title": "Error-Response:",
          "content": "- 400 recent이 빈 값인 경우\n{\n    \"status\": 400,\n    \"message\": \"최신순/오래된순 여부를 선택하세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "put",
    "url": "/keepin/modify/:keepinId",
    "title": "키핀 수정",
    "version": "1.0.0",
    "name": "modifyKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /keepin/modify/60e5bdc46c3cdb135f1da1dc\n* keepinId : 키핀 Id\n\n{\n    \"title\": \"가장 달콤했던 생일 선물\",\n    \"photo\": [\"KakaoTalk_20210109_164556314_01.jpg\"],  (file로 올려주세요)\n    \"taken\": true,\n    \"date\": \"2021-06-07\",\n    \"category\": [\"생일\", \"축하\"],\n    \"record\": \"뽀민이 정말 앙큼하다. 나 몰래 케이크 주문해놓고 얼레벌레 들고 등장했다 >,< 귀여워!! 꽃 너무 예뻐서 드라이플라워로 간직할 거당. 케이크 너무 맛있었다. 보민이 생일날엔 더 맛있는 거 사줘야지!!\",\n    \"friendIdx\":[\"60ed9e98e51ad110481cd9d7\"]\n}",
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
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보를 입력하세요.\"\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"카테고리 조회 성공\",\n    \"data\": {\n        \"keepins\": [\n            {\n                \"_id\": \"60eda9cd36d5ca07e047a980\",\n                \"title\": \"가장 달콤했던 생일 선물\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626188234438.png\",\n                \"date\": \"2021.06.07\"\n            },\n            {\n                \"_id\": \"60edab3acc671c4288b4bc50\",\n                \"title\": \"생일 선물 = 살림살이 선물\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626188583821.png\",\n                \"date\": \"2021.06.07\"\n            },\n            {\n                \"_id\": \"60edaebbd4886805c4ca349f\",\n                \"title\": \"밀키맘 김보 생일\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189491228.png\",\n                \"date\": \"2021.03.11\"\n            },\n            {\n                \"_id\": \"60edaef6d4886805c4ca34a3\",\n                \"title\": \"Happy Birthday♥\",\n                \"photo\": \"https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189557188.png\",\n                \"date\": \"2021.02.22\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 빈 경우\n{\n    \"status\": 400,\n    \"message\": \"요청바디가 없습니다\".\"\n}\n- 400 category가 정해진 8개 중에 있는 것인 지 확인\n{\n    \"status\": 400,\n    \"message\": \"존재하지 않는 카테고리 입니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "put",
    "url": "/my/edit/password",
    "title": "비밀번호 수정",
    "version": "1.0.0",
    "name": "editPassword",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "-201 OK\n{\n  \"status\": 200,\n  \"message\": \"비밀번호 수정 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-400 비밀번호 확인\n{\n \"status\": 400,\n \"message\": \"기존 비밀번호 일치하지 않습니다.\"\n}\n-400 변경할 비밀번호 자리수 확인\n{\n \"status\": 400,\n \"message\": \"6자리 이상의 비밀번호로 설정해 주세요.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "My"
  },
  {
    "type": "put",
    "url": "/my/phone",
    "title": "전화번호 수정 *",
    "version": "1.0.0",
    "name": "editPhone",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"phone\": \"010-1234-1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n  \"status\": 200,\n  \"message\": \"전화번호 수정 성공\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
    "title": "프로필 편집",
    "version": "1.0.0",
    "name": "editProfile",
    "group": "My",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}\nx",
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
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "My"
  },
  {
    "type": "post",
    "url": "/my/find/password",
    "title": "비밀번호 찾기",
    "version": "1.0.0",
    "name": "findPassword",
    "group": "My",
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
          "content": "{\n \"email\": \"fuckOff@naver.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n  \"status\": 200,\n  \"message\": \"임시 비밀번호 전송 성공\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "-200 OK\n{\n    \"status\": 200,\n    \"message\": \"프로필 조회 성공\",\n    \"data\": {\n        \"email\": \"android@naver.com\",\n        \"password\": \"$2a$10$9jnZL3niYDd5kk3TtoySBeA6dX7eKPv9CfcqViuYSU4ZmvxWJnpje\",\n        \"name\": \"android\",\n        \"birth\": \"1997.12.22\",\n        \"phone\": \"010-1234-5678\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
          "content": "{\n \"Content-Type\": \"application/json\",\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "-400 유저 키핀 유뮤 확인\n{\n \"status\": 400,\n \"message\": \"우선 키핀을 등록해주세요.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청\n* isImportant : 중요 여부(true/false)\n* daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전) -> String으로 요청\n\n- 알람 받는 경우, daysAgo 값 요청\n{\n    \"title\": \"아빠생일♥♥🍰\",\n    \"date\": \"2021-08-22\",\n    \"isAlarm\": true,\n    \"daysAgo\": \"2\",\n    \"isImportant\": true\n}\n\n- 알람 받지 않는 경우\n{\n    \"title\": \"여자친구 생일\",\n    \"date\": \"2021-08-02\",\n    \"isAlarm\": false,\n    \"isImportant\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 생성 성공\",\n    \"data\": {\n        \"sendDate\": \"2021-08-20\",\n        \"isAlarm\": true,\n        \"isImportant\": true,\n        \"_id\": \"60edbf347cd20b065409869b\",\n        \"title\": \"아빠생일♥♥🍰\",\n        \"date\": \"2021-08-22\",\n        \"userIdx\": \"60ed9c404b360576d0805b7c\",\n        \"year\": \"2021\",\n        \"month\": \"08\",\n        \"daysAgo\": \"2\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(title, date, isAlarm, isImportant)를 입력하세요.\"\n}\n\n- 400 daysAgo이 없거나, 유효하지 않은 값 \n{\n    \"status\": 400,\n    \"message\": \"daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "post",
    "url": "/reminder/delete",
    "title": "리마인더 삭제",
    "version": "1.0.0",
    "name": "deleteReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
    "url": "/reminder",
    "title": "리마인더 모든 목록 조회",
    "version": "1.0.0",
    "name": "getDetailReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"sendDate\": \"2021-05-01\",\n                \"isAlarm\": true,\n                \"isImportant\": false,\n                \"_id\": \"60edbaa0ce001e7a245596b7\",\n                \"title\": \"오랜만에 챈니🧡 보는 날\",\n                \"date\": \"2021-05-02\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"05\",\n                \"daysAgo\": \"1\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"0\",\n                \"isAlarm\": false,\n                \"isImportant\": false,\n                \"_id\": \"60edbdf27cd20b065409868f\",\n                \"title\": \"스승의날 (이채은교수님)\",\n                \"date\": \"2021-05-15\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"05\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"2021-06-20\",\n                \"isAlarm\": true,\n                \"isImportant\": false,\n                \"_id\": \"60edbe167cd20b0654098691\",\n                \"title\": \"유영우유 생일 🍰\",\n                \"date\": \"2021-06-27\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"06\",\n                \"daysAgo\": \"7\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"0\",\n                \"isAlarm\": false,\n                \"isImportant\": true,\n                \"_id\": \"60edbe5e7cd20b0654098693\",\n                \"title\": \"아요 합숙 시작일🏠\",\n                \"date\": \"2021-07-07\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"07\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"2021-07-10\",\n                \"isAlarm\": true,\n                \"isImportant\": false,\n                \"_id\": \"60edbed97cd20b0654098695\",\n                \"title\": \"민지언니 결혼식 👰🏻\",\n                \"date\": \"2021-07-10\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"07\",\n                \"daysAgo\": \"0\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"2021-07-26\",\n                \"isAlarm\": true,\n                \"isImportant\": true,\n                \"_id\": \"60edbef67cd20b0654098697\",\n                \"title\": \"서현생일 🍰\",\n                \"date\": \"2021-07-29\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"07\",\n                \"daysAgo\": \"3\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"0\",\n                \"isAlarm\": false,\n                \"isImportant\": true,\n                \"_id\": \"60edbf1a7cd20b0654098699\",\n                \"title\": \"영민쓰 생일 🍰\",\n                \"date\": \"2021-08-11\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"08\",\n                \"__v\": 0\n            },\n            {\n                \"sendDate\": \"2021-08-20\",\n                \"isAlarm\": true,\n                \"isImportant\": true,\n                \"_id\": \"60edbf347cd20b065409869b\",\n                \"title\": \"아빠생일♥♥🍰\",\n                \"date\": \"2021-08-22\",\n                \"userIdx\": \"60ed9c404b360576d0805b7c\",\n                \"year\": \"2021\",\n                \"month\": \"08\",\n                \"daysAgo\": \"2\",\n                \"__v\": 0\n            }\n        ]\n    }\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 상세 조회 성공\",\n    \"data\": {\n        \"isAlarm\": true,\n        \"isImportant\": true,\n        \"_id\": \"60e651b32821d6242df8291a\",\n        \"title\": \"더미데이터4\",\n        \"date\": \"2021.05.01\",\n        \"daysAgo\": \"2\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"파라미터(reminderId)를 입력하세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/date?year=2021&month=05",
    "title": "리마인더 월별 목록 조회",
    "version": "1.0.0",
    "name": "getMonthReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /reminder/date?year=2021&month=06\n* year : 조회 연도\n* month: 조회 달",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"월별 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"isAlarm\": true,\n                \"isImportant\": false,\n                \"_id\": \"60edbaa0ce001e7a245596b7\",\n                \"title\": \"오랜만에 챈니🧡 보는 날\",\n                \"date\": \"05.02\"\n            },\n            {\n                \"isAlarm\": false,\n                \"isImportant\": false,\n                \"_id\": \"60edbdf27cd20b065409868f\",\n                \"title\": \"스승의날 (이채은교수님)\",\n                \"date\": \"05.15\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"쿼리(year, month)를 입력하세요.\"\n}\n\n- 400 QUERY 형식이 맞지 않음\n{\n    \"status\": 400,\n    \"message\": \"쿼리(year, month) 형식을 맞춰주세요.\"\n}",
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"다가오는 리마인더(2개) 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"isImportant\": true,\n                \"_id\": \"60edbef67cd20b0654098697\",\n                \"title\": \"서현생일 🍰\",\n                \"date\": \"07.29\"\n            },\n            {\n                \"isImportant\": true,\n                \"_id\": \"60edbf1a7cd20b0654098699\",\n                \"title\": \"영민쓰 생일 🍰\",\n                \"date\": \"08.11\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/year?year=2021",
    "title": "리마인더 연도별 목록 조회",
    "version": "1.0.0",
    "name": "getYearReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /reminder/year?year=2021\n* year : 조회 연도",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"연도별 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            [],\n            [],\n            [],\n            [],\n            [\n                {\n                    \"isAlarm\": true,\n                    \"isImportant\": false,\n                    \"_id\": \"60f186490c589a08c05865f2\",\n                    \"title\": \"챈니🧡 보는 날\",\n                    \"date\": \"05.02\",\n                    \"month\": \"05\"\n                },\n                {\n                    \"isAlarm\": false,\n                    \"isImportant\": false,\n                    \"_id\": \"60f1867d0c589a08c05865f4\",\n                    \"title\": \"스승의 날 🎁\",\n                    \"date\": \"05.15\",\n                    \"month\": \"05\"\n                }\n            ],\n            [\n                {\n                    \"isAlarm\": true,\n                    \"isImportant\": false,\n                    \"_id\": \"60f186920c589a08c05865f6\",\n                    \"title\": \"유영우유 생일 🍰\",\n                    \"date\": \"06.27\",\n                    \"month\": \"06\"\n                }\n            ],\n            [\n                {\n                    \"isAlarm\": false,\n                    \"isImportant\": true,\n                    \"_id\": \"60f186b00c589a08c05865f8\",\n                    \"title\": \"아요 합숙 시작일🏠\",\n                    \"date\": \"07.07\",\n                    \"month\": \"07\"\n                },\n                {\n                    \"isAlarm\": false,\n                    \"isImportant\": false,\n                    \"_id\": \"60f186f70c589a08c05865fc\",\n                    \"title\": \"민지 결혼식👰🏻\",\n                    \"date\": \"07.17\",\n                    \"month\": \"07\"\n                },\n                {\n                    \"isAlarm\": true,\n                    \"isImportant\": true,\n                    \"_id\": \"60f1871e0c589a08c05865fe\",\n                    \"title\": \"서현 생일 🍰\",\n                    \"date\": \"07.17\",\n                    \"month\": \"07\"\n                },\n                {\n                    \"isAlarm\": true,\n                    \"isImportant\": false,\n                    \"_id\": \"60f25a066b1f1128386d77b4\",\n                    \"title\": \"데모데이\",\n                    \"date\": \"07.17\",\n                    \"month\": \"07\"\n                }\n            ],\n            [\n                {\n                    \"isAlarm\": false,\n                    \"isImportant\": true,\n                    \"_id\": \"60f187550c589a08c0586601\",\n                    \"title\": \"영민쓰 생일 🍰\",\n                    \"date\": \"08.11\",\n                    \"month\": \"08\"\n                },\n                {\n                    \"isAlarm\": true,\n                    \"isImportant\": true,\n                    \"_id\": \"60f187710c589a08c0586603\",\n                    \"title\": \"아빠생일♥♥🍰\",\n                    \"date\": \"08.22\",\n                    \"month\": \"08\"\n                }\n            ],\n            [],\n            [],\n            [],\n            []\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"쿼리(year)를 입력하세요.\"\n}\n\n- 400 QUERY 형식이 맞지 않음\n{\n    \"status\": 400,\n    \"message\": \"쿼리(year) 형식을 맞춰주세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "put",
    "url": "/reminder/modify/:reminderId",
    "title": "리마인더 수정",
    "version": "1.0.0",
    "name": "modifyReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /reminder/modify/60e5bdc46c3cdb135f1da1dc\n* reminderId : 리마인더 Id\n\n\n* isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청\n* isImportant : 중요 여부(true/false)\n* daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전) -> String으로 요청\n\n- 알람 받는 경우, daysAgo 값 요청\n{\n    \"title\": \"아빠생일♥♥🍰\",\n    \"date\": \"2021-08-22\",\n    \"isAlarm\": true,\n    \"daysAgo\": \"2\",\n    \"isImportant\": true\n}\n\n- 알람 받지 않는 경우\n{\n    \"title\": \"여자친구 생일\",\n    \"date\": \"2021-08-02\",\n    \"isAlarm\": false,\n    \"isImportant\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 수정 성공\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(title, date, isAlarm, isImportant)를 입력하세요.\"\n}\n\n- 400 daysAgo이 없거나, 유효하지 않은 값 \n{\n    \"status\": 400,\n    \"message\": \"daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "delete",
    "url": "/setting/withdrawal",
    "title": "계정삭제",
    "version": "1.0.0",
    "name": "withdrawal",
    "group": "Setting",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\"\n}",
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
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"회원탈퇴 성공\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "-400 유저 유무 확인\n{\n \"status\": 400,\n \"message\": \"유저가 없습니다.\"\n}\n-500 서버error\n{\n \"status\": 500,\n \"message\": \"INTERNAL_SERVER_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/setting.ts",
    "groupTitle": "Setting"
  },
  {
    "type": "post",
    "url": "/user/email/check",
    "title": "이메일 중복 체크",
    "version": "1.0.0",
    "name": "Emailcheck",
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
          "content": "{\n    \"email\": \"whatisthis@naver.com\"\n}",
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
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"이메일이 중복되지 않음\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 이메일 중복\n{\n \"status\": 400,\n \"message\": \"이미 사용 중인 이메일입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "User"
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
          "content": "{\n \"email\": \"android@naver.com\",\n \"password\": \"1234567\",\n}",
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
          "content": "200 OK\n{\n    \"status\": 200,\n    \"message\": \"로그인 성공\",\n    \"data\": {\n        \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\",\n        \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI\",\n        \"name\": \"android\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n400 이메일이 틀렸거나 비밀번호 틀릴 때\n{\n    \"status\": 400,\n    \"message\": \"이메일/비밀번호를 다시 확인해주세요.\"\n}",
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
          "content": "{\n    \"email\": \"android@naver.com\",\n    \"password\": \"1234567\",\n    \"name\": \"android\",\n    \"birth\": \"1997-12-22\",\n    \"phoneToken\": \"cvkmjS2aTkrdqHrguqdlO4:APA91bG5SOTKPBc_Z_EL5_aQdKlXPF1Y5-Ujvo8gFYVn3i8Q--rlFfrruIoc41qqy7NZcXcPUSXo7oGbhA8HtOpaabI8ISbhmHkWX0btVJVhFAJkHrbObkcTWJ829rT8juvTvBD-izZC\" ,\n    \"phone\": \"010-1234-5678\"\n}",
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
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"회원가입 성공\"\n}",
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
