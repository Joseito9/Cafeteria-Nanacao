import request from 'supertest'
import app from '../index.js'

describe("CRUD operations of cafes", () => {
  describe('Testing the [GET] method', () => {
    it('Debería devolver un estado 200', async() => {
      const response = await request(app).get('/cafes').send()
      const status = response.statusCode
      expect(status).toBe(200)
    })
    it('El tipo de dato es un array con al menos un objeto.', async() => {
      const response = await request(app).get('/cafes').send()
      const cafes = response.body
      expect(cafes).toBeInstanceOf(Array)
      expect(cafes.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Testing the [DELETE] method', () => {
    it('Debería devolver un estado 404 al eliminar un café con un ID que no existe', async() => {
      const jwt = 'token'
      const id = 9999999
      const response = await request(app).delete(`/cafes/${id}`).set('Authorization', jwt).send()
      const status = response.statusCode
      expect(status).toBe(404)
    })
  })

  describe('Testing the [POST] method', () => {
    it('Deberia añadir un cafe y devolver un status 201', async() => {
      const jwt = 'token'
      const newCoffee = {
        nombre: 'Affogato'
      }
      const response = await request(app).post('/cafes').set('Authorization', jwt).send(newCoffee)
      const status = response.statusCode
      expect(status).toBe(201)
    })
  })

  describe('Testing the [PUT] method', () => {
    it('Deberia devolver un status 400 porque ID es diferente', async() => {
      const updateCoffee = {
        id: '5',
        nombre: 'Caramel Macchiato'
      }
      const response = await request(app).put('/cafes/2').send(updateCoffee)
      const status = response.statusCode
      expect(status).toBe(400)
    })
  })
})
