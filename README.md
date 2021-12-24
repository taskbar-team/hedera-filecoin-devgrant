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

## Overview
  >Taskbar stands to become a fully autonomous, self-sovereign, gig-economy platform, by maximizing inflow and outflow of tasks and services between users via a secure, trustless, interactive and inclusive web 3.0 ecosystem.
  
This project, supported by the [Hedera x Filecoin devgrants](https://github.com/filecoin-project/devgrants/pull/319/files), proposes to bring Taskbar closer to a web 3.0 ecosystem by moving the main functionality on-chain and storing a set of the task's metadata on smart contracts, together with references to task transcripts and proofs. Task transcripts represent fields which are too large to be stored on chain, or sensitive information which should not be visible to everyone where a complete trace of the task will be encrypted and stored on the Hedera File Storage (HFS) and on IPFS through Filecoin, depending on the state of the task.

See the project's [Wiki](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1) page for a more detailed overview of the future final form of the project. The work for Milestones 1 and 2 has now been completed.

## Install

```sh
npm install
```

## Usage

> The [Hedera local services-node](https://github.com/three-Vs/dockerized-hedera-services) provides the minimum required services to deploy a Hedera Network.

#### Start the app
```sh
npm run start
```
 #### Add the Hedera Credentials you'd like to use
[![YBhPUX.md.png](https://iili.io/YBhPUX.md.png)](https://freeimage.host/i/YBhPUX)
 #### Create your Task
[![YBj3Ob.md.png](https://iili.io/YBj3Ob.md.png)](https://freeimage.host/i/YBj3Ob)
 #### Find your Task
[![YBj25u.md.png](https://iili.io/YBj25u.md.png)](https://freeimage.host/i/YBj25u)

## Development Roadmap
- ### Milestone 1
  - Finalize the requirements and specifications
  - Formulate all parameters of Transcript file along with their metadata
  - SDK hierarchy and initial setup

1. Information on the specifications can be found at [Milestone 1 - Wiki](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1)
2. Initial setup project along with example can be found in this repository

- ### Milestone 2
  - SDK – Hedera HFS integration
  - SDK – Integration with Hedera smart contracts
  - SDK - Integration with Filecoin web3.storage for transcript storage
  - Frontend development

<br/>


## 📝 License

GNU General Public License v3.0 or later

See [LICENSE](https://github.com/taskbar-team/hedera-filecoin-devgrant/blob/main/LICENSE) to see the full text.
