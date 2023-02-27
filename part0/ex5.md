```mermaid
  sequenceDiagram
      participant browser
      participant server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
      activate server
      server-->>browser: the HTML document
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
      activate server
      server-->>browser: the css file
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
      activate server
      server-->>browser: the SPA JavaScript file
      deactivate server

      Note right of browser: browser executes the JavaScript that fetches the JSON file from the server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
      activate server
      server-->>browser: list of json objects
      deactivate server

      Note right of browser: The browser executes the callback function that renders the notes
      
      browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
      activate server
      server-->>browser: The favicon
      deactivate server
```
