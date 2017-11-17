import React from 'react'
import * as githubAPI from '../../api/github'
import Markdown from 'react-remarkable'

class LoadReadme extends React.Component {
  state = {
    error: null,
    content: null
  }

  render() {
    const { repoName } = this.props
    const { error, content } = this.state

    return (
      <div>
        { error && <p>{ error.message }</p> }
        { content &&
          <Markdown source={ content } />
        }
      </div>
    )
  }

  loadContent() {
    const { repoName } = this.props

    githubAPI.readmeContentForRepo({ repoName })
    .then((res) => {
      const json = res.data
      const contentBase64 = json.content
      const content = decodeURIComponent(escape(atob(contentBase64)))
      this.setState({ content })
    })
  }

  componentDidMount() {
    this.loadContent()
  }

  // When props change or setState is called, this function will be called
  componentDidUpdate(prevProps, prevState) {
    const { repoName } = this.props
    if (repoName !== prevProps.repoName) {
      this.loadContent()
    }
  }

  componentDidCatch(error) {
    this.setState({ error })
  }
}

export default LoadReadme