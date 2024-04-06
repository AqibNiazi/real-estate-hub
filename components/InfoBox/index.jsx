import React from 'react'

const InfoBox = ({heading,backgroundColor,buttonInfo,children}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
    <h2 className="text-2xl font-bold">{heading}</h2>
    <p className="mt-2 mb-4">
    {children}
    </p>
    <a
      href={`${buttonInfo.link}`}
      className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 opacity-80`}
    >
     {buttonInfo.text}
    </a>
  </div>
  )
}

export default InfoBox