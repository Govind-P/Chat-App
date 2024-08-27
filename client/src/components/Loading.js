import React from 'react'

const Loading = () => {
    const set=new Array(4).fill(null);
  return (
    <div className='p-5 pt-7 text-center w-full h-full flex justify-center items-start rounded-md '>
        {
            set.map((data, index) => (
            <div key={index}
            className="h-3 w-3 mr-3 bg-blue-800 rounded-full"
                style={{
                    animation: `bounce 1s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`, // Adjust the delay as needed
                }} ></div>
            ))
        }    
    </div>
    )

}

export default Loading;