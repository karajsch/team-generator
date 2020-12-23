const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,

const questions = [{
        type: "input",
        message: "What is the name of the employee?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: [
            'Engineer',
            'Intern',
            "Manager"
        ]
    }, {
        type: "input",
        message: "What is the engineer's Github name?",
        name: "github",
        when: (answers) => answers.role === "Engineer"
    },
    {
        type: "input",
        message: "What is the Interns school?",
        name: "github",
        when: (answers) => answers.role === "Intern"
    },
    {
        type: "input",
        message: "What is the managers office number?",
        name: "github",
        when: (answers) => answers.role === "Manager"
    }, {
        type: "confirm",
        name: "continue",
        message: "Do you want to add another employee?"
    }
]


const start_prompt = (the_array_of_questions, current_roster = []) => {
    inquirer.prompt(the_array_of_questions).then(res => {
        console.log(res, current_roster)
        //If confirm is true, then restart prompt. If confirm is false, then ask if user wants to print to html
        let new_employee = ""
        switch (res.role) {
            case "Engineer":
                new_employee = new Engineer(res.name, res.id, res.email, res.github)
                break
            default:
                break
        }
        current_roster.push(new_employee)

        if (res.continue === true) {
            start_prompt(the_array_of_questions, current_roster)
        } else {
            // render HTMl
            fs.writeFile("./output/team.html", render(current_roster), "utf-8", () => {
                console.log("I wrote a file")
            })
        }

    })
}

start_prompt(questions)