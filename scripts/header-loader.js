// Function to include HTML header
async function loadHeader() {
    try {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
        const response = await fetch(basePath + 'include/header.html');
        if (!response.ok) throw new Error('Failed to load header');
        const html = await response.text();
        headerPlaceholder.innerHTML = html;

        // Initialize header elements after loading
        const headerLogo = document.getElementById('header-logo');
        if (headerLogo) {
            headerLogo.src = basePath + 'images/icon_doctorxg.png';
        }

        // Initialize flag images
        const flagEn = document.getElementById('flag-en');
        const flagIt = document.getElementById('flag-it');
        if (flagEn) flagEn.src = basePath + 'images/flags/en.png';
        if (flagIt) flagIt.src = basePath + 'images/flags/it.png';

        // Fix navigation links
        document.getElementById('menu-home').href = basePath + 'index.html';
        document.getElementById('menu-who').href = basePath + 'pages/who.html';
        document.getElementById('menu-match-reports').href = basePath + 'pages/reports.html';

        // Function to toggle menu
        function toggleMenu() {
            const menu = document.getElementById('main-menu');
            menu.classList.toggle('active'); // Toggle main menu visibility
        }

        // Toggle submenu visibility when parent menu item is clicked
        document.querySelectorAll('.has-submenu > a').forEach(item => {
            item.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior
                const submenu = this.nextElementSibling; // Get the submenu
                const parent = this.parentElement; // Get the parent .has-submenu
                parent.classList.toggle('active'); // Toggle the active class on the parent
            });
        });

        // Function to change the language
        function changeLanguage(lang) {
            fetch('json/lang.json')
                .then(response => response.json())
                .then(data => {
                    document.querySelectorAll('[data-translate]').forEach(el => {
                        const key = el.getAttribute('data-translate');
                        el.innerText = data[lang][key];
                    });
                })
                .catch(error => console.error('Error loading language:', error));
        }

        // Add event listeners for language buttons
        document.getElementById('flag-en').addEventListener('click', () => changeLanguage('en'));
        document.getElementById('flag-it').addEventListener('click', () => changeLanguage('it'));

        // Call any additional header load callbacks
        if (window.componentLoader && window.componentLoader.onHeaderLoad) {
            window.componentLoader.onHeaderLoad();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when the page loads
document.addEventListener('DOMContentLoaded', loadHeader);
