class DataReceiver extends HTMLElement {
    constructor() {
        super();
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        this._receiveDataBroadcaster.bind(this);
        this._defaultAttribute('host-address', 'ws://localhost:8080');
        this.addEventListener('load', function(event) {
            _addConnection();
        });
    }

    _defaultAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
            this.setAttribute(attribute, value);
        }
    }
  
    /* Called when element is removed from the document. */
    disconnectedCallback() {
        _removeConnection();
    }
  
    /* Attributes to listen for, options for attributeChangedCallback method. */
    static get observedAttributes() {
      return ['host-address'];
    }
  
    /* Called when an attributed has changed. */
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'host-address':
                this._removeConnection();
                this._addConnection();
                break;
            default:
        }
    }

    _addConnection() {
        console.info(`Starting websocket connection at ${this.getAttribute('host-address')}`);
        this.socket = new WebSocket(this.getAttribute('host-address'));

        this.socket.onopen = function(event) {
            console.log("data-receiver connection opened.")
        };

        this.socket.onmessage = this._receiveDataBroadcaster;

        this.socket.onclose = function(event) {
            console.log("data-receiver connection closed.")
        };

        // function sendMessage(message) {
        //     this.socket.send(message);
        // };
    }

    _receiveDataBroadcaster(event) {
        console.log(`Received data: ${event.data}`)
        this.dispatchEvent(new CustomEvent("receivedata", {
            detail: event.data
        }));
    }

    _removeConnection() {
        if (this.socket == null) return;
        this.socket.close();
    }

}
customElements.define("data-receiver", DataReceiver);