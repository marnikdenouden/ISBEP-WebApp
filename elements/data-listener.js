class DataListener extends HTMLElement {
    constructor() {
        super();
        if(this.constructor == DataListener) {
            throw new Error("Class is of abstract type and can't be instantiated");
        };

        if(this._receiveDataHandler == undefined) {
            throw new Error("_receiveRobotDataHandler method must be implemented");
        };
    }
  
    /* Called when element is added to the document. */
    connectedCallback() {
        this._receiveDataHandler.bind(this);
        this._eventHandler = (event) => {
            this._receiveDataHandler(event.detail);
        };
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
    _receiveDataHandler(data) {
        throw new Error("_receiveDataHandler method is not implemented.");
    }

    _updateDataListener() {
        if (!this.hasAttribute('receiver-id')) {
            console.warn("Data listener does not have receiver-id set.");
            return;
        }

        let receiver = document.getElementById(this.getAttribute('receiver-id'))

        if (receiver == null) {
            console.warn("Data listener could not find data receiver element" +
                         `with id ${this.getAttribute('receiver-id')}`);
            return;
        }
        
        this._removeDataListener();
        this.receiver = receiver;
        this.receiver.addEventListener('receivedata', this._eventHandler);
    }

    _removeDataListener() {
        if (this.receiver == null) return;
        this.receiver.removeEventListener('receivedata', this._eventHandler);
    }
}