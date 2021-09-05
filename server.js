const express = require('express');
const server = express();
const cors = require('cors');


server.use(express.json());
server.use(cors());
server.set('port', process.env.PORT || 3002);
server.locals.title = 'Rancid Tomatillo Favorites API';
server.locals.favoritesList = [
  {
    "id": 694919,
    "title": "Money Plane",
    "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
    "release_date": "2020-09-29",
    "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
    "genres": [
    "Action"
    ],
    "budget": 0,
    "revenue": 0,
    "runtime": 82,
    "tagline": "",
    "average_rating": 6.142857142857143
    }
]

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