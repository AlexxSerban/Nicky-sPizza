document.addEventListener('DOMContentLoaded', function() {
    // Date despre panini
    const paninis = [
        {
            name: 'Prosciutto Crudo & Bufala',
            image: 'images/paninoCrudoEBufalla.png',
            description: 'Un panino delicios cu prosciutto crudo, mozzarella de bufala, rucola proaspătă și un strop de ulei de măsline extra virgin.',
            price: '32 Lei',
            attributes: ['Artizanal', 'Autentic Italian', 'Proaspăt']
        },
        {
            name: 'Cotto & Bufala',
            image: 'images/paninoCottoEBufala.png',
            description: 'Combinația perfectă între șunca de Praga, mozzarella de bufala, roșii proaspete și sos delicat de pesto.',
            price: '30 Lei',
            attributes: ['Ideal pentru copii', 'Gustos', 'Ușor']
        },
        {
            name: 'Caprese',
            image: 'images/paninoCaprese.png',
            description: 'Inspirat din clasica salată italiană, cu mozzarella proaspătă, roșii suculente, busuioc verde și un strop de pesto.',
            price: '28 Lei',
            attributes: ['Vegetarian', 'Light', 'Aromat']
        },
        {
            name: 'Porchetta',
            image: 'images/paninoPorchetta.png',
            description: 'Un panino tradițional cu porchetta (carne de porc condimentată), rucola, roșii uscate și maioneză cu usturoi.',
            price: '34 Lei',
            attributes: ['Consistent', 'Tradițional', 'Savuros']
        }
    ];

    // Elementul container pentru slider
    const sliderContainer = document.querySelector('.panini-slider-container');
    
    // Verificăm dacă containerul există
    if (!sliderContainer) {
        console.error('Containerul pentru slider nu a fost găsit!');
        return;
    }

    let currentPaniniIndex = 0;
    const totalPaninis = paninis.length;

    // Construim HTML-ul pentru sliderul de panini
    function buildSlider() {
        // Golim containerul
        sliderContainer.innerHTML = '';
        
        // Adăugăm structura de bază a sliderului
        const slidesHTML = paninis.map((panini, index) => {
            return `
                <div class="panini-slide slide-${index + 1}" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; visibility: ${index === 0 ? 'visible' : 'hidden'};">
                    <div class="panini-slide-left">
                        <!-- Eliminăm titlul "Nicky's Panini" și tagline-ul -->
                        
                        <h2 class="panini-title" style="display: block; visibility: visible;">${panini.name}</h2>
                        <p class="panini-description">${panini.description}</p>
                        
                        <div class="panini-attributes">
                            ${panini.attributes.map(attr => `<span class="panini-attribute">${attr}</span>`).join('')}
                        </div>
                        
                        <a href="#" class="panini-cta-button" data-index="${index}">Vezi detalii</a>
                        
                        <!-- Cercuri decorative -->
                        <div class="panini-decoration-circle panini-circle-1"></div>
                        <div class="panini-decoration-circle panini-circle-2"></div>
                    </div>
                    
                    <div class="panini-slide-right">
                        <div class="panini-image-container">
                            <img src="${panini.image}" alt="${panini.name}" class="panini-image">
                            <!-- Adăugăm containerul pentru efectul de aburi -->
                            <div class="steam-container" id="steam-container-${index}"></div>
                        </div>
                        
                        <!-- Cerc decorativ suplimentar -->
                        <div class="panini-decoration-circle panini-circle-3"></div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Adăugăm navigarea
        const navigationHTML = `
            <div class="panini-navigation">
                ${paninis.map((_, index) => `
                    <div class="panini-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                `).join('')}
            </div>
            
            <div class="panini-arrow panini-arrow-left">
                <i class="fas fa-chevron-left"></i>
            </div>
            
            <div class="panini-arrow panini-arrow-right">
                <i class="fas fa-chevron-right"></i>
            </div>
        `;
        
        // Adăugăm modalul pentru detalii panini
        const modalHTML = `
            <div class="panini-modal" id="panini-details-modal">
                <div class="panini-modal-content">
                    <span class="panini-modal-close">&times;</span>
                    <div class="panini-modal-image">
                        <img src="" alt="Panini">
                    </div>
                    <div class="panini-modal-info">
                        <h3 class="panini-modal-title"></h3>
                        <p class="panini-modal-description"></p>
                        <div class="panini-modal-attributes"></div>
                        <div class="panini-modal-price"></div>
                        <button class="panini-modal-cart-btn">Adaugă în coș</button>
                    </div>
                </div>
            </div>
        `;
        
        // Adăugăm și CSS-ul pentru modal în head dacă nu există deja
        if (!document.getElementById('panini-modal-styles')) {
            const modalStyles = document.createElement('style');
            modalStyles.id = 'panini-modal-styles';
            modalStyles.textContent = `
                .panini-modal {
                    display: none;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.7);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .panini-modal.active {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 1;
                }
                
                .panini-modal-content {
                    background-color: white;
                    margin: auto;
                    padding: 0;
                    width: 90%;
                    max-width: 800px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    display: flex;
                    overflow: hidden;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                }
                
                .panini-modal.active .panini-modal-content {
                    transform: scale(1);
                }
                
                .panini-modal-close {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    font-size: 28px;
                    font-weight: bold;
                    color: #aaa;
                    cursor: pointer;
                    z-index: 100;
                    background-color: white;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                
                .panini-modal-image {
                    flex: 0 0 45%;
                    background-color: #f8f8f8;
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .panini-modal-image img {
                    max-width: 100%;
                    max-height: 300px;
                    object-fit: contain;
                }
                
                .panini-modal-info {
                    flex: 0 0 55%;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                }
                
                .panini-modal-title {
                    font-size: 32px;
                    font-weight: 700;
                    color: #E94335;
                    margin-bottom: 20px;
                    font-family: 'Poppins', sans-serif;
                }
                
                .panini-modal-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #444;
                    margin-bottom: 20px;
                    font-family: 'Poppins', sans-serif;
                }
                
                .panini-modal-attributes {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                
                .panini-modal-attribute {
                    background-color: #f0f0f0;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #555;
                }
                
                .panini-modal-price {
                    font-size: 28px;
                    font-weight: 700;
                    color: #E94335;
                    margin-bottom: 30px;
                    font-family: 'Poppins', sans-serif;
                }
                
                .panini-modal-cart-btn {
                    background-color: #E94335;
                    color: white;
                    border: none;
                    padding: 14px 25px;
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Poppins', sans-serif;
                    align-self: flex-start;
                }
                
                .panini-modal-cart-btn:hover {
                    background-color: #d03729;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(233, 67, 53, 0.3);
                }
                
                @media (max-width: 768px) {
                    .panini-modal-content {
                        flex-direction: column;
                    }
                    
                    .panini-modal-image, 
                    .panini-modal-info {
                        flex: auto;
                        width: 100%;
                        padding: 20px;
                    }
                    
                    .panini-modal-image {
                        padding-bottom: 0;
                    }
                    
                    .panini-modal-image img {
                        max-height: 200px;
                    }
                    
                    .panini-modal-title {
                        font-size: 26px;
                    }
                    
                    .panini-modal-price {
                        font-size: 24px;
                    }
                }
            `;
            document.head.appendChild(modalStyles);
        }
        
        // Adăugăm stiluri pentru efectul de aburi
        if (!document.getElementById('panini-steam-styles')) {
            const steamStyles = document.createElement('style');
            steamStyles.id = 'panini-steam-styles';
            steamStyles.textContent = `
                .steam-container {
                    position: absolute;
                    width: 200px;
                    height: 80px;
                    top: 20%;  /* Poziționare deasupra imaginii de sandwich */
                    left: 50%;
                    transform: translateX(-50%);
                    overflow: visible;
                    z-index: 5;
                    pointer-events: none;
                }
                
                .steam {
                    position: absolute;
                    width: 40px;
                    height: 55px;
                    background: radial-gradient(circle at center, 
                        rgba(255, 255, 255, 0.95) 0%, 
                        rgba(255, 255, 255, 0.7) 30%, 
                        rgba(255, 255, 255, 0.3) 70%, 
                        rgba(255, 255, 255, 0) 100%);
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    filter: blur(10px);
                    opacity: 0;
                    animation-name: steamAnimation;
                    animation-duration: var(--duration, 3.5s);
                    animation-timing-function: ease-out;
                    animation-iteration-count: infinite;
                    transform: translateY(0) scale(0.5);
                    pointer-events: none;
                    will-change: transform, opacity;
                    bottom: 0;
                }
                
                @keyframes steamAnimation {
                    0% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                    15% {
                        opacity: var(--max-opacity, 0.85);
                    }
                    45% {
                        opacity: var(--mid-opacity, 0.65);
                    }
                    70% {
                        opacity: var(--low-opacity, 0.4);
                    }
                    90% {
                        transform: translateY(-120px) translateX(var(--x-offset)) scale(2.2);
                        opacity: 0.1;
                    }
                    100% {
                        transform: translateY(-150px) translateX(var(--x-offset)) scale(2.5);
                        opacity: 0;
                    }
                }
                
                /* Variații de aburi pentru un efect mai realist */
                .steam.steam-1 { --max-opacity: 0.8; --mid-opacity: 0.65; --low-opacity: 0.4; }
                .steam.steam-2 { --max-opacity: 0.85; --mid-opacity: 0.7; --low-opacity: 0.45; }
                .steam.steam-3 { --max-opacity: 0.75; --mid-opacity: 0.6; --low-opacity: 0.35; }
                
                /* Media queries pentru adaptarea aburilor pe ecrane mai mici */
                @media (max-width: 768px) {
                    .steam-container {
                        width: 180px;
                        height: 70px;
                        top: 22%;
                    }
                    
                    .steam {
                        width: 35px;
                        height: 45px;
                    }
                    
                    @keyframes steamAnimation {
                        0% {
                            transform: translateY(0) scale(0.5);
                            opacity: 0;
                        }
                        15% {
                            opacity: var(--max-opacity, 0.8);
                        }
                        90% {
                            transform: translateY(-90px) translateX(var(--x-offset)) scale(1.8);
                            opacity: 0.1;
                        }
                        100% {
                            transform: translateY(-110px) translateX(var(--x-offset)) scale(2);
                            opacity: 0;
                        }
                    }
                }
                
                @media (max-width: 576px) {
                    .steam-container {
                        width: 150px;
                        height: 60px;
                        top: 25%;
                    }
                    
                    .steam {
                        width: 30px;
                        height: 40px;
                    }
                    
                    @keyframes steamAnimation {
                        0% {
                            transform: translateY(0) scale(0.5);
                            opacity: 0;
                        }
                        15% {
                            opacity: var(--max-opacity, 0.75);
                        }
                        90% {
                            transform: translateY(-70px) translateX(var(--x-offset)) scale(1.5);
                            opacity: 0.1;
                        }
                        100% {
                            transform: translateY(-85px) translateX(var(--x-offset)) scale(1.7);
                            opacity: 0;
                        }
                    }
                }
            `;
            document.head.appendChild(steamStyles);
        }
        
        // Adăugăm totul în container
        sliderContainer.innerHTML = slidesHTML + navigationHTML + modalHTML;
        
        // Adăugăm stiluri pentru cercurile decorative dacă nu există deja
        if (!document.getElementById('panini-circle-styles')) {
            const circleStyles = document.createElement('style');
            circleStyles.id = 'panini-circle-styles';
            circleStyles.textContent = `
                .panini-decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    z-index: 1;
                    transition: transform 0.8s ease, opacity 0.5s ease;
                }
                
                .panini-circle-1 {
                    width: 80px;
                    height: 80px;
                    background-color: rgba(233, 67, 53, 0.2);
                    left: 20px;
                    bottom: 20%;
                }
                
                .panini-circle-2 {
                    width: 60px;
                    height: 60px;
                    background-color: rgba(233, 67, 53, 0.15);
                    left: 50%;
                    top: 10%;
                }
                
                .panini-circle-3 {
                    width: 120px;
                    height: 120px;
                    background-color: rgba(233, 67, 53, 0.1);
                    right: 10%;
                    bottom: 10%;
                }
                
                @media (max-width: 768px) {
                    .panini-circle-1 {
                        width: 60px;
                        height: 60px;
                        left: 10px;
                    }
                    
                    .panini-circle-2 {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .panini-circle-3 {
                        width: 80px;
                        height: 80px;
                    }
                }
                
                @media (max-width: 576px) {
                    .panini-circle-1 {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .panini-circle-2 {
                        width: 30px;
                        height: 30px;
                    }
                    
                    .panini-circle-3 {
                        width: 60px;
                        height: 60px;
                    }
                }
            `;
            document.head.appendChild(circleStyles);
        }
        
        // Adăugăm event listeneri după ce am construit slider-ul
        addEventListeners();
    }
    
    // Funcția pentru a actualiza poziția slide-urilor
    function updateSliderPosition() {
        const slides = document.querySelectorAll('.panini-slide');
        const dots = document.querySelectorAll('.panini-dot');
        
        // Determinăm tipul de dispozitiv
        const isMobile = window.innerWidth <= 576;
        const isTablet = window.innerWidth > 576 && window.innerWidth <= 768;
        
        // Setăm CSS inline pentru toate titlurile pentru a asigura că sunt vizibile
        const allTitles = document.querySelectorAll('.panini-title');
        allTitles.forEach(title => {
            title.style.display = 'block';
            title.style.visibility = 'visible';
            title.style.position = 'relative';
            title.style.zIndex = '10';
        });
        
        // Determinăm duratele de tranziție
        const transitionDuration = isMobile ? '0.6s' : isTablet ? '0.7s' : '0.8s';
        
        // Asigurăm-ne că toate slide-urile sunt inițial vizibile, dar cu opacitate 0
        slides.forEach(slide => {
            slide.style.display = 'flex';
            slide.style.visibility = 'visible';
        });
        
        slides.forEach((slide, index) => {
            const distance = index - currentPaniniIndex;
            
            // Obținem elementele din slide care vor fi animate
            const slideLeft = slide.querySelector('.panini-slide-left');
            const slideRight = slide.querySelector('.panini-slide-right');
            const paniniImage = slide.querySelector('.panini-image');
            const paniniTitle = slide.querySelector('.panini-title');
            const paniniDescription = slide.querySelector('.panini-description');
            const paniniAttributes = slide.querySelector('.panini-attributes');
            const paniniButton = slide.querySelector('.panini-cta-button');
            const decorationCircles = slide.querySelectorAll('.panini-decoration-circle');
            
            // Obținem containerul de aburi din acest slide
            const steamContainer = slide.querySelector('.steam-container');
            
            // Aplicăm transformări diferite în funcție de poziția slide-ului
            if (distance === 0) {
                // Slide-ul activ - afișăm toate elementele cu tranziții
                slide.style.zIndex = '5';
                slide.style.position = 'absolute'; // Poziționăm absolut pentru a rămâne pe loc
                slide.style.transform = 'none'; // Nu mai mișcăm întregul slide
                
                // Tranziție pentru background
                slideLeft.style.transition = `background-color ${transitionDuration} ease-in-out, opacity ${transitionDuration} ease-in-out`;
                slideRight.style.transition = `background-color ${transitionDuration} ease-in-out, opacity ${transitionDuration} ease-in-out`;
                slideLeft.style.opacity = '1';
                slideRight.style.opacity = '1';
                
                // Tranziție pentru imagine
                if (paniniImage) {
                    paniniImage.style.transform = 'scale(1) translateX(0)';
                    paniniImage.style.opacity = '1';
                    paniniImage.style.visibility = 'visible';
                    paniniImage.style.transition = `transform ${transitionDuration} ease-out, opacity ${transitionDuration} ease-in-out, visibility 0s`;
                }
                
                // Tranziție pentru titlu
                if (paniniTitle) {
                    paniniTitle.style.transform = 'translateY(0)';
                    paniniTitle.style.opacity = '1';
                    paniniTitle.style.visibility = 'visible';
                    paniniTitle.style.transition = `transform ${transitionDuration} ease-out 0.1s, opacity ${transitionDuration} ease-in-out 0.1s, visibility 0s`;
                }
                
                // Tranziție pentru descriere
                if (paniniDescription) {
                    paniniDescription.style.transform = 'translateY(0)';
                    paniniDescription.style.opacity = '1';
                    paniniDescription.style.visibility = 'visible';
                    paniniDescription.style.transition = `transform ${transitionDuration} ease-out 0.2s, opacity ${transitionDuration} ease-in-out 0.2s, visibility 0s`;
                }
                
                // Tranziție pentru atribute
                if (paniniAttributes) {
                    paniniAttributes.style.transform = 'translateY(0)';
                    paniniAttributes.style.opacity = '1';
                    paniniAttributes.style.visibility = 'visible';
                    paniniAttributes.style.transition = `transform ${transitionDuration} ease-out 0.3s, opacity ${transitionDuration} ease-in-out 0.3s, visibility 0s`;
                }
                
                // Tranziție pentru buton
                if (paniniButton) {
                    paniniButton.style.transform = 'translateY(0)';
                    paniniButton.style.opacity = '1';
                    paniniButton.style.visibility = 'visible';
                    paniniButton.style.transition = `transform ${transitionDuration} ease-out 0.4s, opacity ${transitionDuration} ease-in-out 0.4s, visibility 0s`;
                }
                
                // Tranziție pentru cercurile decorative
                decorationCircles.forEach((circle, i) => {
                    circle.style.transform = 'scale(1)';
                    circle.style.opacity = '1';
                    circle.style.visibility = 'visible';
                    circle.style.transition = `transform ${transitionDuration} ease-out ${0.2 + i * 0.1}s, opacity ${transitionDuration} ease-in-out ${0.2 + i * 0.1}s, visibility 0s`;
                });
                
                // Activăm efectul de aburi doar pentru slide-ul activ
                if (steamContainer) {
                    steamContainer.style.opacity = '1';
                    steamContainer.style.visibility = 'visible';
                }
                
            } else {
                // Slide-uri inactive (ascunse)
                slide.style.zIndex = '1';
                slide.style.position = 'absolute'; // Poziționăm absolut pentru a rămâne pe loc
                slide.style.transform = 'none'; // Nu mai mișcăm întregul slide
                
                // Aici setăm tranziții diferite pentru slide-urile anterioare și următoare
                const direction = distance < 0 ? "previous" : "next";
                const offsetX = direction === "previous" ? "-100px" : "100px";
                const rotationY = direction === "previous" ? "-15deg" : "15deg";
                const offsetY = direction === "previous" ? "-30px" : "30px";
                const offsetYSmall = direction === "previous" ? "-20px" : "20px";
                
                // Tranziție pentru background-uri - e important ca acestea să fie vizibile pentru a evita albul
                slideLeft.style.transition = `background-color ${transitionDuration} ease-in-out, opacity ${transitionDuration} ease-in-out`;
                slideRight.style.transition = `background-color ${transitionDuration} ease-in-out, opacity ${transitionDuration} ease-in-out`;
                
                // Setăm opacitatea la 0.01 în loc de 0 pentru a evita dispariția completă
                slideLeft.style.opacity = '0.01';
                slideRight.style.opacity = '0.01';
                
                // Tranziție pentru imagine
                if (paniniImage) {
                    paniniImage.style.transform = `scale(0.8) translateX(${offsetX}) rotateY(${rotationY})`;
                    paniniImage.style.opacity = '0';
                    paniniImage.style.visibility = 'hidden';
                    paniniImage.style.transition = `transform ${transitionDuration} ease-in, opacity ${transitionDuration} ease-in, visibility 0s linear ${transitionDuration}`;
                }
                
                // Tranziție pentru titlu
                if (paniniTitle) {
                    paniniTitle.style.transform = `translateY(${offsetY})`;
                    paniniTitle.style.opacity = '0';
                    paniniTitle.style.visibility = 'hidden';
                    paniniTitle.style.transition = `transform ${transitionDuration} ease-in, opacity ${transitionDuration} ease-in, visibility 0s linear ${transitionDuration}`;
                }
                
                // Tranziție pentru restul elementelor text
                const textElements = [paniniDescription, paniniAttributes, paniniButton];
                textElements.forEach((element, i) => {
                    if (element) {
                        element.style.transform = `translateY(${offsetYSmall})`;
                        element.style.opacity = '0';
                        element.style.visibility = 'hidden';
                        element.style.transition = `transform ${transitionDuration} ease-in, opacity ${transitionDuration} ease-in, visibility 0s linear ${transitionDuration}`;
                    }
                });
                
                // Tranziție pentru cercuri decorative
                decorationCircles.forEach(circle => {
                    circle.style.transform = 'scale(0.6)';
                    circle.style.opacity = '0';
                    circle.style.visibility = 'hidden';
                    circle.style.transition = `transform ${transitionDuration} ease-in, opacity ${transitionDuration} ease-in, visibility 0s linear ${transitionDuration}`;
                });
                
                // Dezactivăm efectul de aburi pentru slide-urile inactive
                if (steamContainer) {
                    steamContainer.style.opacity = '0';
                    steamContainer.style.visibility = 'hidden';
                }
            }
        });
        
        // Actualizăm duratele de tranziție în funcție de dispozitiv
        updateTransitionDurations(isMobile, isTablet);
        
        // Actualizăm starea butoanelor de navigare
        dots.forEach((dot, index) => {
            if (index === currentPaniniIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Funcție pentru actualizarea duratelor de tranziție în funcție de dispozitiv
    function updateTransitionDurations(isMobile, isTablet) {
        // Eliminăm stilurile vechi dacă există
        const oldStyle = document.getElementById('panini-transition-styles');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // Determinăm duratele de tranziție în funcție de dispozitiv
        const transformDuration = isMobile ? '0.6s' : isTablet ? '0.7s' : '0.8s';
        const opacityDuration = isMobile ? '0.4s' : isTablet ? '0.5s' : '0.6s';
        const timingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)'; // Easing function pentru o mișcare mai naturală
        
        // Creăm un nou element style
        const newStyle = document.createElement('style');
        newStyle.id = 'panini-transition-styles';
        newStyle.textContent = `
            .panini-slide {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                transition: z-index 0.1s;
                overflow: hidden; /* Adăugăm overflow hidden pentru a preveni elemente să iasă din container */
            }
            
            .panini-slide-left, 
            .panini-slide-right {
                transition: background-color ${transformDuration} ${timingFunction},
                          opacity ${opacityDuration} ease;
            }
            
            /* Asigurăm opacitatea minimă pentru a preveni dispariția completă */
            .panini-slide-left[style*="opacity: 0"],
            .panini-slide-right[style*="opacity: 0"] {
                opacity: 0.01 !important;
            }
            
            .panini-image {
                transform-origin: center center;
                backface-visibility: hidden;
                will-change: transform, opacity; /* Optimizare pentru animații */
                z-index: 2;
            }
            
            .panini-title {
                color: white;
                will-change: transform, opacity; /* Optimizare pentru animații */
                z-index: 3;
            }
            
            .panini-description, 
            .panini-attributes, 
            .panini-cta-button {
                will-change: transform, opacity; /* Optimizare pentru animații */
                z-index: 3;
            }
            
            /* Prevenim dispariția completă a slide-urilor în timpul tranzițiilor */
            .panini-slider-container {
                background-color: transparent; /* Asigurăm că containerul nu are background care să interfereze */
            }
        `;
        
        // Adăugăm stilul în head
        document.head.appendChild(newStyle);
    }
    
    // Adăugăm support pentru poziționarea corectă a imaginilor de panini
    function setupImageContainers() {
        const imageContainers = document.querySelectorAll('.panini-image-container');
        
        imageContainers.forEach(container => {
            container.style.overflow = 'visible';
            container.style.transformStyle = 'preserve-3d';
            
            const image = container.querySelector('.panini-image');
            if (image) {
                image.style.transformOrigin = 'center center';
            }
        });
        
        // Ne asigurăm că titlurile și alte elemente sunt vizibile
        const titles = document.querySelectorAll('.panini-title');
        titles.forEach(title => {
            title.style.visibility = 'visible';
            title.style.opacity = '1';
            title.style.position = 'relative'; // Adăugăm poziție relativă pentru a asigura că elementul este poziționat corect
            title.style.zIndex = '5'; // Asigurăm că titlul are un z-index ridicat
        });
        
        // Adăugăm efectul de aburi
        createSteamEffect();
    }
    
    // Adăugăm event listeners pentru navigare
    function addEventListeners() {
        const leftArrow = document.querySelector('.panini-arrow-left');
        const rightArrow = document.querySelector('.panini-arrow-right');
        const dots = document.querySelectorAll('.panini-dot');
        
        // Event listeners pentru săgeți
        leftArrow.addEventListener('click', goToPrevPanini);
        rightArrow.addEventListener('click', goToNextPanini);
        
        // Event listeners pentru butoanele de navigare
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToPanini(index);
            });
        });
        
        // Event listener pentru butoanele de acțiune de pe fiecare slide
        const ctaButtons = document.querySelectorAll('.panini-cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const paniniIndex = parseInt(this.getAttribute('data-index'));
                showPaniniDetails(paniniIndex);
            });
        });
        
        // Event listeners pentru modal
        const modal = document.getElementById('panini-details-modal');
        const closeBtn = document.querySelector('.panini-modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        }
        
        // Event listener pentru butonul de adăugare în coș
        const addToCartBtn = document.querySelector('.panini-modal-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                // Aici se poate adăuga logica de adăugare în coș
                alert('Produsul a fost adăugat în coș!');
                closeModal();
            });
        }
        
        // Adăugăm suport pentru gesturi swipe pe mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe stânga
                goToNextPanini();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe dreapta
                goToPrevPanini();
            }
        }
        
        // Adăugăm keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal && modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            } else {
                if (e.key === 'ArrowLeft') {
                    goToPrevPanini();
                } else if (e.key === 'ArrowRight') {
                    goToNextPanini();
                }
            }
        });
        
        // Adăugăm event listeners pentru recrearea efectului de aburi la schimbarea slide-ului
        leftArrow.addEventListener('click', createSteamEffect);
        rightArrow.addEventListener('click', createSteamEffect);
        dots.forEach(dot => {
            dot.addEventListener('click', createSteamEffect);
        });
    }
    
    // Funcții de navigare
    function goToPrevPanini() {
        currentPaniniIndex = (currentPaniniIndex - 1 + totalPaninis) % totalPaninis;
        updateSliderPosition();
    }
    
    function goToNextPanini() {
        currentPaniniIndex = (currentPaniniIndex + 1) % totalPaninis;
        updateSliderPosition();
    }
    
    function goToPanini(index) {
        if (index >= 0 && index < totalPaninis) {
            currentPaniniIndex = index;
            updateSliderPosition();
        }
    }
    
    // Funcția pentru afișarea detaliilor despre panini într-un modal elegant
    function showPaniniDetails(index) {
        const panini = paninis[index];
        const modal = document.getElementById('panini-details-modal');
        
        if (modal) {
            // Actualizăm conținutul modalului cu detaliile sandwich-ului selectat
            const modalImage = modal.querySelector('.panini-modal-image img');
            const modalTitle = modal.querySelector('.panini-modal-title');
            const modalDescription = modal.querySelector('.panini-modal-description');
            const modalAttributes = modal.querySelector('.panini-modal-attributes');
            const modalPrice = modal.querySelector('.panini-modal-price');
            
            // Setăm detaliile
            if (modalImage) modalImage.src = panini.image;
            if (modalImage) modalImage.alt = panini.name;
            if (modalTitle) modalTitle.textContent = panini.name;
            if (modalDescription) modalDescription.textContent = panini.description;
            if (modalPrice) modalPrice.textContent = panini.price;
            
            // Adăugăm atributele
            if (modalAttributes) {
                modalAttributes.innerHTML = '';
                panini.attributes.forEach(attr => {
                    const attributeEl = document.createElement('span');
                    attributeEl.className = 'panini-modal-attribute';
                    attributeEl.textContent = attr;
                    modalAttributes.appendChild(attributeEl);
                });
            }
            
            // Afișăm modalul
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenim scroll-ul pe pagină
        }
    }
    
    // Funcția pentru închiderea modalului
    function closeModal() {
        const modal = document.getElementById('panini-details-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Reactivăm scroll-ul pe pagină
        }
    }
    
    // Inițializăm sliderul
    buildSlider();
    setupImageContainers();
    
    // Adăugăm un cod de depanare pentru a ne asigura că titlurile sunt vizibile
    const debugTitles = () => {
        console.log('Debugging panini titles...');
        const allTitles = document.querySelectorAll('.panini-title');
        
        allTitles.forEach((title, index) => {
            // Aplicăm stiluri direct pentru a asigura vizibilitatea
            title.style.display = 'block';
            title.style.visibility = 'visible';
            title.style.opacity = '1';
            title.style.color = 'white';
            title.style.zIndex = '10';
            title.style.position = 'relative';
            title.style.transform = 'none';
            
            // Verificăm conținutul titlului
            console.log(`Title ${index}:`, title.textContent, title.getBoundingClientRect());
        });
    };

    // Rulăm funcția de depanare
    debugTitles();

    // Adăugăm un event listener pentru a rula funcția de depanare după fiecare schimbare de slide
    const checkTitlesAfterTransition = () => {
        setTimeout(debugTitles, 500); // Rulăm după ce tranziția s-a terminat
    };

    // Adăugăm event listeners pentru butoanele de navigare
    document.querySelector('.panini-arrow-left')?.addEventListener('click', checkTitlesAfterTransition);
    document.querySelector('.panini-arrow-right')?.addEventListener('click', checkTitlesAfterTransition);
    document.querySelectorAll('.panini-dot').forEach(dot => {
        dot.addEventListener('click', checkTitlesAfterTransition);
    });

    // Actualizăm poziția slider-ului după inițializare
    updateSliderPosition();
    checkTitlesAfterTransition(); // Verificăm din nou după actualizarea poziției
    
    // Ajustăm sliderul pentru diferite dimensiuni de ecran
    window.addEventListener('resize', function() {
        updateSliderPosition();
        adjustSliderHeight(); // Adăugăm o chemare explicită aici
    });
    
    // Adăugăm script pentru adaptarea automată a înălțimii slider-ului pe mobile
    function adjustSliderHeight() {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 768) {
            // Pe dispozitive mobile, folosim înălțimea viewport-ului, dar nu mai puțin de 800px
            const leftHeight = document.querySelector('.panini-slide-left')?.offsetHeight || 400;
            const rightHeight = document.querySelector('.panini-slide-right')?.offsetHeight || 400;
            const totalHeight = Math.max(leftHeight + rightHeight, 800);
            const viewportHeight = Math.max(windowHeight * 0.95, totalHeight); // 95% din înălțimea vizibilă sau totalHeight
            
            sliderContainer.style.height = `${viewportHeight}px`;
        } else if (windowWidth <= 992) {
            // Pe tablete, folosim o înălțime de 95vh, dar nu mai puțin de 700px
            sliderContainer.style.height = `${Math.max(windowHeight * 0.95, 700)}px`;
        } else {
            // Pe desktop, folosim o înălțime de 95vh, dar nu mai puțin de 750px
            sliderContainer.style.height = `${Math.max(windowHeight * 0.95, 750)}px`;
        }
        
        // Mărim și dimensiunea imaginilor pentru a ocupa mai mult spațiu
        const images = document.querySelectorAll('.panini-image');
        images.forEach(img => {
            if (windowWidth <= 576) {
                img.style.maxWidth = '95%';
                img.style.maxHeight = '70%';
            } else if (windowWidth <= 768) {
                img.style.maxWidth = '100%';
                img.style.maxHeight = '80%';
            } else {
                img.style.maxWidth = '100%';
                img.style.maxHeight = '90%';
            }
        });
    }
    
    // Ajustăm înălțimea inițială și la redimensionare
    adjustSliderHeight();
    window.addEventListener('resize', adjustSliderHeight);
    
    // Ajustăm înălțimea și la încărcarea completă a paginii
    window.addEventListener('load', adjustSliderHeight);

    // Adăugăm o funcție pentru a crea și anima efectul de aburi
    function createSteamEffect() {
        // Găsim toate containerele de aburi
        const steamContainers = document.querySelectorAll('.steam-container');
        
        // Pentru fiecare container, adăugăm elementele de abur
        steamContainers.forEach((container, containerIndex) => {
            // Identificăm imaginea asociată pentru a ajusta poziția aburilor
            const slideEl = container.closest('.panini-slide');
            const paniniImage = slideEl ? slideEl.querySelector('.panini-image') : null;
            
            // Golim containerul în caz că există deja aburi
            container.innerHTML = '';
            
            // Ajustăm poziția containerului de aburi în funcție de imaginea panini și tipul de sandwich
            if (paniniImage) {
                // Poziții ușor diferite pentru fiecare tip de sandwich pentru un efect naturalist
                const topOffsets = [20, 18, 22, 19]; // Procente diferite pentru fiecare panini
                container.style.top = `${topOffsets[containerIndex % topOffsets.length]}%`;
            }
            
            // Numărul de elemente de abur variază ușor pentru un efect mai natural
            const steamCount = 7 + Math.floor(Math.random() * 5); // Între 7 și 11 aburi
            
            // Adăugăm elementele de abur distribuite în semi-arc în partea de sus a sandwich-ului
            for (let i = 0; i < steamCount; i++) {
                const steam = document.createElement('div');
                steam.className = `steam steam-${i % 3 + 1}`; // Adăugăm variație prin clasele steam-1, steam-2, steam-3
                
                // Poziționare aleatorie dar concentrată în partea centrală
                // Mai concentrat în centru pentru a sugera că aburul vine din mijlocul sandwich-ului
                const distributionWidth = 80; // Procent din lățimea containerului
                const leftPos = (100 - distributionWidth) / 2 + Math.random() * distributionWidth;
                steam.style.left = `${leftPos}%`;
                steam.style.bottom = '0';
                
                // Determinăm offset-ul pe orizontală în funcție de poziția pe orizontală
                // Aburii din centru tind să urce mai drept, cei din laterale tind să se disperseze
                const centralityFactor = Math.abs(leftPos - 50) / 50; // 0 la centru, 1 la margini
                const xOffset = (Math.random() - 0.5) * 60 * centralityFactor; // -30px la +30px, mai pronunțat la margini
                steam.style.setProperty('--x-offset', `${xOffset}px`);
                
                // Variație în dimensiune - aburii din centru sunt ușor mai mari
                const sizeVariation = 1 - centralityFactor * 0.3 + Math.random() * 0.3; // Între 70% și 130% din dimensiunea de bază
                steam.style.transform = `scale(${sizeVariation})`;
                
                // Delay aleatoriu pentru fiecare abur pentru un efect mai natural
                const delay = Math.random() * 8; // Delay de până la 8 secunde pentru mai multă variație
                steam.style.animationDelay = `${delay}s`;
                
                // Durată ușor aleatorie pentru fiecare abur
                const duration = 3 + Math.random() * 2; // Între 3 și 5 secunde
                steam.style.setProperty('--duration', `${duration}s`);
                
                container.appendChild(steam);
            }
        });
    }
}); 