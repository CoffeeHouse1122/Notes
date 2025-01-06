uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;


attribute vec3 position;
attribute vec2 uv;
// attribute float aRandom;

// varying float vRandom;
varying vec2 vUv;
varying float vElevation;


// float loremIpsum(float a, float b) {
//   return a + b;
// }

void main() {
  // float a = 1.0;
  // float b = 2.0;
  // float c = a + b;
  // int d = 3;
  // float e = a + float(d);
  // bool f = true;
  // vec2 h = vec2(1.0, 2.0);
  // h.x = 3.0;
  // h *= 2.0;
  // vec3 purpleColor = vec3(0.0);
  // purpleColor.r = 0.5;
  // purpleColor.b = 1.0;
  // vec3 i = vec3(h, 1.0);
  // vec2 j = i.xy;
  // vec4 k = vec4(1.0, 2.0, 3.0, 4.0);
  // float l = k.w;

  // float result = loremIpsum(a, b);

  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  // vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

  // modelPosition.z += aRandom * 0.1;

  // vec4 viewPosition = viewMatrix * modelPosition;
  // vec4 projectedPosition = projectionMatrix * viewPosition;

  // gl_Position = projectedPosition;

  // vRandom = aRandom;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;

  vElevation = elevation;
}