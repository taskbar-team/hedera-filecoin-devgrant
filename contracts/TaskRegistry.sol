// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ITaskRegistry.sol";
import "./libraries/TaskbarSignatureVerifier.sol";
import "./CappedRegistryHelper.sol";

contract TaskRegistry is
    ITaskRegistry,
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    using Counters for Counters.Counter;
    using TaskbarSignatureVerifier for address;

    Counters.Counter noOfTasks;
    mapping(uint256 => TaskInfo) public taskInfos;
    CappedRegistryHelper capHelper;

    modifier taskNotExpired(uint256 taskId) {
        if(block.timestamp > taskInfos[taskId].expiry) {
            revert InvalidTaskState();
        }
        _;
    }

    modifier isNeeder(uint256 taskId) {
        if(taskInfos[taskId].needer != msg.sender) {
            revert Unauthorized();
        }
        _;
    }

    modifier isInvolved(uint256 taskId) {
        if(taskInfos[taskId].needer != msg.sender &&
                taskInfos[taskId].tasker != msg.sender){
            revert Unauthorized();
        }
        _;
    }

    modifier taskOngoing(uint256 taskId) {
        if(taskInfos[taskId].tasker == address(0) ||
                taskInfos[taskId].isDisputed){
            revert InvalidTaskState();
        }
        _;
    }

    modifier validTaskType(uint8 taskType) {
        if(taskType != uint8(TaskType.FIXED) && 
                taskType != uint8(TaskType.HOURLY)) {
            revert InvalidTaskState();
        }
        _;
    }

    function initialize(CappedRegistryHelper helper) external override initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        initCapHelper(helper);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function initCapHelper(CappedRegistryHelper helper) internal onlyOwner {
        capHelper = helper;
    }

    function initializeTask(
        uint256 taskId,
        uint256 rate,
        bytes32 ploc,
        uint64 ttl,
        uint8 taskType,
        uint8 hcount
    ) external override validTaskType(taskType) {
        
        if((taskInfos[taskId].needer != address(0) && 
            msg.sender != taskInfos[taskId].needer) || 
            !capHelper.isSpaceAvailable(noOfTasks.current())) {
            revert Unauthorized();
        }

        if(taskInfos[taskId].tasker != address(0)){
            revert InvalidTaskState();
        }

        taskInfos[taskId].ploc = ploc;
        taskInfos[taskId].expiry = uint64(block.timestamp + ttl);
        taskInfos[taskId].rate = rate;
        taskInfos[taskId].taskType = TaskType(taskType);
        taskInfos[taskId].needer = msg.sender;
        taskInfos[taskId].hcount = hcount;

        noOfTasks.increment();

        emit TaskInitialized(taskId, taskInfos[taskId].expiry);
    }

    //Add signature checks for tasker
    function startTask(
        address tasker,
        uint256 taskId,
        uint256 rate,
        bytes32 nploc,
        bytes32 tploc,
        uint64 ttl,
        uint8 hcount,
        bytes calldata signature
    )
        external
        payable
        override
    {

        if(taskInfos[taskId].needer != msg.sender) {
            revert Unauthorized();
        }

        if ((TaskType.HOURLY == taskInfos[taskId].taskType && msg.value >= rate * hcount) ||
                (TaskType.FIXED == taskInfos[taskId].taskType && msg.value < rate)) {
            revert InsuficientPay();
        }

        if(!tasker.doesMatchTaskStartSignature(taskId, rate, ttl, hcount, signature)) {
            revert Unauthorized();
        }

        taskInfos[taskId].tasker = tasker;
        taskInfos[taskId].expiry = uint64(block.timestamp + ttl);
        taskInfos[taskId].rate = rate;
        taskInfos[taskId].hcount = hcount;
        taskInfos[taskId].nploc = nploc;
        taskInfos[taskId].tploc = tploc;

        emit TaskAddedAndPaid(taskId, msg.value, tasker);
    }

    function disputeTask(uint256 taskId) external override isInvolved(taskId) {
        taskInfos[taskId].isDisputed = true;
        emit TaskDisputed(taskId);
        //TODO: not implemented
    }

    function finishTask(uint256 taskId)
        external
        override
        taskOngoing(taskId)
        isNeeder(taskId)
    {
        uint256 paymentValue;
        if (TaskType.HOURLY == taskInfos[taskId].taskType) {
            paymentValue = taskInfos[taskId].rate * taskInfos[taskId].hcount;
        } else {
            paymentValue = taskInfos[taskId].rate;
        }

        if (paymentValue <= 0) {
            revert InsuficientPay();
        }

        address tasker = taskInfos[taskId].tasker;
        cancelTask(taskId);
        payable(tasker).transfer(paymentValue);

        emit TaskPaymentReceived(taskId, paymentValue, tasker);
    }

    function resolveDispute(uint256 taskId, bytes calldata _bytes)
        external
        override
        onlyOwner
    {
        if(!taskInfos[taskId].isDisputed) {
            revert InvalidTaskState();
        }

        emit TaskDisputeResolved(taskId);
    }

    function cancelTask(uint256 taskId) public override {
        if(taskInfos[taskId].isDisputed) {
            revert InvalidTaskState();
        }

        TaskInfo memory emptyTask = TaskInfo(
            address(0),
            address(0),
            TaskType.UNKNOWN,
            0,
            0,
            0,
            0x0,
            0x0,
            0x0,
            false
        );
        taskInfos[taskId] = emptyTask;

        noOfTasks.decrement();
        emit TaskRemoved(taskId);
    }

    function getTask(uint256 taskId) external view override returns (TaskInfo memory) { 
        return taskInfos[taskId];
    }

    function getNoOfTasksInRegistry() external view returns (uint256) {
        return noOfTasks.current();
    }

    function isSpaceAvailable() external view override returns (bool) {
        return capHelper.isSpaceAvailable(noOfTasks.current());
    }
}
