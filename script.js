// Modern Mega Menu JavaScript
// Using BEM methodology with 'esprit' prefix

class EspritMegaMenu {
    constructor() {
        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.setupMobileMenu();
    }

    setupElements() {
        console.log('🔧 Setting up menu elements...');
        
        this.nav = document.querySelector('.esprit-nav');
        this.menu = document.querySelector('.esprit-menu');
        this.menuToggle = document.querySelector('.esprit-nav__toggle');
        this.menuItems = document.querySelectorAll('.esprit-menu__item');
        this.megaMenuItems = document.querySelectorAll('.esprit-menu__item--has-mega');
        this.dropdownItems = document.querySelectorAll('.esprit-menu__item--has-dropdown');
        
        // Debug logging
        console.log('📋 Elements found:');
        console.log('  - nav:', this.nav ? '✅' : '❌');
        console.log('  - menu:', this.menu ? '✅' : '❌');
        console.log('  - menuToggle:', this.menuToggle ? '✅' : '❌');
        console.log('  - menuItems:', this.menuItems.length);
        console.log('  - megaMenuItems:', this.megaMenuItems.length);
        console.log('  - dropdownItems:', this.dropdownItems.length);
        
        // Track active states
        this.activeMegaMenu = null;
        this.activeDropdown = null;
        this.isMobileMenuOpen = false;
        
        // Ensure mobile menu is closed by default
        this.ensureMobileMenuClosed();
    }

    bindEvents() {
        // Desktop hover events for mega menus
        this.megaMenuItems.forEach(item => {
            const megaMenu = item.querySelector('.esprit-mega-menu');
            
            item.addEventListener('mouseenter', () => {
                this.showMegaMenu(item, megaMenu);
            });
            
            item.addEventListener('mouseleave', () => {
                this.hideMegaMenu(item, megaMenu);
            });
        });

        // Desktop hover events for dropdown menus
        this.dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.esprit-dropdown');
            
            item.addEventListener('mouseenter', () => {
                this.showDropdown(item, dropdown);
            });
            
            item.addEventListener('mouseleave', () => {
                this.hideDropdown(item, dropdown);
            });
        });

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target)) {
                this.closeAllMenus();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllMenus();
            }
        });

        // Mobile menu toggle
        console.log('🍔 Setting up hamburger menu toggle...');
        if (this.menuToggle) {
            console.log('✅ MenuToggle element found, adding click listener');
            this.menuToggle.addEventListener('click', (e) => {
                console.log('🖱️ Hamburger button clicked!', e);
                console.log('📱 Current mobile menu state:', this.isMobileMenuOpen);
                console.log('📏 Current window width:', window.innerWidth);
                this.toggleMobileMenu();
            });
            
            // Add additional event for debugging
            this.menuToggle.addEventListener('touchstart', (e) => {
                console.log('👆 Hamburger button touched!', e);
            });
        } else {
            console.error('❌ MenuToggle element not found!');
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991.98 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    showMegaMenu(item, megaMenu) {
        if (window.innerWidth <= 991) return; // Skip on mobile
        
        // Close other menus
        this.closeAllMenus();
        
        // Add active class
        item.classList.add('esprit-menu__item--active');
        
        // Store reference
        this.activeMegaMenu = { item, megaMenu };
        
        // Add entrance animation
        this.animateMegaMenuEntrance(megaMenu);
    }

    hideMegaMenu(item, megaMenu) {
        if (window.innerWidth <= 991) return; // Skip on mobile
        
        // Remove active class
        item.classList.remove('esprit-menu__item--active');
        
        // Clear reference
        if (this.activeMegaMenu && this.activeMegaMenu.item === item) {
            this.activeMegaMenu = null;
        }
    }

    showDropdown(item, dropdown) {
        if (window.innerWidth <= 991) return; // Skip on mobile
        
        // Close other menus
        this.closeAllMenus();
        
        // Add active class
        item.classList.add('esprit-menu__item--active');
        
        // Store reference
        this.activeDropdown = { item, dropdown };
        
        // Add entrance animation
        this.animateDropdownEntrance(dropdown);
    }

    hideDropdown(item, dropdown) {
        if (window.innerWidth <= 991) return; // Skip on mobile
        
        // Remove active class
        item.classList.remove('esprit-menu__item--active');
        
        // Clear reference
        if (this.activeDropdown && this.activeDropdown.item === item) {
            this.activeDropdown = null;
        }
    }

    animateMegaMenuEntrance(megaMenu) {
        const columns = megaMenu.querySelectorAll('.esprit-mega-menu__column');
        columns.forEach((column, index) => {
            column.style.animationDelay = `${index * 0.1}s`;
            column.style.animation = 'none';
            // Force reflow
            column.offsetHeight;
            column.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }

    animateDropdownEntrance(dropdown) {
        const items = dropdown.querySelectorAll('.esprit-dropdown__item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${(index + 1) * 0.1}s`;
            item.style.animation = 'none';
            // Force reflow
            item.offsetHeight;
            item.style.animation = 'slideInRight 0.4s ease forwards';
        });
    }

    closeAllMenus() {
        // Close mega menus
        this.megaMenuItems.forEach(item => {
            item.classList.remove('esprit-menu__item--active');
        });
        
        // Close dropdown menus
        this.dropdownItems.forEach(item => {
            item.classList.remove('esprit-menu__item--active');
        });
        
        // Clear references
        this.activeMegaMenu = null;
        this.activeDropdown = null;
    }

    setupMobileMenu() {
        // Create mobile menu overlay
        this.createMobileOverlay();
        
        // Mobile menu click handlers
        this.menuItems.forEach(item => {
            const link = item.querySelector('.esprit-menu__link');
            const hasMega = item.classList.contains('esprit-menu__item--has-mega');
            const hasDropdown = item.classList.contains('esprit-menu__item--has-dropdown');
            
            if ((hasMega || hasDropdown) && link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 991.98) {
                        e.preventDefault();
                        this.openMobileSubmenu(item);
                    }
                });
            }
        });
    }

    toggleMobileMenu() {
        console.log('🔄 toggleMobileMenu called');
        console.log('📱 Current state before toggle:', this.isMobileMenuOpen);
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        console.log('📱 New state after toggle:', this.isMobileMenuOpen);
        
        if (this.isMobileMenuOpen) {
            console.log('📂 Opening mobile menu...');
            this.openMobileMenu();
        } else {
            console.log('📁 Closing mobile menu...');
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        console.log('📂 openMobileMenu called');
        
        if (!this.menu) {
            console.error('❌ Menu element not found!');
            return;
        }
        
        // Add mobile menu header
        this.addMobileMenuHeader();
        
        // Check for any active submenus BEFORE opening main menu
        const activeSubmenus = document.querySelectorAll('.esprit-mega-menu--active, .esprit-dropdown--active');
        if (activeSubmenus.length > 0) {
            console.warn('⚠️ Found active submenus before opening main menu:', activeSubmenus.length);
            activeSubmenus.forEach((submenu, index) => {
                console.log(`  - Active submenu ${index + 1}:`, submenu.className);
            });
        }
        
        console.log('✅ Adding active class to menu');
        this.menu.classList.add('esprit-menu--active');
        
        if (this.menuToggle) {
            console.log('✅ Adding active class to toggle');
            this.menuToggle.classList.add('esprit-nav__toggle--active');
        }
        
        // Show overlay
        const overlay = document.querySelector('.esprit-menu-overlay');
        if (overlay) {
            console.log('✅ Showing overlay');
            overlay.classList.add('esprit-menu-overlay--active');
        } else {
            console.warn('⚠️ Overlay not found');
        }
        
        // Animate toggle lines
        if (this.menuToggle) {
            const lines = this.menuToggle.querySelectorAll('.esprit-nav__toggle-line');
            console.log('🎨 Animating toggle lines:', lines.length);
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
        
        // Prevent body scroll
        console.log('🚫 Preventing body scroll');
        document.body.classList.add('esprit-menu-open');
        
        // Check for any active submenus AFTER opening main menu
        const activeSubmenusAfter = document.querySelectorAll('.esprit-mega-menu--active, .esprit-dropdown--active');
        if (activeSubmenusAfter.length > 0) {
            console.error('🚨 PROBLEM: Found active submenus after opening main menu:', activeSubmenusAfter.length);
            activeSubmenusAfter.forEach((submenu, index) => {
                console.log(`  - Unwanted active submenu ${index + 1}:`, submenu.className);
                console.log(`  - Parent item:`, submenu.closest('.esprit-menu__item')?.className);
            });
        }
        
        console.log('📂 Mobile menu opened successfully');
    }

    addMobileMenuHeader() {
        // Remove existing header if any
        const existingHeader = this.menu.querySelector('.esprit-mobile-menu-header');
        if (existingHeader) {
            existingHeader.remove();
        }
        
        // Create mobile menu header
        const header = document.createElement('div');
        header.className = 'esprit-mobile-menu-header';
        
        // Create title
        const title = document.createElement('h3');
        title.className = 'esprit-mobile-menu-title';
        title.textContent = 'منوی اصلی';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'esprit-mobile-menu-close';
        closeButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        closeButton.setAttribute('aria-label', 'بستن منو');
        
        // Add click event to close button
        closeButton.addEventListener('click', () => {
            this.closeMobileMenu();
        });
        
        // Append elements to header
        header.appendChild(title);
        header.appendChild(closeButton);
        
        // Insert header at the beginning of menu
        this.menu.insertBefore(header, this.menu.firstChild);
        
        console.log('✅ Mobile menu header added');
    }
    
    closeMobileMenu() {
        console.log('📁 closeMobileMenu called');
        
        if (this.menu) {
            console.log('✅ Removing active class from menu');
            this.menu.classList.remove('esprit-menu--active');
        }
        
        if (this.menuToggle) {
            console.log('✅ Removing active class from toggle');
            this.menuToggle.classList.remove('esprit-nav__toggle--active');
        }
        
        this.isMobileMenuOpen = false;
        
        // Hide overlay
        const overlay = document.querySelector('.esprit-menu-overlay');
        if (overlay) {
            console.log('✅ Hiding overlay');
            overlay.classList.remove('esprit-menu-overlay--active');
        }
        
        // Reset toggle lines
        if (this.menuToggle) {
            const lines = this.menuToggle.querySelectorAll('.esprit-nav__toggle-line');
            console.log('🎨 Resetting toggle lines:', lines.length);
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
        
        // Remove mobile menu header
        const header = this.menu.querySelector('.esprit-mobile-menu-header');
        if (header) {
            header.remove();
            console.log('✅ Mobile menu header removed');
        }
        
        // Allow body scroll
        console.log('✅ Allowing body scroll');
        document.body.classList.remove('esprit-menu-open');
        
        console.log('📁 Mobile menu closed successfully');
    }

    openMobileSubmenu(item) {
        console.log('📱 Opening mobile submenu for item:', item);
        
        const hasMega = item.classList.contains('esprit-menu__item--has-mega');
        const hasDropdown = item.classList.contains('esprit-menu__item--has-dropdown');
        const title = item.querySelector('.esprit-menu__link').textContent.trim();
        
        console.log('🔍 Submenu analysis:');
        console.log('  - hasMega:', hasMega);
        console.log('  - hasDropdown:', hasDropdown);
        console.log('  - title:', title);
        console.log('  - item classes:', item.className);
        
        let submenu;
        if (hasMega) {
            submenu = item.querySelector('.esprit-mega-menu');
            console.log('🔍 Looking for mega menu:', submenu ? '✅ Found' : '❌ Not found');
        } else if (hasDropdown) {
            submenu = item.querySelector('.esprit-dropdown');
            console.log('🔍 Looking for dropdown:', submenu ? '✅ Found' : '❌ Not found');
        }
        
        if (submenu) {
            // Close any previously open submenu first
            if (this.activeSubmenu) {
                this.closeMobileSubmenu();
            }
            
            // Get the document direction
            const isRtl = document.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl';
            console.log('  - Document direction:', isRtl ? 'RTL' : 'LTR');
            
            console.log('✅ Submenu found, proceeding with opening...');
            console.log('  - submenu element:', submenu);
            console.log('  - submenu classes before:', submenu.className);
            
            // Reset any previous transforms and ensure horizontal direction
            if (isRtl) {
                submenu.style.transform = 'translateX(-100%) translateY(0)';
            } else {
                submenu.style.transform = 'translateX(100%) translateY(0)';
            }
            
            // Make sure submenu is ready for animation
            submenu.style.visibility = 'visible';
            submenu.style.display = 'block';
            submenu.style.transformOrigin = 'center center';
            
            // Add header with back button
            this.addSubmenuHeader(submenu, title);
            
            // Prepare for sheet-like slide-in animation
            const activeClass = hasMega ? 'esprit-mega-menu--active' : 'esprit-dropdown--active';
            console.log('🎨 Adding active class:', activeClass);
            
            // Start slide-in animation
            requestAnimationFrame(() => {
                submenu.classList.add(activeClass);
                submenu.style.opacity = '1';
                // Force horizontal transform before animation
                submenu.style.transform = 'translateX(0) translateY(0)';
                // Add animation class
                submenu.classList.add('esprit-submenu--sliding-in');
            });
            
            console.log('  - submenu classes after:', submenu.className);
            console.log('  - submenu computed style:', {
                display: getComputedStyle(submenu).display,
                visibility: getComputedStyle(submenu).visibility,
                opacity: getComputedStyle(submenu).opacity,
                transform: getComputedStyle(submenu).transform,
                left: getComputedStyle(submenu).left,
                right: getComputedStyle(submenu).right
            });
            
            // Store reference for back navigation
            this.activeSubmenu = { element: submenu, type: hasMega ? 'mega' : 'dropdown' };
            
            // Remove animation class after animation completes (match CSS duration)
            setTimeout(() => {
                submenu.classList.remove('esprit-submenu--sliding-in');
                console.log('✅ Mobile submenu opened successfully');
            }, 350); // Match CSS slide-in duration
        } else {
            console.error('❌ No submenu found for item:', item);
            console.log('  - Available child elements:', Array.from(item.children).map(child => child.className));
        }
    }

    createMobileOverlay() {
        // Check if overlay already exists
        if (document.querySelector('.esprit-menu-overlay')) {
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'esprit-menu-overlay';
        
        // Close menu when overlay is clicked
        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });
        
        document.body.appendChild(overlay);
    }
    
    addSubmenuHeader(submenu, title) {
        // Create header with back button if it doesn't exist
        if (!submenu.querySelector('.esprit-submenu-header')) {
            const header = document.createElement('div');
            header.className = 'esprit-submenu-header';
            
            const backBtn = document.createElement('button');
            backBtn.className = 'esprit-submenu-back';
            backBtn.setAttribute('aria-label', 'بازگشت');
            
            const titleElem = document.createElement('div');
            titleElem.className = 'esprit-submenu-title';
            titleElem.textContent = title;
            
            header.appendChild(backBtn);
            header.appendChild(titleElem);
            
            // Add header at the top of submenu
            submenu.prepend(header);
            
            // Add event listener to back button with enhanced animation
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Add a subtle animation to back button when clicked
                backBtn.classList.add('esprit-submenu-back--active');
                // Call close after a tiny delay for better UX
                setTimeout(() => this.closeMobileSubmenu(), 50);
            });
        }
    }
    
    closeMobileSubmenu() {
        console.log('🔙 Closing mobile submenu...');
        
        if (this.activeSubmenu) {
            const { element, type } = this.activeSubmenu;
            console.log('  - Submenu type:', type);
            console.log('  - Element classes before:', element.className);
            
            // Get the document direction
            const isRtl = document.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl';
            console.log('  - Document direction:', isRtl ? 'RTL' : 'LTR');
            
            // Add closing animation class
            element.classList.add('esprit-submenu--sliding-out');
            
            // Trigger slide-out animation
            requestAnimationFrame(() => {
                // Remove active class with smooth transition
                const activeClass = type === 'mega' ? 'esprit-mega-menu--active' : 'esprit-dropdown--active';
                element.classList.remove(activeClass);
                
                console.log('  - Removed active class:', activeClass);
                console.log('  - Element classes after:', element.className);
                console.log('  - Added sliding-out animation');
            });
            
            // Check element state immediately after removing class
            setTimeout(() => {
                console.log('  - Element state during animation:');
                console.log('    - Classes:', element.className);
                console.log('    - Computed styles:', {
                    display: getComputedStyle(element).display,
                    visibility: getComputedStyle(element).visibility,
                    opacity: getComputedStyle(element).opacity,
                    transform: getComputedStyle(element).transform,
                    left: getComputedStyle(element).left,
                    right: getComputedStyle(element).right
                });
            }, 50);
            
            // Wait for transition to complete before cleaning up
            setTimeout(() => {
                // Remove animation class
                element.classList.remove('esprit-submenu--sliding-out');
                
                // Remove header
                const header = element.querySelector('.esprit-submenu-header');
                if (header) {
                    console.log('  - Removing header after transition');
                    header.remove();
                }
                
                // Ensure it's completely hidden and force horizontal transform
                element.style.visibility = 'hidden';
                element.style.opacity = '0';
                
                // Ensure direction is horizontal based on RTL/LTR
                if (isRtl) {
                    element.style.transform = 'translateX(-100%) translateY(0)';
                } else {
                    element.style.transform = 'translateX(100%) translateY(0)';
                }
                
                // Reset any vertical transforms that might be applied
                element.style.transformOrigin = 'center center';
                
                // Final check after transition
                console.log('  - Final element state:');
                console.log('    - Classes:', element.className);
                console.log('    - Computed styles:', {
                    display: getComputedStyle(element).display,
                    visibility: getComputedStyle(element).visibility,
                    opacity: getComputedStyle(element).opacity,
                    transform: getComputedStyle(element).transform,
                    left: getComputedStyle(element).left,
                    right: getComputedStyle(element).right
                });
            }, 300); // Match CSS slide-out duration
            
            this.activeSubmenu = null;
            console.log('✅ Mobile submenu closed');
        } else {
            console.warn('⚠️ No active submenu to close');
        }
    }
    
    closeAllMobileSubmenus() {
        // Close any active submenu
        this.closeMobileSubmenu();
        
        // Remove all active classes
        const activeSubmenus = document.querySelectorAll('.esprit-mega-menu--active, .esprit-dropdown--active');
        activeSubmenus.forEach(submenu => {
            submenu.classList.remove('esprit-mega-menu--active', 'esprit-dropdown--active');
            
            // Remove header
            const header = submenu.querySelector('.esprit-submenu-header');
            if (header) {
                header.remove();
            }
        });
    }
    
    ensureMobileMenuClosed() {
        console.log('🔒 Ensuring mobile menu is completely closed...');
        
        if (this.menu) {
            this.menu.classList.remove('esprit-menu--active');
            console.log('  - Removed esprit-menu--active class');
        }
        
        if (this.menuToggle) {
            this.menuToggle.classList.remove('esprit-nav__toggle--active');
            
            // Reset toggle lines
            const lines = this.menuToggle.querySelectorAll('.esprit-nav__toggle-line');
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
            console.log('  - Reset hamburger button state');
        }
        
        // Hide overlay
        const overlay = document.querySelector('.esprit-menu-overlay');
        if (overlay) {
            overlay.classList.remove('esprit-menu-overlay--active');
            console.log('  - Hidden overlay');
        }
        
        // Restore body scroll
        document.body.classList.remove('esprit-menu-open');
        console.log('  - Restored body scroll');
        
        // Close all mobile submenus
        this.closeAllMobileSubmenus();
        
        // Force close any active submenus that might be stuck
        const allMegaMenus = document.querySelectorAll('.esprit-mega-menu');
        const allDropdowns = document.querySelectorAll('.esprit-dropdown');
        
        allMegaMenus.forEach(menu => {
            menu.classList.remove('esprit-mega-menu--active');
            // Remove any headers that might have been added
            const header = menu.querySelector('.esprit-submenu-header');
            if (header) {
                header.remove();
            }
        });
        
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('esprit-dropdown--active');
            // Remove any headers that might have been added
            const header = dropdown.querySelector('.esprit-submenu-header');
            if (header) {
                header.remove();
            }
        });
        
        console.log('  - Force closed all submenus:', {
            megaMenus: allMegaMenus.length,
            dropdowns: allDropdowns.length
        });
        
        // Reset mobile menu state
        this.isMobileMenuOpen = false;
        this.activeSubmenu = null;
        
        console.log('✅ Mobile menu closure complete');
    }
    
    fixSubmenuLinks(submenu) {
        // Fix mega menu links
        const megaLinks = submenu.querySelectorAll('.esprit-mega-menu__link');
        megaLinks.forEach(link => {
            // Remove any existing event listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add proper click handling
            newLink.addEventListener('click', (e) => {
                // Allow default link behavior
                if (newLink.getAttribute('href') && newLink.getAttribute('href') !== '#') {
                    // Close mobile menu when navigating
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 100);
                }
            });
            
            // Add touch handling for better mobile experience
            newLink.addEventListener('touchstart', (e) => {
                newLink.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            newLink.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    newLink.style.backgroundColor = '';
                }, 150);
            });
        });
        
        // Fix dropdown links
        const dropdownLinks = submenu.querySelectorAll('.esprit-dropdown__link');
        dropdownLinks.forEach(link => {
            // Remove any existing event listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add proper click handling
            newLink.addEventListener('click', (e) => {
                // Allow default link behavior
                if (newLink.getAttribute('href') && newLink.getAttribute('href') !== '#') {
                    // Close mobile menu when navigating
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 100);
                }
            });
            
            // Add touch handling for better mobile experience
            newLink.addEventListener('touchstart', (e) => {
                newLink.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            newLink.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    newLink.style.backgroundColor = '';
                }, 150);
            });
        });
    }

    // Smooth scroll for anchor links
    smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add loading states for menu items
    addLoadingState(item) {
        item.classList.add('esprit-menu__item--loading');
        
        // Remove loading state after animation
        setTimeout(() => {
            item.classList.remove('esprit-menu__item--loading');
        }, 1000);
    }

    // Accessibility improvements
    enhanceAccessibility() {
        // Add ARIA attributes
        this.menuItems.forEach(item => {
            const link = item.querySelector('.esprit-menu__link');
            const submenu = item.querySelector('.esprit-mega-menu, .esprit-dropdown');
            
            if (submenu) {
                const submenuId = `submenu-${Math.random().toString(36).substr(2, 9)}`;
                submenu.id = submenuId;
                link.setAttribute('aria-haspopup', 'true');
                link.setAttribute('aria-expanded', 'false');
                link.setAttribute('aria-controls', submenuId);
                
                // Update aria-expanded on hover/focus
                item.addEventListener('mouseenter', () => {
                    link.setAttribute('aria-expanded', 'true');
                });
                
                item.addEventListener('mouseleave', () => {
                    link.setAttribute('aria-expanded', 'false');
                });
            }
        });
        
        // Keyboard navigation
        this.menuItems.forEach((item, index) => {
            const link = item.querySelector('.esprit-menu__link');
            
            link.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        this.focusNextMenuItem(index);
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.focusPrevMenuItem(index);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.focusSubmenu(item);
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.closeAllMenus();
                        link.blur();
                        break;
                }
            });
        });
    }

    focusNextMenuItem(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.menuItems.length;
        const nextLink = this.menuItems[nextIndex].querySelector('.esprit-menu__link');
        nextLink.focus();
    }

    focusPrevMenuItem(currentIndex) {
        const prevIndex = currentIndex === 0 ? this.menuItems.length - 1 : currentIndex - 1;
        const prevLink = this.menuItems[prevIndex].querySelector('.esprit-menu__link');
        prevLink.focus();
    }

    focusSubmenu(item) {
        const submenu = item.querySelector('.esprit-mega-menu, .esprit-dropdown');
        if (submenu) {
            const firstLink = submenu.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }
    }
}

// Initialize the mega menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if auto-initialization should be prevented
    if (window.PREVENT_AUTO_INIT) {
        console.log('🚫 Auto-initialization prevented by PREVENT_AUTO_INIT flag');
        return;
    }
    
    console.log('🚀 DOM Content Loaded - Initializing Esprit Mega Menu...');
    
    try {
        const megaMenu = new EspritMegaMenu();
        console.log('✅ EspritMegaMenu instance created successfully');
        
        // Make it globally accessible for debugging
        window.espritMenu = megaMenu;
        console.log('🌍 Menu instance attached to window.espritMenu for debugging');
        
        // Enhance accessibility
        megaMenu.enhanceAccessibility();
        console.log('♿ Accessibility enhanced');
        
        // Add some interactive features
        console.log('🎉 مگامنوی مدرن بارگذاری شد!');
        
        // Test hamburger button immediately
        setTimeout(() => {
            const toggle = document.querySelector('.esprit-nav__toggle');
            console.log('🔍 Testing hamburger button after 1 second:');
            console.log('  - Element found:', toggle ? '✅' : '❌');
            if (toggle) {
                console.log('  - Element classes:', toggle.className);
                console.log('  - Element style:', toggle.style.cssText);
                console.log('  - Element computed style display:', getComputedStyle(toggle).display);
            }
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error initializing EspritMegaMenu:', error);
    }
    
    // Optional: Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`⚡ زمان بارگذاری منو: ${Math.round(loadTime)}ms`);
        });
    }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EspritMegaMenu;
}
