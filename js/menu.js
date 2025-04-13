document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation smooth scroll
    const menuLinks = document.querySelectorAll('.menu-nav-tabs a');
    const menuNav = document.querySelector('.menu-nav-tabs');
    
    // Ajustare pentru headerul fix - valoare dinamică bazată pe dispozitiv
    const getHeaderOffset = () => {
        // Calculăm o valoare de offset mai mare pentru mobile și mai mică pentru desktop
        return window.innerWidth <= 768 ? 60 : 70;
    };
    
    // Inițializare pentru scroll la taburi pentru mobile
    initMobileTabsScroll();
    
    // Highlight-ul inițial pentru tabul activ bazat pe poziția de scroll
    highlightActiveTab();
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Ajustăm offsetul bazat pe header și device
                const headerOffset = getHeaderOffset();
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetSection.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
                
                // Update active class
                menuLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll tabul activ în view pentru mobile
                scrollTabIntoView(this);
            }
        });
    });
    
    // Highlight menu links on scroll with throttling for performance
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        // Throttle the scroll event for better performance
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                highlightActiveTab();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Ajustăm evenimentul de resize pentru a actualiza offset-ul corect
    window.addEventListener('resize', function() {
        // Verificăm dacă există un tab activ și îl rescrollăm în view
        const activeTab = document.querySelector('.menu-nav-tabs a.active');
        if (activeTab) {
            scrollTabIntoView(activeTab);
        }
        
        // Re-highlight tabul activ în caz de schimbare a dimensiunii
        highlightActiveTab();
    });
    
    // Funcție pentru a face scroll la tabul selectat pentru mobile
    function scrollTabIntoView(tab) {
        // Doar pentru dispozitive mobile cu taburi orizontale scrollabile
        if (window.innerWidth <= 768 && menuNav) {
            // Calculăm poziția de scroll pentru a centra tabul
            const tabRect = tab.getBoundingClientRect();
            const navRect = menuNav.getBoundingClientRect();
            
            const centerPosition = tabRect.left + (tabRect.width / 2) - (navRect.width / 2);
            
            // Scroll spre tab cu animație smooth
            menuNav.scrollTo({
                left: menuNav.scrollLeft + centerPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Inițializăm scrollul pentru taburi pe mobile
    function initMobileTabsScroll() {
        if (window.innerWidth <= 768 && menuNav) {
            // Asigurăm că tabul activ inițial este vizibil
            const activeTab = document.querySelector('.menu-nav-tabs a.active');
            if (activeTab) {
                setTimeout(() => {
                    scrollTabIntoView(activeTab);
                }, 100); // Mică întârziere pentru a permite layout-ul complet
            }
        }
    }
    
    // Funcție pentru a evidenția tabul activ în funcție de poziția de scroll
    function highlightActiveTab() {
        const scrollPosition = window.scrollY;
        const headerOffset = getHeaderOffset();
        
        // Find all sections
        const sections = document.querySelectorAll('.menu-content');
        
        sections.forEach(section => {
            // Ajustăm topul secțiunii pentru a lua în considerare headerul fix
            const sectionTop = section.offsetTop - headerOffset - 20; // 20px tolerance
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                // Remove all active classes
                menuLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.menu-nav-tabs a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    // Scroll tabul activ în view pentru mobile
                    scrollTabIntoView(activeLink);
                }
            }
        });
    }
    
    // Detectăm dacă suntem pe un dispozitiv touch pentru a optimiza interacțiunile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    // Adăugăm o clasă pentru un comportament mai bun pe touch devices
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Optimizăm pentru inertia scroll pe iOS
        if (menuNav) {
            menuNav.style.webkitOverflowScrolling = 'touch';
        }
    }
    
    // "Add to cart" functionality
    const addToCartButtons = document.querySelectorAll('.order-button-small');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product information
            const menuItem = this.closest('.menu-item');
            const productName = menuItem.querySelector('h3').textContent;
            const productPrice = menuItem.querySelector('.price').textContent;
            
            // Show feedback to user
            const originalText = this.textContent;
            this.textContent = 'Adăugat ✓';
            this.style.backgroundColor = '#0e402a';
            
            // Optional: Add item to cart logic would go here
            console.log(`Added to cart: ${productName} - ${productPrice}`);
            
            // Reset button text after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
}); 