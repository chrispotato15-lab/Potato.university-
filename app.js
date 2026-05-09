const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const menuBtn = document.getElementById("menuBtn");

if (!app || !nav || !menuBtn) throw new Error("App shell is missing required DOM nodes.");

menuBtn.addEventListener("click", () => nav.classList.toggle("show"));
window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", renderRoute);

const siteStats = { students: 4821, courses: 75, pointsAwarded: 138400 };
const disclaimerText = "Potato University courses and qualifications are non-accredited and provided for entertainment purposes only.";

const certificates = [
  "Certificate I in Potato Fundamentals", "Certificate II in Soil Science for Potato Cultivation",
  "Certificate III in Potato Variety Identification", "Certificate IV in Agricultural Pest Management",
  "Certificate I in Farm Safety and Equipment Handling", "Certificate II in Potato Irrigation Systems",
  "Certificate III in Agricultural Data Collection", "Certificate IV in Sustainable Potato Farming",
  "Certificate I in Potato Nutrition and Fertilisation", "Certificate II in Crop Rotation Principles",
  "Certificate III in Potato Storage and Post-Harvest Handling", "Certificate IV in Agricultural Business Basics",
  "Certificate I in Rural Environmental Science", "Certificate II in Potato Cooking and Culinary Applications",
  "Certificate III in Greenhouse Potato Production", "Certificate IV in Agricultural Supply Chain",
  "Certificate I in Potato History and Cultural Studies", "Certificate II in Hydroponics and Potato Innovation",
  "Certificate III in Potato Disease Identification", "Certificate IV in Regional Agricultural Economics",
  "Certificate I in Organic Potato Farming Methods", "Certificate II in Potato Genetics and Breeding Basics",
  "Certificate III in Farm Management and Administration", "Certificate IV in Agricultural Community Engagement",
  "Certificate I in Potato Export and Trade Essentials"
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
  "Doctor of Philosophy (PhD) - Potato Genomics and Advanced Breeding",
  "Doctor of Philosophy (PhD) - Sustainable Agricultural Systems and Rural Ecology"
];

function slugify(v) {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function courseDescription(title, level) {
  const intros = {
    Certificate: "This certificate provides foundational disciplinary knowledge and introductory professional skills for learners entering potato and agriculture studies.",
    Diploma: "This diploma develops technical competence through applied coursework, supervised practical activities, and industry-facing project work.",
    Bachelor: "This bachelor program integrates disciplinary theory, laboratory experience, and field-based learning within a structured undergraduate curriculum.",
    Master: "This master program supports advanced professional development through specialised coursework, research-informed learning, and strategic problem solving.",
    Doctorate: "This doctoral program is research-intensive and designed to produce original contributions to agricultural scholarship and practice."
  };
  return `${intros[level]} In ${title}, learners examine evidence-based decision making, communication, and ethical practice in contemporary farming contexts. The curriculum balances conceptual study with authentic case analysis so students can apply knowledge in realistic settings. On completion, students are prepared for progression into higher-level pathways within Potato University.`;
}
function mkCourse(title, level, index) {
  const pointsBase = { Certificate: 40, Diploma: 55, Bachelor: 70, Master: 82, Doctorate: 90 }[level];
  const duration = { Certificate: "6-12 months", Diploma: "1-2 years", Bachelor: "3 years", Master: "2 years", Doctorate: "3-5 years" }[level];
  const durationMonths = { Certificate: 9, Diploma: 18, Bachelor: 36, Master: 24, Doctorate: 48 }[level];
  const difficulty = { Certificate: "Beginner", Diploma: "Intermediate", Bachelor: "Advanced", Master: "Advanced", Doctorate: "Expert" }[level];
  const weekly = { Certificate: "8-10", Diploma: "10-14", Bachelor: "12-16", Master: "12-18", Doctorate: "20-30" }[level];
  const mode = index % 3 === 0 ? "Mixed" : index % 2 === 0 ? "Online" : "On-Campus";
  const pointsReq = Number(Math.min(99.95, pointsBase + (index % 9) * 1.25).toFixed(2));
  const prereq = {
    Certificate: "No formal prerequisites. PPE participation recommended.",
    Diploma: "Completion of a related Certificate IV or equivalent experience.",
    Bachelor: "Potato Points at or above listed minimum, plus completion of secondary studies.",
    Master: "Relevant bachelor degree (or equivalent professional portfolio).",
    Doctorate: "Relevant master's degree with strong research performance."
  }[level];
  return {
    id: slugify(title),
    title,
    level,
    code: `${level.slice(0, 3).toUpperCase()}-${String(index).padStart(3, "0")}`,
    pointsReq,
    duration,
    durationMonths,
    difficulty,
    weekly,
    mode,
    prereq,
    ppAwarded: 12 + (index % 10) * 3,
    description: courseDescription(title, level)
  };
}

const allCourses = [
  ...certificates.map((t, i) => mkCourse(t, "Certificate", i + 1)),
  ...diplomas.map((t, i) => mkCourse(t, "Diploma", i + 1)),
  ...bachelors.map((t, i) => mkCourse(t, "Bachelor", i + 1)),
  ...masters.map((t, i) => mkCourse(t, "Master", i + 1)),
  ...doctorates.map((t, i) => mkCourse(t, "Doctorate", i + 1))
];
const courseTotals = {
  Certificate: certificates.length,
  Diploma: diplomas.length,
  Bachelor: bachelors.length,
  Master: masters.length,
  Doctorate: doctorates.length
};

function renderRoute() {
  const route = (location.hash.replace(/^#/, "").split("?")[0] || "/").trim();
  nav.classList.remove("show");
  if (route === "/" || route === "") return renderHome();
  if (route === "/about") return renderAbout();
  if (route === "/team") return renderTeam();
  if (route === "/courses") return renderCourses();
  if (route.startsWith("/course/")) return renderCourse(route.split("/course/")[1]);
  if (route === "/legal") return renderLegal();
  if (route === "/donations") return renderDonations();
  if (route === "/news") return renderNews();
  if (route === "/contact") return renderContact();
  if (route === "/faq") return renderFaq();
  if (route === "/campus-map") return renderMap();
  if (route === "/portal") return renderPortal();
  if (route === "/booklists") return renderBooklists();
  if (route === "/publications") return renderPublications();
  if (route === "/potato-points") return renderPotatoPoints();
  if (route === "/ppe") return renderPpe();
  if (route === "/ppe-practice") return renderPpePractice();
  if (route === "/ppe-revision") return renderRevisionPage();
  if (route === "/honours") return renderHonours();
  if (route === "/dual-degrees") return renderDualDegrees();
  app.innerHTML = `<div class="card"><h2>Page Not Found</h2><a href="#/">Return home</a></div>`;
}
function disclaimerCard() {
  return `<div class="card"><strong>Non-accreditation notice:</strong> ${disclaimerText}</div>`;
}
function quickLinks() {
  return `
  <div class="card">
    <h3>Quick Links</h3>
    <a class="pill" href="#/courses">Courses</a>
    <a class="pill" href="#/potato-points">Potato Points</a>
    <a class="pill" href="#/ppe">PPE</a>
    <a class="pill" href="#/ppe-practice">Practice Questions</a>
    <a class="pill" href="#/ppe-revision">Revision Guide</a>
    <a class="pill" href="#/honours">Honours</a>
    <a class="pill" href="#/dual-degrees">Dual Degrees</a>
    <a class="pill" href="#/portal">Learner's Portal</a>
    <a class="pill" href="#/booklists">Booklists</a>
    <a class="pill" href="#/publications">Publications</a>
    <a class="pill" href="#/campus-map">Campus Map</a>
    <a class="pill" href="#/faq">FAQ</a>
  </div>`;
}

function renderHome() {
  app.innerHTML = `
  <section class="hero card">
    <h2>Potato University</h2>
    <p>Potato University is a modern, student-focused institution in Potato Point, NSW delivering coursework and research-themed programs across potato science, agriculture, and regional systems.</p>
    <p class="small"><strong>Motto:</strong> From Soil to Story | <strong>Established:</strong> 2026</p>
  </section>
  <div class="ticker"><span>Latest: Mid-year Open Day applications now open | Semester Two PPE registration closes Friday | Potato University Press Vol. 2 released | New rural innovation seminars announced</span></div>
  <section class="grid grid-3" style="margin-top:1rem;">
    <article class="card"><h3>Students Enrolled</h3><p><strong>${siteStats.students.toLocaleString()}</strong></p></article>
    <article class="card"><h3>Courses Offered</h3><p><strong>${siteStats.courses}</strong></p></article>
    <article class="card"><h3>Potato Points Awarded</h3><p><strong>${siteStats.pointsAwarded.toLocaleString()}</strong></p></article>
  </section>
  <section class="grid grid-3">
    <article class="card"><h3>Study</h3><p>Explore certificates, diplomas, undergraduate, postgraduate, and research pathways with clear progression options.</p><a href="#/courses">Browse courses</a></article>
    <article class="card"><h3>Research and Publications</h3><p>Read institutional publications, practical reports, and themed research outputs from Potato University Press.</p><a href="#/publications">View publications</a></article>
    <article class="card"><h3>Future Students</h3><p>Learn about PPE, Potato Points, key dates, and entry guidance to plan your application pathway.</p><a href="#/ppe">Admissions information</a></article>
  </section>
  ${quickLinks()}
  <section class="card">
    <h3>University Profile</h3>
    <p>Potato University was established by educators, growers, and regional stakeholders to deliver engaging education in agricultural systems and potato-focused studies. The university now provides structured programs from entry-level certificates to doctoral pathways, alongside learner support services, outreach initiatives, and an annual publication schedule. Campus activities include open days, guided field sessions, and student-led community engagement programs.</p>
  </section>
  <section class="grid grid-2">
    <article class="card">
      <h3>Key Dates</h3>
      <ul>
        <li>Semester One Orientation: 10 February</li>
        <li>PPE Session One: 28 March</li>
        <li>Mid-Year Open Day: 12 June</li>
        <li>PPE Session Two: 18 September</li>
      </ul>
    </article>
    <article class="card">
      <h3>Student Services</h3>
      <ul>
        <li>Academic skills and study support</li>
        <li>Course planning and progression advice</li>
        <li>Wellbeing and peer mentor referrals</li>
        <li>Career and pathway consultation</li>
      </ul>
    </article>
  </section>
  ${disclaimerCard()}`;
}
function renderAbout() {
  app.innerHTML = `
  <section class="card">
    <h2>About Potato University</h2>
    <p><strong>Location:</strong> Potato Point, NSW, Australia</p>
    <p><strong>Founded:</strong> 2026</p>
    <h3>Institutional History</h3>
    <p>Potato University began as a regional education initiative in Potato Point, NSW, led by local educators and growers seeking to improve agricultural literacy through accessible public programs. The initiative expanded from community workshops into a formal institutional model offering staged coursework, learner services, and publication outputs.</p>
    <h3>Mission</h3>
    <p>To deliver rigorous, accessible, and engaging learning experiences in potato systems, agriculture, and regional development.</p>
    <h3>Vision</h3>
    <p>To be Australia's leading potato-focused education destination for learners, professionals, and regional communities.</p>
    <h3>Values</h3>
    <ul><li>Academic integrity and evidence-informed teaching</li><li>Community partnership and inclusion</li><li>Sustainability and stewardship</li><li>Innovation in teaching and applied practice</li></ul>
    <h3>Motto</h3>
    <p><em>From Soil to Story</em></p>
    <h3>Strategic Priorities 2026-2028</h3>
    <ul><li>Strengthen pathway design from certificate to postgraduate levels</li><li>Expand blended delivery and digital learner support</li><li>Develop research communication through Potato University Press</li><li>Grow regional outreach and school engagement programs</li></ul>
    <h3>Academic Structure</h3>
    <p>The university operates across five teaching domains: Foundation Studies, Applied Crop Sciences, Agricultural Technology, Rural Leadership, and Research Training. Each domain contributes shared units to support interdisciplinary learning and progression.</p>
    <h3>Quality and Governance</h3>
    <p>Internal academic review panels evaluate curriculum relevance, learner feedback, and assessment design each semester to ensure consistency and quality across all course offerings.</p>
  </section>
  ${disclaimerCard()}`;
}
function renderTeam() {
  const staff = [
    ["Dr. Tilly Spudworth", "Vice-Chancellor", "Leads strategic direction, student engagement, and public partnerships."],
    ["Prof. Jack Yamson", "Dean of Crop Studies", "Specialises in resilient potato farming and applied field methods."],
    ["Dr. Priya Rill", "Head of Soil and Water", "Oversees soil science curriculum and irrigation research showcases."],
    ["Mia Peel", "Director of Learner Success", "Coordinates support services, timetables, and pathway planning."],
    ["Alex Turner", "Chief Learning Technologist", "Maintains online delivery systems and blended classroom tools."]
  ];
  const board = ["Lila Green (Regional Grower Representative)", "Sam Ortega (Agribusiness Advisor)", "Dr. Hana Wu (Education Policy Analyst)", "Eli Branch (Community Programs Lead)", "Nora James (Higher Education Governance Advisor)"];
  const ambassadors = ["Potato Festival Team", "School Outreach Ambassadors", "PPE Mentor Volunteers", "Regional Farm Tour Guides"];
  app.innerHTML = `
  <section class="card"><h2>Leadership and Staff</h2><p>Potato University is supported by academic leadership, professional staff, advisory board members, and community ambassadors.</p></section>
  <section class="grid grid-3">${staff.map((s) => `<article class="card"><h3>${s[0]}</h3><p><strong>${s[1]}</strong></p><p>${s[2]}</p></article>`).join("")}</section>
  <section class="card"><h3>University Advisory Board</h3><p>The board provides strategic guidance across curriculum, community engagement, and governance.</p><ul>${board.map((b) => `<li>${b}</li>`).join("")}</ul></section>
  <section class="card"><h3>Potato Ambassadors Program</h3><p>Ambassadors support recruitment events, school outreach, and public information sessions.</p><ul>${ambassadors.map((a) => `<li>${a}</li>`).join("")}</ul></section>
  <section class="card">
    <h3>Academic Schools</h3>
    <ul>
      <li>School of Potato Science and Crop Systems</li>
      <li>School of Agricultural Technology and Analytics</li>
      <li>School of Rural Leadership and Policy</li>
      <li>Graduate Research School</li>
    </ul>
  </section>
  ${disclaimerCard()}`;
}
function renderCourses() {
  app.innerHTML = `
  <section class="card">
    <h2>Courses Overview</h2>
    <p>Browse certificate, diploma, undergraduate, postgraduate, and research pathways. Course pages include entry requirements, subjects, delivery information, and progression options.</p>
    <p class="small">Total offerings: ${courseTotals.Certificate} Certificates, ${courseTotals.Diploma} Diplomas, ${courseTotals.Bachelor} Bachelors, ${courseTotals.Master} Masters, ${courseTotals.Doctorate} Doctorates.</p>
    <div class="grid grid-2">
      <label>Search <input id="courseSearch" aria-label="Search title or course code"></label>
      <label>Level <select id="levelFilter"><option>All</option><option>Certificate</option><option>Diploma</option><option>Bachelor</option><option>Master</option><option>Doctorate</option></select></label>
      <label>Difficulty <select id="difficultyFilter"><option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option></select></label>
      <label>Delivery <select id="modeFilter"><option>All</option><option>Online</option><option>On-Campus</option><option>Mixed</option></select></label>
      <label>Minimum PP <input id="pointsFilter" type="number" min="0" max="99.95" step="0.05"></label>
      <label>Maximum Duration <select id="durationFilter"><option value="All">All</option><option value="12">Up to 12 months</option><option value="24">Up to 24 months</option><option value="36">Up to 36 months</option><option value="60">Up to 60 months</option></select></label>
    </div>
    <button id="clearFilters" class="secondary" type="button">Clear Filters</button>
  </section>
  <section id="courseResults" class="grid grid-2"></section>
  ${disclaimerCard()}`;
  ["courseSearch", "levelFilter", "difficultyFilter", "modeFilter", "pointsFilter", "durationFilter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", drawCourseCards);
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("courseSearch").value = "";
    document.getElementById("levelFilter").value = "All";
    document.getElementById("difficultyFilter").value = "All";
    document.getElementById("modeFilter").value = "All";
    document.getElementById("pointsFilter").value = "";
    document.getElementById("durationFilter").value = "All";
    drawCourseCards();
  });
  drawCourseCards();
}
function drawCourseCards() {
  const q = document.getElementById("courseSearch").value.toLowerCase().trim();
  const level = document.getElementById("levelFilter").value;
  const difficulty = document.getElementById("difficultyFilter").value;
  const mode = document.getElementById("modeFilter").value;
  const minPoints = Number(document.getElementById("pointsFilter").value || 0);
  const maxDuration = document.getElementById("durationFilter").value;
  const list = allCourses.filter((c) => {
    const txt = c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    const lv = level === "All" || c.level === level;
    const df = difficulty === "All" || c.difficulty === difficulty;
    const md = mode === "All" || c.mode === mode;
    const pp = c.pointsReq >= minPoints;
    const dr = maxDuration === "All" || c.durationMonths <= Number(maxDuration);
    return txt && lv && df && md && pp && dr;
  });
  const html = list.map((c) => `<article class="card"><h3>${c.title}</h3><p><strong>${c.code}</strong> | ${c.level}</p><p class="small">Entry PP ${c.pointsReq} | ${c.duration} | ${c.difficulty} | ${c.mode}</p><a href="#/course/${c.id}">View course details</a></article>`).join("");
  document.getElementById("courseResults").innerHTML = html || `<article class="card"><h3>No matching courses</h3><p>Try broadening your filters.</p></article>`;
}
function renderCourse(id) {
  const c = allCourses.find((x) => x.id === id);
  if (!c) {
    app.innerHTML = `<div class="card"><h2>Course not found</h2><a href="#/courses">Back to courses</a></div>`;
    return;
  }
  const stage = c.level === "Bachelor" ? "Year" : "Semester";
  const subjects = c.level === "Bachelor"
    ? ["Year 1: Foundations of Crop Science, Agricultural Communication, Statistics for Fieldwork", "Year 2: Soil Systems, Pest and Disease Management, Data for Farm Decisions", "Year 3: Innovation Studio, Regional Policy, Industry Capstone"]
    : ["Semester 1: Foundations and Core Concepts", "Semester 2: Applied Methods and Case Studies", "Semester 3: Advanced Practice", "Semester 4: Capstone/Project"];
  const pathway = {
    Certificate: "Pathway to Diploma study in a related discipline.",
    Diploma: "Pathway to bachelor study with potential credit transfer.",
    Bachelor: "Pathway to honours and master's programs.",
    Master: "Pathway to doctoral research or leadership positions.",
    Doctorate: "Pathway to research, policy, consulting, and academic leadership."
  }[c.level];
  const assessment = c.level === "Doctorate" ? "Research proposal, candidature confirmation, annual milestones, thesis submission, and oral defense simulation." : "Quizzes, applied practical tasks, written assessments, group presentation, and final capstone project.";
  const support = c.level === "Doctorate"
    ? "Research methods workshops, supervisor meetings, ethics application support, and thesis writing consultations."
    : "Academic skills workshops, consultation hours, peer mentoring, and online study support resources.";
  app.innerHTML = `
  <section class="card">
    <h2>${c.title}</h2>
    <p><strong>Course Code:</strong> ${c.code}</p>
    <p><strong>Level:</strong> ${c.level}</p>
    <p>${c.description}</p>
    <p><strong>Difficulty:</strong> ${c.difficulty}</p>
    <p><strong>Duration:</strong> ${c.duration}</p>
    <p><strong>Weekly commitment:</strong> ${c.weekly} hours</p>
    <p><strong>Delivery mode:</strong> ${c.mode}</p>
    <p><strong>Class schedule:</strong> Tuesday 6:00pm-8:00pm, Thursday 6:00pm-8:00pm, and Saturday workshop 10:00am-12:00pm.</p>
    <p><strong>Entry requirement:</strong> Minimum Potato Points ${c.pointsReq}</p>
    <p><strong>Prerequisites:</strong> ${c.prereq}</p>
    <h3>Subjects / Units (${stage} structure)</h3>
    <ul>${subjects.map((s) => `<li>${s}</li>`).join("")}</ul>
    <p><strong>Assessment methods:</strong> ${assessment}</p>
    <p><strong>Learning support:</strong> ${support}</p>
    <p><strong>Pathway options:</strong> ${pathway}</p>
    <p><strong>Potato Points awarded on completion:</strong> ${c.ppAwarded}</p>
    <p><strong>Career outcomes:</strong> Graduate roles may include farm operations support, crop advisory, research assistance, ag-tech coordination, policy support, and community education.</p>
    ${c.level === "Bachelor" ? "<p><strong>Honours pathway:</strong> Available for high-performing students via the Honours year with thesis.</p>" : ""}
    ${c.level === "Master" ? "<p><strong>Specialisations:</strong> Policy, genetics, sustainability, technology innovation, or community agriculture.</p>" : ""}
    ${c.level === "Doctorate" ? "<p><strong>Supervisor panel:</strong> Assigned principal supervisor and associate supervisor, with annual milestone review.</p>" : ""}
  </section>
  ${disclaimerCard()}`;
}
function renderLegal() {
  app.innerHTML = `
  <section class="card">
    <h2>Legal Information</h2>
    <h3>Non-Accreditation Disclaimer</h3>
    <p>Potato University is a novelty educational website. All courses, qualifications, and awards are fictional, non-accredited, and presented for entertainment and informational use only.</p>
    <h3>Terms and Conditions</h3>
    <p>By using this website, you agree to use content responsibly and for lawful purposes. Course materials may be updated, revised, or removed without prior notice. No professional certification, legal standing, or regulatory qualification is granted through this site.</p>
    <h3>Privacy Policy</h3>
    <p>Contact forms and demo portal fields are provided for interactive demonstration. Data entered in the current demo build is not used for identity verification and should not include sensitive personal or financial information.</p>
    <h3>Copyright Notice</h3>
    <p>Copyright Potato University 2026-2027. All text, design, and educational materials are protected unless otherwise attributed.</p>
    <h3>Entertainment Purpose Notice</h3>
    <p>This entire website is intended for entertainment and informational storytelling. It does not replace accredited education, professional advice, or government-recognised qualifications.</p>
  </section>
  ${disclaimerCard()}`;
}
function renderDonations() {
  app.innerHTML = `
  <section class="card">
    <h2>Donations and Giving</h2>
    <p>Help support the Potato University Scholarship Fund, community outreach, publication program, and student field workshops.</p>
    <div class="grid grid-3">
      <article class="card"><h3>Scholarship Fund</h3><p>Supports learner access to PPE prep and foundation pathways.</p></article>
      <article class="card"><h3>Endowment</h3><p>Long-term support for campus initiatives, library resources, and publications.</p></article>
      <article class="card"><h3>General Support</h3><p>Flexible funding for events, open days, and student ambassador projects.</p></article>
    </div>
    <form id="donationForm" class="grid grid-2">
      <label>Name<input required></label>
      <label>Email<input type="email" required></label>
      <label>Donation Category<select><option>Scholarship Fund</option><option>Endowment</option><option>General Support</option></select></label>
      <label>Amount (AUD)<input type="number" min="1" required></label>
      <button class="primary" type="submit">Continue to Secure Payment Gateway</button>
    </form>
    <p id="donationMsg" class="small"></p>
  </section>
  ${disclaimerCard()}`;
  document.getElementById("donationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = Number(e.target.querySelector('input[type="number"]').value || 0);
    const msg = document.getElementById("donationMsg");
    if (amount <= 0) {
      msg.textContent = "Please enter a valid donation amount.";
      msg.className = "small bad";
      return;
    }
    msg.textContent = `Thank you for your pledge of AUD ${amount.toFixed(2)}. Gateway request prepared (connect Stripe/PayPal in production).`;
    msg.className = "small good";
  });
}
function renderNews() {
  app.innerHTML = `
  <section class="card"><h2>News and Events</h2><p>University announcements, key dates, student activities, and research communication updates.</p></section>
  <section class="grid grid-2">
    <article class="card"><h3>Mid-Year Open Day - 12 June</h3><p>Prospective students can attend course briefings, admissions sessions, campus tours, and PPE information seminars.</p></article>
    <article class="card"><h3>Potato Festival Week</h3><p>The annual university festival features keynote talks, community workshops, and student capstone showcases.</p></article>
    <article class="card"><h3>Potato University Press Update</h3><p>Volume 2 publication now available with case studies on sustainability, crop systems, and regional leadership.</p></article>
    <article class="card"><h3>PPE Session Two Key Dates</h3><p>Registrations close seven days before exam day. Results are released within fourteen calendar days.</p></article>
  </section>
  ${disclaimerCard()}`;
}
function renderContact() {
  app.innerHTML = `
  <section class="card">
    <h2>Contact Us</h2>
    <p><strong>Campus Address:</strong> Potato Point, NSW, Australia</p>
    <p><strong>Phone:</strong> (02) 7000 2026</p>
    <p><strong>Email:</strong> hello@potatouniversity.example</p>
    <h3>General Enquiries</h3>
    <form id="contactForm" class="grid grid-2">
      <label>Name<input></label>
      <label>Email<input type="email"></label>
      <label style="grid-column:1 / -1;">Enquiry<textarea rows="4"></textarea></label>
      <button class="primary" type="submit">Send Enquiry</button>
    </form>
    <p id="contactMsg" class="small"></p>
    <p class="small">Office Hours: Monday to Friday, 9:00am-5:00pm AEST. Responses are typically provided within 2 business days.</p>
  </section>
  ${disclaimerCard()}`;
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const [nameEl, emailEl, enquiryEl] = e.target.querySelectorAll("input, textarea");
    const msg = document.getElementById("contactMsg");
    if (!nameEl.value.trim() || !emailEl.value.trim() || !enquiryEl.value.trim()) {
      msg.textContent = "Please complete name, email, and enquiry fields before submitting.";
      msg.className = "small bad";
      return;
    }
    msg.textContent = "Your enquiry has been submitted to Admissions. You should receive a response within 2 business days.";
    msg.className = "small good";
    e.target.reset();
  });
}
function renderFaq() {
  app.innerHTML = `
  <section class="card">
    <h2>Frequently Asked Questions</h2>
    <h3>What are Potato Points?</h3><p>Potato Points (PP) are a ranking score out of 99.95 used to determine fictional entry competitiveness for courses.</p>
    <h3>How do I apply?</h3><p>Review entry requirements, complete the PPE where required, and submit an online enquiry through Admissions.</p>
    <h3>What is PPE?</h3><p>The Potato Points Exam is a standardised exam with multiple sections and timed responses.</p>
    <h3>Can I study online?</h3><p>Yes. Delivery mode differs by course and may be Online, On-Campus, or Mixed delivery.</p>
    <h3>What are the class schedules?</h3><p>Most classes run in evening blocks with optional Saturday practical workshops. Detailed timetables are available in the learner portal.</p>
    <h3>Is this accredited education?</h3><p>No. All content is non-accredited and for entertainment purposes only.</p>
  </section>
  ${disclaimerCard()}`;
}
function renderMap() {
  app.innerHTML = `
  <section class="card map">
    <h2>Campus Map</h2>
    <p>Interactive map with key buildings: lecture halls, labs, potato fields, administration, library, and cafeteria.</p>
    <svg viewBox="0 0 800 430" role="img" aria-label="Campus map">
      <rect x="20" y="20" width="760" height="390" fill="#ecfccb" />
      <rect x="65" y="65" width="170" height="90" fill="#bbf7d0" data-label="Lecture Halls - Rooms A1 to A6" />
      <rect x="280" y="65" width="170" height="90" fill="#fde68a" data-label="Labs - Soil and Crop Labs" />
      <rect x="500" y="65" width="230" height="90" fill="#bfdbfe" data-label="Library - Potato University Press Archive" />
      <rect x="65" y="190" width="250" height="90" fill="#fecaca" data-label="Administration - Enrolments and Student Services" />
      <rect x="340" y="190" width="180" height="90" fill="#ddd6fe" data-label="Cafeteria - The Golden Tuber" />
      <rect x="545" y="190" width="185" height="185" fill="#86efac" data-label="Potato Fields - Demonstration and Trial Plots" />
      <rect x="65" y="305" width="455" height="70" fill="#fef08a" data-label="Student Commons and Event Space" />
    </svg>
    <p id="mapHint" class="small">Click a building for details.</p>
    <p><strong>Legend:</strong> Lecture Halls, Labs, Potato Fields, Admin, Library, Cafeteria, Student Commons.</p>
  </section>
  ${disclaimerCard()}`;
  app.querySelectorAll("svg [data-label]").forEach((node) => {
    node.style.cursor = "pointer";
    node.addEventListener("click", () => {
      document.getElementById("mapHint").textContent = `Selected: ${node.dataset.label}`;
    });
  });
}
function renderPortal() {
  app.innerHTML = `
  <section class="card">
    <h2>Learner's Portal</h2>
    <p>Login gateway for enrolled students. Use demo credentials to preview dashboard access.</p>
    <p class="small"><strong>Demonstration login:</strong> Student ID PU1026 | Password demo123</p>
    <form id="portalLogin" class="grid grid-2">
      <label>Student ID<input id="sid" required></label>
      <label>Password<input id="spw" type="password" required></label>
      <button class="primary" type="submit">Login</button>
    </form>
    <p id="portalMsg" class="small"></p>
    <div id="portalDashboard" class="card" style="display:none;">
      <h3>Dashboard: Class Information and Timetable</h3>
      <ul>
        <li>Monday 10:00-12:00 - Soil Science Foundations (Room A2)</li>
        <li>Wednesday 13:00-15:00 - Applied Potato Labs (Lab C1)</li>
        <li>Thursday 18:30-20:00 - Crop Data Session (Online)</li>
        <li>Friday 09:00-10:30 - Academic Support Clinic (Library Seminar Room)</li>
      </ul>
      <p><strong>Delivery Breakdown:</strong> 60% on-campus, 40% online.</p>
      <p><strong>Room Allocations:</strong> A2, C1, Library Seminar Room 3, Virtual Classroom Green.</p>
    </div>
  </section>
  ${disclaimerCard()}`;
  document.getElementById("portalLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    const sid = document.getElementById("sid").value.trim().toUpperCase();
    const pw = document.getElementById("spw").value.trim();
    const msg = document.getElementById("portalMsg");
    if (sid === "PU1026" && pw === "demo123") {
      document.getElementById("portalDashboard").style.display = "block";
      msg.textContent = "Login successful. Welcome to your learner dashboard.";
      msg.className = "small good";
      return;
    }
    document.getElementById("portalDashboard").style.display = "none";
    msg.textContent = "Login failed. Use demo credentials: PU1026 / demo123.";
    msg.className = "small bad";
  });
}
function renderBooklists() {
  app.innerHTML = `
  <section class="card">
    <h2>Booklists</h2>
    <p>Required texts and learning resources by qualification and year level.</p>
    <h3>Certificate Stream</h3>
    <ul><li>Introduction to Potato Agronomy</li><li>Farm Safety and Equipment Essentials</li><li>Soil Basics for New Growers</li></ul>
    <h3>Diploma Stream</h3>
    <ul><li>Precision Agriculture Handbook</li><li>Post-Harvest Management Manual</li><li>Agricultural Business Fundamentals</li></ul>
    <h3>Bachelor Stream</h3>
    <ul><li>Crop Economics and Regional Systems</li><li>Applied Plant Genetics</li><li>Sustainable Production Frameworks</li></ul>
    <h3>Postgraduate Stream</h3>
    <ul><li>Advanced Research Methods in Agriculture</li><li>Policy, Governance, and Rural Futures</li><li>Biotechnology Applications in Crop Science</li></ul>
    <p><a href="./assets/revision-booklet.pdf" download>Download PPE Revision Booklet (PDF)</a></p>
  </section>
  ${disclaimerCard()}`;
}
function renderPublications() {
  app.innerHTML = `
  <section class="card">
    <h2>Publications</h2>
    <p>Potato University Press publishes institutional journals, themed papers, newsletters, and official media releases.</p>
    <h3>Academic Journal</h3>
    <ul><li>Potato University Press Journal, Volume 1 - Foundations of Regional Potato Systems</li><li>Volume 2 - Soil, Sustainability, and Innovation</li></ul>
    <h3>Research Papers</h3>
    <ul><li>Yield Stability in Mixed Delivery Teaching Farms</li><li>Community Engagement Models for Rural Learning</li><li>Potato Genetics Literacy for Beginner Cohorts</li></ul>
    <h3>Newsletters and Media Releases</h3>
    <ul><li>Quarterly Campus Bulletin</li><li>Festival Program Announcements</li><li>Open Day Media Statements</li></ul>
    <p>Archives are indexed by year, theme, and author to support learner research and community access.</p>
  </section>
  ${disclaimerCard()}`;
}
function renderPotatoPoints() {
  app.innerHTML = `
  <section class="card">
    <h2>Potato Points (PP)</h2>
    <p>Potato Points is a rank score out of 99.95 used to compare applicants and determine course entry bands.</p>
    <h3>How Potato Points are calculated</h3>
    <p>PP combines PPE performance (70%), moderated coursework indicators (20%), and cohort scaling adjustment (10%).</p>
    <table>
      <tr><th>Score Band</th><th>Entry Access</th></tr>
      <tr><td>30.00-49.95</td><td>Certificate pathways</td></tr>
      <tr><td>50.00-69.95</td><td>Diploma pathways</td></tr>
      <tr><td>70.00-84.95</td><td>Bachelor pathways</td></tr>
      <tr><td>85.00-94.95</td><td>Master pathways</td></tr>
      <tr><td>95.00-99.95</td><td>Doctoral and elite research pathways</td></tr>
    </table>
    <h3>PPE Contribution</h3>
    <p>The PPE provides the primary standardised score used in PP conversion, with scaling for exam form difficulty.</p>
    <h3>Entertainment Comparison</h3>
    <p>PP is a fictional ranking construct for this novelty university and is presented as a playful equivalent to real-world ranking systems.</p>
    <h3>Historical Distribution</h3>
    <p>Recent cohorts cluster around 58-78, with a median of 66.40 and an upper decile beginning at 87.10.</p>
    <h3>How to improve PP</h3>
    <ul><li>Use weekly revision blocks rather than cramming</li><li>Practice mixed-difficulty question sets</li><li>Review answer rationale, not just scores</li><li>Use peer study and timed exam simulations</li></ul>
    <h3>Sample Score Profiles</h3>
    <ul>
      <li><strong>PP 61.20:</strong> Suitable for most diploma pathways and selected bridging programs.</li>
      <li><strong>PP 74.85:</strong> Competitive for standard bachelor entry pathways.</li>
      <li><strong>PP 88.30:</strong> Competitive for postgraduate coursework pathways.</li>
      <li><strong>PP 96.10:</strong> Competitive for higher research entry consideration.</li>
    </ul>
  </section>
  ${disclaimerCard()}`;
}
function renderPpe() {
  app.innerHTML = `
  <section class="card">
    <h2>Potato Points Exam (PPE)</h2>
    <p>The PPE is the standardised exam used to determine eligibility and ranking for Potato University pathways.</p>
    <h3>Exam Overview</h3>
    <p>Purpose: assess foundational knowledge in potato systems, agriculture, and applied reasoning.</p>
    <h3>Exam Structure</h3>
    <ul><li>Section A: Potato history and varieties (MCQ)</li><li>Section B: Soil, irrigation, and crop science (MCQ + short response)</li><li>Section C: Pests, disease, and sustainability scenarios</li><li>Section D: Data interpretation and agricultural concepts</li><li>Total time: 2 hours, plus 10-minute reading time</li></ul>
    <h3>Scoring and Conversion</h3>
    <p>Raw marks are scaled, normalised across sessions, and converted into a Potato Points contribution score.</p>
    <h3>Registration and Dates</h3>
    <p>Registration opens each term and closes seven days before the exam date. Exam dates are published in the News and Events page.</p>
    <h3>Results Timeline</h3>
    <p>Results are released approximately 14 days after each exam session.</p>
    <h3>Past Statistics</h3>
    <p>Average exam mark: 62%; top score band achieved by approximately 8% of candidates.</p>
    <h3>Preparation Recommendations</h3>
    <ul>
      <li>Complete at least two timed mock papers before exam day.</li>
      <li>Revise all seven topic domains in the revision guide.</li>
      <li>Use feedback from practice questions to target weak areas.</li>
      <li>Review interpretation questions involving tables and field scenarios.</li>
    </ul>
    <p><a href="#/ppe-practice">Open Practice Questions</a></p>
    <p><a href="#/ppe-revision">Open Revision Guide Page</a></p>
    <p><a href="./assets/revision-booklet.pdf" download>Download Revision Booklet PDF</a></p>
  </section>
  ${disclaimerCard()}`;
}
const ppeQuestions = [
  ["Which potato variety is commonly used for fries?", ["Kennebec", "Russet", "Kipfler", "Dutch Cream"], 1],
  ["What soil pH is generally suitable for potatoes?", ["3.5-4.0", "5.0-6.5", "7.8-8.5", "9.0+"], 1],
  ["Main reason for crop rotation?", ["Increase weeds", "Reduce disease pressure", "Lower yields", "Harden soil"], 1],
  ["Potatoes are primarily propagated using?", ["Seeds only", "Stem cuttings", "Tubers", "Leaves"], 2],
  ["Which nutrient strongly supports tuber development?", ["Potassium", "Sodium", "Chlorine", "Iodine"], 0],
  ["Late blight is caused by?", ["Virus", "Fungus-like pathogen", "Nematode", "Mite"], 1],
  ["Best irrigation approach in water-limited farms?", ["Flood always", "Scheduled drip", "No irrigation", "Overhead daily"], 1],
  ["PPE score contributes to?", ["Campus parking", "Potato Points ranking", "Cafeteria menu", "Library colour"], 1],
  ["Genotype x environment interaction means?", ["No crop change", "Genes and conditions both affect outcomes", "Only weather matters", "Only genes matter"], 1],
  ["Potato originated historically from?", ["South America", "Europe", "Australia", "Africa"], 0],
  ["A post-harvest focus includes?", ["Seed germination speed only", "Storage temperature and humidity", "Leaf area index", "Flower colour"], 1],
  ["A sustainable practice example?", ["Continuous monoculture", "Integrated pest management", "Excess tillage", "Nutrient dumping"], 1],
  ["Potatoes are classified as?", ["Root tubers", "Fruits", "Legumes", "Cereals"], 0],
  ["Primary PPE format includes?", ["Essay only", "MCQ and short response", "Oral only", "Practical only"], 1],
  ["Precision agriculture uses?", ["Guesswork", "Sensor and data-guided decisions", "No records", "Manual-only logs"], 1],
  ["Potato Points maximum score is?", ["90.00", "95.00", "99.95", "100.00"], 2],
  ["A disease identification clue can include?", ["Leaf lesions", "Pot shape only", "Market price", "Truck size"], 0],
  ["Nutrient management begins with?", ["Random fertilising", "Soil testing", "Ignoring records", "Weekly flooding"], 1],
  ["Export readiness often requires?", ["No standards", "Quality grading and compliance", "Unsorted produce", "Broken packaging"], 1],
  ["A valid revision strategy is?", ["Night before only", "Spaced practice and mock tests", "Skip weak topics", "Avoid feedback"], 1]
];
function renderPpePractice() {
  app.innerHTML = `
  <section class="card">
    <h2>PPE Practice Questions</h2>
    <p>Complete 20 interactive multiple-choice questions. You will get instant feedback and a final score summary.</p>
    <div id="quiz"></div>
    <button class="primary" id="finishQuiz">Finish and Show Score</button>
    <p id="quizScore" class="small"></p>
  </section>
  ${disclaimerCard()}`;
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = ppeQuestions.map((q, i) => `<article class="card"><p><strong>Q${i + 1}.</strong> ${q[0]}</p>${q[1].map((opt, oi) => `<label><input type="radio" name="q${i}" value="${oi}"> ${opt}</label><br>`).join("")}<p id="feedback-${i}" class="small"></p></article>`).join("");
  ppeQuestions.forEach((q, i) => {
    document.querySelectorAll(`input[name="q${i}"]`).forEach((input) => {
      input.addEventListener("change", (e) => {
        const correct = Number(e.target.value) === q[2];
        const feedback = document.getElementById(`feedback-${i}`);
        feedback.textContent = correct ? "Correct." : `Incorrect. Correct answer: ${q[1][q[2]]}`;
        feedback.className = correct ? "small good" : "small bad";
      });
    });
  });
  document.getElementById("finishQuiz").addEventListener("click", () => {
    let score = 0;
    ppeQuestions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && Number(selected.value) === q[2]) score += 1;
    });
    document.getElementById("quizScore").textContent = `Final score: ${score} / ${ppeQuestions.length}`;
  });
}
function renderRevisionPage() {
  app.innerHTML = `
  <section class="card">
    <h2>PPE Revision Guide</h2>
    <p>This revision page mirrors the downloadable booklet and provides a complete study outline.</p>
    <h3>1) Potato History</h3><p>Origins in South America, global spread, major historical milestones, and cultural uses.</p>
    <h3>2) Varieties and Identification</h3><p>Differences in skin, flesh, starch profile, culinary use, and post-harvest behavior.</p>
    <h3>3) Growing and Harvesting</h3><p>Planting windows, spacing, irrigation timing, disease prevention, and harvest indicators.</p>
    <h3>4) Soil and Fertilisation</h3><p>Soil pH, nutrient testing, potassium importance, and sustainable fertiliser planning.</p>
    <h3>5) Pests and Disease</h3><p>Recognition of common pests, late blight basics, integrated pest management principles.</p>
    <h3>6) Potato Nutrition</h3><p>Macronutrient profile, fibre, vitamin and mineral contribution, preparation impacts.</p>
    <h3>7) Agricultural Economics Basics</h3><p>Input costs, yield forecasting, pricing, risk management, and supply chain overview.</p>
    <h3>Practice Tips</h3>
    <ul><li>Use timed question sets twice weekly</li><li>Review mistakes and write short explanations</li><li>Mix easy/medium/hard topics in each session</li><li>Simulate full exam conditions before PPE day</li></ul>
    <h3>Sample Questions</h3>
    <p><strong>Sample:</strong> Why is crop rotation important for potatoes?<br><strong>Answer:</strong> It reduces soil-borne disease pressure and supports nutrient balance.</p>
    <p><a href="./assets/revision-booklet.pdf" download>Download Revision Booklet PDF</a></p>
  </section>
  ${disclaimerCard()}`;
}
function renderHonours() {
  app.innerHTML = `
  <section class="card">
    <h2>Honours Programs</h2>
    <p>The Honours year is a dedicated advanced stage for bachelor graduates seeking deeper research and thesis experience.</p>
    <h3>Entry Requirements</h3><p>Completion of a relevant bachelor degree with strong performance and supervisor approval.</p>
    <h3>Program Structure</h3><ul><li>Research methods intensives</li><li>Literature review and proposal</li><li>Supervised thesis project</li><li>Presentation and grading panel</li></ul>
    <h3>Thesis and Supervision</h3><p>Students are paired with a lead supervisor and progress through proposal, midpoint review, and final submission milestones.</p>
    <h3>Grading and PP Pathways</h3><p>Honours performance can improve postgraduate competitiveness and contributes to higher PP-aligned entry readiness for selected programs.</p>
  </section>
  ${disclaimerCard()}`;
}
function renderDualDegrees() {
  app.innerHTML = `
  <section class="card">
    <h2>Dual Degrees</h2>
    <p>Dual programs combine complementary disciplines through integrated planning and reduced duplication where possible.</p>
    <h3>Available combinations</h3>
    <ol>
      <li>Bachelor of Potato Science / Bachelor of Agricultural Economics</li>
      <li>Bachelor of Agricultural Science / Bachelor of Rural and Regional Management</li>
      <li>Diploma of Potato Science + Bachelor of Food and Potato Technology (Accelerated)</li>
      <li>Master of Potato Science / Master of Agricultural Policy and Governance</li>
    </ol>
    <h3>Planning Guides</h3>
    <ul><li>Combined subject maps show shared foundation units</li><li>Sequencing guides optimise workload and prerequisites</li><li>Duration plans include full-time and part-time options</li></ul>
    <h3>How structure works</h3>
    <p>Students complete core requirements of both awards, with approved overlap in selected foundational units where equivalent outcomes are demonstrated.</p>
  </section>
  ${disclaimerCard()}`;
}
