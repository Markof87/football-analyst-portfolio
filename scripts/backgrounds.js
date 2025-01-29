// Background configuration for each page
const backgroundConfig = {
    'index.html': '../images/backgrounds/background.png',
    'pages/reports.html': '../images/backgrounds/reports-bg.png',
    'pages/who.html': '../images/backgrounds/who-bg.png',
    // Add more pages and their backgrounds here
};

// Function to set the background based on current page
function setPageBackground() {
    const path = window.location.pathname;
    const currentPage = path.includes('/pages/') ?
        'pages/' + path.split('/pages/')[1] :
        path.split('/').pop() || 'index.html';

    const backgroundImage = backgroundConfig[currentPage] || backgroundConfig['index.html'];

    // Create or update CSS variable for background
    document.documentElement.style.setProperty('--page-background', `url('${backgroundImage}')`);
}

// Set background when components are loaded
window.componentLoader.onAllComponentsLoaded(() => {
    setPageBackground();
});
