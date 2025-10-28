# TalentLink Admin Portal - Setup Guide

## Pages Created

### 1. Admin Login Page
**Location:** `src/app/admin/admin-login/`

**Purpose:** Secure authentication for admin users

**Features:**
- Email and password input fields
- Form validation
- Error message display
- Loading state during authentication
- Remember me checkbox
- Forgot password link
- Responsive design with Tailwind CSS

**Test Credentials:**
- Email: `admin@talentlink.com`
- Password: `admin123`

**Route:** `/admin/login`

---

### 2. Admin Dashboard
**Location:** `src/app/admin/admin-dashboard/`

**Purpose:** High-level overview of the entire talent pipeline

**Features:**
- **KPI Cards:**
  - New Certified Applicants (with percentage change)
  - Jobs Posted
  - Active Employees in Training
  - Courses Completed This Month

- **Applicant Funnel Chart:**
  - Visual representation of applicant journey
  - 5 stages: Viewed → Started Training → Passed Quiz → Interviewed → Hired
  - Progress bars showing percentages
  - Conversion rate calculation

- **Needs Action List:**
  - Priority-based action items
  - Count badges
  - Color-coded priorities (High/Medium/Low)
  - Quick links to relevant sections

- **Additional Widgets:**
  - Recent Activity feed
  - Top Performing Courses
  - Quick Actions panel

**Route:** `/admin/dashboard` (Protected by auth guard)

---

## Services & Guards

### Admin Service
**Location:** `src/app/admin/services/admin.service.ts`

**Responsibilities:**
- User authentication
- Session management
- Token validation
- User state management using Angular signals

**Key Methods:**
- `login(credentials)`: Authenticate user
- `logout()`: Clear session and redirect
- `getCurrentUser()`: Get logged-in user info
- `getAuthStatus()`: Check if user is authenticated
- `validateToken()`: Verify token validity

### Admin Auth Guard
**Location:** `src/app/admin/guards/admin-auth.guard.ts`

**Purpose:** Protect admin routes from unauthorized access

**Behavior:**
- Redirects to login if not authenticated
- Preserves return URL for post-login redirect
- Validates token on each navigation

---

## Running the Application

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Access the Application:**
   - Open browser to `http://localhost:4200`
   - You'll be redirected to the login page
   - Use the test credentials to log in

4. **Navigate:**
   - After login, you'll be redirected to the Admin Dashboard
   - Use the logout button to return to the login page

---

## Project Structure

```
src/app/admin/
├── admin-login/
│   ├── admin-login.component.ts
│   ├── admin-login.component.html
│   └── admin-login.component.css
├── admin-dashboard/
│   ├── admin-dashboard.component.ts
│   ├── admin-dashboard.component.html
│   └── admin-dashboard.component.css
├── services/
│   └── admin.service.ts
└── guards/
    └── admin-auth.guard.ts
```

---

## Design Features

- **Modern UI:** Clean, professional design using Tailwind CSS
- **Responsive:** Works on desktop, tablet, and mobile devices
- **Accessible:** Proper ARIA labels and keyboard navigation
- **Interactive:** Smooth transitions and hover effects
- **Dark/Light Mode Ready:** Color scheme supports theme switching

---

## Mock Data

Currently, the dashboard displays mock data for:
- KPIs with random percentage changes
- Applicant funnel with sample numbers
- Action items with various priorities
- Recent activity timeline
- Top performing courses

**To integrate real data:**
1. Create API service in `src/app/core/services/api.service.ts`
2. Replace mock data in `loadDashboardData()` method
3. Add HTTP interceptor for authentication tokens
4. Implement error handling and loading states

---

## Next Steps

To complete the TalentLink system, you should create:

### External Portal (For Applicants)
- Homepage/Landing Page
- Job Listings Page
- Job Details Page
- Applicant Registration & Login
- Learning Dashboard
- Learning Module Page
- Quiz Page
- Completion Page

### Internal Portal (For Employees)
- Employee Login Page
- Employee Dashboard
- Open University (Course Library)
- My Learning Page
- My Profile & Skills Page

### Additional Admin Pages
- Job Posting Management
- Create/Edit Job Page
- Applicant Management
- Employee Management
- Course Library Management
- Create/Edit Course Page (Course Builder)

---

## Technologies Used

- **Angular 20:** Latest Angular framework with standalone components
- **TypeScript:** Type-safe development
- **Tailwind CSS:** Utility-first CSS framework
- **RxJS:** Reactive programming for async operations
- **Angular Signals:** Modern state management
- **Angular Router:** Navigation and route guards

---

## Security Notes

⚠️ **Important:** The current implementation uses mock authentication for demonstration purposes.

**For production, implement:**
1. Real backend API integration
2. Secure password hashing (bcrypt)
3. JWT token generation and validation
4. HTTPS/TLS encryption
5. CSRF protection
6. Rate limiting on login attempts
7. Password strength requirements
8. Multi-factor authentication (MFA)
9. Session timeout handling
10. Audit logging

---

## Support

For questions or issues, please refer to the project documentation or contact the development team.
