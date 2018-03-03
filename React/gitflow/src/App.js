import React, { Component } from 'react';
import styled from 'styled-components'
import shortid from 'shortid'
import GitFlow from './gitflow'

const DEVELOP = 'develop'
const MASTER = 'master'

const masterID = shortid.generate()
const developID = shortid.generate()

const seedData = () => {
  
  const commits = [
    {
      id: shortid.generate(),
      branch: masterID,
      gridIndex: 1,
    },
    {
      id: shortid.generate(),
      branch: developID,
      gridIndex: 1,
    },
  ]

  return {
    branches: [
      {
        name: MASTER,
        id: masterID,
        canCommit: false,
        color: '#BA68C8',
      },
      {
        name: DEVELOP,
        id: developID,
        canCommit: true,
        color: '#FF8A65',
      }
    ],
    commits,
  }
}

const AppElm = styled.main`
  text-align: center;
  padding: 10px;
`

class App extends Component {

  state = {
    project: seedData()
  }

  handleCommit = (branchID, mergeGridIndex = 0) => {
    let { commits } = this.state.project
    const branchCommits = commits.filter(c => c.branch === branchID)
    console.log(branchCommits)
    const lastCommit = branchCommits[branchCommits.length - 1]
    commits.push({
      id: shortid.generate(),
      branch: branchID,
      gridIndex: lastCommit.gridIndex + mergeGridIndex + 1
    })

    this.setState({
      commits
    })
  }

  handleNewFeature = () => {
    let { branches, commits } = this.state.project
    let featureBranches = branches.filter(b => b.featureBranch)
    let featureBranchName = 'feature ' + ((featureBranches || []).length + 1)
    let developBranch = branches.find(b => b.name === DEVELOP)
    let developCommits = commits.filter(c => c.branch === developBranch.id)
    const lastDevelopCommit = developCommits[developCommits.length - 1]
    let featureOffset = lastDevelopCommit.gridIndex + 1
    let newBranch = {
      id: shortid.generate(),
      name: featureBranchName,
      featureBranch: true,
      canCommit: true,
    }
    let newCommit = {
      id: shortid.generate(),
      branch: newBranch.id,
      gridIndex: featureOffset,
    }

    commits.push(newCommit)
    branches.push(newBranch)

    this.setState({
      branches,
      commits
    })

  }

  handleMerge = (sourceBranchID, targetBranchID = developID) => {
    const { branches, commits } = this.state.project
    const sourceCommits = commits.filter(c => c.branch === sourceBranchID)
    const targetCommits = commits.filter(c => c.branch === targetBranchID)

    const lastSourceCommit = sourceCommits[sourceCommits.length - 1]
    const lastTargetCommit = targetCommits[targetCommits.length - 1]

    const mergeCommit = {
      id: shortid.generate(),
      branch: targetBranchID,
      gridIndex: Math.max(lastSourceCommit.gridIndex, lastTargetCommit.gridIndex) + 1
    }

    commits.push(mergeCommit)

    this.setState({
      commits
    })
  }

  render() {
    return (
      <AppElm>
        <GitFlow
          project={this.state.project}
          onMerge={this.handleMerge}
          onCommit={this.handleCommit}
          onNewFeature={this.handleNewFeature}
        />
      </AppElm>
    )
  }
}

export default App;
