// Funcționalitate pentru slider-ul de categorii
document.addEventListener('DOMContentLoaded', function() {
    // Slider pentru categorii
    const categoryCards = document.querySelector('.category-cards');
    const prevArrow = document.querySelector('.categories-slider .prev-arrow');
    const nextArrow = document.querySelector('.categories-slider .next-arrow');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    let currentCategoryIndex = 0;
    const cardWidth = document.querySelector('.category-card').offsetWidth;
    const cardMargin = 20; // Gap între carduri
    
    // Inițializare slider categorii
    updateCategorySlider();
    
    prevArrow.addEventListener('click', function() {
        if (currentCategoryIndex > 0) {
            currentCategoryIndex--;
            updateCategorySlider();
        }
    });
    
    nextArrow.addEventListener('click', function() {
        if (currentCategoryIndex < dots.length - 1) {
            currentCategoryIndex++;
            updateCategorySlider();
        }
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentCategoryIndex = index;
            updateCategorySlider();
        });
    });
    
    function updateCategorySlider() {
        const translateX = -(currentCategoryIndex * (cardWidth + cardMargin));
        categoryCards.style.transform = `translateX(${translateX}px)`;
        
        // Actualizare dots active
        dots.forEach((dot, index) => {
            if (index === currentCategoryIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Slider pentru recenzii
    const reviewsContainer = document.querySelector('.reviews-container');
    const reviewPrevArrow = document.querySelector('.reviews-slider .prev-arrow');
    const reviewNextArrow = document.querySelector('.reviews-slider .next-arrow');
    const reviewDots = document.querySelectorAll('.reviews-dots .dot');
    
    let currentReviewIndex = 0;
    
    // Inițializare slider recenzii
    if (reviewsContainer) {
        const reviewCard = document.querySelector('.review-card');
        const reviewCardWidth = reviewCard ? reviewCard.offsetWidth : 0;
        const reviewCardMargin = 25; // Gap între carduri
        
        updateReviewSlider();
        
        if (reviewPrevArrow) {
            reviewPrevArrow.addEventListener('click', function() {
                if (currentReviewIndex > 0) {
                    currentReviewIndex--;
                    updateReviewSlider();
                }
            });
        }
        
        if (reviewNextArrow) {
            reviewNextArrow.addEventListener('click', function() {
                if (currentReviewIndex < reviewDots.length - 1) {
                    currentReviewIndex++;
                    updateReviewSlider();
                }
            });
        }
        
        if (reviewDots.length > 0) {
            reviewDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentReviewIndex = index;
                    updateReviewSlider();
                });
            });
        }
        
        function updateReviewSlider() {
            const translateX = -(currentReviewIndex * (reviewCardWidth + reviewCardMargin));
            reviewsContainer.style.transform = `translateX(${translateX}px)`;
            
            // Actualizare dots active
            reviewDots.forEach((dot, index) => {
                if (index === currentReviewIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
}); 