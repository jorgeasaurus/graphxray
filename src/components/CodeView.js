import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeView = ({ request, lightUrl, snippetLanguage }) => {
  let urlStyle = atomOneDark;
  if (lightUrl) {
    urlStyle = atomOneLight;
  }

  let syntaxLanguage = snippetLanguage;

  return (
    <div>
      {request.displayRequestUrl && request.displayRequestUrl.length > 0 && (
        <SyntaxHighlighter
          language="jboss-cli"
          style={urlStyle}
          wrapLongLines={true}
        >
          {request.displayRequestUrl}
        </SyntaxHighlighter>
      )}
      {request.requestBody && request.requestBody.length > 0 && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div style={{ 
            fontSize: "12px", 
            fontWeight: "bold", 
            marginBottom: "5px",
            color: lightUrl ? "#333" : "#fff"
          }}>
            Request Body:
          </div>
          <SyntaxHighlighter
            language="json"
            style={atomOneDark}
            wrapLongLines={true}
          >
            {request.requestBody}
          </SyntaxHighlighter>
        </div>
      )}
      {request.code && request.code.length > 0 && (
        <SyntaxHighlighter
          language={syntaxLanguage}
          style={atomOneDark}
          wrapLongLines={true}
        >
          {request.code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
