const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const host = "0.0.0.0";
const port = "8486";
let clients = [];
let facts = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

function eventHandler(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    const data = `data : ${JSON.stringify(facts)} \n \n `;
    res.write(data);
    const clientID  = Date.now();

    const newClient = {
        id:clientID,
        res
    };

    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientID} has disconnected to server.`);
        clients = clients.filter (client => client.id !== clientID);
    });
}

function sendEventsToAll(newFact)
{
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

async function addFact(request, respsonse, next) {
    const newFact = request.body;
    facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(newFact);
  }

async function RemoveAllFact(request, res, next) {
    facts = []

    const respJson = {
        'code' : 200,
        'length' : facts.length
    }
    res.send(JSON.stringify(respJson));

}



app.get('/status', (req, res) => res.json({clients : clients.length}));
app.get('/events', eventHandler);
app.post('/fact', addFact);
app.delete('/rmFacts', RemoveAllFact);


app.listen(port, host, () => {
    console.log(`Facts Events service listening at http://localhost:${port}`)
});