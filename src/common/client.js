const devxEndPoint =
  "https://devxapi-func-prod-eastus.azurewebsites.net/api/graphexplorersnippets";

const parseGraphUrl = function (url) {
  let path = url;
  let host = "graph.microsoft.com";

  // Handle all known Graph API endpoints
  if (url.includes("https://graph.microsoft.com")) {
    path = url.split("/graph.microsoft.com")[1];
    host = "graph.microsoft.com";
  } else if (url.includes("https://graph.microsoft.us")) {
    path = url.split("/graph.microsoft.us")[1];
    host = "graph.microsoft.us";
  } else if (url.includes("https://dod-graph.microsoft.us")) {
    path = url.split("/dod-graph.microsoft.us")[1];
    host = "dod-graph.microsoft.us";
  } else if (url.includes("https://microsoftgraph.chinacloudapi.cn")) {
    path = url.split("/microsoftgraph.chinacloudapi.cn")[1];
    host = "microsoftgraph.chinacloudapi.cn";
  }

  return { path, host };
};

const getPowershellCmd = async function (snippetLanguage, method, url, body) {
  if (url.includes("$batch")) {
    console.log("Batch graph call. Ignoring for code snippet.");
    return null;
  }

  console.log("Get code snippet from DevX:", url, method);
  const bodyText = body ?? ""; //Cast undefined and null to string
  // Use the extracted parseGraphUrl function
  const { path: parsedPath, host } = parseGraphUrl(url);
  const path = encodeURI(parsedPath); //Replace the spaces in OData with + as expected by API
  const payload = `${method} ${path} HTTP/1.1\r\nHost: ${host}\r\nContent-Type: application/json\r\n\r\n${bodyText}`;
  console.log("Payload:", payload);

  const snippetParam = "?lang=%snippetLanguage%".replace(
    "%snippetLanguage%",
    snippetLanguage
  );
  const openApiParam = "&generation=openapi";

  let devxSnippetUri = devxEndPoint;
  if (snippetLanguage === "c#") {
    devxSnippetUri = devxEndPoint;
  } else if (["javascript", "java", "objective-c"].includes(snippetLanguage)) {
    devxSnippetUri = devxEndPoint + snippetParam;
  } else if (["go", "powershell"].includes(snippetLanguage)) {
    devxSnippetUri = devxEndPoint + snippetParam + openApiParam;
  }

  try {
    const response = await fetch(devxSnippetUri, {
      headers: {
        "content-type": "application/http",
      },
      method: "POST",
      body: payload,
    });
    console.log("DevX responded");
    if (response.ok) {
      const resp = response.text();
      console.log("DevX-Reponse", resp);
      return resp;
    } else {
      const errorText = await response.text();
      const errorMsg = `DevXError: ${response.status} ${response.statusText} for ${method} ${url} - Response: ${errorText}`;
      console.error(errorMsg);
      return null;
    }
  } catch (error) {
    const errorMsg = `DevXError: Network/Request error for ${method} ${url} - ${
      error.message || error
    }`;
    console.error(errorMsg, error);
  }
};

const getRequestBody = async function (request) {
  let requestBody = "";
  
  console.log("getRequestBody - request object:", request);
  
  // First, check if the request object directly has a body property (seems to be the case!)
  if (request.body) {
    if (typeof request.body === 'string') {
      requestBody = request.body;
    } else {
      requestBody = JSON.stringify(request.body);
    }
    console.log("getRequestBody - found body in request.body:", requestBody);
    return requestBody;
  }
  
  // Second, try to get from the standard devtools API (limited access)
  if (request.postData && request.postData.text) {
    requestBody = request.postData.text;
    console.log("getRequestBody - found body in postData:", requestBody);
    return requestBody;
  }
  
  // Try using getContent() method if available (for DevTools Network requests)
  if (!requestBody && request._harEntry && typeof request._harEntry.getContent === 'function') {
    console.log("getRequestBody - trying getContent() method on harEntry");
    try {
      const content = await new Promise((resolve) => {
        request._harEntry.getContent((content, encoding) => {
          console.log("getRequestBody - getContent returned:", content, encoding);
          resolve(content);
        });
      });
      if (content) {
        requestBody = content;
        console.log("getRequestBody - found body from getContent:", requestBody);
        return requestBody;
      }
    } catch (error) {
      console.log("getRequestBody - getContent failed:", error);
    }
  }
  
  // If no body found, try to get from background script using URL
  if (!requestBody && request.url) {
    console.log("getRequestBody - trying background script with URL:", request.url);
    try {
      // Try both the path and common full URL variations
      const urlsToTry = [
        request.url,
        `https://graph.microsoft.com/v1.0${request.url}`,
        `https://graph.microsoft.com/beta${request.url}`,
        `https://graph.microsoft.us/v1.0${request.url}`,
        `https://graph.microsoft.us/beta${request.url}`
      ];
      
      for (const url of urlsToTry) {
        const response = await chrome.runtime.sendMessage({
          type: "GET_REQUEST_BODY",
          url: url
        });
        console.log("getRequestBody - background script response for", url, ":", response);
        if (response && response.body) {
          requestBody = response.body;
          console.log("getRequestBody - found body from background script:", requestBody);
          return requestBody;
        }
      }
    } catch (error) {
      console.log("Could not get request body from background script:", error);
    }
  }
  
  console.log("getRequestBody - final result:", requestBody);
  return requestBody;
};

const getResponseContent = async function (harEntry) {
  let responseContent = "";
  
  console.log("getResponseContent - harEntry:", harEntry);
  
  // Try to get response content from harEntry
  if (harEntry && harEntry.response) {
    console.log("getResponseContent - response object:", harEntry.response);
    
    // Check if response has content directly
    if (harEntry.response.content && harEntry.response.content.text) {
      responseContent = harEntry.response.content.text;
      console.log("getResponseContent - found content in response.content.text:", responseContent);
      return responseContent;
    }
    
    // Try using getContent() method if available
    if (typeof harEntry.getContent === 'function') {
      console.log("getResponseContent - trying getContent() method");
      try {
        const content = await new Promise((resolve) => {
          harEntry.getContent((content, encoding) => {
            console.log("getResponseContent - getContent returned:", content, encoding);
            resolve(content);
          });
        });
        if (content) {
          responseContent = content;
          console.log("getResponseContent - found content from getContent:", responseContent);
          return responseContent;
        }
      } catch (error) {
        console.log("getResponseContent - getContent failed:", error);
      }
    }
  }
  
  console.log("getResponseContent - final result:", responseContent);
  return responseContent;
};

const getCodeView = async function (snippetLanguage, request, version, harEntry = null) {
  if (["OPTIONS"].includes(request.method)) {
    return null;
  }
  console.log("GetCodeView", snippetLanguage, request, harEntry);
  const requestBody = await getRequestBody(request);
  const responseContent = harEntry ? await getResponseContent(harEntry) : "";
  const code = await getPowershellCmd(
    snippetLanguage,
    request.method,
    version + request.url,
    requestBody
  );
  const codeView = {
    displayRequestUrl: request.method + " " + request.url,
    requestBody: requestBody,
    responseContent: responseContent,
    code: code,
  };
  console.log("CodeView", codeView);
  return codeView;
};
export { getPowershellCmd, getRequestBody, getResponseContent, getCodeView };
