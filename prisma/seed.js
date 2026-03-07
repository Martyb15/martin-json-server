const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─── Seed data migrated from db.json ───

const projects = [
  { id: 0, name: 'Vigenere Cipher', image: 'images/vigenere-cipher.jpg', techStack: ['C++'], featured: false, description: 'Keep things secret with a vigenere cipher' },
  { id: 1, name: 'Malware Analysis Sandbox', image: 'images/malware-analysis.jpg', techStack: ['Flask', 'Python'], featured: false, description: 'Suspicious file? Make sure it\'s safe and not malicious.' },
  { id: 2, name: 'Windows Server Backup Automation', image: 'images/automated-backup.jpg', techStack: ['PowerShell', 'Windows Server 2016', 'Robocopy', 'Task Scheduler'], featured: false, description: 'An automated two-tier backup system on Windows Server 2016 combining full and incremental PowerShell scripts with Task Scheduler. Uses robocopy /MIR for destination sync, rotating audit logs via stdout/stderr redirection, and a 7-day cadence (full Sun/Wed, incremental other days) that delivers ≤24-hour RPO on weekdays with zero manual intervention.' },
  { id: 3, name: 'Hackazon', image: 'images/hackazon.jpg', techStack: ['Burp Suite', 'mySQL', 'Php'], featured: true, description: 'Test penetration testing skills with Hackazon.' },
  { id: 4, name: 'Python Blockchain Ledger', image: 'images/blockchain.png', techStack: ['Python', 'FastAPI', 'WebSockets', 'ECDSA'], featured: false, description: 'A from-scratch blockchain featuring PoW/PoS consensus, ECDSA-signed transactions, Merkle trees, and remittance escrow contracts with P2P networking.' },
  { id: 5, name: 'Hacker News Sort Verifier', image: 'images/playwright.jpg', techStack: ['Node.js', 'Playwright', 'JavaScript'], featured: false, description: 'A cross-platform Node.js/Playwright CLI that verifies Hacker News\' "newest" feed is sorted newest-to-oldest. Launches headless Chromium with isolated browser contexts, collects and validates 100 timestamps across paginated pages, handles navigation race conditions with Promise.all, and returns conventional exit codes (0/1) for CI/CD pipeline integration.' },
  { id: 6, name: 'Healthcare Operations Database', image: 'images/hco-database.jpg', techStack: ['SQL Server', 'SSMS', 'T-SQL'], featured: false, description: 'A 26-table relational database and reporting layer in SQL Server modeling a full healthcare operation — patient intake, physician referrals, contracts, staffing schedules, supply inventory, and visit-level billing. Includes 36 advanced queries covering multi-table joins, CTEs, aggregation at different grains, and all outputs validated against benchmark results.' },
];

const skills = [
  { id: 1,  name: 'Python',                image: 'images/python.png',        featured: false, description: 'Three years of experience teaching Python. Primary scripting language for malware-analysis sandbox (Flask + VirusTotal API) and Kaggle dataset ETL; experienced with asyncio, Pandas, and type-hinting.' },
  { id: 2,  name: 'C / C++',               image: 'images/c.png',             featured: false, description: 'Wrote cryptography labs (RSA, MD5-collision) and a CLI banking app that connects to SQL Server via ODBC; comfortable with pointers, memory management, and makefiles.' },
  { id: 3,  name: 'Git & GitHub',          image: 'images/git-logo.png',      featured: false, description: 'Version-controlled projects using Git flow and pull requests on GitHub; comfortable rebasing, resolving complex merge conflicts, and automating CI.' },
  { id: 5,  name: 'Node.js & Express',     image: 'images/node-logo.png',     featured: true,  description: 'Developed RESTful back-ends and a JSON-server mock API for Hackazon penetration-testing labs; implemented JWT auth, rate-limiting, and logging with Morgan and Winston.' },
  { id: 6,  name: 'Docker',                image: 'images/docker1.png',       featured: false, description: 'Containerized malware-sandbox Flask app with multi-stage builds, non-root user execution, and health checks; configured docker-compose for local development.' },
  { id: 7,  name: 'Burp Suite',            image: 'images/burp-suite.png',    featured: false, description: 'Performed dynamic scans on the Hackazon e-commerce app, scripted Intruder attacks, and wrote custom BApp extensions.' },
  { id: 8,  name: 'React + Redux',         image: 'images/react.png',         featured: false, description: 'Built this portfolio and a multi-user code-editor prototype with React hooks and Redux Toolkit; optimized slices, lazy-loaded routes, and wrote custom middleware.' },
  { id: 9,  name: 'Sqlmap',                image: 'images/sqlmap.png',        featured: false, description: 'Automated detection/exploitation of SQLi in Hackazon\'s mobile API; exported PoCs.' },
  { id: 10, name: 'Bootstrap',             image: 'images/bootstrap-logo.png',featured: false, description: 'Responsive layouts with Bootstrap grid, components, and utility classes across all portfolio pages.' },
  { id: 11, name: 'Network & Security Tools', image: 'images/network-tools.png', featured: false, description: 'Daily driver: Nmap, Netdiscover, Wireshark, and OpenSSL for enumeration and packet analysis; studying toward CompTIA Network+ and Security+.' },
  { id: 12, name: 'SQL',                   image: 'images/sql.png',           featured: false, description: 'Built a 26-table healthcare database with 36 validated queries in SQL Server; write complex joins, CTEs, and window functions in MySQL and SQL Server; designed normalized schemas and tuned indexes.' },
  { id: 13, name: 'Linux',                 image: 'images/linux.png',         featured: false, description: 'Daily driver for cybersecurity labs: configure Ubuntu/Kali boxes, automate tasks with Bash, manage services with systemd, and harden servers using iptables and Fail2Ban.' },
  { id: 14, name: 'PowerShell',            image: 'images/powershell.png',    featured: false, description: 'Authored scripts for a two-tier Windows backup: weekly full mirrors with Copy-Item and daily incrementals via Robocopy, all scheduled and logged automatically.' },
  { id: 15, name: 'Playwright',            image: 'images/playwright.png',    featured: false, description: 'Built a Node.js/Playwright CLI to verify Hacker News sort order across 100 paginated timestamps; used isolated browser contexts, Locators with auto-wait, and conventional exit codes for CI/CD readiness.' },
];

const certifications = [
  { id: 0, name: 'B.S. in Computer Science (Cybersecurity)', image: 'images/liberty.jpg',      featured: true,  description: 'Liberty University, May 2025' },
  { id: 1, name: 'Nucamp Full-Stack Web Development Bootcamp', image: 'images/nucamp-logo.png', featured: false, description: 'Completed July 2024 — Built full-stack apps with React, Node, Express & MongoDB' },
  { id: 2, name: 'CompTIA Network+',       image: 'images/network-plus.png',  featured: false, description: 'In progress — exam expected July 2025' },
  { id: 3, name: 'CompTIA Security+',      image: 'images/security-plus.png', featured: false, description: 'Planned for Q4 2025' },
];

const comments = [
  { id: 0, projectId: 0, rating: 5, text: 'Very cool!',         author: 'Jane Hunt',         date: new Date('2025-10-25T16:30Z') },
  { id: 1, projectId: 0, rating: 3, text: 'Thanks for sharing!', author: 'Zandra Katherine', date: new Date('2025-06-17T03:33Z') },
  { id: 29, projectId: 1, rating: 4, text: 'Really interesting project, I like the idea! It would be great to see some automation run weekly checks on new/unchecked files.', author: 'Ben Gunter', date: new Date('2025-06-10T07:28:42.887Z') },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data (order matters for FK constraints)
  await prisma.comment.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.certification.deleteMany();

  // Reset auto-increment sequences
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE projects_id_seq RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE comments_id_seq RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE skills_id_seq RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE certifications_id_seq RESTART WITH 1`);

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log(`  ✓ ${projects.length} projects`);

  for (const s of skills) {
    await prisma.skill.create({ data: s });
  }
  console.log(`  ✓ ${skills.length} skills`);

  for (const c of certifications) {
    await prisma.certification.create({ data: c });
  }
  console.log(`  ✓ ${certifications.length} certifications`);

  for (const c of comments) {
    await prisma.comment.create({ data: c });
  }
  console.log(`  ✓ ${comments.length} comments`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());