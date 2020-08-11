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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Glscope = exports.fragmentShaderSource = exports.vertexShaderSource = void 0;\nconst util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n// const SPECTOR = require('spectorjs');\n// const spector = new SPECTOR.Spector();\n// spector.displayUI();\nexports.vertexShaderSource = `#version 300 es\n\n// an attribute is an input (in) to a vertex shader.\n// It will receive data from a buffer\nin vec2 a_position;\n\nuniform vec4 u_color;\nuniform vec2 u_scale;\nuniform vec2 u_xRange;\nuniform vec2 u_yRange;\n\nout vec4 v_color;\n\n// all shaders have a main function\nvoid main() {\n  // gl_Position is a special variable a vertex shader\n  // is responsible for setting\n  vec2 t_position = vec2(\n    ((a_position.x - u_xRange.x) / (u_xRange.y - u_xRange.x)) * 2.0 + -1.0,\n    ((a_position.y - u_yRange.x) / (u_yRange.y - u_yRange.x)) * 2.0 + -1.0\n  );\n\n  v_color = u_color;\n\n  gl_Position = vec4(t_position * u_scale, 0.0, 1.0);\n}\n`;\nexports.fragmentShaderSource = `#version 300 es\n\n// fragment shaders don't have a default precision so we need\n// to pick one. highp is a good default. It means \"high precision\"\nprecision highp float;\n\nin vec4 v_color;\n\n// we need to declare an output for the fragment shader\nout vec4 outColor;\n\nvoid main() {\n  outColor = v_color;\n}\n`;\n// new Array(132*2).fill(0).map((n, i) => i % 2 === 0 ? i/2*1000 : Math.random()*1000);\nconst torqueData = [0, 0, 1002, 6, 1999, 0, 3245, 0, 3996, -3, 5004, -5, 5996, 2, 7002, -4, 8000, 1, 9004, 0, 10003, -3, 11001, 2, 12003, 2, 13000, 0, 14004, 2, 15001, 4, 15999, -4, 17003, 0, 18000, 0, 18996, 3, 20000, 4, 20998, -2, 22002, -1, 23000, 0, 24004, 0, 25003, 0, 26003, -3, 27002, 0, 27998, 0, 29003, 4, 29999, 2, 31003, 5, 32001, 2, 33003, -4, 34000, -2, 35003, -5, 35999, -4, 37003, 3, 38001, 5, 38998, 0, 40003, 0, 41000, -5, 41996, 8, 43002, 2, 43999, 5, 45003, 0, 46000, 0, 47004, -2, 47996, 0, 49002, -5, 50000, 0, 51004, 2, 51996, -3, 53003, 0, 54000, 0, 55002, 2, 55999, 0, 57000, 0, 58002, -4, 59002, 0, 59999, 3, 60999, -1, 62003, 0, 63000, 1, 64004, 0, 64996, 0];\nconst randomData = [9000, 586.3267168238461, 10000, 908.0120768434472, 11000, 935.3723009668003, 12000, 191.43810403670813, 13000, 206.1692377055213, 14000, 576.6090854762244, 15000, 591.1059603273334, 16000, 499.38148031910123, 17000, 965.6829981590458, 18000, 871.5993574606966, 19000, 741.3875562445292, 20000, 157.95806540234224, 21000, 117.92535128997228, 22000, 506.1847827362538, 23000, 973.3485460894346, 24000, 185.76530702990658, 25000, 443.433362597236, 26000, 96.50603250742363, 27000, 539.1228064900175, 28000, 505.6408735809588, 29000, 505.58430427851, 30000, 107.34201753543826, 31000, 124.95142497142186, 32000, 573.1144650812206, 33000, 642.4863530315502, 34000, 735.1575544981807, 35000, 494.6026088819018, 36000, 610.8810151051512, 37000, 649.4442544599198, 38000, 286.28223548480423, 39000, 637.9070637151996, 40000, 594.3307215972146, 41000, 678.1463133830581, 42000, 463.23624400666375, 43000, 87.24865939047999, 44000, 81.53610868060612, 45000, 601.0391243468334, 46000, 450.6753675469532, 47000, 302.0500726153503, 48000, 476.7012912877047, 49000, 975.9080179778714, 50000, 574.4777996091619, 51000, 399.8786269724439, 52000, 360.38609270452906, 53000, 972.0596982020581, 54000, 81.59216515525536, 55000, 749.7475537618096, 56000, 799.0950828487273, 57000, 522.7947191668536, 58000, 95.18221816933448, 59000, 745.4052136066435, 60000, 564.2149704491137, 61000, 69.83843411306, 62000, 522.6453563024962, 63000, 52.28049741517849, 64000, 488.5459336976545, 65000, 284.76223470499383, 66000, 525.4892946415499, 67000, 973.8822240331444, 68000, 706.2731734918179, 69000, 987.2440924557997, 70000, 573.6870591924035, 71000, 62.19093573356105, 72000, 494.89449128975707, 73000, 603.2138966090228, 74000, 360.5512047947255, 75000, 976.9194406511292, 76000, 811.5822568542568, 77000, 463.0594567273998, 78000, 333.49632292917295, 79000, 404.9842675559474, 80000, 607.1877077878403, 81000, 613.4011009017919, 82000, 485.1775738714428, 83000, 586.8666726452598, 84000, 283.6863559634997, 85000, 119.6114720041479, 86000, 810.8697652723076, 87000, 137.37057993635827, 88000, 314.3921777444374, 89000, 665.3749761181626, 90000, 39.762966348633185, 91000, 5.489782016320222, 92000, 558.1278231317273, 93000, 562.4209644668501, 94000, 567.3161224113165, 95000, 131.73964595043296, 96000, 547.911791483297, 97000, 444.23554663716925, 98000, 823.2044201711337, 99000, 992.2222332224558, 100000, 321.394264219993, 101000, 689.040912373516, 102000, 836.7949966820701, 103000, 474.18178582853045, 104000, 216.0113566044033, 105000, 261.1818373907797, 106000, 787.2636002038329, 107000, 110.16936199031457, 108000, 93.27945223656565, 109000, 990.1162342528285, 110000, 932.9055567722766, 111000, 804.9417574548534, 112000, 201.8059582548073, 113000, 243.7923866390632, 114000, 140.57483441879316, 115000, 145.63575054847468, 116000, 487.6576039895861, 117000, 698.3280085750146, 118000, 757.6968744009782, 119000, 702.4171058661883, 120000, 647.5897840605215, 121000, 554.6648036240798, 122000, 818.9508884973216, 123000, 173.87431154821954, 124000, 550.4639678666721, 125000, 914.9269211643833, 126000, 895.8544151484356, 127000, 617.92118165979, 128000, 197.54720306688455, 129000, 746.3316558006612, 130000, 41.05705354426847, 131000, 212.73082679725275];\n;\nclass Glscope {\n    constructor(canvas) {\n        this.program = undefined;\n        this.positionAttribLocation = -1;\n        this.colorLocation = null;\n        this.scaleLocation = null;\n        this.yRangeLocation = null;\n        this.xRangeLocation = null;\n        this._scale = [];\n        this._xRange = [];\n        this._yRange = [];\n        const gl = canvas.getContext('webgl2', { antialias: true });\n        if (gl) {\n            this.gl = gl;\n            this.signals = [\n                { color: [1.0, 0.0, 0.5, 1.0], data: torqueData },\n                { color: [0.5, 1.0, 0.5, 1.0], data: randomData },\n            ];\n        }\n        else {\n            throw new Error('Cannot get webgl2 context from canvas.');\n        }\n    }\n    get scale() {\n        return this._scale;\n    }\n    set scale(values) {\n        if (this.scaleLocation) {\n            this._scale = values;\n            this.gl.uniform2fv(this.scaleLocation, new Float32Array(this.scale));\n        }\n        else {\n            throw new Error('Scale location is not initalized.');\n        }\n    }\n    get xRange() {\n        return this._xRange;\n    }\n    set xRange(values) {\n        if (this.xRangeLocation) {\n            this._xRange = values;\n            this.gl.uniform2fv(this.xRangeLocation, new Float32Array(this.xRange));\n        }\n        else {\n            throw new Error('X range location is not initalized.');\n        }\n    }\n    get yRange() {\n        return this._yRange;\n    }\n    set yRange(values) {\n        if (this.yRangeLocation) {\n            this._yRange = values;\n            this.gl.uniform2fv(this.yRangeLocation, new Float32Array(this.yRange));\n        }\n        else {\n            throw new Error('Y range location is not initalized.');\n        }\n    }\n    init() {\n        const vertexShader = util_1.createShader(this.gl, this.gl.VERTEX_SHADER, exports.vertexShaderSource);\n        const fragmentShader = util_1.createShader(this.gl, this.gl.FRAGMENT_SHADER, exports.fragmentShaderSource);\n        if (vertexShader && fragmentShader) {\n            this.program = util_1.createProgram(this.gl, vertexShader, fragmentShader);\n            if (this.program) {\n                // Tell WebGL how to convert from clip space to pixels\n                this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);\n                this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'a_position');\n                // Tell it to use our program (pair of shaders)\n                this.gl.useProgram(this.program);\n                this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');\n                this.scaleLocation = this.gl.getUniformLocation(this.program, 'u_scale');\n                this.xRangeLocation = this.gl.getUniformLocation(this.program, 'u_xRange');\n                this.yRangeLocation = this.gl.getUniformLocation(this.program, 'u_yRange');\n                this.yRange = [-50, 1000];\n                this.xRange = [0, 65000];\n                this.scale = [1, 1];\n                const self = this;\n                function loop() {\n                    self.gl.clearColor(0.0, 0.0, 0.0, 1.0);\n                    self.gl.clear(self.gl.COLOR_BUFFER_BIT | self.gl.DEPTH_BUFFER_BIT);\n                    for (const signal of self.signals) {\n                        self.draw(signal.data, signal.color);\n                        self.gl.drawArrays(self.gl.LINE_STRIP, 0, signal.data.length / 2);\n                    }\n                    requestAnimationFrame(loop);\n                }\n                requestAnimationFrame(loop);\n            }\n        }\n    }\n    addData(data) {\n        console.log(data);\n    }\n    draw(vertices, color) {\n        if (this.program) {\n            const torqueVertexBufferObject = this.gl.createBuffer();\n            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, torqueVertexBufferObject);\n            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);\n            this.gl.uniform4fv(this.colorLocation, new Float32Array(color));\n            this.gl.vertexAttribPointer(this.positionAttribLocation, // attribute location (index)\n            2, // number of elements per attribute (2 components per iteration)\n            this.gl.FLOAT, // type of elements\n            false, // normalized\n            0, // 0 = move forward size * sizeof(type) each iteration to get the next position\n            0);\n            this.gl.enableVertexAttribArray(this.positionAttribLocation);\n        }\n    }\n}\nexports.Glscope = Glscope;\n\n\n//# sourceURL=webpack:///./src/glscope.ts?");

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