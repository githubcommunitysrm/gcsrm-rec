import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/db.js";
import ParticipantUser from "@/app/models/recruitment.model.js";
import Task from "@/app/models/tasks.model.js";

const cleanTaskData = (task) => {
    if (task["link"]) {
        task["link"] = task["link"].replace(/^\s*"+|"+\s*$/g, '');
    }
    return task;
};

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const participant = await ParticipantUser.findOne({ email });
        if (!participant) {
            return NextResponse.json(
                { message: "Participant not found" },
                { status: 404 }
            );
        }

        const { name, registrationNumber: regNo, email: participantEmail, phone, year, degreeWithBranch: dept, domain, status } = participant;
        let taskQueries = [];

        // Extract year number from participant year (e.g., "2nd Year" -> "2nd")
        const yearNumber = year.includes("1st") ? "1st" :
            year.includes("2nd") ? "2nd" :
                year.includes("3rd") ? "3rd" :
                    year.includes("4th") ? "4th" : year;

        // Handle the domain as a string (from your MongoDB structure)
        console.log("Participant domain:", domain);
        console.log("Participant year:", year, "extracted year:", yearNumber);

        // First, let's check what tasks exist in the database
        const allTasks = await Task.find({});
        console.log("All tasks in database:", allTasks.map(t => ({
            title: t.title,
            domain: t.domain,
            year: t.year,
            taskType: t.taskType
        })));

        // Build flexible queries to handle domain variations
        const domainVariations = [];
        if (domain === "Corporate") {
            domainVariations.push("Corporate");
        } else if (domain === "Creative" || domain === "Creatives") {
            domainVariations.push("Creative", "Creatives");
        } else if (domain === "Technical") {
            domainVariations.push("Technical");
        } else {
            domainVariations.push(domain);
        }

        console.log("Domain variations to search:", domainVariations);

        taskQueries.push({
            domain: { $in: domainVariations },
            $or: [
                { year: year },         // Exact year match (e.g., "2nd Year")
                { year: yearNumber },   // Year number match (e.g., "2nd")
                { year: "both" }        // Tasks for all years
            ]
        }); if (taskQueries.length === 0) {
            return NextResponse.json({
                name,
                regNo,
                email: participantEmail,
                year,
                dept,
                phone,
                domain: domain,
                status,
                tasks: []
            });
        }

        // Fetch tasks based on the query
        console.log("Task queries:", JSON.stringify(taskQueries, null, 2));

        let tasks = await Task.find({
            $or: taskQueries
        });

        console.log("Found tasks count:", tasks.length);
        console.log("Tasks found:", tasks.map(t => ({ title: t.title, domain: t.domain, year: t.year })));

        // Clean each task before sending it to the client
        tasks = tasks.map(cleanTaskData);

        return NextResponse.json({
            name,
            regNo,
            email: participantEmail,
            year,
            dept,
            phone,
            domain: domain,
            status,
            tasks // This will include the reference link along with other task details
        });
    } catch (error) {
        console.error("Error fetching participant data:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}