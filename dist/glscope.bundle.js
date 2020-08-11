/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/glscope.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/glscope.ts":
/*!************************!*\
  !*** ./src/glscope.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Glscope = exports.fragmentShaderSource = exports.vertexShaderSource = void 0;\nconst util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n// const SPECTOR = require('spectorjs');\n// const spector = new SPECTOR.Spector();\n// spector.displayUI();\nexports.vertexShaderSource = `#version 300 es\n\n// an attribute is an input (in) to a vertex shader.\n// It will receive data from a buffer\nin vec2 a_position;\n\nuniform vec4 u_color;\nuniform vec2 u_scale;\nuniform vec2 u_xRange;\nuniform vec2 u_yRange;\n\nout vec4 v_color;\n\n// all shaders have a main function\nvoid main() {\n  // gl_Position is a special variable a vertex shader\n  // is responsible for setting\n  vec2 t_position = vec2(\n    ((a_position.x - u_xRange.x) / (u_xRange.y - u_xRange.x)) * 2.0 + -1.0,\n    ((a_position.y - u_yRange.x) / (u_yRange.y - u_yRange.x)) * 2.0 + -1.0\n  );\n\n  v_color = u_color;\n\n  gl_Position = vec4(t_position * u_scale, 0.0, 1.0);\n}\n`;\nexports.fragmentShaderSource = `#version 300 es\n\n// fragment shaders don't have a default precision so we need\n// to pick one. highp is a good default. It means \"high precision\"\nprecision highp float;\n\nin vec4 v_color;\n\n// we need to declare an output for the fragment shader\nout vec4 outColor;\n\nvoid main() {\n  outColor = v_color;\n}\n`;\n;\nclass Glscope {\n    constructor(canvas) {\n        this.program = undefined;\n        this.positionAttribLocation = -1;\n        this.colorLocation = null;\n        this.scaleLocation = null;\n        this.yRangeLocation = null;\n        this.xRangeLocation = null;\n        this._scale = [];\n        this._xRange = [];\n        this._yRange = [];\n        this.signals = [];\n        const gl = canvas.getContext('webgl2', {\n            alpha: false,\n            antialias: false,\n        });\n        if (gl) {\n            this.gl = gl;\n        }\n        else {\n            throw new Error('Cannot get webgl2 context from canvas.');\n        }\n        gl.canvas.addEventListener('mousemove', (ev) => {\n            const x = ev.clientX;\n            const out = this.signals.map(signal => [signal.data[x * 2], signal.data[x * 2 + 1]]);\n            console.log(JSON.stringify(out));\n        });\n        gl.canvas.addEventListener('mousewheel', (ev) => {\n            const dy = ev.deltaY;\n            const scale = dy * 0.0005;\n            this.scale = [this.scale[0] + scale, this.scale[1] + scale];\n        });\n    }\n    get scale() {\n        return this._scale;\n    }\n    set scale(values) {\n        if (this.scaleLocation) {\n            this._scale = values;\n            this.gl.uniform2fv(this.scaleLocation, new Float32Array(this.scale));\n        }\n        else {\n            throw new Error('Scale location is not initalized.');\n        }\n    }\n    get xRange() {\n        return this._xRange;\n    }\n    set xRange(values) {\n        if (this.xRangeLocation) {\n            this._xRange = values;\n            this.gl.uniform2fv(this.xRangeLocation, new Float32Array(this.xRange));\n        }\n        else {\n            throw new Error('X range location is not initalized.');\n        }\n    }\n    get yRange() {\n        return this._yRange;\n    }\n    set yRange(values) {\n        if (this.yRangeLocation) {\n            this._yRange = values;\n            this.gl.uniform2fv(this.yRangeLocation, new Float32Array(this.yRange));\n        }\n        else {\n            throw new Error('Y range location is not initalized.');\n        }\n    }\n    init() {\n        const vertexShader = util_1.createShader(this.gl, this.gl.VERTEX_SHADER, exports.vertexShaderSource);\n        const fragmentShader = util_1.createShader(this.gl, this.gl.FRAGMENT_SHADER, exports.fragmentShaderSource);\n        if (vertexShader && fragmentShader) {\n            this.program = util_1.createProgram(this.gl, vertexShader, fragmentShader);\n            if (this.program) {\n                // Tell WebGL how to convert from clip space to pixels\n                this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);\n                this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'a_position');\n                // Tell it to use our program (pair of shaders)\n                this.gl.useProgram(this.program);\n                this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');\n                this.scaleLocation = this.gl.getUniformLocation(this.program, 'u_scale');\n                this.xRangeLocation = this.gl.getUniformLocation(this.program, 'u_xRange');\n                this.yRangeLocation = this.gl.getUniformLocation(this.program, 'u_yRange');\n                this.xRange = [0, 50000];\n                this.yRange = [-1000, 1000];\n                this.scale = [1, 1];\n                const self = this;\n                function loop() {\n                    self.gl.clearColor(0.0, 0.0, 0.0, 1.0);\n                    self.gl.clear(self.gl.COLOR_BUFFER_BIT | self.gl.DEPTH_BUFFER_BIT);\n                    for (const signal of self.signals) {\n                        self.draw(signal.data, signal.color);\n                        self.gl.drawArrays(self.gl.LINE_STRIP, 0, signal.data.length / 2);\n                    }\n                    requestAnimationFrame(loop);\n                }\n                requestAnimationFrame(loop);\n            }\n        }\n    }\n    addSignal(signal) {\n        this.signals.push(signal);\n    }\n    addData(index, time, amplitude) {\n        this.signals[index].data.push(time, amplitude);\n    }\n    draw(vertices, color) {\n        if (this.program) {\n            const torqueVertexBufferObject = this.gl.createBuffer();\n            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, torqueVertexBufferObject);\n            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);\n            this.gl.uniform4fv(this.colorLocation, new Float32Array(color));\n            this.gl.vertexAttribPointer(this.positionAttribLocation, // attribute location (index)\n            2, // number of elements per attribute (2 components per iteration)\n            this.gl.FLOAT, // type of elements\n            false, // normalized\n            0, // 0 = move forward size * sizeof(type) each iteration to get the next position\n            0);\n            this.gl.enableVertexAttribArray(this.positionAttribLocation);\n        }\n    }\n}\nexports.Glscope = Glscope;\n\n\n//# sourceURL=webpack:///./src/glscope.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createProgram = exports.createShader = void 0;\nfunction createShader(gl, type, source) {\n    const shader = gl.createShader(type);\n    if (shader) {\n        gl.shaderSource(shader, source);\n        gl.compileShader(shader);\n        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\n        if (success) {\n            return shader;\n        }\n        console.log(gl.getShaderInfoLog(shader));\n        gl.deleteShader(shader);\n    }\n}\nexports.createShader = createShader;\nfunction createProgram(gl, vertexShader, fragmentShader) {\n    const program = gl.createProgram();\n    if (program) {\n        gl.attachShader(program, vertexShader);\n        gl.attachShader(program, fragmentShader);\n        gl.linkProgram(program);\n        const success = gl.getProgramParameter(program, gl.LINK_STATUS);\n        if (success) {\n            return program;\n        }\n        console.log(gl.getProgramInfoLog(program));\n        gl.deleteProgram(program);\n    }\n}\nexports.createProgram = createProgram;\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });