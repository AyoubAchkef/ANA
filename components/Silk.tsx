'use client'

import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl'

type NormalizedRGB = [number, number, number]

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  return [r, g, b]
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec3 col = uColor * vec3(pattern) - vec3(rnd / 15.0 * uNoiseIntensity);
  gl_FragColor = vec4(col, 1.0);
}
`

export interface SilkProps {
  speed?: number
  scale?: number
  color?: string
  noiseIntensity?: number
  rotation?: number
}

export default function Silk({
  speed = 5,
  scale = 1,
  color = '#000000',
  noiseIntensity = 1.5,
  rotation = 0,
}: SilkProps) {
  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ctnDom.current) return
    const ctn = ctnDom.current
    const renderer = new Renderer()
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 1)

    let program: Program

    function resize() {
      const scale = 1
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale)
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        )
      }
    }
    window.addEventListener('resize', resize, false)
    resize()

    const geometry = new Triangle(gl)
    const rgb = hexToNormalizedRGB(color)

    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(rgb[0], rgb[1], rgb[2]) },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uNoiseIntensity: { value: noiseIntensity }
      }
    })

    const mesh = new Mesh(gl, { geometry, program })
    let animateId: number

    function update(t: number) {
      animateId = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001
      renderer.render({ scene: mesh })
    }
    animateId = requestAnimationFrame(update)
    ctn.appendChild(gl.canvas)

    return () => {
      cancelAnimationFrame(animateId)
      window.removeEventListener('resize', resize)
      ctn.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [color, speed, scale, noiseIntensity, rotation])

  return <div ref={ctnDom} className="w-full h-full" />
}
