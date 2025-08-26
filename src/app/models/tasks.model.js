const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    guidelines: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    domain: {
        type: String,
        enum: ["Technical", "Creatives", "Corporate"],
        required: true
    },
    // subdomain: {
    //     type: String,
    //     enum: [
    //         "AIML", "Web-Dev", "GFX", "VFX", " "
    //     ],
    //     required: true
    // },
    taskType: {
        type: String,
        required: true
    },
    year: {
        type: String,
        enum: ["1st", "2nd", "both"],
        required: true
    },
    deadline: {
        type: Date,
        required: false
    },
});

const Task = mongoose.models.tasks25 || mongoose.model("tasks25", taskSchema);

module.exports = Task;
