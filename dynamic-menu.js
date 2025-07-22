/**
 * Dynamic Menu Generator for Esprit Mega Menu
 * Generates menu structure from JSON data
 */

class EspritDynamicMenu {
  constructor(containerSelector = ".esprit-nav__container") {
    this.container = document.querySelector(containerSelector);
    this.menuData = null;
    this.generatedMenu = null;
  }

  /**
   * Load menu data from JSON
   * @param {Object|string} data - JSON object or URL to JSON file
   */
  async loadMenuData(data) {
    try {
      if (typeof data === "string") {
        // If data is a URL, fetch it
        const response = await fetch(data);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.menuData = await response.json();
      } else {
        // If data is an object, use it directly
        this.menuData = data;
      }

      console.log("✅ داده‌های منو بارگذاری شد:", this.menuData);
      return this.menuData;
    } catch (error) {
      console.error("❌ خطا در بارگذاری داده‌های منو:", error);
      throw error;
    }
  }

  /**
   * Generate menu HTML from loaded data
   */
  generateMenu() {
    if (!this.menuData || !this.menuData.menuData) {
      throw new Error("داده‌های منو بارگذاری نشده است");
    }

    const { logo, items } = this.menuData.menuData;

    // Clear existing content
    this.container.innerHTML = "";

    // Generate menu items
    const menuHTML = this.generateMenuItems(items);

    // Generate mobile toggle
    const toggleHTML = this.generateMobileToggle();

    // Combine all parts
    this.container.innerHTML = `
            ${menuHTML}
            ${toggleHTML}
        `;

    console.log("✅ منو با موفقیت تولید شد");

    // Re-initialize menu functionality
    this.initializeMenu();

    return this.container;
  }

  // تابع generateLogo حذف شد

  /**
   * Generate menu items HTML
   */
  generateMenuItems(items) {
    const menuItemsHTML = items
      .map((item) => this.generateMenuItem(item))
      .join("");

    return `
            <ul class="esprit-menu">
                ${menuItemsHTML}
            </ul>
        `;
  }

  /**
   * Generate single menu item HTML
   */
  generateMenuItem(item) {
    switch (item.type) {
      case "simple":
        return this.generateSimpleItem(item);
      case "mega":
        return this.generateMegaItem(item);
      case "dropdown":
        return this.generateDropdownItem(item);
      default:
        console.warn(`نوع منوی نامشخص: ${item.type}`);
        return this.generateSimpleItem(item);
    }
  }

  /**
   * Generate simple menu item
   */
  generateSimpleItem(item) {
    return `
            <li class="esprit-menu__item" data-menu-id="${item.id}">
                <a href="${item.url}" class="esprit-menu__link">${item.title}</a>
            </li>
        `;
  }

  /**
   * Generate mega menu item
   */
  generateMegaItem(item) {
    const columnsHTML = item.columns
      .map((column) => this.generateMegaColumn(column))
      .join("");

    return `
            <li class="esprit-menu__item esprit-menu__item--has-mega" data-menu-id="${item.id}">
                <a href="${item.url}" class="esprit-menu__link">
                    ${item.title}
                    <span class="esprit-menu__arrow">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </a>
                <div class="esprit-mega-menu">
                    <div class="esprit-mega-menu__container">
                        ${columnsHTML}
                    </div>
                </div>
            </li>
        `;
  }

  /**
   * Generate mega menu column
   */
  generateMegaColumn(column) {
    const itemsHTML = column.items
      .map(
        (item) => `
            <li class="esprit-mega-menu__item">
                <a href="${item.url}" class="esprit-mega-menu__link">${item.title}</a>
            </li>
        `
      )
      .join("");

    return `
            <div class="esprit-mega-menu__column">
                <h3 class="esprit-mega-menu__title">${column.title}</h3>
                <ul class="esprit-mega-menu__list">
                    ${itemsHTML}
                </ul>
            </div>
        `;
  }

  /**
   * Generate dropdown menu item
   */
  generateDropdownItem(item) {
    const itemsHTML = item.items
      .map(
        (subItem) => `
            <li class="esprit-dropdown__item">
                <a href="${subItem.url}" class="esprit-dropdown__link">${subItem.title}</a>
            </li>
        `
      )
      .join("");

    return `
            <li class="esprit-menu__item esprit-menu__item--has-dropdown" data-menu-id="${item.id}">
                <a href="${item.url}" class="esprit-menu__link">
                    ${item.title}
                    <span class="esprit-menu__arrow">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </a>
                <ul class="esprit-dropdown">
                    ${itemsHTML}
                </ul>
            </li>
        `;
  }

  /**
   * Generate mobile toggle button
   */
  generateMobileToggle() {
    return `
            <div class="esprit-nav__toggle">
                <span class="esprit-nav__toggle-line"></span>
                <span class="esprit-nav__toggle-line"></span>
                <span class="esprit-nav__toggle-line"></span>
            </div>
        `;
  }

  /**
   * Initialize menu functionality after generation
   */
  initializeMenu() {
    console.log("🔄 Dynamic Menu: Initializing menu functionality...");

    // Wait for DOM to be ready, then initialize
    setTimeout(() => {
      console.log("🔍 Dynamic Menu: Checking for EspritMegaMenu class...");
      console.log("  - typeof EspritMegaMenu:", typeof EspritMegaMenu);
      console.log("  - window.EspritMegaMenu:", typeof window.EspritMegaMenu);

      // Re-initialize the main menu class
      if (typeof EspritMegaMenu !== "undefined" || window.EspritMegaMenu) {
        console.log(
          "✅ Dynamic Menu: EspritMegaMenu class found, creating NEW instance..."
        );

        // Destroy existing instance if it exists
        if (window.espritMenu) {
          console.log("🗑️ Dynamic Menu: Destroying existing menu instance...");
          window.espritMenu = null;
        }

        // Use global EspritMegaMenu class
        const MenuClass = window.EspritMegaMenu || EspritMegaMenu;
        this.generatedMenu = new MenuClass();

        // Replace the global instance
        window.espritMenu = this.generatedMenu;
        window.dynamicEspritMenu = this.generatedMenu;
        console.log(
          "🌍 Dynamic Menu: New instance attached to window.espritMenu and window.dynamicEspritMenu"
        );

        // Test elements after initialization
        console.log("🔍 Dynamic Menu: Testing elements after initialization:");
        console.log("  - nav:", this.generatedMenu.nav ? "✅" : "❌");
        console.log("  - menu:", this.generatedMenu.menu ? "✅" : "❌");
        console.log(
          "  - menuToggle:",
          this.generatedMenu.menuToggle ? "✅" : "❌"
        );
        console.log("  - menuItems:", this.generatedMenu.menuItems.length);

        // Force mobile menu to be closed after initialization
        setTimeout(() => {
          if (this.generatedMenu && this.generatedMenu.ensureMobileMenuClosed) {
            console.log("🔒 Dynamic Menu: Ensuring mobile menu is closed...");
            this.generatedMenu.ensureMobileMenuClosed();
          }

          // Test hamburger button for dynamic menu
          const toggle = document.querySelector(".esprit-nav__toggle");
          console.log("🔍 Dynamic Menu: Final hamburger button test:");
          console.log("  - Element found:", toggle ? "✅" : "❌");
          if (toggle) {
            console.log("  - Element classes:", toggle.className);
            console.log(
              "  - Has event listeners:",
              toggle._eventListeners ? "Yes" : "Unknown"
            );
            console.log(
              "✅ Dynamic Menu: Hamburger button is ready for user interaction"
            );

            // DO NOT auto-click - let user click manually
            // toggle.click(); // REMOVED: This was causing auto-open
          }
        }, 100);
      } else {
        console.error("❌ Dynamic Menu: EspritMegaMenu class not found!");
        console.log(
          "  - Available window properties:",
          Object.keys(window).filter((k) => k.includes("Esprit"))
        );
      }

      // Ensure mobile overlay exists for push/slide functionality
      this.ensureMobileOverlay();
      console.log("✅ Dynamic Menu: Initialization complete");
    }, 100); // Increased delay to ensure scripts are loaded
  }

  /**
   * Ensure mobile overlay exists for push/slide menu
   */
  ensureMobileOverlay() {
    if (!document.querySelector(".esprit-menu-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "esprit-menu-overlay";
      document.body.appendChild(overlay);
    }
  }

  // توابع updateMenuItem، addMenuItem و removeMenuItem حذف شدند

  /**
   * Get current menu data
   */
  getMenuData() {
    return this.menuData;
  }
}

// Auto-initialize if DOM is ready
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // Make the class globally available
    window.EspritDynamicMenu = EspritDynamicMenu;
    console.log("🎯 کلاس تولید منوی پویا آماده است");
  });
}

// Export for Node.js environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = EspritDynamicMenu;
}
