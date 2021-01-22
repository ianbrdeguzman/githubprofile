// GitHub API
const APIURL = 'https://api.github.com/users/';

// fetch user data
const getData = async (userid) => {
    const response = await fetch(APIURL + userid);
    const data = await response.json();

    // call createProfile function
    createProfile(data);

    // call getRepos function
    getRepos(userid);
};


const createProfile = (data) => {
    
    // check if input is empty
    if (data) {

        const profile = `
        <div class="profile-container">
            <div class="img-container">
                <img id="avatar" src="${data.avatar_url}" alt="avatar">
            </div>
            <div class="profile-info">
                <h2 id="name">${data.name}</h2>
                <p id="bio">${data.bio}</p>
                <div>
                    <ul>
                        <li id="followers">${data.followers} Followers</li>
                        <li id="following">${data.following} Following</li>
                        <li id="repos-number">${data.public_repos} Repos</li>
                    </ul>
                </div>
                <div id="repos"></div>
            </div>
        </div>`
    
        // insert profile
        document.querySelector('#main').innerHTML = profile;
    }
};

// fetch user repos
const getRepos = async (userid) => {

    const REPOURL = `${APIURL}${userid}/repos`;

    const response = await fetch(REPOURL);
    const data = await response.json();

    // call addRepos function
    addRepos(data);
};

const addRepos = (data) => {
    const repos = document.getElementById('repos');

    // clears div container
    while(repos.firstChild) {
        repos.firstChild.remove();
    }

    
    data
        // sorts repos id number descending
        .sort( (a, b) => b.id - a.id)

        // slice array to 4 repos
        .slice(0, 4) 

        // loop over each repo
        .forEach( (repo) => {
            
            const link = `
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        `
            // add each repo
            repos.insertAdjacentHTML('beforeend', link);
        })
}

// add eventlistener when form is submitted
document.querySelector('#form')
    .addEventListener('submit', (e) => {

        // prevent default function
        e.preventDefault();

        let input = document.getElementById('search');

        // check if input value is empty
        if (input.value) {
            getData(input.value);
            getRepos(input.value);
        } else {
            alert('Enter a Username')
        }
        
        // clear input text
        input = '';
    });

// call getData
getData('ianbrdeguzman');