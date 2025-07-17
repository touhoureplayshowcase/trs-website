import express from 'express'

const app = express()
app.set('trust proxy', true)
app.use(express.static('build/frontend'))
app.listen(9876)