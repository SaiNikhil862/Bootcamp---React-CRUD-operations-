import React from 'react'

const UpdateCourse = () => {
  return (
    <>
      <div className="max-w-md mx-auto  p-6 rounded-xl shadow-md mt-6 text-white bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Course</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Course Title" className="w-full p-2 border rounded bg-gray-800" />
        <textarea placeholder="Description" className="w-full p-2 border rounded bg-gray-800"></textarea>
        <input type="text" placeholder="Duration" className="w-full p-2 border rounded bg-gray-800" />
        <input type="number" placeholder="Price" className="w-full p-2 border rounded bg-gray-800" />
        <input type="url" placeholder="Image URL" className="w-full p-2 border rounded bg-gray-800" />
        <select className="w-full p-2 border rounded bg-gray-800">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <div className="flex items-center space-x-4">
          <span>Scholarship available:</span>
          <label><input type="radio" name="scholarship" /> Yes</label>
          <label><input type="radio" name="scholarship" /> No</label>
        </div>
        <button className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white  hover:text-white">
          Update Course
        </button>
      </form>
      
    </div>
    </>
  )
}

export default UpdateCourse
