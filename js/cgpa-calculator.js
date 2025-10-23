// CGPA Calculator Module
// Calculate SGPA, CGPA, and equivalent percentage

// Generate semester input fields based on selection
function generateSemesterInputs() {
    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    const container = document.getElementById('semesterInputsContainer');
    
    if (!numSemesters) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="semesters-grid">';
    
    for (let i = 1; i <= numSemesters; i++) {
        html += `
            <div class="semester-input-card">
                <h4>Semester ${i}</h4>
                <div class="form-group">
                    <label>Number of Subjects:</label>
                    <input type="number" id="sem${i}_subjects" min="1" max="10" value="5" 
                           onchange="generateSubjectInputs(${i})">
                </div>
                <div id="sem${i}_subjectsContainer" class="subjects-container">
                    <!-- Subject inputs will appear here -->
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    // Initialize subject inputs for each semester
    for (let i = 1; i <= numSemesters; i++) {
        generateSubjectInputs(i);
    }
}

// Generate subject input fields for a semester
function generateSubjectInputs(semesterNum) {
    const numSubjects = parseInt(document.getElementById(`sem${semesterNum}_subjects`).value);
    const container = document.getElementById(`sem${semesterNum}_subjectsContainer`);
    
    if (!numSubjects) {
        container.innerHTML = '';
        return;
    }
    
    let html = '';
    
    for (let i = 1; i <= numSubjects; i++) {
        html += `
            <div class="subject-input-row">
                <input type="text" placeholder="Subject ${i}" id="sem${semesterNum}_sub${i}_name" class="subject-name-input">
                <input type="number" placeholder="Credits" id="sem${semesterNum}_sub${i}_credits" 
                       min="1" max="10" value="4" class="credits-input">
                <select id="sem${semesterNum}_sub${i}_grade" class="grade-select">
                    <option value="">Grade</option>
                    <option value="10">O (Outstanding) - 10</option>
                    <option value="9">A+ (Excellent) - 9</option>
                    <option value="8">A (Very Good) - 8</option>
                    <option value="7">B+ (Good) - 7</option>
                    <option value="6">B (Above Average) - 6</option>
                    <option value="5">C (Average) - 5</option>
                    <option value="4">P (Pass) - 4</option>
                    <option value="0">F (Fail) - 0</option>
                </select>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Calculate CGPA
function calculateCGPA() {
    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    
    if (!numSemesters) {
        showNotification('Please select number of semesters', 'error');
        return;
    }
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    const semesterResults = [];
    
    // Calculate for each semester
    for (let sem = 1; sem <= numSemesters; sem++) {
        const numSubjects = parseInt(document.getElementById(`sem${sem}_subjects`).value);
        
        if (!numSubjects) continue;
        
        let semCredits = 0;
        let semGradePoints = 0;
        
        for (let sub = 1; sub <= numSubjects; sub++) {
            const credits = parseFloat(document.getElementById(`sem${sem}_sub${sub}_credits`).value);
            const grade = parseFloat(document.getElementById(`sem${sem}_sub${sub}_grade`).value);
            
            if (isNaN(credits) || isNaN(grade)) {
                showNotification(`Please fill all fields for Semester ${sem}`, 'error');
                return;
            }
            
            semCredits += credits;
            semGradePoints += (credits * grade);
        }
        
        const sgpa = semCredits > 0 ? (semGradePoints / semCredits).toFixed(2) : 0;
        
        semesterResults.push({
            semester: sem,
            sgpa: sgpa,
            credits: semCredits
        });
        
        totalCredits += semCredits;
        totalGradePoints += semGradePoints;
    }
    
    // Calculate overall CGPA
    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    
    // Calculate equivalent percentage (CGPA * 9.5 is a common conversion)
    const percentage = (cgpa * 9.5).toFixed(2);
    
    // Display results
    displayCGPAResults(cgpa, percentage, semesterResults);
}

// Display CGPA calculation results
function displayCGPAResults(cgpa, percentage, semesterResults) {
    const resultsDiv = document.getElementById('cgpaResults');
    const overallCGPAEl = document.getElementById('overallCGPA');
    const percentageEl = document.getElementById('equivalentPercentage');
    const semesterWiseEl = document.getElementById('semesterWiseSGPA');
    
    // Show results
    resultsDiv.style.display = 'block';
    overallCGPAEl.textContent = cgpa;
    percentageEl.textContent = percentage + '%';
    
    // Display semester-wise SGPA
    let semesterHTML = '<h4>Semester-wise SGPA:</h4><div class=\"sgpa-grid\">';
    
    semesterResults.forEach(result => {
        semesterHTML += `
            <div class=\"sgpa-card\">
                <div class=\"sgpa-semester\">Semester ${result.semester}</div>
                <div class=\"sgpa-value\">${result.sgpa}</div>
                <div class=\"sgpa-credits\">${result.credits} Credits</div>
            </div>
        `;
    });
    
    semesterHTML += '</div>';
    semesterWiseEl.innerHTML = semesterHTML;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    showNotification('CGPA calculated successfully!', 'success');
}

// Reset CGPA calculator
function resetCGPACalculator() {
    document.getElementById('numSemesters').value = '';
    document.getElementById('semesterInputsContainer').innerHTML = '';
    document.getElementById('cgpaResults').style.display = 'none';
    showNotification('Calculator reset', 'info');
}

// Download CGPA result as text
function downloadCGPAResult() {
    const cgpa = document.getElementById('overallCGPA').textContent;
    const percentage = document.getElementById('equivalentPercentage').textContent;
    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    
    let resultText = '=== LEARNIFY CGPA CALCULATOR RESULT ===\\n\\n';
    resultText += `Overall CGPA: ${cgpa}\\n`;
    resultText += `Equivalent Percentage: ${percentage}\\n\\n`;
    resultText += 'SEMESTER-WISE SGPA:\\n';
    resultText += '------------------------\\n';
    
    for (let sem = 1; sem <= numSemesters; sem++) {
        const numSubjects = parseInt(document.getElementById(`sem${sem}_subjects`).value);
        if (!numSubjects) continue;
        
        let semCredits = 0;
        let semGradePoints = 0;
        
        for (let sub = 1; sub <= numSubjects; sub++) {
            const credits = parseFloat(document.getElementById(`sem${sem}_sub${sub}_credits`).value);
            const grade = parseFloat(document.getElementById(`sem${sem}_sub${sub}_grade`).value);
            
            semCredits += credits;
            semGradePoints += (credits * grade);
        }
        
        const sgpa = (semGradePoints / semCredits).toFixed(2);
        resultText += `Semester ${sem}: SGPA = ${sgpa} (${semCredits} Credits)\\n`;
    }
    
    resultText += '\\n------------------------\\n';
    resultText += 'Generated by Learnify - https://learnifywithus.vercel.app/\\n';
    resultText += `Date: ${new Date().toLocaleDateString()}\\n`;
    
    // Create and download file
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CGPA_Result_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Result downloaded successfully!', 'success');
}
