import { topics } from './services/topicService.js';
import { progressService } from './services/progressService.js';
import { UI } from './ui/ui.js';

const App = {
    init() {
        progressService.loadProgress().then(() => {
            this.render();
            this.setupAmbientParticles();
        });
    },

    render() {
        const completed = progressService.getCompletedCount();
        const totalProgress = progressService.getTotalProgress(topics.length);
        const xp = progressService.getXP();

        UI.renderCurriculum(topics, progressService.progress, (topicId) => this.toggleComplete(topicId));
        UI.updateStats(progressService.streak, completed, totalProgress, xp);
    },

    toggleComplete(topicId) {
        progressService.toggleComplete(topicId);
        this.render();
        UI.createParticles();
    },

    setupAmbientParticles() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                UI.createParticles();
            }
        }, 3000);
    }
};

App.init();
