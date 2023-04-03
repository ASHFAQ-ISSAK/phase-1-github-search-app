// Select the DOM elements that will display the list of users and their repositories.
const userList = document.getElementById('user-list')
const repoList = document.getElementById('repos-list')

// Select the form element and add an event listener to it that will prevent its default behavior when it's submitted.
const form = document.querySelector('#github-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  // Get the value entered in the search input field and use it to construct a URL to query the GitHub API for users that match the search query.
  const username = e.target.search.value
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then(res => res.json())
    .then(data => {
      // Create a DOM element for each user returned and append it to the user list.
      data.items.forEach(user => {
        const h5 = document.createElement('h5')
        h5.innerText = user.login

        const img = document.createElement('img')
        img.src = user.avatar_url

        const link = document.createElement('a')
        link.href = user.html_url
        link.innerText = 'View profile'

        // Add an event listener to each user element that will fetch and display their repositories when clicked.
        h5.addEventListener('click', (e) => {
          const username = user.login

          // Make a fetch request to get the repositories of the clicked user.
          fetch(`https://api.github.com/users/${username}/repos`)
            .then(res => res.json())
            .then(repos => {
              // Clear the repository list before adding the new repositories.
              repoList.innerHTML = ''

              // Create a DOM element for each repository and append it to the repository list.
              repos.forEach(repo => {
                const li = document.createElement('li')
                li.innerText = repo.name
                repoList.appendChild(li)
              })
            })
        })

        userList.appendChild(h5, img, link)
      })
    })
    .catch(error => console.error(error))
})
