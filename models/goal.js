const Schema = require('mongoose').Schema;

const GoalSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 80
    },
    userId: String,
    pitches: [Object],
    targetProgress: Number,
    currentProgress: Number,
    isCompleted: Boolean,  
});

GoalSchema.methods.setCurrentProgress = (progress) => {
    this.currentProgress = progress;
    this.isCompleted = (this.currentProgress === this.targetProgress);
};

GoalSchema.methods.timeElapsed = (pitch, currenttime) => {
    this.pitches[this.pitches.indexOf(pitch)].succeeded = (this.pitches[this.pitches.indexOf(pitch)].targettime === currenttime && this.pitches[this.pitches.indexOf(pitch)].reached);
};