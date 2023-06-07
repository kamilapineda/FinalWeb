const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const diacritic = require('diacritic');

app.use(bodyParser.json());

app.post('/palindromo-kamala', (req, res) => {
  const palabra = req.body.palabra;

  if (!isNaN(palabra)) {
    res.status(404).json({ message: 'No se pudo comprobar la palabra' });
    return;
  }

  const palabraNoAcentuada = diacritic.clean(palabra).toLowerCase().replace(/\s/g, ''); 

  const palabraAlReves = palabraNoAcentuada.split('').reverse().join('');
  if (palabraNoAcentuada === palabraAlReves) {
    res.status(200).json({ message: `${palabra} es una palabra Palíndroma.` });
  } else {
    res.status(302).json({ message: `${palabra} no es una palabra Palíndroma.` });
  }
});

app.listen(3001, () => {
  console.log('Servidor iniciado en http://localhost:3001');
});
