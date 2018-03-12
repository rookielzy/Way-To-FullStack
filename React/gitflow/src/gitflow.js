import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { ButtonIcon, fallDownAnimation, fadeIn } from './global-style'
import GoeyFilter from './goey-filter'
import Connections from './connections'

const GitFlowElm = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ProjectElm = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 90px 1fr;
  margin-top: 20px;
  background: linear-gradient(135deg, rgba(34, 52, 122, 1) 0%, rgba(23, 35, 82, 1) 100%);
  border-radius: 5px;
  box-shadow: 0 4px 10px #9d9d9d;
`
const GridColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${p => `repeat(${p.count || 2}, 90px)`};
`

const BranchHeader = styled.div`
  max-width: 90px;
  padding: 5px;
  background-color: #131d45;
  text-align: center;
  z-index: 1;
  border-right: 1px solid #1b295f;
  color: #f0f0f0;
  margin-bottom: 10px;
  animation: ${fadeIn} .5s ease-in;
`

const BranchActions = styled.div`
  display: grid;
  grid-template-columns: ${p => `repeat(${p.count || 1}, 1fr)`};
  margin-top: 10px;
  justify-items: center;
  height: 24px;
  opacity: .6;
`

const BranchName = styled.h4`
  position: relative;
  font-size: .7rem;
  text-transform: uppercase;
  letter-spacing: 1.5pt;
  margin-top: 10px;
`

const Commits = styled.ol`
  position: relative;
  min-height: 800px;
  heigth: ${p => p.height || '500px'};
  filter: url('#goo');
  z-index: 40;
  border-right: 1px solid #1b295f;
  
  transition: opacity .5s;
`
const Commit = styled.li`
  position: absolute;
  display: grid;
  align-items: center;
  justify-items: center;
  top: ${p => (p.top * 45) + 'px'};
  left: 50%;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transform: translate(-50%, -45px);
  background-color: ${p => p.color || '#9d9d9d'};
  border: 1px solid #fff;
  box-shadow: 0 0 20px #f0f0f0;
  animation: ${fallDownAnimation} cubic-bezier(0.770, 0.000, 0.175, 1.000) 1s;
  animation-fill-mode: forwards;
  z-index: 40;
  transition: all .2s;
  &.merged {
    background-color: #fff;
    box-shadow: none;
    opacity: .5;
  }
`

const Tag = styled.p`
  color: #fff;
  font-size: .7rem;
  letter-spacing: 1pt;
`

const ConnectionsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
`

class GitFlow extends Component {

  componentWillMount () {
    this.commitPositions = {}
  }

  componentDidMount () {
    this.connectCommits()
  }

  componentDidUpdate () {
    this.connectCommits()
  }

  cacheConnectionsContainer = (elm) => {
    this.connectionsContainer = elm
  }

  storeCommitPosition = (id, offset = 0, commitElm) => {
    if (commitElm) {
      this.commitPositions[id] = {
        top: commitElm.offsetTop,
        left: (offset * 90) + commitElm.offsetLeft
      }
    }
  }

  connectCommits = () => {
    const { commits } = this.props.project
    let paths = commits.map(commit => {
      const { parents } = commit
      const tgtPosition = this.commitPositions[commit.id]
      return (parents || []).map(p => {
        return {
          srcCommitID: p,
          tgtCommitID: commit.id,
          src: this.commitPositions[p],
          tgt: tgtPosition
        }
      })
    })
    paths = [].concat.apply([], paths)
    ReactDOM.render(<Connections paths={paths}/>, this.connectionsContainer)
  }

  deleteBranch = (branchID) => {
    const { commits } = this.props.project
    const commitsToDelete = commits.filter(c => c.branch === branchID).map(c => c.id)
    commitsToDelete.forEach(c => {
      delete this.commitPositions[c.id]
    })
    this.props.onDeleteBranch(branchID)
  }

  renderCommitButton = (branch) => {
    return (
      <ButtonIcon
        onClick={this.props.onCommit.bind(this, branch.id, 0)}
      >C</ButtonIcon>
    )
  }

  renderDeleteButton = (branch) => {
    return (
      <BranchActions count={1}>
        <ButtonIcon onClick={this.deleteBranch.bind(this, branch.id)}>X</ButtonIcon>
      </BranchActions>
    )
  }

  renderDevelopBranchHeader = (branch) => {
    return (
      <BranchHeader>
        <BranchName>{branch.name}</BranchName>
        <BranchActions
          count={3}
        >
          <ButtonIcon onClick={this.props.onNewRelease}>R</ButtonIcon>
          {this.renderCommitButton(branch)}
          <ButtonIcon onClick={this.props.onNewFeature}>F</ButtonIcon>
        </BranchActions>
      </BranchHeader>
    )
  }

  renderFeatureBranchHeader = (branch) => {
    let actionsElm = null
    if (branch.merged) {
      actionsElm = this.renderDeleteButton(branch)
    } else {
      actionsElm = (
        <BranchActions
          count={2}
        >
          <ButtonIcon
            onClick={this.props.onMerge.bind(this, branch.id, undefined)}
          >M</ButtonIcon>
          {this.renderCommitButton(branch)}
        </BranchActions>
      )
    }
    
    return (
      <BranchHeader
        key={branch.id}
      >
        <BranchName>{branch.name}</BranchName>
        {actionsElm}
      </BranchHeader>
    )
  }

  renderReleaseBranchHeader = (branch) => {
    let actionsElm = null
    if (branch.merged) {
      actionsElm = this.renderDeleteButton(branch)
    } else {
      actionsElm = (
        <BranchActions
          count={2}
        >
          {this.renderCommitButton(branch)}
          <ButtonIcon
            onClick={this.props.onRelease.bind(this, branch.id, undefined)}
          >M</ButtonIcon>
        </BranchActions>
      )
    }
    return (
      <BranchHeader
        key={branch.id}
      >
        <BranchName>{branch.name}</BranchName>
        {actionsElm}
      </BranchHeader>
    )
  }

  renderMasterBranchHeader = (branch) => {
    console.log(branch)
    return (
      <BranchHeader>
        <BranchName>{branch.name}</BranchName>
        <BranchActions />
      </BranchHeader>
    )
  }

  renderBranchHeader = (param) => {
    const {
      masterBranch,
      developBranch,
      releaseBranches,
      featureBranches,
      noOfBranches
    } = param
    return (
      <GridColumn
        count={noOfBranches}
      >
        {this.renderMasterBranchHeader(masterBranch)}
        {releaseBranches.map(branch => this.renderReleaseBranchHeader(branch))}
        {this.renderDevelopBranchHeader(developBranch)}
        {featureBranches.map(branch => this.renderFeatureBranchHeader(branch))}
      </GridColumn>
    )
  }

  renderBranchCommit = (branch, branchIndex) => {
    const { commits } = this.props.project
    const branchCommits = commits.filter(c => c.branch === branch.id)
    let isMasterBranch = branch.name === 'master';

    return (
      <Commits
        className={branch.merged ? 'merged' : ''}
        color={branch.color}
        key={'branch-' + branch.id}
        height={(branchCommits.length * 45) + 'px'}
      >
        {
          branchCommits.map((commit, idx) => {
            return <Commit
              className={branch.merged ? 'merged' : ''}
              innerRef={this.storeCommitPosition.bind(this, commit.id, branchIndex)}
              key={'commit-' + commit.id}
              color={branch.color}
              top={commit.gridIndex - 1}
            >
              {isMasterBranch ? <Tag>{'v' + idx}</Tag> : null}
            </Commit>
          })
        }
      </Commits>
    )
  }

  renderBranchCommits = (param) => {
    const {
      masterBranch,
      developBranch,
      releaseBranches,
      featureBranches,
      noOfBranches
    } = param
    let branches = [masterBranch, ...releaseBranches, developBranch, ...featureBranches]

    return (
      <GridColumn
        count={noOfBranches}
      >
        <ConnectionsContainer innerRef={this.cacheConnectionsContainer}/>      
        {branches.map((branch, index)=> this.renderBranchCommit(branch, index))}
      </GridColumn>
    )
  }

  render () {
    const { project } = this.props
    const { branches } = project
    const masterBranch = branches.find(b => b.name === 'master')
    const developBranch = branches.find(b => b.name === 'develop')
    const releaseBranches = branches.filter(b => b.releaseBranch)
    const featureBranches = branches.filter(b => b.featureBranch)
    const noOfBranches = 2 + releaseBranches.length + featureBranches.length
    const param = {
      masterBranch,
      developBranch,
      releaseBranches,
      featureBranches,
      noOfBranches
    }

    console.log(param)

    return (
      <GitFlowElm>
        <ProjectElm>
          {this.renderBranchHeader(param)}
          {this.renderBranchCommits(param)}
        </ProjectElm>
        <GoeyFilter/>
      </GitFlowElm>
    )
  }
}

export default GitFlow
