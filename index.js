const PORT= process.env.PORT || 8000
const express = require('express')
const cheerio=require('cheerio')
const axios=require('axios')

const app = express()

const results =[

]

const flightprice=[
    {
        "flight":"Air India",
        "address":"https://www.airindia.in/"
    },
    {
        "flight":"Indigo",
        "address":"https://www.goindigo.in/"
    },
    {
        "flight":"Spicejet",
        "address":"https://www.spicejet.com/"
    },
]

app.get('/', (req, res) => {                            //get request from home pageN
    res.json("Welcom to Flight Price API")
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
