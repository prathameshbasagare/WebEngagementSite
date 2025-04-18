class EngagementSDK {
    constructor(cID) {
      this.companyID = cID;
        this.events = [];
    }
  
    trackPageView() {
        const pageViewEvent = {
            actionType: 'page_view',
            companyID: this.companyID,
            pageUrl: window.location.href, // Include pageUrl
            data: {
                timestamp: new Date().toISOString(),
            }
        };
        this.events.push(pageViewEvent);
        this.sendToBackend(pageViewEvent);
    }
  
    trackButtonClicks() {
        document.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (event) => {
                const buttonClickEvent = {
                    actionType: 'button_click',
                    companyID: this.companyID,
                    pageUrl: window.location.href, // Include pageUrl
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
  
    trackInputChanges() {
        document.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", (event) => {
                const inputChangeEvent = {
                    actionType: 'input_change',
                    companyID: this.companyID,
                    pageUrl: window.location.href, // Include pageUrl
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
  
    trackFormSubmissions() {
        document.querySelectorAll("form").forEach(form => {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const formSubmitEvent = {
                    actionType: 'form_submission',
                    companyID: this.companyID,
                    pageUrl: window.location.href, // Include pageUrl
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
        let debounceTimeout;
        window.addEventListener("scroll", () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
  
            debounceTimeout = setTimeout(() => {
                const scrollEvent = {
                    actionType: 'scroll',
                    companyID: this.companyID,
                    pageUrl: window.location.href, // Include pageUrl
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
        window.onerror = (message, source, lineno, colno, error) => {
            const errorEvent = {
                actionType: 'js_error',
                companyID: this.companyID,
                pageUrl: window.location.href, // Include pageUrl
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
    
  //   65.0.183.75
    sendToBackend(eventData) {
        fetch('http://localhost:3000/track-event', {
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