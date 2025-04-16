document.addEventListener('DOMContentLoaded', function() {
    // Pizza data
    const pizzas = [
        {
            name: 'Diavola',
            image: 'images/pizzaDiavola.png',
            description: 'Pizza picantă cu salamuri italiene picante, ardei iute și mozzarella fină.',
            price: '36 Lei'
        },
        {
            name: 'Margherita',
            image: 'images/pizzaMargherita.png',
            description: 'Pizza clasică napoletană cu sos de roșii, mozzarella proaspătă și busuioc.',
            price: '32 Lei'
        },
        {
            name: 'Cinque Formaggi',
            image: 'images/pizzaCinqueFormaggi.png',
            description: 'Deliciu italian cu cinci tipuri de brânză: mozzarella, gorgonzola, fontina, parmezan și pecorino.',
            price: '38 Lei'
        },
        {
            name: 'Prosciutto e Rucolla',
            image: 'images/pizzaProsciuttoERucolla.png',
            description: 'Pizza elegantă cu prosciutto crudo, rucola proaspătă, parmezan și un strop de ulei de măsline extra virgin.',
            price: '40 Lei'
        },
        {
            name: 'Bianca',
            image: 'images/pizzaBianca.png',
            description: 'Pizza simplă fără sos de roșii, doar cu ulei de măsline, mozzarella, usturoi și ierburi aromatice.',
            price: '30 Lei'
        },
        {
            name: 'Maiale e Cipolle',
            image: 'images/pizzaMaialeECipolle.png',
            description: 'O combinație savuroasă de carne de porc, ceapă caramelizată, mozzarella și sos de roșii.',
            price: '37 Lei'
        },
        {
            name: 'Mortadella',
            image: 'images/pizzaMortadella.png',
            description: 'Pizza delicioasă cu mortadella de Bologna, mozzarella, pistacchio și sos proaspăt de roșii.',
            price: '39 Lei'
        },
        {
            name: 'Cotto e Funghi',
            image: 'images/pizzaCottoEFunghi.png',
            description: 'Pizza clasică cu șuncă, ciuperci proaspete, mozzarella și sos de roșii.',
            price: '35 Lei'
        },
        {
            name: 'Speck Tartufo',
            image: 'images/pizzaSpeckTartufo.png',
            description: 'Pizza sofisticată cu speck, cremă de trufe, mozzarella și ulei de trufe.',
            price: '42 Lei'
        },
        {
            name: 'Nutella',
            image: 'images/pizzaNutella.png',
            description: 'Pizza dulce cu Nutella, banane, fructe de pădure și zahăr pudră, perfectă pentru desert.',
            price: '28 Lei'
        }
    ];

    let currentPizzaIndex = 0;
    const totalPizzas = pizzas.length;
    const preloadedImages = [];

    // Preload all pizza images to ensure smooth transitions
    function preloadImages() {
        pizzas.forEach((pizza, index) => {
            preloadedImages[index] = new Image();
            preloadedImages[index].src = pizza.image;
        });
    }

    // DOM elements
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const pizzaImage = document.querySelector('.pizza-image img');
    const pizzaName = document.querySelector('.pizza-name-overlay h2');
    const viewDetailsBtn = document.querySelector('.view-details-btn');
    const pizzaSelectBtns = document.querySelectorAll('.pizza-select-btn');
    
    // Modal elements
    const modal = document.querySelector('.pizza-details-modal');
    const modalClose = document.querySelector('.close-modal');
    const modalPizzaName = document.querySelector('.modal-pizza-name');
    const modalPizzaImage = document.querySelector('.modal-pizza-image img');
    const modalPizzaDescription = document.querySelector('.modal-pizza-description');
    const modalPizzaPrice = document.querySelector('.modal-pizza-price');
    const modalOrderBtn = document.querySelector('.modal-order-btn');

    // Adăugăm o variabilă pentru direcția de navigare
    let navigateDirection = 'right'; // 'right' sau 'left'

    // Elemente decorative
    const tomatoCircle = document.querySelector('.tomato-circle');
    const basilCircle = document.querySelector('.basil-circle');
    const onionCircle = document.querySelector('.onion-circle');
    const sliderContainer = document.querySelector('.urban-oven-slider');
    
    // Culori de background pentru fiecare pizza
    const backgroundColors = [
        'rgba(80, 20, 20, 0.9)', // Diavola - roșu închis
        'rgba(50, 80, 30, 0.9)',  // Margherita - verde olive
        'rgba(70, 70, 100, 0.9)', // Cinque Formaggi - albastru-violet
        'rgba(90, 60, 30, 0.9)',  // Prosciutto e Rucolla - maro deschis
        'rgba(40, 40, 40, 0.9)',  // Bianca - gri închis
        'rgba(80, 40, 30, 0.9)',  // Maiale e Cipolle - maro-roșcat
        'rgba(100, 60, 80, 0.9)', // Mortadella - roz-violet
        'rgba(60, 80, 50, 0.9)',  // Cotto e Funghi - verde-oliv
        'rgba(40, 30, 50, 0.9)',  // Speck Tartufo - violet închis
        'rgba(80, 50, 90, 0.9)'   // Nutella - violet-roz
    ];

    // Update pizza display with rolling transition
    function updatePizzaDisplay() {
        const pizza = pizzas[currentPizzaIndex];
        
        // Determinăm direcția de ieșire și intrare pentru animația de rostogolire
        const exitDirection = navigateDirection === 'right' ? -1 : 1;
        const enterDirection = navigateDirection === 'right' ? 1 : -1;
        
        // Verificăm tipul de dispozitiv pentru a adapta animațiile
        const width = window.innerWidth;
        const isTablet = width <= 992 && width > 576;
        const isMobile = width <= 576;
        
        // Adaptăm gradul de rotație bazat pe dispozitiv - dar păstrăm rotația pe toate dispozitivele
        let rotationDegree;
        if (isMobile) {
            rotationDegree = 180; // Rotație redusă pentru telefoane
        } else if (isTablet) {
            rotationDegree = 270; // Rotație intermediară pentru tablete
        } else {
            rotationDegree = 360; // Rotație completă pentru desktop
        }
        
        // Aplicăm transformarea de ieșire (pizza actuală)
        pizzaImage.style.opacity = 0;
        // Aplicăm rotație pe toate dispozitivele, doar ajustăm gradul
        pizzaImage.style.transform = `translateX(${exitDirection * 100}%) rotate(${exitDirection * -rotationDegree}deg)`;
        
        // Aplicăm transformarea de ieșire pentru titlu - adaptată la dispozitiv
        pizzaName.style.opacity = 0;
        
        // Adaptăm animația titlului în funcție de dispozitiv
        if (isMobile) {
            // Rotație redusă pentru telefoane mobile
            pizzaName.style.transform = `translateX(${exitDirection * -50}%) rotate(${exitDirection * 10}deg)`;
        } else if (isTablet) {
            // Rotație intermediară pentru tablete
            pizzaName.style.transform = `translateX(${exitDirection * -70}%) rotate(${exitDirection * 15}deg)`;
        } else {
            // Animație completă pentru desktop
            pizzaName.style.transform = `translateX(${exitDirection * -100}%) rotate(${exitDirection * 20}deg)`;
        }
        
        // Factor de reducere a distanței pentru animații pe diferite dispozitive
        let translateFactor;
        if (isMobile) {
            translateFactor = 0.5; // 50% din distanța originală pentru telefoane
        } else if (isTablet) {
            translateFactor = 0.7; // 70% din distanța originală pentru tablete
        } else {
            translateFactor = 1; // 100% din distanța originală pentru desktop
        }
        
        // Animație pentru elementele decorative - adaptată la dispozitiv, dar păstrăm rotația
        if (tomatoCircle) {
            tomatoCircle.style.opacity = 0;
            tomatoCircle.style.transform = `translate(${exitDirection * -150 * translateFactor}px, ${-100 * translateFactor}px) rotate(${exitDirection * -180}deg)`;
        }
        
        if (basilCircle) {
            basilCircle.style.opacity = 0;
            basilCircle.style.transform = `translate(${exitDirection * 150 * translateFactor}px, ${-120 * translateFactor}px) rotate(${exitDirection * 180}deg)`;
        }
        
        if (onionCircle) {
            onionCircle.style.opacity = 0;
            // Ajustăm animația pentru a se potrivi cu noua poziție (din partea de jos)
            onionCircle.style.transform = `translate(${exitDirection * 120 * translateFactor}px, ${100 * translateFactor}px) rotate(${exitDirection * -180}deg)`;
        }
        
        // Tranziție pentru background
        if (sliderContainer) {
            sliderContainer.style.backgroundColor = backgroundColors[currentPizzaIndex];
        }
        
        // Ajustăm duratele de tranziție în funcție de dispozitiv
        let transitionDelay = isMobile ? 250 : (isTablet ? 350 : 500);
        
        setTimeout(() => {
            // Update content with preloaded image if available
            if (preloadedImages[currentPizzaIndex] && preloadedImages[currentPizzaIndex].complete) {
                pizzaImage.src = preloadedImages[currentPizzaIndex].src;
            } else {
                pizzaImage.src = pizza.image;
            }
            
            pizzaName.textContent = pizza.name;
            
            // Set alt text for better accessibility
            pizzaImage.alt = `Pizza ${pizza.name}`;
            
            // Pregătim imaginea pentru animația de intrare
            // Păstrăm aceeași rotație pe toate dispozitivele
            pizzaImage.style.transform = `translateX(${enterDirection * 100}%) rotate(${enterDirection * rotationDegree}deg)`;
            
            // Pregătim titlul pentru animația de intrare
            if (isMobile) {
                pizzaName.style.transform = `translateX(${enterDirection * -50}%) rotate(${enterDirection * -10}deg)`;
            } else if (isTablet) {
                pizzaName.style.transform = `translateX(${enterDirection * -70}%) rotate(${enterDirection * -15}deg)`;
            } else {
                pizzaName.style.transform = `translateX(${enterDirection * -100}%) rotate(${enterDirection * -20}deg)`;
            }
            
            // Pregătim elementele decorative pentru intrare - păstrăm rotația pe toate dispozitivele
            if (tomatoCircle) {
                tomatoCircle.style.transform = `translate(${enterDirection * 150 * translateFactor}px, ${-100 * translateFactor}px) rotate(${enterDirection * 180}deg)`;
            }
            
            if (basilCircle) {
                basilCircle.style.transform = `translate(${enterDirection * -150 * translateFactor}px, ${-120 * translateFactor}px) rotate(${enterDirection * -180}deg)`;
            }
            
            if (onionCircle) {
                // Ajustăm animația pentru a se potrivi cu noua poziție (intrare din partea de jos)
                onionCircle.style.transform = `translate(${enterDirection * -120 * translateFactor}px, ${100 * translateFactor}px) rotate(${enterDirection * 180}deg)`;
            }
            
            // Ajustăm timpul pentru animația de intrare
            let entranceDelay = isMobile ? 20 : (isTablet ? 30 : 50);
            
            // Adăugăm un timeout pentru a ne asigura că tranziția se vede
            setTimeout(() => {
                // Aplicăm transformarea de intrare (pizza nouă)
                pizzaImage.style.opacity = 1;
                pizzaImage.style.transform = 'translateX(0) rotate(0deg)';
                
                // Aplicăm transformarea de intrare pentru titlu - adaptată la dispozitiv
                pizzaName.style.opacity = 1;
                
                if (isMobile) {
                    pizzaName.style.transform = 'translateX(0) rotate(-3deg)';
                } else if (isTablet) {
                    pizzaName.style.transform = 'translateX(0) rotate(-4deg)';
                } else {
                    pizzaName.style.transform = 'translateX(0) rotate(-5deg)';
                }
                
                // Animație pentru elementele decorative - le aducem înapoi
                if (tomatoCircle) {
                    tomatoCircle.style.opacity = 1;
                    tomatoCircle.style.transform = 'translate(0, 0) rotate(0) scale(1)';
                }
                
                if (basilCircle) {
                    basilCircle.style.opacity = 1;
                    basilCircle.style.transform = 'translate(0, 0) rotate(0) scale(1)';
                }
                
                if (onionCircle) {
                    onionCircle.style.opacity = 1;
                    onionCircle.style.transform = 'translate(0, 0) rotate(0) scale(1.05)'; // Păstrăm scale pentru a fi mai vizibil
                }
                
                // Ajustăm timpul pentru finalizarea animației
                let completionDelay = isMobile ? 800 : (isTablet ? 900 : 1000);
                
                // Remove animation classes after animation completes și declanșăm un eveniment custom
                setTimeout(() => {
                    // Pizza și titlul sunt acum în poziția finală
                    const event = new CustomEvent('pizzaTransitionEnd');
                    document.dispatchEvent(event);
                }, completionDelay);
            }, entranceDelay);
            
            // Update modal content in background for instant display if opened
            updateModalContent();
            
            // Update selection buttons active state
            updateSelectButtons();
        }, transitionDelay);
    }

    // Update active state of pizza selection buttons
    function updateSelectButtons() {
        pizzaSelectBtns.forEach((btn, index) => {
            if (index === currentPizzaIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Update modal content without showing the modal
    function updateModalContent() {
        const pizza = pizzas[currentPizzaIndex];
        modalPizzaName.textContent = pizza.name;
        modalPizzaImage.src = pizza.image;
        modalPizzaImage.alt = `Pizza ${pizza.name}`;
        modalPizzaDescription.textContent = pizza.description;
        modalPizzaPrice.textContent = pizza.price;
    }

    // Navigate to previous pizza
    function prevPizza() {
        navigateDirection = 'left';
        currentPizzaIndex = (currentPizzaIndex - 1 + totalPizzas) % totalPizzas;
        updatePizzaDisplay();
    }

    // Navigate to next pizza
    function nextPizza() {
        navigateDirection = 'right';
        currentPizzaIndex = (currentPizzaIndex + 1) % totalPizzas;
        updatePizzaDisplay();
    }

    // Navigate to a specific pizza by index
    function goToPizza(index) {
        if (index >= 0 && index < totalPizzas) {
            // Determinăm direcția pe baza indexului curent și noului index
            navigateDirection = index > currentPizzaIndex ? 'right' : 'left';
            // Dacă mergem de la ultimul la primul sau invers, inversăm direcția
            if (currentPizzaIndex === totalPizzas - 1 && index === 0) {
                navigateDirection = 'right';
            } else if (currentPizzaIndex === 0 && index === totalPizzas - 1) {
                navigateDirection = 'left';
            }
            
            currentPizzaIndex = index;
            updatePizzaDisplay();
        }
    }

    // Event listeners
    leftArrow.addEventListener('click', prevPizza);
    rightArrow.addEventListener('click', nextPizza);
    
    // Selection buttons event listeners
    pizzaSelectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToPizza(index);
        });
    });
    
    // Pizza details modal functionality
    function openModal() {
        // The modal content should already be updated, but just in case
        updateModalContent();
        
        // Show modal
        modal.classList.add('active');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }
    
    // View details button
    viewDetailsBtn.addEventListener('click', openModal);
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Add to cart functionality
    modalOrderBtn.addEventListener('click', function() {
        const pizza = pizzas[currentPizzaIndex];
        
        // Here you would normally add the item to the cart
        // For demonstration, we'll just show an alert
        alert(`${pizza.name} a fost adăugat în coș.`);
        
        // Close the modal
        closeModal();
    });

    // Touch event support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const pizzaDisplay = document.querySelector('.pizza-display');
    
    pizzaDisplay.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    pizzaDisplay.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // Minimum swipe distance (in pixels)
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next pizza
            nextPizza();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous pizza
            prevPizza();
        }
    }

    // Adăugăm un handler pentru redimensionarea ferestrei pentru a ajusta stilurile dinamic
    window.addEventListener('resize', function() {
        adjustForScreenSize();
    });
    
    // Funcție pentru a ajusta elementele în funcție de dimensiunea ecranului
    function adjustForScreenSize() {
        const width = window.innerWidth;
        const isTablet = width <= 992 && width > 576;
        const isMobile = width <= 576;
        
        // Adaptăm dimensiunile pentru containerul de pizza
        let containerSize;
        let titleTranslateY;
        
        if (isMobile) {
            containerSize = Math.min(width * 0.9, 400); // Maxim 90% din lățimea ecranului sau 400px
            titleTranslateY = 80;
        } else if (isTablet) {
            containerSize = Math.min(width * 0.8, 500);
            titleTranslateY = 110;
        } else if (width <= 992) {
            containerSize = 650;
            titleTranslateY = 140;
        } else if (width <= 1200) {
            containerSize = 700;
            titleTranslateY = 160;
        } else {
            containerSize = 800;
            titleTranslateY = 180;
        }
        
        // Aplicăm dimensiunile direct
        const pizzaContainer = document.querySelector('.pizza-image-container');
        if (pizzaContainer) {
            pizzaContainer.style.width = `${containerSize}px`;
            pizzaContainer.style.height = `${containerSize}px`;
        }
        
        // Ajustăm poziția titlului - CORECTĂM pentru a ne asigura că titlul este vizibil
        if (pizzaName) {
            const titleRotation = isMobile ? -3 : (isTablet ? -4 : -5);
            // Asigurăm-ne că titlul este vizibil prin setarea explicită a opacității și poziției
            pizzaName.style.opacity = '1';
            pizzaName.style.transform = `translateX(0) rotate(${titleRotation}deg) translateY(${titleTranslateY}px)`;
            pizzaName.style.zIndex = '10'; // Asigurăm că titlul este deasupra altor elemente
            pizzaName.style.display = 'block'; // Asigurăm că titlul este afișat
        }
        
        // Ajustăm dimensiunile și poziția elementelor decorative pe diferite dispozitive
        // Poziționăm elementele mai clar în jurul pizzei, similar cu fotografia
        if (isMobile) {
            if (tomatoCircle) {
                // Poziționare pentru cercul cu roșie - mult mai mare și mai aproape de pizza
                tomatoCircle.style.width = tomatoCircle.style.height = '120px'; // Mărim de la 90px la 120px
                tomatoCircle.style.top = '-25px'; // Ajustăm poziția pentru noua dimensiune
                tomatoCircle.style.left = '-15px'; // Ajustăm poziția pentru noua dimensiune
                tomatoCircle.style.zIndex = '5';
                tomatoCircle.style.opacity = '0.97'; // Mărim opacitatea pentru vizibilitate maximă
            }
            if (basilCircle) {
                // Poziționare pentru cercul cu busuioc - mult mai mare și mai aproape de pizza
                basilCircle.style.width = basilCircle.style.height = '120px'; // Mărim de la 90px la 120px
                basilCircle.style.top = '-25px'; // Ajustăm poziția pentru noua dimensiune
                basilCircle.style.right = '-15px'; // Ajustăm poziția pentru noua dimensiune
                basilCircle.style.zIndex = '5';
                basilCircle.style.opacity = '0.97'; // Mărim opacitatea pentru vizibilitate maximă
            }
            if (onionCircle) {
                // Poziționare pentru cercul cu ceapă - mutăm în poziție analogă cu celelalte elemente
                onionCircle.style.width = onionCircle.style.height = '120px'; // Păstrăm dimensiunea mare
                onionCircle.style.bottom = 'auto'; // Eliminăm poziționarea de jos
                onionCircle.style.top = '20px'; // Poziționăm în partea de sus
                onionCircle.style.right = '20px'; // Poziționăm în dreapta, similar cu basilCircle
                onionCircle.style.zIndex = '15'; // Z-index mai mare decât celelalte elemente (10)
                onionCircle.style.opacity = '1'; // Opacitate maximă
                onionCircle.style.boxShadow = '0 0 25px rgba(200, 150, 255, 0.9), 0 0 10px white'; // Glow mai pronunțat + contur alb
                onionCircle.style.border = '3px solid white'; // Adăugăm bordură albă pentru vizibilitate crescută
                onionCircle.style.transform = 'scale(1.05)'; // Ușor mărit pentru a atrage atenția
            }
        } else if (isTablet) {
            if (tomatoCircle) {
                // Poziționare pentru cercul cu roșie pe tabletă - mărim semnificativ
                tomatoCircle.style.width = tomatoCircle.style.height = '140px'; // Mărim de la 110px la 140px
                tomatoCircle.style.top = '-30px'; // Ajustăm poziția pentru noua dimensiune
                tomatoCircle.style.left = '-20px'; // Ajustăm poziția pentru noua dimensiune
                tomatoCircle.style.zIndex = '5';
                tomatoCircle.style.opacity = '0.97'; // Mărim opacitatea pentru vizibilitate maximă
            }
            if (basilCircle) {
                // Poziționare pentru cercul cu busuioc pe tabletă - mărim semnificativ
                basilCircle.style.width = basilCircle.style.height = '140px'; // Mărim de la 110px la 140px
                basilCircle.style.top = '-30px'; // Ajustăm poziția pentru noua dimensiune
                basilCircle.style.right = '-20px'; // Ajustăm poziția pentru noua dimensiune
                basilCircle.style.zIndex = '5';
                basilCircle.style.opacity = '0.97'; // Mărim opacitatea pentru vizibilitate maximă
            }
            if (onionCircle) {
                // Poziționare pentru cercul cu ceapă pe tabletă - similar cu desktop dar ajustat pentru dimensiune
                onionCircle.style.width = onionCircle.style.height = '140px'; // Păstrăm dimensiunea mare
                onionCircle.style.bottom = 'auto'; // Eliminăm poziționarea de jos
                onionCircle.style.top = '15px'; // Poziționăm în partea de sus
                onionCircle.style.right = '15px'; // Poziționăm în dreapta, similar cu basilCircle
                onionCircle.style.zIndex = '15'; // Z-index mai mare decât celelalte elemente (10)
                onionCircle.style.opacity = '1'; // Opacitate maximă
                onionCircle.style.boxShadow = '0 0 30px rgba(200, 150, 255, 0.9), 0 0 10px white'; // Glow mai pronunțat + contur alb
                onionCircle.style.border = '3px solid white'; // Adăugăm bordură albă pentru vizibilitate crescută
                onionCircle.style.transform = 'scale(1.05)'; // Ușor mărit pentru a atrage atenția
            }
        } else {
            // Resetăm la dimensiunile implicite pentru desktop, dar mărim semnificativ
            if (tomatoCircle) {
                tomatoCircle.style.width = tomatoCircle.style.height = '160px'; // Menținem dimensiunea
                tomatoCircle.style.top = '10px'; // Aducem mai jos, mai aproape de marginea pizzei (de la -35px)
                tomatoCircle.style.left = '5px'; // Aducem mai în interior, mai aproape de marginea pizzei (de la -25px)
                tomatoCircle.style.zIndex = '5';
                tomatoCircle.style.opacity = '1';
            }
            if (basilCircle) {
                basilCircle.style.width = basilCircle.style.height = '160px'; // Menținem dimensiunea
                basilCircle.style.top = '10px'; // Aducem mai jos, mai aproape de marginea pizzei (de la -35px)
                basilCircle.style.right = '5px'; // Aducem mai în interior, mai aproape de marginea pizzei (de la -25px)
                basilCircle.style.zIndex = '5';
                basilCircle.style.opacity = '1';
            }
            if (onionCircle) {
                onionCircle.style.width = onionCircle.style.height = '160px'; // Menținem dimensiunea
                onionCircle.style.top = 'auto'; // Eliminăm poziționarea din top
                onionCircle.style.bottom = '10px'; // Poziționăm în partea de jos a imaginii
                onionCircle.style.right = '10px'; // Păstrăm poziționarea în dreapta
                onionCircle.style.zIndex = '15'; // Păstrăm z-index-ul mai mare decât celelalte elemente
                onionCircle.style.opacity = '1';
                onionCircle.style.boxShadow = '0 0 35px rgba(200, 150, 255, 0.9), 0 0 15px white'; // Păstrăm glow-ul
                onionCircle.style.border = '3px solid white'; // Păstrăm bordura albă
                onionCircle.style.transform = 'scale(1.05)'; // Păstrăm mărirea ușoară
            }
        }
        
        // Ajustăm duratele tranzițiilor în CSS în funcție de dispozitiv
        updateTransitionDurations(isMobile, isTablet);
    }
    
    // Funcția pentru actualizarea duratelor de tranziție bazate pe tipul de dispozitiv
    function updateTransitionDurations(isMobile, isTablet) {
        const transitionStyle = document.getElementById('dynamic-transitions');
        if (transitionStyle) {
            document.head.removeChild(transitionStyle);
        }
        
        // Setăm duratele tranzițiilor bazate pe tipul de dispozitiv - mai rapide pentru mobile
        const transformDuration = isMobile ? '0.7s' : (isTablet ? '0.85s' : '1s');
        const opacityDuration = isMobile ? '0.35s' : (isTablet ? '0.45s' : '0.5s');
        const bgDuration = isMobile ? '0.7s' : (isTablet ? '0.8s' : '1s');
        
        // Setăm curba de timing pentru rotație - mai lin pe mobile
        const timingFunction = isMobile ? '0.25, 1, 0.5, 1' : (isTablet ? '0.22, 1, 0.36, 1' : '0.22, 1, 0.36, 1');
        
        const newStyle = document.createElement('style');
        newStyle.id = 'dynamic-transitions';
        newStyle.textContent = `
            .pizza-image img {
                transition: transform ${transformDuration} cubic-bezier(${timingFunction}), opacity ${opacityDuration} ease;
                transform-origin: center center;
            }
            
            .urban-oven-slider {
                transition: background-color ${bgDuration} ease;
            }
            
            .pizza-name-overlay h2 {
                transition: transform ${transformDuration} cubic-bezier(${timingFunction}), opacity ${opacityDuration} ease;
                transform-origin: center bottom;
            }
            
            .circle-decoration {
                transition: transform ${transformDuration} cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${opacityDuration} ease, width 0.3s ease, height 0.3s ease;
            }
        `;
        
        document.head.appendChild(newStyle);
    }
    
    // Îmbunătățirea interacțiunilor touch pentru device-uri mobile
    function enhanceTouchInteractions() {
        const width = window.innerWidth;
        const isMobile = width <= 576;
        
        // Reducem threshold-ul pentru swipe pe dispozitive mobile
        const swipeThreshold = isMobile ? 30 : 50;
        
        // Îmbunătățim handlerul pentru swipe
        function handleSwipe() {
            const swipeDistance = touchStartX - touchEndX;
            
            if (Math.abs(swipeDistance) >= swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe stânga, arată pizza următoare
                    nextPizza();
                } else {
                    // Swipe dreapta, arată pizza anterioară
                    prevPizza();
                }
            }
        }
        
        // Înlocuim handler-ul existent cu cel nou
        pizzaDisplay.removeEventListener('touchend', handleSwipe);
        pizzaDisplay.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        // Adăugăm feedback tactil pentru interacțiunile cu butoanele
        const buttons = document.querySelectorAll('.pizza-select-btn, .nav-arrow, .view-details-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Preload images first
    preloadImages();
    
    // Initialize with first pizza
    updatePizzaDisplay();
    
    // Apelăm funcția de ajustare la încărcare
    adjustForScreenSize();
    
    // Îmbunătățim interacțiunile touch
    enhanceTouchInteractions();
    
    // Adaugă clase de stil pentru animațiile de rostogolire
    const style = document.createElement('style');
    style.textContent = `
        .pizza-image img {
            width: 105% !important; /* Mărim imaginea cu pizza */
            height: 105% !important;
            max-width: none !important;
            max-height: none !important;
        }
        
        .urban-oven-slider .pizza-display .pizza-image-container {
            transition: width 0.3s ease, height 0.3s ease;
            overflow: visible !important; /* Important pentru a vedea rotația în întregime */
        }
        
        .pizza-name-overlay h2 {
            transform-origin: center bottom;
            font-size: 34px !important; /* Mărim cu 20% (de la 28px la 34px) */
            font-weight: 800 !important;
            padding: 8px 16px !important; /* Mărim și padding-ul proporțional */
            background-color: rgba(0, 0, 0, 0.4) !important; /* Fundal puțin mai închis pentru lizibilitate */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6) !important; /* Umbră mai pronunțată pentru text */
        }
        
        /* Culori personalizate pentru fiecare element decorativ */
        .tomato-circle {
            box-shadow: 0 0 20px rgba(255, 100, 100, 0.5);
            position: absolute !important;
            border-radius: 50% !important;
            background-position: center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            transition: transform 0.5s ease, opacity 0.5s ease, width 0.3s ease, height 0.3s ease !important;
        }
        
        .basil-circle {
            box-shadow: 0 0 20px rgba(100, 255, 100, 0.5);
            position: absolute !important;
            border-radius: 50% !important;
            background-position: center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            transition: transform 0.5s ease, opacity 0.5s ease, width 0.3s ease, height 0.3s ease !important;
        }
        
        .onion-circle {
            box-shadow: 0 0 20px rgba(200, 150, 255, 0.5);
            position: absolute !important;
            border-radius: 50% !important;
            background-position: center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            transition: transform 0.5s ease, opacity 0.5s ease, width 0.3s ease, height 0.3s ease !important;
        }
        
        /* Ajustăm stilurile pentru containerul pizzei pentru a permite poziționarea elementelor decorative */
        .pizza-image-container {
            position: relative !important;
            overflow: visible !important;
            z-index: 1 !important;
        }
        
        /* Asigurăm că imaginea pizzei este deasupra elementelor când se rotește */
        .pizza-image {
            position: relative !important;
            z-index: 2 !important;
        }
        
        /* Ajustăm stilurile pentru elementele decorative pe ecrane mici */
        @media screen and (max-width: 768px) {
            .tomato-circle, .basil-circle, .onion-circle {
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.3) !important;
            }
        }
        
        /* Ajustăm stilurile pentru elementele decorative pe telefoane */
        @media screen and (max-width: 576px) {
            .tomato-circle, .basil-circle, .onion-circle {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
            }
        }
        
        /* Îmbunătățirea design-ului pentru modalul de detalii pizza */
        .pizza-details-modal {
            background-color: rgba(0, 0, 0, 0.75) !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background-color: white !important;
            border-radius: 12px !important;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25) !important;
            max-width: 550px !important;
            width: 100% !important;
            padding: 0 !important;
            overflow: hidden !important;
            position: relative !important;
            display: flex !important;
            flex-direction: column !important; /* Schimbăm la layout vertical */
        }
        
        .close-modal {
            position: absolute !important;
            top: 15px !important;
            right: 15px !important;
            background: rgba(255, 255, 255, 0.9) !important;
            border-radius: 50% !important;
            width: 35px !important;
            height: 35px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 20px !important;
            font-weight: bold !important;
            color: #333 !important;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
            z-index: 10 !important;
            border: none !important;
            cursor: pointer !important;
        }
        
        /* Ajustare pentru a ocupa tot spațiul disponibil */
        .modal-pizza-name {
            font-size: 32px !important;
            font-weight: 800 !important;
            color: #E94335 !important;
            margin: 0 !important;
            padding: 25px 30px 10px !important;
            text-transform: uppercase !important;
            line-height: 1.1 !important;
            text-align: left !important;
            width: 100% !important;
        }
        
        /* Modificare layout modal pentru a reflecta imaginea din fotografie */
        .modal-pizza-image {
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: #f7f7f7 !important;
            position: relative !important;
            padding: 20px !important;
            overflow: visible !important;
        }
        
        .modal-pizza-image img {
            width: auto !important;
            height: auto !important;
            max-width: 70% !important;
            max-height: 250px !important;
            object-fit: contain !important;
            display: block !important;
            margin: 0 auto !important;
        }
        
        .modal-pizza-details {
            padding: 10px 30px 30px !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            position: relative !important;
            background-color: white !important;
        }
        
        .modal-pizza-description {
            font-size: 16px !important;
            line-height: 1.5 !important;
            color: #555 !important;
            margin-bottom: 20px !important;
            text-align: left !important;
        }
        
        .modal-pizza-price {
            font-size: 30px !important;
            font-weight: 700 !important;
            color: #E94335 !important;
            margin-bottom: 20px !important;
            display: block !important;
            text-align: left !important;
        }
        
        .modal-order-btn {
            background-color: #E94335 !important;
            color: white !important;
            border: none !important;
            border-radius: 50px !important;
            padding: 12px 30px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: background-color 0.3s, transform 0.2s !important;
            width: 100% !important;
            display: block !important;
            text-align: center !important;
        }
        
        .modal-order-btn:hover {
            background-color: #d03729 !important;
            transform: translateY(-2px) !important;
        }
        
        /* Versiune responsive pentru modal */
        @media screen and (max-width: 768px) {
            .modal-content {
                max-width: 90% !important;
                margin: 0 15px !important;
            }
            
            .modal-pizza-name {
                font-size: 28px !important;
                padding: 20px 20px 5px !important;
            }
            
            .modal-pizza-image {
                padding: 15px !important;
            }
            
            .modal-pizza-image img {
                max-width: 75% !important;
                max-height: 200px !important;
            }
            
            .modal-pizza-details {
                padding: 10px 20px 20px !important;
            }
        }
        
        @media screen and (max-width: 576px) {
            .modal-content {
                max-width: 95% !important;
                margin: 0 10px !important;
                border-radius: 10px !important;
            }
            
            .modal-pizza-name {
                font-size: 24px !important;
                padding: 15px 15px 5px !important;
            }
            
            .modal-pizza-image {
                padding: 10px !important;
            }
            
            .modal-pizza-image img {
                max-width: 80% !important;
                max-height: 180px !important;
            }
            
            .modal-pizza-description {
                font-size: 14px !important;
                margin-bottom: 15px !important;
            }
            
            .modal-pizza-price {
                font-size: 26px !important;
                margin-bottom: 15px !important;
            }
            
            .modal-pizza-details {
                padding: 5px 15px 15px !important;
            }
            
            .modal-order-btn {
                padding: 10px 20px !important;
                font-size: 15px !important;
            }
        }
        
        /* Îmbunătățiri pentru slider-ul de butoane de pizza pe ecrane mici */
        @media screen and (max-width: 576px) {
            .pizza-selection-buttons {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 5px;
                padding: 10px 5px;
            }
            
            .pizza-select-btn {
                font-size: 11px !important;
                padding: 4px 8px !important;
                margin: 2px !important;
            }
            
            .nav-arrow {
                width: 35px !important;
                height: 35px !important;
                background-color: rgba(255, 255, 255, 0.15) !important;
            }
            
            .nav-arrow i {
                font-size: 14px !important;
            }
            
            .view-details-btn {
                font-size: 14px !important;
                padding: 5px 10px !important;
            }
            
            /* Îmbunătățim feedback-ul activ pentru touch */
            .pizza-select-btn:active, .nav-arrow:active, .view-details-btn:active, .modal-order-btn:active {
                transform: scale(0.95) !important;
                transition: transform 0.1s !important;
            }
        }
        
        /* Versiune tabletă */
        @media screen and (min-width: 577px) and (max-width: 992px) {
            .pizza-select-btn:active, .nav-arrow:active, .view-details-btn:active, .modal-order-btn:active {
                transform: scale(0.95) !important;
                transition: transform 0.1s !important;
            }
            
            .nav-arrow {
                background-color: rgba(255, 255, 255, 0.1) !important;
            }
        }
        
        /* Ajustăm înălțimea containerului de slider pe ecrane mici */
        @media screen and (max-width: 768px) {
            .pizza-slider-container {
                height: auto !important;
                min-height: 550px !important;
                padding: 20px 15px !important;
            }
            
            /* Centrăm mai bine numele pe ecrane mici, dar păstrăm puțină rotație */
            .pizza-name-overlay h2 {
                text-align: center !important;
                transform: rotate(-3deg) translateY(110px) !important;
                font-size: 28px !important;
            }
        }
        
        @media screen and (max-width: 576px) {
            .pizza-slider-container {
                min-height: 450px !important;
                padding: 15px 10px !important;
            }
            
            .pizza-name-overlay h2 {
                font-size: 24px !important;
                transform: rotate(-3deg) translateY(80px) !important;
                padding: 5px 10px !important;
            }
        }
        
        /* Stiluri îmbunătățite pentru titlul pizzei */
        .pizza-name-overlay {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 10 !important;
            text-align: center !important;
            pointer-events: none !important; /* Permite click-uri pe elemente dedesubt */
        }
        
        .pizza-name-overlay h2 {
            transform-origin: center bottom;
            font-size: 34px !important; /* Mărim cu 20% (de la 28px la 34px) */
            font-weight: 800 !important;
            padding: 8px 16px !important; /* Mărim și padding-ul proporțional */
            background-color: rgba(0, 0, 0, 0.4) !important; /* Fundal puțin mai închis pentru lizibilitate */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6) !important; /* Umbră mai pronunțată pentru text */
            display: inline-block !important;
            margin: 0 auto !important;
            color: white !important;
            max-width: 80% !important;
        }
        
        /* Asigurăm că pizza și titlul sunt deasupra elementelor când se rotesc */
        .pizza-image {
            position: relative !important;
            z-index: 2 !important;
        }
        
        .pizza-image-container {
            position: relative !important;
            overflow: visible !important;
            z-index: 1 !important;
        }
        
        /* Culori personalizate pentru fiecare element decorativ */
        .tomato-circle {
            box-shadow: 0 0 20px rgba(255, 100, 100, 0.5);
            position: absolute !important;
            border-radius: 50% !important;
            background-position: center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            transition: transform 0.5s ease, opacity 0.5s ease, width 0.3s ease, height 0.3s ease !important;
        }
        
        .basil-circle {
            box-shadow: 0 0 20px rgba(100, 255, 100, 0.5);
            position: absolute !important;
            border-radius: 50% !important;
            background-position: center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            transition: transform 0.5s ease, opacity 0.5s ease, width 0.3s ease, height 0.3s ease !important;
        }
        
        .onion-circle {
            box-shadow: 0 0 20px rgba(200, 150, 255, 0.5);
            position: absolute !important;
            border-radius: 50% !important;
            background-position: center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            transition: transform 0.5s ease, opacity 0.5s ease, width 0.3s ease, height 0.3s ease !important;
        }
        
        /* Ajustăm stilurile pentru containerul pizzei pentru a permite poziționarea elementelor decorative */
        .pizza-image-container {
            position: relative !important;
            overflow: visible !important;
            z-index: 1 !important;
        }
        
        /* Ajustăm stilurile pentru elementele decorative pe ecrane mici */
        @media screen and (max-width: 768px) {
            .tomato-circle, .basil-circle, .onion-circle {
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.3) !important;
            }
            
            /* Ajustăm titlul și pentru tablete */
            .pizza-name-overlay h2 {
                font-size: 28px !important;
                transform: rotate(-3deg) translateY(110px) !important;
                max-width: 90% !important;
                text-align: center !important;
            }
        }
        
        /* Ajustăm stilurile pentru elementele decorative pe telefoane */
        @media screen and (max-width: 576px) {
            .tomato-circle, .basil-circle, .onion-circle {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
            }
            
            /* Ajustăm titlul pentru telefoane mobile */
            .pizza-name-overlay h2 {
                font-size: 24px !important;
                transform: rotate(-3deg) translateY(80px) !important;
                padding: 5px 10px !important;
                max-width: 95% !important;
            }
        }
        
        /* Stiluri îmbunătățite pentru elementele decorative */
        .tomato-circle, .basil-circle, .onion-circle {
            border: 3px solid rgba(255, 255, 255, 0.6) !important; /* Mărim bordura pentru a se potrivi cu dimensiunile noi */
            background-size: 80% !important; /* Reducem puțin dimensiunea imaginii interne pentru a se vedea mai bine borderele */
            background-position: center center !important;
            background-color: rgba(50, 50, 50, 0.5) !important; /* Un fundal puțin mai întunecat pentru contrast */
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.3) !important; /* Adăugăm un glow general */
        }
        
        .tomato-circle {
            box-shadow: 0 0 30px rgba(255, 100, 100, 0.7) !important; /* Strălucire mai intensă */
        }
        
        .basil-circle {
            box-shadow: 0 0 30px rgba(100, 255, 100, 0.7) !important; /* Strălucire mai intensă */
        }
        
        .onion-circle {
            box-shadow: 0 0 30px rgba(200, 150, 255, 0.7) !important; /* Strălucire mai intensă */
        }
        
        /* Punem imaginea de pizza peste elementele decorative când este aproape */
        .pizza-image {
            position: relative !important;
            z-index: 3 !important; /* Păstrăm prioritatea z-index */
        }
        
        /* Adăugăm efecte de hover pentru ingrediente pentru o experiență interactivă */
        .tomato-circle:hover, .basil-circle:hover, .onion-circle:hover {
            transform: scale(1.1) !important;
            transition: transform 0.3s ease !important;
            cursor: pointer !important;
        }
        
        /* Efecte specifice pentru fiecare ingredient la hover */
        .tomato-circle:hover {
            box-shadow: 0 0 35px rgba(255, 100, 100, 0.9) !important;
        }
        
        .basil-circle:hover {
            box-shadow: 0 0 35px rgba(100, 255, 100, 0.9) !important;
        }
        
        .onion-circle:hover {
            box-shadow: 0 0 35px rgba(200, 150, 255, 0.9) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Îmbunătățirea structurii modalului pentru a se potrivi cu designul dorit
    // Acest cod trebuie adăugat pentru a se asigura că modalul are structura corectă la încărcare
    document.addEventListener('DOMContentLoaded', function() {
        // Verificăm dacă modalul există deja
        if (modal) {
            // Îmbunătățim structura modalului
            const modalContent = modal.querySelector('.modal-content');
            
            if (modalContent) {
                // Verificăm dacă există deja elementele și le reorganizăm dacă este necesar
                let modalPizzaImage = modalContent.querySelector('.modal-pizza-image');
                let modalPizzaDetails = modalContent.querySelector('.modal-pizza-details');
                
                // Dacă nu avem container pentru detalii, îl creăm
                if (!modalPizzaDetails) {
                    modalPizzaDetails = document.createElement('div');
                    modalPizzaDetails.className = 'modal-pizza-details';
                    
                    // Mutăm elementele existente în container-ul de detalii
                    const elements = [
                        modalContent.querySelector('.modal-pizza-name'),
                        modalContent.querySelector('.modal-pizza-description'),
                        modalContent.querySelector('.modal-pizza-price'),
                        modalContent.querySelector('.modal-order-btn')
                    ];
                    
                    // Golim conținutul modal pentru reorganizare
                    const closeButton = modalContent.querySelector('.close-modal');
                    modalContent.innerHTML = '';
                    
                    // Adăugăm butonul de închidere înapoi
                    if (closeButton) {
                        modalContent.appendChild(closeButton);
                    }
                    
                    // Verificăm dacă avem container pentru imagine
                    if (!modalPizzaImage) {
                        modalPizzaImage = document.createElement('div');
                        modalPizzaImage.className = 'modal-pizza-image';
                        
                        // Adăugăm imaginea în container
                        const img = document.createElement('img');
                        img.alt = 'Pizza';
                        modalPizzaImage.appendChild(img);
                    }
                    
                    // Adăugăm containerul de imagine
                    modalContent.appendChild(modalPizzaImage);
                    
                    // Adăugăm containerul de detalii
                    modalContent.appendChild(modalPizzaDetails);
                    
                    // Adăugăm elementele în containerul de detalii
                    elements.forEach(element => {
                        if (element) {
                            modalPizzaDetails.appendChild(element);
                        }
                    });
                }
            }
        }
    });

    // Adăugăm și o verificare suplimentară pentru a repoziționa titlul după încărcare și după fiecare navigare
    function checkAndFixTitle() {
        setTimeout(() => {
            const pizzaNameElement = document.querySelector('.pizza-name-overlay h2');
            if (pizzaNameElement && window.getComputedStyle(pizzaNameElement).opacity === '0') {
                pizzaNameElement.style.opacity = '1';
                const width = window.innerWidth;
                const isTablet = width <= 992 && width > 576;
                const isMobile = width <= 576;
                
                let titleTranslateY;
                if (isMobile) {
                    titleTranslateY = 80;
                } else if (isTablet) {
                    titleTranslateY = 110;
                } else if (width <= 992) {
                    titleTranslateY = 140;
                } else if (width <= 1200) {
                    titleTranslateY = 160;
                } else {
                    titleTranslateY = 180;
                }
                
                const titleRotation = isMobile ? -3 : (isTablet ? -4 : -5);
                pizzaNameElement.style.transform = `translateX(0) rotate(${titleRotation}deg) translateY(${titleTranslateY}px)`;
            }
        }, 1200); // Verificăm după ce animațiile ar trebui să se termine
    }

    // Apelăm funcția inițial și adăugăm un eveniment după ce se termină animația de trecere de la o pizza la alta
    checkAndFixTitle();
    document.addEventListener('pizzaTransitionEnd', checkAndFixTitle);
}); 