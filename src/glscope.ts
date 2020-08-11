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

  private signals: GlscopeSignal[] = [];

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
    });

    if (gl) {
      this.gl = gl;
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

        this.xRange = [0, 50000];
        this.yRange = [-1000, 1000];
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

  addSignal(signal: GlscopeSignal) {
    this.signals.push(signal);
  }

  addData(index: number, time: number, amplitude: number) {
    this.signals[index].data.push(time, amplitude);
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
