---
title: 'API v2'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
metaDescription: 'This is the api v1 for this page'
---

# Cơ chế xác thực

Chúng tôi sử dụng <span style="color: red; font-size: 14px "> Basic Authentication </span> để cấp quyền truy cập vào API.

Cách hoạt động:

1. API access key là một cặp:

- username (api_key): một mã định danh duy nhất của API access key.
- password (api_secret): một mã bí mật của API access key.

Đội ngũ Computer Vision Việt Nam sẽ tạo username và password cho từng khách hàng trước khi tích hợp.

2. Client gửi một request:

Client gửi HTTP requests cùng với Authorization header chứa Basic theo sau là một khoảng trắng và một mã hoá Base64 username:password. Ví dụ, demo:p@55w0rd client sẽ gửi

```javascript
Authorization: Basic ZGVtbzpwQDU1dzByZA==
```

Khi sử dụng dịch vụ của CVS, việc tính phí hay không dựa vào mã errorCode trả về. Các trường hợp tính phí khi sử dụng dịch vụ:

- <span style="color: red; font-size: 14px ">errorCode </span> = 0: Request thành công, có tính phí
- <span style="color: red; font-size: 14px ">errorCode </span> là giá trị khác: không tính phí

# Cách tính phí

Khi sử dụng dịch vụ của CVS, việc tính phí hay không dựa vào mã errorCode trả về. Các trường hợp tính phí khi sử dụng dịch vụ:

- <span style="color: red; font-size: 14px ">errorCode </span> = 0: Request thành công, có tính phí
- <span style="color: red; font-size: 14px ">errorCode </span> là giá trị khác: không tính phí

Chi tiết về các loại <span style="color: red; font-size: 14px ">errorCode</span> có thể xem ở bảng mã lỗi phần thông tin trả về.

# Dòng tương tác

## Flow 1: OCR

![FLOW](https://static.swimlanes.io/591b6e2fea681de2bf8c1e8e3aee30b6.png)

## Flow 2: Face Matching

![FLOW](https://static.swimlanes.io/bdbaea331319821bc2e0ec93e7702660.png)

## Flow 3: Face Search

![FLOW](https://static.swimlanes.io/fee4a392068c84f180ab7f023436cf3b.png)

## Flow 4: Smart Crop

![FLOW](https://static.swimlanes.io/03f97905fa25fb6ef9c38a0f7643d69a.png)
