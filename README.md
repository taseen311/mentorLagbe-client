# 🎓 MentorLagbe — Find Your Perfect Learning Mentor

**MentorLagbe** is a full-stack tuition and mentorship platform that connects students with qualified tutors. Students can explore tuition opportunities, apply for suitable positions, and upgrade their plans, while tutors can create tuition posts and manage student applications.

Our goal is to make finding the right tutor and managing tuition opportunities simple, transparent, and accessible.

## 🌐 Live Website

🔗 **Live Demo:** [Add Your Live Website URL]

## ✨ Key Features

- 🔐 **Authentication System:** Secure registration and login with Better Auth.
- 👥 **Role-Based Access:** Separate experiences for Students, Tutors, and Admins.
- 🔎 **Browse Tuitions:** Explore approved tuition posts with search and filtering options.
- 📝 **Post Tuition:** Tutors can create and manage tuition posts.
- 📩 **Application Management:** Students can apply for tuition opportunities, while tutors can accept or reject applications.
- 💳 **Subscription Plans:** Upgrade to Pro using Stripe-powered subscription checkout.
- 👤 **Profile Management:** Update personal information and profile pictures.
- 🛡️ **Admin Dashboard:** Manage tuition approval requests.
- 📱 **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- Better Auth Client

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT-based authentication and authorization

### Payment & Image Upload
- Stripe
- ImgBB

### Development Tools
- Git & GitHub
- VS Code
- Postman

## 📂 Project Structure

```text
MentorLagbe/
│
├── mentorlagbe-client/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
│
└── mentor-lagbe-server/
    ├── config/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── index.js
    └── package.json
```

## ⚙️ Installation & Setup

### 1. Clone the repositories

Clone the client and server repositories into the same project directory.

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
git clone YOUR_SERVER_REPOSITORY_URL
```

### 2. Set up the Backend

```bash
cd mentor-lagbe-server
npm install
```

Create a `.env` file in the server root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the Frontend

Open another terminal:

```bash
cd mentorlagbe-client
npm install
```

Create a `.env.local` file in the client root directory and configure the required environment variables:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Also configure the backend API URL and Better Auth base URL according to your local or deployed setup.

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💳 Subscription Plans

| User Role | Free Plan | Pro Plan |
|---|---|---|
| Student | Basic access | $10/month |
| Tutor | Up to 2 tuition posts | Unlimited tuition posts |

Payments are processed through Stripe Checkout. Subscription status is updated after successful server-side webhook verification.

## 🔑 Admin Access

Admin accounts are assigned securely by updating the user's role in the database.

- **Admin Email:** [Add Admin Email]
- **Admin Password:** [Do not publish your actual password]

## 🔒 Security Highlights

- Authentication using Better Auth.
- Role-based access control.
- Server-side session verification for protected operations.
- Environment variables for sensitive credentials.
- Stripe webhook signature verification.
- Duplicate application prevention.

## 🚀 Future Improvements

- Advanced tuition recommendation system.
- Tutor ratings and reviews.
- Saved tuition opportunities.
- Improved notification system.
- More advanced dashboard analytics.

## 👨‍💻 Developer

**MD Ta Seen Arafat Nabil**

- GitHub: [@taseen311](https://github.com/taseen311)

---

⭐ If you find this project interesting, feel free to explore the repository and share your feedback.

**Built with passion, dedication, and a vision to make learning connections easier.**
