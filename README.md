ISBEP WebApp Elements
=============================

 - [Overview](#overview)
 - [Features](#features)
 - [Example](#example)
 - [ISBEP](#isbep)
 - [Dependencies](#dependencies)

-----------------------------
# Overview
Web application for the innovation space bachelor end project

# Features

## 

# Example WebApp
In order to try out the example that functioned as part of the demonstrator follow the next steps.

- [1] Clone [this](https://github.com/marnikdenouden/ISBEP-WebApp) repository locally using [Git](https://git-scm.com), for example by [Git clone command](#git-clone-command)
- [2] Ensure all [dependencies](#dependencies) are present
- [3] Open command prompt terminal in the local repository folder
- [4] Run [command](#run-web-socket-server-with-node.js) to execute web socket server script with [Node.js](https://nodejs.org/en/)
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
The example web app interface as defined by the [index.html](index.html), [style.css](style.css), [styleguide.css](styleguide.css) and [globals.css](globals.css) was generated using the [Anima](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-vue-css-tailwind) Figma plugin from the Figma designed made by two psychology and technology students during the ISBEP project. Of course the custom html elements specified by this project were added after generation, as well as the script tag to showcase how to switch between the page robot.

# Dependencies
The example web app uses [Node.js](https://nodejs.org/en/) in order to make a web socket server, while the custom html elements use the browser accepted [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) for a web socket connection as a client. The server requires [Node.js](https://nodejs.org/en/) and the [ws module](https://github.com/websockets/ws). These dependencies can be installed as follows.
- Download [Node.js](https://nodejs.org/en/download/)
- Run install command with npm, which is included in Node.js
#### Install command ws
    npm install ws
