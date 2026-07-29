import * as THREE from "three";

type EngineShaderUniforms = {
  uEngineAccent: THREE.IUniform<THREE.Color>;
  uEngineMotion: THREE.IUniform<number>;
  uEngineTime: THREE.IUniform<number>;
  uEngineTransition: THREE.IUniform<number>;
};

type EngineShaderState = {
  accent: THREE.ColorRepresentation;
  motion: number;
  time: number;
  transition: number;
};

const engineUniforms = new WeakMap<THREE.Material, EngineShaderUniforms>();

export function installEngineShaderPatch(
  material: THREE.MeshStandardMaterial,
  accent: THREE.ColorRepresentation,
): void {
  if (engineUniforms.has(material)) return;

  const uniforms: EngineShaderUniforms = {
    uEngineAccent: { value: new THREE.Color(accent) },
    uEngineMotion: { value: 1 },
    uEngineTime: { value: 0 },
    uEngineTransition: { value: 0 },
  };

  engineUniforms.set(material, uniforms);

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = `
      uniform float uEngineTime;
      uniform float uEngineMotion;
    ${shader.vertexShader}`.replace(
      "#include <begin_vertex>",
      `
        #include <begin_vertex>
        float engineRipple = sin(
          (position.x * 4.0) +
          (position.y * 7.0) +
          (position.z * 5.0) +
          (uEngineTime * 0.65)
        );
        transformed += normalize(objectNormal) * engineRipple * 0.006 * uEngineMotion;
      `,
    );

    shader.fragmentShader = `
      uniform vec3 uEngineAccent;
      uniform float uEngineTransition;
    ${shader.fragmentShader}`.replace(
      "#include <emissivemap_fragment>",
      `
        #include <emissivemap_fragment>
        vec3 engineViewDirection = normalize(vViewPosition);
        float engineFresnel = pow(
          1.0 - saturate(dot(normal, engineViewDirection)),
          3.0
        );
        vec3 transitionAccent = vec3(
          uEngineAccent.r * (1.0 + (uEngineTransition * 0.08)),
          uEngineAccent.g,
          uEngineAccent.b * (1.0 + (uEngineTransition * 0.05))
        );
        totalEmissiveRadiance += transitionAccent
          * engineFresnel
          * (0.16 + (uEngineTransition * 0.16));
      `,
    );
  };

  material.customProgramCacheKey = () => "cognitive-engine-surface-v1";
  material.needsUpdate = true;
}

export function updateEngineShader(
  material: THREE.Material,
  state: EngineShaderState,
): void {
  const uniforms = engineUniforms.get(material);
  if (!uniforms) return;

  uniforms.uEngineAccent.value.set(state.accent);
  uniforms.uEngineMotion.value = state.motion;
  uniforms.uEngineTime.value = state.time;
  uniforms.uEngineTransition.value = state.transition;
}
