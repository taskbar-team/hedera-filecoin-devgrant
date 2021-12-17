const filecoinManager = require('../manager/filecoinManager');
const hederaManager = require('../manager/hederaManager');

const createFile = async (req, res) => {
    const body = JSON.stringify(req.body);
    console.log("body is " + body);

    if (req.query.type === 'perm') {
        const result = await filecoinManager.createFile(body);
        res.send(result);
    } else {
        const newFieldId = await hederaManager.createFile(body);
        res.send(newFieldId);
    }
}

const getHfs = async (req, res) => {
    console.log("Requesting from HFS " + req.params.id);

    const contents = await hederaManager.getFile(req.params.id);

    res.send(contents);
}

const getFilecoin = async (req, res) => {
    console.log("Requesting from Filecoin " + req.params.id);

    const contents = await filecoinManager.getFile(req.params.id);

    res.send(contents);
}

module.exports = { createFile, getHfs, getFilecoin }