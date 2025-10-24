export const progressService = {
    progress: {},
    streak: 0,
    lastVisit: null,

    async loadProgress() {
        try {
            const result = await window.storage.get('dsa-progress');
            if (result) {
                const data = JSON.parse(result.value);
                this.progress = data.progress || {};
                this.streak = data.streak || 0;
                this.lastVisit = data.lastVisit || null;
                
                this.updateStreak();
            }
        } catch (e) {
            console.log('No previous progress found');
        }
    },

    async saveProgress() {
        try {
            await window.storage.set('dsa-progress', JSON.stringify({
                progress: this.progress,
                streak: this.streak,
                lastVisit: this.lastVisit
            }));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    },

    updateStreak() {
        const today = new Date().toDateString();
        if (this.lastVisit !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (this.lastVisit === yesterday) {
                this.streak++;
            } else if (this.lastVisit !== null) {
                this.streak = 1;
            }
            this.lastVisit = today;
            this.saveProgress();
        }
    },

    toggleComplete(topicId) {
        if (!this.progress[topicId]) {
            this.progress[topicId] = { completed: false, progress: 0 };
        }
        
        this.progress[topicId].completed = !this.progress[topicId].completed;
        this.progress[topicId].progress = this.progress[topicId].completed ? 100 : 0;
        
        this.saveProgress();
    },

    getCompletedCount() {
        return Object.values(this.progress).filter(p => p.completed).length;
    },

    getTotalProgress(totalTopics) {
        const completed = this.getCompletedCount();
        return Math.round((completed / totalTopics) * 100);
    },

    getXP() {
        return this.getCompletedCount() * 100;
    }
};
