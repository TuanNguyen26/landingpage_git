---
title: 'Đăng kí xe'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
metaDescription: 'This is the api v1 for this page'
---

#### 1. Trích xuất thông tin hai mặt đăng ký xe với đầu vào url ảnh

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

#### 2. Trích xuất thông tin hai mặt đăng ký xe với đầu vào file ảnh

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

#### 3. Trích xuất thông tin hai mặt đăng ký xe với đầu json

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

#### 4. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào url ảnh

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

#### 5. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào file ảnh

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

#### 6. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào json

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
