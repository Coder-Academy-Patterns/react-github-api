import React from 'react'
import * as githubAPI from '../../api/github'
import Markdown from 'react-remarkable'

const repoChoices = [
  'facebook/react',
  'Microsoft/vscode',
  'axios/axios'
]

class ShowReadme extends React.Component {
  state = {
    repoName: '',
    error: null,
    content: null
  }

  onChangeRepoName = (event) => {
    const input = event.target
    const repoName = input.dataset['repoName']
    this.setState({ repoName })
  }

  render() {
    const { repoName, error, content } = this.state

    return (
      <div>
        { error && <p>{ error.message }</p> }
        {
          repoChoices.map(repoName => (
            <button
              key={ repoName }
              onClick={ this.onChangeRepoName }
              data-repo-name={ repoName }
            >
              { repoName }
            </button>
          ))
        }
        { content &&
          <Markdown source={ content } />
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { repoName } = this.state
    if (repoName !== prevState.repoName) {
      githubAPI.readmeContentForRepo({ repoName })
        .then((res) => {
          const json = res.data
          const contentBase64 = json.content
          const content = decodeURIComponent(escape(atob(contentBase64)))
          this.setState({ content })
        })
    }
  }

  componentDidCatch(error) {
    this.setState({ error })
  }
}

export default ShowReadme