import { createShader, createProgram } from './util';

// const SPECTOR = require('spectorjs');
// const spector = new SPECTOR.Spector();
// spector.displayUI();

export const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

uniform vec4 u_color;
uniform vec2 u_scale;
uniform vec2 u_xRange;
uniform vec2 u_yRange;

out vec4 v_color;

// all shaders have a main function
void main() {
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  vec2 t_position = vec2(
    ((a_position.x - u_xRange.x) / (u_xRange.y - u_xRange.x)) * 2.0 + -1.0,
    ((a_position.y - u_yRange.x) / (u_yRange.y - u_yRange.x)) * 2.0 + -1.0
  );

  v_color = u_color;

  gl_Position = vec4(t_position * u_scale, 0.0, 1.0);
}
`;

export const fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

in vec4 v_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = v_color;
}
`;

// new Array(132*2).fill(0).map((n, i) => i % 2 === 0 ? i/2*1000 : Math.random()*1000);

const torqueData = [0, 0, 1002, 6, 1999, 0, 3245, 0, 3996, -3, 5004, -5, 5996, 2, 7002, -4, 8000, 1, 9004, 0, 10003, -3, 11001, 2, 12003, 2, 13000, 0, 14004, 2, 15001, 4, 15999, -4, 17003, 0, 18000, 0, 18996, 3, 20000, 4, 20998, -2, 22002, -1, 23000, 0, 24004, 0, 25003, 0, 26003, -3, 27002, 0, 27998, 0, 29003, 4, 29999, 2, 31003, 5, 32001, 2, 33003, -4, 34000, -2, 35003, -5, 35999, -4, 37003, 3, 38001, 5, 38998, 0, 40003, 0, 41000, -5, 41996, 8, 43002, 2, 43999, 5, 45003, 0, 46000, 0, 47004, -2, 47996, 0, 49002, -5, 50000, 0, 51004, 2, 51996, -3, 53003, 0, 54000, 0, 55002, 2, 55999, 0, 57000, 0, 58002, -4, 59002, 0, 59999, 3, 60999, -1, 62003, 0, 63000, 1, 64004, 0, 64996, 0];
const randomData = [9000, 586.3267168238461, 10000, 908.0120768434472, 11000, 935.3723009668003, 12000, 191.43810403670813, 13000, 206.1692377055213, 14000, 576.6090854762244, 15000, 591.1059603273334, 16000, 499.38148031910123, 17000, 965.6829981590458, 18000, 871.5993574606966, 19000, 741.3875562445292, 20000, 157.95806540234224, 21000, 117.92535128997228, 22000, 506.1847827362538, 23000, 973.3485460894346, 24000, 185.76530702990658, 25000, 443.433362597236, 26000, 96.50603250742363, 27000, 539.1228064900175, 28000, 505.6408735809588, 29000, 505.58430427851, 30000, 107.34201753543826, 31000, 124.95142497142186, 32000, 573.1144650812206, 33000, 642.4863530315502, 34000, 735.1575544981807, 35000, 494.6026088819018, 36000, 610.8810151051512, 37000, 649.4442544599198, 38000, 286.28223548480423, 39000, 637.9070637151996, 40000, 594.3307215972146, 41000, 678.1463133830581, 42000, 463.23624400666375, 43000, 87.24865939047999, 44000, 81.53610868060612, 45000, 601.0391243468334, 46000, 450.6753675469532, 47000, 302.0500726153503, 48000, 476.7012912877047, 49000, 975.9080179778714, 50000, 574.4777996091619, 51000, 399.8786269724439, 52000, 360.38609270452906, 53000, 972.0596982020581, 54000, 81.59216515525536, 55000, 749.7475537618096, 56000, 799.0950828487273, 57000, 522.7947191668536, 58000, 95.18221816933448, 59000, 745.4052136066435, 60000, 564.2149704491137, 61000, 69.83843411306, 62000, 522.6453563024962, 63000, 52.28049741517849, 64000, 488.5459336976545, 65000, 284.76223470499383, 66000, 525.4892946415499, 67000, 973.8822240331444, 68000, 706.2731734918179, 69000, 987.2440924557997, 70000, 573.6870591924035, 71000, 62.19093573356105, 72000, 494.89449128975707, 73000, 603.2138966090228, 74000, 360.5512047947255, 75000, 976.9194406511292, 76000, 811.5822568542568, 77000, 463.0594567273998, 78000, 333.49632292917295, 79000, 404.9842675559474, 80000, 607.1877077878403, 81000, 613.4011009017919, 82000, 485.1775738714428, 83000, 586.8666726452598, 84000, 283.6863559634997, 85000, 119.6114720041479, 86000, 810.8697652723076, 87000, 137.37057993635827, 88000, 314.3921777444374, 89000, 665.3749761181626, 90000, 39.762966348633185, 91000, 5.489782016320222, 92000, 558.1278231317273, 93000, 562.4209644668501, 94000, 567.3161224113165, 95000, 131.73964595043296, 96000, 547.911791483297, 97000, 444.23554663716925, 98000, 823.2044201711337, 99000, 992.2222332224558, 100000, 321.394264219993, 101000, 689.040912373516, 102000, 836.7949966820701, 103000, 474.18178582853045, 104000, 216.0113566044033, 105000, 261.1818373907797, 106000, 787.2636002038329, 107000, 110.16936199031457, 108000, 93.27945223656565, 109000, 990.1162342528285, 110000, 932.9055567722766, 111000, 804.9417574548534, 112000, 201.8059582548073, 113000, 243.7923866390632, 114000, 140.57483441879316, 115000, 145.63575054847468, 116000, 487.6576039895861, 117000, 698.3280085750146, 118000, 757.6968744009782, 119000, 702.4171058661883, 120000, 647.5897840605215, 121000, 554.6648036240798, 122000, 818.9508884973216, 123000, 173.87431154821954, 124000, 550.4639678666721, 125000, 914.9269211643833, 126000, 895.8544151484356, 127000, 617.92118165979, 128000, 197.54720306688455, 129000, 746.3316558006612, 130000, 41.05705354426847, 131000, 212.73082679725275];

export interface GlscopeSignal {
  color: number[],
  data: number[],
};

export class Glscope {

  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | undefined = undefined;

  private positionAttribLocation: number = -1;

  private colorLocation: WebGLUniformLocation | null = null;
  private scaleLocation: WebGLUniformLocation | null = null;
  private yRangeLocation: WebGLUniformLocation | null = null;
  private xRangeLocation: WebGLUniformLocation | null = null;

  private _scale: number[] = [];
  private _xRange: number[] = [];
  private _yRange: number[] = [];

  private signals: GlscopeSignal[];

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true });
    if (gl) {
      this.gl = gl;
      this.signals = [
        { color: [1.0, 0.0, 0.5, 1.0], data: torqueData },
        { color: [0.5, 1.0, 0.5, 1.0], data: randomData },
      ];
    } else {
      throw new Error('Cannot get webgl2 context from canvas.');
    }
  }

  get scale() {
    return this._scale;
  }

  set scale(values: number[]) {
    if (this.scaleLocation) {
      this._scale = values;
      this.gl.uniform2fv(this.scaleLocation, new Float32Array(this.scale));
    } else {
      throw new Error('Scale location is not initalized.')
    }
  }

  get xRange() {
    return this._xRange;
  }

  set xRange(values: number[]) {
    if (this.xRangeLocation) {
      this._xRange = values;
      this.gl.uniform2fv(this.xRangeLocation, new Float32Array(this.xRange));
    } else {
      throw new Error('X range location is not initalized.')
    }
  }

  get yRange() {
    return this._yRange;
  }

  set yRange(values: number[]) {
    if (this.yRangeLocation) {
      this._yRange = values;
      this.gl.uniform2fv(this.yRangeLocation, new Float32Array(this.yRange));
    } else {
      throw new Error('Y range location is not initalized.')
    }
  }

  init(): void {
    const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (vertexShader && fragmentShader) {
      this.program = createProgram(this.gl, vertexShader, fragmentShader);
      if (this.program) {
        // Tell WebGL how to convert from clip space to pixels
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'a_position');

        // Tell it to use our program (pair of shaders)
        this.gl.useProgram(this.program);

        this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');
        this.scaleLocation = this.gl.getUniformLocation(this.program, 'u_scale');
        this.xRangeLocation = this.gl.getUniformLocation(this.program, 'u_xRange');
        this.yRangeLocation = this.gl.getUniformLocation(this.program, 'u_yRange');

        this.yRange = [-50, 1000];
        this.xRange = [0, 65000];
        this.scale = [1, 1];

        const self = this;

        function loop() {
          self.gl.clearColor(0.0, 0.0, 0.0, 1.0);
          self.gl.clear(self.gl.COLOR_BUFFER_BIT | self.gl.DEPTH_BUFFER_BIT);

          for (const signal of self.signals) {
            self.draw(signal.data, signal.color);
            self.gl.drawArrays(self.gl.LINE_STRIP, 0, signal.data.length / 2);
          }

          requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
      }
    }
  }

  addData(data: []) {
    console.log(data);
  }

  draw(vertices: number[], color: number[]) {
    if (this.program) {
      const torqueVertexBufferObject = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, torqueVertexBufferObject);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

      this.gl.uniform4fv(this.colorLocation, new Float32Array(color));

      this.gl.vertexAttribPointer(
        this.positionAttribLocation, // attribute location (index)
        2, // number of elements per attribute (2 components per iteration)
        this.gl.FLOAT, // type of elements
        false, // normalized
        0, // 0 = move forward size * sizeof(type) each iteration to get the next position
        0, // start at the beginning of the buffer
      );

      this.gl.enableVertexAttribArray(this.positionAttribLocation);
    }
  }

}
