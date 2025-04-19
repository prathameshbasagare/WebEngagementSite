class EngagementSDK {
    constructor(config) {
        this.companyID = config.companyID;
        this.endpoint = config.endpoint || 'http://localhost:3001/track-event';
        this.events = [];
        this.config = config;
    }

    trackPageView() {
        if (this.config?.events?.pageView === false) return;
        const pageViewEvent = {
            actionType: 'page_view',
            companyID: this.companyID,
            pageUrl: window.location.href,
            data: {
                timestamp: new Date().toISOString(),
            }
        };
        this.events.push(pageViewEvent);
        this.sendToBackend(pageViewEvent);
    }

    trackButtonClicks(selector) {
        if (this.config?.events?.buttonClick === false) return;
        const sel = selector || this.config?.selectors?.button || 'button';
        document.querySelectorAll(sel).forEach(button => {
            button.addEventListener("click", (event) => {
                const buttonClickEvent = {
                    actionType: 'button_click',
                    companyID: this.companyID,
                    pageUrl: window.location.href,
                    data: {
                        buttonText: event.target.innerText,
                        timestamp: new Date().toISOString(),
                    }
                };
                this.events.push(buttonClickEvent);
                this.sendToBackend(buttonClickEvent);
            });
        });
    }

    trackInputChanges(selector) {
        if (this.config?.events?.inputChange === false) return;
        const sel = selector || this.config?.selectors?.input || 'input';
        document.querySelectorAll(sel).forEach(input => {
            input.addEventListener("input", (event) => {
                const inputChangeEvent = {
                    actionType: 'input_change',
                    companyID: this.companyID,
                    pageUrl: window.location.href,
                    data: {
                        inputName: event.target.name,
                        inputValue: event.target.value,
                        timestamp: new Date().toISOString(),
                    }
                };
                this.events.push(inputChangeEvent);
                this.sendToBackend(inputChangeEvent);
            });
        });
    }

    trackFormSubmissions(selector) {
        if (this.config?.events?.formSubmission === false) return;
        const sel = selector || this.config?.selectors?.form || 'form';
        document.querySelectorAll(sel).forEach(form => {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const formSubmitEvent = {
                    actionType: 'form_submission',
                    companyID: this.companyID,
                    pageUrl: window.location.href,
                    data: {
                        formName: event.target.name,
                        timestamp: new Date().toISOString(),
                    }
                };
                this.events.push(formSubmitEvent);
                this.sendToBackend(formSubmitEvent);
            });
        });
    }

    trackScroll() {
        if (this.config?.events?.scroll === false) return;
        let debounceTimeout;
        window.addEventListener("scroll", () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const scrollEvent = {
                    actionType: 'scroll',
                    companyID: this.companyID,
                    pageUrl: window.location.href,
                    data: {
                        scrollPosition: window.scrollY,
                        timestamp: new Date().toISOString(),
                    }
                };
                this.events.push(scrollEvent);
                this.sendToBackend(scrollEvent);
            }, 500);
        });
    }

    trackErrors() {
        if (this.config?.events?.jsError === false) return;
        window.onerror = (message, source, lineno, colno, error) => {
            const errorEvent = {
                actionType: 'js_error',
                companyID: this.companyID,
                pageUrl: window.location.href,
                data: {
                    message,
                    source,
                    lineno,
                    colno,
                    errorStack: error ? error.stack : null,
                    timestamp: new Date().toISOString(),
                }
            };
            this.events.push(errorEvent);
            this.sendToBackend(errorEvent);
        };
    }

    sendToBackend(eventData) {
        fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event sent to backend:', data);
        })
        .catch(error => {
            console.error('Error sending event data:', error);
        });
    }
}

new EngagementSDK();