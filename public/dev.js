// Cross-browser devtools panel creation
(function() {
  const api = typeof browser !== 'undefined' ? browser : chrome;
  const iconPath = typeof browser !== 'undefined' ? "" : null; // Firefox needs empty string
  const panelPath = typeof browser !== 'undefined' ? "devtools.html" : "/devtools.html";
  
  api.devtools.panels.create("Graph X-Ray", iconPath, panelPath, function (panel) {
    console.log("Graph X-Ray: ", panel);
  });
})();