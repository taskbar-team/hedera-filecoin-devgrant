// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "./ECDSA.sol";

library TaskbarSignatureVerifier {


    function doesMatchTaskStartSignature (
        address tasker,
        uint256 taskId,
        uint256 rate,
        uint64 ttl,
        uint8 hcount,
        bytes calldata signature
    ) internal pure returns(bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(taskId, rate, hcount, ttl));
        return ECDSA.recoverSigner(messageHash, signature) == tasker;
    }
}