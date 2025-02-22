// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Project {
        string title;
        string description;
        uint targetAmount;
        uint raisedAmount;
        uint deadline;
        address payable creator;
        bool isSuccessful;
        mapping(address => uint) contributions;
    }

    Project[] public projects;
    uint public projectCount;

    function createProject(string memory _title, string memory _description, uint _targetAmount, uint _duration) public {
        Project storage newProject = projects.push();
        newProject.title = _title;
        newProject.description = _description;
        newProject.targetAmount = _targetAmount;
        newProject.raisedAmount = 0;
        newProject.deadline = block.timestamp + _duration;
        newProject.creator = payable(msg.sender);
        newProject.isSuccessful = false;
        projectCount++;
    }

    function contribute(uint projectId) public payable {
        Project storage project = projects[projectId];
        require(block.timestamp < project.deadline, "Project deadline has passed");
        project.raisedAmount += msg.value;
        project.contributions[msg.sender] += msg.value;
    }

    function finalizeProject(uint projectId) public {
        Project storage project = projects[projectId];
        require(block.timestamp >= project.deadline, "Project deadline has not passed yet");

        if (project.raisedAmount >= project.targetAmount) {
            project.isSuccessful = true;
            project.creator.transfer(project.raisedAmount);
        } else {
            for (uint i = 0; i < projectCount; i++) {
                address contributor = msg.sender;
                uint contribution = project.contributions[contributor];
                payable(contributor).transfer(contribution);
            }
        }
    }
}
