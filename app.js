const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const menuBtn = document.getElementById("menuBtn");
if (!app || !nav || !menuBtn) throw new Error("Missing app shell elements.");

menuBtn.addEventListener("click", () => nav.classList.toggle("show"));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("show")));

const disclaimer = "Potato University courses and qualifications are non-accredited and provided for entertainment purposes only.";
const siteStats = { students: 4821, courses: 75, pointsAwarded: 138400 };

const certificates = [
  "Certificate I in Potato Fundamentals","Certificate II in Soil Science for Potato Cultivation","Certificate III in Potato Variety Identification","Certificate IV in Agricultural Pest Management","Certificate I in Farm Safety and Equipment Handling","Certificate II in Potato Irrigation Systems","Certificate III in Agricultural Data Collection","Certificate IV in Sustainable Potato Farming","Certificate I in Potato Nutrition and Fertilisation","Certificate II in Crop Rotation Principles","Certificate III in Potato Storage and Post-Harvest Handling","Certificate IV in Agricultural Business Basics","Certificate I in Rural Environmental Science","Certificate II in Potato Cooking and Culinary Applications","Certificate III in Greenhouse Potato Production","Certificate IV in Agricultural Supply Chain","Certificate I in Potato History and Cultural Studies","Certificate II in Hydroponics and Potato Innovation","Certificate III in Potato Disease Identification","Certificate IV in Regional Agricultural Economics","Certificate I in Organic Potato Farming Methods","Certificate II in Potato Genetics and Breeding Basics","Certificate III in Farm Management and Administration","Certificate IV in Agricultural Community Engagement","Certificate I in Potato Export and Trade Essentials"
];
const diplomas = [
  "Diploma of Potato Science","Diploma of Agricultural Technology","Diploma of Sustainable Crop Management","Diploma of Potato Breeding and Genetics","Diploma of Rural Business Management","Diploma of Advanced Soil Science","Diploma of Agricultural Machinery and Automation","Diploma of Potato Processing and Value-Adding","Diploma of Farm Environmental Management","Diploma of Precision Agriculture","Diploma of Potato Marketing and Branding","Diploma of Agricultural Policy and Law","Diploma of Crop Protection and Biosecurity","Diploma of Potato Culinary Arts","Diploma of Rural Community Development","Diploma of Agricultural Research Methods","Diploma of Potato Export and International Trade","Diploma of Agricultural Education and Training","Diploma of Horticultural Science","Diploma of Farm Safety and Risk Management","Diploma of Potato History and Heritage Studies","Diploma of Agricultural Finance and Economics","Diploma of Organic Farming Systems","Diploma of Agricultural Data Science","Diploma of Potato Nutrition and Food Science","Diploma of Advanced Irrigation Engineering","Diploma of Agricultural Leadership","Diploma of Greenhouse and Controlled Environment Agriculture","Diploma of Potato Supply Chain and Logistics","Diploma of Agricultural Innovation and Entrepreneurship"
];
const bachelors = [
  "Bachelor of Potato Science (Honours available)","Bachelor of Agricultural Science","Bachelor of Sustainable Agriculture","Bachelor of Food and Potato Technology","Bachelor of Rural and Regional Management","Bachelor of Agricultural Economics","Bachelor of Environmental Agriculture","Bachelor of Potato Innovation and Entrepreneurship","Bachelor of Agricultural Education","Bachelor of Applied Horticultural Science","Bachelor of Agricultural Data Science","Bachelor of Potato Heritage and Cultural Studies"
];
const masters = [
  "Master of Potato Science","Master of Agricultural Technology and Innovation","Master of Sustainable Food Systems","Master of Agricultural Policy and Governance","Master of Potato Genetics and Biotechnology","Master of Rural Development and Community Agriculture"
];
const doctorates = [
  "Doctor of Philosophy (PhD) - Potato Genomics and Advanced Breeding","Doctor of Philosophy (PhD) - Sustainable Agricultural Systems and Rural Ecology"
];

function slugify(v) { return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function mkCourse(title, level, idx) {
  const pointsBase = { Certificate: 40, Diploma: 55, Bachelor: 70, Master: 82, Doctorate: 90 }[level];
  const duration = { Certificate: "6-12 months", Diploma: "1-2 years", Bachelor: "3 years", Master: "2 years", Doctorate: "3-5 years" }[level];
  const difficulty = { Certificate: "Beginner", Diploma: "Intermediate", Bachelor: "Advanced", Master: "Advanced", Doctorate: "Expert" }[level];
  const weekly = { Certificate: "8-10", Diploma: "10-14", Bachelor: "12-16", Master: "12-18", Doctorate: "20-30" }[level];
  const mode = idx % 3 === 0 ? "Mixed" : idx % 2 === 0 ? "Online" : "On-Campus";
  return { id: slugify(title), title, level, code: `${level.slice(0, 3).toUpperCase()}-${String(idx).padStart(3, "0")}`, pointsReq: Number(Math.min(99.95, pointsBase + (idx % 9) * 1.25).toFixed(2)), duration, difficulty, weekly, mode, ppAwarded: 12 + (idx % 10) * 3 };
}
const allCourses = [
  ...certificates.map((t, i) => mkCourse(t, "Certificate", i + 1)),
  ...diplomas.map((t, i) => mkCourse(t, "Diploma", i + 1)),
  ...bachelors.map((t, i) => mkCourse(t, "Bachelor", i + 1)),
  ...masters.map((t, i) => mkCourse(t, "Master", i + 1)),
  ...doctorates.map((t, i) => mkCourse(t, "Doctorate", i + 1))
];

function courseDetails(c) {
  return `<details class="card" id="course-${c.id}">
    <summary><strong>${c.title}</strong> (${c.code})</summary>
    <p><strong>Level:</strong> ${c.level} | <strong>Entry PP:</strong> ${c.pointsReq}</p>
    <p><strong>Description:</strong> This program provides formal learning in potato and agricultural systems with applied case studies and practical tasks.</p>
    <p><strong>Difficulty:</strong> ${c.difficulty} | <strong>Duration:</strong> ${c.duration} | <strong>Weekly commitment:</strong> ${c.weekly} hours</p>
    <p><strong>Delivery mode:</strong> ${c.mode}</p>
    <p><strong>Class times:</strong> Tue 6:00pm-8:00pm, Thu 6:00pm-8:00pm, Sat practical 10:00am-12:00pm</p>
    <p><strong>Prerequisites:</strong> Level-appropriate prior study and PPE/PP requirements where applicable.</p>
    <p><strong>Subjects/Units:</strong> Foundations, Soil and Water Systems, Crop Health, Data and Decisions, Applied Capstone.</p>
    <p><strong>Assessment:</strong> Quizzes, practical reports, project presentations, capstone portfolio.</p>
    <p><strong>Pathway options:</strong> Progress to the next qualification level or specialised stream.</p>
    <p><strong>Potato Points awarded on completion:</strong> ${c.ppAwarded}</p>
    <p class="small"><strong>Non-accreditation notice:</strong> ${disclaimer}</p>
  </details>`;
}

function renderSite() {
  app.innerHTML = `
    <section id="home" class="hero card">
      <h2>Potato University</h2>
      <p>Comprehensive single-site prospectus, admissions, and student information portal.</p>
      <p class="small"><strong>Location:</strong> Potato Point, NSW | <strong>Established:</strong> 2026 | <strong>Motto:</strong> From Soil to Story</p>
    </section>
    <div class="ticker"><span>Open Day 12 June | PPE Session Two registrations close Friday | New publications and booklists now available</span></div>
    <section class="grid grid-3" style="margin-top:1rem;">
      <article class="card"><h3>Students Enrolled</h3><p><strong>${siteStats.students.toLocaleString()}</strong></p></article>
      <article class="card"><h3>Total Courses</h3><p><strong>${siteStats.courses}</strong></p></article>
      <article class="card"><h3>Potato Points Awarded</h3><p><strong>${siteStats.pointsAwarded.toLocaleString()}</strong></p></article>
    </section>
    <section id="about" class="card">
      <h2>About Potato University</h2>
      <p>Potato University is a novelty institution designed as a complete educational experience in potato and agricultural studies. It provides structured pathways from certificates to doctoral research-themed programs, student services, publications, and assessment preparation resources.</p>
      <p>The university combines teaching, applied learning, and public engagement through flexible delivery modes. Students can begin at foundation level and progress through diplomas, degrees, honours, and doctoral pathways.</p>
      <ul>
        <li><strong>Academic Schools:</strong> Crop Systems, Agricultural Technology, Rural Leadership, and Graduate Research.</li>
        <li><strong>Teaching Calendar:</strong> Two primary semesters with intensive summer/winter offerings.</li>
        <li><strong>Support Model:</strong> Academic advising, wellbeing referrals, peer mentoring, and career consultations.</li>
      </ul>
    </section>
    <section id="admissions" class="card">
      <h2>Admissions</h2>
      <p>Admissions are based on course prerequisites and minimum Potato Points (PP) thresholds where applicable. Applicants should review pathway requirements and PPE readiness before submitting an enquiry.</p>
      <h3>Application Steps</h3>
      <ol>
        <li>Review course entry requirements and pathway options.</li>
        <li>Complete the Potato Points Exam (PPE) if required.</li>
        <li>Prepare supporting details for your chosen program.</li>
        <li>Submit an online enquiry via the Contact section.</li>
      </ol>
      <h3>Key Admissions Dates</h3>
      <ul>
        <li>Semester 1 applications close: 31 January</li>
        <li>Semester 2 applications close: 30 June</li>
        <li>PPE Session 1: late March, results in April</li>
        <li>PPE Session 2: mid September, results in early October</li>
      </ul>
    </section>
    <section id="research" class="card">
      <h2>Research and Innovation</h2>
      <p>Potato University supports research-themed learning in sustainable crop systems, regional policy, agri-data applications, and genetics-informed decision making.</p>
      <h3>Research Themes</h3>
      <ul>
        <li>Sustainable Potato Farming and Soil Health</li>
        <li>Precision Agriculture and Data-Informed Operations</li>
        <li>Regional Supply Chains and Agricultural Economics</li>
        <li>Potato Genetics, Breeding, and Innovation Pathways</li>
      </ul>
      <h3>Outputs</h3>
      <p>Students and staff contribute to themed reports, community briefs, and annual publications through Potato University Press.</p>
    </section>
    <section id="student-life" class="card">
      <h2>Student Life and Services</h2>
      <p>Student life includes academic support, campus events, community programs, and study resources across online and on-campus modes.</p>
      <div class="grid grid-2">
        <article class="card">
          <h3>Support Services</h3>
          <ul>
            <li>Study skills workshops and academic writing support</li>
            <li>Course planning and progression advising</li>
            <li>Peer mentoring and transition support</li>
            <li>Career planning and pathway consultations</li>
          </ul>
        </article>
        <article class="card">
          <h3>Campus and Community</h3>
          <ul>
            <li>Open day tours and faculty Q&A sessions</li>
            <li>Potato Festival and student showcase week</li>
            <li>Regional outreach and school engagement events</li>
            <li>Research communication seminars</li>
          </ul>
        </article>
      </div>
    </section>
    <section id="team" class="card">
      <h2>Leadership, Faculty, and Advisory Board</h2>
      <ul><li>Dr. Tilly Spudworth - Vice-Chancellor</li><li>Prof. Jack Yamson - Dean of Crop Studies</li><li>Dr. Priya Rill - Head of Soil and Water</li><li>Mia Peel - Director of Learner Success</li></ul>
    </section>
    <section id="courses" class="card">
      <h2>Courses Overview</h2>
      <p>Single-page catalogue including all 75 course offerings.</p>
      <div class="grid grid-2">
        <label>Search courses <input id="courseSearch"></label>
        <label>Level <select id="levelFilter"><option>All</option><option>Certificate</option><option>Diploma</option><option>Bachelor</option><option>Master</option><option>Doctorate</option></select></label>
      </div>
      <button id="clearFilters" class="secondary" type="button">Clear Filters</button>
      <p class="small">Totals: ${certificates.length} certificates, ${diplomas.length} diplomas, ${bachelors.length} bachelors, ${masters.length} masters, ${doctorates.length} doctorates.</p>
      <div id="courseCatalog"></div>
    </section>
    <section id="potato-points" class="card"><h2>Potato Points (PP)</h2><p>PP is scored out of 99.95 for course entry ranking.</p></section>
    <section id="ppe" class="card"><h2>Potato Points Exam (PPE)</h2><p>Standardised assessment for entry ranking.</p><p><a href="#ppe-practice">Jump to practice questions</a> | <a href="./assets/revision-booklet.pdf" download>Download revision booklet</a></p></section>
    <section id="ppe-practice" class="card"><h2>PPE Practice Questions</h2><div id="quiz"></div><button class="primary" id="finishQuiz">Finish and Show Score</button><p id="quizScore" class="small"></p></section>
    <section id="honours" class="card"><h2>Honours Program</h2><p>Advanced year with supervised thesis and research methods.</p></section>
    <section id="dual-degrees" class="card"><h2>Dual Degrees</h2><ol><li>Bachelor of Potato Science / Bachelor of Agricultural Economics</li><li>Bachelor of Agricultural Science / Bachelor of Rural and Regional Management</li><li>Diploma of Potato Science + Bachelor of Food and Potato Technology (Accelerated)</li><li>Master of Potato Science / Master of Agricultural Policy and Governance</li></ol></section>
    <section id="news" class="card"><h2>News and Events</h2><ul><li>Mid-Year Open Day - 12 June</li><li>Potato Festival Week</li><li>Publication release: PU Press Volume 2</li></ul></section>
    <section id="campus-map" class="card map"><h2>Campus Map</h2><svg viewBox="0 0 800 430"><rect x="20" y="20" width="760" height="390" fill="#ecfccb" /><rect x="65" y="65" width="170" height="90" fill="#bbf7d0" data-label="Lecture Halls" /><rect x="280" y="65" width="170" height="90" fill="#fde68a" data-label="Labs" /><rect x="500" y="65" width="230" height="90" fill="#bfdbfe" data-label="Library" /><rect x="65" y="190" width="250" height="90" fill="#fecaca" data-label="Administration" /><rect x="340" y="190" width="180" height="90" fill="#ddd6fe" data-label="Cafeteria" /><rect x="545" y="190" width="185" height="185" fill="#86efac" data-label="Potato Fields" /></svg><p id="mapHint" class="small">Click a building for details.</p></section>
    <section id="portal" class="card"><h2>Learner's Portal</h2><p class="small">Demo credentials: PU1026 / demo123</p><form id="portalLogin" class="grid grid-2"><label>Student ID<input id="sid" required></label><label>Password<input id="spw" type="password" required></label><button class="primary" type="submit">Login</button></form><p id="portalMsg" class="small"></p><div id="portalDashboard" class="card" style="display:none;"><h3>Timetable</h3><ul><li>Mon 10:00 Soil Science (A2)</li><li>Wed 13:00 Applied Labs (C1)</li><li>Thu 18:30 Online seminar</li></ul></div></section>
    <section id="booklists" class="card"><h2>Booklists</h2><p>Required texts by level.</p><p><a href="./assets/revision-booklet.pdf" download>Download PPE Revision Booklet (PDF)</a></p></section>
    <section id="publications" class="card"><h2>Publications</h2><p>Potato University Press journals, reports, and newsletters.</p></section>
    <section id="international" class="card">
      <h2>International and Remote Learners</h2>
      <p>Remote-friendly delivery options support learners outside Potato Point through online classes, recorded sessions, and virtual advising.</p>
      <ul>
        <li>Mixed and fully online options available in selected programs</li>
        <li>Flexible scheduling for evening/weekend study</li>
        <li>Digital library access and downloadable study materials</li>
      </ul>
    </section>
    <section id="scholarships" class="card">
      <h2>Scholarships and Financial Support</h2>
      <p>Scholarship funds are available for pathway access, PPE preparation support, and community leadership initiatives.</p>
      <ul>
        <li>Foundation Pathway Scholarship</li>
        <li>Regional Community Engagement Scholarship</li>
        <li>Research Potential Award (postgraduate pathway)</li>
      </ul>
    </section>
    <section id="donations" class="card"><h2>Donations and Giving</h2><form id="donationForm" class="grid grid-2"><label>Name<input required></label><label>Email<input type="email" required></label><label>Donation Category<select><option>Scholarship Fund</option><option>Endowment</option><option>General Support</option></select></label><label>Amount (AUD)<input type="number" min="1" required></label><button class="primary" type="submit">Submit Donation</button></form><p id="donationMsg" class="small"></p></section>
    <section id="contact" class="card"><h2>Contact</h2><p><strong>Address:</strong> Potato Point, NSW</p><p><strong>Phone:</strong> (02) 7000 2026 | <strong>Email:</strong> hello@potatouniversity.example</p><form id="contactForm" class="grid grid-2"><label>Name<input></label><label>Email<input type="email"></label><label style="grid-column:1 / -1;">Enquiry<textarea rows="4"></textarea></label><button class="primary" type="submit">Send Enquiry</button></form><p id="contactMsg" class="small"></p></section>
    <section id="faq" class="card"><h2>FAQ</h2><h3>Are courses accredited?</h3><p>No. They are non-accredited and for entertainment purposes only.</p><h3>How do I apply?</h3><p>Review course requirements, complete PPE, and contact Admissions.</p></section>
    <section id="legal" class="card"><h2>Legal</h2><h3>Non-accreditation notice</h3><p>${disclaimer}</p><h3>Terms and Privacy</h3><p>This website is for informational and entertainment use. Do not submit sensitive personal data through demo forms.</p><h3>Copyright</h3><p>Copyright Potato University 2026-2027.</p></section>
    <section class="card"><strong>Global disclaimer:</strong> ${disclaimer}</section>
  `;
}

const ppeQuestions = [
  ["Which potato variety is commonly used for fries?", ["Kennebec", "Russet", "Kipfler", "Dutch Cream"], 1],["What soil pH is generally suitable for potatoes?", ["3.5-4.0", "5.0-6.5", "7.8-8.5", "9.0+"], 1],["Main reason for crop rotation?", ["Increase weeds", "Reduce disease pressure", "Lower yields", "Harden soil"], 1],["Potatoes are primarily propagated using?", ["Seeds only", "Stem cuttings", "Tubers", "Leaves"], 2],["Which nutrient supports tuber development?", ["Potassium", "Sodium", "Chlorine", "Iodine"], 0],["Late blight is caused by?", ["Virus", "Fungus-like pathogen", "Nematode", "Mite"], 1],["Best irrigation approach in water-limited farms?", ["Flood", "Scheduled drip", "No irrigation", "Overhead daily"], 1],["PPE score contributes to?", ["Parking", "Potato Points ranking", "Cafeteria menu", "Library color"], 1],["Genotype x environment interaction means?", ["No crop change", "Genes and conditions both matter", "Only weather", "Only genes"], 1],["Potato originated from?", ["South America", "Europe", "Australia", "Africa"], 0],["Post-harvest focus includes?", ["Leaf area index", "Storage temp and humidity", "Flower color", "Truck size"], 1],["Sustainable practice example?", ["Monoculture", "Integrated pest management", "Excess tillage", "Nutrient dumping"], 1],["Potatoes are?", ["Root tubers", "Fruits", "Legumes", "Cereals"], 0],["PPE format includes?", ["Essay only", "MCQ + short response", "Oral only", "Practical only"], 1],["Potato Points max?", ["90.00", "95.00", "99.95", "100.00"], 2],["Disease clue might include?", ["Leaf lesions", "Truck size", "Market price", "Pot shape"], 0],["Nutrient management starts with?", ["Random fertilizing", "Soil testing", "Ignoring data", "Weekly flooding"], 1],["Export readiness needs?", ["No standards", "Quality grading/compliance", "Broken packaging", "Unsorted produce"], 1],["Valid revision strategy?", ["Night before only", "Spaced practice", "Skip weak topics", "Avoid feedback"], 1],["Precision agriculture uses?", ["Guesswork", "Sensor + data decisions", "No records", "Manual only"], 1]
];

function bindInteractions() {
  const catalog = document.getElementById("courseCatalog");
  function drawCourses() {
    const q = document.getElementById("courseSearch").value.toLowerCase().trim();
    const level = document.getElementById("levelFilter").value;
    const filtered = allCourses.filter((c) => (c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) && (level === "All" || c.level === level));
    catalog.innerHTML = filtered.map(courseDetails).join("") || `<article class="card"><h3>No matching courses</h3></article>`;
  }
  document.getElementById("courseSearch").addEventListener("input", drawCourses);
  document.getElementById("levelFilter").addEventListener("input", drawCourses);
  document.getElementById("clearFilters").addEventListener("click", () => { document.getElementById("courseSearch").value = ""; document.getElementById("levelFilter").value = "All"; drawCourses(); });
  drawCourses();

  const quiz = document.getElementById("quiz");
  quiz.innerHTML = ppeQuestions.map((q, i) => `<article class="card"><p><strong>Q${i + 1}.</strong> ${q[0]}</p>${q[1].map((o, oi) => `<label><input type="radio" name="q${i}" value="${oi}"> ${o}</label><br>`).join("")}<p id="feedback-${i}" class="small"></p></article>`).join("");
  ppeQuestions.forEach((q, i) => {
    document.querySelectorAll(`input[name="q${i}"]`).forEach((input) => input.addEventListener("change", (e) => {
      const ok = Number(e.target.value) === q[2];
      const fb = document.getElementById(`feedback-${i}`);
      fb.textContent = ok ? "Correct." : `Incorrect. Correct answer: ${q[1][q[2]]}`;
      fb.className = ok ? "small good" : "small bad";
    }));
  });
  document.getElementById("finishQuiz").addEventListener("click", () => {
    let score = 0;
    ppeQuestions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && Number(selected.value) === q[2]) score += 1;
    });
    document.getElementById("quizScore").textContent = `Final score: ${score} / ${ppeQuestions.length}`;
  });

  document.querySelectorAll("svg [data-label]").forEach((node) => {
    node.style.cursor = "pointer";
    node.addEventListener("click", () => { document.getElementById("mapHint").textContent = `Selected: ${node.dataset.label}`; });
  });

  document.getElementById("portalLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    const sid = document.getElementById("sid").value.trim().toUpperCase();
    const pw = document.getElementById("spw").value.trim();
    const msg = document.getElementById("portalMsg");
    if (sid === "PU1026" && pw === "demo123") {
      document.getElementById("portalDashboard").style.display = "block";
      msg.textContent = "Login successful.";
      msg.className = "small good";
    } else {
      document.getElementById("portalDashboard").style.display = "none";
      msg.textContent = "Login failed. Use PU1026 / demo123.";
      msg.className = "small bad";
    }
  });

  document.getElementById("donationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = Number(e.target.querySelector('input[type="number"]').value || 0);
    const msg = document.getElementById("donationMsg");
    if (amount <= 0) { msg.textContent = "Please enter a valid amount."; msg.className = "small bad"; return; }
    msg.textContent = `Thank you for your pledge of AUD ${amount.toFixed(2)}.`;
    msg.className = "small good";
  });

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const [name, email, enquiry] = e.target.querySelectorAll("input, textarea");
    const msg = document.getElementById("contactMsg");
    if (!name.value.trim() || !email.value.trim() || !enquiry.value.trim()) { msg.textContent = "Please complete all fields."; msg.className = "small bad"; return; }
    msg.textContent = "Enquiry submitted. Admissions will respond within two business days.";
    msg.className = "small good";
    e.target.reset();
  });
}

renderSite();
bindInteractions();
