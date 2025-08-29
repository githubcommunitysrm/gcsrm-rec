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
        default: null
    },
    domain: {
        type: String,
        enum: ["Technical", "Creatives", "Corporate"],
        required: true
    },
    subdomain: {
        type: String,
        enum: [
            "AIML",
            "Web-Dev",
            "App-Dev",
            "Cybersecurity",
            "Data-Science",
            "GFX",
            "VFX",
            "UI-UX",
            "Video-Editing",
            "Content-Writing",
            "Event-Management",
            "Marketing",
            "Business-Development",
            "Public-Relations"
        ],
        required: false
    },
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

    // Enhanced fields for complex tasks (especially AI/ML)
    steps: {
        type: [String],
        required: false,
        default: []
    },
    requirements: {
        type: [String],
        required: false,
        default: []
    },
    datasets: {
        type: [String],
        required: false,
        default: []
    },
    evaluation: {
        type: String,
        required: false
    },
    outputs: {
        type: [String],
        required: false,
        default: []
    },
    techStack: {
        type: [String],
        required: false,
        default: []
    },

    // Additional metadata
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: false
    },
    estimatedTime: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },

    submissionForm: {
        type: String,
        required: false
    },
    submissionInstructions: {
        type: String,
        required: false
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

// Index for better query performance
taskSchema.index({ domain: 1, year: 1 });
taskSchema.index({ subdomain: 1 });
taskSchema.index({ deadline: 1 });

const Task = mongoose.models.tasks25 || mongoose.model("tasks25", taskSchema);

module.exports = Task;