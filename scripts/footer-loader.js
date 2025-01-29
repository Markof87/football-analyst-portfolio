// Function to include HTML footer
async function loadFooter() {
    try {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
        const response = await fetch(basePath + 'include/footer.html');
        if (!response.ok) throw new Error('Failed to load footer');
        const html = await response.text();
        footerPlaceholder.innerHTML = html;
        window.componentLoader.onFooterLoad();
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load footer when the page loads
document.addEventListener('DOMContentLoaded', loadFooter);
