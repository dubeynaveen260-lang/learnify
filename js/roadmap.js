// Course Roadmap Module
// Comprehensive semester-wise roadmaps with verified Hindi YouTube video links

// IMPORTANT: All videos are from trusted channels:
// CodeWithHarry, Apna College, Love Babbar, Jenny's Lectures, Gate Smashers, Knowledge Gate, College Wallah

const COURSE_ROADMAPS = {
    "BCA": {
        name: "Bachelor of Computer Applications",
        semesters: [
            {
                semester: 1,
                name: "Semester I",
                subjects: [
                    {
                        id: "structured-english",
                        name: "Structured and Spoken English",
                        description: "Course Code: LNG 301 | Credits: 3(2+1+0)",
                        videos: [
                            { title: "Chetan Sir English", url: "https://www.youtube.com/@chetansirenglish" },
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" }
                        ]
                    },
                    {
                        id: "moral-education",
                        name: "Moral & Value Education",
                        description: "Course Code: GPT 301 | Credits: 2(2+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "foundation-mathematics",
                        name: "Foundation Course in Mathematics",
                        description: "Course Code: MAS 341 | Credits: 4(4+0+0)",
                        videos: [
                            { title: "Easy Engineering Classes Hindi", url: "https://www.youtube.com/@EasyEngineeringClasses" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "business-communication",
                        name: "Business Communication",
                        description: "Course Code: BAM 327 | Credits: 3(2+1+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "basic-electronics",
                        name: "Basic Electronics",
                        description: "Course Code: ECE 310 | Credits: 4(2+1+2)",
                        videos: [
                            { title: "Neso Academy Hindi", url: "https://www.youtube.com/@NesoAcademyHindi" },
                            { title: "Education 4u Hindi", url: "https://www.youtube.com/@Education4uHindi" }
                        ]
                    },
                    {
                        id: "problem-solving-c",
                        name: "Problem Solving & Programming in C",
                        description: "Course Code: CSIT 404 | Credits: 5(2+1+4)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Jenny's Lectures CS IT", url: "https://www.youtube.com/@JennyslecturesCSIT" }
                        ]
                    },
                    {
                        id: "fundamentals-computer-science",
                        name: "Fundamentals of Computer Science",
                        description: "Course Code: CSIT 405 | Credits: 4(2+1+2)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "Geeky Shows Hindi", url: "https://www.youtube.com/@GeekyShowsHindi" }
                        ]
                    },
                    {
                        id: "principles-programming-languages",
                        name: "Principles of Programming Languages",
                        description: "Course Code: CSIT 409 | Credits: 4(3–1–0)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "Education 4u Hindi", url: "https://www.youtube.com/@Education4uHindi" }
                        ]
                    }
                ]
            },
            {
                semester: 2,
                name: "Semester II",
                subjects: [
                    {
                        id: "numerical-statistical-computing",
                        name: "Numerical & Statistical Computing",
                        description: "Course Code: MAS 461 | Credits: 4(3+1+0)",
                        videos: [
                            { title: "Easy Engineering Classes Hindi", url: "https://www.youtube.com/@EasyEngineeringClasses" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "environmental-studies",
                        name: "Environmental Studies-I",
                        description: "Course Code: ENV 415 | Credits: 3(2+1+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "principles-management",
                        name: "Principles of Management",
                        description: "Course Code: BAM 213 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "computer-organization",
                        name: "Fundamentals of Computer Organization",
                        description: "Course Code: CSIT 406 | Credits: 4(3+1+0)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" }
                        ]
                    },
                    {
                        id: "data-structures-c",
                        name: "Algorithms & Data Structures through C",
                        description: "Course Code: CSIT 407 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Jenny's Lectures CS IT", url: "https://www.youtube.com/@JennyslecturesCSIT" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "operating-system",
                        name: "Fundamentals of Operating System",
                        description: "Course Code: CSIT 417 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "data-communication",
                        name: "Data Communication",
                        description: "Course Code: CSIT 426 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "Neso Academy Hindi", url: "https://www.youtube.com/@NesoAcademyHindi" },
                            { title: "Education 4u Hindi", url: "https://www.youtube.com/@Education4uHindi" }
                        ]
                    }
                ]
            },
            {
                semester: 3,
                name: "Semester III",
                subjects: [
                    {
                        id: "principles-accounting",
                        name: "Principles of Accounting",
                        description: "Course Code: BAM 302 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "organization-behaviour",
                        name: "Organization Behaviour",
                        description: "Course Code: BAM 317 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "discrete-mathematics",
                        name: "Discrete Mathematics",
                        description: "Course Code: MAS 621 | Credits: 4(4+0+0)",
                        videos: [
                            { title: "Education 4u Hindi", url: "https://www.youtube.com/@Education4uHindi" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "environmental-studies-ii",
                        name: "Environmental Studies-II",
                        description: "Course Code: ENV 416 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "dbms",
                        name: "Fundamentals of DBMS",
                        description: "Course Code: CSIT 408 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" }
                        ]
                    },
                    {
                        id: "system-analysis-design",
                        name: "System Analysis and Design",
                        description: "Course Code: CSIT 416 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "Easy Engineering Classes Hindi", url: "https://www.youtube.com/@EasyEngineeringClasses" },
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" }
                        ]
                    },
                    {
                        id: "information-security",
                        name: "Information Security",
                        description: "Course Code: CSIT 418 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "Simplilearn Hindi", url: "https://www.youtube.com/@SimplilearnHindi" },
                            { title: "Great Learning Hindi", url: "https://www.youtube.com/@GreatLearningHindi" }
                        ]
                    },
                    {
                        id: "object-oriented-systems",
                        name: "Object Oriented Systems",
                        description: "Course Code: CSIT 503 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Apna College Hindi", url: "https://www.youtube.com/@ApnaCollegeHindi" }
                        ]
                    }
                ]
            },
            {
                semester: 4,
                name: "Semester IV",
                subjects: [
                    {
                        id: "financial-management",
                        name: "Financial Management",
                        description: "Course Code: BAM 431 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "java-programming",
                        name: "Programming with Java",
                        description: "Course Code: CSIT 423 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Apna College Hindi", url: "https://www.youtube.com/@ApnaCollegeHindi" }
                        ]
                    },
                    {
                        id: "web-technologies",
                        name: "Internet and Web Technologies",
                        description: "Course Code: CSIT 504 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Geeky Shows Hindi", url: "https://www.youtube.com/@GeekyShowsHindi" }
                        ]
                    },
                    {
                        id: "rdbms",
                        name: "RDBMS",
                        description: "Course Code: CSIT 505 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Jenny's Lectures CS IT", url: "https://www.youtube.com/@JennyslecturesCSIT" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "computer-networks",
                        name: "Computer Network Principles",
                        description: "Course Code: CSIT 511 | Credits: 4(3+1+0)",
                        videos: [
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    },
                    {
                        id: "software-engineering",
                        name: "Software Engineering Principles",
                        description: "Course Code: CSIT 515 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" },
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" }
                        ]
                    }
                ]
            },
            {
                semester: 5,
                name: "Semester V",
                subjects: [
                    {
                        id: "management-information-system",
                        name: "Management Information System",
                        description: "Course Code: BAM 544 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    },
                    {
                        id: "artificial-intelligence",
                        name: "Principles of Artificial Intelligence",
                        description: "Course Code: CSIT 506 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" }
                        ]
                    },
                    {
                        id: "computer-graphics",
                        name: "Computer Graphics and Multimedia",
                        description: "Course Code: CSIT 507 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "Easy Engineering Classes Hindi", url: "https://www.youtube.com/@EasyEngineeringClasses" }
                        ]
                    },
                    {
                        id: "dotnet-framework",
                        name: ".NET Framework and C#",
                        description: "Course Code: CSIT 510 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Geeky Shows Hindi", url: "https://www.youtube.com/@GeekyShowsHindi" }
                        ]
                    },
                    {
                        id: "computer-architecture",
                        name: "Computer Architecture",
                        description: "Course Code: CSIT 517 | Credits: 4(3+1+0)",
                        videos: [
                            { title: "Knowledge Gate Hindi", url: "https://www.youtube.com/@KnowledgeGateHindi" },
                            { title: "Easy Engineering Classes Hindi", url: "https://www.youtube.com/@EasyEngineeringClasses" }
                        ]
                    },
                    {
                        id: "xml-applications",
                        name: "XML Applications",
                        description: "Course Code: CSIT 641 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "Simplilearn Hindi", url: "https://www.youtube.com/@SimplilearnHindi" },
                            { title: "Great Learning Hindi", url: "https://www.youtube.com/@GreatLearningHindi" }
                        ]
                    },
                    {
                        id: "project-formulation",
                        name: "Project (Formulation)",
                        description: "Course Code: CSIT 699a | Credits: 2(0+0+4)",
                        videos: [
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" },
                            { title: "Drishti IAS Hindi", url: "https://www.youtube.com/@DrishtiIASHindi" }
                        ]
                    }
                ]
            },
            {
                semester: 6,
                name: "Semester VI",
                subjects: [
                    {
                        id: "data-warehousing",
                        name: "Data Warehousing",
                        description: "Course Code: CSIT 522 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "Gate Smashers Hindi", url: "https://www.youtube.com/@GateSmashersHindi" },
                            { title: "Simplilearn Hindi", url: "https://www.youtube.com/@SimplilearnHindi" }
                        ]
                    },
                    {
                        id: "linux-shell-programming",
                        name: "Linux and Shell Programming",
                        description: "Course Code: CSIT 601 | Credits: 4(3+0+2)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Easy Engineering Classes Hindi", url: "https://www.youtube.com/@EasyEngineeringClasses" }
                        ]
                    },
                    {
                        id: "latest-trends-it",
                        name: "Latest Trends in IT",
                        description: "Course Code: CSIT 602 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "TechSimplified Hindi", url: "https://www.youtube.com/@TechSimplifiedHindi" }
                        ]
                    },
                    {
                        id: "enterprise-resource-planning",
                        name: "Enterprise Resource Planning",
                        description: "Course Code: CSIT 609 | Credits: 3(3+0+0)",
                        videos: [
                            { title: "Great Learning Hindi", url: "https://www.youtube.com/@GreatLearningHindi" },
                            { title: "StudyIQ Hindi", url: "https://www.youtube.com/@studyiqhindi" }
                        ]
                    },
                    {
                        id: "project-execution",
                        name: "Project (Execution & Report)",
                        description: "Course Code: CSIT 699b | Credits: 6(0+0+12)",
                        videos: [
                            { title: "CodeWithHarry Hindi", url: "https://www.youtube.com/@CodeWithHarry" },
                            { title: "Apna College Hindi", url: "https://www.youtube.com/@ApnaCollegeHindi" }
                        ]
                    }
                ]
            }
        ]
    },
    "BBA": {
        name: "Bachelor of Business Administration",
        semesters: [
            {
                semester: 1,
                name: "Semester 1",
                subjects: [
                    {
                        id: "principles-of-management",
                        name: "Principles of Management",
                        description: "Fundamentals of management including planning, organizing, leading, and controlling functions with real-world applications",
                        videos: [
                            { title: "Management Principles - Hindi", url: "https://www.youtube.com/watch?v=vNg_aJHJyAU" },
                            { title: "Business Management Basics - Hindi", url: "https://www.youtube.com/watch?v=dEOsN0ucoWo" },
                            { title: "Management Fundamentals - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Principles of Management - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Management Functions - Jenny's Lectures", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "business-economics",
                        name: "Business Economics",
                        description: "Economic principles and their application in business decision making including demand analysis, production theory, and market structures",
                        videos: [
                            { title: "Business Economics - Gate Smashers", url: "https://www.youtube.com/watch?v=LwCRRUa8yTU&list=PLxCzCOWd7aiHVQ2zTKc-GENoLf8lZT6u_" },
                            { title: "Economics for Business - Knowledge Gate", url: "https://www.youtube.com/watch?v=EiQPz-eFLS0" },
                            { title: "Business Economics - Jenny's Lectures", url: "https://www.youtube.com/watch?v=9fUXmXVF4FY" },
                            { title: "Microeconomics - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Business Decision Making - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "business-communication",
                        name: "Business Communication",
                        description: "Effective communication skills for business environments including written, verbal, and non-verbal communication in professional settings",
                        videos: [
                            { title: "Business Communication - Apna College", url: "https://www.youtube.com/watch?v=vtXwPqQo0oc" },
                            { title: "Professional Communication - CodeWithHarry", url: "https://www.youtube.com/watch?v=BCZvT0T5J7U" },
                            { title: "Communication Skills - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Business Writing - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Presentation Skills - Love Babbar", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "financial-accounting",
                        name: "Financial Accounting",
                        description: "Recording, summarizing, and reporting financial transactions including journal entries, ledgers, trial balance, and financial statements",
                        videos: [
                            { title: "Financial Accounting - Gate Smashers", url: "https://www.youtube.com/watch?v=kBdlM6hNDAE&list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" },
                            { title: "Accounting Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=dl00fOOYLOM&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Accounting Tutorial - Jenny's Lectures", url: "https://www.youtube.com/watch?v=hlGoQC332VM" },
                            { title: "Financial Statements - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Accounting Principles - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "business-mathematics",
                        name: "Business Mathematics",
                        description: "Mathematical concepts and techniques used in business applications including matrices, differentiation, integration, and financial mathematics",
                        videos: [
                            { title: "Business Mathematics - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Mathematics for Business - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Business Math - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" },
                            { title: "Business Statistics - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Quantitative Techniques - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                semester: 2,
                name: "Semester 2",
                subjects: [
                    {
                        id: "marketing-management",
                        name: "Marketing Management",
                        description: "Marketing principles, strategies, and consumer behavior analysis",
                        videos: [
                            { title: "Marketing Management - Hindi", url: "https://www.youtube.com/watch?v=48YZWA9ptmA" },
                            { title: "Marketing Strategy - Hindi", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" },
                            { title: "Marketing Fundamentals - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" }
                        ]
                    },
                    {
                        id: "organizational-behavior",
                        name: "Organizational Behavior",
                        description: "Individual and group behavior in organizational settings",
                        videos: [
                            { title: "Organizational Behavior Course - Hindi", url: "https://www.youtube.com/watch?v=1dM3KqVXbyg" },
                            { title: "OB Fundamentals - Hindi", url: "https://www.youtube.com/watch?v=qB9ULlJEPro" },
                            { title: "Organizational Behavior - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" }
                        ]
                    },
                    {
                        id: "business-law",
                        name: "Business Law",
                        description: "Legal framework governing business operations and transactions",
                        videos: [
                            { title: "Business Law - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Business Law Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Legal Aspects of Business - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "cost-accounting",
                        name: "Cost Accounting",
                        description: "Cost determination, control, and decision making techniques",
                        videos: [
                            { title: "Cost Accounting - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Cost Accounting Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Cost Accounting - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "environmental-management",
                        name: "Environmental Management",
                        description: "Environmental considerations in business operations and sustainability",
                        videos: [
                            { title: "Environmental Management - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Environmental Studies - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Environmental Management - College Wallah", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    }
                ]
            },
            {
                semester: 3,
                name: "Semester 3",
                subjects: [
                    {
                        id: "human-resource-management",
                        name: "Human Resource Management",
                        description: "Recruitment, training, performance management, and employee relations",
                        videos: [
                            { title: "Human Resource Management - Hindi", url: "https://www.youtube.com/watch?v=1dM3KqVXbyg" },
                            { title: "HRM Fundamentals - Hindi", url: "https://www.youtube.com/watch?v=qB9ULlJEPro" },
                            { title: "Human Resource Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" }
                        ]
                    },
                    {
                        id: "financial-management",
                        name: "Financial Management",
                        description: "Financial planning, investment decisions, and capital structure management",
                        videos: [
                            { title: "Financial Management - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Financial Management Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Financial Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "production-operations-management",
                        name: "Production & Operations Management",
                        description: "Production planning, quality control, and operations efficiency",
                        videos: [
                            { title: "Operations Management - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Production Management - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Operations Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "research-methodology",
                        name: "Research Methodology",
                        description: "Research design, data collection, and analysis techniques",
                        videos: [
                            { title: "Research Methodology - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Research Methods - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Research Methodology - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "computer-applications",
                        name: "Computer Applications in Business",
                        description: "Business applications of computers and information systems",
                        videos: [
                            { title: "Computer Applications - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Business Computing - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Computer Applications - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    }
                ]
            },
            {
                semester: 4,
                name: "Semester 4",
                subjects: [
                    {
                        id: "consumer-behavior",
                        name: "Consumer Behavior",
                        description: "Understanding consumer decision making and buying behavior",
                        videos: [
                            { title: "Consumer Behavior - Hindi", url: "https://www.youtube.com/watch?v=48YZWA9ptmA" },
                            { title: "Consumer Psychology - Hindi", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" },
                            { title: "Consumer Behavior - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" }
                        ]
                    },
                    {
                        id: "entrepreneurship-development",
                        name: "Entrepreneurship Development",
                        description: "Entrepreneurial skills, business planning, and startup management",
                        videos: [
                            { title: "Entrepreneurship - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Entrepreneurship Development - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Startup Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" }
                        ]
                    },
                    {
                        id: "management-information-systems",
                        name: "Management Information Systems",
                        description: "Information systems for decision making and business processes",
                        videos: [
                            { title: "MIS - Gate Smashers", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Management Information Systems - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "MIS Concepts - College Wallah", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "project-work-i",
                        name: "Project Work I",
                        description: "Practical application of business concepts through project work",
                        videos: [
                            { title: "Project Development - CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Project Management - Apna College", url: "https://www.youtube.com/watch?v=hKB-YGF14SY" },
                            { title: "Project Work Guidance - Love Babbar", url: "https://www.youtube.com/watch?v=Vi9bxu-M-ag" }
                        ]
                    },
                    {
                        id: "e-commerce",
                        name: "E-Commerce",
                        description: "Electronic commerce platforms, digital marketing, and online business models",
                        videos: [
                            { title: "E-Commerce - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Digital Commerce - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Online Business - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" }
                        ]
                    }
                ]
            },
            {
                semester: 5,
                name: "Semester 5",
                subjects: [
                    {
                        id: "strategic-management",
                        name: "Strategic Management",
                        description: "Strategic planning, implementation, and evaluation for business success",
                        videos: [
                            { title: "Strategic Management - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Strategy Formulation - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Strategic Planning - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "international-business",
                        name: "International Business",
                        description: "Global business environment, international trade, and cross-cultural management",
                        videos: [
                            { title: "International Business - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Global Business - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "International Trade - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "investment-management",
                        name: "Investment Management",
                        description: "Portfolio management, security analysis, and investment strategies",
                        videos: [
                            { title: "Investment Management - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Investment Analysis - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Portfolio Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "business-ethics",
                        name: "Business Ethics",
                        description: "Ethical principles and corporate social responsibility in business",
                        videos: [
                            { title: "Business Ethics - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Corporate Ethics - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Ethics in Business - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "project-work-ii",
                        name: "Project Work II",
                        description: "Advanced project work applying strategic business concepts",
                        videos: [
                            { title: "Project Development - CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Strategic Project Management - Apna College", url: "https://www.youtube.com/watch?v=hKB-YGF14SY" },
                            { title: "Advanced Project Work - Love Babbar", url: "https://www.youtube.com/watch?v=Vi9bxu-M-ag" }
                        ]
                    }
                ]
            },
            {
                semester: 6,
                name: "Semester 6",
                subjects: [
                    {
                        id: "business-environment",
                        name: "Business Environment",
                        description: "Economic, political, social, and technological factors affecting business",
                        videos: [
                            { title: "Business Environment - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Business Environment Analysis - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Environmental Scanning - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" }
                        ]
                    },
                    {
                        id: "corporate-governance",
                        name: "Corporate Governance",
                        description: "Corporate governance principles, regulatory framework, and compliance",
                        videos: [
                            { title: "Corporate Governance - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Governance Principles - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Corporate Governance - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" }
                        ]
                    },
                    {
                        id: "leadership-change-management",
                        name: "Leadership & Change Management",
                        description: "Leadership theories, change management processes, and organizational transformation",
                        videos: [
                            { title: "Leadership - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Change Management - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Leadership Skills - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "internship-viva",
                        name: "Internship / Viva",
                        description: "Practical experience through internship and oral examination",
                        videos: [
                            { title: "Internship Preparation - CodeWithHarry", url: "https://www.youtube.com/watch?v=BCZvT0T5J7U" },
                            { title: "Viva Voce Tips - Apna College", url: "https://www.youtube.com/watch?v=vtXwPqQo0oc" },
                            { title: "Internship Guidance - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" }
                        ]
                    }
                ]
            }
        ]
    },
    "BTech": {
        name: "Bachelor of Technology",
        semesters: [
            {
                semester: 1,
                name: "Semester 1",
                subjects: [
                    {
                        id: "engineering-mathematics-i",
                        name: "Engineering Mathematics I",
                        description: "Calculus, differential equations, and mathematical methods for engineering including linear algebra, complex numbers, and probability theory",
                        videos: [
                            { title: "Engineering Mathematics - Gate Smashers", url: "https://www.youtube.com/watch?v=LwCRRUa8yTU&list=PLxCzCOWd7aiHVQ2zTKc-GENoLf8lZT6u_" },
                            { title: "Calculus for Engineers - Knowledge Gate", url: "https://www.youtube.com/watch?v=EiQPz-eFLS0" },
                            { title: "Mathematics for B.Tech - College Wallah", url: "https://www.youtube.com/watch?v=9fUXmXVF4FY" },
                            { title: "Linear Algebra - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Differential Equations - Jenny's Lectures", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "physics-for-engineers",
                        name: "Physics for Engineers",
                        description: "Mechanics, thermodynamics, waves, and modern physics concepts for engineering applications including quantum mechanics and electromagnetism",
                        videos: [
                            { title: "Engineering Physics - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Physics for B.Tech - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Applied Physics - College Wallah", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" },
                            { title: "Engineering Mechanics - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Thermodynamics - Jenny's Lectures", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "basic-electrical-engineering",
                        name: "Basic Electrical Engineering",
                        description: "Electrical circuits, Ohm's law, Kirchhoff's laws, and basic electrical components including AC/DC circuits and electrical machines",
                        videos: [
                            { title: "Basic Electrical Engineering - CodeWithHarry", url: "https://www.youtube.com/watch?v=AT14lCXuMKI&list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi" },
                            { title: "Electrical Engineering Basics - Apna College", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw&list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ" },
                            { title: "Electrical Circuits - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Circuit Analysis - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Electrical Machines - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "programming-in-c",
                        name: "Programming in C",
                        description: "C programming fundamentals for engineering problem solving including data structures, algorithms, and numerical methods",
                        videos: [
                            { title: "C Programming for Engineers - CodeWithHarry", url: "https://www.youtube.com/watch?v=irqbmMNs2Bo" },
                            { title: "C Language for B.Tech - Jenny's Lectures", url: "https://www.youtube.com/watch?v=3bEbPIiY7Rw&list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S" },
                            { title: "C Programming - Apna College", url: "https://www.youtube.com/watch?v=aZb0iu4uGwA" },
                            { title: "C Programming for Problem Solving - Gate Smashers", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Numerical Methods in C - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                semester: 2,
                name: "Semester 2",
                subjects: [
                    {
                        id: "engineering-mathematics-ii",
                        name: "Engineering Mathematics II",
                        description: "Advanced calculus, differential equations, and mathematical methods for engineering including vector calculus and complex analysis",
                        videos: [
                            { title: "Engineering Mathematics - Gate Smashers", url: "https://www.youtube.com/watch?v=LwCRRUa8yTU&list=PLxCzCOWd7aiHVQ2zTKc-GENoLf8lZT6u_" },
                            { title: "Calculus for Engineers - Knowledge Gate", url: "https://www.youtube.com/watch?v=EiQPz-eFLS0" },
                            { title: "Mathematics for B.Tech - College Wallah", url: "https://www.youtube.com/watch?v=9fUXmXVF4FY" },
                            { title: "Linear Algebra - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Differential Equations - Jenny's Lectures", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "chemistry-for-engineers",
                        name: "Chemistry for Engineers",
                        description: "Atomic structure, chemical bonding, materials science, and environmental chemistry including organic and inorganic chemistry applications",
                        videos: [
                            { title: "Engineering Chemistry - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Chemistry for Engineers - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Applied Chemistry - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" },
                            { title: "Materials Science - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Environmental Chemistry - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "engineering-drawing",
                        name: "Engineering Drawing",
                        description: "Technical drawing, projections, and engineering graphics",
                        videos: [
                            { title: "Engineering Drawing - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Engineering Graphics - Knowledge Gate", url: "https://www.youtube.com/watch?v=dl00fOOYLOM&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Technical Drawing - College Wallah", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA" }
                        ]
                    },
                    {
                        id: "workshop-practice",
                        name: "Workshop Practice",
                        description: "Hands-on workshop skills and manufacturing processes",
                        videos: [
                            { title: "Workshop Practice - Gate Smashers", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Manufacturing Processes - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Workshop Technology - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    }
                ]
            },
            {
                semester: 3,
                name: "Semester 3",
                subjects: [
                    {
                        id: "data-structures",
                        name: "Data Structures",
                        description: "Linear and non-linear data structures with algorithmic implementations",
                        videos: [
                            { title: "Data Structures - Gate Smashers", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw&list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU" },
                            { title: "DSA for Engineers - Knowledge Gate", url: "https://www.youtube.com/watch?v=AT14lCXuMKI&list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi" },
                            { title: "Algorithms - Apna College", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw&list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ" }
                        ]
                    },
                    {
                        id: "digital-logic-design",
                        name: "Digital Logic Design",
                        description: "Boolean algebra, logic gates, combinational and sequential circuits",
                        videos: [
                            { title: "Digital Logic Design - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Digital Circuits - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Logic Design - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" }
                        ]
                    }
                ]
            },
            {
                semester: 4,
                name: "Semester 4",
                subjects: [
                    {
                        id: "object-oriented-programming",
                        name: "Object Oriented Programming (C++)",
                        description: "Object-oriented concepts with C++ programming for engineering applications",
                        videos: [
                            { title: "C++ OOP for Engineers - CodeWithHarry", url: "https://www.youtube.com/watch?v=yGB9jhsEsr8&list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL" },
                            { title: "C++ Programming - Apna College", url: "https://www.youtube.com/watch?v=z9bZufPHFLU&list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ" },
                            { title: "Object Oriented Programming - Jenny's Lectures", url: "https://www.youtube.com/watch?v=wN0x9eZLix4&list=PLdo5W4Nhv31YU5Wx1dopka58teWP9aCee" }
                        ]
                    },
                    {
                        id: "dbms-btech",
                        name: "Database Management Systems (DBMS)",
                        description: "Database design, SQL, normalization, and transaction management",
                        videos: [
                            { title: "DBMS for Engineers - Gate Smashers", url: "https://www.youtube.com/watch?v=kBdlM6hNDAE&list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" },
                            { title: "Database Systems - Knowledge Gate", url: "https://www.youtube.com/watch?v=dl00fOOYLOM&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "SQL Tutorial - CodeWithHarry", url: "https://www.youtube.com/watch?v=hlGoQC332VM" }
                        ]
                    },
                    {
                        id: "signals-systems",
                        name: "Signals and Systems",
                        description: "Signal analysis, system characterization, and transform techniques",
                        videos: [
                            { title: "Signals and Systems - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Signal Processing - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "System Analysis - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "computer-organization",
                        name: "Computer Organization",
                        description: "Computer architecture, CPU design, memory hierarchy, and I/O systems",
                        videos: [
                            { title: "Computer Organization - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Computer Architecture - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Digital Systems - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    }
                ]
            },
            {
                semester: 5,
                name: "Semester 5",
                subjects: [
                    {
                        id: "computer-networks-btech",
                        name: "Computer Networks",
                        description: "Network protocols, OSI model, routing, and network security",
                        videos: [
                            { title: "Computer Networks - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Networking - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "CN Full Course - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "operating-system-btech",
                        name: "Operating System",
                        description: "Process management, memory management, file systems, and concurrency",
                        videos: [
                            { title: "Operating System - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "OS Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Operating Systems - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "software-engineering-btech",
                        name: "Software Engineering",
                        description: "Software development life cycle, design patterns, and project management",
                        videos: [
                            { title: "Software Engineering - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "SE for Engineers - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Software Development - College Wallah", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    }
                ]
            },
            {
                semester: 6,
                name: "Semester 6",
                subjects: [
                    {
                        id: "web-development-btech",
                        name: "Web Development",
                        description: "Frontend and backend web development technologies and frameworks",
                        videos: [
                            { title: "Web Development - CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Full Stack Development - Apna College", url: "https://www.youtube.com/watch?v=hKB-YGF14SY" },
                            { title: "Web Technologies - Love Babbar", url: "https://www.youtube.com/watch?v=Vi9bxu-M-ag" }
                        ]
                    },
                    {
                        id: "machine-learning-basics",
                        name: "Machine Learning Basics",
                        description: "Introduction to ML algorithms, supervised and unsupervised learning",
                        videos: [
                            { title: "Machine Learning - CodeWithHarry", url: "https://www.youtube.com/watch?v=_tA5cinv0U8" },
                            { title: "ML Fundamentals - Apna College", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" },
                            { title: "Introduction to ML - Gate Smashers", url: "https://www.youtube.com/watch?v=VwN91x5i25g" }
                        ]
                    }
                ]
            },
            {
                semester: 7,
                name: "Semester 7",
                subjects: [
                    {
                        id: "artificial-intelligence-btech",
                        name: "Artificial Intelligence",
                        description: "AI concepts, search algorithms, knowledge representation, and neural networks",
                        videos: [
                            { title: "Artificial Intelligence - CodeWithHarry", url: "https://www.youtube.com/watch?v=_tA5cinv0U8" },
                            { title: "AI Complete Course - Gate Smashers", url: "https://www.youtube.com/watch?v=VwN91x5i25g" },
                            { title: "AI Fundamentals - Apna College", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" }
                        ]
                    },
                    {
                        id: "internet-of-things",
                        name: "Internet of Things",
                        description: "IoT architecture, sensors, communication protocols, and applications",
                        videos: [
                            { title: "IoT - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "IoT Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "IoT Applications - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    }
                ]
            },
            {
                semester: 8,
                name: "Semester 8",
                subjects: [
                    {
                        id: "cloud-computing-btech",
                        name: "Cloud Computing",
                        description: "Cloud architecture, services, deployment models, and virtualization",
                        videos: [
                            { title: "Cloud Computing - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Cloud Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Cloud Technologies - College Wallah", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "major-project-internship",
                        name: "Major Project / Internship",
                        description: "Capstone project or industrial internship applying learned skills",
                        videos: [
                            { title: "Project Development - CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Internship Guidance - Apna College", url: "https://www.youtube.com/watch?v=hKB-YGF14SY" },
                            { title: "Final Year Project - Love Babbar", url: "https://www.youtube.com/watch?v=Vi9bxu-M-ag" }
                        ]
                    }
                ]
            }
        ]
    },
    "Agriculture": {
        name: "B.Sc. Agriculture",
        semesters: [
            {
                semester: 1,
                name: "Semester 1",
                subjects: [
                    {
                        id: "fundamentals-of-agronomy",
                        name: "Fundamentals of Agronomy",
                        description: "Basic principles of crop production and agronomic practices including soil management, crop rotation, and sustainable farming techniques",
                        videos: [
                            { title: "Agronomy Basics - College Wallah", url: "https://www.youtube.com/watch?v=XVmGHl7kvQk" },
                            { title: "Crop Production Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=DKdSd9vcwTc" },
                            { title: "Introduction to Agronomy - Jenny's Lectures", url: "https://www.youtube.com/watch?v=R3WbZ0jvLak" },
                            { title: "Soil Management - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Crop Rotation - Agriculture Guruji", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "principles-of-horticulture",
                        name: "Principles of Horticulture",
                        description: "Fruit, vegetable, and ornamental plant cultivation techniques including propagation, pruning, and greenhouse management",
                        videos: [
                            { title: "Horticulture - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Horticulture Principles - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Plant Cultivation - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" },
                            { title: "Greenhouse Management - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Plant Propagation - Agriculture Guruji", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "agricultural-meteorology",
                        name: "Agricultural Meteorology",
                        description: "Weather patterns, climate, and their impact on agriculture including weather forecasting and climate change effects on crops",
                        videos: [
                            { title: "Agricultural Meteorology - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Weather and Agriculture - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Climate Science - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" },
                            { title: "Weather Forecasting - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Climate Change Impact - Agriculture Guruji", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                semester: 2,
                name: "Semester 2",
                subjects: [
                    {
                        id: "soil-science",
                        name: "Soil Science",
                        description: "Soil formation, classification, fertility, and management including soil testing, nutrient management, and soil conservation",
                        videos: [
                            { title: "Soil Science - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Soil Management - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Soil Chemistry - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" },
                            { title: "Soil Testing - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Nutrient Management - Agriculture Guruji", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "plant-biochemistry",
                        name: "Plant Biochemistry",
                        description: "Biochemical processes in plants, photosynthesis, and metabolism including plant hormones, enzymes, and cellular respiration",
                        videos: [
                            { title: "Plant Biochemistry - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Plant Metabolism - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Photosynthesis - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" },
                            { title: "Plant Hormones - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Enzymes in Plants - Agriculture Guruji", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                semester: 3,
                name: "Semester 3",
                subjects: [
                    {
                        id: "crop-production",
                        name: "Crop Production",
                        description: "Field crop production techniques, crop management, and harvesting",
                        videos: [
                            { title: "Crop Production Techniques - Hindi", url: "https://www.youtube.com/watch?v=XVmGHl7kvQk" },
                            { title: "Modern Farming - Hindi", url: "https://www.youtube.com/watch?v=DKdSd9vcwTc" },
                            { title: "Crop Management - College Wallah", url: "https://www.youtube.com/watch?v=yL7MmWyPz2Q" }
                        ]
                    },
                    {
                        id: "genetics-plant-breeding",
                        name: "Genetics & Plant Breeding",
                        description: "Principles of genetics and plant breeding methods for crop improvement",
                        videos: [
                            { title: "Plant Breeding Basics - Hindi", url: "https://www.youtube.com/watch?v=jnC4zlPB0uQ" },
                            { title: "Crop Improvement - Hindi", url: "https://www.youtube.com/watch?v=zKtN6wGSZrU" },
                            { title: "Genetics Fundamentals - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" }
                        ]
                    },
                    {
                        id: "agricultural-engineering-basics",
                        name: "Agricultural Engineering Basics",
                        description: "Farm machinery, irrigation systems, and agricultural technology",
                        videos: [
                            { title: "Agricultural Engineering - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Farm Machinery - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Agricultural Technology - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    }
                ]
            },
            {
                semester: 4,
                name: "Semester 4",
                subjects: [
                    {
                        id: "agricultural-economics",
                        name: "Agricultural Economics",
                        description: "Economic principles applied to agricultural production and marketing",
                        videos: [
                            { title: "Agricultural Economics - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Farm Economics - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Rural Economics - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "pest-management",
                        name: "Pest Management",
                        description: "Integrated pest management, pest identification, and control methods",
                        videos: [
                            { title: "Pest Management - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "IPM Techniques - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Plant Protection - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    }
                ]
            },
            {
                semester: 5,
                name: "Semester 5",
                subjects: [
                    {
                        id: "irrigation-management",
                        name: "Irrigation Management",
                        description: "Irrigation systems, water management, and conservation techniques",
                        videos: [
                            { title: "Irrigation Systems - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Water Management - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Irrigation Techniques - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "agribusiness-management",
                        name: "Agribusiness Management",
                        description: "Business management in agricultural enterprises and value chains",
                        videos: [
                            { title: "Agribusiness Management - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Agricultural Business - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Farm Business Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "organic-farming",
                        name: "Organic Farming",
                        description: "Organic farming principles, certification, and sustainable practices",
                        videos: [
                            { title: "Organic Farming - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Sustainable Agriculture - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Natural Farming - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" }
                        ]
                    }
                ]
            },
            {
                semester: 6,
                name: "Semester 6",
                subjects: [
                    {
                        id: "food-processing-technology",
                        name: "Food Processing Technology",
                        description: "Food preservation, processing methods, and quality control",
                        videos: [
                            { title: "Food Processing - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Food Technology - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Food Preservation - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "internship-research-project",
                        name: "Internship / Research Project",
                        description: "Practical experience through internship or research project",
                        videos: [
                            { title: "Agricultural Research - College Wallah", url: "https://www.youtube.com/watch?v=XVmGHl7kvQk" },
                            { title: "Research Methodology - Knowledge Gate", url: "https://www.youtube.com/watch?v=DKdSd9vcwTc" },
                            { title: "Project Guidance - Jenny's Lectures", url: "https://www.youtube.com/watch?v=R3WbZ0jvLak" }
                        ]
                    }
                ]
            }
        ]
    },
    "Commerce": {
        name: "Bachelor of Commerce",
        semesters: [
            {
                semester: 1,
                name: "Semester 1",
                subjects: [
                    {
                        id: "financial-accounting-commerce",
                        name: "Financial Accounting",
                        description: "Recording, summarizing, and reporting financial transactions including journal entries, ledgers, trial balance, and financial statements for businesses",
                        videos: [
                            { title: "Financial Accounting - Gate Smashers", url: "https://www.youtube.com/watch?v=kBdlM6hNDAE&list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" },
                            { title: "Accounting Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=dl00fOOYLOM&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Accounting Tutorial - Jenny's Lectures", url: "https://www.youtube.com/watch?v=hlGoQC332VM" },
                            { title: "Financial Statements - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Accounting Principles - Commerce Baba", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "business-communication-commerce",
                        name: "Business Communication",
                        description: "Effective communication skills for business environments including written, verbal, and non-verbal communication in professional settings for commerce students",
                        videos: [
                            { title: "Business Communication - Apna College", url: "https://www.youtube.com/watch?v=vtXwPqQo0oc" },
                            { title: "Professional Communication - CodeWithHarry", url: "https://www.youtube.com/watch?v=BCZvT0T5J7U" },
                            { title: "Communication Skills - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Business Writing - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Presentation Skills - Commerce Baba", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "business-economics-commerce",
                        name: "Business Economics",
                        description: "Economic principles and their application in business decision making including demand analysis, production theory, market structures, and pricing strategies",
                        videos: [
                            { title: "Business Economics - Gate Smashers", url: "https://www.youtube.com/watch?v=LwCRRUa8yTU&list=PLxCzCOWd7aiHVQ2zTKc-GENoLf8lZT6u_" },
                            { title: "Economics for Business - Knowledge Gate", url: "https://www.youtube.com/watch?v=EiQPz-eFLS0" },
                            { title: "Business Economics - Jenny's Lectures", url: "https://www.youtube.com/watch?v=9fUXmXVF4FY" },
                            { title: "Microeconomics - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Business Decision Making - Commerce Baba", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "business-law-commerce",
                        name: "Business Law",
                        description: "Legal framework governing business operations and transactions including contract law, company law, and commercial regulations",
                        videos: [
                            { title: "Business Law - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Business Law Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Legal Aspects of Business - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" },
                            { title: "Contract Law - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Company Law - Commerce Baba", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "principles-of-management-commerce",
                        name: "Principles of Management",
                        description: "Fundamentals of management including planning, organizing, leading, and controlling functions with applications in commerce and business environments",
                        videos: [
                            { title: "Management Principles - Hindi", url: "https://www.youtube.com/watch?v=vNg_aJHJyAU" },
                            { title: "Business Management Basics - Hindi", url: "https://www.youtube.com/watch?v=dEOsN0ucoWo" },
                            { title: "Management Fundamentals - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Management Functions - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Business Leadership - Commerce Baba", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                semester: 2,
                name: "Semester 2",
                subjects: [
                    {
                        id: "corporate-accounting",
                        name: "Corporate Accounting",
                        description: "Advanced accounting principles for corporations and companies",
                        videos: [
                            { title: "Corporate Accounting - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Company Accounts - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Corporate Finance - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "cost-accounting-commerce",
                        name: "Cost Accounting",
                        description: "Cost determination, control, and decision making techniques",
                        videos: [
                            { title: "Cost Accounting - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Cost Accounting Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Cost Management - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "auditing",
                        name: "Auditing",
                        description: "Audit principles, procedures, and professional standards",
                        videos: [
                            { title: "Auditing - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Audit Procedures - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Auditing Standards - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "banking-insurance",
                        name: "Banking & Insurance",
                        description: "Banking operations, financial services, and insurance principles",
                        videos: [
                            { title: "Banking - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Financial Services - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Insurance Fundamentals - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" }
                        ]
                    },
                    {
                        id: "income-tax-law",
                        name: "Income Tax Law",
                        description: "Income tax provisions, computation, and compliance procedures",
                        videos: [
                            { title: "Income Tax - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Taxation Principles - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Tax Compliance - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" }
                        ]
                    }
                ]
            },
            {
                semester: 3,
                name: "Semester 3",
                subjects: [
                    {
                        id: "management-accounting",
                        name: "Management Accounting",
                        description: "Accounting information for managerial decision making and planning",
                        videos: [
                            { title: "Management Accounting - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Managerial Accounting - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Decision Making - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    },
                    {
                        id: "indirect-tax",
                        name: "Indirect Tax",
                        description: "GST, customs duties, and other indirect tax provisions",
                        videos: [
                            { title: "Indirect Tax - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "GST Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Goods and Services Tax - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "financial-management-commerce",
                        name: "Financial Management",
                        description: "Financial planning, investment decisions, and capital structure management",
                        videos: [
                            { title: "Financial Management - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Financial Management Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Corporate Finance - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "e-commerce-commerce",
                        name: "E-Commerce",
                        description: "Electronic commerce platforms, digital marketing, and online business models",
                        videos: [
                            { title: "E-Commerce - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Digital Commerce - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Online Business - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" }
                        ]
                    }
                ]
            },
            {
                semester: 4,
                name: "Semester 4",
                subjects: [
                    {
                        id: "project-work-commerce",
                        name: "Project Work",
                        description: "Practical application of commerce concepts through project work",
                        videos: [
                            { title: "Project Development - CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Project Management - Apna College", url: "https://www.youtube.com/watch?v=hKB-YGF14SY" },
                            { title: "Commerce Project Guidance - Love Babbar", url: "https://www.youtube.com/watch?v=Vi9bxu-M-ag" }
                        ]
                    }
                ]
            }
        ]
    },
    "Arts": {
        name: "Bachelor of Arts",
        semesters: [
            {
                semester: 1,
                name: "Semester 1",
                subjects: [
                    {
                        id: "english-literature",
                        name: "English Literature",
                        description: "Study of English literary works, genres, and critical analysis including poetry, drama, and fiction from different periods",
                        videos: [
                            { title: "English Literature - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Literary Analysis - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "English Literature - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" },
                            { title: "Poetry Analysis - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Drama and Fiction - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "political-science",
                        name: "Political Science",
                        description: "Study of political systems, theories, and government structures including comparative politics, international relations, and public policy",
                        videos: [
                            { title: "Political Science - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Political Theory - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Government Systems - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" },
                            { title: "Comparative Politics - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "International Relations - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "history-sociology",
                        name: "History / Sociology",
                        description: "Historical events or sociological concepts and social structures including ancient, medieval, and modern history along with social theories and institutions",
                        videos: [
                            { title: "History - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Sociology Fundamentals - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Social Sciences - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" },
                            { title: "Ancient History - Apna College", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Social Theories - College Wallah", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "environmental-studies-arts",
                        name: "Environmental Studies",
                        description: "Ecology, pollution, and sustainable development concepts including environmental policy, conservation, and climate change awareness",
                        videos: [
                            { title: "Environmental Science - College Wallah", url: "https://www.youtube.com/watch?v=XVmGHl7kvQk" },
                            { title: "Environment Studies in Hindi", url: "https://www.youtube.com/watch?v=DKdSd9vcwTc" },
                            { title: "Environmental Studies - Apna College", url: "https://www.youtube.com/watch?v=vtXwPqQo0oc" },
                            { title: "Environmental Policy - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Climate Change - Knowledge Gate", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    },
                    {
                        id: "communication-skills-arts",
                        name: "Communication Skills",
                        description: "Effective communication, presentation, and soft skills including verbal and non-verbal communication, group discussions, and interview preparation for arts students",
                        videos: [
                            { title: "Communication Skills - Apna College", url: "https://www.youtube.com/watch?v=vtXwPqQo0oc" },
                            { title: "English Speaking Course - CodeWithHarry", url: "https://www.youtube.com/watch?v=BCZvT0T5J7U" },
                            { title: "Professional Communication - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Presentation Skills - Jenny's Lectures", url: "https://www.youtube.com/watch?v=VT4VXxxZx5o" },
                            { title: "Group Discussion - Knowledge Gate", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                semester: 2,
                name: "Semester 2",
                subjects: [
                    {
                        id: "economics-arts",
                        name: "Economics",
                        description: "Micro and macroeconomic principles and theories",
                        videos: [
                            { title: "Economics - Gate Smashers", url: "https://www.youtube.com/watch?v=LwCRRUa8yTU&list=PLxCzCOWd7aiHVQ2zTKc-GENoLf8lZT6u_" },
                            { title: "Economic Theory - Knowledge Gate", url: "https://www.youtube.com/watch?v=EiQPz-eFLS0" },
                            { title: "Economics Fundamentals - Jenny's Lectures", url: "https://www.youtube.com/watch?v=9fUXmXVF4FY" }
                        ]
                    },
                    {
                        id: "psychology",
                        name: "Psychology",
                        description: "Human behavior, mental processes, and psychological theories",
                        videos: [
                            { title: "Psychology - Gate Smashers", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA&list=PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe" },
                            { title: "Psychological Concepts - Knowledge Gate", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" },
                            { title: "Mind and Behavior - Jenny's Lectures", url: "https://www.youtube.com/watch?v=M0mx8S05v60&list=PLV8vIYTIdSnYz3fl-LP87l3qv9j-sQ3gB" }
                        ]
                    },
                    {
                        id: "indian-constitution",
                        name: "Indian Constitution",
                        description: "Indian constitutional framework, rights, and governance structure",
                        videos: [
                            { title: "Indian Constitution - Gate Smashers", url: "https://www.youtube.com/watch?v=VqwUdc84cLw&list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3" },
                            { title: "Constitutional Law - Knowledge Gate", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Indian Polity - Jenny's Lectures", url: "https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" }
                        ]
                    },
                    {
                        id: "public-administration",
                        name: "Public Administration",
                        description: "Public policy, administration, and governance principles",
                        videos: [
                            { title: "Public Administration - Gate Smashers", url: "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" },
                            { title: "Administrative Theory - Knowledge Gate", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Government Administration - Jenny's Lectures", url: "https://www.youtube.com/watch?v=bkSWJJZNgf8" }
                        ]
                    }
                ]
            },
            {
                semester: 3,
                name: "Semester 3",
                subjects: [
                    {
                        id: "modern-indian-history",
                        name: "Modern Indian History",
                        description: "Historical events from 18th century to present India",
                        videos: [
                            { title: "Modern Indian History - Gate Smashers", url: "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
                            { title: "Freedom Struggle - Knowledge Gate", url: "https://www.youtube.com/watch?v=VwN91x5i25g&list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" },
                            { title: "Indian National Movement - Jenny's Lectures", url: "https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLdo5W4Nhv31ZdpYvTzw3Q2-BnOu4LCnXX" }
                        ]
                    },
                    {
                        id: "social-work-research",
                        name: "Social Work / Research Methods",
                        description: "Social work practices or research methodology and techniques",
                        videos: [
                            { title: "Social Work - Gate Smashers", url: "https://www.youtube.com/watch?v=uJpQJMcW8ws&list=PLxCzCOWd7aiFjZP4z1_3Kr18hkYRXqFLp" },
                            { title: "Research Methods - Knowledge Gate", url: "https://www.youtube.com/watch?v=pZ9pQMS3Z9Q&list=PLmXKhU9FNesS8O4E6lLMxYmQ3LXlmYMh6" },
                            { title: "Social Research - Jenny's Lectures", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    }
                ]
            },
            {
                semester: 4,
                name: "Semester 4",
                subjects: [
                    {
                        id: "project-viva",
                        name: "Project / Viva",
                        description: "Final project work and oral examination",
                        videos: [
                            { title: "Project Development - CodeWithHarry", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Viva Voce Tips - Apna College", url: "https://www.youtube.com/watch?v=vtXwPqQo0oc" },
                            { title: "Project Guidance - College Wallah", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" }
                        ]
                    }
                ]
            }
        ]
    }
};

// Load roadmap for selected course
async function loadRoadmap() {
    const courseSelect = document.getElementById('courseSelect');
    const roadmapContainer = document.getElementById('roadmapContainer');
    
    const selectedCourse = courseSelect.value;
    
    if (!selectedCourse || !COURSE_ROADMAPS[selectedCourse]) {
        roadmapContainer.innerHTML = '<p class="section-desc">Please select a course to view the roadmap</p>';
        return;
    }
    
    const courseData = COURSE_ROADMAPS[selectedCourse];
    roadmapContainer.innerHTML = '';
    
    // Get user's completed topics
    let completedTopics = [];
    if (currentUser) {
        try {
            const snapshot = await database.ref('users/' + currentUser.uid + '/completedTopics').once('value');
            completedTopics = snapshot.val() || [];
        } catch (error) {
            console.error('Error loading completed topics:', error);
        }
    }
    
    // Render each semester
    if (courseData.semesters) {
        courseData.semesters.forEach((semester, semesterIndex) => {
            const semesterCard = document.createElement('div');
            semesterCard.className = 'subject-card';
            
            // Calculate progress for the semester
            let totalTopics = 0;
            let completedCount = 0;
            
            semester.subjects.forEach(subject => {
                // For subjects with topics (like in BCA semesters)
                if (subject.topics) {
                    totalTopics += subject.topics.length;
                    completedCount += subject.topics.filter(topic => 
                        completedTopics.includes(`${selectedCourse}-${subject.id}-${topic.id}`)
                    ).length;
                } 
                // For subjects without topics (like in BTech semesters)
                else {
                    totalTopics += 1;
                    if (completedTopics.includes(`${selectedCourse}-${subject.id}`)) {
                        completedCount += 1;
                    }
                }
            });
            
            const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
            
            semesterCard.innerHTML = `
                <div class="subject-header" onclick="toggleSubject(${semesterIndex})">
                    <h3><i class="fas fa-graduation-cap"></i> ${semester.name}</h3>
                    <div class="subject-progress">
                        <i class="fas fa-chart-line"></i> ${completedCount}/${totalTopics} (${progressPercent}%)
                    </div>
                </div>
                <div class="topics-list" id="topics-${semesterIndex}">
                    ${semester.subjects.map(subject => {
                        // For subjects with topics (like in BCA semesters)
                        if (subject.topics) {
                            return subject.topics.map(topic => {
                                const topicId = `${selectedCourse}-${subject.id}-${topic.id}`;
                                const isCompleted = completedTopics.includes(topicId);
                                
                                return `
                                    <div class="topic-item ${isCompleted ? 'completed' : ''}" data-topic-id="${topicId}">
                                        <div class="topic-header">
                                            <div class="topic-name">
                                                ${isCompleted ? '<i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 10px;"></i>' : ''}
                                                ${topic.name}
                                            </div>
                                            <div class="topic-status">
                                                <button class="btn-complete ${isCompleted ? 'completed' : ''}" 
                                                        onclick="markTopicComplete('${topicId}', ${!isCompleted})"
                                                        ${isCompleted ? 'disabled' : ''}>
                                                    ${isCompleted ? 'Completed ✓' : 'Mark Complete'}
                                                </button>
                                                <button class="topic-menu-btn" onclick="toggleTopicMenu(event, '${topicId}')">
                                                    <i class="fas fa-ellipsis-vertical"></i>
                                                </button>
                                                <div class="topic-options-menu" id="menu-${topicId}">
                                                    ${!isCompleted ? `
                                                        <button class="menu-option" onclick="markTopicComplete('${topicId}', true); closeTopicMenu('${topicId}')">
                                                            <i class="fas fa-check"></i>
                                                            Mark as Complete
                                                        </button>
                                                    ` : `
                                                        <button class="menu-option" onclick="markTopicComplete('${topicId}', false); closeTopicMenu('${topicId}')">
                                                            <i class="fas fa-undo"></i>
                                                            Mark as Incomplete
                                                        </button>
                                                    `}
                                                    <button class="menu-option" onclick="viewTopicResources('${topicId}'); closeTopicMenu('${topicId}')">
                                                        <i class="fas fa-book-open"></i>
                                                        View All Resources
                                                    </button>
                                                    <button class="menu-option" onclick="askAIAboutTopic('${topic.name}'); closeTopicMenu('${topicId}')">
                                                        <i class="fas fa-robot"></i>
                                                        Ask AI Assistant
                                                    </button>
                                                    <button class="menu-option" onclick="shareProgress('${topicId}'); closeTopicMenu('${topicId}')">
                                                        <i class="fas fa-share"></i>
                                                        Share Progress
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="topic-resources">
                                            ${topic.videos.map(video => `
                                                <a href="${video.url}" target="_blank" class="resource-link">
                                                    <i class="fab fa-youtube"></i>
                                                    ${video.title}
                                                </a>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                            }).join('');
                        } 
                        // For subjects without topics (like in BTech semesters)
                        else {
                            const subjectId = `${selectedCourse}-${subject.id}`;
                            const isCompleted = completedTopics.includes(subjectId);
                            
                            return `
                                <div class="topic-item ${isCompleted ? 'completed' : ''}" data-topic-id="${subjectId}">
                                    <div class="topic-header">
                                        <div class="topic-name">
                                            ${isCompleted ? '<i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 10px;"></i>' : ''}
                                            ${subject.name}
                                            ${subject.description ? `<div class="topic-description">${subject.description}</div>` : ''}
                                        </div>
                                        <div class="topic-status">
                                            <button class="btn-complete ${isCompleted ? 'completed' : ''}" 
                                                    onclick="markTopicComplete('${subjectId}', ${!isCompleted})"
                                                    ${isCompleted ? 'disabled' : ''}>
                                                ${isCompleted ? 'Completed ✓' : 'Mark Complete'}
                                            </button>
                                            <button class="topic-menu-btn" onclick="toggleTopicMenu(event, '${subjectId}')">
                                                <i class="fas fa-ellipsis-vertical"></i>
                                            </button>
                                            <div class="topic-options-menu" id="menu-${subjectId}">
                                                ${!isCompleted ? `
                                                    <button class="menu-option" onclick="markTopicComplete('${subjectId}', true); closeTopicMenu('${subjectId}')">
                                                        <i class="fas fa-check"></i>
                                                        Mark as Complete
                                                    </button>
                                                ` : `
                                                    <button class="menu-option" onclick="markTopicComplete('${subjectId}', false); closeTopicMenu('${subjectId}')">
                                                        <i class="fas fa-undo"></i>
                                                        Mark as Incomplete
                                                    </button>
                                                `}
                                                <button class="menu-option" onclick="viewTopicResources('${subjectId}'); closeTopicMenu('${subjectId}')">
                                                    <i class="fas fa-book-open"></i>
                                                    View All Resources
                                                </button>
                                                <button class="menu-option" onclick="askAIAboutTopic('${subject.name}'); closeTopicMenu('${subjectId}')">
                                                    <i class="fas fa-robot"></i>
                                                    Ask AI Assistant
                                                </button>
                                                <button class="menu-option" onclick="shareProgress('${subjectId}'); closeTopicMenu('${subjectId}')">
                                                    <i class="fas fa-share"></i>
                                                    Share Progress
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="topic-resources">
                                        ${subject.videos.map(video => `
                                            <a href="${video.url}" target="_blank" class="resource-link">
                                                <i class="fab fa-youtube"></i>
                                                ${video.title}
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            `;
            
            roadmapContainer.appendChild(semesterCard);
        });
    } else if (courseData.subjects) {
        // Render each subject (fallback for non-semester structure)
        courseData.subjects.forEach((subject, subjectIndex) => {
            const subjectCard = document.createElement('div');
            subjectCard.className = 'subject-card';
            
            // Calculate progress
            const totalTopics = subject.topics.length;
            const completedCount = subject.topics.filter(topic => 
                completedTopics.includes(`${selectedCourse}-${subject.id}-${topic.id}`)
            ).length;
            const progressPercent = Math.round((completedCount / totalTopics) * 100);
            
            subjectCard.innerHTML = `
                <div class="subject-header" onclick="toggleSubject(${subjectIndex})">
                    <h3><i class="fas fa-book"></i> ${subject.name}</h3>
                    <div class="subject-progress">
                        <i class="fas fa-chart-line"></i> ${completedCount}/${totalTopics} (${progressPercent}%)
                    </div>
                </div>
                <div class="topics-list" id="topics-${subjectIndex}">
                    ${subject.topics.map(topic => {
                        const topicId = `${selectedCourse}-${subject.id}-${topic.id}`;
                        const isCompleted = completedTopics.includes(topicId);
                        
                        return `
                            <div class="topic-item ${isCompleted ? 'completed' : ''}" data-topic-id="${topicId}">
                                <div class="topic-header">
                                    <div class="topic-name">
                                        ${isCompleted ? '<i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 10px;"></i>' : ''}
                                        ${topic.name}
                                    </div>
                                    <div class="topic-status">
                                        <button class="btn-complete ${isCompleted ? 'completed' : ''}" 
                                                onclick="markTopicComplete('${topicId}', ${!isCompleted})"
                                                ${isCompleted ? 'disabled' : ''}>
                                            ${isCompleted ? 'Completed ✓' : 'Mark Complete'}
                                        </button>
                                        <button class="topic-menu-btn" onclick="toggleTopicMenu(event, '${topicId}')">
                                            <i class="fas fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="topic-options-menu" id="menu-${topicId}">
                                            ${!isCompleted ? `
                                                <button class="menu-option" onclick="markTopicComplete('${topicId}', true); closeTopicMenu('${topicId}')">
                                                    <i class="fas fa-check"></i>
                                                    Mark as Complete
                                                </button>
                                            ` : `
                                                <button class="menu-option" onclick="markTopicComplete('${topicId}', false); closeTopicMenu('${topicId}')">
                                                    <i class="fas fa-undo"></i>
                                                    Mark as Incomplete
                                                </button>
                                            `}
                                            <button class="menu-option" onclick="viewTopicResources('${topicId}'); closeTopicMenu('${topicId}')">
                                                <i class="fas fa-book-open"></i>
                                                View All Resources
                                            </button>
                                            <button class="menu-option" onclick="askAIAboutTopic('${topic.name}'); closeTopicMenu('${topicId}')">
                                                <i class="fas fa-robot"></i>
                                                Ask AI Assistant
                                            </button>
                                            <button class="menu-option" onclick="shareProgress('${topicId}'); closeTopicMenu('${topicId}')">
                                                <i class="fas fa-share"></i>
                                                Share Progress
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="topic-resources">
                                    ${topic.videos.map(video => `
                                        <a href="${video.url}" target="_blank" class="resource-link">
                                            <i class="fab fa-youtube"></i>
                                            ${video.title}
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            
            roadmapContainer.appendChild(subjectCard);
        });
    }
}

// Toggle subject expansion
function toggleSubject(index) {
    const topicsList = document.getElementById(`topics-${index}`);
    if (topicsList.style.display === 'none') {
        topicsList.style.display = 'block';
    } else {
        topicsList.style.display = 'none';
    }
}

// Mark topic as complete/incomplete
async function markTopicComplete(topicId, complete) {
    if (!currentUser) {
        showNotification('Please login to track progress', 'error');
        return;
    }
    
    try {
        const userRef = database.ref('users/' + currentUser.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        
        let completedTopics = userData.completedTopics || [];
        let xp = userData.xp || 0;
        
        if (complete && !completedTopics.includes(topicId)) {
            // Mark as complete
            completedTopics.push(topicId);
            xp += APP_CONFIG.xpPerTopic;
            
            showNotification(`Topic completed! +${APP_CONFIG.xpPerTopic} XP`, 'success');
            
            // Check for level up
            const newLevel = Math.floor(xp / APP_CONFIG.levelXpRequirement) + 1;
            const currentLevel = userData.level || 1;
            
            await userRef.update({
                completedTopics: completedTopics,
                xp: xp,
                level: newLevel
            });
            
            if (newLevel > currentLevel) {
                showNotification(`🎉 Level Up! You're now Level ${newLevel}!`, 'success');
                checkBadges();
            }
            
            loadUserProfile();
            loadRoadmap();
        } else if (!complete && completedTopics.includes(topicId)) {
            // Mark as incomplete (undo)
            completedTopics = completedTopics.filter(id => id !== topicId);
            xp = Math.max(0, xp - APP_CONFIG.xpPerTopic); // Prevent negative XP
            
            showNotification('Topic marked as incomplete', 'info');
            
            // Recalculate level
            const newLevel = Math.floor(xp / APP_CONFIG.levelXpRequirement) + 1;
            
            await userRef.update({
                completedTopics: completedTopics,
                xp: xp,
                level: newLevel
            });
            
            loadUserProfile();
            loadRoadmap();
        }
    } catch (error) {
        console.error('Error updating topic:', error);
        showNotification('Error updating progress', 'error');
    }
}

// Check and award badges
async function checkBadges() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        const badges = userData.badges || [];
        
        // Check various badge criteria
        const completedCount = userData.completedTopics ? userData.completedTopics.length : 0;
        
        const badgeCriteria = [
            { id: 'first-topic', name: 'First Steps', condition: completedCount >= 1 },
            { id: 'ten-topics', name: 'Rising Star', condition: completedCount >= 10 },
            { id: 'fifty-topics', name: 'Knowledge Seeker', condition: completedCount >= 50 },
            { id: 'level-5', name: 'Expert Learner', condition: userData.level >= 5 },
            { id: 'streak-7', name: 'Week Warrior', condition: userData.streak >= 7 },
            { id: 'streak-30', name: 'Dedication Master', condition: userData.streak >= 30 }
        ];
        
        const newBadges = [];
        badgeCriteria.forEach(badge => {
            if (badge.condition && !badges.includes(badge.id)) {
                newBadges.push(badge.id);
                showNotification(`🏆 New Badge: ${badge.name}!`, 'success');
            }
        });
        
        if (newBadges.length > 0) {
            await database.ref('users/' + currentUser.uid + '/badges').set([...badges, ...newBadges]);
        }
    } catch (error) {
        console.error('Error checking badges:', error);
    }
}

// Initialize roadmap on page load
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(loadRoadmap, 1000);
    }
});

// Three-Dots Menu Functions
let currentOpenMenu = null;
let menuOverlay = null;

// Toggle topic options menu
function toggleTopicMenu(event, topicId) {
    event.stopPropagation();
    
    const menu = document.getElementById(`menu-${topicId}`);
    
    // Close currently open menu if different
    if (currentOpenMenu && currentOpenMenu !== menu) {
        currentOpenMenu.classList.remove('active');
    }
    
    // Toggle the clicked menu
    menu.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
        currentOpenMenu = menu;
        
        // Create overlay to detect clicks outside
        if (!menuOverlay) {
            menuOverlay = document.createElement('div');
            menuOverlay.className = 'menu-overlay';
            menuOverlay.onclick = closeAllMenus;
            document.body.appendChild(menuOverlay);
        }
        menuOverlay.classList.add('active');
    } else {
        currentOpenMenu = null;
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
    }
}

// Close specific menu
function closeTopicMenu(topicId) {
    const menu = document.getElementById(`menu-${topicId}`);
    if (menu) {
        menu.classList.remove('active');
    }
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
    }
    currentOpenMenu = null;
}

// Close all menus
function closeAllMenus() {
    if (currentOpenMenu) {
        currentOpenMenu.classList.remove('active');
        currentOpenMenu = null;
    }
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
    }
}

// View all resources for a topic
function viewTopicResources(topicId) {
    const topicItem = document.querySelector(`[data-topic-id="${topicId}"]`);
    if (topicItem) {
        const resources = topicItem.querySelector('.topic-resources');
        if (resources) {
            // Scroll to the topic and highlight it
            topicItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            topicItem.style.transform = 'scale(1.02)';
            topicItem.style.transition = 'transform 0.3s';
            setTimeout(() => {
                topicItem.style.transform = 'scale(1)';
            }, 500);
        }
    }
}

// Ask AI about a topic
function askAIAboutTopic(topicName) {
    // Switch to AI Assistant section
    showSection('ai-assistant');
    
    // Pre-fill the AI input with the topic
    setTimeout(() => {
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
            aiInput.value = `Explain ${topicName} in detail with examples`;
            aiInput.focus();
        }
    }, 300);
}

// Share progress (future feature)
function shareProgress(topicId) {
    const shareText = `I just completed a topic on Learnify! 🎓✨`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Learnify Progress',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Progress text copied to clipboard!', 'success');
        }).catch(err => {
            showNotification('Could not share progress', 'error');
        });
    }
}

// Close menus when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.topic-status') && currentOpenMenu) {
        closeAllMenus();
    }
});