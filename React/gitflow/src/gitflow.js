import React, { Component } from 'react'
import styled from 'styled-components'
import { FlowName, Button } from './global-style'
import { release } from 'os'

const GitFlowElm = styled.div`
`

const ProjectElm = styled.div`
  $:after {
    content: '';
    display: table;
    clear: both;
  }
`
const BranchElm = styled.div`
  position: relative;
  float: left;
  width: 75px;
  margin-right: 10px;
  text-align: center;
  z-index: 1;
`

const BranchName = styled.h4`
  position: relative;
  font-size: .8rem;
`

const Commits = styled.ol`
  position: relative;

  &:before {
    position: absolute;
    display: block;
    content: '';
    height: 100%;
    border: 1px solid #f0f0f0;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 0;
  }
`
const Commit = styled.li`
  position: absolute;
  top: ${p => (p.top * 45) + 'px'};
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${p => p.color || '#9d9d9d'};
  border: 1px solid #000;
`

class GitFlow extends Component {

  renderBranch = (branch) => {
    const { commits } = this.props.project
    const { releaseBranch, featureBranch, merged } = branch
    const branchCommmits = commits.filter(c => c.branch === branch.id)

    const mergeButton = featureBranch && !merged ? (
      <Button
        onClick={this.props.onMerge.bind(this, branch.id)}
      >Merge</Button>
    ) : null

    const releaseButton = releaseBranch && !merged ? (
      <Button
        onClick={this.props.onRelease.bind(this, branch.id, undefined)}
      >Release</Button>
    ) : null

    return (
      <BranchElm key={'branch-' + branch.id}>
        <BranchName>{branch.name}</BranchName>
        <Button onClick={this.props.onCommit.bind(this, branch.id, 0)}>commit</Button>
        {mergeButton || releaseButton}      
        <Commits>
          {
            branchCommmits.map((commit, idx) => {
              return <Commit
                key={'commit-' + commit.id}
                color={branch.color}
                top={commit.gridIndex - 1}
              />
            })
          }
        </Commits>
      </BranchElm>
    )
  }

  render () {
    const { project } = this.props
    const { branches } = project
    const masterBranch = branches.find(b => b.name === 'master')
    const developBranch = branches.find(b => b.name === 'develop')
    const releaseBranches = branches.filter(b => b.releaseBranch)
    const featureBranches = branches.filter(b => b.featureBranch)

    return (
      <GitFlowElm>
        <FlowName>Git Flow</FlowName>
        <Button onClick={this.props.onNewFeature}>New Feature</Button>
        <Button onClick={this.props.onNewRelease}>New Release</Button>
        <ProjectElm>
          {this.renderBranch(masterBranch)}
          {releaseBranches.map((branch, idx) => this.renderBranch(branch))}
          {this.renderBranch(developBranch)}
          {featureBranches.map((branch, idx) => this.renderBranch(branch))}
        </ProjectElm>
      </GitFlowElm>
    )
  }
}

export default GitFlow
