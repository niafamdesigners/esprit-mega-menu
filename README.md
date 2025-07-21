# مگامنوی مدرن - Modern Mega Menu

یک مگامنوی مدرن و کاملاً واکنش‌گرا با استفاده از HTML، CSS، و JavaScript خالص.

## ویژگی‌ها

### 🎯 انواع منو
- **منوهای ساده**: برای صفحات اصلی مانند خانه و تماس با ما
- **مگامنوها**: منوهای سه‌ستونه با محتوای غنی برای محصولات و درباره ما
- **منوهای کرکره‌ای**: منوهای کشویی ساده برای خدمات و پشتیبانی

### 🎨 طراحی و انیمیشن
- طراحی مدرن با گرادیان زیبا
- انیمیشن‌های نرم و حرفه‌ای
- افکت‌های hover جذاب
- طراحی کاملاً واکنش‌گرا (Responsive)

### 🔧 فناوری
- **HTML5**: ساختار معنایی و قابل دسترس
- **CSS3**: استایل‌دهی مدرن با Grid و Flexbox
- **JavaScript ES6+**: تعامل‌های پیشرفته و کنترل منو
- **BEM Methodology**: نام‌گذاری کلاس‌ها با پیشوند `esprit`

### ♿ قابلیت دسترسی
- پشتیبانی کامل از کیبورد
- ARIA attributes برای screen readers
- کنتراست مناسب رنگ‌ها
- فوکوس مدیریت شده

## ساختار فایل‌ها

```
ModernMegaMenu/
├── index.html          # ساختار HTML اصلی
├── styles.css          # استایل‌های CSS
├── script.js           # منطق JavaScript
└── README.md           # مستندات پروژه
```

## نحوه استفاده

### نصب
فقط فایل‌ها را در یک پوشه قرار دهید و `index.html` را در مرورگر باز کنید.

### سفارشی‌سازی

#### اضافه کردن منوی جدید
```html
<!-- منوی ساده -->
<li class="esprit-menu__item">
    <a href="#" class="esprit-menu__link">منوی جدید</a>
</li>

<!-- مگامنو -->
<li class="esprit-menu__item esprit-menu__item--has-mega">
    <a href="#" class="esprit-menu__link">
        مگامنوی جدید
        <span class="esprit-menu__arrow"></span>
    </a>
    <div class="esprit-mega-menu">
        <!-- محتوای مگامنو -->
    </div>
</li>

<!-- منوی کرکره‌ای -->
<li class="esprit-menu__item esprit-menu__item--has-dropdown">
    <a href="#" class="esprit-menu__link">
        منوی کرکره‌ای
        <span class="esprit-menu__arrow"></span>
    </a>
    <ul class="esprit-dropdown">
        <!-- آیتم‌های منو -->
    </ul>
</li>
```

#### تغییر رنگ‌ها
رنگ‌های اصلی در CSS:
```css
/* رنگ اصلی */
--primary-color: #667eea;
--secondary-color: #764ba2;
--accent-color: #ffd700;
```

## کلاس‌های BEM

تمام کلاس‌ها از پیشوند `esprit` و متدولوژی BEM استفاده می‌کنند:

### بلوک‌های اصلی
- `esprit-nav`: ناوبری اصلی
- `esprit-menu`: منوی اصلی
- `esprit-mega-menu`: مگامنو
- `esprit-dropdown`: منوی کرکره‌ای

### المنت‌ها
- `esprit-menu__item`: آیتم منو
- `esprit-menu__link`: لینک منو
- `esprit-menu__arrow`: فلش منو
- `esprit-mega-menu__column`: ستون مگامنو
- `esprit-mega-menu__title`: عنوان ستون
- `esprit-dropdown__item`: آیتم کرکره‌ای

### مدیفایرها
- `esprit-menu__item--has-mega`: آیتم دارای مگامنو
- `esprit-menu__item--has-dropdown`: آیتم دارای منوی کرکره‌ای
- `esprit-menu__item--active`: آیتم فعال
- `esprit-menu--active`: منوی موبایل فعال

## مرورگرهای پشتیبانی شده

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- موبایل: iOS Safari 12+, Chrome Mobile 60+

## انیمیشن‌ها

### مگامنو
- ورود: `fadeInUp` با تاخیر متوالی برای ستون‌ها
- خروج: `translateY` و `opacity`

### منوی کرکره‌ای
- ورود: `slideInRight` با تاخیر متوالی
- خروج: `scale` و `opacity`

### موبایل
- منوی همبرگری: انیمیشن تبدیل به X
- منوی موبایل: `translateY` از بالا

## بهینه‌سازی عملکرد

- استفاده از `transform` و `opacity` برای انیمیشن‌ها
- مدیریت بهینه رویدادها
- تنظیمات CSS برای GPU acceleration
- کد JavaScript بهینه شده

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## نویسنده

ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایرانی
