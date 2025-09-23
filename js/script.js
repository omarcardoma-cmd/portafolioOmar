/**
 * PORTFOLIO OMAR CÁRDENAS - SCRIPT PRINCIPAL
 * Funcionalidades interactivas para el portafolio del arquitecto
 */

// ========================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio Omar Cárdenas - Arquitecto Diseñador');
    console.log('Sitio web cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initContactForm();
    initSkillBars();
    initScrollEffects();
    initMobileMenu();
    initAnimations();
});

// ========================================
// NAVEGACIÓN Y MENÚ MÓVIL
// ========================================

/**
 * Inicializa la funcionalidad de navegación
 * Incluye menú hamburguesa para móvil y scroll suave
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Efecto de transparencia en la barra de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Destacar enlace activo según la sección visible
    window.addEventListener('scroll', highlightActiveSection);
}

/**
 * Función para manejar el menú móvil (hamburguesa)
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Destaca la sección activa en el menú de navegación
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

/**
 * Inicializa la funcionalidad del formulario de contacto
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

/**
 * Maneja el envío del formulario de contacto
 * @param {Event} event - Evento de envío del formulario
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Prevenir envío por defecto
    
    console.log('Formulario enviado correctamente');
    
    // Obtener datos del formulario
    const formData = new FormData(event.target);
    const formObject = {};
    
    // Convertir FormData a objeto
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validar formulario
    if (validateForm(formObject)) {
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Simular envío (en un proyecto real, aquí se enviaría al servidor)
        simulateFormSubmission(formObject);
        
        // Limpiar formulario
        event.target.reset();
    }
}

/**
 * Valida todo el formulario
 * @param {Object} formData - Datos del formulario
 * @returns {boolean} - True si es válido, false si no
 */
function validateForm(formData) {
    let isValid = true;
    
    // Validar nombre
    if (!formData.nombre || formData.nombre.trim().length < 2) {
        showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        showFieldError('email', 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validar mensaje
    if (!formData.mensaje || formData.mensaje.trim().length < 10) {
        showFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Valida un campo individual
 * @param {Event} event - Evento de blur del campo
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Limpiar errores previos
    clearFieldError(event);
    
    switch (field.name) {
        case 'nombre':
            if (value.length < 2) {
                showFieldError(field.name, 'El nombre debe tener al menos 2 caracteres');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field.name, 'Por favor ingresa un email válido');
            }
            break;
            
        case 'mensaje':
            if (value.length < 10) {
                showFieldError(field.name, 'El mensaje debe tener al menos 10 caracteres');
            }
            break;
    }
}

/**
 * Muestra error en un campo específico
 * @param {string} fieldName - Nombre del campo
 * @param {string} message - Mensaje de error
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remover error previo si existe
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear elemento de error
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6600';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.5rem';
    errorElement.style.display = 'block';
    
    // Agregar error al grupo del campo
    formGroup.appendChild(errorElement);
    
    // Marcar campo como inválido
    field.style.borderColor = '#ff6600';
}

/**
 * Limpia el error de un campo
 * @param {Event} event - Evento de input del campo
 */
function clearFieldError(event) {
    const field = event.target;
    const formGroup = field.closest('.form-group');
    
    // Remover error
    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Restaurar estilo del campo
    field.style.borderColor = 'rgba(0, 102, 255, 0.2)';
}

/**
 * Muestra mensaje de éxito después del envío
 */
function showSuccessMessage() {
    // Crear elemento de mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #00cc66, #00aa55);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            margin: 1rem 0;
            text-align: center;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(0, 204, 102, 0.3);
            animation: slideInDown 0.5s ease-out;
        ">
            ✅ ¡Mensaje enviado correctamente! Te contactaremos pronto.
        </div>
    `;
    
    // Insertar mensaje antes del formulario
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Simula el envío del formulario (para demostración)
 * @param {Object} formData - Datos del formulario
 */
function simulateFormSubmission(formData) {
    console.log('=== DATOS DEL FORMULARIO ===');
    console.log('Nombre:', formData.nombre);
    console.log('Email:', formData.email);
    console.log('Mensaje:', formData.mensaje);
    console.log('Fecha de envío:', new Date().toLocaleString());
    console.log('============================');
    
    // En un proyecto real, aquí se haría una petición AJAX al servidor
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
}

// ========================================
// BARRAS DE HABILIDADES
// ========================================

/**
 * Inicializa las barras de habilidades con animación
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Crear observer para animar las barras cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                observer.unobserve(entry.target); // Animar solo una vez
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Anima una barra de habilidad específica
 * @param {HTMLElement} skillBar - Elemento de la barra de habilidad
 */
function animateSkillBar(skillBar) {
    const targetWidth = skillBar.getAttribute('data-width');
    skillBar.style.width = targetWidth;
    
    console.log(`Animando barra de habilidad: ${targetWidth}`);
}

// ========================================
// EFECTOS DE SCROLL
// ========================================

/**
 * Inicializa efectos relacionados con el scroll
 */
function initScrollEffects() {
    // Efecto parallax sutil en la imagen de perfil
    window.addEventListener('scroll', handleParallaxEffect);
    
    // Mostrar elementos al hacer scroll
    initScrollAnimations();
}

/**
 * Maneja el efecto parallax en la imagen de perfil
 */
function handleParallaxEffect() {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}

/**
 * Inicializa animaciones al hacer scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.experience-card, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ========================================
// ANIMACIONES Y EFECTOS VISUALES
// ========================================

/**
 * Inicializa animaciones adicionales
 */
function initAnimations() {
    // Efecto de hover mejorado para las tarjetas de proyectos
    initProjectCardEffects();
    
    // Efecto de typing en el título principal
    initTypingEffect();
    
    // Contador animado para años de experiencia
    initExperienceCounter();
}

/**
 * Inicializa efectos especiales para las tarjetas de proyectos
 */
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Inicializa efecto de escritura en el título
 */
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    titleElement.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleElement.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar efecto después de un pequeño delay
    setTimeout(typeWriter, 500);
}

/**
 * Inicializa contador animado para años de experiencia
 */
function initExperienceCounter() {
    const experienceItems = document.querySelectorAll('.experience-list li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateExperienceNumbers(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    experienceItems.forEach(item => {
        if (item.textContent.includes('25+ años')) {
            observer.observe(item);
        }
    });
}

/**
 * Anima los números en los elementos de experiencia
 * @param {HTMLElement} element - Elemento que contiene números
 */
function animateExperienceNumbers(element) {
    const text = element.textContent;
    const numberMatch = text.match(/(\d+)\+/);
    
    if (numberMatch) {
        const targetNumber = parseInt(numberMatch[1]);
        let currentNumber = 0;
        const increment = targetNumber / 50;
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
            }
            element.innerHTML = text.replace(/(\d+)\+/, Math.floor(currentNumber) + '+');
        }, 50);
    }
}

// ========================================
// UTILIDADES Y FUNCIONES AUXILIARES
// ========================================

/**
 * Función para mostrar notificaciones toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info)
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos del toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Colores según el tipo
    const colors = {
        success: '#00cc66',
        error: '#ff6600',
        info: '#0066ff'
    };
    
    toast.style.background = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
}

/**
 * Función para smooth scroll mejorado
 * @param {string} targetId - ID del elemento objetivo
 */
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Ajustar para la navbar fija
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Función para detectar si el usuario está en móvil
 * @returns {boolean} - True si es móvil, false si no
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Función para optimizar rendimiento en dispositivos móviles
 */
function optimizeForMobile() {
    if (isMobile()) {
        // Reducir animaciones en móvil
        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(element => {
            element.style.transitionDuration = '0.2s';
        });
        
        // Deshabilitar efectos parallax en móvil
        window.removeEventListener('scroll', handleParallaxEffect);
    }
}

// Inicializar optimizaciones para móvil
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// ========================================
// FUNCIONES GLOBALES (disponibles en la consola)
// ========================================

// Hacer funciones disponibles globalmente para testing
window.PortfolioOmar = {
    showToast,
    smoothScrollTo,
    isMobile,
    validateForm,
    animateSkillBar
};

console.log('Funciones disponibles en window.PortfolioOmar:', Object.keys(window.PortfolioOmar));
