class RobotSensor extends RobotListener {
    constructor() {
        super();
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        super.connectedCallback();
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

    _receiveRobotDataHandler(robot_data) {
        if (! 'sensor' in robot_data) return;
        let sensor_data = robot_data['sensor'];
        
        if (typeof(sensor_data) != 'object') return;

        if (!this.hasAttribute('sensor-key')) return;

        if (!this.getAttribute('sensor-key') in sensor_data) return;

        let value =  sensor_data[this.getAttribute('sensor-key')];
        
        if (typeof value == "number") {
            value = value.toFixed(this.getAttribute("rounding") ?? 2);
        }

        this.setAttribute('value', value);
        this.innerText = value;
    }

}
customElements.define("robot-sensor", RobotSensor);