document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu și Mobile Navigation
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-overlay .nav-links a');
    
    // Funcție pentru a deschide meniul mobil
    function openMobileMenu() {
        burgerMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne scroll-ul în fundal
    }
    
    // Funcție pentru a închide meniul mobil
    function closeMobileMenu() {
        burgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Reactivează scroll-ul
    }
    
    // Event listener pentru burger button
    if(burgerMenu) {
        burgerMenu.addEventListener('click', openMobileMenu);
    }
    
    // Event listener pentru butonul de închidere
    if(mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Închide meniul când se face click pe un link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
            
            // Dacă link-ul are un hash (anchor), facem scroll smooth la acea secțiune
            const href = this.getAttribute('href');
            if (href.includes('#') && !href.startsWith('http')) {
                const targetId = href.split('#')[1];
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Adăugăm o mică întârziere pentru a permite închiderea meniului
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetSection.offsetTop - 70, // Ajustare pentru headerul fix
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Închide meniul când se face click în afara conținutului
    mobileMenuOverlay?.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Închide meniul cu tasta Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay?.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Funcție pentru smooth scroll la link-urile din pagină
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight nav links on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Verificăm fiecare secțiune pentru a vedea dacă utilizatorul se află în ea
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Eliminăm clasa active de pe toate link-urile
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adăugăm clasa active pe link-ul corespunzător
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    });
}); 