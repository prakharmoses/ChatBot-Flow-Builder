# ChatBot Flow Builder

## 📖 Introduction

Design and customize the logic of your chatbot without writing a single line of code!
Chatbot Flow Builder empowers users to visually create and edit conversational flows using a drag-and-drop interface. Built on top of React and React Flow, this tool is intuitive, extensible, and production-ready.

## 📝 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Benefits](#benefits)
4. [Getting Started](#gettingstarted)
5. [Usage](#usage)
6. [Architecture](#architecture)
7. [Author](#author)
8. [License](#license)

## <div id="overview">📝 Overview</div>

Chatbot Flow Builder is a drag-and-drop based flow editor for building chatbot logic visually. It allows you to define message nodes, connect them in order, edit messages from a settings panel, and validate the flow before saving.

It leverages React Flow under the hood and is architected to easily support new types of nodes, validations, and export formats.

## <div id="features">✨ Features</div>

<ul>
  <li><strong>Drag and Drop Interface:</strong> Add new message nodes by dragging them from the Nodes Panel to the canvas.</li>
  <li><strong>Message Nodes:</strong> Currently supports text message nodes (editable from both canvas and settings panel).</li>
  <li><strong>Settings Panel:</strong> View and update the selected node’s properties with real-time sync.</li>
  <li><strong>Edge Creation:</strong> Connect nodes using directional edges to define chatbot flow logic.</li>
  <li><strong>Edge Rules:</strong> Each node's source handle can only create one outgoing edge, but can receive multiple incoming edges.</li>
  <li><strong>Flow Validation:</strong> Before saving, the tool checks if all nodes are connected to the flow.</li>
  <li><strong>Save Flow:</strong> Export your bot logic as a downloadable JSON file only if the graph is fully connected.</li>
</ul>

## <div id="benefits">📈 Benefits</div>

<ul>
  <li><strong>No-Code Bot Design:</strong> Ideal for product owners, content creators, and designers.</li>
  <li><strong>Extensible:</strong> The system is designed to easily allow new node types (like media messages, input forms, etc.)</li>
  <li><strong>Validation First:</strong> Prevents incomplete or disconnected flows from being saved accidentally.</li>
  <li><strong>Clear State Management:</strong> Uses state lifting and controlled components to keep UI and data in sync.</li>
</ul>

## <div id="gettingstarted">📲 Getting Started</div>

Follow these steps to run the project locally on your system:

1. Clone the repository:
    ```bash
    git clone https://github.com/prakharmoses/chatbot-flow-builder
    ```

2. Go inside the folder and install dependencies
    ```bash
    cd chatbot-flow-builder
    ```
    ```bash
    npm install
    ```

3. Start Development Server
    ```bash
    npm start
    ```

Tha app will run at: http://localhost:3000

   <strong>Note:</strong>
   <ul>
     <li>The command given above are for windows.</li>
     <li>Default PORT for React is 3000, that's why the above service will run on 3000 port. It can be customized or something else if that port is already in use.
     <li>The <strong>LIVE SERVICE</strong> can be found: </li>
   </ul>

##  <div id="usage">🧑🏽‍💻 Usage</div>

1. <strong>Landing UI</strong>

   <ul>
     <li>The left panel shows the Nodes Panel (available message types).</li>
     <li>The center canvas allows node placement and connection.</li>
     <li>The right panel displays the Settings Panel when a node is selected.</li>
   </ul>

   The landing screen will look like as shown below.

   <img width="1917" height="922" alt="image" src="https://github.com/user-attachments/assets/61777be4-7e79-4b1e-a823-42b3dabf37fb" />

2. <strong>Add a Message Node</strong>

   Drag the "Message Node" from the left panel and drop it onto the canvas.

3. <strong>Connect Nodes</strong>

   <ul>
     <li>Use the source handle to draw an edge to another node’s target handle.</li>
     <li>A source handle can only have one outgoing connection.</li>
   </ul>

4. <strong>Edit Node Properties</strong>

   <ul>
     <li>Select a node → Settings panel will appear on the right</li>
     <li>Edit the message in the text area — updates are reflected live on the canvas.</li>
   </ul>

   <img width="1918" height="927" alt="image" src="https://github.com/user-attachments/assets/93e7a157-5fb0-4d47-9d96-5a65e2534ce8" />


5. <strong>Save Flow</strong>

   <ul>
     <li>Click the “Save” button in the Navbar.</li>
     <li>If any node is unconnected, an error is shown.</li>
     <li>Otherwise, a .json file is downloaded containing the entire flow.</li>
   </ul>

## <div id='architecture'>🏰 Architecture</div>

  ### App.jsx
  <ul>
    <li>Root component that manages global state (nodes, edges) and handles saving logic.</li>
  </ul>

  ### 🔧 Components
  <ul>
    <li>
      <strong>FlowCanvas.jsx</strong>: Main canvas area built with ReactFlow. Manages:
      <ul>
        <li>Drag/drop node creation</li>
        <li>Node/edge state</li>
        <li>Selection state</li>
        <li>Edge constraints (only one source)</li>
      </ul>
    </li>
    <li><strong>NodesPanel.jsx</strong>: Contains draggable node types. Easily extendable to support more node types.</li>
    <li><strong>SettingsPanel.jsx</strong>: Appears when a node is selected. Reads and updates the node’s properties.</li>
    <li><strong>MessageNode.jsx</strong>: Custom React Flow node with live-editing support via onChange. Also settings UI for MessageNode, wired to keep data in sync.</li>
    <li><strong>Navbar.jsx</strong>: Having Save button.</li>
    <li><strong>nodeRegistry.jsx</strong>: Keeps record of all types of nodes, their settings UI and initial data.</li>
  </ul>

  ### 📦 Data Flow
  <ul>
    <li>Node data is created from a centralized <em>nodeRegistry</em> definition.</li>
    <li>
      <em>onNodeDataChange(id, newData)</em> updates the specific node and syncs both:
      <ul>
        <li>Canvas (React Flow node)</li>
        <li>Settings Panel (controlled textarea)</li>
      </ul>
    </li>
    <li>Node click sets <em>selectedNode</em>, which is passed to Settings Panel.</li>
  </ul>

  ### ✅ Flow Validation (Before Saving)
  <ul>
    <li>Each node must be connected (i.e., no isolated node).</li>
    <li>Directionality is ignored for validation (i.e., undirected DFS).</li>
    <li>If valid, the flow is exported to a JSON file.</li>
  </ul>

## <div id="author">🎓 Author</div>

<p>  <a href="https://github.com/prakharmosesOK"><b>Prakhar Moses</b><a/><p/>

## <div id="license">📋 License</div>

This repository is under no license.
