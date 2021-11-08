# taskbar-devgrant

Taskbar devgrant repository contains the work done as the recipients of fifth prize in the real-world application category award at Hedera x Filecoin grant program.

The submission can be found at [Filecoin devgrants proposal](https://github.com/filecoin-project/devgrants/pull/319/files)

## Development Roadmap
- ### Milestone 1
    - Finalize the requirements and specifications
    - Formulate all parameters of Transcript file along with their metadata
    - SDK hierarchy and initial setup

Information on the specifications can be found at [Milestone 1 - Wiki](https://wiki.3vs.ro/grants/hedera-filecoin/specs-1)

- ### Milestone 2
    - SDK – Hedera HFS integration
    - SDK – Integration with Hedera smart contracts
    - SDK - Integration with Filecoin web3.storage for transcript storage
    - Frontend development

<br/><br/>

# hex-wallet-provider

## Install

```bash
npm install --save hex-wallet-provider
```

## Usage

```tsx
import React, { Component } from 'react'

import HexWalletProvider from 'hex-wallet-provider'

class Example extends Component {
  render() {
    return <HexWalletProvider>
      { . . . }
    </HexWalletProvider>
  }
}
```
