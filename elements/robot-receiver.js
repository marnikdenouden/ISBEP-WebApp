class RobotReceiver extends RobotListener {
    constructor() {
        super();
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        super.connectedCallback();
        this._defaultAttribute('serial-number', '00000000');
    }

    _receiveRobotDataHandler(robot_data) {
        this.dispatchEvent(new CustomEvent("receivedata", {
            detail: robot_data
        }));
    }

}
customElements.define("robot-receiver", RobotReceiver);