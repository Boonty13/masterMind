var app = require('../app')
var request = require('supertest')


describe('Well placed colors', () => {

  // Premier test : si aucune couleur n'est bien placée,
  // ça retourne [0,0]
  test('noWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'bleu', 'bleu', 'bleu'],
          secretCode: ['rouge', 'rouge', 'rouge', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 0],
          inputCode: ['bleu', 'bleu', 'bleu', 'bleu']
        })

    done()
  })

  // Deuxieme test : si une couleur est bien placée,
  // ça retourne [1,0]
  test('oneWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'rouge', 'bleu', 'bleu'],
          secretCode: ['rouge', 'rouge', 'rouge', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 0],
          inputCode: ['bleu', 'rouge', 'bleu', 'bleu']
        })

    done()
  })

  // Troisieme test : si deux couleurs sont bien placées,
  // ça retourne [2,0]
  test('twoWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'rouge', 'rouge', 'bleu'],
          secretCode: ['rouge', 'rouge', 'rouge', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 0],
          inputCode: ['bleu', 'rouge', 'rouge', 'bleu']
        })

    done()
  })

  // Quatrieme test : si trois couleurs sont bien placées,
  // ça retourne [3,0]
  test('threeWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'rouge', 'rouge', 'vert'],
          secretCode: ['rouge', 'rouge', 'rouge', 'vert']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [3, 0],
          inputCode: ['bleu', 'rouge', 'rouge', 'vert']
        })

    done()
  })

  // Cinquieme test : si les quatres couleurs sont bien placées,
  // ça retourne [4,0]
  test('fourWellPlaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['vert', 'rouge', 'bleu', 'bleu'],
          secretCode: ['vert', 'rouge', 'bleu', 'bleu']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [4, 0],
          inputCode: ['vert', 'rouge', 'bleu', 'bleu']
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
          inputCode: ['bleu', 'bleu', 'bleu', 'bleu'],
          secretCode: ['rouge', 'rouge', 'rouge', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 0],
          inputCode: ['bleu', 'bleu', 'bleu', 'bleu']
        })

    done()
  })

  // Deuxieme test : si une couleur n'est pas bien placée,
  // ça retourne [0,1]
  test('oneMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'rouge', 'bleu', 'bleu'],
          secretCode: ['rouge', 'vert', 'rouge', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 1],
          inputCode: ['bleu', 'rouge', 'bleu', 'bleu']
        })

    done()
  })

  // Troisieme test : si deux couleurs ne sont pas bien placées,
  // ça retourne [0,2]
  test('twoMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'rouge', 'vert', 'bleu'],
          secretCode: ['rouge', 'vert', 'rouge', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 2],
          inputCode: ['bleu', 'rouge', 'vert', 'bleu']
        })

    done()
  })

  // Quatrieme test : si trois couleurs ne sont pas bien placées,
  // ça retourne [0,3]
  test('threeMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['bleu', 'rouge', 'vert', 'orange'],
          secretCode: ['rouge', 'vert', 'orange', 'violet']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 3],
          inputCode: ['bleu', 'rouge', 'vert', 'orange']
        })

    done()
  })

   // Cinquieme test : si quatre couleurs ne sont pas bien placées,
  // ça retourne [0,4]
  test('fourMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['violet', 'rouge', 'vert', 'orange'],
          secretCode: ['rouge', 'vert', 'orange', 'violet']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 4],
          inputCode: ['violet', 'rouge', 'vert', 'orange']
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
          inputCode: ['bleu', 'bleu', 'bleu', 'bleu'],
          secretCode: ['vert', 'rouge', 'violet', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [0, 0],
          inputCode: ['bleu', 'bleu', 'bleu', 'bleu']
        })

    done()
  })

  // Deuxieme test : si une couleur est bien placée et une mal placée,
  // ça retourne [1,1]
  test('oneWellOneMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['vert', 'violet', 'bleu', 'bleu'],
          secretCode: ['vert', 'rouge', 'violet', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 1],
          inputCode: ['vert', 'violet', 'bleu', 'bleu']
        })

    done()
  })

  // Troisieme test : si une couleur est bien placée et deux mal placées,
  // ça retourne [1,2]
  test('oneWellTwoMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['vert', 'violet', 'rouge', 'bleu'],
          secretCode: ['vert', 'rouge', 'violet', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 2],
          inputCode: ['vert', 'violet', 'rouge', 'bleu']
        })

    done()
  })

  // Quatrieme test : si deux couleurs sont bien placées et une mal placée,
  // ça retourne [2,1]
  test('twoWellOneMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['vert', 'violet', 'bleu', 'rouge'],
          secretCode: ['vert', 'rouge', 'violet', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 1],
          inputCode: ['vert', 'violet', 'bleu', 'rouge']
        })

    done()
  })

  // Cinquieme test : si deux couleurs sont bien placées et deux mal placées,
  // ça retourne [2,2]
  test('twoWellTwoMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['vert', 'violet', 'rouge', 'rouge'],
          secretCode: ['vert', 'rouge', 'violet', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [2, 2],
          inputCode: ['vert', 'violet', 'rouge', 'rouge']
        })

    done()
  })

  // Sixieme test : si une couleur est bien placée et trois mal placées,
  // ça retourne [1,3]
  test('oneWellThreeMisplaced', async (done) => {
    await
      request(app).post('/evaluate-input')
        .send({
          inputCode: ['violet', 'vert', 'rouge', 'rouge'],
          secretCode: ['vert', 'rouge', 'violet', 'rouge']
        })
        .expect(200)
        .expect({
          result: true,
          evaluation: [1, 3],
          inputCode: ['violet', 'vert', 'rouge', 'rouge']
        })

    done()
  })

})

