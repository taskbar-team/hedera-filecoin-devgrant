const filecoinManager = require('../manager/filecoinManager');

const createFile = async (req, res) => {
    const body = JSON.stringify(req.body);
    console.log("body is " + body);

    const result = await filecoinManager.createFile(body);
    res.send(result);
}

const getFilecoin = async (req, res) => {
    console.log("Requesting from Filecoin " + req.params.id);

    const contents = await filecoinManager.getFile(req.params.id);

    res.send(contents);
}

module.exports = { createFile, getFilecoin }