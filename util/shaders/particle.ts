export const vertexShader = `
  attribute vec2 position;
  attribute vec2 translate;
  attribute float size;
  attribute float alpha;

  uniform vec2 resolution;
  uniform float dpr;

  varying float vAlpha;

  void main() {
    vec2 pos = position + translate;
    vec2 clipSpace = (pos / resolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = size * dpr;
    vAlpha = alpha;
  }
`;

export const fragmentShader = `
  precision mediump float;
  varying float vAlpha;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float r = length(coord);
    float circle = 1.0 - smoothstep(0.3, 0.5, r);
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * circle);
  }
`;
