document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation smooth scroll
    const menuLinks = document.querySelectorAll('.menu-nav-tabs a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjusting for fixed header
                    behavior: 'smooth'
                });
                
                // Update active class
                menuLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight menu links on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Find all sections
        const sections = document.querySelectorAll('.menu-content');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                // Remove all active classes
                menuLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.menu-nav-tabs a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
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