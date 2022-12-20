---
title: 'API v1'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
metaDescription: 'This is the api v1 for this page'
---

## Cơ chế xác thực

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

## Cách tính phí

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

# Danh sách APIs

## OCR

OCR service là hệ thống AI cho phép trích xuất thông tin từ ảnh chứng minh nhân dân, thẻ căn cước của công dân Việt Nam, bằng lái xe, Passport, đăng ký xe, đăng kiểm xe, giấy khai sinh. Hệ thống hỗ trợ nhận diện cả mặt trước và cả mặt sau của chứng minh nhân dân và thẻ căn cước công dân, đăng ký xe, hỗ trợ bằng lái xe, đăng kiểm xe, Passport, giấy khai sinh, hỗ trợ cả chứng minh nhân dân cũ.

#### 1. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào url ảnh

**API**:

| Method | URL                                                     |
| ------ | ------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/cards` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img1`        | `https://example.com/front.png` | url ảnh mặt trước cần trích xuất thông tin                  |
| `img2`        | `https://example.com/back.png`  | url ảnh mặt sau cần trích xuất thông tin                    |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

front_url = 'sample front url'
back_url = 'sample back url'
response = requests.get(
"https://cloud.computervision.com.vn/api/v2/ekyc/cards?img1=%s&img2=%s&format_type=%s&get_thumb=%s"
  % (front_url, back_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào file ảnh

**API**:

| Method | URL                                                     | content-type          |
| ------ | ------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/cards` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

| Key    | Type | Value               | Mô tả                                       |
| ------ | ---- | ------------------- | ------------------------------------------- |
| `img1` | file | `example_front.jpg` | file ảnh mặt trước cần trích xuất thông tin |
| `img2` | file | `example_back.jpg`  | file ảnh mặt sau cần trích xuất thông tin   |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
front_path = '/path/to/your/example_front.jpg'
back_path = '/path/to/your/example_back.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ekyc/cards?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img1': open(front_path, 'rb'), 'img2' : open(back_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào json

**API**:

| Method | URL                                                     | content-type       |
| ------ | ------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/cards` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

```json
{
  "img1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh mặt trước
  "img2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh mặt sau
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_front_path = "/path/to/your/img_front.jpg"
img_back_path = "/path/to/your/img_back.jpg"
encode_front = get_byte_img(Image.open(img_front_path))
encode_back = get_byte_img(Image.open(img_back_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ekyc/cards?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img1' : encode_front, "img2" : encode_back})
print(response.json())
```

#### 4. Trích xuất thông tin ảnh có chứa 1 hoặc nhiều mặt của CMT, CCCD, Passport, đầu vào url ảnh

**API**:

| Method | URL                                                   |
| ------ | ----------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/card` |

**Params**:

| Key           | Value                           | Mô tả                                                                  |
| ------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`            |
| `get_thumb`   | `true`/`false`                  | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh                   |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'
response = requests.get(
"https://cloud.computervision.com.vn/api/v2/ocr/card?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 5. Trích xuất thông tin từ ảnh có chứa 1 hoặc nhiều mặt của CMT, CCCD, Passport, đầu vào file ảnh hoặc file PDF

**API**:

| Method | URL                                                   | content-type          |
| ------ | ----------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/card` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

| Key   | Type | Value         | Mô tả                                                                   |
| ----- | ---- | ------------- | ----------------------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/card?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 6. Trích xuất thông tin từ ảnh có chứa 1 hoặc nhiều mặt của CMT, CCCD, Passport, đầu vào json

**API**:

| Method | URL                                                   | content-type       |
| ------ | ----------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/card` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_path = "/path/to/your/image.jpg"
encode_img = get_byte_img(Image.open(img_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/card?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_img})
print(response.json())
```

#### 7. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào url ảnh.

**API**:

| Method | URL                                                    |
| ------ | ------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/card` |

**Params**:

| Key           | Value                           | Mô tả                                                                  |
| ------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`            |
| `get_thumb`   | `true`/`false`                  | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh                   |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ekyc/card?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 8. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file ảnh hoặc file PDF

**API**:

| Method | URL                                                    | content-type          |
| ------ | ------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/card` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

| Key   | Type | Value         | Mô tả                                                                   |
| ----- | ---- | ------------- | ----------------------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ekyc/card?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 9. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file json

**API**:

| Method | URL                                                    | content-type       |
| ------ | ------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/card` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ekyc/card?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

<!--
#### 10. Trích xuất thông tin bằng lái xe với đầu vào url ảnh

**API**:

| Method | URL                                                              |
| ------ | ---------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/driving_license` |

**Params**:

| Key           | Value                         | Mô tả                                                       |
| ------------- | ----------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/blx.png` | url ảnh bằng lái xe cần trích xuất thông tin                |
| `format_type` | `url`                         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                | trả về ảnh bằng lái xe đã được cắt và căn chỉnh             |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://daotaothanhcong.com/wp-content/uploads/2019/10/bang-lai-xe-b1-co-thoi-han-bao-lau.jpg'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/driving_license?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 11. Trích xuất thông tin bằng lái xe với đầu vào file ảnh

**API**:

| Method | URL                                                              | content-type          |
| ------ | ---------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/driving_license` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh bằng lái xe đã được cắt và căn chỉnh             |

**Body**:

| Key   | Type | Value             | Mô tả                                         |
| ----- | ---- | ----------------- | --------------------------------------------- |
| `img` | file | `example_blx.jpg` | file ảnh bằng lái xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/driving_license?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 12. Trích xuất thông tin bằng lái xe với đầu vào json

**API**:

| Method | URL                                                              | content-type       |
| ------ | ---------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/driving_license` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh bằng lái xe đã được cắt và căn chỉnh             |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/driving_license?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
``` -->

#### 10. Trích xuất thông tin hai mặt đăng ký xe với đầu vào url ảnh

**API**:

| Method | URL                                                                    |
| ------ | ---------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img1`        | `https://example.com/front.png` | url ảnh mặt trước cần trích xuất thông tin                  |
| `img2`        | `https://example.com/back.png`  | url ảnh mặt sau cần trích xuất thông tin                    |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

front_url = 'sample front url'
back_url = 'sample back url'
response = requests.get(
"https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations?img1=%s&img2=%s&format_type=%s&get_thumb=%s"
  % (front_url, back_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 11. Trích xuất thông tin hai mặt đăng ký xe với đầu vào file ảnh

**API**:

| Method | URL                                                                    | content-type          |
| ------ | ---------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

| Key    | Type | Value               | Mô tả                                       |
| ------ | ---- | ------------------- | ------------------------------------------- |
| `img1` | file | `example_front.jpg` | file ảnh mặt trước cần trích xuất thông tin |
| `img2` | file | `example_back.jpg`  | file ảnh mặt sau cần trích xuất thông tin   |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
front_path = '/path/to/your/example_front.jpg'
back_path = '/path/to/your/example_back.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img1': open(front_path, 'rb'), 'img2' : open(back_path, 'rb')})

print(response.json())

```

#### 12. Trích xuất thông tin hai mặt đăng ký xe với đầu json

**API**:

| Method | URL                                                                    | content-type       |
| ------ | ---------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh mặt trước
  "img2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh mặt sau
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_front_path = "/path/to/your/img_front.jpg"
img_back_path = "/path/to/your/img_back.jpg"
encode_front = get_byte_img(Image.open(img_front_path))
encode_back = get_byte_img(Image.open(img_back_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img1' : encode_front, "img2" : encode_back})
print(response.json())
```

#### 13. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào url ảnh

**API**:

| Method | URL                                                                   |
| ------ | --------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url ảnh mặt trước hoặc mặt sau của đăng ký xe               |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 14. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào file ảnh

**API**:

| Method | URL                                                                   | content-type          |
| ------ | --------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                                              |
| ----- | ---- | ------------- | -------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh của mặt trước hoặc mặt sau của đăng ký xe |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 15. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào json

**API**:

| Method | URL                                                                   | content-type       |
| ------ | --------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 16. Trích xuất thông tin đăng kiểm xe với đầu vào url ảnh

**API**:

| Method | URL                                                                 |
| ------ | ------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url ảnh đăng kiểm xe                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đăng kiểm xe đã được cắt và căn chỉnh            |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 17. Trích xuất thông tin đăng kiểm xe với đầu vào file ảnh

**API**:

| Method | URL                                                                 | content-type          |
| ------ | ------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng kiểm xe đã được cắt và căn chỉnh            |

**Body**:

| Key   | Type | Value         | Mô tả                 |
| ----- | ---- | ------------- | --------------------- |
| `img` | file | `example.jpg` | file ảnh đăng kiểm xe |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 18. Trích xuất thông tin đăng kiểm xe với đầu vào json

**API**:

| Method | URL                                                                 | content-type       |
| ------ | ------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng kiểm xe đã được cắt và căn chỉnh            |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

<!--
  #### 22. Trích xuất line text trong văn bản scan với đầu vào url ảnh

  **API**:

  | Method | URL                |
  |--------|--------------------|
  | GET    | `https://cloud.computervision.com.vn/api/v2/ocr/scan` |

  **Params**:

  | Key     | Value                | Mô tả                  |
  |---------|----------------------|------------------------|
  | `img`   | `https://example.com/image.png`   | url ảnh văn bản scan |
  | `format_type`   | `url`   | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |

  **Demo Python**:

  ```python
  import requests

  api_key = '<replace-with-your-api-key>'
  api_secret = '<replace-with-your-api-secret>'

  image_url = 'https://example.com/image.png'

  response = requests.get(
    "https://cloud.computervision.com.vn/api/v2/ocr/scan?img=%s&format_type=url" % image_url,
    auth=(api_key, api_secret))

  print(response.json())

  ```

  #### 23.  Trích xuất line text trong văn bản scan với đầu vào file ảnh

  **API**:

  | Method | URL                | content-type |
  |--------|--------------------|--------------|
  | POST   | `https://cloud.computervision.com.vn/api/v2/ocr/scan` | `multipart/form-data` |

  **Params**:

  | Key     | Value                | Mô tả                  |
  |---------|----------------------|------------------------|
  | `format_type`   | `file`   | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |

  **Body**:

  | Key     | Type   | Value          | Mô tả                  |
  |---------|--------|----------------|------------------------|
  | `img` | file   | `example.jpg`  | file ảnh văn bản scan cần trích xuất |

  **Demo Python**:

  ```python

  import requests

  api_key = '<replace-with-your-api-key>'
  api_secret = '<replace-with-your-api-secret>'
  image_path = '/path/to/your/example.jpg'

  response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/scan?format_type=file",
    auth=(api_key, api_secret),
    files={'img': open(image_path, 'rb')})

  print(response.json())

  ``` -->

#### 19. Trích xuất thông tin giấy khai sinh với đầu vào url ảnh

**API**:

| Method | URL                                                                |
| ------ | ------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate` |

**Params**:

| Key           | Value                         | Mô tả                                                       |
| ------------- | ----------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/blx.png` | url ảnh giấy khai sinh cần trích xuất thông tin             |
| `format_type` | `url`                         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                | trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 20. Trích xuất thông tin giấy khai sinh với đầu vào file ảnh

**API**:

| Method | URL                                                                | content-type          |
| ------ | ------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Body**:

| Key   | Type | Value         | Mô tả                                            |
| ----- | ---- | ------------- | ------------------------------------------------ |
| `img` | file | `example.jpg` | file ảnh giấy khai sinh cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 21. Trích xuất thông tin giấy khai sinh với đầu vào json

**API**:

| Method | URL                                                                | content-type       |
| ------ | ------------------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 22. Trích xuất thông tin biển số xe với đầu vào url ảnh

**API**:

| Method | URL                                                            |
| ------ | -------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate` |

**Params**:

| Key           | Value                         | Mô tả                                                       |
| ------------- | ----------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/blx.png` | url ảnh chụp biển số xe cần trích xuất thông tin            |
| `format_type` | `url`                         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                | trả về ảnh biển số xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 23. Trích xuất thông tin biển số xe với đầu vào file ảnh

**API**:

| Method | URL                                                            | content-type          |
| ------ | -------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh biển số xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                                        |
| ----- | ---- | ------------- | -------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh biển số xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 24. Trích xuất thông tin biển số xe với đầu vào json

**API**:

| Method | URL                                                            | content-type       |
| ------ | -------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh biển số xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 25. Trích xuất thông tin văn bản với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/general` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh văn bản đã được cắt và căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/general?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 26. Trích xuất thông tin văn bản với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/general` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh văn bản đã được cắt và căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                                                   |
| ----- | ---- | ------------- | ------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf văn bản cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/general?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 27. Trích xuất thông tin văn bản với đầu vào json

**API**:

| Method | URL                                                               | content-type       |
| ------ | ----------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/general` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh văn bản đã được cắt và căn chỉnh                 |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/general?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 28. Trích xuất thông tin hóa đơn với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh hóa đơn đã được cắt và căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 29. Trích xuất thông tin hóa đơn với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh hóa đơn đã được cắt và căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                                                   |
| ----- | ---- | ------------- | ------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf hóa đơn cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 30. Trích xuất thông tin hóa đơn với đầu vào json

**API**:

| Method | URL                                                               | content-type       |
| ------ | ----------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh hóa đơn đã được cắt và căn chỉnh                 |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 31. Trích xuất thông tin hóa đơn xe với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh hóa đơn xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 32. Trích xuất thông tin hóa đơn xe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                       | content-type          |
| ------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh hóa đơn xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                                                      |
| ----- | ---- | ------------- | ---------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf hóa đơn xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 33. Trích xuất thông tin hóa đơn xe với đầu vào json

**API**:

| Method | URL                                                                       | content-type       |
| ------ | ------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh hóa đơn xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 34. Trích xuất thông tin dạng bảng với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                                 |
| ------ | ------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/get_table` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của bảng đã được cắt và căn chỉnh                |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/get_table?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 35. Trích xuất thông tin dạng bảng với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                 | content-type          |
| ------ | ------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/get_table` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của bảng đã được cắt và căn chỉnh                |

**Body**:

| Key   | Type | Value         | Mô tả                                                    |
| ----- | ---- | ------------- | -------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf của bảng cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/get_table?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 36. Trích xuất thông tin dạng bảng với đầu vào json

**API**:

| Method | URL                                                                 | content-type       |
| ------ | ------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/get_table` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của bảng đã được cắt và căn chỉnh                |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/get_table?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 37. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                                             |
| ------ | ------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` |

**Params**:

| Key           | Value                           | Mô tả                                                                         |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                                          |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 38. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                             | content-type          |
| ------ | ------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                                         |
| ------------- | -------------- | ----------------------------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

**Body**:

| Key   | Type | Value         | Mô tả                                                                                    |
| ----- | ---- | ------------- | ---------------------------------------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf của Giấy chứng nhận đăng ký doanh nghiệp cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 39. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào json

**API**:

| Method | URL                                                                             | content-type       |
| ------ | ------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                                         |
| ------------- | -------------- | ----------------------------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 40. Trích xuất thông tin Báo giá xe với đầu vào url ảnh

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh                                                 |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Báo giá xe đã được căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 41. Trích xuất thông tin Báo giá xe với đầu vào file ảnh

**API**:

| Method | URL                                                                       | content-type          |
| ------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Báo giá xe đã được căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                                            |
| ----- | ---- | ------------- | ------------------------------------------------ |
| `img` | file | `example.jpg` | file ảnh của Báo giá xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 42. Trích xuất thông tin Báo giá xe với đầu vào json

**API**:

| Method | URL                                                                       | content-type       |
| ------ | ------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Báo giá xe đã được xoay và căn chỉnh         |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 43. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "data": [xxxx],
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Trong trường hợp nhận dạng 1 giấy tờ tùy thân bất kì, trường `data` sẽ có gồm các thông tin sau:

```json
{
  "info": [xxxx],
  "valid": [xxxx],
  "invalidMessage": [xxxx],
  "type": [xxxx]
}
```

_Chú ý_: Trường hợp trích xuất thông tin từ file PDF, nhiều loại giấy tờ trong một ảnh, bằng lái xe, đăng ký xe, đăng kiểm xe, báo giá xe, giấy khai sinh không có trường `valid` và trường `invalidMessage`.

Trong trường hợp trích xuất thông tin từ file PDF hoặc nhiều loại giấy tờ trong một ảnh, trường data sẽ là 1 list các phần tử có các trường ở trên.

Trong trường hợp trích xuất thông tin từ văn bản scan, trường `data` sẽ là một list, mỗi phần tử trong list sẽ tương ứng với thông tin của 1 trang trong file pdf hoặc của 1 ảnh. Mỗi phần tử trong list này được biểu thị như sau:

```json
[
  // list các block trong cùng một trang
  [
    // list các line trong cùng một block
    [
      // list các text trong cùng một line (*)
    ]
  ]
]
```

Mỗi phần tử text (\*) bao gồm các trường sau:

```json
{
  "text": string, // nội dung của text
  "confidence": float, // độ tin cậy của text
  "box": {
    "left": int, // tọa độ bên trái của text
    "right": int, // tọa độ bên phải của text
    "top": int, // tọa độ bên trên của text
    "bottom": int // tọa độ bên dưới của text
  }
}
```

Trong trường hợp trích xuất thông tin dạng bảng, trường `data` sẽ là một list, mỗi phần tử trong list sẽ tương ứng với thông tin của một bảng. Mỗi phần tử gồm các trường:

- `image`: ảnh bảng đã được cắt và căn chỉnh
- `info`: thông tin bảng, trường này là một list, mỗi phần tử trong list tương ứng thông tin của một hàng

Ví dụ:

```json
{
  "data": [
    {
      "info": [
        ["3", "Liti", "Li"],
        ["4", "Beri", "Be"],
        ["5", "Bo", "B"]
      ],
      "image": "<base64_img1>"
    },
    {
      "info": [
        ["Column1", "column2"],
        ["1", "2"],
        ["1", "1"]
      ],
      "image": "<base64_img2>"
    }
  ]
}
```

`type`: Loại giấy tờ tùy thân được trích xuất thông tin.

- `9_id_card_front`: ứng với mặt trước của chứng minh nhân dân.
- `12_id_card_front`: ứng với mặt trước thẻ căn cước công dân.
- `chip_id_card_front`: ứng với mặt trước thẻ căn cước công dân gán chip.
- `9_id_card_back`: ứng với mặt sau của chứng minh nhân dân.
- `12_id_card_back`: ứng với mặt sau của thẻ căn cước.
- `chip_id_card_back`: ứng với mặt sau thẻ căn cước công dân gán chip.
- `driving_license`: ứng với bằng lái xe.
- `passport`: ứng với loại giấy tờ là hộ chiếu.
- `vehicle_registration_front`: ứng với mặt trước của giấy đăng ký xe.
- `vehicle_registration_back`: ứng với mặt sau của giấy đăng ký xe.
- `picertificate`: ứng với đăng kiểm xe.

`info`: Bao gồm các thông tin được trích xuất từ ảnh đầu vào có giấy tờ tùy thân, với mỗi loại giấy tờ tùy thân thì sẽ có những thông tin trả về khác nhau.

Mặt trước chứng minh nhân dân:

- `id`: số chứng minh thư.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `hometown`: quê quán.
- `address`: thường trú.
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `id_confidence`: độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence`: độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence`: độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence`: độ tin cậy của thông tin trích xuất quê quán.
- `address_confidence`: độ tin cậy của thông tin trích xuất thường trú.

Mặt trước thẻ căn cước công dân:

- `id`: số thẻ.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `hometown`: quê quán
- `gender`: giới tính.
- `due_date`: ngày hết hạn.
- `nationality`: quốc tịch.
- `ethnicity`: dân tộc.
- `address`: thường trú.
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `id_confidence`: độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence`: độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence`: độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence`: độ tin cậy của thông tin trích xuất quê quán.
- `gender_confidence`: độ tin cậy của thông tin trích xuất giới tính.
- `due_date_confidence`: độ tin cậy của thông tin trích xuất ngày hết hạn.
- `nationality_confidence`: độ tin cậy của thông tin trích xuất quốc tịch.
- `ethnicity_confidence`: độ tin cậy của thông tin trích xuất dân tộc.
- `address_confidence`: độ tin cậy của thông tin trích xuất thường trú.

Mặt trước thẻ căn cước công dân gán chip:

- `id`: số thẻ.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `hometown`: quê quán
- `gender`: giới tính.
- `due_date`: ngày hết hạn.
- `nationality`: quốc tịch.
- `address`: thường trú.
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân:

- `ethnicity`: dân tộc.
- `issue_date`: ngày cấp.
- `religious`: tôn giáo.
- `issued_at`: nơi cấp
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `issue_date_confidence`: độ tin cậy của thông tin trích xuất ngày cấp.
- `issued_at_confidence`: độ tin cậy của thông tin trích xuất nơi cấp.
- `religious_confidence`: độ tin cậy của thông tin trích xuất tôn giáo.
- `ethnicity_confidence`: độ tin cậy của thông tin trích xuất dân tộc.

Mặt sau thẻ căn cước công dân:

- `issue_date`: ngày cấp.
- `issued_at`: nơi cấp.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `issue_date_confidence`: độ tin cậy của thông tin trích xuất ngày cấp.
- `issued_at_confidence`: độ tin cậy của thông tin trích xuất nơi cấp.

Mặt sau thẻ căn cước công dân gán chip:

- `issue_date`: ngày cấp.
- `issued_at`: nơi cấp.
- `country`: quốc gia.
- `document_number`: id mặt sau.
- `person_number`: id mặt trước.
- `dob`: ngày sinh.
- `gender`: giới tính.
- `due_date`: ngày hết hạn.
- `nationality`: quốc tịch.
- `sur_name`: họ.
- `given_name`: tên.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Bằng lái xe:

- `id`: số thẻ.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `class`: hạng.
- `nationality`: quốc tịch.
- `issue_date`: ngày phát hành.
- `due_date`: ngày hết hạn.
- `address`: nơi cư trú.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Passport:

- `id`: passport id.
- `sur_name`: họ.
- `given_name`: tên.
- `dob`: ngày sinh.
- `gender`: giới tính.
- `country`: quốc gia.
- `nationality `: quốc tịch.
- `due_date`: ngày hết hạn.
- `person_number`: mã số công dân.
- `image`: ảnh passport.
- `confidence`: độ tin cậy của thông tin phát hiện được trong passport.

Mặt trước đăng ký xe:

- `name`: tên chủ sở hữu xe.
- `address`: nơi cư trú.
- `id`: id đăng ký xe.
- `plate`: biển số xe.
- `issued_at`: nơi cấp.
- `image`: ảnh mặt trước đăng ký xe.

Mặt sau đăng ký xe:

- `name`: tên chủ sở hữu xe.
- `address`: nơi cư trú.
- `engine`: số máy.
- `chassis`: số khung.
- `brand`: nhãn hiệu.
- `model`: số loại.
- `color`: màu sơn.
- `capacity`: dung tích.
- `issued_at`: nơi đăng ký.
- `last_issue_date`: ngày đăng ký cuối cùng.
- `first_issue_date`: ngày đăng ký đầu tiên.
- `plate`: biển số xe.
- `pay_load`: trọng tải.
- `image`: ảnh mặt sau đăng ký xe.

Đăng kiểm xe:

- `chassis_number`: số khung.
- `commercial_use`: kinh doanh vận tải.
- `design_pay_load`: khối lượng hàng.
- `design_towed_mass`: khối lượng kéo theo.
- `engine_number`: số máy.
- `inside_cargo_container_dimension`: kích thước thùng hàng.
- `issued_on`: đơn vị kiểm định.
- `life_time_limit`: niên hạn sử dụng.
- `manufactured_country`: quốc gia sản xuất.
- `manufactured_year`: năm sản xuất.
- `mark`: nhãn hiệu.
- `model_code`: số loại.
- `modification`: cải tạo.
- `permissible_no`: số người cho phép chở.
- `regis_date`: ngày đăng ký.
- `registration_number`: biển đăng ký.
- `seri`: số sê-ri.
- `tire_size`: cỡ lốp.
- `type`: loại phương tiện.
- `valid_until`: có hiệu lực đến hết ngày.
- `wheel_form`: công thức bánh.
- `capacity`: dung tích.
- `report_number`: số phiếu.
- `design_pay_load`: khối lượng hàng thiết kế.
- `authorized_pay_load`: khối lượng hàng cấp phép.
- `image`: ảnh đã cắt ra và căn chỉnh của đăng kiểm xe.

Giấy khai sinh:

- `dob`: ngày sinh.
- `dob_confidence`: độ tin cậy của thông tin trích xuất ngày sinh.
- `father_dob`: ngày sinh cha.
- `father_dob_confidence`: độ tin cậy của thông tin trích xuất ngày sinh cha.
- `father_name`: họ tên cha.
- `father_name_confidence`: độ tin cậy của thông tin trích xuất họ tên cha.
- `gender`: giới tính.
- `gender_confidence`: độ tin cậy của thông tin trích xuất giới tính.
- `mother_dob`: ngày sinh mẹ.
- `mother_dob_confidence`: độ tin cậy của thông tin trích xuất ngày sinh mẹ.
- `mother_name`: họ tên mẹ.
- `mother_name_confidence`: độ tin cậy của thông tin trích xuất họ tên mẹ.
- `name`: họ tên.
- `name_confidence`: độ tin cậy của thông tin trích xuất họ tên.
- `number`: số giấy khai sinh.
- `number_confidence`: độ tin cậy của thông tin trích xuất số giấy khai sinh.
- `number_book`: quyển số giấy khai sinh.
- `number_book_confidence`: độ tin cậy của thông tin trích xuất quyển số giấy khai sinh.
- `regis_date`: ngày đăng ký.
- `regis_date_confidence`: độ tin cậy của thông tin trích xuất ngày đăng ký.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy khai sinh.

Biển số xe: Trả về một danh sách, mỗi phần từ trong danh sách gồm

- `plate`: biển số xe.
- `image`: ảnh đã cắt ra và căn chỉnh của biển số xe.

Hóa đơn: Trả về một danh sách, mỗi phần từ trong danh sách gồm

- `date`: ngày lập hóa đơn.
- `date_box`: tọa độ ngày lập hóa đơn là danh sách gồm [left, top, right, bottom].
- `date_confidence`: độ tin cậy của ngày lập hóa đơn.
- `form`: mẫu số.
- `form_box`: tọa độ mẫu số hóa đơn là danh sách gồm [left, top, right, bottom].
- `form_confidence`: độ tin cậy của mẫu số.
- `invoice_no`: số hóa đơn.
- `invoice_no_box`: tọa độ số hóa đơn là danh sách gồm [left, top, right, bottom].
- `invoice_no_confidence`: độ tin cậy của số hóa đơn.
- `serial_no`: số ký hiệu hóa đơn.
- `serial_no_box`: tọa độ số ký hiệu hóa đơn là danh sách gồm [left, top, right, bottom].
- `serial_no_confidence`: độ tin cậy của số ký hiệu hóa đơn.
- `supplier`: nhà cung cấp.
- `supplier_box`: tọa độ nhà cung cấp là danh sách gồm [left, top, right, bottom].
- `supplier_confidence`: độ tin cậy của nhà cung cấp.
- `tax_code`: mã số thuế nhà cung cấp.
- `tax_code_box`: tọa độ mã số thuế nhà cung cấp là danh sách gồm [left, top, right, bottom].
- `tax_code_confidence`: độ tin cậy của mã số thuế nhà cung cấp.
- `total_amount`: tổng tiền.
- `total_amount_box`: tọa độ tổng tiền là danh sách gồm [left, top, right, bottom].
- `total_amount_confidence`: độ tin cậy của tổng tiền.
- `date`: ngày lập hóa đơn.
- `date_box`: tọa độ ngày lập hóa đơn là danh sách gồm [left, top, right, bottom].
- `date_confidence`: độ tin cậy của ngày lập hóa đơn.
- `info_goods`: thông tin hàng hóa, dịch vụ, trường này là một danh sách, mỗi phần tử trong danh sách gồm:
  - `name`: tên hàng hóa, dịch vụ
  - `coin`: giá của hàng hóa, dịch vụ
- `image`: ảnh hóa đơn đã được xoay và căn chỉnh.

Giấy chứng nhận đăng ký doanh nghiệp:

- `company_name`: tên doanh nghiệp
- `english_name`: tên nước ngoài
- `short_name`: tên viết tắt
- `business_code`: mã số doanh nghiệp
- `regis_date`: ngày đăng ký
- `date_of_change`: ngày thay đổi
- `address`: địa chỉ
- `company_phone`: điện thoại
- `fax`: fax
- `email`: email
- `website`: website
- `authorized_capital`: vốn điều lệ
- `par_value`: mệnh giá cổ phần
- `total_shares`: tổng số cổ phần
- `representative_name`: họ tên người đại diện
- `representative_title`: chức danh người đại diện
- `gender`: giới tính
- `dob`: ngày sinh
- `ethnicity`: dân tộc
- `nationality`: quốc tịch
- `document_type`: loại giấy tờ
- `number_of_idcard`: số cmt
- `issue_date`: ngày cấp
- `issued_at`: nơi cấp
- `household_address`: địa chỉ hộ khẩu
- `representative_address`: nơi ở hiện tại
- `company_name_box`: tọa độ tên doanh nghiệp là một list gồm `[left, top, right, bottom]`
- `english_name_box`: tọa độ tên nước ngoài là một list gồm `[left, top, right, bottom]`
- `short_name_box`: tọa độ tên viết tắt là một list gồm `[left, top, right, bottom]`
- `business_code_box`: tọa độ mã số doanh nghiệp là một list gồm `[left, top, right, bottom]`
- `regis_date_box`: tọa độ ngày đăng ký là một list gồm `[left, top, right, bottom]`
- `date_of_change_box`: tọa độ ngày thay đổi là một list gồm `[left, top, right, bottom]`
- `address_box`: tọa độ địa chỉ là một list gồm `[left, top, right, bottom]`
- `company_phone_box`: tọa độ điện thoại là một list gồm `[left, top, right, bottom]`
- `fax_box`: tọa độ fax là một list gồm `[left, top, right, bottom]`
- `email_box`: tọa độ email là một list gồm `[left, top, right, bottom]`
- `website_box`: tọa độ website là một list gồm `[left, top, right, bottom]`
- `authorized_capital_box`: tọa độ vốn điều lệ là một list gồm `[left, top, right, bottom]`
- `par_value_box`: tọa độ mệnh giá cổ phần là một list gồm `[left, top, right, bottom]`
- `total_shares_box`: tọa độ tổng số cổ phần là một list gồm `[left, top, right, bottom]`
- `representative_name_box`: tọa độ họ tên người đại diện là một list gồm `[left, top, right, bottom]`
- `representative_title_box`: tọa độ chức danh người đại diện là một list gồm `[left, top, right, bottom]`
- `gender_box`: tọa độ giới tính là một list gồm `[left, top, right, bottom]`
- `dob_box`: tọa độ ngày sinh là một list gồm `[left, top, right, bottom]`
- `ethnicity_box`: tọa độ dân tộc là một list gồm `[left, top, right, bottom]`
- `nationality_box`: tọa độ quốc tịch là một list gồm `[left, top, right, bottom]`
- `document_type_box`: tọa độ loại giấy tờ là một list gồm `[left, top, right, bottom]`
- `number_of_idcard_box`: tọa độ số cmt là một list gồm `[left, top, right, bottom]`
- `issue_date_box`: tọa độ ngày cấp là một list gồm `[left, top, right, bottom]`
- `issued_at_box`: tọa độ nơi cấp là một list gồm `[left, top, right, bottom]`
- `household_address_box`: tọa độ địa chỉ hộ khẩu là một list gồm `[left, top, right, bottom]`
- `representative_address_box`: tọa độ nơi ở hiện tại là một list gồm `[left, top, right, bottom]`
- `company_name_confidence`: độ tin cậy tên doanh nghiệp
- `english_name_confidence`: độ tin cậy tên nước ngoài
- `short_name_confidence`: độ tin cậy tên viết tắt
- `business_code_confidence`: độ tin cậy mã số doanh nghiệp
- `regis_date_confidence`: độ tin cậy ngày đăng ký
- `date_of_change_confidence`: độ tin cậy ngày thay đổi
- `address_confidence`: độ tin cậy địa chỉ
- `company_phone_confidence`: độ tin cậy điện thoại
- `fax_confidence`: độ tin cậy fax
- `email_confidence`: độ tin cậy email
- `website_confidence`: độ tin cậy website
- `authorized_capital_confidence`: độ tin cậy vốn điều lệ
- `par_value_confidence`: độ tin cậy mệnh giá cổ phần
- `total_shares_confidence`: độ tin cậy tổng số cổ phần
- `representative_name_confidence`: độ tin cậy họ tên người đại diện
- `representative_title_confidence`: độ tin cậy chức danh người đại diện
- `gender_confidence`: độ tin cậy giới tính
- `dob_confidence`: độ tin cậy ngày sinh
- `ethnicity_confidence`: độ tin cậy dân tộc
- `nationality_confidence`: độ tin cậy quốc tịch
- `document_type_confidence`: độ tin cậy loại giấy tờ
- `number_of_idcard_confidence`: độ tin cậy số cmt
- `issue_date_confidence`: độ tin cậy ngày cấp
- `issued_at_confidence`: độ tin cậy nơi cấp
- `household_address_confidence`: độ tin cậy địa chỉ hộ khẩu
- `representative_address_confidence`: độ tin cậy nơi ở hiện tại
- `image`: ảnh giấy đăng ký kinh doanh đã quay và căn chỉnh

Báo giá xe:

- `name_of_garage`: Cơ sở sửa chữa.
- `name_of_garage_box`: tọa độ Cơ sở sửa chữa là danh sách gồm [left, top, right, bottom].
- `name_of_garage_confidence`: độ tin cậy của Cơ sở sửa chữa.
- `quotation_date`: Ngày báo giá.
- `quotation_date_box`: tọa độ Ngày báo giá là danh sách gồm [left, top, right, bottom].
- `quotation_date_confidence`: độ tin cậy của Ngày báo giá.
- `estimated_delivery_date`: Ngày dự kiến giao xe.
- `estimated_delivery_date_box`: tọa độ Ngày dự kiến giao xe là danh sách gồm [left, top, right, bottom].
- `estimated_delivery_date_confidence`: độ tin cậy của Ngày dự kiến giao xe.
- `total_amount`: Tổng tiền sửa chữa sau thuế.
- `total_amount_box`: tọa độ Tổng tiền sửa chữa sau thuế là danh sách gồm [left, top, right, bottom].
- `total_amount_confidence`: độ tin cậy của Tổng tiền sửa chữa sau thuế.
- `sub_total`: Tổng tiền sửa chữa trước thuế.
- `sub_total_box`: tọa độ Tổng tiền sửa chữa trước thuế là danh sách gồm [left, top, right, bottom].
- `sub_total_confidence`: độ tin cậy của Tổng tiền sửa chữa trước thuế.
- `vat_amount`: Tiền thuế.
- `vat_amount_box`: tọa độ Tiền thuế là danh sách gồm [left, top, right, bottom].
- `vat_amount_confidence`: độ tin cậy của Tiền thuế.
- `table`: thông tin bảng, trường này là một danh sách, mỗi phần tử trong danh sách gồm:
  - `description`: Tên phụ tùng, dịch vụ sửa chữa.
  - `description_box`: tọa độ Tên phụ tùng, dịch vụ sửa chữa là danh sách gồm [left, top, right, bottom].
  - `description_confidence`: độ tin cậy của Tên phụ tùng, dịch vụ sửa chữa.
  - `quantity`: Số lượng.
  - `quantity_box`: tọa độ Số lượng là danh sách gồm [left, top, right, bottom].
  - `quantity_confidence`: độ tin cậy của Số lượng.
  - `unit_price`: Đơn giá.
  - `unit_price_box`: tọa độ Đơn giá là danh sách gồm [left, top, right, bottom].
  - `unit_price_confidence`: độ tin cậy của Đơn giá.
  - `percent_discount`: Phần trăm giảm giá.
  - `percent_discount_box`: tọa độ Phần trăm giảm giá là danh sách gồm [left, top, right, bottom].
  - `percent_discount_confidence`: độ tin cậy của Phần trăm giảm giá.
  - `discount`: Số tiền giảm giá.
  - `discount_box`: tọa độ Số tiền giảm giá là danh sách gồm [left, top, right, bottom].
  - `discount_confidence`: độ tin cậy của Số tiền giảm giá.
- `image`: Ảnh của báo giá đã được căn chỉnh.
- `image_table`: Ảnh của bảng trong báo giá đã được căn chỉnh.

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã cảnh báo:

| Invalid code | Message                                                         | Mô tả                                             |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------- |
| 0            | Successful                                                      | Thành công                                        |
| 1            | Photo contains sign of being taken through an electronic screen | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo          |
| 2            | The picture is a photocopy version of the id card               | Ảnh giấy tờ tùy thân là bản photocopy             |
| 3            | The id field on the document is incorrectly formatted           | Trường id trên giấy tờ tùy thân không đúng format |
| 4            | The mrzcode on the passport is incorrectly formatted            | MRZ code trên passport không đúng format          |
| 5            | The id card's corner has been clipped                           | Giấy tờ tùy thân bị cắt góc                       |

### Face Matching

Matching service là hệ thống AI cho phép so sánh độ tương đồng giữa khuôn mặt có trong chứng minh nhân dân, thẻ căn cước của người chủ sở hữu với khuôn mặt được chụp trực tiếp của cùng một người đó.

#### 1. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào url ảnh

**API**:

| Method | URL                                                             |
| ------ | --------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/face_matching` |

**Params**:

| Key           | Value                              | Mô tả                                                           |
| ------------- | ---------------------------------- | --------------------------------------------------------------- |
| `img1`        | `https://example.com/card.png`     | url ảnh chứng minh thư hoặc thẻ căn cước                        |
| `img2`        | `https://example.com/portrait.png` | url ảnh khuôn mặt cần so khớp                                   |
| `type1`       | `portrait`/`card`                  | loại data của ảnh 1, nhận các giá trị: `portrait`, `card`       |
| `format_type` | `url`                              | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card = 'link_url_img_card'
img_portrait = 'link_url_portrait'

response = requests.get("https://cloud.computervision.com.vn/api/v2/ekyc/face_matching?img1=%s&img2=%s&type1=%s&format_type=%s"
  % (img_card, img_portrait, 'card', 'url'),
  auth=(api_key, api_secret))

print(response.json())
```

#### 2. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào file ảnh

**API**:

| Method | URL                                                             | content-type          |
| ------ | --------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/face_matching` | `multipart/form-data` |

**Params**:

| Key           | Value             | Mô tả                                                           |
| ------------- | ----------------- | --------------------------------------------------------------- |
| `type1`       | `portrait`/`card` | loại data của ảnh 1, nhận các giá trị: `portrait`, `card`       |
| `format_type` | `file`            | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Body**:

| Key    | Type | Value                  | Mô tả                                     |
| ------ | ---- | ---------------------- | ----------------------------------------- |
| `img1` | file | `example_card.jpg`     | file ảnh chứng minh thư hoặc thẻ căn cước |
| `img2` | file | `example_portrait.jpg` | file ảnh khuôn mặt cần so khớp            |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card_path = '/path/to/your/img_card.jpg'
img_portrait_path = '/path/to/your/img_portrait.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/ekyc/face_matching?type1=%s&format_type=%s"
  % ('card', 'file'),
 	auth=(api_key, api_secret),
 	files={'img1': open(img_card_path, 'rb'), 'img2': open(img_portrait_path, 'rb')})

print(response.json())

```

#### 3. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào JSON

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/face_matching` | `application/json` |

**Params**:

| Key           | Value             | Mô tả                                                           |
| ------------- | ----------------- | --------------------------------------------------------------- |
| `type1`       | `portrait`/`card` | loại data của ảnh 1, nhận các giá trị: `portrait`, `card`       |
| `format_type` | `base64`          | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Body**:

```json
{
  "img1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh chứng minh thư/thẻ căn cước
  "img2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh khuôn mặt cần so khớp
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card_path = '/path/to/your/img_card.jpg'
img_portrait_path = '/path/to/your/img_portrait.jpg'
encode_card = get_byte_img(Image.open(img_card_path))
encode_portrait = get_byte_img(Image.open(img_portrait_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ekyc/face_matching?type1=%s&format_type=%s"
    % ('card', 'base64'),
    auth=(api_key, api_secret),
    json={'img1' : encode_card, "img2" : encode_portrait})
print(response.json())
```

<!--
#### 4. Xác thực khuôn mặt dùng ảnh người dùng cầm CMND/CCCD, đầu vào url ảnh

**API**:

| Method | URL                                                                |
| ------ | ------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/person_with_card` |

**Params**:

| Key           | Value                                      | Mô tả                                                           |
| ------------- | ------------------------------------------ | --------------------------------------------------------------- |
| `img`         | `https://example.com/person_with_card.png` | url ảnh người dùng cầm CMND/CCCD                                |
| `format_type` | `url`                                      | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card = 'link_url_img_person_with_card'

response = requests.get("https://cloud.computervision.com.vn/api/v2/ekyc/person_with_card?img=%s&format_type=%s"
  % (img_card, 'url'),
  auth=(api_key, api_secret))

print(response.json())
```

#### 5. Xác thực khuôn mặt dùng ảnh người dùng cầm CMND/CCCD, đầu vào file ảnh

**API**:

| Method | URL                                                                | content-type          |
| ------ | ------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/person_with_card` | `multipart/form-data` |

**Params**:

| Key           | Value  | Mô tả                                                           |
| ------------- | ------ | --------------------------------------------------------------- |
| `format_type` | `file` | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Body**:

| Key   | Type | Value             | Mô tả                                    |
| ----- | ---- | ----------------- | ---------------------------------------- |
| `img` | file | `example_img.jpg` | file ảnh người dùng cầm giấy tờ tùy thân |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_path = '/path/to/your/example_img.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/ekyc/person_with_card?format_type=%s"
  % ('file'),
 	auth=(api_key, api_secret),
 	files={'img': open(img_path, 'rb')})

print(response.json())

```

#### 6. Xác thực khuôn mặt dùng ảnh người dùng cầm CMT/CMND, đầu vào JSON

**API**:

| Method | URL                                                                | content-type       |
| ------ | ------------------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/person_with_card` | `application/json` |

**Params**:

| Key           | Value    | Mô tả                                                           |
| ------------- | -------- | --------------------------------------------------------------- |
| `format_type` | `base64` | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh người dùng cầm giấy tờ tùy thân
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card_path = '/path/to/your/example_img.jpg'
encode_card = get_byte_img(Image.open(img_card_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ekyc/person_with_card?format_type=%s"
    % ('base64'),
    auth=(api_key, api_secret),
    json={'img' : encode_card})
print(response.json())
``` -->

#### 4. Thông tin trả về

Đối với dịch vụ so khớp khuôn mặt trong chứng minh thư, thẻ căn cước, phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "data": {
    "matching": string, // phần trăm giống nhau giữa hai ảnh đầu vào
    "face1": string, // ảnh khuôn mặt chứng minh thư
    "face2": string, // ảnh khuôn mặt chân dung
    "invalidCode": string, // mã cảnh báo
    "invalidMessage": string, // Cảnh báo nếu ảnh chân dung hoặc ảnh giấy tờ có dấu hiệu làm ảnh hưởng đến kết quả
    "match": string // 1 nếu phần trăm matching > 75%, 0 nếu phần trăm matching trong khoảng [65%, 75%], ngược lại -1
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

<!--
Đối với dịch vụ so khớp khuôn mặt dùng ảnh người dùng cầm giấy tờ tùy thân thông tin trả về sẽ là một JSON với định dạng sau:

```json
{
  "matching": {
    "matching": string, // phần trăm giống nhau giữa ảnh trong CMND/CCCD và các ảnh chân dung
    "valid": string, // False nếu ảnh chân dung mờ, che hoặc có dấu hiệu giả mạo, ngược lại True
    "invalidMessage": string, // Thông báo nếu ảnh chân dung hoặc ảnh giấy tờ có dấu hiệu giả mạo
    "match": string // 1 nếu phần trăm matching > 75%, 0 nếu phần trăm matching trong khoảng [65%, 75%], ngược lại -1
  },
  "ocr": [xxxx], // thông tin đọc được từ ảnh mặt trước/mặt sau CMND/CCCD
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Trường `ocr` gồm các thông tin sau:

```json
{
  "infor": [xxxx],
  "valid": [xxxx],
  "invalidMessage": [xxxx],
  "type": [xxxx]
}
```

`type`: Loại giấy tờ tùy thân được trích xuất thông tin.

- `9_id_card_front`: ứng với mặt trước của chứng minh nhân dân.
- `12_id_card_front`: ứng với mặt trước thẻ căn cước công dân.
- `9_id_card_back`: ứng với mặt sau của chứng minh nhân dân.
- `12_id_card_back`: ứng với mặt sau của thẻ căn cước.
- `driving_license`: ứng với bằng lái xe.
- `passport`: ứng với loại giấy tờ là hộ chiếu.
- `vehicle_registration_front`: ứng với mặt trước của giấy đăng ký xe.
- `vehicle_registration_back`: ứng với mặt sau của giấy đăng ký xe.

`info`: Bao gồm các thông tin được trích xuất từ ảnh đầu vào có giấy tờ tùy thân, với mỗi loại giấy tờ tùy thân thì sẽ có những thông tin trả về khác nhau.

Mặt trước chứng minh nhân dân:

- `id`: số chứng minh thư.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `hometown`: quê quán.
- `address`: thường trú.
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước thẻ căn cước công dân:

- `id`: số thẻ.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `hometown`: quê quán
- `gender`: giới tính.
- `due_date`: ngày hết hạn.
- `nationality`: quốc tịch.
- `ethnicity`: dân tộc.
- `address`: thường trú.
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân:

- `ethnicity`: dân tộc.
- `issue_date`: ngày cấp.
- `religious`: tôn giáo.
- `issued_at`: nơi cấp
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân:

- `issue_date`: ngày cấp.
- `issued_at`: nơi cấp
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Passport:

- `id`: passport id.
- `sur_name`: họ.
- `given_name`: tên.
- `dob`: ngày sinh.
- `gender`: giới tính.
- `country`: quốc gia.
- `nationality `: quốc tịch.
- `due_date`: ngày hết hạn.
- `person_number`: mã số công dân.
- `image`: ảnh passport. -->

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | So khớp thành công                                                   |
| 1      | The photo does not contain content | Upload ảnh bị lỗi khi dùng POST                                      |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Tồn tại ảnh không có mặt người                                       |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã lỗi cảnh báo:

| invalidCode | invalidMessage                                                   | Mô tả                                                                              |
| ----------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 0           | Successful                                                       | Thành công                                                                         |
| 1           | The ID card photo is not existed                                 | Ảnh đầu vào không có giấy tờ tùy thân                                              |
| 2           | The picture is a photocopy version of the id card                | Ảnh giấy tờ tùy thân là bản photocopy                                              |
| 3           | The ID card photo is suspected of tampering                      | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo                                           |
| 4           | The ID card photo does not contain a face                        | Ảnh giấy tờ tùy thân không có mặt                                                  |
| 5           | The portrait photo does not contain a face                       | Ảnh chân dung không có mặt                                                         |
| 6           | Photo contains more than one face                                | Ảnh chứa nhiều hơn một mặt người                                                   |
| 7           | Wearing sunglasses                                               | Đeo kính đen                                                                       |
| 8           | Wearing a hat                                                    | Đội mũ                                                                             |
| 9           | Wearing a mask                                                   | Đeo khẩu trang                                                                     |
| 10          | Photo taken from picture, screen, blurred noise or sign of fraud | Ảnh chụp từ bức ảnh khác, màn hình thiết bị, bị mờ nhiễu hoặc có dấu hiệu gian lận |
| 11          | The face in the picture is too small                             | Mặt người trong ảnh quá nhỏ                                                        |
| 12          | The face in the portrait photo is too close to the margin        | Mặt người trong ảnh quá gần với lề                                                 |

### Liveness Verify

#### 1. Thực hiện eKYC sử dụng ảnh chụp chân dung người dùng ở 3 góc độ

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/verify_liveness` | `multipart/form-data` |

**Body**:

| Key              | Type | Value           | Mô tả                                   |
| ---------------- | ---- | --------------- | --------------------------------------- |
| `portrait_left`  | file | `example_1.jpg` | file ảnh quay trái của người dùng       |
| `portrait_mid`   | file | `example_2.jpg` | file ảnh chụp chính diện của người dùng |
| `portrait_right` | file | `example_3.jpg` | file ảnh quay phải của người dùng       |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img1_path = '/path/to/your/example_1.jpg'
img2_path = '/path/to/your/example_2.jpg'
img3_path = '/path/to/your/example_3.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/ekyc/verify_liveness",
 	auth=(api_key, api_secret),
 	files={ 'portrait_left': open(img1_path, 'rb'),
            'portrait_mid': open(img2_path, 'rb'),
            'portrait_right': open(img3_path, 'rb')
        })

print(response.json())

```

#### 2. Thông tin trả về

Thông tin trả về của API Liveness Verify là một JSON với định dạng sau:

```json
{
  "data": {
    "invalidCode": string, // mã cảnh báo
    "invalidMessage": string, // cảnh báo nếu ảnh chân dung hoặc ảnh giấy tờ có dấu hiệu làm ảnh hưởng đến kết quả
    "matching_mid_left": string,
    "matching_mid_right": string,
    "valid": string // (True/False)
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Bảng mã lỗi cảnh báo:

| invalidCode | invalidMessage                                 | Mô tả                                                           |
| ----------- | ---------------------------------------------- | --------------------------------------------------------------- |
| 0           | Successful                                     | Thành công                                                      |
| 1           | The mid image does not contain face            | Ảnh chụp chính diện không chứa khuôn mặt                        |
| 2           | The left image does not contain face           | Ảnh chụp quay trái không chứa khuôn mặt                         |
| 3           | The right image does not contain face          | Ảnh chụp quay phải không chứa khuôn mặt                         |
| 4           | The mid image and the left image do not match  | Khuôn mặt ảnh chụp chính diện và quay trái không cùng một người |
| 5           | The mid image and the right image do not match | Khuôn mặt ảnh chụp chính diện và quay phải không cùng một người |
| 6           | Invalid center image                           | Ảnh chụp chính diện không hợp lệ                                |
| 7           | Invalid left image                             | Ảnh chụp quay trái không hợp lệ                                 |
| 8           | Invalid right image                            | Ảnh chụp quay phải không hợp lệ                                 |

### Face Search

#### 1. Xem toàn bộ ảnh

**API**:

| Method | URL                                                             |
| ------ | --------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/face_search/images` |

**Params**:

| Key      | Value | Mô tả                       |
| -------- | ----- | --------------------------- |
| `offset` | `100` | số bản ghi sẽ bỏ qua        |
| `limit`  | `50`  | số bản ghi tối đa sẽ trả về |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

offset = 100
limit = 50

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/face_search/images?offset=%s&limit=%s"
  % (offset, limit),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 2. Tìm kiếm khuôn mặt

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/face_search/search` | `application/json` |

**Body**:

```json
{
  "image": {
    "base64": string
  }
}
```

Trong đó:

| Key      | Type      | Bắt buộc | Mô tả                      |
| -------- | --------- | -------- | -------------------------- |
| `image`  | ImageData | có       | ảnh dùng để tìm kiếm       |
| `base64` | string    | có       | mã hoá base64 của hình ảnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image\":{\"base64\":\"iVBORw0KGgoAAAANSU...\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/search",
  auth=(api_key, api_secret),
  data = payload

print(response.json())
```

#### 3. Thêm ảnh

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/face_search/images` | `application/json` |

**Body**:

```json
{
  "image": {
    "base64": string,
    "metadata": json
  }
}
```

Trong đó:

| Key        | Type       | Bắt buộc | Mô tả                                                                                                                     |
| ---------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `image`    | ImageData  | có       | ảnh muốn thêm                                                                                                             |
| `base64`   | string     | có       | mã hoá base64 của hình ảnh                                                                                                |
| `metadata` | dictionary | không    | bất kỳ metadata key-value nào để lưu cùng với ảnh, trừ những key `"user"`, `"encoding"`, `"_id"` đã được hệ thống sử dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image\":{\"base64\":\"iVBORw0KGgoAAAANSU...\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/images",
    auth=(api_key, api_secret),
    data = payload

print(response.json())
```

#### 4. Cập nhật metadata

**API**:

| Method | URL                                                                        | content-type       |
| ------ | -------------------------------------------------------------------------- | ------------------ |
| PUT    | `https://cloud.computervision.com.vn/api/v2/face_search/images/<image_id>` | `application/json` |

**Body**:

```json
{
  "image_id": 123456,
  "metadata": {
    "name": "example",
    "label": "for bar"
    ...
  }
}
```

| Key        | Bắt buộc | Mô tả                                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `metadata` | không    | bất kỳ metadata key-value nào để lưu cùng với ảnh, trừ những key `"user"`, `"encoding"`, `"_id"` đã được hệ thống sử dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image_id\":123456,\"metadata\":{\"name\":\"example\",\"label\":\"for bar\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/images/<image_id>",
  data = payload,
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 5. Xoá nhiều ảnh

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| DELETE | `https://cloud.computervision.com.vn/api/v2/face_search/images` | `application/json` |

**Body**:

```json
{
  "ids": [
    123456, // id ảnh cần xoá
    987654, // id ảnh cần xoá
    ...
  ]
}
```

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"ids\":[<image-id-you-want-to-delete>,<image-id-you-want-to-delete>,...]}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/images",
  data = payload,
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 6. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "result": [xxxx],
  "status_code": int, // mã lỗi
  "message": string, // thông báo lỗi
}
```

Mỗi api khác nhau sẽ trả về kết quả khác nhau.

Xem toàn bộ ảnh:

- `result`: mảng chứa các phần tử ảnh, mỗi phần tử gồm id của ảnh và url ảnh tương ứng

Tìm kiếm khuôn mặt:

- `result`: mảng chứa các phần tử ảnh phù hợp, mỗi phần tử gồm id của ảnh và url ảnh tương ứng

Thêm ảnh:

- `result`: json chứa thông tin ảnh mới được thêm vào

Xoá nhiều ảnh:

- `result`: `None`

Bảng mã lỗi:

| Mã lỗi | Message                            |
| ------ | ---------------------------------- |
| 0      | Success                            |
| 1      | Incorrect image format             |
| 2      | Url is unavailable                 |
| 3      | The photo does not contain content |
| 4      | Incorrect Api_key or api_secret    |
| 5      | Out of requests                    |
| 6      | Error when processing the request  |
| 7      | Incorrect Id                       |

### Hồ sơ claim bảo hiểm sức khỏe

#### 1. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                     |
| ------ | ------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/claims` |

**Params**:

| Key           | Value                           | Mô tả                                                          |
| ------------- | ------------------------------- | -------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                           |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`    |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Hồ sơ claim bảo hiểm sức khỏe đã được căn chỉnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/claims?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                     | content-type          |
| ------ | ------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/claims` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                          |
| ------------- | -------------- | -------------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`    |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hồ sơ claim bảo hiểm sức khỏe đã được căn chỉnh |

**Body**:

| Key   | Type | Value         | Mô tả                                               |
| ----- | ---- | ------------- | --------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Hồ sơ claim bảo hiểm sức khỏe |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/claims?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào json

**API**:

| Method | URL                                                     | content-type       |
| ------ | ------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/claims` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                          |
| ------------- | -------------- | -------------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`    |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hồ sơ claim bảo hiểm sức khỏe đã được căn chỉnh |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/claims?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Trường `data` là một mảng, mỗi phần tử trong mảng tương ứng với thông tin một trang trong file pdf hoặc một ảnh giấy tờ trích xuất được.

Mỗi phần tử trong mảng sẽ là một JSON với định dạng sau:

```json
{
  "type": string,
  "info": object
}
```

`type`: Loại giấy tờ trong hồ sơ claim bảo hiểm sức khỏe được trích xuất thông tin.

- `9_id_card_front`: Mặt trước của chứng minh nhân dân.
- `12_id_card_front`: Mặt trước thẻ căn cước công dân.
- `chip_id_card_front`: Mặt trước thẻ căn cước công dân gán chip.
- `9_id_card_back`: Mặt sau của chứng minh nhân dân.
- `12_id_card_back`: Mặt sau của thẻ căn cước.
- `chip_id_card_back`: Mặt sau thẻ căn cước công dân gán chip.
- `passport`: Hộ chiếu.
- `bvcard`: Thẻ bên Bảo Việt.
- `claim_form`: Giấy yêu cầu bồi thường.

`info`: Bao gồm các thông tin trích xuất được, với mỗi loại giấy tờ thì sẽ có những thông tin trả về khác nhau.

Mặt trước chứng minh nhân dân:

- `id`: số chứng minh thư.
- `id_box`: tọa độ số chứng minh thư là mảng gồm [left, top, right, bottom]
- `id_confidence`: độ tin cậy số chứng minh thư
- `name`: họ và tên.
- `name_box`: tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: độ tin cậy của họ và tên
- `dob`: ngày sinh.
- `dob_box`: tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence`: độ tin cậy của ngày sinh
- `hometown`: quê quán.
- `hometown_box`: tọa độ quê quán là mảng gồm [left, top, right, bottom].
- `hometown_confidence`: độ tin cậy của quê quán.
- `address`: thường trú.
- `address_box`: tọa độ thường trú là mảng gồm [left, top, right, bottom].
- `address_confidence`: độ tin cậy của thường trú.
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước thẻ căn cước công dân:

- `id`: số thẻ.
- `id_box`: tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `id_confidence`: độ tin cậy số thẻ
- `name`: họ và tên.
- `name_box`: tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: độ tin cậy của họ và tên
- `dob`: ngày sinh.
- `dob_box`: tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence`: độ tin cậy của ngày sinh
- `hometown`: quê quán
- `hometown_box`: tọa độ quê quán là mảng gồm [left, top, right, bottom]
- `hometown_confidence`: độ tin cậy của quê quán
- `gender`: giới tính.
- `gender_box`: tọa độ giới tính là mảng gồm [left, top, right, bottom]
- `gender_confidence`: độ tin cậy của giới tính
- `due_date`: ngày hết hạn.
- `due_date_box`: tọa độ ngày hết hạn là mảng gồm [left, top, right, bottom]
- `due_date_confidence`: độ tin cậy của ngày hết hạn
- `nationality`: quốc tịch.
- `nationality_box`: tọa độ quốc tịch là mảng gồm [left, top, right, bottom]
- `nationality_confidence`: độ tin cậy của quốc tịch
- `ethnicity`: dân tộc.
- `ethnicity_box`: tọa độ dân tộc là mảng gồm [left, top, right, bottom]
- `ethnicity_confidence`: độ tin cậy của dân tộc
- `address`: thường trú.
- `address_box`: tọa độ thường trú là mảng gồm [left, top, right, bottom]
- `address_confidence`: độ tin cậy của thường trú
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước thẻ căn cước công dân gắn chip:

- `id`: số thẻ.
- `id_box`: tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `id_confidence`: độ tin cậy số thẻ
- `name`: họ và tên.
- `name_box`: tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: độ tin cậy của họ và tên
- `dob`: ngày sinh.
- `dob_box`: tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence`: độ tin cậy của ngày sinh
- `hometown`: quê quán
- `hometown_box`: tọa độ quê quán là mảng gồm [left, top, right, bottom]
- `hometown_confidence`: độ tin cậy của quê quán
- `gender`: giới tính.
- `gender_box`: tọa độ giới tính là mảng gồm [left, top, right, bottom]
- `gender_confidence`: độ tin cậy của giới tính
- `due_date`: ngày hết hạn.
- `due_date_box`: tọa độ ngày hết hạn là mảng gồm [left, top, right, bottom]
- `due_date_confidence`: độ tin cậy của ngày hết hạn
- `nationality`: quốc tịch.
- `nationality_box`: tọa độ quốc tịch là mảng gồm [left, top, right, bottom]
- `nationality_confidence`: độ tin cậy của quốc tịch
- `address`: thường trú.
- `address_box`: tọa độ thường trú là mảng gồm [left, top, right, bottom]
- `address_confidence`: độ tin cậy của thường trú
- `address_town_code`: mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: mã quận/huyện trong quê quán.
- `hometown_ward_code`: mã phường/xã trong quê quán.
- `address_town`: tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: quận/huyện trong địa chỉ thường trú.
- `address_ward`: phường/xã trong địa chỉ thường trú.
- `hometown_town`: tỉnh/thành phố trong quê quán.
- `hometown_district`: quận/huyện trong quê quán.
- `hometown_ward`: phường/xã trong quê quán.
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân:

- `ethnicity`: dân tộc.
- `ethnicity_box`: tọa độ dân tộc là mảng gồm [left, top, right, bottom]
- `ethnicity_confidence`: độ tin cậy của dân tộc
- `issue_date`: ngày cấp.
- `issue_date_box`: tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issue_date_confidence`: độ tin cậy của ngày cấp
- `religious`: tôn giáo.
- `religious_box`: tọa độ tôn giáo là mảng gồm [left, top, right, bottom]
- `religious_confidence`: độ tin cậy của tôn giáo
- `issued_at`: nơi cấp
- `issued_at_box`: tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `issued_at_confidence`: độ tin cậy của nơi cấp
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân:

- `issue_date`: ngày cấp.
- `issue_date_box`: tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issue_date_confidence`: độ tin cậy của ngày cấp
- `issued_at`: nơi cấp
- `issued_at_box`: tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `issued_at_confidence`: độ tin cậy của nơi cấp
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân gán chip:

- `issue_date`: ngày cấp.
- `issue_date_confidence`: độ tin cậy của ngày cấp
- `issue_date_box`: tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issued_at`: nơi cấp
- `issued_at_confidence`: độ tin cậy của nơi cấp
- `issued_at_box`: tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `country`: quốc gia
- `document_number`: id mặt sau
- `person_number`: id mặt trước
- `dob`: ngày sinh
- `gender`: giới tính
- `due_date`: ngày hết hạn
- `nationality`: quốc tịch
- `sur_name`: họ
- `given_name`: tên
- `image`: ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `mrz_confidence`: độ tin cậy của mrz code

Passport:

- `id` : passport id
- `sur_name` : họ
- `given_name`: tên
- `dob` : ngày sinh
- `gender` : giới tính
- `country` : quốc gia
- `nationality` : quốc tịch
- `due_date` : ngày hết hạn
- `person_number` : mã số công dân,
- `image` : ảnh passport đã được cắt và căn chỉnh
- `confidence`: độ tin cậy của mrz code

Thẻ bên Bảo Việt:

- `name`: Họ tên
- `name_box`: Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy của họ tên
- `plan`: Chương trình
- `plan_box`: Tọa độ chương trình là mảng gồm [left, top, right, bottom]
- `plan_confidence`: Độ tin cậy chương trình
- `company`: Công ty
- `company_box`: Tọa độ công ty là mảng gồm [left, top, right, bottom]
- `company_confidence`: Độ tin cậy công ty
- `valid`: Hiệu lực
- `valid_box`: Tọa độ hiệu lực là mảng gồm [left, top, right, bottom]
- `valid_confidence`: Độ tin cậy hiệu lực
- `policy_no`: Số thẻ
- `policy_no_box`: Tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `policy_no_confidence`: Độ tin cậy số thẻ
- `image`: Ảnh thẻ đã cắt và căn chỉnh

Giấy yêu cầu bồi thường:

- `insure_name`: Họ tên người được bảo hiểm
- `insure_name_box`: Tọa độ của họ tên người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `insure_name_confidence`: Độ tin cậy của họ tên người được bảo hiểm
- `dob`: Ngày sinh người được bảo hiểm
- `dob_box`: Tọa độ của ngày sinh người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy của ngày sinh người được bảo hiểm
- `gender`: Giới tính người được bảo hiểm
- `gender_box`: Tọa độ của giới tính người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy của giới tính người được bảo hiểm
- `certificate_no`: Số thẻ bảo hiểm của người được bảo hiểm
- `certificate_no_box`: Tọa độ của số thẻ bảo hiểm người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `certificate_no_confidence`: Độ tin cậy của số thẻ bảo hiểm người được bảo hiểm
- `id_card_no`: Số CMND người được bảo hiểm
- `id_card_no_box`: Tọa độ của số CMND người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `id_card_no_confidence`: Độ tin cậy của số CMND người được bảo hiểm
- `family_member`: Tên người thân của người được bảo hiểm
- `family_member_box`: Tọa độ của tên người thân người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `family_member_confidence`: Độ tin cậy của tên người thân người được bảo hiểm
- `policy_holder`: Tên bên mua bảo hiểm
- `policy_holder_box`: Tọa độ của tên bên mua bảo hiểm là mảng gồm [left, top, right, bottom]
- `policy_holder_confidence`: Độ tin cậy của tên bên mua bảo hiểm
- `cellphone_no`: Số điện thoại người được bảo hiểm
- `cellphone_no_box`: Tọa độ của số điện thoại người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `cellphone_no_confidence`: Độ tin cậy của số điện thoại người được bảo hiểm
- `email`: Email người được bảo hiểm
- `email_box`: Tọa độ của email người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `email_confidence`: Độ tin cậy của email người được bảo hiểm
- `image`: Ảnh của giấy yêu cầu đã được cắt và căn chỉnh

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

### Phân loại giấy tờ Hồ sơ bảo hiểm sức khỏe

#### 1. Phân loại giấy tờ hồ sơ bảo hiểm sức khỏe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                      |
| ------ | ------------------------------------------------------------------------ |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đã được căn chỉnh                                |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Phân loại giấy tờ hồ sơ bảo hiểm sức khỏe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                      | content-type          |
| ------ | ------------------------------------------------------------------------ | --------------------- |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đã được căn chỉnh                                |

**Body**:

| Key   | Type | Value         | Mô tả                                         |
| ----- | ---- | ------------- | --------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Hồ sơ bảo hiểm sức khỏe |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Phân loại giấy tờ hồ sơ bảo hiểm sức khỏe với đầu vào json

**API**:

| Method | URL                                                                      | content-type       |
| ------ | ------------------------------------------------------------------------ | ------------------ |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đã được căn chỉnh                                |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Mỗi phần tử trong mảng `data` (tương ứng với từng trang được trích xuất) sẽ là một JSON với định dạng sau:

```json
{
  "id": [xxxx],
  "label": [xxxx],
  "image": [xxxx]
}
```

Trong đó:

- `id`: Thứ tự trang tương ứng với file truyền vào, bắt đầu từ 0.
- `label`: Nhãn của trang tương ứng. Hiện tại đã hỗ trợ 17 nhãn trong hồ sơ bảo hiểm, nếu rơi vào trường hợp không thuộc 1 trong 17 nhãn đã định nghĩa thì `label` sẽ trả về `None`.
  - `invoice`: Hóa đơn
  - `list_expense`: Bảng kê
  - `claim_form`: Giấy yêu cầu bồi thường
  - `hospital_discharge_paper`: Giấy ra viện
  - `id_doc`: Giấy tờ tùy thân. Ví dụ chứng minh nhân dân, thẻ căn cước,...
  - `prescription`: Đơn thuốc
  - `medical_report`: Báo cáo y tế
  - `discharge_report`: Báo cáo ra viện
  - `bill`: Biên lai
  - `surgical_certificate`: Giấy chứng nhận phẫu thuật
  - `specify_vote`: Phiếu chỉ định
  - `test_results`: Phiếu kết quả
  - `medical_examination`: Phiếu khám
  - `receipts`: Phiếu thu
  - `health_records`: Sổ khám bệnh
  - `guarantee_confirmation`: Giấy xác nhận bảo lãnh
  - `accident_report`: Tường trình tai nạn
- `image`: Ảnh được căn chỉnh với trang tương ứng

### Hồ sơ nhân sự

#### 1. Trích xuất thông tin Hồ sơ nhân sự với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/employee_profile?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Hồ sơ nhân sự với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                               |
| ----- | ---- | ------------- | ----------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Hồ sơ nhân sự |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/employee_profile?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Hồ sơ nhân sự với đầu vào json

**API**:

| Method | URL                                                               | content-type       |
| ------ | ----------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/employee_profile?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": {
    "id_card": array,
    "registration_book": array,
    "curriculum_vitae": array,
    "academic_degree": array,
    "birth_certificate": array,
    "health_certification": array,
    "image_negative": array
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Đối với các keys `id_card`,`academic_degree`,`birth_certificate` thì value là mảng có một hoặc nhiều phần tử.

Đối với các keys `registration_book`,`curriculum_vitae` thì value là mảng có duy nhất một phần tử.

Đối với `image_negative` là mảng ảnh không trích xuất được bất cứ thông tin của một loại giấy tờ nào (ảnh định dạng base64).

Mỗi phần tử trong mảng sẽ là một JSON với định dạng sau:

```json
{
  "type": string,
  "info": object
}
```

Thẻ, giấy tờ tùy thân:

- `type`: `id_card`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ tên
  - `dob`: Ngày sinh
  - `gender`: Giới tính
  - `address`: Địa chỉ
  - `hometown`: Quê quán
  - `id`: Số thẻ
  - `issue_date`: Ngày cấp
  - `issued_at`: Nơi cấp
  - `image_front`: Ảnh giấy tờ tùy thân mặt trước dạng base64
  - `image_back`: Ảnh giấy tờ tùy thân mặt sau dạng base64

Sơ yếu lý lịch:

- `type`: `curriculum_vitae`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ tên
  - `name_id`: Trang đi kèm với họ tên được trích xuất
  - `dob`: Ngày sinh
  - `dob_id`: Trang đi kèm với ngày sinh được trích xuất
  - `work_experience`: Kinh nghiệm làm việc
  - `work_experience_id`: Trang đi kèm với kinh nghiệm làm việc
  - `father_name`: Họ tên bố
  - `father_name_id`: Trang đi kèm với họ tên bố
  - `mother_name`: Họ tên mẹ
  - `mother_name_id`: Trang đi kèm với họ tên mẹ
  - `academic_level`: Trình độ học vấn
  - `academic_level_id`: Trang đi kèm trình độ học vấn.
  - `image_0`: Ảnh trang đầu của sơ yếu lý lịch
  - `image_1`: Ảnh trang thứ 2 của sơ yếu lý lịch
  - `image_2`: Ảnh trang thứ 3 của sơ yếu lý lịch
  - `image_3`: Ảnh trang thứ 4 của sơ yếu lý lịch

Sổ hộ khẩu:

- `type`: `registration_book`.
- `info_goods`: là json chứa các thông tin:
  - `book_number`: Số sổ hộ khẩu
  - `address`: Địa chỉ
  - `head_name`: Họ tên chủ hộ
  - `image`: Ảnh trang bìa sổ hộ khẩu
  - `member`: Là một json chứa thông tin của các thành viên gồm:
    - `relationship_to_head`: Mối quan hệ với chủ hộ
    - `name`: Họ tên thành viên
    - `dob`: Ngày sinh thành viên
    - `id_card`: Số chứng minh thư/Hộ chiếu thành viên
    - `image_member`: Ảnh trang chứa thông tin thành viên

Bằng đại học:

- `type`: `academic_degree`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ tên
  - `dob`: Ngày sinh
  - `school`: Trường học
  - `major`: Ngành học
  - `graduation_year`: Năm tốt nghiệp
  - `award_classification`: Xếp loại
  - `academic_level`: Trình độ
  - `image`: Ảnh của bằng đại học

Giấy khai sinh:

- `type`: `birth_certificate`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ và Tên
  - `dob`: Ngày sinh
  - `regis_place`: Nơi Đăng ký
  - `number`: Số
  - `number_book`: Số quyển
  - `father_name`: Họ và Tên Bố
  - `father_dob`: Ngày sinh Bố
  - `father_address`: Nơi cư trú của Bố
  - `mother_name`: Họ và Tên Mẹ
  - `mother_dob`: Ngày sinh Mẹ
  - `mother_address`: Nơi cư trú của Mẹ
  - `place_of_birth`: Nơi sinh
  - `image`: Ảnh của giấy khai sinh

Giấy khám sức khỏe:

- `type`: `health_certification`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ và Tên
  - `dob`: Ngày sinh
  - `height`: Chiều cao
  - `weight`: Cân nặng
  - `health_condition`: Điều kiện sức khoẻ
  - `image_0`: Ảnh trang đầu của giấy khám sức khoẻ
  - `image_1`: Ảnh trang chứa thông tin chiều cao cân nặng
  - `image_2`: Ảnh trang thứ 3 ảnh chứa thông tin điều kiện sức khoẻ

Lưu ý: các trường thông tin (trừ trường image) sẽ có `_box` và `_confidence` đi kèm

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

### Sao kê ngân hàng

#### 1. Trích xuất thông tin Sao kê ngân hàng với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                      |
| ------ | ------------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Sao kê ngân hàng đã được căn chỉnh           |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Sao kê ngân hàng với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                      | content-type          |
| ------ | ------------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Sao kê ngân hàng đã được căn chỉnh           |

**Body**:

| Key   | Type | Value         | Mô tả                                  |
| ----- | ---- | ------------- | -------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Sao kê ngân hàng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Sao kê ngân hàng với đầu vào json

**API**:

| Method | URL                                                                      | content-type       |
| ------ | ------------------------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Sao kê ngân hàng đã được căn chỉnh           |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Mỗi phần tử trong mảng `data` (tương ứng với từng trang được trích xuất) sẽ là một JSON với định dạng sau:

```json
{
  "image_table": array, // danh sách ảnh của bảng trong trang
  "json": array, // danh sách thông tin tương ứng với từng ảnh trong image_table
}
```

Mỗi phần tử trong mảng `json` có cấu trúc như sau:

```json
[
  [json_0, json_1, json_2, json_3, json_4], // biểu thị từng row
  [...],
  ...
]
```

Trong đó:

- json_0: Thông tin trường Ngày
- json_1: Thông tin trường Mô tả
- json_2: Thông tin trường Nợ
- json_3: Thông tin trường Có
- json_4: Thông tin trường Số dư

Mỗi json này có cấu trúc như sau:

```json
{
  "value": // Giá trị text trong ô
  "score": // Độ tin cậy
  "box": // Ví trí của ô trong bảng
}
```

### Hóa đơn

#### 1. Trích xuất thông tin Hóa đơn với đầu vào file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hóa đơn đã được căn chỉnh                    |

**Body**:

| Key   | Type | Value         | Mô tả                |
| ----- | ---- | ------------- | -------------------- |
| `img` | file | `example.pdf` | file pdf của Hóa đơn |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/invoice.pdf'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 2. Trích xuất thông tin Hóa đơn với đầu vào file xml

**API**:

| Method | URL                                                                   | content-type          |
| ------ | --------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice-xml` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hóa đơn đã được căn chỉnh                    |

**Body**:

| Key   | Type | Value         | Mô tả                |
| ----- | ---- | ------------- | -------------------- |
| `img` | file | `example.xml` | file xml của Hóa đơn |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/invoice.xml'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice-xml?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Mỗi phần tử trong mảng `data` (tương ứng với từng trang được trích xuất) sẽ là một JSON với định dạng sau:

```json
{
  "info": [xxxx], // thông tin trích xuất được
  "type": "invoice"
}
```

`info` gồm các thông tin sau:

- `date`: Ngày lập hóa đơn
- `date_box`: Tọa độ ngày lập hóa đơn là một list gồm [left, top, right, bottom]
- `date_confidence`: Độ tin cậy của ngày lập hóa đơn
- `form`: Mẫu số
- `form_box`: Tọa độ mẫu số hóa đơn là một list gồm [left, top, right, bottom]
- `form_confidence`: Độ tin cậy của mẫu số
- `invoice_no`: Số hóa đơn
- `invoice_no_box`: Tọa độ số hóa đơn là một list gồm [left, top, right, bottom]
- `invoice_no_confidence`: Độ tin cậy của số hóa đơn
- `serial_no`: Số ký hiệu hóa đơn
- `serial_no_box`: Tọa độ số ký hiệu hóa đơn là một list gồm [left, top, right, bottom]
- `serial_no_confidence`: Độ tin cậy của số ký hiệu hóa đơn
- `supplier`: Nhà cung cấp
- `supplier_box`: Tọa độ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_confidence`: Độ tin cậy của nhà cung cấp
- `tax_code`: Mã số thuế nhà cung cấp
- `tax_code_box`: Tọa độ mã số thuế nhà cung cấp là một list gồm [left, top, right, bottom]
- `tax_code_confidence`: Độ tin cậy của mã số thuế nhà cung cấp
- `total_amount`: Tổng tiền
- `total_amount_box`: Tọa độ tổng tiền là một list gồm [left, top, right, bottom]
- `total_amount_confidence`: Độ tin cậy của tổng tiền
- `payment_method`: Hình thức thanh toán
- `payment_method_box`: Tọa độ hình thức thanh toán là một list gồm [left, top, right, bottom]
- `payment_method_confidence`: Độ tin cậy của hình thức thanh toán
- `sub_total`: Tiền trước thuế
- `sub_total_box`: Tọa độ tiền trước thuế là một list gồm [left, top, right, bottom]
- `sub_total_confidence`: Độ tin cậy của tiền trước thuế
- `vat_amount`: Tiền thuế
- `vat_amount_box`: Tọa độ tiền thuế là một list gồm [left, top, right, bottom]
- `vat_amount_confidence`: Độ tin cậy của tiền thuế
- `purchaser_name`: Tên đơn vị mua hàng
- `purchaser_name_box`: Tọa độ tên đơn vị mua hàng là một list gồm [left, top, right, bottom]
- `purchaser_name_confidence`: Độ tin cậy tên đơn vị mua hàng
- `lookup_website`: Đường dẫn tra cứu
- `lookup_website_box`: Tọa độ đường dẫn tra cứu là một list gồm [left, top, right, bottom]
- `lookup_website_confidence`: Độ tin cậy đường dẫn tra cứu
- `lookup_code`: Mã tra cứu,
- `lookup_code_box`: Tọa độ mã tra cứu là một list gồm [left, top, right, bottom]
- `lookup_code_confidence`: Độ tin cậy mã tra cứu
- `buyer_name`: Họ tên người mua hàng
- `buyer_name_box`: Tọa độ họ tên người mua hàng là một list gồm [left, top, right, bottom]
- `buyer_name_confidence`: Độ tin cậy họ tên người mua hàng
- `supplier_address`: Địa chỉ nhà cung cấp
- `supplier_address_box`: Tọa độ địa chỉ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_address_confidence`: Độ tin cậy địa chỉ nhà cung cấp
- `vat_rate`: Thuế suất VAT
- `vat_rate_box`: Tọa độ thuế suất VAT là một list gồm [left, top, right, bottom]
- `vat_rate_confidence`: Độ tin cậy thuế suất VAT
- `account_bank`: Số tài khoản và ngân hàng đi kèm của nhà cung cấp. Trường này là một list. Mỗi phần tử trong list là một JSON biểu thị một số tài khoản và ngân hàng đi kèm. Phần tử này gồm các trường sau đây:
  - `account_no`: Số tài khoản
  - `account_no_box`: Tọa độ số tài khoản là một list gồm [left, top, right, bottom]
  - `account_no_confidence`: Độ tin cậy số tài khoản
  - `bank`: Tên ngân hàng
  - `bank_box`: Tọa độ tên ngân hàng là một list gồm [left, top, right, bottom]
  - `bank_confidence`: Độ tin cậy tên ngân hàng
- `image`: Ảnh hóa đơn đã được xoay và căn chỉnh
- `image_table`: Ảnh phần bảng trong hóa đơn đã được cắt và căn chỉnh
- `table`: Chứa thông tin trích xuất từ bảng. Là một list mỗi list chứa thông tin của một hàng. Mỗi phần tử trong hàng là một dictionary chứa các thông tin sau:
  - `value`: Giá trị
  - `box`: Tọa độ là một list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy
  - `label`: Nhãn của cột tương ứng. Có thể là một trong các giá trị sau:
    - `number`: Số thứ tự
    - `description`: Tên hàng hóa dịch vụ
    - `unit`: Đơn vị tính
    - `quantity`: Số lượng
    - `unit_price`: Đơn giá
    - `amount_before_tax`: Tổng tiền trước thuế
    - `tax`: Thuế suất
    - `tax_amount`: Tiền thuế
    - `amount_total`: Tổng tiền sau thuế
    - `batch_no`: Số lô
    - `expired_date`: Hạn dùng

### Báo cáo tín dụng

#### 1. Trích xuất thông tin Báo cáo tín dụng với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                    |
| ------ | ---------------------------------------------------------------------- |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/document/credit_report` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Báo cáo tín dụng đã được căn chỉnh           |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://demo.computervision.com.vn/api/v2/ocr/document/credit_report?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Báo cáo tín dụng với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                    | content-type          |
| ------ | ---------------------------------------------------------------------- | --------------------- |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/credit_report` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Báo cáo tín dụng đã được căn chỉnh           |

**Body**:

| Key   | Type | Value         | Mô tả                                  |
| ----- | ---- | ------------- | -------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Báo cáo tín dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://demo.computervision.com.vn/api/v2/ocr/document/credit_report?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Báo cáo tín dụng với đầu vào json

**API**:

| Method | URL                                                                    | content-type       |
| ------ | ---------------------------------------------------------------------- | ------------------ |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/credit_report` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Báo cáo tín dụng đã được căn chỉnh           |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://demo.computervision.com.vn/api/v2/ocr/document/credit_report?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": {
    "info": [xxxx],
    "type": "credit_report"
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

`info`: Thông tin trích xuất được, bao gồm:

- `report_time`: Thời gian gửi báo cáo.
- `report_time_box`: Tọa độ thời gian gửi báo cáo là một list gồm [left, top, right, bottom].
- `report_time_confidence`: Độ tin cậy Thời gian gửi báo cáo.
- `report_time_id`: Trang đi kèm với Thời gian gửi báo cáo.
- `cic_code`: Mã số CIC.
- `cic_code_box`: Tọa độ Mã số CIC là một list gồm [left, top, right, bottom].
- `cic_code_confidence`: Độ tin cậy Mã số CIC
- `cic_code_id`: Trang đi kèm với Mã số CIC
- `id_card`: Số chứng minh nhân dân
- `id_card_box`: Tọa độ Số chứng minh nhân dân là một list gồm [left, top, right, bottom].
- `id_card_confidence`: Độ tin cậy Số chứng minh nhân dân
- `id_card_id`: Trang đi kèm với Số chứng minh nhân dân
- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom].
- `address_confidence`: Độ tin cậy Địa chỉ
- `address_id`: Trang đi kèm với Địa chỉ
- `credit_score`: Điểm tín dụng
- `credit_score_box`: Tọa độ Điểm tín dụng là một list gồm [left, top, right, bottom].
- `credit_score_confidence`: Độ tin cậy Điểm tín dụng
- `credit_score_id`: Trang đi kèm với Điểm tín dụng
- `credit_rank`: Hạng tín dụng
- `credit_rank_box`: Tọa độ Hạng tín dụng là một list gồm [left, top, right, bottom].
- `credit_rank_confidence`: Độ tin cậy Hạng tín dụng
- `credit_rank_id`: Trang đi kèm với Hạng tín dụng
- `credit_ranking_date`: Ngày chấm điểm
- `credit_ranking_date_box`: Tọa độ Ngày chấm điểm là một list gồm [left, top, right, bottom].
- `credit_ranking_date_confidence`: Độ tin cậy Ngày chấm điểm
- `credit_ranking_date_id`: Trang đi kèm với Ngày chấm điểm
- `debt_sold_to_vamc`: Dư nợ đã bán vamc
- `debt_sold_to_vamc_box`: Tọa độ Dư nợ đã bán vamc là một list gồm [left, top, right, bottom].
- `debt_sold_to_vamc_confidence`: Độ tin cậy Dư nợ đã bán vamc
- `debt_sold_to_vamc_id`: Trang đi kèm với Dư nợ đã bán vamc
- `imgs`: List ảnh dạng base64 chứa thông tin
- `loan_details`: Chi tiết dư nợ vay. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2, json3, json4]`. Trong đó:
  - `json0`: Số thứ tự tổ chức tín dụng
  - `json1`: Mã tổ chức tín dụng
  - `json2`: Tên tổ chức tín dụng
  - `json3`: Loại dư nợ và số tiền
  - `json4`: Tổng cộng VND

`json0`,`json1`,`json2`,`json4` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

`json3` có định dạng:

```json
{
  "value": [
    {
      "debt_name": string, // Tên loại dư nợ
      "debt": string, // Số tiền dư nợ tương ứng với loại dư nợ
    },
    ...
  ],
  "box": [array, ...],  // list vị trí tương ứng với mỗi value
  "score": [float, ...], // list độ tin cậy tương ứng với mỗi value
}
```

- `loan_details_image`: Ảnh base64 của chi tiết dư nợ vay
- `credit_card_info`: Chi tiết thẻ tín dụng và dư nợ thẻ tín dụng. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2, json3]`. Trong đó:
  - `json0`: Tổng hạn mức thẻ tín dụng
  - `json1`: Số tiền phải thanh toán thẻ
  - `json2`: Tổng số tiền chậm thanh toán thẻ
  - `json3`: Số lượng thẻ tín dụng

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `credit_card_info_image`: Ảnh base64 của thông tin thẻ tín dụng và dư nợ thẻ tín dụng
- `outstanding_loans`: Diễn biến dư nợ 12 tháng gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0`: Dư nợ vay
  - `json1`: Dư nợ thẻ
  - `json2`: Tổng dư nợ

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `outstanding_loans_image`: Ảnh base64 của diễn biến dư nợ 12 tháng gần nhất
- `bad_debt`: Lịch sử nợ xấu tín dụng trong 5 năm gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0`: Ngày phát sinh cuối cùng
  - `json1`: Nhóm nợ
  - `json2`: Số tiền VND
  - `json3`: Số thứ tự
  - `json4`: Tên tổ chức/chi nhánh tổ chức tín dụng

`json0`,`json1`,`json2`,`json3`,`json4` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `bad_debt_image`: Ảnh base64 tương ứng với lịch sử nợ xấu tín dụng trong 5 năm gần nhất
- `late_payments`: Lịch sử chậm thanh toán thẻ tín dụng trong 3 năm gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0`: Khách hàng có chậm thanh toán thẻ (Y/N)
  - `json1`: Số ngày chậm thanh toán thẻ lớn nhất
  - `json2`: Số lần chậm thanh toán thẻ

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `late_payments_image`: Ảnh base64 tương ứng với lịch sử chậm thanh toán thẻ tín dụng trong 3 năm gần nhất
- `loan_guarantee`: Thông tin về đảm bảo tiền vay. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1]`. Trong đó:
  - `json0`: Số lượng tài sản bảo đảm
  - `json1`: Số TCTD có tài sản bảo đảm

`json0`,`json1` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `loan_guarantee_image`: Ảnh base64 tương ứng với thông tin về đảm bảo tiền vay
- `credit_contract`: Thông tin về hợp đồng tín dụng. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1]`. Trong đó:
  - `json0`: Ngày ký hợp đồng
  - `json1`: Ngày kết thúc hợp đồng

`json0`,`json1` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `credit_contract_image`: Ảnh base64 tương ứng với thông tin về hợp đồng tín dụng
- `customers_look_up`: Danh sách TCTD tra cứu về khách hàng trong 1 năm gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0`: Mã TCTD
  - `json1`: Sản phẩm tra cứu
  - `json2`: Ngày tra cứu

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `customers_look_up_image`: Ảnh base64 tương ứng với danh sách TCTD tra cứu về khách hàng trong 1 năm gần nhất

### Giấy chứng nhận quyền sử dụng đất

#### 1. Trích xuất thông tin Giấy chứng nhận quyền sử dụng đất với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate` |

**Params**:

| Key           | Value                           | Mô tả                                                              |
| ------------- | ------------------------------- | ------------------------------------------------------------------ |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                               |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`        |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Giấy chứng nhận quyền sử dụng đất đã được căn chỉnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Giấy chứng nhận quyền sử dụng đất với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                       | content-type          |
| ------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                              |
| ------------- | -------------- | ------------------------------------------------------------------ |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`        |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy chứng nhận quyền sử dụng đất đã được căn chỉnh |

**Body**:

| Key   | Type | Value         | Mô tả                                                   |
| ----- | ---- | ------------- | ------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Giấy chứng nhận quyền sử dụng đất |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Giấy chứng nhận quyền sử dụng đất với đầu vào json

**API**:

| Method | URL                                                                       | content-type       |
| ------ | ------------------------------------------------------------------------- | ------------------ |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                              |
| ------------- | -------------- | ------------------------------------------------------------------ |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`        |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy chứng nhận quyền sử dụng đất đã được căn chỉnh |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": {
    "info": [xxxx],
    "type": string, // loại của giấy chứng nhận
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Loại 1:

`type`: `giay_cnqshdd_mau_1`. Giấy chứng nhận quyền sử dụng đất quyền sở hữu nhà ở và tài sản khác gắn liền với đất.

`info`: Bao gồm các thông tin sau:

- `so_so`: Số sổ của giấy chứng nhận
- `noi_cap`: Nơi cấp của giấy chứng nhận
- `ngay_cap`: Ngày cấp của giấy chứng nhận
- `so_vao_so`: Số vào sổ cấp GCN
- `thong_tin_thua_dat`: Thông tin của thửa đất
- `thong_tin_nha_o`: Thông tin của nhà ở
- `thong_tin_ghi_chu`: Thông tin ghi chú
- `list_img`: Danh sách ảnh trả về dạng base64
- `noi_dung_chu_dat`: Nội dung của chủ đất. Là một list, mỗi phần tử trong list gồm các thông tin sau:
  - `ten`: Họ tên của chủ đất
  - `nam_sinh`: Năm sinh của chủ đất
  - `so_cmt`: Số cmnd, hộ chiếu của chủ đất
  - `dia_chi`: Địa chỉ thường trú của chủ đất

Loại 2:

`type`: `giay_cnqshdd_mau_2`. Giấy chứng nhận quyền sử dụng đất.

`info`: Bao gồm các thông tin sau:

- `so_so`: Số sổ của giấy chứng nhận
- `noi_cap`: Nơi cấp của giấy chứng nhận
- `ngay_cap`: Ngày cấp của giấy chứng nhận
- `so_vao_so`: Số vào sổ cấp GCN
- `dia_chi_thua_dat`: Địa chỉ của thửa đất
- `thong_tin_thua_dat`: Thông tin của thửa đất
- `list_img`: Danh sách ảnh trả về dạng base64
- `noi_dung_chu_dat`: Nội dung của chủ đất. Là một list, mỗi phần tử trong list gồm các thông tin sau:
  - `ten`: Họ tên của chủ đất
  - `nam_sinh`: Năm sinh của chủ đất
  - `so_cmt`: Số cmnd, hộ chiếu của chủ đất
  - `dia_chi`: Địa chỉ thường trú của chủ đất

Loại 3:

`type`: `giay_cnqshdd_mau_3`. Giấy chứng nhận quyền sở hữu nhà ở và quyền sử dụng đất ở.

`info`: Bao gồm các thông tin sau:

- `so_so`: Số sổ của giấy chứng nhận
- `noi_cap`: Nơi cấp của giấy chứng nhận
- `ngay_cap`: Ngày cấp của giấy chứng nhận
- `so_vao_so`: Số vào sổ cấp GCN
- `thong_tin_thua_dat`: Thông tin của thửa đất
- `list_img`: Danh sách ảnh trả về dạng base64
- `noi_dung_chu_dat`: Nội dung của chủ đất. Là một list, mỗi phần tử trong list gồm các thông tin sau:
  - `ten`: Họ tên của chủ đất
  - `nam_sinh`: Năm sinh của chủ đất
  - `so_cmt`: Số cmnd, hộ chiếu của chủ đất
  - `dia_chi`: Địa chỉ thường trú của chủ đất

_Lưu ý_: Các trường thông tin (trừ trường `list_img` và `noi_dung_chu_dat`) sẽ có thêm trường `_box`, `_confidence`, `_id` đi kèm. Trong đó:

- `_id`: thông tin được lấy thuộc trang thứ bao nhiêu trong list ảnh của trường `list_img`, index bắt đầu từ 0.
- `_box`: tọa độ đi kèm [left, top, right, bottom].
- `_confidence`: độ tin cậy đi kèm.

### Giấy tờ xe

#### 1. Trích xuất thông tin Giấy tờ xe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                      |
| ------ | -------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Giấy tờ xe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                      | content-type          |
| ------ | -------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                            |
| ----- | ---- | ------------- | -------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Giấy tờ xe |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Giấy tờ xe với đầu vào json

**API**:

| Method | URL                                                      | content-type       |
| ------ | -------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Trường `data` là một mảng, mỗi phần tử trong mảng tương ứng với thông tin một trang trong file pdf hoặc một ảnh giấy tờ trích xuất được.

Mỗi phần tử trong mảng sẽ là một JSON với định dạng sau:

```json
{
  "type": string,
  "info": object
}
```

`type`: Loại giấy tờ trong Giấy tờ xe được trích xuất thông tin.

- `vehicle_registration_front`: Mặt trước đăng ký xe.
- `vehicle_registration_back`: Mặt sau đăng ký xe.
- `picertificate`: Đăng kiểm xe.
- `driving_license`: Bằng lái xe.

`info`: Bao gồm các thông tin trích xuất được, với mỗi loại giấy tờ thì sẽ có những thông tin trả về khác nhau.

Mặt trước đăng ký xe:

- `name`: tên chủ sở hữu xe.
- `address`: nơi cư trú.
- `id`: id đăng ký xe.
- `plate`: biển số xe.
- `issued_at`: nơi cấp.
- `image`: ảnh mặt trước đăng ký xe.

Mặt sau đăng ký xe:

- `name`: tên chủ sở hữu xe.
- `address`: nơi cư trú.
- `engine`: số máy.
- `chassis`: số khung.
- `brand`: nhãn hiệu.
- `model`: số loại.
- `color`: màu sơn.
- `capacity`: dung tích.
- `issued_at`: nơi đăng ký.
- `last_issue_date`: ngày đăng ký cuối cùng.
- `first_issue_date`: ngày đăng ký đầu tiên.
- `plate`: biển số xe.
- `image`: ảnh mặt sau đăng ký xe.

Đăng kiểm xe:

- `chassis_number`: số khung.
- `commercial_use`: kinh doanh vận tải.
- `design_pay_load`: khối lượng hàng.
- `design_towed_mass`: khối lượng kéo theo.
- `engine_number`: số máy.
- `inside_cargo_container_dimension`: kích thước thùng hàng.
- `issued_on`: đơn vị kiểm định.
- `life_time_limit`: niên hạn sử dụng.
- `manufactured_country`: quốc gia sản xuất.
- `manufactured_year`: năm sản xuất.
- `mark`: nhãn hiệu.
- `model_code`: số loại.
- `modification`: cải tạo.
- `permissible_no`: số người cho phép chở.
- `regis_date`: ngày đăng ký.
- `registration_number`: biển đăng ký.
- `seri`: số sê-ri.
- `tire_size`: cỡ lốp.
- `type`: loại phương tiện.
- `valid_until`: có hiệu lực đến hết ngày.
- `wheel_form`: công thức bánh.
- `capacity`: dung tích.
- `report_number`: số phiếu.
- `design_pay_load`: khối lượng hàng thiết kế.
- `authorized_pay_load`: khối lượng hàng cấp phép.
- `image`: ảnh đã cắt ra và căn chỉnh của đăng kiểm xe.

Bằng lái xe:

- `id`: số thẻ.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `class`: hạng.
- `nationality`: quốc tịch.
- `issue_date`: ngày phát hành.
- `due_date`: ngày hết hạn.
- `address`: nơi cư trú.
- `image`: ảnh đã cắt ra và căn chỉnh của bằng lái xe.

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

### Smart Crop

#### 1. Cắt ảnh thông minh với đầu vào url ảnh

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image` |

**Params**:

| Key      | Value                           | Mô tả                     |
| -------- | ------------------------------- | ------------------------- |
| `url`    | `https://example.com/image.png` | url ảnh cần cắt           |
| `width`  | `400`                           | chiều rộng của ảnh đầu ra |
| `height` | `600`                           | chiều dài của ảnh đầu ra  |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

img_url = 'link_url_img'
width = 400
height = 600

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image?url=%s&width=%s&height=%s"
  % (img_url, width, height),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 2. Cắt ảnh thông minh với đầu vào file ảnh

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image` | `multipart/form-data` |

**Params**:

| Key      | Value | Mô tả                     |
| -------- | ----- | ------------------------- |
| `width`  | `400` | chiều rộng của ảnh đầu ra |
| `height` | `600` | chiều dài của ảnh đầu ra  |

**Body**:

| Key   | Type | Value         | Mô tả            |
| ----- | ---- | ------------- | ---------------- |
| `img` | file | `example.jpg` | file ảnh cần cắt |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_path = '/path/to/your/image.jpg'
width = 400
height = 600

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image?width=%s&height=%s"
  % (width, height),
 	auth=(api_key, api_secret),
 	files={'img': open(img_path, 'rb')})

print(response.json())

```

#### 3. Cắt ảnh thông minh tối ưu cho ảnh có một hoặc nhiều người, sử dụng đầu vào url ảnh

**API**:

| Method | URL                                                                |
| ------ | ------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person` |

**Params**:

| Key      | Value                           | Mô tả                     |
| -------- | ------------------------------- | ------------------------- |
| `url`    | `https://example.com/image.png` | url ảnh cần cắt           |
| `width`  | `400`                           | chiều rộng của ảnh đầu ra |
| `height` | `600`                           | chiều dài của ảnh đầu ra  |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

img_url = 'link_url_img'
width = 400
height = 600

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person?url=%s&width=%s&height=%s"
  % (img_url, width, height),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 4. Cắt ảnh thông minh tối ưu cho ảnh có một hoặc nhiều người, sử dụng đầu vào file ảnh

**API**:

| Method | URL                                                                | content-type          |
| ------ | ------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person` | `multipart/form-data` |

**Params**:

| Key      | Value | Mô tả                     |
| -------- | ----- | ------------------------- |
| `width`  | `400` | chiều rộng của ảnh đầu ra |
| `height` | `600` | chiều dài của ảnh đầu ra  |

**Body**:

| Key   | Type | Value         | Mô tả            |
| ----- | ---- | ------------- | ---------------- |
| `img` | file | `example.jpg` | file ảnh cần cắt |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_path = '/path/to/your/image.jpg'
width = 400
height = 600

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person?width=%s&height=%s"
  % (width, height),
 	auth=(api_key, api_secret),
 	files={'img': open(img_path, 'rb')})

print(response.json())

```

#### 5. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "url": [xxxx], // url ảnh kết quả
  "errorCode": int, // mã lỗi
  "errorMessage": string, // thông báo lỗi
  "invalidCode": int, // chỉ dùng cho crop_person, mã thông báo nếu mặt người trong ảnh bị che khuất
  "invalidMessage": string // chỉ dùng cho crop_person, thông báo nếu mặt người trong ảnh bị che khuất
}
```

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                           |
| ------ | ---------------------------------- | ------------------------------- |
| 0      | Success                            | Thành công                      |
| 1      | Incorrect image format             | Ảnh bị lỗi                      |
| 2      | Url is unavailable                 | Link ảnh bị lỗi                 |
| 3      | The photo does not contain content | Ảnh không chứa nội dung         |
| 4      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai |
| 4      | Out of requests                    | Hết số lượng request            |
| 6      | Error when processing the request  | Lỗi khi xử lý request           |

Bảng mã thông báo:

| Mã lỗi | Message                              | Mô tả                            |
| ------ | ------------------------------------ | -------------------------------- |
| 0      | Successful                           | Thành công                       |
| 1      | The photo does not contain face      | Ảnh không chứa khuôn mặt         |
| 2      | Photo contains more than one face    | Ảnh chứa nhiều hơn một khuôn mặt |
| 3      | Wearing sun glasses                  | Đeo kính đen                     |
| 4      | Wearing a hat                        | Đội mũ                           |
| 5      | Wearing a mask                       | Đeo khẩu trang                   |
| 6      | Tilt more than 15 degrees            | Nghiêng quá 15 độ                |
| 7      | Photo taken from picture, screen     | Ảnh chụp từ ảnh, màn hình        |
| 8      | The face in the picture is too small | Mặt trong ảnh quá nhỏ            |

### Đối soát thông tin

Thông tin đối soát có thể được gửi kèm theo parameter `check_sum`, và được áp dụng trên tất cả các API

**Params**:

| Key         | Value             | Mô tả                             |
| ----------- | ----------------- | --------------------------------- |
| `check_sum` | `120EA8A25E5D487` | Trường thông tin dữ liệu đối soát |
