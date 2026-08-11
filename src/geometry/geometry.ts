export type Point3 = Readonly<{ x: number; y: number; z: number }>

const vector = (from: Point3, to: Point3) => ({ x: to.x - from.x, y: to.y - from.y, z: to.z - from.z })
const magnitude = (v: Point3) => Math.hypot(v.x, v.y, v.z)
const dot = (a: Point3, b: Point3) => a.x * b.x + a.y * b.y + a.z * b.z
const cross = (a: Point3, b: Point3) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
})

export function distance(a: Point3, b: Point3): number {
  return magnitude(vector(a, b))
}

export function angle(a: Point3, b: Point3, c: Point3): number | null {
  const ba = vector(b, a)
  const bc = vector(b, c)
  const denominator = magnitude(ba) * magnitude(bc)
  if (denominator < Number.EPSILON) return null
  const cosine = Math.min(1, Math.max(-1, dot(ba, bc) / denominator))
  return Math.acos(cosine) * 180 / Math.PI
}

export function dihedral(a: Point3, b: Point3, c: Point3, d: Point3): number | null {
  const b0 = vector(b, a)
  const b1 = vector(b, c)
  const b2 = vector(c, d)
  const b1Length = magnitude(b1)
  if (b1Length < Number.EPSILON) return null
  const n1 = cross(b0, b1)
  const n2 = cross(b1, b2)
  if (magnitude(n1) < Number.EPSILON || magnitude(n2) < Number.EPSILON) return null
  const b1Unit = { x: b1.x / b1Length, y: b1.y / b1Length, z: b1.z / b1Length }
  return normalizeAngleDeg(Math.atan2(dot(cross(n1, n2), b1Unit), dot(n1, n2)) * 180 / Math.PI)
}

export function normalizeAngleDeg(value: number): number {
  const normalized = ((value + 180) % 360 + 360) % 360 - 180
  return normalized === -180 && value > 0 ? 180 : normalized
}

export function circularDifferenceDeg(a: number, b: number): number {
  return Math.abs(normalizeAngleDeg(a - b))
}
