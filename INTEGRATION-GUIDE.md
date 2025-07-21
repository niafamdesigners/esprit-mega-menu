# راهنمای ادغام منوی پویا با نرم‌افزار

## 📋 فهرست مطالب
1. [معرفی](#معرفی)
2. [ساختار JSON](#ساختار-json)
3. [نحوه ادغام](#نحوه-ادغام)
4. [API مدیریت منو](#api-مدیریت-منو)
5. [نمونه کدها](#نمونه-کدها)
6. [بهترین روش‌ها](#بهترین-روشها)

## معرفی

این سیستم امکان تولید منوی مگا به صورت پویا از داده‌های JSON را فراهم می‌کند. شما می‌توانید در نرم‌افزارتان فیلدهایی برای مدیریت منو ایجاد کنید و سپس داده‌ها را به صورت JSON صادر کرده و در کلاینت استفاده کنید.

## ساختار JSON

### ساختار کلی
```json
{
  "menuData": {
    "logo": {
      "text": "نام لوگو",
      "url": "آدرس لینک لوگو"
    },
    "items": [
      // آرایه‌ای از آیتم‌های منو
    ]
  }
}
```

### انواع آیتم‌های منو

#### 1. منوی ساده (Simple)
```json
{
  "id": "home",
  "title": "خانه",
  "url": "#home",
  "type": "simple"
}
```

#### 2. مگامنو (Mega Menu)
```json
{
  "id": "products",
  "title": "محصولات",
  "url": "#products",
  "type": "mega",
  "columns": [
    {
      "title": "عنوان ستون",
      "items": [
        {
          "title": "نام آیتم",
          "url": "#link"
        }
      ]
    }
  ]
}
```

#### 3. منوی کرکره‌ای (Dropdown)
```json
{
  "id": "services",
  "title": "خدمات",
  "url": "#services",
  "type": "dropdown",
  "items": [
    {
      "title": "نام زیرمنو",
      "url": "#submenu"
    }
  ]
}
```

## نحوه ادغام

### مرحله 1: اضافه کردن فایل‌ها به پروژه

```html
<!-- CSS -->
<link rel="stylesheet" href="path/to/styles.css">

<!-- JavaScript -->
<script src="path/to/script.js"></script>
<script src="path/to/dynamic-menu.js"></script>
```

### مرحله 2: ایجاد ساختار HTML

```html
<header class="esprit-header">
    <nav class="esprit-nav">
        <div class="esprit-nav__container">
            <!-- منو اینجا تولید می‌شود -->
        </div>
    </nav>
</header>
```

### مرحله 3: مقداردهی اولیه

```javascript
// ایجاد نمونه منوی پویا
const dynamicMenu = new EspritDynamicMenu();

// بارگذاری داده‌ها و تولید منو
async function initializeMenu() {
    try {
        // از سرور یا API داده‌ها را دریافت کنید
        const menuData = await fetchMenuDataFromServer();
        
        // بارگذاری داده‌ها
        await dynamicMenu.loadMenuData(menuData);
        
        // تولید منو
        dynamicMenu.generateMenu();
        
        console.log('منو با موفقیت بارگذاری شد');
    } catch (error) {
        console.error('خطا در بارگذاری منو:', error);
    }
}

// اجرای مقداردهی اولیه
document.addEventListener('DOMContentLoaded', initializeMenu);
```

## API مدیریت منو

### کلاس EspritDynamicMenu

#### متدهای اصلی

```javascript
// بارگذاری داده‌ها
await dynamicMenu.loadMenuData(jsonData);

// تولید منو
dynamicMenu.generateMenu();

// به‌روزرسانی آیتم منو
dynamicMenu.updateMenuItem('item-id', newData);

// اضافه کردن آیتم جدید
dynamicMenu.addMenuItem(newItem, position);

// حذف آیتم منو
dynamicMenu.removeMenuItem('item-id');

// دریافت داده‌های فعلی
const currentData = dynamicMenu.getMenuData();

// صادرات JSON
const jsonString = dynamicMenu.exportMenuData();

// اعتبارسنجی داده‌ها
const errors = dynamicMenu.validateMenuData(data);
```

## نمونه کدها

### 1. بارگذاری از API

```javascript
async function loadMenuFromAPI() {
    try {
        const response = await fetch('/api/menu-data');
        const menuData = await response.json();
        
        await dynamicMenu.loadMenuData(menuData);
        dynamicMenu.generateMenu();
    } catch (error) {
        console.error('خطا در بارگذاری از API:', error);
    }
}
```

### 2. به‌روزرسانی منو در زمان اجرا

```javascript
// اضافه کردن آیتم جدید
function addNewMenuItem() {
    const newItem = {
        id: 'new-item',
        title: 'آیتم جدید',
        url: '#new',
        type: 'simple'
    };
    
    dynamicMenu.addMenuItem(newItem);
}

// به‌روزرسانی آیتم موجود
function updateExistingItem() {
    dynamicMenu.updateMenuItem('products', {
        title: 'محصولات جدید',
        url: '#new-products'
    });
}
```

### 3. ذخیره تغییرات در سرور

```javascript
async function saveMenuChanges() {
    try {
        const menuData = dynamicMenu.getMenuData();
        
        const response = await fetch('/api/save-menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuData)
        });
        
        if (response.ok) {
            console.log('تغییرات ذخیره شد');
        }
    } catch (error) {
        console.error('خطا در ذخیره:', error);
    }
}
```

## بهترین روش‌ها

### 1. ساختار پایگاه داده

برای نرم‌افزار خود، جداول زیر را پیشنهاد می‌کنیم:

```sql
-- جدول منوهای اصلی
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_id VARCHAR(50) UNIQUE,
    title VARCHAR(255),
    url VARCHAR(500),
    type ENUM('simple', 'mega', 'dropdown'),
    position INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول ستون‌های مگامنو
CREATE TABLE mega_columns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_item_id INT,
    title VARCHAR(255),
    position INT,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- جدول آیتم‌های زیرمنو
CREATE TABLE submenu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT, -- menu_item_id یا mega_column_id
    parent_type ENUM('menu', 'column'),
    title VARCHAR(255),
    url VARCHAR(500),
    position INT,
    FOREIGN KEY (parent_id) REFERENCES menu_items(id)
);

-- جدول تنظیمات لوگو
CREATE TABLE logo_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
    url VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. API Endpoints

```php
// مثال PHP برای تولید JSON

// GET /api/menu-data
function getMenuData() {
    $logo = getLogo();
    $menuItems = getMenuItems();
    
    $menuData = [
        'menuData' => [
            'logo' => $logo,
            'items' => $menuItems
        ]
    ];
    
    header('Content-Type: application/json');
    echo json_encode($menuData, JSON_UNESCAPED_UNICODE);
}

function getMenuItems() {
    $items = [];
    $menuItems = db_query("SELECT * FROM menu_items WHERE is_active = 1 ORDER BY position");
    
    foreach ($menuItems as $item) {
        $menuItem = [
            'id' => $item['menu_id'],
            'title' => $item['title'],
            'url' => $item['url'],
            'type' => $item['type']
        ];
        
        if ($item['type'] === 'mega') {
            $menuItem['columns'] = getMegaColumns($item['id']);
        } elseif ($item['type'] === 'dropdown') {
            $menuItem['items'] = getDropdownItems($item['id']);
        }
        
        $items[] = $menuItem;
    }
    
    return $items;
}
```

### 3. کش کردن داده‌ها

```javascript
class MenuCache {
    constructor(cacheKey = 'esprit-menu-cache', ttl = 300000) { // 5 minutes
        this.cacheKey = cacheKey;
        this.ttl = ttl;
    }
    
    set(data) {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    }
    
    get() {
        const cached = localStorage.getItem(this.cacheKey);
        if (!cached) return null;
        
        const cacheData = JSON.parse(cached);
        const now = Date.now();
        
        if (now - cacheData.timestamp > this.ttl) {
            this.clear();
            return null;
        }
        
        return cacheData.data;
    }
    
    clear() {
        localStorage.removeItem(this.cacheKey);
    }
}

// استفاده از کش
const menuCache = new MenuCache();

async function loadMenuWithCache() {
    let menuData = menuCache.get();
    
    if (!menuData) {
        menuData = await fetchMenuDataFromServer();
        menuCache.set(menuData);
    }
    
    await dynamicMenu.loadMenuData(menuData);
    dynamicMenu.generateMenu();
}
```

### 4. مدیریت خطاها

```javascript
class MenuErrorHandler {
    static handle(error, context = '') {
        console.error(`خطا در منو ${context}:`, error);
        
        // نمایش پیام خطا به کاربر
        this.showUserError('خطا در بارگذاری منو. لطفاً صفحه را تازه کنید.');
        
        // ارسال خطا به سرور (اختیاری)
        this.reportError(error, context);
    }
    
    static showUserError(message) {
        // نمایش toast یا alert
        const errorDiv = document.createElement('div');
        errorDiv.className = 'menu-error-toast';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    static async reportError(error, context) {
        try {
            await fetch('/api/log-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: error.message,
                    context: context,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (reportError) {
            console.error('خطا در گزارش خطا:', reportError);
        }
    }
}

// استفاده از مدیریت خطا
try {
    await dynamicMenu.loadMenuData(menuData);
    dynamicMenu.generateMenu();
} catch (error) {
    MenuErrorHandler.handle(error, 'loadMenuData');
}
```

## خلاصه

با استفاده از این سیستم، شما می‌توانید:

1. **در نرم‌افزار**: فرم‌هایی برای مدیریت منو ایجاد کنید
2. **در پایگاه داده**: داده‌های منو را ذخیره کنید
3. **در API**: داده‌ها را به صورت JSON صادر کنید
4. **در کلاینت**: منو را به صورت پویا تولید کنید

این روش انعطاف‌پذیری بالایی داشته و امکان مدیریت آسان منو را فراهم می‌کند.
