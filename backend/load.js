window.onload = () => {
  //Here we will add user id for perticular user
    const sdk = new EngagementSDK("rajat");

    // Track page view when the page loads
    sdk.trackPageView();

    // Track button click event
    sdk.trackButtonClicks("testButton");

    // Track form submission event
    sdk.trackFormSubmissions("contactForm");

    // Track input change event
    sdk.trackInputChanges("username");

    // Track scroll event
    sdk.trackScroll();

    // Track errors in JavaScript
    sdk.trackErrors();
  };