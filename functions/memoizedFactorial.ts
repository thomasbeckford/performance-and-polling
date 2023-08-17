import memoize from 'lodash/memoize'

// A simple expensive function that calculates the factorial of a number
export function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1
  }
  return n * calculateFactorial(n - 1)
}

// Memoize the calculateFactorial function
const memoizedFactorial = memoize(calculateFactorial)

export default memoizedFactorial
