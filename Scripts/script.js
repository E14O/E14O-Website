const projects = document.getElementById("githubProjects");

fetch("https://api.github.com/users/E14O/repos?sort=updated&per_page=100")
    .then(response => response.json())
    .then(data => {

        data.forEach(repo => {

            const card = document.createElement("a");

            card.className = "card";
            card.href = repo.html_url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            card.innerHTML = `
                <h2>${repo.name}</h2>

                <p>
                    ${repo.description || "No description provided."}
                </p>

                <div class="projectInfo">
                    <span> Language: ${repo.language || "Various"}</span>
                    <span> Stars: ${repo.stargazers_count}</span>
                </div>

                <p class="updated">
                    Updated: ${new Date(repo.updated_at).toLocaleDateString()}
                </p>
            `;

            projects.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Error loading GitHub projects:", error);

        projects.innerHTML = `
            <p>Unable to load GitHub projects.</p>
        `;
    });