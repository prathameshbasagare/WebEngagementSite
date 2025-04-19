window.onload = () => {
    // Example config for EngagementSDK
    const sdk = new EngagementSDK({
        companyID: "abcd",
        endpoint: "http://localhost:3001/track-event",
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
        }
    });

    sdk.trackPageView();
    sdk.trackButtonClicks();
    sdk.trackFormSubmissions();
    sdk.trackInputChanges();
    sdk.trackScroll();
    sdk.trackErrors();
};