import React, { useState } from "react";
import axios from "axios";

function DoctorProfile(props) {
  const [firstName, setFirstName] = useState(props.doctor.firstName || "");
  const [lastName, setLastName] = useState(props.doctor.lastName || "");
  const [email, setEmail] = useState(props.doctor.email || "");
  const [mobile, setMobile] = useState(props.doctor.mobile || "");
  const [address, setAddress] = useState(props.doctor.address || "");
  const [city, setCity] = useState(props.doctor.city || "");
  const [zipcode, setZipcode] = useState(props.doctor.zipcode || "");
  const [state, setState] = useState(props.doctor.state || "");
  const [country, setCountry] = useState(props.doctor.country || "");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState(props.doctor.specialization || "");
  const [degree, setDegree] = useState(props.doctor.degree || "");
  const [area, setArea] = useState(props.doctor.area || "");
  const [qualification, setQualification] = useState(props.doctor.qualification || "");

  function updateProfile() {
    const updatedProfile = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      address: address,
      city: city,
      zipcode: zipcode,
      state: state,
      country: country,
      password: password,
      specialization: specialization,
      degree: degree,
      area: area,
      qualification: qualification
    };

    axios
      .post(`http://localhost:5000/update-doctor-profile`, {
        doctorId: props.doctor.id,
        profile: updatedProfile
      })
      .then((res) => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }

  return (
    <div className="doctor-profile-form">
      <form>
        <div className="row">
          <div className="col-lg-6">
            <label>
              First Name *
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              Last Name *
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </label>
          </div>
          {/* Add other fields for email, mobile, address, city, etc. */}
          <div className="col-lg-6">
            <label>
              Specialization
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Specialization"
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              Degree
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Degree"
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              Area
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Area"
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              Qualification
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="Qualification"
              />
            </label>
          </div>
          <div className="col-lg-12">
            <label>
              Password *
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
          </div>
          <div className="col-lg-12">
            <button type="button" onClick={updateProfile}>
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DoctorProfile;
