cytoscape-affinity-propagation
================================================================================

![Screenshot of clusters returned from affinity propagation algorithm](./demo-img.png?raw=true "Screenshot of clusters returned from affinity propagation algorithm")

An affinity propagation clustering algorithm for Cytoscape.js.


## Dependencies

 * Cytoscape.js >= 2.6.12


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-affinity-propagation`,
 * via bower: `bower install cytoscape-affinity-propagation`, or
 * via direct download in the repository.

`require()` the library as appropriate for your project:

CommonJS:
```js
var cytoscape = require('cytoscape');
var affinityPropagation = require('cytoscape-affinity-propagation');

affinityPropagation( cytoscape ); // register extension
```

AMD:
```js
require(['cytoscape', 'cytoscape-affinity-propagation'], function( cytoscape, affinityPropagation ){
  affinityPropagation( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.


## API

```js
cy.elements().affinityPropagation({
    preference: 'median',   // suitability of a data point to serve as an exemplar
    damping: 0.8,           // damping factor between [0.5, 1)
    maxIterations: 1000,    // max number of iterations to run
    convIterations: 100     // min number of iterations to run in order for clustering to stop
});
```

## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Set the version number environment variable: `export VERSION=1.2.3`
1. Publish: `gulp publish`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-affinity-propagation https://github.com/cytoscape.js-affinity-propagation.git`
