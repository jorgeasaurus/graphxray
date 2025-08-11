import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IconButton } from "@fluentui/react/lib/Button";

export const CodeView = ({ request, lightUrl, snippetLanguage }) => {
  const [isRequestBodyExpanded, setIsRequestBodyExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  let urlStyle = atomOneDark;
  if (lightUrl) {
    urlStyle = atomOneLight;
  }

  let syntaxLanguage = snippetLanguage;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard:", text);
      // You could add visual feedback here (like a brief "Copied!" message)
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const toggleRequestBody = () => {
    setIsRequestBodyExpanded(!isRequestBodyExpanded);
  };

  return (
    <div>
      {request.displayRequestUrl && request.displayRequestUrl.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            {((request.requestBody && request.requestBody.length > 0) || (request.responseContent && request.responseContent.length > 0)) && (
              <IconButton
                iconProps={{ iconName: isRequestBodyExpanded ? "ChevronDown" : "ChevronRight" }}
                title={isRequestBodyExpanded ? "Collapse request/response" : "Expand request/response"}
                onClick={toggleRequestBody}
                onMouseEnter={() => setHoveredButton('expand')}
                onMouseLeave={() => setHoveredButton(null)}
                styles={{
                  root: {
                    minWidth: "24px",
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                    color: lightUrl ? "#333" : "#fff",
                    backgroundColor: hoveredButton === 'expand'
                      ? (lightUrl ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)")
                      : "transparent",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease"
                  },
                  rootHovered: {
                    backgroundColor: lightUrl ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
                  }
                }}
              />
            )}
            <div style={{ position: "relative", flex: 1 }}>
              <SyntaxHighlighter
                language="jboss-cli"
                style={urlStyle}
                wrapLongLines={true}
                customStyle={{
                  borderRadius: "8px",
                  padding: "12px",
                  paddingRight: "50px", // Make room for copy button
                  margin: 0
                }}
              >
                {request.displayRequestUrl}
              </SyntaxHighlighter>
              <IconButton
                iconProps={{ iconName: "Copy" }}
                title="Copy URL to clipboard"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard(request.displayRequestUrl);
                }}
                onMouseEnter={() => setHoveredButton('url-copy')}
                onMouseLeave={() => setHoveredButton(null)}
                styles={{
                  root: {
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: hoveredButton === 'url-copy'
                      ? (lightUrl ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.25)")
                      : (lightUrl ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.1)"),
                    color: lightUrl ? "#333" : "#fff",
                    border: hoveredButton === 'url-copy'
                      ? (lightUrl ? "1px solid rgba(0, 0, 0, 0.2)" : "1px solid rgba(255, 255, 255, 0.3)")
                      : "1px solid transparent",
                    borderRadius: "4px",
                    padding: "4px",
                    cursor: "pointer",
                    minWidth: "32px",
                    width: "32px",
                    height: "32px",
                    transition: "all 0.2s ease",
                    boxShadow: hoveredButton === 'url-copy'
                      ? "0 2px 4px rgba(0, 0, 0, 0.1)"
                      : "none"
                  }
                }}
              />
            </div>
          </div>
          {isRequestBodyExpanded && ((request.requestBody && request.requestBody.length > 0) || (request.responseContent && request.responseContent.length > 0)) && (
            <div style={{
              border: "2px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.02)"
            }}>
              {request.requestBody && request.requestBody.length > 0 && (
                <div style={{ marginBottom: request.responseContent && request.responseContent.length > 0 ? "15px" : "0" }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "8px"
                  }}>
                    Request
                  </div>
                  <div style={{ position: "relative" }}>
                    <SyntaxHighlighter
                      language="json"
                      style={atomOneDark}
                      wrapLongLines={true}
                      customStyle={{
                        borderRadius: "8px",
                        padding: "12px",
                        paddingRight: "50px" // Make room for copy button
                      }}
                    >
                      {request.requestBody}
                    </SyntaxHighlighter>
                    <IconButton
                      iconProps={{ iconName: "Copy" }}
                      title="Copy request body to clipboard"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(request.requestBody);
                      }}
                      onMouseEnter={() => setHoveredButton('body-copy')}
                      onMouseLeave={() => setHoveredButton(null)}
                      styles={{
                        root: {
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: hoveredButton === 'body-copy'
                            ? "rgba(255, 255, 255, 0.25)"
                            : "rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          border: hoveredButton === 'body-copy'
                            ? "1px solid rgba(255, 255, 255, 0.4)"
                            : "1px solid transparent",
                          borderRadius: "4px",
                          padding: "4px",
                          cursor: "pointer",
                          minWidth: "32px",
                          width: "32px",
                          height: "32px",
                          transition: "all 0.2s ease",
                          boxShadow: hoveredButton === 'body-copy'
                            ? "0 2px 6px rgba(0, 0, 0, 0.2)"
                            : "none"
                        }
                      }}
                    />
                  </div>
                </div>
              )}
              {request.responseContent && request.responseContent.length > 0 && (
                <div>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "8px"
                  }}>
                    Response
                  </div>
                  <div style={{ position: "relative" }}>
                    <SyntaxHighlighter
                      language="json"
                      style={atomOneDark}
                      wrapLongLines={true}
                      customStyle={{
                        borderRadius: "8px",
                        padding: "12px",
                        paddingRight: "50px" // Make room for copy button
                      }}
                    >
                      {request.responseContent}
                    </SyntaxHighlighter>
                    <IconButton
                      iconProps={{ iconName: "Copy" }}
                      title="Copy response to clipboard"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(request.responseContent);
                      }}
                      onMouseEnter={() => setHoveredButton('response-copy')}
                      onMouseLeave={() => setHoveredButton(null)}
                      styles={{
                        root: {
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: hoveredButton === 'response-copy'
                            ? "rgba(255, 255, 255, 0.25)"
                            : "rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          border: hoveredButton === 'response-copy'
                            ? "1px solid rgba(255, 255, 255, 0.4)"
                            : "1px solid transparent",
                          borderRadius: "4px",
                          padding: "4px",
                          cursor: "pointer",
                          minWidth: "32px",
                          width: "32px",
                          height: "32px",
                          transition: "all 0.2s ease",
                          boxShadow: hoveredButton === 'response-copy'
                            ? "0 2px 6px rgba(0, 0, 0, 0.2)"
                            : "none"
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {request.code && request.code.length > 0 && (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            language={syntaxLanguage}
            style={atomOneDark}
            wrapLongLines={true}
            customStyle={{
              borderRadius: "8px",
              padding: "12px",
              paddingRight: "50px" // Make room for copy button
            }}
          >
            {request.code}
          </SyntaxHighlighter>
          <IconButton
            iconProps={{ iconName: "Copy" }}
            title="Copy code to clipboard"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyToClipboard(request.code);
            }}
            onMouseEnter={() => setHoveredButton('code-copy')}
            onMouseLeave={() => setHoveredButton(null)}
            styles={{
              root: {
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: hoveredButton === 'code-copy'
                  ? "rgba(255, 255, 255, 0.25)"
                  : "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                border: hoveredButton === 'code-copy'
                  ? "1px solid rgba(255, 255, 255, 0.4)"
                  : "1px solid transparent",
                borderRadius: "4px",
                padding: "4px",
                cursor: "pointer",
                minWidth: "32px",
                width: "32px",
                height: "32px",
                transition: "all 0.2s ease",
                boxShadow: hoveredButton === 'code-copy'
                  ? "0 2px 6px rgba(0, 0, 0, 0.2)"
                  : "none"
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
