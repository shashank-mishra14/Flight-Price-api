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
    axios.get('https://www.expedia.com/Flights')
    .then((response) => {
      const html=response.data
        const $ = cheerio.load(html)

        $('div.uitk-layout-grid-item',html).each(function() {

            const title = $(this).find('h3').text()
            const price = $(this).find('span.uitk-lockup-price').text()
            const link = $(this).find('a').attr('href')
            const image = $(this).find('img').attr('src')
            results.push({
                title,
                price,
                link,
                image
            })
        }
        )
        res.json(results)
    })

})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
