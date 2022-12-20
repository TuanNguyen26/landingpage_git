---
title: 'Bảng'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
metaDescription: 'This is the api v1 for this page'
---

#### 1. Trích xuất thông tin dạng bảng với đầu vào url ảnh hoặc pdf

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

#### 2. Trích xuất thông tin dạng bảng với đầu vào file ảnh hoặc file pdf

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

#### 3. Trích xuất thông tin dạng bảng với đầu vào json

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
