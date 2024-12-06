let currentSlideIndex = 0;
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector('.presentation-container');

    currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Incrementa la diapositiva
    container.style.transform = `translateX(-${currentSlideIndex * 100}vw)`; // Mueve el contenedor
}

// Opcional: Puedes agregar retroceso entre las diapositivas
function previousSlide() {
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector('.presentation-container');

    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    container.style.transform = `translateX(-${currentSlideIndex * 100}vw)`;
}

// Inicializa controles del teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
});

//Interacción de Explicación dinámica del algoritmo de fuerza bruta
document.querySelectorAll('.code-line').forEach(line => {
    line.addEventListener('mouseover', function() {
        document.querySelectorAll('.explanation').forEach(explanation => {
            explanation.classList.remove('active');
        });
        document.getElementById(this.getAttribute('data-target')).classList.add('active');
    });
});