const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({origin: '*'}));


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/insurance-policy', db.getInsurancePolicyDetails)
app.get('/insurance-policy/:id', db.insurancePolicyDetailsById)
app.post('/insurance-policy', db.createInsurancePolicyDetails)
app.put('/insurance-policy/:id', db.updateInsurancePolicyDetail)
app.delete('/insurance-policy/:id', db.deleteInsurancePolicyDetail)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
