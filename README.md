# php-web

- Setup backend:
- Required installation packages.

* Installing Intervention Image: composer require intervention/image

- Laravel Sanctum:

* php artisan install:api
* php artisan storage:link

// middleware admin and user
php artisan make:middleware CheckAdmin
php artisan make:middleware CheckUser

- Setup frontend:
- Installing vite: npm create vite@latest -> enter frontend project name -> select React -> select Javascript.
- cd frontend -> npm install -> npm run dev
- extended installation package:
- npm i react-router-dom
- npm install react-hook-form
- npm i react-toastify
- npm install react-bootstrap bootstrap
- npm install -D sass-embedded
- npm i swiper
- npm i react-simple-star-rating
- npm install react-hook-form
- npm i jodit-react

{
"title": "Product name",
"price": 90000,
"compare_price": 100000,
"short_description": "Áo sơ mi nam tay dài cổ bẻ, chất liệu cotton cao cấp, thoáng mát và thấm hút mồ hôi – phù hợp cả đi làm và dạo phố.",
"description": "Mang phong cách lịch lãm nhưng vẫn trẻ trung, chiếc áo sơ mi nam tay dài này được may từ chất liệu cotton 100% cao cấp, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế cổ bẻ truyền thống, phối cùng cúc áo tối giản tạo điểm nhấn tinh tế. Form áo chuẩn, dễ kết hợp với quần jeans, quần tây hoặc vest công sở.

Chất liệu: 100% Cotton thoáng mát

Kiểu dáng: Regular fit, tay dài

Màu sắc: Trắng, Xanh navy, Xám

Size: M – L – XL – XXL

Đây là lựa chọn lý tưởng cho những quý ông yêu thích phong cách đơn giản, tinh tế và dễ ứng dụng trong nhiều dịp khác nhau.",
"image": null,
"category_id": 1,
"brand_id": 1,
"qty": 100
"sku": "SKU-000000",
"barcode": "8931234000047", // 8931234000016, 8931234000023, 8931234000030, 8931234000047, 8931234000054.
"status": 1,
"is_featured": "yes"
}

token login: 2|uUm3FsZ73qAxCbpCp2laEFgPVgUTWO8noPbeYgHt198d111f
barcode: 8934567800000

test API save order: http://localhost:8000/api/frontend/save-order
{
  "name": "AnhTT",
  "email": "att@gmail.com",
  "city": "Ho Chi Minh City",
  "state": "Go Vap",
  "zip": "71400",
  "address": "133 Quang Trung",
  "mobile": "0987457830",
  "grand_total": 100000,
  "discount": 0,
  "sub_total": 99000,
  "shipping": 1000,
  "payment_status": "not paid",
  "status": "pending",
  "cart": [
    {
      "product_id": 2,
      "name": "Áo phong",
      "qty": 1,
      "price": 99000,
      "unit": 99000,
      "size": "M"
    }
  ]
}