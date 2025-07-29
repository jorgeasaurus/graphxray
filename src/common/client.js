const devxEndPoint =
  "https://devxapi-func-prod-eastus.azurewebsites.net/api/graphexplorersnippets";

const parseGraphUrl = function (url) {
  let path = url;
  let host = "graph.microsoft.com";

  // Handle both .com and .us endpoints
  if (url.includes("https://graph.microsoft.com")) {
    path = url.split("/graph.microsoft.com")[1];
    host = "graph.microsoft.com";
  } else if (url.includes("https://graph.microsoft.us")) {
    path = url.split("/graph.microsoft.us")[1];
    host = "graph.microsoft.us";
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

const getRequestBody = function (request) {
  let requestBody = "";
  if (request.postData && request.postData.text) {
    requestBody = request.postData.text;
  }
  return requestBody;
};

const getCodeView = async function (snippetLanguage, request, version) {
  if (["OPTIONS"].includes(request.method)) {
    return null;
  }
  console.log("GetCodeView", snippetLanguage, request);
  const requestBody = getRequestBody(request);
  const code = await getPowershellCmd(
    snippetLanguage,
    request.method,
    version + request.url,
    requestBody
  );
  const codeView = {
    displayRequestUrl: request.method + " " + request.url,
    code: code,
  };
  console.log("CodeView", codeView);
  return codeView;
};
export { getPowershellCmd, getRequestBody, getCodeView };
