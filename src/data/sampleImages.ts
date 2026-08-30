// Helper function to encode SVG to data URL
export function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// 1. Genuine Passport (Demo 1)
export const GENUINE_PASSPORT_SVG = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520" style="background:#0f172a; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <!-- Guilloche background pattern -->
    <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 20 Q10 0 20 20 T40 20" fill="none" stroke="#e2e8f0" stroke-width="0.5" opacity="0.15"/>
      <path d="M0 20 Q10 40 20 20 T40 20" fill="none" stroke="#e2e8f0" stroke-width="0.5" opacity="0.15"/>
    </pattern>
    <linearGradient id="passportBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
  </defs>

  <!-- Passport Card -->
  <rect x="20" y="20" width="760" height="480" rx="16" fill="url(#passportBg)" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="20" y="20" width="760" height="480" rx="16" fill="url(#guilloche)"/>

  <!-- Top Header -->
  <rect x="20" y="20" width="760" height="56" rx="16" fill="#1e293b"/>
  <rect x="20" y="60" width="760" height="16" fill="#1e293b"/>
  <text x="50" y="55" fill="#f8fafc" font-size="18" font-weight="700" letter-spacing="2">PASSPORT / PASSEPORT</text>
  <text x="580" y="55" fill="#94a3b8" font-size="14" font-weight="600">REPUBLIC OF MERIDIA</text>

  <!-- Left: Photo Box -->
  <rect x="50" y="100" width="160" height="200" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Portrait Silhouette / Photo -->
  <circle cx="130" cy="165" r="42" fill="#3b82f6" opacity="0.8"/>
  <path d="M75 285 C75 225, 185 225, 185 285" fill="#1e40af" opacity="0.85"/>
  <text x="130" y="170" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">PHOTO</text>
  <text x="130" y="315" fill="#64748b" font-size="11" text-anchor="middle">HOLDER SIGNATURE: A. Vance</text>

  <!-- Right: Data Fields -->
  <!-- Type / Code / Passport No -->
  <text x="240" y="115" fill="#64748b" font-size="11" font-weight="bold">Type / Type</text>
  <text x="240" y="132" fill="#0f172a" font-size="15" font-weight="600">P</text>

  <text x="320" y="115" fill="#64748b" font-size="11" font-weight="bold">Country Code / Code pays</text>
  <text x="320" y="132" fill="#0f172a" font-size="15" font-weight="600">MRD</text>

  <text x="490" y="115" fill="#64748b" font-size="11" font-weight="bold">Passport No. / N° du passeport</text>
  <text x="490" y="132" fill="#0f172a" font-size="16" font-weight="bold" letter-spacing="1">M89421054</text>

  <!-- Surname -->
  <text x="240" y="165" fill="#64748b" font-size="11" font-weight="bold">Surname / Nom</text>
  <text x="240" y="185" fill="#0f172a" font-size="18" font-weight="bold">VANCE</text>

  <!-- Given Names -->
  <text x="240" y="215" fill="#64748b" font-size="11" font-weight="bold">Given Names / Prénoms</text>
  <text x="240" y="235" fill="#0f172a" font-size="17" font-weight="bold">ADRIAN ALEXANDER</text>

  <!-- Nationality & DOB -->
  <text x="240" y="265" fill="#64748b" font-size="11" font-weight="bold">Nationality / Nationalité</text>
  <text x="240" y="282" fill="#0f172a" font-size="14" font-weight="600">MERIDIAN</text>

  <text x="420" y="265" fill="#64748b" font-size="11" font-weight="bold">Date of Birth / Date de naiss.</text>
  <text x="420" y="282" fill="#0f172a" font-size="14" font-weight="600">14 MAY 1994</text>

  <text x="600" y="265" fill="#64748b" font-size="11" font-weight="bold">Sex / Sexe</text>
  <text x="600" y="282" fill="#0f172a" font-size="14" font-weight="600">M</text>

  <!-- Issue Date & Expiry Date -->
  <text x="240" y="315" fill="#64748b" font-size="11" font-weight="bold">Date of Issue / Date de délivrance</text>
  <text x="240" y="332" fill="#0f172a" font-size="14" font-weight="600">22 JAN 2022</text>

  <text x="480" y="315" fill="#64748b" font-size="11" font-weight="bold">Date of Expiry / Date d'expiration</text>
  <text x="480" y="332" fill="#0f172a" font-size="14" font-weight="bold" fill="#059669">21 JAN 2032</text>

  <!-- Holographic Seal / Stamp -->
  <circle cx="680" cy="200" r="35" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,2"/>
  <circle cx="680" cy="200" r="28" fill="#e0f2fe" opacity="0.4"/>
  <text x="680" y="196" fill="#0284c7" font-size="8" font-weight="bold" text-anchor="middle">OFFICIAL SEAL</text>
  <text x="680" y="208" fill="#0284c7" font-size="7" text-anchor="middle">IMMIGRATION</text>

  <!-- MRZ (Machine Readable Zone) Section -->
  <rect x="35" y="380" width="730" height="95" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" rx="4"/>
  <text x="50" y="415" fill="#1e293b" font-family="'Courier New', monospace" font-size="17" font-weight="bold" letter-spacing="3.5">
    P&lt;MRDVANCE&lt;&lt;ADRIAN&lt;ALEXANDER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
  </text>
  <text x="50" y="450" fill="#1e293b" font-family="'Courier New', monospace" font-size="17" font-weight="bold" letter-spacing="3.5">
    M894210544MRD9405148M3201216&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02
  </text>
</svg>
`);

// 2. Suspicious Marksheet with Tampered Grades (Demo 2 - High Risk)
export const TAMPERED_MARKSHEET_SVG = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 620" width="800" height="620" style="background:#0f172a; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Paper Base -->
  <rect x="20" y="15" width="760" height="590" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  
  <!-- Header Banner -->
  <rect x="20" y="15" width="760" height="75" fill="#1e3a8a"/>
  <text x="400" y="45" fill="#ffffff" font-size="19" font-weight="bold" text-anchor="middle" letter-spacing="1">METROPOLITAN INSTITUTE OF TECHNOLOGY</text>
  <text x="400" y="68" fill="#93c5fd" font-size="13" font-weight="500" text-anchor="middle">OFFICIAL STATEMENT OF GRADES &amp; ACADEMIC RECORD</text>

  <!-- Student Info Card -->
  <rect x="40" y="105" width="720" height="85" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
  <text x="55" y="128" fill="#64748b" font-size="11" font-weight="bold">STUDENT NAME:</text>
  
  <!-- Suspect font inconsistency here! -->
  <text x="160" y="128" fill="#0f172a" font-size="14" font-weight="bold" font-family="Arial">ROHAN S. SHARMA</text>

  <text x="420" y="128" fill="#64748b" font-size="11" font-weight="bold">ENROLLMENT NO:</text>
  <text x="540" y="128" fill="#0f172a" font-size="13" font-weight="bold">MIT/2021/CS/0491</text>

  <text x="55" y="160" fill="#64748b" font-size="11" font-weight="bold">DEGREE / PROGRAM:</text>
  <text x="180" y="160" fill="#0f172a" font-size="13" font-weight="600">B.Tech - Computer Science</text>

  <text x="420" y="160" fill="#64748b" font-size="11" font-weight="bold">SEMESTER / YEAR:</text>
  <text x="540" y="160" fill="#0f172a" font-size="13" font-weight="600">Semester VI (Spring 2024)</text>

  <!-- Table Header -->
  <rect x="40" y="205" width="720" height="32" fill="#334155"/>
  <text x="55" y="226" fill="#ffffff" font-size="11" font-weight="bold">SUB CODE</text>
  <text x="140" y="226" fill="#ffffff" font-size="11" font-weight="bold">SUBJECT TITLE</text>
  <text x="400" y="226" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">MAX</text>
  <text x="480" y="226" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">OBTAINED</text>
  <text x="560" y="226" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">GRADE</text>
  <text x="660" y="226" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">STATUS</text>

  <!-- Row 1: CS601 -->
  <rect x="40" y="237" width="720" height="34" fill="#ffffff" stroke="#f1f5f9"/>
  <text x="55" y="259" fill="#334155" font-size="12">CS-601</text>
  <text x="140" y="259" fill="#1e293b" font-size="12" font-weight="500">Advanced Algorithms</text>
  <text x="400" y="259" fill="#334155" font-size="12" text-anchor="middle">100</text>
  <text x="480" y="259" fill="#1e293b" font-size="12" text-anchor="middle">88</text>
  <text x="560" y="259" fill="#1e293b" font-size="12" text-anchor="middle" font-weight="bold">A</text>
  <text x="660" y="259" fill="#16a34a" font-size="12" text-anchor="middle" font-weight="bold">PASS</text>

  <!-- Row 2: CS602 (TAMPERED MARKS - Visual artifact: blurred patch & mismatched font) -->
  <rect x="40" y="271" width="720" height="34" fill="#fef2f2" stroke="#fee2e2"/>
  <!-- Highlight artifact box -->
  <rect x="460" y="276" width="40" height="24" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2"/>
  <text x="55" y="293" fill="#334155" font-size="12">CS-602</text>
  <text x="140" y="293" fill="#1e293b" font-size="12" font-weight="500">Distributed Cloud Systems</text>
  <text x="400" y="293" fill="#334155" font-size="12" text-anchor="middle">100</text>
  <!-- Edited 98 from original 52 -->
  <text x="480" y="293" fill="#b91c1c" font-size="14" font-weight="bold" font-family="'Courier New', monospace" text-anchor="middle">98</text>
  <text x="560" y="293" fill="#b91c1c" font-size="14" font-weight="bold" font-family="'Courier New', monospace" text-anchor="middle">O</text>
  <text x="660" y="293" fill="#16a34a" font-size="12" text-anchor="middle" font-weight="bold">PASS</text>

  <!-- Row 3: CS603 -->
  <rect x="40" y="305" width="720" height="34" fill="#ffffff" stroke="#f1f5f9"/>
  <text x="55" y="327" fill="#334155" font-size="12">CS-603</text>
  <text x="140" y="327" fill="#1e293b" font-size="12" font-weight="500">Machine Learning &amp; AI</text>
  <text x="400" y="327" fill="#334155" font-size="12" text-anchor="middle">100</text>
  <text x="480" y="327" fill="#1e293b" font-size="12" text-anchor="middle">81</text>
  <text x="560" y="327" fill="#1e293b" font-size="12" text-anchor="middle" font-weight="bold">A</text>
  <text x="660" y="327" fill="#16a34a" font-size="12" text-anchor="middle" font-weight="bold">PASS</text>

  <!-- Row 4: CS604 (TAMPERED - Edited 94 from 64) -->
  <rect x="40" y="339" width="720" height="34" fill="#fef2f2" stroke="#fee2e2"/>
  <rect x="460" y="344" width="40" height="24" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2"/>
  <text x="55" y="361" fill="#334155" font-size="12">CS-604</text>
  <text x="140" y="361" fill="#1e293b" font-size="12" font-weight="500">Compiler Design &amp; Automata</text>
  <text x="400" y="361" fill="#334155" font-size="12" text-anchor="middle">100</text>
  <text x="480" y="361" fill="#b91c1c" font-size="14" font-weight="bold" font-family="'Courier New', monospace" text-anchor="middle">94</text>
  <text x="560" y="361" fill="#b91c1c" font-size="14" font-weight="bold" font-family="'Courier New', monospace" text-anchor="middle">A+</text>
  <text x="660" y="361" fill="#16a34a" font-size="12" text-anchor="middle" font-weight="bold">PASS</text>

  <!-- Row 5: CS605 -->
  <rect x="40" y="373" width="720" height="34" fill="#ffffff" stroke="#f1f5f9"/>
  <text x="55" y="395" fill="#334155" font-size="12">CS-605</text>
  <text x="140" y="395" fill="#1e293b" font-size="12" font-weight="500">Computer Networks Lab</text>
  <text x="400" y="395" fill="#334155" font-size="12" text-anchor="middle">100</text>
  <text x="480" y="395" fill="#1e293b" font-size="12" text-anchor="middle">90</text>
  <text x="560" y="395" fill="#1e293b" font-size="12" text-anchor="middle" font-weight="bold">A+</text>
  <text x="660" y="395" fill="#16a34a" font-size="12" text-anchor="middle" font-weight="bold">PASS</text>

  <!-- Grand Total / Calculation Section (Math discrepancy: 88+98+81+94+90 = 451, but forged says 485) -->
  <rect x="40" y="420" width="720" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="60" y="445" fill="#475569" font-size="11" font-weight="bold">TOTAL MARKS: <tspan fill="#0f172a" font-size="13">500</tspan></text>
  <text x="230" y="445" fill="#475569" font-size="11" font-weight="bold">OBTAINED: <tspan fill="#b91c1c" font-size="13" font-weight="bold">485 (ARITHMETIC ERROR)</tspan></text>
  <text x="480" y="445" fill="#475569" font-size="11" font-weight="bold">PERCENTAGE: <tspan fill="#0f172a" font-size="13" font-weight="bold">97.0%</tspan></text>
  <text x="660" y="445" fill="#475569" font-size="11" font-weight="bold">CGPA: <tspan fill="#0f172a" font-size="14" font-weight="bold">9.70</tspan></text>

  <!-- Signatures & Forged Seal Section -->
  <rect x="40" y="490" width="720" height="95" fill="#ffffff"/>
  
  <text x="100" y="555" fill="#334155" font-family="'Brush Script MT', cursive, sans-serif" font-size="22">Dr. V. Rao</text>
  <line x1="60" y1="562" x2="180" y2="562" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="576" fill="#64748b" font-size="10" text-anchor="middle">Controller of Examinations</text>

  <!-- Digitally Copied Stamp with Pixel halo -->
  <g transform="translate(370, 495)">
    <circle cx="35" cy="35" r="32" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,1"/>
    <text x="35" y="32" fill="#2563eb" font-size="7" font-weight="bold" text-anchor="middle">MIT EXAM DIVISION</text>
    <text x="35" y="44" fill="#2563eb" font-size="7" text-anchor="middle">VERIFIED 2024</text>
  </g>

  <text x="640" y="555" fill="#334155" font-family="'Brush Script MT', cursive, sans-serif" font-size="22">Prof. S. Iyer</text>
  <line x1="580" y1="562" x2="720" y2="562" stroke="#94a3b8" stroke-width="1"/>
  <text x="650" y="576" fill="#64748b" font-size="10" text-anchor="middle">Registrar / Dean</text>
</svg>
`);

// 3. Genuine University Degree (Demo 3)
export const GENUINE_DEGREE_SVG = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 580" width="800" height="580" style="background:#0f172a; font-family:'Georgia', serif;">
  <!-- Parchment Texture Background -->
  <rect x="20" y="20" width="760" height="540" rx="4" fill="#fffdf7" stroke="#d97706" stroke-width="3"/>
  <rect x="30" y="30" width="740" height="520" rx="2" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="4,2"/>
  
  <!-- University Crest -->
  <circle cx="400" cy="85" r="30" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <text x="400" y="90" fill="#92400e" font-size="18" font-weight="bold" text-anchor="middle">🏛️</text>

  <!-- Institution Header -->
  <text x="400" y="140" fill="#78350f" font-size="22" font-weight="bold" text-anchor="middle" letter-spacing="2">NATIONAL UNIVERSITY OF TECHNOLOGY</text>
  <text x="400" y="165" fill="#92400e" font-size="13" font-style="italic" text-anchor="middle">UPON THE RECOMMENDATION OF THE ACADEMIC SENATE HEREBY CONFERS UPON</text>

  <!-- Graduate Name -->
  <text x="400" y="225" fill="#1e293b" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" text-anchor="middle" letter-spacing="1">ELENA MARIE ROSTOVA</text>
  <line x1="220" y1="235" x2="580" y2="235" stroke="#cbd5e1" stroke-width="1.5"/>

  <!-- Degree Conferred -->
  <text x="400" y="270" fill="#92400e" font-size="14" font-style="italic" text-anchor="middle">THE DEGREE OF</text>
  <text x="400" y="305" fill="#0f172a" font-size="24" font-weight="bold" text-anchor="middle" letter-spacing="1">BACHELOR OF SCIENCE IN SOFTWARE ENGINEERING</text>
  <text x="400" y="335" fill="#475569" font-size="14" text-anchor="middle">WITH FIRST CLASS HONORS AND ACADEMIC DISTINCTION</text>

  <text x="400" y="375" fill="#64748b" font-size="12" text-anchor="middle">GIVEN UNDER THE SEAL OF THE UNIVERSITY ON THE TWENTY-FOURTH OF JUNE, TWO THOUSAND TWENTY-THREE</text>

  <!-- Golden Foil Seal -->
  <circle cx="150" cy="460" r="42" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
  <circle cx="150" cy="460" r="35" fill="#fbbf24" stroke="#92400e" stroke-width="1" stroke-dasharray="3,1"/>
  <text x="150" y="456" fill="#78350f" font-size="9" font-weight="bold" text-anchor="middle">OFFICIAL SEAL</text>
  <text x="150" y="468" fill="#78350f" font-size="8" text-anchor="middle">VERIFIED</text>

  <!-- Signatures -->
  <text x="400" y="480" fill="#1e293b" font-family="'Brush Script MT', cursive, sans-serif" font-size="24" text-anchor="middle">Prof. Arthur Pendelton</text>
  <line x1="300" y1="490" x2="500" y2="490" stroke="#94a3b8" stroke-width="1"/>
  <text x="400" y="505" fill="#64748b" font-size="11" text-anchor="middle">Dean of Faculty</text>

  <text x="640" y="480" fill="#1e293b" font-family="'Brush Script MT', cursive, sans-serif" font-size="24" text-anchor="middle">Dr. Katherine Vance</text>
  <line x1="550" y1="490" x2="730" y2="490" stroke="#94a3b8" stroke-width="1"/>
  <text x="640" y="505" fill="#64748b" font-size="11" text-anchor="middle">President &amp; Chancellor</text>

  <text x="50" y="535" fill="#94a3b8" font-family="monospace" font-size="10">CERT NO: NUT-2023-BSC-883492</text>
</svg>
`);

// Sample comparison selfie photos for face verification demos
export const SAMPLE_MATCHING_SELFIE = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240" style="background:#1e293b; font-family:'Segoe UI', sans-serif;">
  <rect width="200" height="240" fill="#f1f5f9"/>
  <!-- Portrait matching Adrian Vance -->
  <circle cx="100" cy="85" r="48" fill="#3b82f6"/>
  <circle cx="85" cy="80" r="5" fill="#ffffff"/>
  <circle cx="115" cy="80" r="5" fill="#ffffff"/>
  <path d="M85 105 Q100 120 115 105" stroke="#ffffff" stroke-width="3" fill="none"/>
  <path d="M40 220 C40 155, 160 155, 160 220" fill="#1e40af"/>
  <rect x="0" y="205" width="200" height="35" fill="#0f172a" opacity="0.85"/>
  <text x="100" y="227" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">LIVE CAMERA SELFIE</text>
</svg>
`);

export const SAMPLE_MISMATCHING_SELFIE = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240" style="background:#1e293b; font-family:'Segoe UI', sans-serif;">
  <rect width="200" height="240" fill="#f8fafc"/>
  <!-- Portrait mismatched -->
  <circle cx="100" cy="85" r="46" fill="#e11d48"/>
  <circle cx="88" cy="82" r="4" fill="#ffffff"/>
  <circle cx="112" cy="82" r="4" fill="#ffffff"/>
  <path d="M90 108 Q100 95 110 108" stroke="#ffffff" stroke-width="3" fill="none"/>
  <path d="M45 220 C45 160, 155 160, 155 220" fill="#9f1239"/>
  <rect x="0" y="205" width="200" height="35" fill="#0f172a" opacity="0.85"/>
  <text x="100" y="227" fill="#fda4af" font-size="11" font-weight="bold" text-anchor="middle">PRESENTED SUBJECT</text>
</svg>
`);
