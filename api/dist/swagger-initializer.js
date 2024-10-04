 function getScript(source) {
      var script = document.createElement('script');
      var prior = document.getElementsByTagName('script')[0];
      script.async = 1;

      script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          script = undefined;
        }
      };

      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    }


window.onload = function() {

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  
  const ui = SwaggerUIBundle({
    url: "openapi.json",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    docExpansion: 'none',
    filter: '',
    supportedSubmitMethods: [], // empty array in order to disable "Try it out" button
    validatorUrl: null, // disable spec validation
    onComplete: function () {            
       getScript('./dist/SwaggerTridion.js');            
    }
  });
  window.ui = ui;
};
