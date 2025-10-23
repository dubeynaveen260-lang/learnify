// Resources Module - Comprehensive Study Materials Database
// PDFs, Documents, Notes from Google Drive, Scribd, Academia, SlideShare
// NO VIDEO LINKS - Only downloadable/viewable study materials

const RESOURCES_DATABASE = {
    "BCA": {
        name: "Bachelor of Computer Applications",
        resources: [
            {
                subject: "Computer Fundamentals",
                semester: 1,
                topics: [
                    { title: "Computer Fundamentals Complete Notes", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/computer-fundamentals/" },
                    { title: "Basic Computer PDF Notes", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/computer_fundamentals/computer_fundamentals_pdf_version.htm" },
                    { title: "Computer Basics Study Material", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/computer-fundamentals-tutorial" },
                    { title: "Introduction to Computers PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Computer_Fundamentals" },
                    { title: "Computer Organization Notes", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=computer+fundamentals" }
                ]
            },
            {
                subject: "Programming in C",
                semester: 1,
                topics: [
                    { title: "C Programming Complete PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-programming-language/" },
                    { title: "C Language Tutorial PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/cprogramming/cprogramming_pdf_version.htm" },
                    { title: "C Programming Notes with Examples", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/c-programming-language-tutorial" },
                    { title: "C Programs Collection PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/C_Programming" },
                    { title: "C Language Study Material", type: "notes", source: "W3Schools", url: "https://www.w3schools.com/c/" },
                    { title: "C Lecture Notes PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=c+programming" },
                    { title: "Pointers in C - Complete Guide", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-pointers/" }
                ]
            },
            {
                subject: "Mathematics I",
                semester: 1,
                topics: [
                    { title: "Engineering Mathematics Notes", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/engineering-mathematics-tutorials/" },
                    { title: "Calculus Complete PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Calculus" },
                    { title: "Linear Algebra Study Material", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=linear+algebra" },
                    { title: "Mathematics Formula Sheet PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/engineering_mathematics/engineering_mathematics_pdf_version.htm" },
                    { title: "Differential Equations Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/differential-equations/" }
                ]
            },
            {
                subject: "Digital Electronics",
                semester: 1,
                topics: [
                    { title: "Digital Electronics Complete PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/" },
                    { title: "Logic Gates Study Material", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/digital_circuits/index.htm" },
                    { title: "Boolean Algebra Notes PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Digital_Electronics" },
                    { title: "K-Map and Minimization PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=digital+electronics" }
                ]
            },
            {
                subject: "Data Structures",
                semester: 2,
                topics: [
                    { title: "DSA Complete Notes PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/" },
                    { title: "Data Structures Tutorial PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/data_structures_algorithms/data_structures_algorithms_pdf_version.htm" },
                    { title: "Arrays and Linked Lists Notes", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/data-structure-tutorial" },
                    { title: "Trees and Graphs Study Material", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/tree-data-structure/" },
                    { title: "Stack and Queue PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Data_Structures" },
                    { title: "Sorting Algorithms Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
                    { title: "DSA Cheat Sheet PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=data+structures" },
                    { title: "Hashing Complete Guide", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/hashing-data-structure/" }
                ]
            },
            {
                subject: "Discrete Mathematics",
                semester: 2,
                topics: [
                    { title: "Discrete Math Complete Notes", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/mathematics-discrete-mathematics/" },
                    { title: "Graph Theory PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Discrete_Mathematics" },
                    { title: "Combinatorics Study Material", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/discrete_mathematics/index.htm" },
                    { title: "Set Theory and Relations PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=discrete+mathematics" }
                ]
            },
            {
                subject: "Database Management Systems",
                semester: 2,
                topics: [
                    { title: "DBMS Complete Notes PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/dbms/" },
                    { title: "SQL Tutorial PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/sql/sql_pdf_version.htm" },
                    { title: "Database Concepts Study Material", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/dbms-tutorial" },
                    { title: "Normalization Complete Guide", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/" },
                    { title: "ER Diagrams and Modeling PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Database_Management" },
                    { title: "SQL Queries Cheat Sheet", type: "pdf", source: "W3Schools", url: "https://www.w3schools.com/sql/" },
                    { title: "Transactions and Concurrency PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=dbms+notes" },
                    { title: "PL/SQL Complete Tutorial", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/plsql/index.htm" }
                ]
            },
            {
                subject: "Operating System",
                semester: 2,
                topics: [
                    { title: "OS Complete Notes PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/operating-systems/" },
                    { title: "Operating System Tutorial PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/operating_system/operating_system_pdf_version.htm" },
                    { title: "Process Management Notes", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/os-tutorial" },
                    { title: "Memory Management Study Material", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/" },
                    { title: "CPU Scheduling Algorithms PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Operating_Systems" },
                    { title: "Deadlock and Prevention Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" },
                    { title: "File System Management PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=operating+system" }
                ]
            },
            {
                subject: "Object Oriented Programming",
                semester: 3,
                topics: [
                    { title: "C++ Complete Tutorial PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-plus-plus/" },
                    { title: "OOP Concepts in C++ PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/cplusplus/cplusplus_pdf_version.htm" },
                    { title: "C++ Study Material", type: "notes", source: "W3Schools", url: "https://www.w3schools.com/cpp/" },
                    { title: "Inheritance and Polymorphism Notes", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/cpp-tutorial" },
                    { title: "C++ STL Complete Guide", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/" },
                    { title: "Exception Handling in C++ PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Object_Oriented_Programming" },
                    { title: "Templates and Generic Programming", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/templates-cpp/" }
                ]
            },
            {
                subject: "Computer Networks",
                semester: 3,
                topics: [
                    { title: "Computer Networks Complete PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" },
                    { title: "CN Tutorial PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/data_communication_computer_network/data_communication_computer_network_pdf_version.htm" },
                    { title: "OSI Model Study Material", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/computer-network-tutorial" },
                    { title: "TCP/IP Protocol Suite PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Computer_Networks" },
                    { title: "Network Layer Protocols Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/network-layer-protocols/" },
                    { title: "Routing Algorithms PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=computer+networks" },
                    { title: "Network Security Basics", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/network-security/" }
                ]
            },
            {
                subject: "Software Engineering",
                semester: 3,
                topics: [
                    { title: "Software Engineering Complete PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/software-engineering/" },
                    { title: "SDLC Models Study Material", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/software_engineering/index.htm" },
                    { title: "Software Testing Notes PDF", type: "pdf", source: "Javatpoint", url: "https://www.javatpoint.com/software-engineering" },
                    { title: "UML Diagrams Complete Guide", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/unified-modeling-language-uml-introduction/" },
                    { title: "Agile Methodology PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Software_Engineering" },
                    { title: "Project Management Notes", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/software_engineering/software_project_management.htm" }
                ]
            }
        ]
    },
    "BBA": {
        name: "Bachelor of Business Administration",
        resources: [
            { subject: "Principles of Management", semester: 1, topics: [
                { title: "Management Principles PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/management_principles/management_principles_pdf_version.htm" },
                { title: "Management Concepts Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/management/" },
                { title: "Organizational Behavior PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Management_Principles" },
                { title: "Leadership and Motivation Notes", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=principles+of+management" }
            ]},
            { subject: "Business Economics", semester: 1, topics: [
                { title: "Economics Complete PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/business_economics/business_economics_pdf_version.htm" },
                { title: "Micro Economics Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/economics/" },
                { title: "Macro Economics Study Material", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/Business_Economics" },
                { title: "Demand and Supply Analysis PDF", type: "pdf", source: "SlideShare", url: "https://www.slideshare.net/search?q=business+economics" }
            ]},
            { subject: "Financial Accounting", semester: 1, topics: [
                { title: "Accounting Basics PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/accounting_basics/accounting_basics_pdf_version.htm" },
                { title: "Financial Statements Notes", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/accounting" },
                { title: "Journal and Ledger PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Financial_Accounting" },
                { title: "Trial Balance Study Material", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=financial+accounting" }
            ]},
            { subject: "Marketing Management", semester: 2, topics: [
                { title: "Marketing Complete PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/marketing_management/marketing_management_pdf_version.htm" },
                { title: "Marketing Mix Notes", type: "notes", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/marketing/" },
                { title: "Consumer Behavior PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Marketing_Management" },
                { title: "Digital Marketing Basics", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=marketing+management" }
            ]}
        ]
    },
    "BTech": {
        name: "Bachelor of Technology",
        resources: [
            { subject: "Engineering Mathematics", semester: 1, topics: [
                { title: "Engineering Maths Complete PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/engineering-mathematics-tutorials/" },
                { title: "Calculus and Algebra Notes", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/engineering_mathematics/index.htm" },
                { title: "Differential Equations PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Engineering_Mathematics" },
                { title: "Vector Calculus Study Material", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=engineering+mathematics" }
            ]},
            { subject: "Programming in C", semester: 1, topics: [
                { title: "C Programming Tutorial PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-programming-language/" },
                { title: "C Language Complete Notes", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/cprogramming/cprogramming_pdf_version.htm" },
                { title: "Pointers and Arrays PDF", type: "pdf", source: "W3Schools", url: "https://www.w3schools.com/c/" }
            ]},
            { subject: "Digital Logic Design", semester: 2, topics: [
                { title: "Digital Electronics PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/" },
                { title: "Logic Gates and Circuits", type: "notes", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/digital_circuits/index.htm" },
                { title: "Boolean Algebra PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Digital_Logic" }
            ]}
        ]
    },
    "Agriculture": {
        name: "B.Sc. Agriculture",
        resources: [
            { subject: "Agronomy", semester: 1, topics: [
                { title: "Principles of Agronomy PDF", type: "pdf", source: "NPTEL", url: "https://nptel.ac.in/courses/102105053" },
                { title: "Crop Production Notes", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/Agronomy" },
                { title: "Soil Science Study Material", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=agronomy" }
            ]},
            { subject: "Soil Science", semester: 1, topics: [
                { title: "Soil Science Complete PDF", type: "pdf", source: "NPTEL", url: "https://nptel.ac.in/courses/102103019" },
                { title: "Soil Chemistry Notes", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/Soil_Science" }
            ]}
        ]
    },
    "Commerce": {
        name: "Bachelor of Commerce",
        resources: [
            { subject: "Financial Accounting", semester: 1, topics: [
                { title: "Accounting Principles PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/accounting_basics/accounting_basics_pdf_version.htm" },
                { title: "Accounting Notes", type: "notes", source: "Javatpoint", url: "https://www.javatpoint.com/accounting" },
                { title: "Financial Statements PDF", type: "pdf", source: "Academia", url: "https://www.academia.edu/Documents/in/Accounting" }
            ]},
            { subject: "Business Law", semester: 2, topics: [
                { title: "Business Law Complete PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/business_law/index.htm" },
                { title: "Contract Law Notes", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/Business_Law" }
            ]}
        ]
    },
    "Arts": {
        name: "Bachelor of Arts",
        resources: [
            { subject: "English Literature", semester: 1, topics: [
                { title: "English Literature PDF", type: "pdf", source: "Tutorialspoint", url: "https://www.tutorialspoint.com/english_literature/index.htm" },
                { title: "Poetry Analysis Notes", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/English_Literature" },
                { title: "Shakespeare Study Guide", type: "notes", source: "SlideShare", url: "https://www.slideshare.net/search?q=english+literature" }
            ]},
            { subject: "Political Science", semester: 1, topics: [
                { title: "Political Science PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/political-science/" },
                { title: "Indian Constitution Notes", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/Political_Science" }
            ]},
            { subject: "History", semester: 2, topics: [
                { title: "Indian History Complete PDF", type: "pdf", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/history/" },
                { title: "World History Notes", type: "notes", source: "Academia", url: "https://www.academia.edu/Documents/in/History" }
            ]}
        ]
    }
};

// Load and display resources
function loadResources() {
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (!resourcesGrid) return;
    
    const allResources = [];
    
    Object.keys(RESOURCES_DATABASE).forEach(courseKey => {
        const course = RESOURCES_DATABASE[courseKey];
        course.resources.forEach(resource => {
            resource.topics.forEach(topic => {
                allResources.push({
                    ...topic,
                    course: courseKey,
                    courseName: course.name,
                    subject: resource.subject,
                    semester: resource.semester
                });
            });
        });
    });
    
    displayResources(allResources);
}

// Display resources in grid
function displayResources(resources) {
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (!resourcesGrid) return;
    
    if (resources.length === 0) {
        resourcesGrid.innerHTML = '<p class="no-resources">No resources found. Try different filters.</p>';
        return;
    }
    
    resourcesGrid.innerHTML = resources.map(resource => `
        <div class="resource-card" data-course="${resource.course}" data-semester="${resource.semester}" data-type="${resource.type}">
            <div class="resource-header">
                <div class="resource-icon">
                    <i class="fas ${resource.type === 'pdf' ? 'fa-file-pdf' : 'fa-file-alt'}"></i>
                </div>
                <span class="resource-badge">${resource.source}</span>
            </div>
            <h3 class="resource-title">${resource.title}</h3>
            <div class="resource-meta">
                <span class="resource-course"><i class="fas fa-graduation-cap"></i> ${resource.courseName}</span>
                <span class="resource-subject"><i class="fas fa-book"></i> ${resource.subject}</span>
                <span class="resource-semester"><i class="fas fa-calendar"></i> Sem ${resource.semester}</span>
            </div>
            <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link-btn">
                <i class="fas fa-external-link-alt"></i> View ${resource.type === 'pdf' ? 'PDF' : 'Notes'}
            </a>
        </div>
    `).join('');
}

// Filter resources
function filterResources() {
    const searchInput = document.getElementById('resourceSearch');
    const courseFilter = document.getElementById('resourceCourseFilter');
    const semesterFilter = document.getElementById('resourceSemesterFilter');
    const typeFilter = document.getElementById('resourceFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCourse = courseFilter ? courseFilter.value : 'all';
    const selectedSemester = semesterFilter ? semesterFilter.value : 'all';
    const selectedType = typeFilter ? typeFilter.value : 'all';
    
    const allResources = [];
    
    Object.keys(RESOURCES_DATABASE).forEach(courseKey => {
        const course = RESOURCES_DATABASE[courseKey];
        course.resources.forEach(resource => {
            resource.topics.forEach(topic => {
                allResources.push({
                    ...topic,
                    course: courseKey,
                    courseName: course.name,
                    subject: resource.subject,
                    semester: resource.semester
                });
            });
        });
    });
    
    const filteredResources = allResources.filter(resource => {
        const matchesSearch = !searchTerm || 
            resource.title.toLowerCase().includes(searchTerm) ||
            resource.subject.toLowerCase().includes(searchTerm) ||
            resource.source.toLowerCase().includes(searchTerm);
        
        const matchesCourse = selectedCourse === 'all' || resource.course === selectedCourse;
        const matchesSemester = selectedSemester === 'all' || resource.semester === parseInt(selectedSemester);
        const matchesType = selectedType === 'all' || resource.type === selectedType;
        
        return matchesSearch && matchesCourse && matchesSemester && matchesType;
    });
    
    displayResources(filteredResources);
}

// Initialize resources on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadResources);
} else {
    loadResources();
}
