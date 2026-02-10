document.addEventListener('DOMContentLoaded', function() {
  const savedConsent = localStorage.getItem('popiaConsent');

  // Only show banner if no consent saved
  if (!savedConsent) {
    // Create banner container
    const banner = document.createElement('div');
    banner.id = 'popia-banner';
    banner.className = 'popia-show'; // Make sure CSS uses this class to display
    banner.innerHTML = `
      <div class="popia-content">
        <p>We respect your privacy. We use cookies to provide essential website functionality and improve your experience. You can choose which cookies you consent to. 
        <a href="/privacy-policy.html" target="_blank">Read our Privacy Policy</a>.</p>
        <div class="popia-options">
          <label class="popia-label">
            <input type="checkbox" id="essential-cookies" checked disabled class="popia-checkbox"> Essential Cookies (Always Active)
          </label>
          <label class="popia-label">
            <input type="checkbox" id="analytics-cookies" class="popia-checkbox"> Analytics Cookies
          </label>
        </div>
        <div class="popia-buttons">
          <button id="popia-save">Save Preferences</button>
          <button id="popia-reject">Reject All</button>
        </div>
      </div>
    `;

    // Append banner to body
    document.body.appendChild(banner);

    // Handle Save Preferences button
    document.getElementById('popia-save').addEventListener('click', function() {
      const consent = {
        essential: true,
        analytics: document.getElementById('analytics-cookies').checked
      };
      localStorage.setItem('popiaConsent', JSON.stringify(consent));

      // Hide banner
      banner.classList.remove('popia-show');

      // Load GA if consented
      if (consent.analytics) {
        loadAnalytics();
      }
    });

    // Reject All button
    document.getElementById('popia-reject').addEventListener('click', function() {
      const consent = {
        essential: true,
        analytics: false
      };
      localStorage.setItem('popiaConsent', JSON.stringify(consent));
      banner.classList.remove('popia-show');
      // Do not load analytics
    });
    
  } else {
    // Load previously consented preferences
    const consent = JSON.parse(savedConsent);
    if (consent.analytics) {
      loadAnalytics();
    }
  }

  // Function to dynamically load Google Analytics
  function loadAnalytics() {
    if (document.getElementById('ga-script')) return; // Prevent duplicates

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-########"; // Replace with your GA ID
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-#######'); // Replace with your GA ID
  }
});