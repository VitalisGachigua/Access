const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const opportunityList = document.getElementById("opportunity-list");

const modal = document.getElementById("opportunity-modal");
const modalTitle = document.getElementById("modal-title");
const modalCompany = document.getElementById("modal-company");
const modalLocation = document.getElementById("modal-location");
const modalCategory = document.getElementById("modal-category");
const modalType = document.getElementById("modal-type");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.getElementById("close-modal");

const opportunities = [
    {
        id: 1,
        title: "Software Engineering Internship",
        company: "Safaricom",
        location: "Nairobi",
        category: "Technology",
        type: "Internship",
        description: "Work alongside software engineers building modern web applications."
    },
    {
        id: 2,
        title: "Medical Job Shadowing",
        company: "Aga Khan Hospital",
        location: "Nairobi",
        category: "Medicine",
        type: "Job Shadowing",
        description: "Observe healthcare professionals in different hospital departments."
    },
    {
        id: 3,
        title: "Finance Internship",
        company: "Equity Bank",
        location: "Nairobi",
        category: "Business",
        type: "Internship",
        description: "Gain practical experience in accounting and financial management."
    },
    {
        id: 4,
        title: "Civil Engineering Internship",
        company: "KenHA",
        location: "Nairobi",
        category: "Engineering",
        type: "Internship",
        description: "Assist engineers in planning and supervising road projects."
    },
    {
        id: 5,
        title: "Graphic Design Internship",
        company: "Brand2D",
        location: "Remote",
        category: "Arts",
        type: "Internship",
        description: "Create graphics and marketing materials for clients."
    },
    {
        id: 6,
        title: "Data Analytics Internship",
        company: "Microsoft Kenya",
        location: "Nairobi",
        category: "Technology",
        type: "Internship",
        description: "Analyze datasets and create business reports."
    },
    {
        id: 7,
        title: "Business Analyst Internship",
        company: "Deloitte",
        location: "Nairobi",
        category: "Business",
        type: "Internship",
        description: "Support consulting teams with research and business analysis."
    },
    {
        id: 8,
        title: "Architecture Job Shadowing",
        company: "Symbion Kenya",
        location: "Nairobi",
        category: "Engineering",
        type: "Job Shadowing",
        description: "Shadow architects working on commercial building designs."
    },
    {
        id: 9,
        title: "Pharmacy Internship",
        company: "Trupharma Manufacturing Limited",
        location: "Nairobi",
        category: "Medicine",
        type: "Internship",
        description: "Learn pharmacy operations in a pharmaceutical environment."
    },
    {
        id: 10,
        title: "UI/UX Design Internship",
        company: "Andela",
        location: "Remote",
        category: "Technology",
        type: "Internship",
        description: "Design user interfaces and improve user experience for web applications."
    }
];

let savedOpportunities = JSON.parse(localStorage.getItem("savedOpportunities")) || [];

function renderOpportunities(opportunityArray) {

    opportunityList.innerHTML = "";

    for (let i = 0; i < opportunityArray.length; i++) {

        const opportunity = opportunityArray[i];

        const isSaved = savedOpportunities.includes(opportunity.id);

        const opportunityHTML = `
            <div class="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">

                <div>

                    <h2 class="text-2xl font-bold text-gray-800">
                        ${opportunity.title}
                    </h2>

                    <p class="text-indigo-600 font-medium mt-2">
                        ${opportunity.company}
                    </p>

                    <p class="text-gray-600 mt-2">
                        ${opportunity.location}
                    </p>

                    <p class="text-sm text-gray-500 mt-2">
                        ${opportunity.category} • ${opportunity.type}
                    </p>

                </div>

                <div class="flex gap-3 mt-6">

                    <button
                        class="view-btn flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        data-id="${opportunity.id}">
                        View Details
                    </button>

                    <button
                        class="save-btn flex-1 ${isSaved ? "bg-green-600" : "bg-gray-700"} text-white py-2 rounded-lg hover:bg-green-700 transition"
                        data-id="${opportunity.id}">
                        ${isSaved ? "Saved" : "Save"}
                    </button>

                </div>

            </div>
        `;

        opportunityList.innerHTML += opportunityHTML;

    }

}

renderOpportunities(opportunities);
searchInput.addEventListener("input", function () {

    filterOpportunities();

});

categoryFilter.addEventListener("change", function () {

    filterOpportunities();

});

function filterOpportunities() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredOpportunities = opportunities.filter(function (opportunity) {

        const matchesSearch =
            opportunity.title.toLowerCase().includes(searchValue) ||
            opportunity.company.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            opportunity.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    renderOpportunities(filteredOpportunities);

}

opportunityList.addEventListener("click", function (event) {

    if (event.target.classList.contains("view-btn")) {

        const id = Number(event.target.dataset.id);

        const opportunity = opportunities.find(function (opportunity) {

            return opportunity.id === id;

        });

        modalTitle.textContent = opportunity.title;

        modalCompany.textContent = opportunity.company;

        modalLocation.textContent = opportunity.location;

        modalCategory.textContent = opportunity.category;

        modalType.textContent = opportunity.type;

        modalDescription.textContent = opportunity.description;

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
opportunityList.addEventListener("click", function (event) {

    if (event.target.classList.contains("save-btn")) {

        const id = Number(event.target.dataset.id);

        if (savedOpportunities.includes(id)) {

            savedOpportunities = savedOpportunities.filter(function (opportunityId) {

                return opportunityId !== id;

            });

        } else {

            savedOpportunities.push(id);

        }

        localStorage.setItem(
            "savedOpportunities",
            JSON.stringify(savedOpportunities)
        );

        filterOpportunities();

    }

});

window.addEventListener("load", function () {

    renderOpportunities(opportunities);

});