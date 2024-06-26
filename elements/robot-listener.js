class RobotListener extends DataListener {
    constructor() {
        super();
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        super.connectedCallback();
        this._receiveRobotDataHandler.bind(this);
    }

    _defaultAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
            this.setAttribute(attribute, value);
        }
    }
  
    /* Called when element is removed from the document. */
    disconnectedCallback() {
        super.disconnectedCallback();
    }
  
    /* Attributes to listen for, options for attributeChangedCallback method. */
    static get observedAttributes() {
        return super.observedAttributes;
    }
  
    /* Called when an attributed has changed. */
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback();
        switch(name) {
            default:
        }
    }

    _receiveDataHandler(data) {   
        if (typeof(data) != 'object') return;

        if (!this.hasAttribute('serial-number')) {
            this._receiveRobotDataHandler(data);
        }

        if (! 'serial' in data) return;
        if ((data['serial']) != this.getAttribute('serial-number')) return;
        
        this._receiveRobotDataHandler(data);
    }

    /**
     * Handle the received robot data.
     * Filtered by serial number if attribute is specified.
     * 
     * @param {JSON} robot_data received from receive data event.
     */
    _receiveRobotDataHandler(robot_data) {
        throw new Error("_receiveRobotDataHandler method is not implemented.");
    }
}