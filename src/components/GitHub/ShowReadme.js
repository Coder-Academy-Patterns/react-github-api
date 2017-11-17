import React from 'react'
import * as githubAPI from '../../api/github'
import Markdown from 'react-remarkable'
import LoadReadme from './LoadReadme'

const repoChoices = [
  'facebook/react',
  'Microsoft/vscode',
  'axios/axios'
]

class ShowReadme extends React.Component {
  state = {
    repoName: ''
  }

  onChangeRepoName = (event) => {
    const input = event.target
    const repoName = input.dataset['repoName']
    this.setState({ repoName })
  }

  render() {
    const { repoName } = this.state

    return (
      <div>
        {
          repoChoices.map(repoNameChoice => (
            <button
              key={ repoNameChoice }
              className={ repoName === repoNameChoice ? 'active' : '' }
              onClick={ this.onChangeRepoName }
              data-repo-name={ repoNameChoice }
            >
              { repoNameChoice }
            </button>
          ))
        }
        <LoadReadme repoName={ repoName } />
      </div>
    )
  }
}

export default ShowReadme