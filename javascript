document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const userData = {
        name: "İLKİN <span class='highlight'>HƏSƏNOV</span>",
        title: "STUDENT",
        contact: [
            { icon: "phone.png", text: "+994 77 449 97 58" },
            { icon: "email.png", text: "ilkinhasanzade666@gmail.com" },
            { icon: "location.png", text: "Azerbaijan/Baku" }
        ],
        socialMedia: [
            { icon: "instagram.png", text: "hasanovvv_077" },
            { icon: "tik-tok.png", text: "hasanovvv_077" },
            { icon: "github.png", text: "GitHub" }
        ],
        education: [
            { period: "2013 - 2019", school: "School №-83 lyceum" },
            { period: "2019 - 2024", school: "Haydar Aliyev's named lyceum" },
            { period: "2024 - 2025", school: "AzTU - Azerbaijan Technical UniversityInformation security" }
        ],
        skills: ["Communication Skills", "Git & GitHub", "JavaScript"],
        languages: ["Azerbaijani", "English", "Turkish", "Russian"],
        profile: "Experienced video editor and content creator with a flair for storytelling and cinematic visuals. Proficient in Adobe Premiere Pro, After Effects, and DaVinci Resolve. Known for producing engaging short-form content that connects with audiences across platforms.",
        workExperience: [
            {
                title: "Data Analyst – Insight Metrics",
                details: ["Analyzed datasets to produce actionable insights using Python and SQL. Developed dashboards using Power BI."]
            },
            {
                title: "Customer Service Representative – Global Connect",
                details: ["Handled customer inquiries via phone, chat, and email. Maintained a 95% customer satisfaction rate."]
            },
            {
                title: "Web Developer – CodeCrafters Inc.",
                details: ["Designed and implemented responsive websites using HTML, CSS, JavaScript, and PHP."]
            }
        ],
        reference: "I had the privilege of being supervised by Prof. David Lin at MIT during my undergraduate studies. As my research advisor, he guided me through the intricacies of quantum computing and supported me in publishing my first paper. Prof. Lin’s wealth of knowledge and encouragement were essential to my academic achievements.",
        certifications: [
            {
                name: "Google Cloud Associate Cloud Engineer",
                description: "Validates the ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud. This certification demonstrates hands-on knowledge of Google Cloud services and best practices in cloud operations."
            },
            {
                name: "Python Institute – PCEP (Certified Entry-Level Python Programmer)",
                description: "This entry-level certification confirms the ability to write simple Python scripts and understand the basics of computer programming, data types, control structures, and functions in Python."
            },
            {
                name: "Adobe Certified Professional: Visual Design Using Adobe Photoshop",
                description: "Demonstrates proficiency in Adobe Photoshop for visual design tasks including image manipulation, layout creation, color correction, and preparing digital assets for various media formats."
            }
        ],
        projects: [
            {
                name: "Chat Application",
                description: "Developed a real-time chat application using Node.js, Express, and Socket.io for instant messaging and notifications."
            },
            {
                name: "Mobile Fitness App",
                description: "Created a mobile app to track fitness activities, set goals, and display performance statistics using React Native."
            },
            {
                name: "Cybersecurity Vulnerability Scanner",
                description: "Developed a vulnerability scanner tool that analyzes websites for security flaws and generates detailed reports on identified risks."
            }
        ]
    };

    // --- ADD DATA TO PAGE ---
    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `).join('');
    };

    const createCertifications = (array) => {
        return array.map(cert => `
            <p><strong>${cert.name}</strong></p>
            <p>${cert.description}</p>
        `).join('');
    };

    const createProjects = (array) => {
        return array.map(project => `
            <p><strong>${project.name}</strong></p>
            <p>${project.description}</p>
        `).join('');
    };

    document.getElementById('contactInfo').innerHTML = createList(userData.contact);
    document.getElementById('socialMedia').innerHTML = createList(userData.socialMedia);
    document.getElementById('educationInfo').innerHTML = createEducation(userData.education);
    document.getElementById('skillsInfo').innerHTML = createSkills(userData.skills);
    document.getElementById('languagesInfo').innerHTML = createSkills(userData.languages);
    document.getElementById('profileInfo').innerHTML = `<p>${userData.profile}</p>`;
    document.getElementById('workExperience').innerHTML = createWork(userData.workExperience);
    document.getElementById('referenceInfo').innerHTML = `<p>${userData.reference}</p>`;
    document.getElementById('certificationsInfo').innerHTML = createCertifications(userData.certifications);
    document.getElementById('projectsInfo').innerHTML = createProjects(userData.projects);

    // --- OLD FUNCTIONS (Edit, Save, Accordion, Zip) ---
    const editBtn = document.getElementById('editBtn');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    let isEditing = false;

    // Accordion open/close
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = "300px";
            }
        });
    });

    // Toggle edit mode
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        // Open Accordion panels
        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        // Activate all editable fields
        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        // Save
        if (!isEditing) {
            downloadFiles();
        }
    });

    // Add a new line on Enter key
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('keydown', e => {
            if (!isEditing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '<br><br>');
            }
        });
    });

    // Download the page as ZIP
    async function downloadFiles() {
        const zip = new JSZip();

        // Add HTML file
        const html = document.documentElement.outerHTML;
        zip.file("index.html", html);

        // Add CSS file
        const cssPath = Array.from(document.styleSheets).find(s => s.href && s.href.endsWith("style.css"))?.href;
        if (cssPath) {
            try {
                const response = await fetch(cssPath);
                const cssText = await response.text();
                zip.file("style.css", cssText);
            } catch (err) {
                console.warn("CSS dosyası alınamadı:", err);
            }
        }

        // Add script file
        const scriptPath = Array.from(document.scripts).find(s => s.src && s.src.endsWith("script.js"))?.src;
        if (scriptPath) {
            try {
                const response = await fetch(scriptPath);
                const scriptText = await response.text();
                zip.file("script.js", scriptText);
            } catch (err) {
                console.warn("Script dosyası alınamadı:", err);
            }
        }

        // Add photos
        const images = [...document.querySelectorAll("img")];
        for (let img of images) {
            const src = img.src;
            if (src.startsWith("blob:")) continue;
            try {
                const res = await fetch(src);
                const blob = await res.blob();
                const name = img.src.split("/").pop();
                zip.file(`photos/${name}`, blob);
            } catch (err) {
                console.warn("Resim yüklenemedi:", src);
            }
        }

        // Download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'cv.zip';
            a.click();
        });
    }
});
