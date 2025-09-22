 import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mycontext } from "./GlobalContext";
import { toast } from "react-toastify";

const UpdateBootcamp = () => {
  const { logtoken } = useContext(mycontext);
  const loc = useLocation();
  const nav = useNavigate();

  // Pre-fill form with bootcamp details from location state
  const [formData, setFormData] = useState({
    name: loc?.state?.name || "",
    email: loc?.state?.email || "",
    description: loc?.state?.description || "",
    website: loc?.state?.website || "",
    address: loc?.state?.address || "",
    careers: loc?.state?.careers || [],
    photo: loc?.state?.photo || "",
    housing: loc?.state?.housing || false,
    jobAssistance: loc?.state?.jobAssistance || false,
    jobGuarantee: loc?.state?.jobGuarantee || false,
    acceptGi: loc?.state?.acceptGi || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "careers") {
      setFormData({
        ...formData,
        careers: [...formData.careers, value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://localhost:5000/api/v1/bootcamps/${loc?.state?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logtoken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      let data = await res.json();
      if (data.success) {
        toast.success("Bootcamp updated successfully ✅");
        // navigate back with updated data
        nav("/dashboard/bootcampdetails", { state: data.data });
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl text-white shadow-md mt-6 bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Update BootCamp</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border text-white bg-gray-800 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        ></textarea>
        <input
          type="url"
          placeholder="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />

        {/* Careers selection */}
        <select
          name="careers"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        >
          <option value="">Select Career</option>
          <option value="web development">Web Development</option>
          <option value="react development">React Development</option>
          <option value="fullstack development">Fullstack Development</option>
          <option value="java development">Java Development</option>
          <option value="python development">Python Development</option>
          <option value="android development">Android Development</option>
          <option value="ux/ui development">UX/UI Development</option>
          <option value="business">Business</option>
          <option value="others">Others</option>
        </select>

        <input
          type="url"
          placeholder="Image URL"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />

        {/* Boolean fields */}
        <label className="flex items-center">
          <input
            type="checkbox"
            name="housing"
            checked={formData.housing}
            onChange={handleChange}
          />
          <span className="ml-2">Housing</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="jobAssistance"
            checked={formData.jobAssistance}
            onChange={handleChange}
          />
          <span className="ml-2">Job Assistance</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="jobGuarantee"
            checked={formData.jobGuarantee}
            onChange={handleChange}
          />
          <span className="ml-2">Job Guarantee</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="acceptGi"
            checked={formData.acceptGi}
            onChange={handleChange}
          />
          <span className="ml-2">Accept GI Bill</span>
        </label>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white hover:text-white"
        >
          Update BootCamp
        </button>
      </form>
    </div>
  );
};

export default UpdateBootcamp;
