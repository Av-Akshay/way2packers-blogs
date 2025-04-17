document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavPanel = document.querySelector('.mobile-nav-panel');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;
    const mobileMenuItemsWithChildren = document.querySelectorAll('.mobile-menu-item-has-children > a');

    function openMobileMenu() {
        body.classList.add('mobile-nav-active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        body.classList.remove('mobile-nav-active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        // Close any open submenus when closing the main panel
        document.querySelectorAll('.mobile-menu-item-has-children.open').forEach(item => {
            item.classList.remove('open');
            const subMenu = item.querySelector('.mobile-sub-menu');
            if (subMenu) {
                subMenu.style.display = 'none';
            }
        });
    }

    if (mobileMenuToggle && mobileNavPanel && mobileNavOverlay && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileNavOverlay.addEventListener('click', closeMobileMenu);

        // Close menu on Escape key press
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && body.classList.contains('mobile-nav-active')) {
                closeMobileMenu();
            }
        });
    }

    // Handle mobile submenu toggles
    mobileMenuItemsWithChildren.forEach(itemLink => {
        itemLink.addEventListener('click', function(event) {
            // Prevent default link behavior only if it's just a toggle
            // Allow navigation if it's a real link (href="#")
            if (itemLink.getAttribute('href') === '#') {
                 event.preventDefault();
            }

            const parentLi = itemLink.parentElement;
            const subMenu = parentLi.querySelector('.mobile-sub-menu');

            if (parentLi.classList.contains('open')) {
                // Close this submenu
                parentLi.classList.remove('open');
                if (subMenu) {
                   slideUp(subMenu);
                }
            } else {
                 // Close other open submenus first (optional, for accordion style)
                // parentLi.closest('.mobile-menu').querySelectorAll('.mobile-menu-item-has-children.open').forEach(openItem => {
                //     if (openItem !== parentLi) {
                //         openItem.classList.remove('open');
                //         const openSubMenu = openItem.querySelector('.mobile-sub-menu');
                //         if (openSubMenu) slideUp(openSubMenu);
                //     }
                // });

                // Open this submenu
                parentLi.classList.add('open');
                 if (subMenu) {
                    slideDown(subMenu);
                }
            }
        });
    });

    /* Utility functions for smooth slide toggle */
    function slideDown(element, duration = 300) {
        element.style.display = 'block';
        let height = element.scrollHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        element.offsetHeight; // Trigger reflow
        element.style.transitionProperty = "height, margin, padding";
        element.style.transitionDuration = duration + 'ms';
        element.style.height = height + 'px';
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
        }, duration);
    }

    function slideUp(element, duration = 300) {
        let height = element.scrollHeight;
        element.style.height = height + 'px';
        element.style.overflow = 'hidden';
        element.style.transitionProperty = "height, margin, padding";
        element.style.transitionDuration = duration + 'ms';
        element.offsetHeight; // Trigger reflow
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        window.setTimeout(() => {
            element.style.display = 'none';
            element.style.removeProperty('height');
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
        }, duration);
    }

});
