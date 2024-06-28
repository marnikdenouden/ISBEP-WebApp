ISBEP WebApp Elements
=============================

 - [Overview](#overview)
 - [Custom HTML elements](#custom-html-elements)
 - [Example WebApp](#example-webapp)
 - [Dependencies](#dependencies)

-----------------------------

# Overview
Web application for the Innovation Space Bachelor End Project (ISBEP)

# Custom HTML elements
Custom HTML elements in this repository allow robot data to be dynamically displayed in a web app interface. The scripts are easily added and integrated into existing displays, as is shown with the [example web app](#example-webapp) in this repository. The custom elements are fully writen in pure javascript and do not require any additional frameworks, thus allowing them to be integrated directly into any HTML site.

<details><summary>Data-Receiver</summary>
<br><blockquote>
The Data-Receiver element makes a websocket client connection to receive data. The element uses its defined host-address attribute to know where to check for the web socket server. After establishing a connection the Data-Receiver will emit a custom event named 'receivedata' that contains the received data.
</blockquote></details>

<details><summary>Data-Listener</summary>
<br><blockquote>
The Data-Listener element is linked to a Data-Receiver using the receiver-id attribute, which should represent the id attribute of the Data-Receiver element. When the 'receivedata' event occurs the Data-Listener will call the classes _receiveDataHandler() method, which a custom HTML element that extends the Data-Listener class should implement.
</blockquote></details>

<details><summary>Robot-Receiver and Robot-Listener</summary>
<br><blockquote>
The Robot-Receiver and Robot-Listener elements extend the functionality of the data listener and receiver by filtering for a specific robot. These elements utilize the custom serial-number attribute to specify what robot to filter for. Therefore the robot receiver and listener will only emit the 'receivedata' event and call the _receiveDataHandler() method respectively when either the serial tag in the root of a JSON object does not exists or matches the specified number in the serial-number attribute.
</blockquote></details>

<details><summary>Map-Situation</summary>
<br><blockquote>
The Map-Situation element provides a way to specify an area in which markers can be displayed with a specific position. Inside the Map-Situation element Map-Markers can be specified. The map can use the background-src attribute to specify what the background image should be and the situation-width, situation-heigth, situation-left-position and situation-top-position attributes to specify what area the map image represents. 
</blockquote></details>

<details><summary>Map-Marker</summary>
<br><blockquote>
The Map-Marker element can represent robot in an area defined by a Map-Situation parent. The Map-Marker is a Robot-Listener with additional attributes that can specify the display icon (icon-src), horizontal position (x-position), and vertical position (z-position) of the marker. 
</blockquote></details>

<details><summary>Robot-Sensor</summary>
<br><blockquote>
The Robot-Sensor element is a Robot-Listener that can display a value, which is also accesible as attribute, received from JSON data for a specified sensor key. The sensor-key attribute specifies for what key to recreive a value from a sensor named dictionary in the received robot data.
</blockquote></details>

<details><summary>Robot-Camera</summary>
<br><blockquote>
 The Robot-Camera element is a Robot-Listener that retrieves and display an image element from data at the camera-key attribute location in received robot data.
</blockquote></details>

# Example WebApp
In order to try out the example that functioned as part of the demonstrator follow the next steps.

- [1] Clone [this](https://github.com/marnikdenouden/ISBEP-WebApp) repository locally using [Git](https://git-scm.com), for example by [Git clone command](#git-clone-command)
- [2] Ensure all [dependencies](#dependencies) are present
- [3] Open command prompt terminal in the local repository folder
- [4] Run [command](#run-web-socket-server-with-nodejs) to execute web socket server script with [Node.js](https://nodejs.org/en/)
- [5] Send [start command](#start-command) in server terminal
- [6] Click the [index.html](index.html) to start the web app
- [7] Send [broadcast command](#broadcast-command) in server terminal
- [8] Send [position](#example-position-data) or [sensor](#example-sensor-data) example data that will update the display

#### Git clone command
    git clone https://github.com/marnikdenouden/ISBEP-WebApp

#### Run web socket server with Node.js
    node webSocketServer.js

#### Start command
    start
    
#### Broadcast command
    broadcast

#### Example position data
    {"serial": "00000000", "position": {"x": -0.5313510894775391, "y": 0.03349997103214264, "z": 0.7212914824485779}}

#### Example sensor data
    {"serial": "00000000", "sensor": {"temp":112.8743, "co":0.3927944, "ch4":0.5296978, "pressure":100.46093, "humid":18.7352333, "flow":1.67795694}}

## Interface design
The example web app interface as defined by the [index.html](index.html), [style.css](style.css), [styleguide.css](styleguide.css) and [globals.css](globals.css) was generated using the [Anima](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-vue-css-tailwind) Figma plugin from the Figma designed made by two psychology and technology students during the ISBEP project. Of course the custom HTML elements specified by this project were added after generation, as well as the script tag to showcase how to switch between the page robot.

# Dependencies
The example web app uses [Node.js](https://nodejs.org/en/) in order to make a web socket server, while the [custom HTML elements](#custom-html-elements) use the browser accepted [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) for a web socket connection as a client. The server requires [Node.js](https://nodejs.org/en/) for using the [ws module](https://github.com/websockets/ws).

## Local requirements
- Download and install [Node.js](https://nodejs.org/en/download/)
