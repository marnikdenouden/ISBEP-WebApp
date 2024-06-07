class DataListener extends HTMLElement {
    constructor() {
        super();
        if(this.constructor == DataListener) {
            throw new Error("Class is of abstract type and can't be instantiated");
        };

        if(this.receiveDataHandler == undefined) {
            throw new Error("receiveData method must be implemented");
        };
    }
  
    /* Called when element is added to the document. */
    connectedCallback() {
        this._eventListener.bind(this);
        this._updateDataListener();
    }
  
    /* Called when element is removed from the document. */
    disconnectedCallback() {
        this._removeDataListener();
    } 

    /* Attributes to listen for, options for attributeChangedCallback method. */
    static get observedAttributes() {
        return ["receiver-id"];
        }
    
    /* Called when an attributed has changed. */
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "loader-id":
                this._updateDataListener();
                break;
            default:
        }
    }

    /**
     * Handle the received data.
     * 
     * @param {JSON} data received from receive data event.
     */
    receiveDataHandler(data) {
        console.log(`Received data: ${data}`)
        throw new Error("receiveData method is not implemented.");
    }

    _eventListener(event) {
        console.log(`Received data event: ${event}`)
        this.receiveDataHandler(event.detail);
    }

    _updateDataListener() {
        console.log("Updating data listener");

        if (!this.hasAttribute('receiver-id')) {
            console.info("Data listener does not have receiver-id set.");
            return;
        }

        let receiver = document.getElementById(this.getAttribute('receiver-id'))

        if (receiver == null) {
            console.warn("Data listener could not find data receiver element" +
                         `with id ${this.getAttribute('receiver-id')}`);
            return;
        }
        
        this._removeDataListener();
        console.log("Adding data listener");
        this.receiver = receiver;
        this.receiver.addEventListener('receivedata', this._eventListener);
    }

    _removeDataListener() {
        console.log("Removing data listener");
        if (this.receiver == null) return;
        this.receiver.removeEventListener('receivedata', this._eventListener);
    }
}