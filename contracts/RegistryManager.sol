// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IRegistryManager.sol";
import "./interfaces/ITaskRegistry.sol";
import "./libraries/ProxyFactory.sol";
import "./CappedRegistryHelper.sol";

contract RegistryManager is IRegistryManager, Ownable {

    address public registryTemplate;
    address[] private taskRegistries;
    CappedRegistryHelper capHelper;

    constructor(address template, CappedRegistryHelper helper) {
        require(template != address(0), "Invalid template for proxy creator");
        registryTemplate = template;
        capHelper = helper;
    }
    
    function registryWithSlot() external override returns (address)  {
        address registry;
        
        for(uint i = taskRegistries.length; i > 0; i--) {
            (bool success, bytes memory returnData) = taskRegistries[i - 1].staticcall(
                abi.encodeWithSelector(ITaskRegistry.isSpaceAvailable.selector)
            );
            (bool isSpace) = abi.decode(returnData, (bool));
            if(success && isSpace) {
                registry = taskRegistries[i - 1];
                break;
            }
        }

        if(registry == address(0)) {
            registry = createNewRegistry();
        }
        return registry;
    }
    
    function createNewRegistry() internal returns (address) {
        address proxyContract = ProxyFactory.create(
            registryTemplate, 
            abi.encodeWithSelector(ITaskRegistry.initialize.selector, address(capHelper))
            );

        taskRegistries.push(proxyContract);

        emit NewRegistryCreated(proxyContract);

        return proxyContract;
    }
}