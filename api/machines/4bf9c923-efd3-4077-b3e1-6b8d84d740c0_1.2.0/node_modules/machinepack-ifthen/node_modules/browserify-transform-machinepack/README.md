<h1>
  <a href="http://node-machine.org" title="Node-Machine public registry"><img alt="node-machine logo" title="Node-Machine Project" src="http://node-machine.org/images/machine-anthropomorph-for-white-bg.png" width="50" /></a>
  browserify-transform-machinepack
</h1>

### [Docs](http://node-machine.org/machinepack-math) &nbsp; [Browse other machines](http://node-machine.org/machinepacks) &nbsp;  [FAQ](http://node-machine.org/implementing/FAQ)  &nbsp;  [Newsgroup](https://groups.google.com/forum/?hl=en#!forum/node-machine)

This package is a browserify transform that makes machinepacks work when they are required from a browserified module (or each other).


### Usage

To make a machinepack work with browserify, first run add this package as a depenendency:

```
npm install browserify-transform-machinepack --save
```

Then add the following to the package.json file of your machinepack:

```js
"browserify": {
  "transform": [
    "browserify-transform-machinepack"
  ]
}
```

Finally, commit, tag a new version of your pack (e.g. `npm version patch`), push to your repo, and publish to npm.

That's it!  Now you can require this machinepack from other browserified packages and scripts, as well as compile it directly.  For convenience during testing, a command that does the latter (`mp browserify`) is available in the machinepack CLI tool.

If you have any questions about this module, or issues using it, please [respond to the relevant post in the node-machine Google Group](https://groups.google.com/forum/#!topic/node-machine/TK3JYnCZ8Nw).


## License

MIT 

Copyright &copy; 2015 Mike McNeil, The Treeline Company

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
