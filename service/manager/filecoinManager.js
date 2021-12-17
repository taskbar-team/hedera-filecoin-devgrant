const { File } = require('web3.storage');
const web3storage = require('../config/web3storageConfig')

async function createFile(content) {
  const files = makeFileObjects(content);

  console.log(`Uploading file to web3`)
  const cid = await web3storage.getClient().put(files)
  console.log('Content added with CID:', cid)
  return cid;
}

async function getFile(cid) {
  const res = await web3storage.getClient().get(cid);

  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }
  const files = await res.files()
  for (const file of files) {
    console.log(`File ${file.cid} -- size ${file.size}`)
    console.log(await file.text());
  }

  return await files[0].text();
}

function makeFileObjects(fileContent) {
  const buffer = Buffer.from(fileContent);
  return [
    new File([buffer], '/cust_id/data.json')
  ]
}

module.exports = { createFile, getFile };