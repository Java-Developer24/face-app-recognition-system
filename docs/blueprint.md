# **App Name**: FaceCheck Hospital

## Core Features:

- User Registration: User registration (patients + employees). Capture personal details (Name, Age, Gender, Contact, Role). Capture face image(s) via webcam and store embeddings in local files. Assign unique ID (PatientID or EmployeeID).
- Face Login: Face login system to match captured face with stored embeddings. Authenticate and redirect to role-specific dashboard. No database needed
- Role-Based Dashboards: Role-based dashboards (Patients & Employees). Patients can view appointments, medical history, and prescriptions. Employees can view assigned patients and schedules.
- Appointment Scheduling with Face ID: Patients can book/check appointments only after logging in with their face. Uses JSON files instead of cloud database
- Attendance Tracking: Employees clock in/out using face login; no cloud database involved.
- Emergency Alerts: In emergencies, instantly recognize patients via face scan and pull up medical history.
- AI-Powered Duplicate Account Finder: Admin tool: AI scans stored local user info and identifies duplicate accounts based on face ID.

## Style Guidelines:

- Primary color: Soft blue (#64B5F6), reflecting trust and calmness.
- Background color: Light gray (#F0F4F8), providing a clean, professional backdrop.
- Accent color: Muted green (#81C784), for success states and confirmations.
- Body and headline font: 'Inter', sans-serif, known for its clear and modern appearance suitable for digital interfaces.
- Use modern, minimalist icons to represent medical information and actions.
- Maintain a clean, well-spaced layout to ensure readability and easy navigation.
- Subtle transitions and animations to provide feedback and guide the user.