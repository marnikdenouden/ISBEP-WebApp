/**
 * Code to run a web socket server to test the web app independently
 * 
 * Requires Node and ws module.
 * Run 'node webSocketServer.js' in command prompt of this folder.
 */
const readline = require('node:readline');

const interaction = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Set the initial command interaction to active 
let active = true;

/**
 * Ask the user for a command to run the web socket server.
 */
function askForCommand() {
    if (!active) { 
        // Ensure the web socket server is stopped.
        webSocketServer.stop();
        return;
    }

    interaction.question("What would you like to do? (Type 'help' for options)\n", awnser => {
        foundCommand = false;
        for (let command of commands) {
            if (awnser.match(command.name)) {
                command.runCommand();
                foundCommand = true;
            }
        }
        if (!foundCommand) {
            console.log(`Sorry, could not find command with name ${awnser}`);
        }
        askForCommand();
    });
}

// Create a web socket server and define a default port
let webSocketServer;
let port = 5633;

/**
 * Basic command class to utilize for this example web socket server script.
 */
class Command {
    /** Name of the command */
    #name;

    /** Function to run, when the command is called */
    #action;

    /** Help message of the command */
    #helpMessage;

    /**
     * Constructs a command that can be used for the terminal.
     * 
     * @param {String} name Key to type for running the command and label to represent command.
     * @param {Function} action Runnable function that is execute when the command is used.
     * @param {String} helpMessage Message to guide the user of the commands use.
     */
    constructor(name, action, helpMessage) {
        this.#name = name;
        this.#action = action;
        this.#helpMessage = helpMessage;
    }
    
    /**
     * Return the name of the command.
     * 
     * @returns {String} Name of the command.
     */
    get name() {
        return this.#name;
    }

    /**
     * Run the command.
     */
    runCommand() {
        this.#action();
    }

    /**
     * Return the help message.
     * 
     * @returns {String} Helo message of the command.
     */
    get helpMessage() {
        return this.#helpMessage;
    }
}

// Define the commands used in the terminal interaction.
let commands = [
    new Command("broadcast", () => {
        interaction.question('What message would you like to send?\n', message => {
            webSocketServer.broadcast(message);
            askForCommand();
        });
    }, "Sends a message to all currently connected clients."),
    new Command("help", () => {
        console.log("The following commands are available:\n");
        for (let command of commands) {
            console.log(`[${command.name}]`);
            console.log(`   ${command.helpMessage}\n`);
        }
    }, "Provide this list of command information"),
    new Command("port", () => {
        interaction.question('What should the port be set to?\n', awnser => {
            port = awnser;
            console.log(`Set the port to ${port}, ` + 
                "make sure to stop and start the server to use the new port.");
            askForCommand();
        })
    }, "Set the port of the web socket server"),
    new Command("start", () => {
        webSocketServer.start();
    }, "Starts the web socket server on the current set port."),
    new Command("stop", () => {
        webSocketServer.stop();
    }, "Stop the web socket server from running"),
    new Command("quit", () => {
        active = false;
        console.log("Ending interaction, bye!")
        interaction.close();
    }, "Quit this program, ending this interaction"),
];

/**
 * Web socket server code that can be used to provide data to the web app.
 */
const WebSocket = require('ws');

/**
 * Web socket server class the use for testing the web app.
 */
class WebSocketServer {
    /** Connected connections for this web socket server. */
    connectedConnection;

    /** Web socket server */
    webSocketServer;

    constructor() {
        this.connectedConnection = new Set();
        this.webSocketServer;
    }

    /**
     * Start the web socket server.
     */
    start() {
        this.stop(); // In case we already have a websocket sever running.

        console.log(`Starting webSocketServer at port ${port}`);
        this.webSocketServer = new WebSocket.Server({ port: port });
        
        // Add reference to self to use in functions.
        let self = this;

        // Add connection listener that stores and handles the connection.
        this.webSocketServer.on('connection', function connection(webSocket) {
            self.connectedConnection.add(webSocket);
            console.log('Client connected');

            // Echo
            // webSocket.on('message', function incoming(message) {
            //     webSocket.send(`${message}`);
            // });
        
            webSocket.on('close', function () {
                console.log('Client disconnected');
                self.connectedConnection.delete(webSocket)
            });
        });
    }

    /**
     * Stop the web socket server.
     */
    stop() {
        console.log('Closing webSocketServer, if it has not been closed already.')
        this.webSocketServer?.close();
    }
    
    /**
     * Broadcase a message to all connections to the web socket.
     */
    broadcast(message) {
        console.log(`Broadcasting message '${message}' to ${this.connectedConnection.size} connections.`);
        this.connectedConnection.forEach(connectedWebSocket => {
            connectedWebSocket.send(message);
        });
    }
}

// Setup the webSocketServer.
webSocketServer = new WebSocketServer();

// Ask for initial command, until user quits.
askForCommand();