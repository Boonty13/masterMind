var express = require('express');
var router = express.Router();

// MasterMind : 6 different colors
// Bleu, Rouge, Vert, Jaune, Violet, Orange

// Code contains 4 colors

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// FUNCTION : to validate the input array
router.post('/validate-input', function (req, res, next) {
  let inputCode = req.body.inputCode
  let errorMsg = null
  let result = false

  const validColors = ['bleu', 'rouge', 'vert', 'jaune', 'violet', 'orange']

  if (inputCode.length === 0) {
    errorMsg = 'aucune données entrées'
  } else if (inputCode.length < 4) {
    errorMsg = 'le code contient 4 couleurs...'
  } else if (inputCode.length > 4) {
    errorMsg = 'le code ne contient que 4 couleurs...'
  } else {

    inputCode.map((color)=>{
      let index = validColors.indexOf(color)
      if(index < 0){
        errorMsg = 'Certaines couleurs ne sont pas valides'
      }
    })
  }

  if(errorMsg === null ){
    result = true
  }

  res.json({ result, errorMsg, inputCode })
})


module.exports = router;
