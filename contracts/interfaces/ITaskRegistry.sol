// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "../CappedRegistryHelper.sol";

/**
*    @notice  Interface used to describe functions responsible for handling tasks
*    The TaskRegistry is responsible for handling task information
*/
interface ITaskRegistry {

    enum TaskType { UNKNOWN, HOURLY, FIXED }

    struct TaskInfo {
        address needer;
        address tasker;
        TaskType taskType;
        uint64 expiry;
        uint256 rate;
        uint8 hcount;
        bytes32 ploc;
        bytes32 nploc;
        bytes32 tploc;
        bool isDisputed;
    }

    error InsuficientPay();
    error Unauthorized();
    error InvalidTaskState();

    /**
    *    @notice Emmited when a new Task is initialized
    */
    event TaskInitialized(uint256 indexed taskId, uint indexed expiry);

    /**
    *    @notice Emmited when a Task is disputed
    */
    event TaskDisputed(uint256 indexed taskId);

    /**
    *    @notice Emmited when a Task's dispute is resolved
    */
    event TaskDisputeResolved(uint256 indexed taskId);

    /**
    *    @notice Emmited when a Task is removed
    */
    event TaskRemoved(uint256 indexed taskId);

    /**
    *    @notice Emmited when a Task's payment received by address
    */
    event TaskPaymentReceived(uint256 indexed taskId, uint indexed paymentSize, address indexed receiver);

    /**
    *    @notice Emmited when a Task's payment added to contract
    */
    event TaskAddedAndPaid(uint256 indexed taskId, uint indexed paymentSize, address indexed tasker);

    /* initialize function */

    function initialize(CappedRegistryHelper helper) external;

    /**
    *   @notice Method used for creating a task
    */
    function initializeTask(
        uint256 taskId,
        uint256 rate,
        bytes32 ploc,
        uint64 ttl,
        uint8 taskType,
        uint8 hcount
    ) external;

    function startTask(
        address tasker,
        uint256 taskId,
        uint256 rate,
        bytes32 nploc,
        bytes32 tploc,
        uint64 ttl,
        uint8 hcount,
        bytes calldata signature
    ) external payable;

    function disputeTask(uint256 taskId) external;

    function finishTask(uint256 taskId) external;

    function resolveDispute(uint256 taskId, bytes calldata _bytes) external;

    function cancelTask(uint256 taskId) external;

    function getTask(uint256 taskId) external view returns (TaskInfo memory);

    function isSpaceAvailable() external view returns (bool);
}