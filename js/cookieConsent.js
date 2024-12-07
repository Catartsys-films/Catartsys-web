class CookieConsent {
    constructor() {
        this.cookieConsent = null;
        this.preferencesPanel = null;
        this.floatingButton = null;
        this.consentKey = 'cookieConsent';
        this.init();
    }

    init() {
        // Check if consent was already given
        const savedConsent = localStorage.getItem(this.consentKey);
        if (!savedConsent) {
            this.showBanner();
        }
        this.setupEventListeners();
    }

    showBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        banner.classList.remove('hidden');
        banner.classList.add('slide-up');
    }

    hideBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        banner.classList.add('slide-down');
        setTimeout(() => {
            banner.classList.add('hidden');
            banner.classList.remove('slide-down');
        }, 300);
    }

    togglePreferences() {
        const panel = document.getElementById('cookiePreferences');
        panel.classList.toggle('hidden');
    }

    acceptAll() {
        const consent = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(consent);
        this.hideBanner();
    }

    savePreferences() {
        const consent = {
            essential: true, // Always true
            analytics: document.getElementById('analyticsConsent').checked,
            marketing: document.getElementById('marketingConsent').checked,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(consent);
        this.hideBanner();
        this.togglePreferences();
    }

    saveConsent(consent) {
        localStorage.setItem(this.consentKey, JSON.stringify(consent));
        // Here you would typically trigger your analytics and marketing scripts
        // based on the user's preferences
    }

    setupEventListeners() {
        // Accept all button
        document.getElementById('acceptAllCookies').addEventListener('click', () => this.acceptAll());

        // Customize button
        document.getElementById('customizeCookies').addEventListener('click', () => this.togglePreferences());

        // Save preferences button
        document.getElementById('savePreferences').addEventListener('click', () => this.savePreferences());

        // Floating button
        document.getElementById('cookieSettingsBtn').addEventListener('click', () => {
            this.showBanner();
            this.togglePreferences();
        });
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
