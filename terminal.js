class Terminal {
    constructor() {
        this.terminalWindow = document.getElementById('terminalWindow');
        this.terminalContent = document.getElementById('terminalContent');
        this.terminalInput = document.getElementById('terminalInput');
        this.terminalToggle = document.getElementById('terminalToggle');
        this.viewTerminalBtn = document.getElementById('viewTerminalBtn');
        this.terminalClose = document.querySelector('.terminal-close');
        
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            projects: this.showProjects.bind(this),
            skills: this.showSkills.bind(this),
            contact: this.showContact.bind(this),
            clear: this.clearTerminal.bind(this),
            date: this.showDate.bind(this),
            echo: this.echo.bind(this),
            sudo: this.sudo.bind(this),
            neofetch: this.showNeofetch.bind(this),
            education: this.showEducation.bind(this),
            experience: this.showExperience.bind(this)
        };
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.terminalToggle.addEventListener('click', () => this.toggleTerminal());
        this.viewTerminalBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showTerminal();
        });
        this.terminalClose.addEventListener('click', () => this.hideTerminal());
        
        // Terminal input
        this.terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.terminalInput.value);
                this.terminalInput.value = '';
            }
        });
        
        // Initial message
        this.addOutput('Welcome to Fransisco\'s Portfolio Terminal v1.0');
        this.addOutput('Type "help" to see available commands');
        this.addPrompt();
    }
    
    toggleTerminal() {
        this.terminalWindow.classList.toggle('active');
        if (this.terminalWindow.classList.contains('active')) {
            this.terminalInput.focus();
        }
    }
    
    showTerminal() {
        this.terminalWindow.classList.add('active');
        this.terminalInput.focus();
    }
    
    hideTerminal() {
        this.terminalWindow.classList.remove('active');
    }
    
    addOutput(text, isCommand = false) {
        const line = document.createElement('div');
        if (isCommand) {
            line.innerHTML = `<span class="prompt">visitor@fransisco:~$</span> ${text}`;
            line.style.marginBottom = '0.5rem';
        } else {
            line.textContent = text;
            line.style.marginBottom = '1rem';
            line.style.color = '#06b6d4';
        }
        this.terminalContent.appendChild(line);
        this.scrollToBottom();
    }
    
    addPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'terminal-input-line';
        prompt.innerHTML = `
            <span class="prompt">visitor@fransisco:~$</span>
            <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
        `;
        this.terminalContent.appendChild(prompt);
        
        const input = prompt.querySelector('.terminal-input');
        input.focus();
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(input.value);
                input.value = '';
            }
        });
        
        this.scrollToBottom();
    }
    
    processCommand(cmd) {
        cmd = cmd.trim();
        if (!cmd) return;
        
        // Add command to output
        this.addOutput(cmd, true);
        
        // Remove old input line
        const oldInputLine = this.terminalContent.querySelector('.terminal-input-line:last-of-type');
        if (oldInputLine) oldInputLine.remove();
        
        // Process command
        const args = cmd.split(' ');
        const command = args[0].toLowerCase();
        
        if (this.commands[command]) {
            this.commands[command](args.slice(1));
        } else {
            this.addOutput(`Command not found: ${command}. Type "help" for available commands.`);
        }
        
        // Add new prompt
        this.addPrompt();
    }
    
    showHelp() {
        const helpText = `
Available commands:
- help: Show this help message
- about: About Fransisco Dolok Saribu
- education: Educational background
- skills: Technical skills
- experience: Work experience
- projects: Data projects portfolio
- contact: Contact information
- clear: Clear terminal
- date: Show current date
- echo [text]: Echo back text
- sudo: 😉 Try it!
- neofetch: System information
        `;
        this.addOutput(helpText);
    }
    
    showAbout() {
        const aboutText = `
Fransisco Dolok Saribu
======================
Data Engineer | Mathematics Graduate
Location: Indonesia
Specialization: ETL Pipelines, Data Processing, Database Design

Background:
Mathematics graduate with strong analytical skills, transitioning into 
Data Engineering. Passionate about building scalable data infrastructure 
and transforming raw data into actionable insights.

Philosophy: "Data without context is just numbers, but with proper 
engineering, it becomes intelligence."
        `;
        this.addOutput(aboutText);
    }
    
    showEducation() {
        const educationText = `
Education:
┌─────────────────────────────────────────────────────┐
│ Bachelor of Mathematics                             │
│ University: Universitas Negeri Medan                 │
│ Years: 2021 - 2025               │
│ GPA: 3.36                                     │
│                                                     │
│ Relevant Coursework:                                │
│ • Statistics & Probability                          │
│ • Linear Algebra                                    │
│ • Database Systems                                  │
│ • Data Analysis                                     │
└─────────────────────────────────────────────────────┘

Certifications:
• [Nama Sertifikasi 1] - [Issuer, Tahun]
• [Nama Sertifikasi 2] - [Issuer, Tahun]
        `;
        this.addOutput(educationText);
    }
    
    showSkills() {
        const skillsText = `
Technical Skills Matrix:
┌─────────────────┬──────────────────────────────────┐
│ Core            │ Python, SQL, ETL Design          │
│ Databases       │ PostgreSQL, MySQL, MongoDB       │
│ Tools           │ Docker, Apache Airflow, Git      │
│ Data Processing │ Pandas, NumPy, PySpark           │
│ Visualization   │ Matplotlib, Plotly, Tableau      │
│ Cloud           │ AWS (EC2, S3, RDS), GCP Basics   │
│ Methodologies   │ Agile, Data Modeling, CI/CD      │
└─────────────────┴──────────────────────────────────┘

Skill Levels (1-5):
Python: █████ 5/5
SQL: █████ 5/5
PostgreSQL: ████▌ 4/5
Docker: ████ 4/5
Airflow: ███▌ 3.5/5
        `;
        this.addOutput(skillsText);
    }
    
    showExperience() {
        const experienceText = `
Work Experience:
[Job Title 1] - [Company 1] ([Bulan/Tahun] - [Bulan/Tahun])
• Designed and implemented ETL pipelines processing 1M+ records daily
• Optimized SQL queries reducing execution time by 60%
• Created data validation frameworks ensuring 99.9% data accuracy

[Job Title 2] - [Company 2] ([Bulan/Tahun] - [Bulan/Tahun])
• Developed Python scripts for automated data extraction from APIs
• Built data warehouse using star schema for analytics team
• Collaborated with data scientists to deploy ML models

Projects: For detailed project information, type "projects"
        `;
        this.addOutput(experienceText);
    }
    
    showProjects() {
        const projectsText = `
Data Engineering Projects:
1. ETL Pipeline with Airflow
   Description: Automated data pipeline extracting from multiple sources
   Tech: Python, Airflow, PostgreSQL, Docker
   Status: ✅ Completed
   
2. Sales Analytics Dashboard
   Description: Interactive dashboard for sales data visualization
   Tech: Python, Plotly, Pandas, SQL
   Status: ✅ Completed
   
3. Database Optimization Project
   Description: Performance tuning and query optimization
   Tech: PostgreSQL, Query Analysis, Indexing
   Status: 🚧 In Progress
   
4. Real-time Data Streaming (Planned)
   Description: Kafka-based streaming pipeline
   Tech: Kafka, Python, Streaming APIs
   Status: 📅 Planned

For code repositories, visit: https://github.com/FransiscoDS
        `;
        this.addOutput(projectsText);
    }
    
    showContact() {
        const contactText = `
Contact Information:
┌─────────────────────────────────────────────────────┐
│ 📧 Email: fransiscodoloksaribu321@gmail.com         │
│ 💼 LinkedIn: /in/fransiscodolok                     │
│ 🐱 GitHub: @Fraanz7                             │
│ 📱 Phone: [+62 XXX-XXXX-XXXX]                       │
│ 📍 Location: Indonesia                              │
└─────────────────────────────────────────────────────┘

Availability:
• Open to Data Engineering opportunities
• Available for freelance data projects
• Interested in collaborative research

Response Time: Within 24 hours
        `;
        this.addOutput(contactText);
    }
    
    clearTerminal() {
        this.terminalContent.innerHTML = '';
        this.addOutput('Terminal cleared. Type "help" for commands.');
    }
    
    showDate() {
        const date = new Date().toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.addOutput(`Current date and time: ${date}`);
    }
    
    echo(args) {
        this.addOutput(args.join(' '));
    }
    
    sudo() {
        this.addOutput('Nice try! 😄 But you don\'t have sudo privileges here.');
        this.addOutput('However, you can contact me for administrative access to your data infrastructure!');
        this.addOutput('Type "contact" for my information.');
    }
    
    showNeofetch() {
        const neofetch = `
        ███████╗██████╗  █████╗ ███╗   ██╗███████╗██╗███████╗ ██████╗ 
        ██╔════╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██║██╔════╝██╔════╝ 
        █████╗  ██████╔╝███████║██╔██╗ ██║███████╗██║███████╗██║  ███╗
        ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║╚════██║██║╚════██║██║   ██║
        ██║     ██║  ██║██║  ██║██║ ╚████║███████║██║███████║╚██████╔╝
        ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚══════╝ ╚═════╝ 
        
Fransisco Dolok Saribu - Portfolio v2.0
─────────────────────────────
  OS: Portfolio Terminal
  Kernel: Data Engineering 6.2
  Shell: zsh 5.9
  Uptime: Always learning
  Projects: 3+ completed
  Skills: Python, SQL, ETL, Docker
  GitHub: @FransiscoDS
  Data Processed: 1TB+
─────────────────────────────
█▄▄▄▄  Memory: [███████▁▁▁] 70%
█▄▄▄▄  Python: [████████▁▁] 80%
█▄▄▄▄  SQL: [█████████▁] 90%
█▄▄▄▄  Docker: [██████▁▁▁▁] 60%
        `;
        this.addOutput(neofetch);
    }
    
    scrollToBottom() {
        this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});