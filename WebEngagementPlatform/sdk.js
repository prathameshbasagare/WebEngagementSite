class EngagementSDK {
    constructor(config) {
        this.companyID = config.companyID;
        this.endpoint = config.endpoint || 'http://43.204.214.1:3000/track-event';
        this.events = [];
        this.config = config;
        this.eventBuffer = [];
        this.isSending = false;
        this.retryQueue = [];
        this.maxBatchSize = config.maxBatchSize || 5;
        this.flushInterval = config.flushInterval || 3000; // ms
        this._startBatchFlush();
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
        this._bufferEvent(pageViewEvent);
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
                this._bufferEvent(buttonClickEvent);
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
                this._bufferEvent(inputChangeEvent);
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
                this._bufferEvent(formSubmitEvent);
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
                this._bufferEvent(scrollEvent);
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
            this._bufferEvent(errorEvent);
        };
    }

    _bufferEvent(event) {
        this.events.push(event);
        this.eventBuffer.push(event);
        if (this.eventBuffer.length >= this.maxBatchSize) {
            this._flushBuffer();
        }
    }

    _startBatchFlush() {
        setInterval(() => {
            if (this.eventBuffer.length > 0) {
                this._flushBuffer();
            }
            if (this.retryQueue.length > 0) {
                this._retryFailed();
            }
        }, this.flushInterval);
    }

    _flushBuffer() {
        if (this.isSending || this.eventBuffer.length === 0) return;
        this.isSending = true;
        const batch = this.eventBuffer.splice(0, this.maxBatchSize);
        this._sendBatchToBackend(batch)
            .then(() => {
                this.isSending = false;
            })
            .catch(() => {
                this.retryQueue.push(...batch);
                this.isSending = false;
            });
    }

    _retryFailed() {
        if (this.retryQueue.length === 0) return;
        const retryBatch = this.retryQueue.splice(0, this.maxBatchSize);
        this._sendBatchToBackend(retryBatch)
            .catch(() => {
                // If still fails, put them back for next retry
                this.retryQueue.unshift(...retryBatch);
            });
    }

    _sendBatchToBackend(batch) {
        return fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(batch)
        })
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            console.log('Batch sent to backend:', data);
        });
    }
}

new EngagementSDK();