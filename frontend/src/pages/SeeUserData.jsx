import React from 'react'
import PropTypes from 'prop-types'
import { RxCross1 } from 'react-icons/rx'

const SeeUserData = ({ userDivData = {}, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-black opacity-50 z-40`}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
        role="dialog"
        aria-labelledby="user-info-title"
      >
        <div className="bg-white rounded p-6 w-[90%] md:w-[60%] lg:w-[40%] shadow-lg text-zinc-800 relative">
          {/* Modal Header */}
          <div className="flex items-center justify-between">
            <h1 id="user-info-title" className="text-2xl font-semibold">
              User Information
            </h1>
            <button
              onClick={() => setuserDiv('hidden')}
              className="text-zinc-600 hover:text-red-500 focus:outline-none"
              aria-label="Close"
            >
              <RxCross1 size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="mt-4 space-y-4">
            <div>
              <label>
                Username:{' '}
                <span className="font-semibold">
                  {userDivData.username || 'N/A'}
                </span>
              </label>
            </div>
            <div>
              <label>
                Email:{' '}
                <span className="font-semibold">
                  {userDivData.email || 'N/A'}
                </span>
              </label>
            </div>
            <div>
              <label>
                Address:{' '}
                <span className="font-semibold">
                  {userDivData.address || 'N/A'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Prop Validation
SeeUserData.propTypes = {
  userDivData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  userDiv: PropTypes.string.isRequired,
  setuserDiv: PropTypes.func.isRequired,
}

export default SeeUserData
