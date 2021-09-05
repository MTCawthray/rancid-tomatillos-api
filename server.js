const express = require('express');
const server = express();
const cors = require('cors');


server.use(express.json());
server.use(cors());
server.set('port', process.env.PORT || 3002);
server.locals.title = 'Rancid Tomatillo Favorites API';
server.locals.favoritesList = []

server.get('/', (request, response) => {
  response.send('Hello world! This is in server.js')
});

server.listen(server.get('port'), () => {
  console.log(`${server.locals.title} is running on http://localhost:${server.get('port')}. `);
});

server.get('/api/v1/favoritesList', (request, response) => {
  response.status(200).json(server.locals.favoritesList)
})

server.post('/api/v1/favoritesList', (request, response) => {
   server.locals.favoritesList.push(request.body);
   response.status(201).json(request.body);
})

server.delete('/api/v1/favoritesList', (request, response) => {
  console.log('"We made it!", request.body inside delete! --->', request.body)
  const { id } = request.body
  console.log(id, '<--dataObj')

    server.locals.favoritesList = server.locals.favoritesList.filter(favorite => parseInt(favorite.id) !== parseInt(id))
  response.status(202).send("deleted");
})