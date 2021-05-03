var app = require('../app')
var request = require('supertest')


describe('Well placed colors', () => {

  // Premier test : si aucune couleur n'est bien placée,
  // ça retourne [0,0]
  test('noWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'blue', 'blue', 'blue'],
          secretCode: ['red', 'red', 'red', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 0],
          inputCode: ['blue', 'blue', 'blue', 'blue']
        })

    done()
  })

  // Deuxieme test : si une couleur est bien placée,
  // ça retourne [1,0]
  test('oneWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'red', 'blue', 'blue'],
          secretCode: ['red', 'red', 'red', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 0],
          inputCode: ['blue', 'red', 'blue', 'blue']
        })

    done()
  })

  // Troisieme test : si deux couleurs sont bien placées,
  // ça retourne [2,0]
  test('twoWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'red', 'red', 'blue'],
          secretCode: ['red', 'red', 'red', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 0],
          inputCode: ['blue', 'red', 'red', 'blue']
        })

    done()
  })

  // Quatrieme test : si trois couleurs sont bien placées,
  // ça retourne [3,0]
  test('threeWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'red', 'red', 'green'],
          secretCode: ['red', 'red', 'red', 'green']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [3, 0],
          inputCode: ['blue', 'red', 'red', 'green']
        })

    done()
  })

  // Cinquieme test : si les quatres couleurs sont bien placées,
  // ça retourne [4,0]
  test('fourWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['green', 'red', 'blue', 'blue'],
          secretCode: ['green', 'red', 'blue', 'blue']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [4, 0],
          inputCode: ['green', 'red', 'blue', 'blue']
        })

    done()
  })

})


// ------------------------------------------ //


describe('Misplaced colors', () => {

  // Premier test : si aucune couleur n'est mal placée,
  // ça retourne [0,0]
  test('noMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'blue', 'blue', 'blue'],
          secretCode: ['red', 'red', 'red', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 0],
          inputCode: ['blue', 'blue', 'blue', 'blue']
        })

    done()
  })

  // Deuxieme test : si une couleur n'est pas bien placée,
  // ça retourne [0,1]
  test('oneMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'red', 'blue', 'blue'],
          secretCode: ['red', 'green', 'red', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 1],
          inputCode: ['blue', 'red', 'blue', 'blue']
        })

    done()
  })

  // Troisieme test : si deux couleurs ne sont pas bien placées,
  // ça retourne [0,2]
  test('twoMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'red', 'green', 'blue'],
          secretCode: ['red', 'green', 'red', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 2],
          inputCode: ['blue', 'red', 'green', 'blue']
        })

    done()
  })

  // Quatrieme test : si trois couleurs ne sont pas bien placées,
  // ça retourne [0,3]
  test('threeMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'red', 'green', 'orange'],
          secretCode: ['red', 'green', 'orange', 'violet']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 3],
          inputCode: ['blue', 'red', 'green', 'orange']
        })

    done()
  })

   // Cinquieme test : si quatre couleurs ne sont pas bien placées,
  // ça retourne [0,4]
  test('fourMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['violet', 'red', 'green', 'orange'],
          secretCode: ['red', 'green', 'orange', 'violet']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 4],
          inputCode: ['violet', 'red', 'green', 'orange']
        })

    done()
  })

})


// ------------------------------------------ //


describe('Mix well placed and misplaced', () => {

  // Premier test : si aucune couleur ne correspond au code,
  // ça retourne [0,0]
  test('zeroWellZeroMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'blue', 'blue', 'blue'],
          secretCode: ['green', 'red', 'violet', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 0],
          inputCode: ['blue', 'blue', 'blue', 'blue']
        })

    done()
  })

  // Deuxieme test : si une couleur est bien placée et une mal placée,
  // ça retourne [1,1]
  test('oneWellOneMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['green', 'violet', 'blue', 'blue'],
          secretCode: ['green', 'red', 'violet', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 1],
          inputCode: ['green', 'violet', 'blue', 'blue']
        })

    done()
  })

  // Troisieme test : si une couleur est bien placée et deux mal placées,
  // ça retourne [1,2]
  test('oneWellTwoMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['green', 'violet', 'red', 'blue'],
          secretCode: ['green', 'red', 'violet', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 2],
          inputCode: ['green', 'violet', 'red', 'blue']
        })

    done()
  })

  // Quatrieme test : si deux couleurs sont bien placées et une mal placée,
  // ça retourne [2,1]
  test('twoWellOneMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['green', 'violet', 'blue', 'red'],
          secretCode: ['green', 'red', 'violet', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 1],
          inputCode: ['green', 'violet', 'blue', 'red']
        })

    done()
  })

  // Cinquieme test : si deux couleurs sont bien placées et deux mal placées,
  // ça retourne [2,2]
  test('twoWellTwoMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['green', 'violet', 'red', 'red'],
          secretCode: ['green', 'red', 'violet', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 2],
          inputCode: ['green', 'violet', 'red', 'red']
        })

    done()
  })

  // Sixieme test : si une couleur est bien placée et trois mal placées,
  // ça retourne [1,3]
  test('oneWellThreeMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['violet', 'green', 'red', 'red'],
          secretCode: ['green', 'red', 'violet', 'red']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 3],
          inputCode: ['violet', 'green', 'red', 'red']
        })

    done()
  })

  // Septieme test : si deux couleurs identiques sont bien placées mais que trois pions de cette couleurs sont dans la proposition,
  // ça retourne [2,0]
  test('twoWellThreeColors', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['blue', 'green', 'blue', 'blue'],
          secretCode: ['blue', 'red', 'blue', 'orange']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 0],
          inputCode: ['blue', 'green', 'blue', 'blue']
        })

    done()
  })

})

