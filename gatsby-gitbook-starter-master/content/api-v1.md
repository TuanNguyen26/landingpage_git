---
title: 'API v1'
description: 'Tài liệu hướng dẫn tích hợp API Computer Vision Việt Nam'
---

## Cơ Chế Xác Thực

Chúng tôi sử dụng `Basic Authentication` để cấp quyền truy cập vào API.

Cách hoạt động:

1. API access key là một cặp:

- username (api_key): một mã định danh duy nhất của API access key.
- password (api_secret): một mã bí mật của API access key.

Đội ngũ Computer Vision Việt Nam sẽ tạo username và password cho từng khách hàng trước khi tích hợp.

2. Client gửi một request:

Client gửi HTTP requests cùng với `Authorization` header chứa `Basic` theo sau là một khoảng trắng và một mã hoá Base64 `username:password`.
Ví dụ, `demo:p@55w0rd` client sẽ gửi

```
Authorization: Basic ZGVtbzpwQDU1dzByZA==
```

## Dòng Tương Tác

### Flow 1: OCR

[![ocr](https://static.swimlanes.io/591b6e2fea681de2bf8c1e8e3aee30b6.png)](https://swimlanes.io/d/DpmXjqcrp)

### Flow 2: Face Matching

[![face matching](https://static.swimlanes.io/862fcd7dfc64aabe0d9d8b64676856dd.png)](https://swimlanes.io/d/umDCBbU-d)

<!--
### Flow 3: Detect Celeb

[![detect celeb](https://static.swimlanes.io/935e86e95755cebbaa4cbbf47108bc82.png)](https://swimlanes.io/d/Hmr8bv6BN)


### Flow 4: NSFW

[![nsfw](https://static.swimlanes.io/22c021582eee12cf5b0e3c571998cfff.png)](https://swimlanes.io/d/M3acB38bC)

### Flow 5: Smart Crop


[![smart crop](https://static.swimlanes.io/84b3c4cba82880241117861a369569ce.png)](https://swimlanes.io/d/CTONsNbIq)

### Flow 6: Smart Layout


[![smart layout](https://static.swimlanes.io/f88d3af125769a2faf2ed270e3a485d3.png)](https://swimlanes.io/d/JsgaGV2e6)

### Flow 7: Tagging

[![tagging](https://static.swimlanes.io/ea9e9f8879ab48626a7caf8bc641e643.png)](https://swimlanes.io/d/UDuJCMwel) -->

### Flow 3: Face Search

[![face search](https://static.swimlanes.io/9012d6bc5b996fb780c1c1abad6d75d6.png)](https://swimlanes.io/d/INlNJtSgY)
