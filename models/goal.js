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
    dateSet: Date,
    dateCompleted: Date 
});

GoalSchema.methods.setCurrentProgress = (progress) => {
    this.currentProgress = progress;
    this.isCompleted = (this.currentProgress === this.targetProgress);
};

GoalSchema.methods.succeededInPitch = (pitch, currenttime) => {
    this.pitches[this.pitches.indexOf(pitch)].succeeded = (this.pitches[this.pitches.indexOf(pitch)].targettime >= currenttime && this.pitches[this.pitches.indexOf(pitch)].current === this.pitches[this.pitches.indexOf(pitch)].target);

    return this.pitches[this.pitches.indexOf(pitch)].succeeded;
};

module.exports = require('mongoose').model('Goal', GoalSchema);