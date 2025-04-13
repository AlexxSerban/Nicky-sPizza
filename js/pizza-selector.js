document.addEventListener('DOMContentLoaded', function() {
    // Define pizza varieties
    const pizzaVarieties = [
        {
            name: 'Diavola',
            price: '46 Lei',
            ingredients: 'Sos de roșii San Marzano, mozzarella di bufala, salam picant, ardei iute, oregano, busuioc proaspăt',
            description: 'O explozie de savoare picantă, perfectă pentru iubitorii de gust intens. Salamul nostru picant combinat cu ardeiul iute și sosul de roșii San Marzano oferă un echilibru perfect între savoare și arome picante.',
            bgColor: '#ca0017', // Roșu pentru pizza principală
            image: 'images/pizzaDiavola.png'
        },
        {
            name: 'Prosciutto e Rucola',
            price: '38 Lei',
            ingredients: 'Sos de roșii San Marzano, mozzarella fior di latte, prosciutto crudo, rucola, parmezan, ulei de măsline extravirgin',
            description: 'O combinație rafinată între gustul sărat al prosciutto-ului și prospețimea rucolei, completată de parmezanul aromat și mozzarella fior di latte de cea mai înaltă calitate.',
            bgColor: '#376e4e', // Verde pentru alternare
            image: 'images/pizzaProsciuttoERucolla.png'
        },
        {
            name: 'Maiale e Cipolle',
            price: '40 Lei',
            ingredients: 'Sos de roșii San Marzano, mozzarella fior di latte, carne de porc condimentată, ceapă roșie, oregano, busuioc',
            description: 'Carnea suculentă de porc se îmbină perfect cu dulceața cepei roșii caramelizate, oferind o experiență culinară savuroasă cu fiecare felie.',
            bgColor: '#ca0017',
            image: 'images/pizzaMaialeECipolle.png'
        },
        {
            name: 'Bianca',
            price: '36 Lei',
            ingredients: 'Smântână, mozzarella fior di latte, brânză ricotta, busuioc proaspăt, ulei de măsline extravirgin, ierburi aromatice',
            description: 'O pizza delicată, fără sos de roșii, cu o textură cremoasă datorită combinației de brânzeturi fine și smântână. Un deliciu simplu dar rafinat pentru cunoscători.',
            bgColor: '#376e4e',
            image: 'images/pizzaBianca.png'
        },
        {
            name: 'Margherita',
            price: '32 Lei',
            ingredients: 'Sos de roșii San Marzano, mozzarella di bufala, busuioc proaspăt, ulei de măsline extravirgin, sare de mare',
            description: 'Clasica pizza napoletană în toată splendoarea ei. Simplitatea perfectă a ingredientelor de cea mai bună calitate - roșii dulci, mozzarella cremoasă și busuioc aromat.',
            bgColor: '#ca0017',
            image: 'images/pizzaMargherita.png'
        },
        {
            name: 'Cotto e Funghi',
            price: '42 Lei',
            ingredients: 'Sos de roșii San Marzano, mozzarella fior di latte, șuncă artizanală, ciuperci champignon proaspete, oregano',
            description: 'Combinația tradițională de șuncă și ciuperci, pregătită după rețeta autentică italiană. Textura suculentă a ciupercilor și aroma șuncii se completează perfect.',
            bgColor: '#376e4e',
            image: 'images/pizzaCottoEFunghi.png'
        },
        {
            name: 'Speck e Tartufo',
            price: '44 Lei',
            ingredients: 'Cremă de trufe, mozzarella fior di latte, speck (șuncă afumată), ciuperci champignon, ulei de trufe, parmezan',
            description: 'O pizza sofisticată cu arome intense de trufe și speck afumat. Crema de trufe și uleiul de trufe completează perfect textura și gustul șuncii afumate și al ciupercilor.',
            bgColor: '#ca0017',
            image: 'images/pizzaSpeckTartufo.png'
        }
    ];

    // Get DOM elements
    const pizzaNames = document.querySelectorAll('.pizza-name');
    const pizzaSlider = document.querySelector('.pizza-slider');
    const pizzaImage = document.querySelector('.pizza-image img');
    const arrowBtn = document.querySelector('.arrow-btn button');
    const menuSection = document.querySelector('.pizza-section');

    // Actualizează numele de pizza în HTML
    function updatePizzaNames() {
        pizzaNames.forEach((nameElement, index) => {
            // Verifică dacă există un nume corespunzător în array-ul pizzaVarieties
            if (pizzaVarieties[index]) {
                nameElement.textContent = pizzaVarieties[index].name;
            }
        });
    }

    let currentIndex = 0;
    
    // Poziționează numele de pizza în cerc complet (360 de grade) în jurul pizzei
    function positionPizzaNames() {
        const containerWidth = pizzaSlider.offsetWidth;
        
        // Diferențiem raza cercului în funcție de dimensiunea ecranului
        // Pentru ecrane mai mici, creștem procentul pentru a mări distanța butoanelor de pizza
        let radiusPercent = 0.28; // Valoarea implicită pentru desktop
        
        // Optimizare bazată pe dimensiunea reală a viewport-ului
        // Mărește distanța pe ecrane mai mici (tablete și telefoane)
        if (window.innerWidth <= 992) radiusPercent = 0.35;
        if (window.innerWidth <= 768) radiusPercent = 0.40;
        if (window.innerWidth <= 576) radiusPercent = 0.45;
        
        // Adăugăm un ajustare specială pentru dispozitive super-mici
        if (window.innerWidth <= 375) radiusPercent = 0.47;
        if (window.innerWidth <= 320) radiusPercent = 0.50;
        
        // Ajustare pentru orientarea landscape - reducem raza pentru a ține butoanele mai aproape
        if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
            radiusPercent = 0.35; // Reducem pentru landscape
        }
        
        // Calculăm raza, dar menținem un maxim pentru ecrane mari
        const radius = Math.min(containerWidth * radiusPercent, 310);
        
        // Obține dimensiunile imaginii pizzei
        const pizzaImageRect = pizzaImage.getBoundingClientRect();
        const centerX = containerWidth / 2;
        // Folosim centrul real al containerului
        const centerY = pizzaSlider.offsetHeight / 2;
        
        // Determinăm dacă sunt prea multe butoane pentru dispozitive mici
        // și ajustăm offsetul pentru a evita suprapunerea
        let angleOffset = 10; // Valoarea implicită
        
        // Creștem offsetul pe dispozitive mai mici pentru a evita suprapunerea butoanelor
        if (window.innerWidth <= 576) angleOffset = 15;
        if (window.innerWidth <= 375) angleOffset = 20;
        
        // Distribuie numele uniform pe un cerc complet (360 de grade)
        // Adăugăm un offset pentru a poziționa mai bine primele și ultimele butoane
        const totalAngle = 360 - (angleOffset * 2);
        const angleStep = totalAngle / pizzaNames.length;
        
        pizzaNames.forEach((name, index) => {
            // Calculează poziția pe cerc complet, cu offset pentru a evita suprapunerea
            const angle = -90 + angleOffset + angleStep * index;
            const rad = angle * (Math.PI / 180);
            
            // Folosim cosinus și sinus pentru a poziționa pe un cerc
            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);
            
            // Aplică poziția, centrând textul
            name.style.left = `${x}px`;
            name.style.top = `${y}px`;
            
            // Adaugă atribut data-index pentru referință ușoară
            name.setAttribute('data-index', index);
            
            // Adaugă event listener pentru click
            name.addEventListener('click', function() {
                selectPizzaVariety(index);
            });
        });
    }
    
    // Inițializează cu ultima varietate de pizza
    function initialize() {
        // Actualizează numele pizzelor în HTML
        updatePizzaNames();
        
        // Obține varietatea inițială - setăm indexul la ultima pizza (Speck e Tartufo) pentru a corespunde cu HTML-ul
        currentIndex = pizzaVarieties.length - 1;
        const variety = pizzaVarieties[currentIndex];
        
        // Setează imaginea inițială
        pizzaImage.src = variety.image;
        
        // Setează culoarea de fundal inițială
        setBackgroundColor(variety.bgColor);
        
        // Actualizează titlul secțiunii și descrierea
        updateSectionTitle(variety);
        
        // Poziționează numele de pizza
        positionPizzaNames();
        
        // Evidențiază pizza activă inițial
        pizzaNames.forEach(name => {
            name.classList.remove('active');
            name.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            name.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        });
        
        pizzaNames[currentIndex].classList.add('active');
        
        // Aplicăm culoarea corectă butonului activ
        const isRedBackground = variety.bgColor === '#ca0017';
        pizzaNames[currentIndex].style.backgroundColor = isRedBackground ? 
            'rgba(55, 110, 78, 0.9)' : 'rgba(202, 0, 23, 0.9)';
        
        // Actualizăm și umbra pentru a se potrivi cu noua culoare
        pizzaNames[currentIndex].style.boxShadow = isRedBackground ? 
            '0 5px 15px rgba(55, 110, 78, 0.4)' : '0 5px 15px rgba(202, 0, 23, 0.4)';
        
        // Adaugă stilurile pentru hover
        addHoverStyles(isRedBackground);
    }
    
    // Funcție pentru a adăuga stiluri inline pentru hover
    function addHoverStyles(isRedBackground) {
        // Creează un stil dinamic pentru hover
        const styleId = 'dynamic-pizza-hover';
        let styleElement = document.getElementById(styleId);
        
        // Dacă stilul există deja, îl eliminăm
        if (styleElement) {
            styleElement.remove();
        }
        
        // Creăm un nou element de stil
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        
        // Definim culoarea de hover în funcție de fundalul curent
        const hoverColor = isRedBackground ? 
            'rgba(55, 110, 78, 0.7)' : 'rgba(202, 0, 23, 0.7)';
        
        // Adăugăm regula CSS pentru hover
        styleElement.textContent = `
            .pizza-name:not(.active):hover {
                background-color: ${hoverColor} !important;
                transform: translate(-50%, -50%) scale(1.05) !important;
            }
        `;
        
        // Adăugăm stilul la document
        document.head.appendChild(styleElement);
    }
    
    // Funcție pentru animarea schimbării culorii de fundal
    function setBackgroundColor(newColor) {
        // Actualizează fundalul secțiunii
        menuSection.style.transition = 'background 0.8s ease';
        
        // Creează un gradient subtil, mai deschis sus și mai puternic jos
        const lighterColor = adjustColor(newColor, 60);
        menuSection.style.background = `linear-gradient(to bottom, ${lighterColor} 0%, ${newColor} 100%)`;
        
        // Actualizează culorile textului pentru contrast
        const isDarkColor = isColorDark(newColor);
        updateTextColors(isDarkColor, newColor);
        
        // Adaugă stilurile pentru hover
        const isRedBackground = newColor === '#ca0017';
        addHoverStyles(isRedBackground);
    }
    
    // Funcție pentru a determina dacă o culoare este închisă
    function isColorDark(hexColor) {
        // Convertește hex în RGB
        const r = parseInt(hexColor.substring(1, 3), 16);
        const g = parseInt(hexColor.substring(3, 5), 16);
        const b = parseInt(hexColor.substring(5, 7), 16);
        
        // Calculează luminanța relativă
        // Formula din W3C Web Content Accessibility Guidelines (WCAG) 2.0
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Returnează true dacă culoarea este închisă (luminanță < 0.5)
        return luminance < 0.5;
    }
    
    // Funcție pentru actualizarea culorilor textului în funcție de fundal
    function updateTextColors(isDark, baseColor) {
        const sectionTitle = menuSection.querySelector('.section-title');
        const menuItems = menuSection.querySelectorAll('.menu-item');
        
        // Actualizează culoarea butonului activ - verde pe fundal roșu, roșu pe fundal verde
        const activeButton = document.querySelector('.pizza-name.active');
        if (activeButton) {
            // Determinăm dacă fundalul este roșu
            const isRedBackground = baseColor === '#ca0017';
            
            // Setăm culoarea butonului activ
            activeButton.style.transition = 'background-color 0.3s ease';
            activeButton.style.backgroundColor = isRedBackground ? 'rgba(55, 110, 78, 0.9)' : 'rgba(202, 0, 23, 0.9)'; // Verde sau Roșu
            
            // Actualizăm și umbra pentru a se potrivi cu noua culoare
            activeButton.style.boxShadow = isRedBackground ? 
                '0 5px 15px rgba(55, 110, 78, 0.4)' : '0 5px 15px rgba(202, 0, 23, 0.4)';
        }
        
        if (sectionTitle) {
            // Actualizează culorile titlului secțiunii
            const heading = sectionTitle.querySelector('h2');
            const description = sectionTitle.querySelector('p');
            
            if (heading) {
                heading.style.transition = 'color 0.8s ease';
                heading.style.color = isDark ? '#ffffff' : '#1e3932';
                // Adaugă umbră pentru lizibilitate pe fundaluri colorate
                heading.style.textShadow = isDark ? '0 2px 4px rgba(0,0,0,0.3)' : 'none';
            }
            
            if (description) {
                description.style.transition = 'color 0.8s ease';
                description.style.color = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)';
                description.style.textShadow = isDark ? '0 1px 2px rgba(0,0,0,0.2)' : 'none';
            }
            
            // Actualizează linia de sub titlu
            if (heading) {
                const afterElement = document.createElement('style');
                afterElement.textContent = `
                    .section-title h2::after {
                        background-color: ${isDark ? '#ffffff' : '#ca0017'} !important;
                        transition: background-color 0.8s ease;
                    }
                `;
                
                // Elimină orice stil adăugat anterior
                const oldStyle = document.getElementById('dynamic-heading-style');
                if (oldStyle) {
                    oldStyle.remove();
                }
                
                afterElement.id = 'dynamic-heading-style';
                document.head.appendChild(afterElement);
            }
        }
        
        // Păstrează elementele de meniu cu fundal alb pentru lizibilitate
        menuItems.forEach(item => {
            item.style.transition = 'all 0.8s ease';
            item.style.backgroundColor = '#ffffff';
            
            // Adaugă o umbră subtilă
            item.style.boxShadow = `0 5px 20px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'}`;
            
            // Adaugă o bordură subtilă care să se potrivească cu fundalul
            item.style.borderLeft = `4px solid ${baseColor}`;
        });
    }
    
    // Funcție pentru actualizarea titlului secțiunii și descrierii
    function updateSectionTitle(variety) {
        const sectionTitle = menuSection.querySelector('.section-title');
        if (sectionTitle) {
            const heading = sectionTitle.querySelector('h2');
            const description = sectionTitle.querySelector('p');
            
            // Determinăm stilul de animație pentru Speck e Tartufo
            // Vom folosi aceeași animație pentru toate tipurile de pizza
            const speckTartufoStyle = 2; // Forțăm același stil pentru toate varietățile (reveal-text-rotate)
            
            if (heading) {
                // Actualizează titlul cu numele pizzei
                // Adaugă un efect de tranziție fade
                heading.style.opacity = '0';
                
                // Curățăm orice animație anterioară
                heading.innerHTML = '';
                
                setTimeout(() => {
                    // Folosim animația de rotație pentru toate tipurile de pizza (ca la Speck e Tartufo)
                    heading.innerHTML = `<span class="reveal-text-rotate">${variety.name.toUpperCase()}</span>`;
                    
                    heading.style.opacity = '1';
                    
                    // Forțăm un reflow pentru a ne asigura că animațiile pornesc din nou
                    heading.offsetHeight;
                }, 300);
            }
            
            if (description) {
                // Adaugă efect de tranziție fade
                description.style.opacity = '0';
                
                // Curățăm orice animație anterioară
                description.innerHTML = '';
                
                setTimeout(() => {
                    // Folosim aceeași animație ca pentru Speck e Tartufo pentru toate varietățile
                    const revealClass = 'reveal-text-rotate';
                    const priceClass = 'price-text-slide';
                    
                    // Formatăm prețul pentru a fi evidențiat mai bine
                    const formattedPrice = variety.price;
                    
                    // Actualizează descrierea cu efectul de reveal progresiv selectat
                    description.innerHTML = `
                        <div class="dynamic-description">
                            <div class="${revealClass} ${revealClass}-delay-1">${variety.description}</div>
                            <div class="${revealClass} ${revealClass}-delay-2"><strong>Ingrediente:</strong> ${variety.ingredients}</div>
                            <div class="${priceClass}">${formattedPrice}</div>
                        </div>
                    `;
                    description.style.opacity = '1';
                    
                    // Forțăm un reflow pentru a ne asigura că animațiile se aplică corect
                    description.offsetHeight;
                }, 300);
            }
        }
    }
    
    // Funcție helper pentru ajustarea luminozității culorii
    function adjustColor(hex, percent) {
        // Convertește hex în RGB
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        
        // Ajustează luminozitatea
        r = Math.min(255, Math.max(0, r + percent));
        g = Math.min(255, Math.max(0, g + percent));
        b = Math.min(255, Math.max(0, b + percent));
        
        // Convertește înapoi în hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    // Funcție pentru a aplica o tranziție mai interesantă imaginii de pizza
    function applyPizzaImageTransition() {
        pizzaImage.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        pizzaImage.style.opacity = '0';
        pizzaImage.style.transform = 'scale(0.8) rotate(-30deg)';

        setTimeout(() => {
            pizzaImage.style.opacity = '1';
            pizzaImage.style.transform = 'scale(1) rotate(0deg)';
        }, 700);
    }

    // Modificăm funcția selectPizzaVariety pentru a include tranziția imaginii
    function selectPizzaVariety(index) {
        // Verifică dacă indexul este valid
        if (index < 0 || index >= pizzaVarieties.length) {
            return;
        }

        // Verifică dacă este aceeași pizza selectată - prevenim reclicul pe același buton
        if (index === currentIndex) {
            return;
        }

        // Resetăm orice animație în curs
        resetAnimations();

        // Obține varietatea
        const variety = pizzaVarieties[index];

        // Aplicăm tranziția imaginii de pizza
        applyPizzaImageTransition();

        // Actualizează titlul secțiunii și descrierea
        updateSectionTitle(variety);

        // Tranziție pentru titlu și descriere
        const sectionTitle = menuSection.querySelector('.section-title');
        if (sectionTitle) {
            const heading = sectionTitle.querySelector('h2');
            const description = sectionTitle.querySelector('p');

            // Adăugăm o clasă pentru animație de ieșire
            if (heading) heading.classList.add('text-exit');
            if (description) description.classList.add('text-exit');
        }

        // Tranziție de rotație pentru imagine
        setTimeout(() => {
            // Actualizează indexul current
            currentIndex = index;

            // Actualizează imaginea
            pizzaImage.src = variety.image;

            // Actualizează culoarea de fundal
            setBackgroundColor(variety.bgColor);

            // Elimina clasa active de pe toate numele de pizza
            pizzaNames.forEach(name => {
                name.classList.remove('active');
                name.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Resetăm culoarea la cea implicită
                name.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)'; // Resetăm umbra la cea implicită
            });

            // Adaugă clasa active la numele de pizza selectat
            pizzaNames[index].classList.add('active');

            // Aplicăm culorile bazate pe fundal
            const isRedBackground = variety.bgColor === '#ca0017';
            pizzaNames[index].style.backgroundColor = isRedBackground ? 
                'rgba(55, 110, 78, 0.9)' : 'rgba(202, 0, 23, 0.9)'; // Verde sau Roșu

            // Actualizăm și umbra pentru a se potrivi cu noua culoare
            pizzaNames[index].style.boxShadow = isRedBackground ? 
                '0 5px 15px rgba(55, 110, 78, 0.4)' : '0 5px 15px rgba(202, 0, 23, 0.4)';

            // Tranziție pentru reapariția imaginii
            setTimeout(() => {
                pizzaImage.style.opacity = '1';
                pizzaImage.style.transform = 'scale(1) rotate(0deg)';

                // Animație pentru intrarea textului după ce imaginea a început să se rotească
                if (sectionTitle) {
                    const heading = sectionTitle.querySelector('h2');
                    const description = sectionTitle.querySelector('p');

                    if (heading) heading.classList.remove('text-exit');
                    if (description) description.classList.remove('text-exit');
                }
            }, 50);
        }, 300);
    }
    
    // Funcție pentru resetarea animațiilor
    function resetAnimations() {
        // Curățăm orice stil sau animație precedentă
        const sectionTitle = menuSection.querySelector('.section-title');
        if (sectionTitle) {
            const heading = sectionTitle.querySelector('h2');
            const description = sectionTitle.querySelector('p');
            
            // Resetăm stilurile pentru a permite reanimarea
            if (heading) {
                heading.classList.remove('text-exit');
                // Forțăm repictarea DOM pentru a asigura că animațiile se resetează
                void heading.offsetHeight;
            }
            
            if (description) {
                description.classList.remove('text-exit');
                // Forțăm repictarea DOM pentru a asigura că animațiile se resetează
                void description.offsetHeight;
            }
        }
    }
    
    // Event listener pentru butonul săgeată
    arrowBtn.addEventListener('click', function() {
        const nextIndex = (currentIndex + 1) % pizzaNames.length;
        selectPizzaVariety(nextIndex);
    });
    
    // Inițializează slider-ul de pizza
    initialize();
    
    // Ajustează poziția butonului de săgeată la încărcare
    adjustArrowButtonPosition();
    
    // Gestionare redimensionare fereastră și orientare - repoziționăm numele și aplicăm fade-in
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Funcție comună pentru a gestiona redimensionarea și schimbarea orientării
    function handleResize() {
        // Ascundem numele înainte de repoziționare
        pizzaNames.forEach(name => {
            name.style.opacity = '0';
            name.style.transition = 'none';
        });
        
        // Repoziționăm numele
        positionPizzaNames();
        
        // Ajustăm poziția butonului de săgeată pe ecrane mici
        adjustArrowButtonPosition();
        
        // Facem fade-in după repoziționare
        setTimeout(() => {
            pizzaNames.forEach(name => {
                name.style.opacity = '1';
                name.style.transition = 'all 0.3s ease';
            });
        }, 50);
    }

    // Funcție specifică pentru schimbarea orientării (landscape/portrait)
    function handleOrientationChange() {
        // Așteptăm finalizarea schimbării orientării
        setTimeout(() => {
            // Reîmprospătăm întregul layout
            handleResize();
            
            // Reîncărcăm imaginea pizzei pentru a evita problemele de redimensionare
            const currentVariety = pizzaVarieties[currentIndex];
            if (currentVariety) {
                const imgSrc = currentVariety.image;
                // Forțăm reîncărcarea imaginii prin adăugarea unui timestamp
                pizzaImage.src = `${imgSrc}?t=${Date.now()}`;
            }
            
            // Actualizăm și culoarea de fundal
            setBackgroundColor(currentVariety.bgColor);
        }, 300); // Așteptăm completarea tranziției de orientare
    }

    // Adaugă animație de fade-in pentru imagine la încărcare
    pizzaImage.style.opacity = '0';
    setTimeout(() => {
        pizzaImage.style.transition = 'opacity 1s ease';
        pizzaImage.style.opacity = '1';
    }, 100);

    // Funcție pentru ajustarea poziției butonului de săgeată pe ecrane mici
    function adjustArrowButtonPosition() {
        if (window.innerWidth <= 576) {
            // Pe ecrane mici, butonul va fi sub pizza
            arrowBtn.style.right = 'auto';
            arrowBtn.style.top = 'auto';
            arrowBtn.style.bottom = '20px';
            arrowBtn.style.left = '50%';
            arrowBtn.style.transform = 'translateX(-50%)';
        } else {
            // Pe ecrane mai mari, butonul rămâne în poziția originală
            arrowBtn.style.right = '30px';
            arrowBtn.style.top = '50%';
            arrowBtn.style.bottom = 'auto';
            arrowBtn.style.left = 'auto';
            arrowBtn.style.transform = 'translateY(-50%)';
        }
    }

    // Detectăm dacă suntem pe un dispozitiv touch pentru a optimiza interacțiunile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    // Dacă este un dispozitiv touch, adăugăm o clasă specială pentru optimizări CSS
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Optimizăm raza cercului pentru telefoane în orientare portrait
        if (window.innerHeight > window.innerWidth) {
            positionPizzaNames(); // Repoziționăm pentru dispozitivele touch în mod portrait
        }
    }
}); 