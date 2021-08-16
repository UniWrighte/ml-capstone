const app = require('express')()
const cors = require('cors')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8080
const qs = require('querystring')
const data = require('../data/store/data.json')

app.use(cors())

app.get('/', async (req, res, next) => {
  try {
    const { running } = await (await fetch('http://localhost:8081/')).json()
    return res.status(200).json({ running })
  } catch (err) {
    if (err.code === 'ECONNREFUSED') return next('python server not running')
    return next(err)
  }
})
app.get('/ml', async (req, res, next) => {
  try {
    const { course, minutes } = req.query
    console.log({ course, minutes })
    const passPrediction = await (await fetch(`http://localhost:8081/ml?${qs.stringify(req.query)}`)).text()
    return res.status(200).json({ passPrediction })
  } catch (err) {
    return next(err)
  }
})
app.get('/courses', async (req, res, next) => {
  const { courses } = data
  console.log({ courses })
  return res.status(200).json({ courses })
})
app.use((error, req, res, next) => {
  return res.status(500).json({ error })
})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
