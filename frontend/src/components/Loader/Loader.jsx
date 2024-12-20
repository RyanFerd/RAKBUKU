import React from 'react'

const Loader = () => {
  return (
    <div role="status" className="flex justify-center items-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 1C76.5 1 99 23.5 99 50C99 76.5 76.5 99 50 99C23.5 99 1 76.5 1 50C1 23.5 23.5 1 50 1Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M93.9676 39.0409C95.7586 34.5677 92.7525 29.5841 88.018 28.7106C82.9678 27.7696 77.8328 28.4848 73.5243 30.6658C69.1907 32.8516 65.8927 36.7742 63.6618 41.3232C61.4308 45.8722 60.3317 50.8752 60.4603 55.8967C60.5889 60.9182 62.0317 65.8368 64.6478 70.1541C67.2638 74.4714 71.0796 77.9873 75.5922 80.2623C80.1047 82.5374 85.1473 83.4786 90.0246 82.9831C94.902 82.4876 99.3217 80.5885 102.68 77.6172"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loader
