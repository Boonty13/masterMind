// import { ExpectationFailed } from 'http-errors'
const sum = require('../routes/sum')


test('addition', ()=>{
  expect(sum(1,2)).toBe(3)
})