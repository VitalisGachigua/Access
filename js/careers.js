const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const careerList = document.getElementById("career-list");

const modal = document.getElementById("career-modal");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalSubjects = document.getElementById("modal-subjects");
const modalSkills = document.getElementById("modal-skills");
const closeModal = document.getElementById("close-modal");

const careers = [
    {
        id: 1,
        name: "Software Engineer",
        category: "Technology",
        description: "Designs, develops and maintains software systems.",
        subjects: ["Mathematics", "Computer Studies"],
        skills: ["Programming", "Problem Solving"]
    },
    {
        id: 2,
        name: "Doctor",
        category: "Medicine",
        description: "Diagnoses illnesses and provides medical treatment.",
        subjects: ["Biology", "Chemistry"],
        skills: ["Communication", "Critical Thinking"]
    },
    {
        id: 3,
        name: "Lawyer",
        category: "Law",
        description: "Represents clients and provides legal advice.",
        subjects: ["English", "History"],
        skills: ["Research", "Communication"]
    },
    {
        id: 4,
        name: "Civil Engineer",
        category: "Engineering",
        description: "Designs and supervises construction projects.",
        subjects: ["Mathematics", "Physics"],
        skills: ["Problem Solving", "Project Management"]
    },
    {
        id: 5,
        name: "Accountant",
        category: "Business",
        description: "Manages financial records and prepares reports.",
        subjects: ["Mathematics", "Business Studies"],
        skills: ["Analysis", "Attention to Detail"]
    },
    {
        id: 6,
        name: "Graphic Designer",
        category: "Arts",
        description: "Creates visual content for digital and print media.",
        subjects: ["Art", "Computer Studies"],
        skills: ["Creativity", "Design"]
    },
    {
        id: 7,
        name: "Architect",
        category: "Engineering",
        description: "Designs buildings and other physical structures.",
        subjects: ["Mathematics", "Art"],
        skills: ["Creativity", "Technical Drawing"]
    },
    {
        id: 8,
        name: "Teacher",
        category: "Education",
        description: "Educates and mentors students.",
        subjects: ["Depends on Subject"],
        skills: ["Communication", "Leadership"]
    },
    {
        id: 9,
        name: "Data Analyst",
        category: "Technology",
        description: "Analyzes data to support decision making.",
        subjects: ["Mathematics", "Computer Studies"],
        skills: ["Statistics", "Problem Solving"]
    },
    {
        id: 10,
        name: "Pharmacist",
        category: "Medicine",
        description: "Dispenses medicines and advises patients.",
        subjects: ["Biology", "Chemistry"],
        skills: ["Attention to Detail", "Communication"]
    }
];

let savedCareers = JSON.parse(localStorage.getItem("savedCareers")) || [];

function renderCareers(careerArray) {
    careerList.innerHTML = "";

    for (let i = 0; i < careerArray.length; i++) {

        const career = careerArray[i];

        const isSaved = savedCareers.includes(career.id);

        const careerHTML = `
            <div class="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">${career.name}</h2>

                    <p class="text-indigo-600 font-medium mt-2">
                        ${career.category}
                    </p>

                    <p class="text-gray-600 mt-4">
                        ${career.description}
                    </p>
                </div>

                <div class="flex gap-3 mt-6">

                    <button
                        class="learn-btn flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        data-id="${career.id}">
                        Learn More
                    </button>

                    <button
                        class="save-btn flex-1 ${isSaved ? "bg-green-600" : "bg-gray-700"} text-white py-2 rounded-lg hover:bg-green-700 transition"
                        data-id="${career.id}">
                        ${isSaved ? "Saved" : "Save"}
                    </button>

                </div>

            </div>
        `;

        careerList.innerHTML += careerHTML;
    }
}

renderCareers(careers);
searchInput.addEventListener("input", function () {

    filterCareers();

});

categoryFilter.addEventListener("change", function () {

    filterCareers();

});

function filterCareers() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredCareers = careers.filter(function (career) {

        const matchesSearch =
            career.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            career.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    renderCareers(filteredCareers);

}

careerList.addEventListener("click", function (event) {

    if (event.target.classList.contains("learn-btn")) {

        const id = Number(event.target.dataset.id);

        const career = careers.find(function (career) {

            return career.id === id;

        });

        modalTitle.textContent = career.name;

        modalCategory.textContent = career.category;

        modalDescription.textContent = career.description;

        modalSubjects.textContent = career.subjects.join(", ");

        modalSkills.textContent = career.skills.join(", ");

        modal.classList.remove("hidden");
        modal.classList.add("flex");

    }

});

closeModal.addEventListener("click", function () {

    modal.classList.remove("flex");
    modal.classList.add("hidden");

});

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.classList.remove("flex");
        modal.classList.add("hidden");

    }

});
careerList.addEventListener("click", function (event) {

    if (event.target.classList.contains("save-btn")) {

        const id = Number(event.target.dataset.id);

        if (savedCareers.includes(id)) {

            savedCareers = savedCareers.filter(function (careerId) {

                return careerId !== id;

            });

        } else {

            savedCareers.push(id);

        }

        localStorage.setItem(
            "savedCareers",
            JSON.stringify(savedCareers)
        );

        filterCareers();

    }

});

window.addEventListener("load", function () {

    renderCareers(careers);

});