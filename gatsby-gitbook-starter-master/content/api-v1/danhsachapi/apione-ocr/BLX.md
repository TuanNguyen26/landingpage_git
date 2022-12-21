---
title: 'Bằng lái xe'
---

### 1. Trích xuất thông tin bằng lái xe với đầu vào url ảnh

**API**:

| Method | URL                                                                          |
| ------ | ---------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx` |

**Params**:

| Key   | Value                         | Mô tả                                        |
| ----- | ----------------------------- | -------------------------------------------- |
| `url` | `https://example.com/blx.png` | url ảnh bằng lái xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://daotaothanhcong.com/wp-content/uploads/2019/10/bang-lai-xe-b1-co-thoi-han-bao-lau.jpg'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 2. Trích xuất thông tin bằng lái xe với đầu vào file ảnh

**API**:

| Method | URL                                                                          | content-type          |
| ------ | ---------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx` | `multipart/form-data` |

**Body**:

| Key     | Type | Value             | Mô tả                                         |
| ------- | ---- | ----------------- | --------------------------------------------- |
| `image` | file | `example_blx.jpg` | file ảnh bằng lái xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 3. Trích xuất thông tin bằng lái xe với đầu vào json

**API**:

| Method | URL                                                                                | content-type       |
| ------ | ---------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blxbase64` | `application/json` |

**Body**:

```json
{
  "image": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
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
    "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blxbase64",
    auth=(api_key, api_secret),
    json={'image' : encode_cmt})
print(response.json())
```

### 4. Trích xuất line text trong văn bản scan với đầu vào url ảnh.

**API**:

| Method | URL                                                                                      |
| ------ | ---------------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4` |

**Params**:

| Key   | Value                           | Mô tả                |
| ----- | ------------------------------- | -------------------- |
| `url` | `https://example.com/image.png` | url ảnh văn bản scan |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 5. Trích xuất line text trong văn bản scan với đầu vào file ảnh

**API**:

| Method | URL                                                                                      | content-type          |
| ------ | ---------------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4` | `multipart/form-data` |

**Body**:

| Key     | Type | Value         | Mô tả                                |
| ------- | ---- | ------------- | ------------------------------------ |
| `image` | file | `example.jpg` | file ảnh văn bản scan cần trích xuất |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 6. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "type": [xxxx],
  "data": [xxxx],
  "valid": string, // False nếu ảnh đầu vào mờ, che hoặc có dấu hiệu giả mạo, ngược lại True
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

_Chú ý_: Trường hợp trích xuất thông tin bằng lái xe và trích xuất từ file PDF không có trường `valid`.

`type`: Loại giấy tờ tùy thân được trích xuất thông tin, trong trường hợp `get_haimat` sẽ không có trường này.

- cmt: ứng với mặt trước của chứng minh nhân dân.
- tcc: ứng với mặt trước thẻ căn cước công dân.
- matsaucmt: ứng với mặt sau của chứng minh nhân dân.
- matsautcc: ứng với mặt sau của thẻ căn cước.
- blx: ứng với bằng lái xe.
- pdf: ứng với upload file PDF.

`data`: Bao gồm các thông tin được trích xuất từ ảnh đầu vào có giấy tờ tùy thân, với mỗi loại giấy tờ tùy thân thì sẽ có những thông tin trả về khác nhau.

Mặt trước chứng minh nhân dân.

- id: số chứng minh thư.
- name: họ và tên.
- born: ngày sinh.
- country: quê quán.
- address: thường trú

Mặt trước thẻ căn cước công dân.

- id: số thẻ.
- name: họ và tên.
- born: ngày sinh.
- country: quê quán
- sex: giới tính.
- duedate: ngày hết hạn.
- quoctich: quốc tịch.
- dantoc: dân tộc.
- address: thường trú.

Mặt sau chứng minh nhân dân.

- dantoc: dân tộc.
- date: ngày cấp.
- dauvet: dấu vết riêng và dị hình.
- tongiao: tôn giáo.
- noicap: nơi cấp

Mặt sau thẻ căn cước công dân.

- dauvet: đặc điểm nhận dạng
- date: ngày cấp.

Bằng lái xe.

- id: số thẻ.
- name: họ và tên.
- born: ngày sinh.
- class: hạng.
- nation: quốc tịch.
- dateissue: ngày phát hành.
- duedate: ngày hết hạn.
- address: nơi cư trú.

Trong trường hợp `get_haimat`, `data` sẽ có gồm các thông tin sau:

```json
"data": {
  "mattruoc": [xxxx], // gồm các trường đã nếu ở trên
  "matsau": [xxxx] // gồm các trường đã nêu ở trên
}
```

Trong trường hợp trích xuất thông tin từ file PDF, `data` gồm các thông tin sau:

```json
"data": [
  {
    "type": [xxxx], // loại giấy tờ nhận dạng được, đã nêu ở trên
    "data": [xxxx], // các trường thông tin tương ứng với loại giây tờ
  },
  ...
]
```

Trong trường hợp trích xuất thông tin từ văn bản scan, phản hồi gồm các thông tin sau:

```json
{
  "result": [xxxx], // mảng các line text trong văn bản, nếu không có trả về null
  "time": [xxxx] // thời gian xử lý
}
```

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                |
| ------ | ---------------------------------- | ---------------------------------------------------- |
| 0      | Thành công                         | Trích xuất thông tin thành công                      |
| 1      | Ảnh không chứa nội dung            | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất |
| 2      | Url của ảnh không khả dụng         | Download ảnh bị lỗi khi dùng GET                     |
| 3      | Ảnh sai format                     | Upload ảnh bị lỗi khi dùng POST                      |
| 4      | Hết số lượng request hữu dụng      | Hết số lượng request                                 |
| 5      | Api_key hoặc api_secret không đúng | Khi api_key hoặc api_secret sai                      |

Bảng mã cảnh báo:

| Mã lỗi | Message                                                         | Mô tả                                             |
| ------ | --------------------------------------------------------------- | ------------------------------------------------- |
| 0      | uccessful                                                       | Thành công                                        |
| 1      | Photo contains sign of being taken through an electronic screen | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo          |
| 2      | The picture is a photocopy version of the id card               | Ảnh giấy tờ tùy thân là bản photocopy             |
| 3      | The id field on the document is incorrectly formatted           | Trường id trên giấy tờ tùy thân không đúng format |
| 4      | The mrzcode on the passport is incorrectly formatted            | MRZ code trên passport không đúng format          |
| 5      | The id card's corner has been clipped                           | Giấy tờ tùy thân bị cắt góc                       |
