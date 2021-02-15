const express = require("express");
const cors = require("cors");

const {uuid, isUuid } = require('uuidv4');
const { query } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

return response.json(repositories)

});

app.post("/repositories", (request, response) => {
  const {title, url, techs} =request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }

  repositories.push(repository)

  return response.json(repository)
  
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {title, url, techs} = request.body
  const {id} = request.params 

  const repositoryIndex = repositories.findIndex(repository => repository.id===id)

  if(repositoryIndex === -1){
    return response.status(400).json({error:'Repository does not exist'})
  }

 const repository = {
     id,
     title,
     url,
     techs,
     likes: repositories[repositoryIndex].likes
 }  

 repositories[repositoryIndex] = repository

 return response.json(repository)
  

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const{id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'repository does not exist'})

  }
  
  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id ===id)

  if(repositoryIndex === -1){
    return response.status(400).json({error:'Repository does not exist'})
  }

  repositories[repositoryIndex].likes += 1

  return response.json(repositories[repositoryIndex])


});

module.exports = app;
