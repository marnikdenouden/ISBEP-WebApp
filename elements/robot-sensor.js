class RobotSensor extends DataListener {
    constructor() {
        super();
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        super.connectedCallback();
        this._defaultAttribute('serial-number', '00000000');
        this._defaultAttribute('sensor-key', 'temp');
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
      return super.observedAttributes.concat();
    }
  
    /* Called when an attributed has changed. */
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name) {
            default:
          }
    }

    _receiveDataHandler(data) {
        if (!this.hasAttribute('serial-number')) return;
        if (data['serial'] != this.getAttribute('serial-number')) return;
        
        if (!this.hasAttribute('sensor-key')) return;

        this.innerText(data['sensor'][this.getAttribute('sensor-key')]);
    }

}
customElements.define("robot-sensor", RobotSensor);