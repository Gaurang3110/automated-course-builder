// app/sign-in/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Please sign in to your account
        </p>
        <SignIn
          routing="path"
          path="/sign-in"
          appearance={{
            baseTheme: 'dark',
            elements: {
              card: 'bg-gray-900 shadow-xl rounded-xl',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg',
              formFieldInput: 'bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
            },
          }}
        />
      </div>
    </div>
  );
}
