import React from 'react'

export const JoinForm = ({ handleSubmit, config, handleChange }) => {
    const { userName, meetingNumber, passWord } = config
    return (
        <>
          <div className="custom-zn__container">
        <div className="custom-zm__modal">
          <form onSubmit={handleSubmit}>
          <label className="custom-zm__modal__label" htmlFor="userName">
                Name
              <input
                type="text"
                value={userName}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="userName"
                placeholder="userName"
              />
            </label>
            <label className="custom-zm__modal__label" htmlFor="meetingNumber">
                Meeting Number
              <input
                type="text"
                value={meetingNumber}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="meetingNumber"
                placeholder="meetingNumber"
              />
            </label>
            <label className="custom-zm__modal__label" htmlFor="passWord">
                Meeting Password
              <input
                type="text"
                value={passWord}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="passWord"
                placeholder="meetingPass"
              />
            </label>
            <div className="custom-zm__btn__box">
              <button className="custom-zm__btn" type="submit">
              Join Meeting
              </button>
            </div>
          </form>
        </div>
      </div>   
        </>
    )
}

export const HostForm = ({ handleSubmit, config, handleChange }) => {
  const { userName, userEmail } = config
  return (
      <>
        <div className="custom-zn__container">
      <div className="custom-zm__modal">
        <form onSubmit={handleSubmit}>
        <label className="custom-zm__modal__label" htmlFor="userName">
                Host Name
              <input
                type="text"
                value={userName}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="userName"
                placeholder="userName"
              />
            </label>
        <label className="custom-zm__modal__label" htmlFor="userEmail">
                Host Email
              <input
                type="text"
                value={userEmail}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="userEmail"
                placeholder="userEmail"
              />
            </label>
          <div className="custom-zm__btn__box">
            <button className="custom-zm__btn" type="submit">
            Host Meeting
            </button>
          </div>
        </form>
      </div>
    </div>   
      </>
  )
}