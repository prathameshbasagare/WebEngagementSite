window.onload = () => {
    // Example config for EngagementSDK
    const sdk = new EngagementSDK({
        companyID: "highcarbs",
        endpoint: "http://43.204.214.1:3000/track-event",
        selectors: {
            button: "#testButton",
            form: "#contactForm",
            input: "#username"
        },
        events: {
            pageView: true,
            buttonClick: true,
            formSubmission: true,
            inputChange: true,
            scroll: true,
            jsError: true
        },
        maxBatchSize: 5,
        flushInterval: 3000
    });

    sdk.trackPageView();
    sdk.trackButtonClicks();
    sdk.trackFormSubmissions();
    sdk.trackInputChanges();
    sdk.trackScroll();
    sdk.trackErrors();
};