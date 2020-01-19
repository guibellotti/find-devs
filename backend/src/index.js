const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://adm-find-dev:HjU5E9LlDbQZk2Rb@find-dev-cluster-hwegk.gcp.mongodb.net/find-dev?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(routes);
app.listen(3333);  