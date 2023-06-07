addEventListener('DOMContentLoaded', () => {
    document.getElementById('github-form').addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e.target.childNodes[1].value)
        fetch(`https://api.github.com/search/users?q=${e.target.childNodes[1].value}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(res => res.json())
        .then(data => handleUser(data))
    })
})

function handleUser(user){
    console.log(user)
    user.items.forEach(element => {
        const container = document.getElementById('user-list')
        const li = document.createElement('li')
        const avatar = document.createElement('img')
        const p = document.createElement('p')
        const a = document.createElement('a')

        li.innerText = element.login
        avatar.src = element.avatar_url
        a.href = element.repos_url
        a.innerText = 'Repositories'
        p.innerHTML = a

        container.appendChild(li)
        container.appendChild(avatar)
        container.appendChild(a)

        a.addEventListener('click', handleRepos)
    });

    function handleRepos(e){
        e.preventDefault()
        console.log(e.target.href)
        fetch(e.target.href)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                const container = document.getElementById('repos-list')
                const li = document.createElement('li')
                const p = document.createElement('p')
                const a = document.createElement('a')

                a.href = element.url
                a.innerText = element.url
                p.innerHTML = a
                li.appendChild(p)
                container.appendChild(li)
            });
        })
    }
}