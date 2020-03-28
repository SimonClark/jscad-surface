const test = require('ava')

const extrudeSurface = require('./extrudeSurface')
const heightmap = require('./heightmap')

test('extrudeSurface (defaults)', t => {
  let data = [
    0.5, 0.4, 0.3, 0.2, 0.1, 0.0,
    0.6, 0.5, 0.4, 0.3, 0.2, 0.1,
    0.7, 0.6, 0.5, 0.4, 0.3, 0.2,
    0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
    0.9, 0.8, 0.7, 0.6, 0.5, 0.4,
    1.0, 0.9, 0.8, 0.7, 0.6, 0.5
  ]
  let map = heightmap.create(data, 6, 6)
  let geom = extrudeSurface({}, map)

  t.is(geom.polygons.length, 50) // 5 x 5 x 2 triangles
})

test('extrudeSurface (scale)', t => {
  let data = [
    0.5, 0.4, 0.3, 0.2, 0.1, 0.0,
    0.6, 0.5, 0.4, 0.3, 0.2, 0.1,
    0.7, 0.6, 0.5, 0.4, 0.3, 0.2,
    0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
    0.9, 0.8, 0.7, 0.6, 0.5, 0.4,
    1.0, 0.9, 0.8, 0.7, 0.6, 0.5
  ]
  let map = heightmap.create(data, 6, 6)
  let geom = extrudeSurface({scale: [5, 5, 10]}, map)

  t.is(geom.polygons.length, 50) // 5 x 5 x 2 triangles

  t.deepEqual(geom.polygons[0].vertices, [[0, 0, 5], [0, -5, 6], [5, 0, 4]])
})

test('extrudeSurface (color)', t => {
  let data = [
    1.0, 0.5, 0.0, 0.0, 0.5, 1.0,
    0.5, 0.0, 0.5, 0.5, 0.0, 0.5,
    0.0, 1.0, 2.0, 2.0, 1.0, 0.0,
    0.0, 1.0, 2.0, 2.0, 1.0, 0.0,
    0.5, 0.0, 0.5, 0.5, 0.0, 0.5,
    1.0, 0.5, 0.0, 0.0, 0.5, 1.0
  ]
  let map = heightmap.create(data, 6, 6)
  let geom = extrudeSurface({scale: [5, 5, 10], basecolor: [0, 0, 0, 1]}, map)

  t.is(geom.polygons.length, 50) // 5 x 5 x 2 triangles

  t.deepEqual(geom.polygons[0].color, [0, 1, 3.3306690738754696e-16, 1])
})
