const PORT= process.env.PORT || 8000
const express = require('express')
const cheerio=require('cheerio')
const axios=require('axios')

const app = express()
const results = []
app.get('/', (req, res) => {                            //get request from home pageN
    res.json("Welcome to Flight Price API")
})

app.get('/flights', (req, res) => {                       //get request from /flight page
    axios.get('https://www.expedia.com/Flights-Search?leg1=from%3ADelhi%20%28DEL%20-%20Indira%20Gandhi%20Intl.%29%2Cto%3AMumbai%20%28BOM%20-%20Chhatrapati%20Shivaji%20Intl.%29%2Cdeparture%3A5%2F22%2F2023TANYT&leg2=from%3AMumbai%20%28BOM%20-%20Chhatrapati%20Shivaji%20Intl.%29%2Cto%3ADelhi%20%28DEL%20-%20Indira%20Gandhi%20Intl.%29%2Cdeparture%3A5%2F23%2F2023TANYT&mode=search&options=carrier%3A%2A%2Ccabinclass%3A%2Cmaxhops%3A1%2Cnopenalty%3AN&pageId=0&passengers=adults%3A1%2Cchildren%3A0%2Cinfantinlap%3AN&trip=roundtrip')
    .then((response) => {
      const html=response.data
        const $ = cheerio.load(html)

        $('div.uitk-layout-grid-item',html).each(function() {

            const title = $(this).find('h3').text()
            const price = $(this).find('span.full-bold.no-wrap').text()
            results.push({
                title,
                price
            })
        }
        )
        res.json(results)
    })

})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
