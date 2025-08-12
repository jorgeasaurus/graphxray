# Graph X-Ray: See the Code Behind the Clicks

| Microsoft Edge | Google Chrome |
|-|-|
| [![Microsoft Edge Add-ons](https://img.shields.io/badge/Microsoft_Edge-Install_Graph_X--Ray-0078d4?style=for-the-badge&logo=microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/addons/detail/graph-xray/oplgganppgjhpihgciiifejplnnpodak) | [![Chrome Web Store](https://img.shields.io/badge/Google_Chrome-Install_Graph_X--Ray-4285f4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore/detail/graph-x-ray/gdhbldfajbedclijgcmmmobdbnjhnpdh) |
|![Edge Web Store Users](https://img.shields.io/badge/Microsoft_Edge_--_Users-10k-gray?style=social&color=purple) ![Edge Web Store Stars](https://img.shields.io/chrome-web-store/stars/gdhbldfajbedclijgcmmmobdbnjhnpdh?style=social&label=Microsoft%20Edge%20-%20Rating&color=purple) | ![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/gdhbldfajbedclijgcmmmobdbnjhnpdh?style=social&label=Chrome%20-%20Users&color=purple) ![Chrome Web Store Stars](https://img.shields.io/chrome-web-store/stars/gdhbldfajbedclijgcmmmobdbnjhnpdh?style=social&label=Chrome%20-%20Rating&color=purple) |

Unlock the power of automation and learning in the Microsoft 365 ecosystem. Graph X-Ray is a developer tool that demystifies the Microsoft admin portals by revealing the exact Microsoft Graph API calls being made in the background as you work.

Stop spending hours digging through documentation to figure out how to automate a task. Simply perform the action in the portal, and Graph X-Ray will provide you with the corresponding, ready-to-use script. It's the ultimate "learn by doing" tool for Microsoft Graph.

![Demo of opening Graph X-Ray panel](./public/img/tutorial/graphxraydemo.gif)

## Key Features

- **API Call Inspection**: Capture and inspect all Microsoft Graph API requests (GET, POST, PATCH, DELETE) and their full responses directly within your browser's developer tools.

- **Instant Script Generation**: Automatically convert recorded API calls into functional code snippets.

- **Multi-Language Support**: Generate scripts in the most popular languages for M365 automation, including:

  - Microsoft Graph PowerShell
  - Python
  - C#
  - JavaScript
  - Go
  - Java
  - Objective-C

- **Accelerate Automation**: Go from a manual, repetitive task in the UI to a fully automated script in seconds.

## Who is this for?

- **Microsoft 365 Administrators** wanting to automate user management, policy configuration, and reporting.

- **DevOps Engineers** building CI/CD pipelines for Microsoft 365 and Azure environments.

- **Developers** creating applications that integrate with Microsoft Graph.

- **IT Consultants & Support Professionals** who need to quickly script solutions for clients.

Supercharge your Microsoft 365 workflow. Install Graph X-Ray today and turn your clicks into code!

## Install

Install the Graph X-Ray extension for your favorite browser:

| Microsoft Edge | Google Chrome |
|-|-|
| [![Microsoft Edge Add-ons](https://img.shields.io/badge/Microsoft_Edge-Install_Graph_X--Ray-0078d4?style=for-the-badge&logo=microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/addons/detail/graph-xray/oplgganppgjhpihgciiifejplnnpodak) | [![Chrome Web Store](https://img.shields.io/badge/Google_Chrome-Install_Graph_X--Ray-4285f4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore/detail/graph-x-ray/gdhbldfajbedclijgcmmmobdbnjhnpdh) |
|![Edge Web Store Users](https://img.shields.io/badge/Microsoft_Edge_--_Users-10k-gray?style=social&color=purple) ![Edge Web Store Stars](https://img.shields.io/chrome-web-store/stars/gdhbldfajbedclijgcmmmobdbnjhnpdh?style=social&label=Microsoft%20Edge%20-%20Rating&color=purple) | ![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/gdhbldfajbedclijgcmmmobdbnjhnpdh?style=social&label=Chrome%20-%20Users&color=purple) ![Chrome Web Store Stars](https://img.shields.io/chrome-web-store/stars/gdhbldfajbedclijgcmmmobdbnjhnpdh?style=social&label=Chrome%20-%20Rating&color=purple) |

## Supported Microsoft Graph Endpoints

The extension detects and generates code snippets for Microsoft Graph calls across:

- **graph.microsoft.com** (Public cloud)
- **graph.microsoft.us** (US Government cloud - GCC High)
- **dod-graph.microsoft.us** (US Department of Defense)
- **microsoftgraph.chinacloudapi.cn** (China cloud)

## Supported Microsoft Admin Portal Environments

The extension works with any web page that makes Graph API calls. We've primarily tested with

- Microsoft Entra
- Microsoft Intune

If there are admin portals where you are not seeing Graph X-Ray work as expected, please open an [issue](https://github.com/merill/graphxray/issues), even better, submit a pull request by following the steps in [Adding non-Graph API calls to Ultra X-Ray](#adding-non-graph-api-calls-to-ultra-x-ray).

## Getting Started

### Viewing the Graph call stack trace

To view Graph calls in real-time:

- Browse to the **Microsoft admin portal (Entra, Intune...)**
- Open **Developer Tools**
- Open the **Graph X-Ray panel** in Developer Tools
- Make changes in the portal to record and view the corresponding Graph API calls and PowerShell commands

![Demo of opening Graph X-Ray panel](./public/img/tutorial/graphxraydemo.gif)

### Step by step guide

#### Open Developer Tools

##### Using the keyboard

- Press **F12** on Windows
- Press **Cmd+Opt+I** on macOS

##### Using the menu

- On Microsoft Edge open the menu from the top right then select **Extensions**
- On Google Chrome open the menu from the top right then select **More Tools** and click **Extensions**

![Screenshot of selecting Developer Tools in Edge](./public/img/tutorial/Tutorial-1.png)

#### Open the Graph X-Ray panel

Expand the tabs in Developer Tools and select the Graph X-Ray panel.

If you don't see the Graph X-Ray panel you may need to restart your browser.

![Screenshot of opening Graph X-Ray pane](./public/img/tutorial/Tutorial-2.png)

#### View Graph call stack trace

Make changes in the Azure Portal to view the corresponding Graph API calls and PowerShell commands for the action (e.g. edit a user's profile information and click Save).

Scroll down in the Graph X-Ray panel to view the new stack trace.

![Screenshot of viewing graph changes](./public/img/tutorial/Tutorial-3.png)

## Developer Guide

### On Windows

`winget install OpenJS.NodeJS.LTS` to install nodejs and npm

### On other OS

`npm install` to install dependencies
`npm start` to compile and debug
To load the extension, go to chrome://extensions or edge://extensions, turn on developer mode, click on "load unpacked", and navigate to the ./dev folder.
`npm run build` to build the extension for production

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Adding non-Graph API calls to Ultra X-Ray

Ultra X-Ray shows calls to non-Graph API endpoints. Unfortunately, we need to explicitly add each endpoint to the extension.

To add support for a new endpoint.

1. **Figure out the API endpoint** - View the network requests in the browser's developer tools and find out the domain where the API is hosted.
1. **Add domain to [domains.js](./src/common/domains.js)** - Add the new domain to the list of domains in the `domains.js` file.
1. **Add domain to [manifest.json](./src/public/manifest.json)** - Note the manifest requires the / at the end of the domain.
1. **Test the endpoint** - Make a request to the new blade and verify that it appears in Graph X-Ray.
