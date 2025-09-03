# K-Shop E-commerce Platform 🛍️

A modern, full-featured e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

### Shopping Experience
- 📦 Complete product catalog with categories
- 🔍 Advanced search and filtering
- 🛒 Persistent shopping cart
- ❤️ Wishlist functionality
- 👀 Recently viewed products tracking
- ⭐ Product reviews and ratings

### User Features
- 🔐 User authentication system
- 📱 Social login (Google, Kakao, Naver)
- 👤 User profile management
- 📜 Order history
- 💰 Points and rewards system
- 🎟️ Coupon system

### Modern UI/UX
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js 15
- 🎨 Beautiful animations with Framer Motion
- ♿ Accessibility features

### Customer Support
- 💬 Real-time chat support with AI responses
- 📧 Newsletter subscription
- ❓ FAQ and help center

## 🚀 Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Authentication:** Supabase Auth (Demo mode available)
- **Database:** Supabase (Optional)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/gyb0719/k-shop-ecommerce.git
cd k-shop-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Accounts

### Customer Account
- Email: `test@example.com`
- Password: `password`

### Admin Account
- Email: `admin@example.com`
- Password: `admin`

## 🎟️ Test Coupons

- `WELCOME10` - 10% off for orders over ₩30,000
- `SAVE5000` - ₩5,000 off for orders over ₩50,000
- `VIP20` - 20% off for orders over ₩100,000 (max ₩50,000)

## 📱 Social Login

The platform supports social login with:
- Google
- Kakao
- Naver

*Note: Social login is in demo mode and simulates the authentication flow.*

## 🛠️ Development

### Project Structure
```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── cart/        # Shopping cart components
│   ├── chat/        # Chat widget
│   ├── home/        # Homepage sections
│   ├── layout/      # Layout components
│   ├── product/     # Product components
│   ├── products/    # Product listing components
│   ├── review/      # Review system
│   └── ui/          # UI components
├── data/            # Sample data
├── lib/             # Utility functions
├── providers/       # React context providers
├── store/           # Zustand stores
└── types/           # TypeScript types
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gyb0719/k-shop-ecommerce)

### Environment Variables

For production deployment, set the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NEXT_PUBLIC_APP_URL` - Your application URL

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ by [gyb0719](https://github.com/gyb0719)

---

**Note:** This is a demo e-commerce platform. For production use, implement proper payment processing, security measures, and backend services.

Last Updated: 2025-01-03