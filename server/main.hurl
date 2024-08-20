# 1 register
POST http://localhost:3030/api/auth/register
{
  "email": "danil1@mail.com",
  "password": "qwe1qwe1",
  "fullName": "Danil Kostin",
  "avatar": "qwe.com"
}

# 2 login
POST http://localhost:3030/api/auth/login
{
  "email": "danil1@mail.com",
  "password": "qwe1qwe1"
}
HTTP 200
[Captures]
token: jsonpath "$['token']"

# 3 get user
GET http://localhost:3030/api/auth/me
Authorization: Bearer {{token}}

# 4 create post
POST http://localhost:3030/api/posts
Authorization: Bearer {{token}}
{
  "title": "PostGoven",
  "text": "Hello Goven XXX",
  "imageUrl": "xxx.com",
  "tags": [
    "artur", "egor"
  ]
}


# 5 Get 1 post
GET http://localhost:3030/api/posts/66c4a563a924f901451c8369


# 6 Get all posts
GET http://localhost:3030/api/posts


# 7 Update post
PUT http://localhost:3030/api/posts/66c4a563a924f901451c8369
Authorization: Bearer {{token}}
{
  "title": "XXX MEGA HELL",
  "text": "Hello Goven XXXHello Goven XXXHello Goven XXXHello Goven XXX",
  "imageUrl": "xxx.com",
  "tags": [
    "artur", "egor", "lida"
  ]
}
