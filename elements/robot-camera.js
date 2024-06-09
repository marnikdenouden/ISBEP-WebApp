const robot_camera_template = document.createElement('template');

robot_camera_template.innerHTML = `
    <style>
        :host {
            display: flex;
            position: relative;
            flex-warp: warp;
            aspect-ratio: 1920/1080;
        }
        
        :host([hidden]) {
            display: none;
        }

        .video-canvas {
            width: 100%;
            height: 100%;
            position: absolute;
        }
    </style>
`;

class RobotCamera extends DataListener {
    constructor() {
        super();
        
        const shadowRoot = this.attachShadow({mode:'closed'});
        shadowRoot.appendChild(robot_camera_template.content.cloneNode(true));
        shadowRoot.appendChild(this._createVideoCanvas());
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        super.connectedCallback();
        this._defaultAttribute('serial-number', '00000000');
        this._defaultAttribute('camera-key', 'camera_image');
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

    _createVideoCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList += 'video-canvas';
        return this.canvas;
    }

    _receiveDataHandler(data) {
        if (typeof(data) != 'object') return;

        if (!this.hasAttribute('serial-number')) return;
        
        if (! 'serial' in data) return;
        if (data['serial'] != this.getAttribute('serial-number')) return;

        if (!this.hasAttribute('camera-key')) return;

        if (!this.getAttribute('camera-key') in data) return;

        let frameData =  data[this.getAttribute('camera-key')];
        
        const img = new Image();
        img.src = 'data:image/png;base64,' + frameData;
        img.onload = () => {
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.canvas.getContext('2d').drawImage(img, 0, 0);
        };
    }

}
customElements.define("robot-camera", RobotCamera);