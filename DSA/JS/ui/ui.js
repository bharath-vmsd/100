import { createElement, querySelector } from './dom-helpers.js';

export const UI = {
    renderCurriculum(topics, progress, toggleCompleteCallback) {
        const curriculum = querySelector('#curriculum');
        curriculum.innerHTML = '';

        topics.forEach(topic => {
            const topicProgress = progress[topic.id] || { completed: false, progress: 0 };
            
            const card = createElement('div', `topic-card ${topicProgress.completed ? 'completed' : ''}`);
            
            card.innerHTML = `
                <div class="topic-header">
                    <div class="topic-number">MODULE ${String(topic.id).padStart(2, '0')}</div>
                    <div class="topic-status">
                        <div class="status-badge ${topicProgress.completed ? 'completed' : 'locked'}">
                            ${topicProgress.completed ? '✓' : '○'}
                        </div>
                    </div>
                </div>
                <h3 class="topic-title">${topic.title}</h3>
                <p class="topic-description">${topic.desc}</p>
                <div class="topic-progress">
                    <div class="topic-progress-bar">
                        <div class="topic-progress-fill" style="width: ${topicProgress.progress}%"></div>
                    </div>
                </div>
                <div class="topic-footer">
                    <a href="${topic.link}" class="start-btn ${topicProgress.completed ? 'completed' : ''}">
                        ${topicProgress.completed ? 'Review' : topicProgress.progress > 0 ? 'Continue' : 'Start'}
                    </a>
                    <div class="topic-meta">${topic.lessons} lessons</div>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('start-btn')) {
                    toggleCompleteCallback(topic.id);
                }
            });

            curriculum.appendChild(card);
        });
    },

    updateStats(streak, completed, totalProgress, xp) {
        querySelector('#streak').textContent = streak;
        querySelector('#completed').textContent = completed;
        querySelector('#totalProgress').textContent = totalProgress;
        querySelector('#xp').textContent = xp;
        querySelector('#progressText').textContent = `${totalProgress}% Complete`;
        querySelector('#overallProgress').style.width = `${totalProgress}%`;
    },

    createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = createElement('div', 'particle');
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.animation = `float ${2 + Math.random() * 3}s ease-in-out`;
            particle.style.background = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 5000);
        }
    }
};
