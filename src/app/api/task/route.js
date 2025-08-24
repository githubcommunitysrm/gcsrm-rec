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

        const { name, regNo, email: participantEmail, phoneNo, year, dept, domain, status } = participant;
        let taskQueries = [];
        let subdomainsList = [];

        const domainKeys = Array.from(domain.keys())[0];

        // Handle different domains (Technical, Creatives, Corporate, etc.)
        for (let [domainKey, subdomains] of domain.entries()) {
            if (domainKey === "Corporate") {
                taskQueries.push({ domain: domainKey, year: year });
            } else {
                if (subdomains && subdomains.length > 0) {
                    taskQueries.push({
                        domain: domainKey,
                        subdomain: { $in: subdomains },
                        year: year
                    });
                    subdomainsList = subdomainsList.concat(subdomains);
                }
            }
        }

        if (taskQueries.length === 0) {
            return NextResponse.json({
                name,
                regNo,
                email: participantEmail,
                year,
                dept,
                phoneNo,
                domain: domainKeys, // Return only the domain keys
                // subdomains: subdomainsList,
                status,
                tasks: []
            });
        }

        // Fetch tasks based on the query
        let tasks = await Task.find({
            $or: taskQueries
        });

        // Clean each task before sending it to the client
        tasks = tasks.map(cleanTaskData);

        return NextResponse.json({
            name,
            regNo,
            email: participantEmail,
            year,
            dept,
            phoneNo,
            domain: domainKeys, // Return only the domain keys
            // subdomains: subdomainsList,
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