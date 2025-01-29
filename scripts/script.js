// Funzione per caricare il file lang.json e applicare la lingua
function loadLanguage(lang) {
    fetch('json/lang.json')
        .then(response => response.json())
        .then(data => {
            applyTranslations(lang, data);
        })
        .catch(error => console.error('Errore nel caricamento delle traduzioni:', error));
}

// Funzione per applicare le traduzioni alla pagina
function applyTranslations(language, translations) {
    console.log(translations[language]);
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Funzione per cambiare la lingua
function changeLanguage(language) {
    // Memorizza la lingua scelta nel localStorage
    localStorage.setItem('language', language);

    // Carica le traduzioni per la lingua selezionata
    loadLanguage(language);
}

function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

document.querySelectorAll('.has-submenu').forEach((item) => {
    item.addEventListener('mouseenter', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'block';
            submenu.style.opacity = '0';
            submenu.style.transform = 'translateY(-10px) scale(0.9)';
            requestAnimationFrame(() => {
                submenu.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                submenu.style.opacity = '1';
                submenu.style.transform = 'translateY(0) scale(1)';
            });
        }
    });

    item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            submenu.style.opacity = '0';
            submenu.style.transform = 'translateY(-10px) scale(0.9)';
            setTimeout(() => {
                if (submenu.style.opacity === '0') submenu.style.display = 'none';
            }, 500);
        }
    });
});
