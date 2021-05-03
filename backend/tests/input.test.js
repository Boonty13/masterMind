var app = require('../app')
var request = require('supertest')

describe('InputLength', () => {

  // Premier test : si on ne rentre rien en entrée,
  // ça sort une erreur 'aucune données entrées'
  test('noInputCode', async (done) => {
    await
      request(app).post('/validate-input')
        .send({ 'inputCode': [] })
        .expect(200)
        .expect({
          result: false,
          errorMsg: 'aucune données entrées',
          inputCode: []
        })

    done()
  })

  // Deuxieme test : si on ne rentre que 2 couleurs,
  // ça sort une erreur 'le code contient 4 couleurs...'
  test('notEnoughColorsInput', async (done) => {
    await
      request(app).post('/validate-input')
        .send({ 'inputCode': ['blue', 'red'] })
        .expect(200)
        .expect({
          result: false,
          errorMsg: 'le code contient 4 couleurs...',
          inputCode: ['blue', 'red']
        })

    done()
  })

  // Troisieme test : si on rentre plus de 4 couleurs,
  // ça sort une erreur 'le code ne contient que 4 couleurs...'
  test('toMuchColorsInput', async (done) => {
    await
      request(app).post('/validate-input')
        .send({ 'inputCode': ['blue', 'red', 'blue', 'red', 'blue', 'red'] })
        .expect(200)
        .expect({
          result: false,
          errorMsg: 'le code ne contient que 4 couleurs...',
          inputCode: ['blue', 'red', 'blue', 'red', 'blue', 'red']
        })

    done()
  })

})


test('colorInvalid', async (done) => {
  await
    request(app).post('/validate-input')
      .send({ 'inputCode': ['rose', 'yellow', 'blue', 'blue'] })
      .expect(200)
      .expect({
        result: false,
        errorMsg: 'Certaines couleurs ne sont pas valides',
        inputCode: ['rose', 'yellow', 'blue', 'blue']
      })
  done()
})

test('inputValid', async (done) => {
  await
    request(app).post('/validate-input')
      .send({ 'inputCode': ['red', 'yellow', 'blue', 'blue'] })
      .expect(200)
      .expect({
        result: true,
        errorMsg: null,
        inputCode: ['red', 'yellow', 'blue', 'blue']
      })
  done()
})