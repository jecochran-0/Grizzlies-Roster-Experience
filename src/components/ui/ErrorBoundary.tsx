'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-midnight px-6">
          <div className="text-center">
            <p className="text-lg font-bold text-white">Something went wrong.</p>
            <p className="mt-2 text-sm text-white/60">Please refresh the page to try again.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-6 rounded-full bg-white px-6 py-2 text-sm font-bold text-midnight transition-colors hover:bg-smoke"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
