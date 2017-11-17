import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com'
})

export function readmeForRepo({ repoName }) {
  return api.get(`/repos/${repoName}/readme`)
}

export function readmeContentForRepo({ repoName }) {
  return api.get(`/repos/${repoName}/readme`, {
    headers: {
      //'Accepts': 'application/vnd.github.v3.raw'
    }
  })
}
