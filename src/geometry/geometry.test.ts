import { angle, circularDifferenceDeg, distance, normalizeAngleDeg } from './geometry'

const p = (x: number, y: number, z = 0) => ({ x, y, z })

describe('geometry', () => {
  it('computes distance in coordinate units (Å for PDB coordinates)', () => {
    expect(distance(p(0, 0), p(3, 4))).toBe(5)
  })
  it('computes an angle with B as vertex', () => {
    expect(angle(p(1, 0), p(0, 0), p(0, 1))).toBeCloseTo(90)
  })
  it('rejects a zero-length angle arm', () => {
    expect(angle(p(0, 0), p(0, 0), p(1, 0))).toBeNull()
  })
  it('normalizes angles and compares across the wrap boundary', () => {
    expect(normalizeAngleDeg(540)).toBe(180)
    expect(circularDifferenceDeg(179, -179)).toBe(2)
  })
})
