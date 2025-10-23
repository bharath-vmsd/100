let allProjects = []; // This will store all projects loaded from JSON
let displayedProjects = []; // Projects currently displayed after filtering/searching
let projectsPerPage = 12; // Number of projects to load at once
let currentPage = 1; // Current page for pagination

        const searchInput = document.getElementById('searchInput');
        const projectsGrid = document.getElementById('projectsGrid');
        const noResults = document.getElementById('noResults');
        const tagsContainer = document.querySelector('.filter-tags');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const loadMoreContainer = document.getElementById('loadMore');
        let currentFilter = 'all';

        // Function to fetch projects from JSON
        async function fetchProjects() {
            try {
                const response = await fetch('projects.json');
                allProjects = await response.json();
                // Initial display of projects
                filterAndSearchProjects(searchInput.value.toLowerCase(), currentFilter);
            } catch (error) {
                console.error('Error fetching projects:', error);
                projectsGrid.innerHTML = '<p style="color: red;">Failed to load projects.</p>';
            }
        }

        // Function to render projects (appends them)
        function renderProjects(projectsToRender) {
            projectsToRender.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.dataset.category = project.category;
                // Adjust animation delay for newly appended cards
                projectCard.style.animationDelay = `${(currentPage - 1) * projectsPerPage * 0.1 + index * 0.1}s`;
                
                projectCard.innerHTML = `
                    <div class="project-image"><img src="${project.image}" alt="${project.title}"></div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-footer">
                            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">Learn More →</a>
                        </div>
                    </div>
                `;
                console.log('Project link:', project.link);
                projectsGrid.appendChild(projectCard);
            });
            
            // Re-observe new cards for animation
            document.querySelectorAll('.project-card').forEach(card => {
                observer.observe(card);
            });
        }

        // Function to display projects with pagination
        function displayProjects(projects) {
            displayedProjects = projects;
            projectsGrid.innerHTML = ''; // Clear existing projects for fresh display
            currentPage = 1; // Reset to first page

            const projectsToDisplay = displayedProjects.slice(0, projectsPerPage * currentPage);
            renderProjects(projectsToDisplay);

            // Manage "Load More" button visibility
            if (displayedProjects.length > projectsPerPage * currentPage) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }

            // Show/hide no results message
            noResults.style.display = projectsToDisplay.length === 0 ? 'block' : 'none';
        }

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            filterAndSearchProjects(e.target.value.toLowerCase(), currentFilter);
        });

        // Filter tags functionality
        tagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.dataset.filter;
                filterAndSearchProjects(searchInput.value.toLowerCase(), currentFilter);
            }
        });

        // Load More button functionality
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            const startIndex = (currentPage - 1) * projectsPerPage;
            const projectsToAppend = displayedProjects.slice(startIndex, startIndex + projectsPerPage);
            renderProjects(projectsToAppend);

            if (displayedProjects.length <= projectsPerPage * currentPage) {
                loadMoreContainer.style.display = 'none';
            }
        });

        function filterAndSearchProjects(searchTerm, category) {
            const filtered = allProjects.filter(project => {
                const title = project.title.toLowerCase();
                const description = project.description.toLowerCase();
                const projectCategory = project.category;
                const keywords = project.keywords ? project.keywords.map(kw => kw.toLowerCase()) : [];

                const matchesSearch = title.includes(searchTerm) || 
                                      description.includes(searchTerm) ||
                                      keywords.some(kw => kw.includes(searchTerm));
                const matchesCategory = category === 'all' || projectCategory === category;

                return matchesSearch && matchesCategory;
            });
            displayProjects(filtered); // Call displayProjects instead of renderProjects
        }

        // Add smooth scroll reveal for cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Initial fetch and render
        fetchProjects();