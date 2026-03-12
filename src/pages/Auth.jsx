import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()
  const [screen, setScreen] = useState('welcome') // welcome | login | signup | forgot | newPassword | passwordUpdated

  if (screen === 'passwordUpdated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-6">✓</div>
        <h1 className="text-xl font-bold text-gray-900">Password Updated</h1>
        <p className="text-gray-600 mt-2">You can now sign in with your new password.</p>
        <button
          type="button"
          onClick={() => setScreen('login')}
          className="mt-8 w-full py-3 bg-primary text-white font-medium rounded-pill"
        >
          Back to Login
        </button>
      </div>
    )
  }

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col bg-white px-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-gray-900">Comfy Hair Brand</h1>
          <p className="text-gray-500 mt-2">Welcome back!</p>
          <div className="mt-8 w-full max-w-xs space-y-3">
            <button
              type="button"
              className="w-full py-3 border border-gray-200 rounded-card font-medium text-gray-700 flex items-center justify-center gap-2"
            >
              Continue with Facebook
            </button>
            <button
              type="button"
              className="w-full py-3 border border-gray-200 rounded-card font-medium text-gray-700 flex items-center justify-center gap-2"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full py-3 border border-gray-200 rounded-card font-medium text-gray-700 flex items-center justify-center gap-2"
            >
              Continue with Apple
            </button>
          </div>
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="mt-6 text-primary font-medium text-sm"
          >
            Sign in with email
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'forgot' || screen === 'newPassword') {
    return (
      <div className="min-h-screen flex flex-col bg-white px-6 pt-12">
        <button type="button" onClick={() => setScreen(screen === 'forgot' ? 'login' : 'forgot')} className="p-2 -ml-2 text-gray-600" aria-label="Back">←</button>
        <h1 className="text-2xl font-bold text-gray-900 mt-6">
          {screen === 'forgot' ? 'Forgot Password?' : 'New Password'}
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          {screen === 'forgot'
            ? "We'll send you a link to reset your password."
            : 'Enter your new password below.'}
        </p>
        <form className="mt-8 space-y-4">
          {screen === 'forgot' ? (
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm" />
          ) : (
            <input type="password" placeholder="New password" className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm" />
          )}
          <button
            type="button"
            onClick={() => (screen === 'forgot' ? setScreen('newPassword') : setScreen('passwordUpdated'))}
            className="w-full py-3 bg-primary text-white font-medium rounded-pill"
          >
            Continue
          </button>
        </form>
      </div>
    )
  }

  const isSignUp = screen === 'signup'

  return (
    <div className="min-h-screen flex flex-col bg-white px-6">
      <header className="pt-12 pb-6">
        <button type="button" onClick={() => (isSignUp ? setScreen('login') : navigate(-1))} className="p-2 -ml-2 text-gray-600" aria-label="Back">←</button>
        <h1 className="text-2xl font-bold text-gray-900 mt-6">
          {isSignUp ? 'Welcome!' : 'Sign in'}
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          {isSignUp
            ? 'Create an account to get started.'
            : 'Enter your email and password to continue.'}
        </p>
      </header>

      <form className="flex-1 space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input id="name" type="text" placeholder="Your name" className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm" />
        </div>
        {!isSignUp && (
          <button type="button" onClick={() => setScreen('forgot')} className="text-sm text-primary font-medium">
            Forgot Password?
          </button>
        )}
        <button type="button" className="w-full py-3 bg-primary text-white font-medium rounded-pill mt-4">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </button>
      </form>

      <div className="py-6 space-y-3">
        <p className="text-center text-xs text-gray-500">Or continue with</p>
        <div className="flex justify-center gap-4">
          <button type="button" className="p-2 border border-gray-200 rounded-full">f</button>
          <button type="button" className="p-2 border border-gray-200 rounded-full">G</button>
          <button type="button" className="p-2 border border-gray-200 rounded-full">🍎</button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 pb-8">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button type="button" onClick={() => setScreen(isSignUp ? 'login' : 'signup')} className="text-primary font-medium">
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
