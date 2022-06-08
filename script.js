const APIURL = "https://api.github.com/users/";
//APIURL + username + '/repos?sort=created
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

function createRepoCard(data) {
   const repos = document.getElementById("repos");
   let html = "";
   data.slice(0, 5).map((val) => {
      const { name, clone_url } = val;
      html += `<a
         class="repo"
         href=${clone_url}
         target=${name}
         >${name}</a
      >`;
      repos.innerHTML = html;
   });
}

async function getRepos(username) {
   try {
      const { data } = await axios.get(
         APIURL + username + "/repos?sort=created"
      );
      createRepoCard(data);
   } catch (err) {
      if (err.response.status) {
         createErrorCard(`Error fetching repos`);
      }
   }
}

function createUserCard(data) {
   const { avatar_url, bio, name, following, followers, public_repos } = data;
   let html = `<div class="card">
   <div>
      <img
         src=${avatar_url}
         alt=""
      />
   </div>
   <div class="user_info">
      <h2>${name}</h2>
      <p>
         ${bio}
      </p>
      <ul>
         <li>${followers} <strong>Followers</strong></li>
         <li>${following} <strong>Following</strong></li>
         <li>${public_repos} <strong>Repos</strong></li>
      </ul>
      <div class="repos" id="repos">
      </div>
   </div>
</div>`;
   main.innerHTML = html;
}
function createErrorCard(data) {
   let html = `<div class="card">
    <h2>${data}</h2>
    </div>`;
   main.innerHTML = html;
}
async function fetchUser(username) {
   try {
      const { data } = await axios.get(APIURL + username);
      createUserCard(data);
      getRepos(username);
   } catch (err) {
      if (err.response.status) {
         createErrorCard(`No profile found with this username ${username}`);
      }
   }
   //console.log("data", data.data);
}

form.addEventListener("submit", (e) => {
   e.preventDefault();
   const username = search.value;
   search.value = "";
   fetchUser(username);
});
