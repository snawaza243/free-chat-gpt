const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-Gqo4WR3oD3HGYWRGnLLhuU8d",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);



const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 5000

app.post('/', async (req, res) => {

    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    // console.log(response.data.choices[0].text)
    res.json({
        message: response.data.choices[0].text
    })
})
app.listen(port, () => {
    console.log(`App listing at https://localhost:${port}`)
});