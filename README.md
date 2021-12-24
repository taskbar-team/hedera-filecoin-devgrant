<h1 align="center">Welcome to Peer-to-Peer (P2P) Task Transcript 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://wiki.3vs.ro/grants/hedera-filecoin/specs-1" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/taskbar-team/hedera-filecoin-devgrant/blob/main/LICENSE" target="_blank">
    <img alt="License: GPL v3.0" src="https://img.shields.io/badge/license-GPL%20v3.0-brightgreen.svg" />
  </a>
</p>

# Overview
  >Taskbar stands to become a fully autonomous, self-sovereign, gig-economy platform, by maximizing inflow and outflow of tasks and services between users via a secure, trustless, interactive and inclusive web 3.0 ecosystem.
  
This project, supported by the [Hedera x Filecoin devgrants](https://github.com/filecoin-project/devgrants/pull/319/files), is set to bring [Taskbar](https://mytaskbar.io/) closer to a web 3.0 ecosystem by moving the main functionality on-chain and storing a set of the task's metadata on smart contracts, along with references to the task transcripts and proofs. 
We define the task transcripts as either information which are too large to be stored on chain, or sensitive data which should not be publicly visible. A complete trace of the task will be encrypted and stored on the Hedera File Storage and on the IPFS network through Filecoin, depending on the state of the task. On-chain data are cryptographically secured and available only to the tasker and needer. Due to audit concerns, off-chain storage shall be immutable.

### Wiki

See the project's [Wiki](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1) page for a more detailed overview of the future final form of the project. 

### Current status of the project
[Milestones 1](https://github.com/filecoin-project/devgrants/pull/319/files#diff-59f3ec70bb70081eea275ef994aa071ed15321920db5e55fbb2e6d99c6849065R32) and [Milestone 2](https://github.com/filecoin-project/devgrants/pull/319/files#diff-59f3ec70bb70081eea275ef994aa071ed15321920db5e55fbb2e6d99c6849065R38) have now been completed.

# Install

```sh
npm install
```

# Usage

> The [Hedera local services-node](https://github.com/three-Vs/dockerized-hedera-services) provides the minimum required services to deploy a Hedera Network on a local machine.

#### Start the app
```sh
npm run start
```
 #### Add the Hedera Credentials you'd like to use
 - Setting the Account Id and the Private Key that are going to be used when interacting with the Hedera File Service.
 
[![YBhPUX.md.png](https://iili.io/YBhPUX.md.png)](https://freeimage.host/i/YBhPUX)

 #### Create your Task
 - On task creation, the business critical data is stored on smart contracts, which encapsulate the core logic of the Taskbar app. See more on the smart contracts architecture [here](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1#dtaskbar-architecture)
 - Less critical task information is temporarily persisted on the Hedera File Storage.
 - Read more on the information stored on-chain and off-chain [here](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1#on-chain-storage)
 
[![YBj3Ob.md.png](https://iili.io/YBj3Ob.md.png)](https://freeimage.host/i/YBj3Ob)

 #### Find your Task
 - Finding a given task's data supposes finding the smart contract holding the requested information, as well as accessing the Hedera File Storage location of the task.

[![YBj25u.md.png](https://iili.io/YBj25u.md.png)](https://freeimage.host/i/YBj25u)

 #### Storing and Fetching Data on the IPFS network 
 - A basic REST API that allows for storing and fetching data to and from the IPFS network
 - Uses [web3storage](https://web3.storage/) to access [Filecoin](https://filecoin.io/)

[![YBDtat.md.png](https://iili.io/YBDtat.md.png)](https://freeimage.host/i/YBDtat)

# Development Roadmap
- ### Milestone 1 - <em>completed</em>
  - Finalize the requirements and specifications
  - Formulate all parameters of Transcript file along with their metadata
  - SDK hierarchy and initial setup

1. Information on the specifications can be found at [Milestone 1 - Wiki](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1)
2. Initial setup project along with example can be found in this repository

- ### Milestone 2 - <em>completed</em>
  - SDK – Hedera HFS integration
  - SDK – Integration with Hedera smart contracts
  - SDK - Integration with Filecoin web3.storage for transcript storage
  - Frontend development

Please find a description of the future Milestones [here](https://github.com/filecoin-project/devgrants/pull/319/files#diff-59f3ec70bb70081eea275ef994aa071ed15321920db5e55fbb2e6d99c6849065R45)
<br/>


# 📝 License

GNU General Public License v3.0 or later

See [LICENSE](https://github.com/taskbar-team/hedera-filecoin-devgrant/blob/main/LICENSE) to see the full text.
