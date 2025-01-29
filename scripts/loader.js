// Function to manage component loading
class ComponentLoader {
    constructor() {
        this.headerLoaded = false;
        this.footerLoaded = false;
        this.callbacks = [];
    }

    onHeaderLoad() {
        this.headerLoaded = true;
        this.checkAllLoaded();
    }

    onFooterLoad() {
        this.footerLoaded = true;
        this.checkAllLoaded();
    }

    onAllComponentsLoaded(callback) {
        if (this.headerLoaded && this.footerLoaded) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    }

    checkAllLoaded() {
        if (this.headerLoaded && this.footerLoaded) {
            const language = localStorage.getItem('language') || 'it'; 
            loadLanguage(language);
            this.callbacks.forEach(callback => callback());
            this.callbacks = [];
        }
    }
}

// Create a global instance
window.componentLoader = new ComponentLoader();
