import React, { useEffect, useState } from "react";
import axios from "axios";
import DialogLayout from "../common/DialogLayout";

function DoctorBookingWorker(props) {
  const [appointments, setAppointments] = useState([]);
  const [orderPending, setOrderPending] = useState(0);
  const [orderComplete, setOrderComplete] = useState(0);
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  function setAppointmentDataToDashboard() {
    let pendingCount = 0;
    let completeCount = 0;
    // Logic to count pending and completed appointments
    appointments.forEach((appointment) => {
      if (appointment.status === "pending") pendingCount++;
      if (appointment.status === "completed") completeCount++;
    });
    setOrderPending(pendingCount);
    setOrderComplete(completeCount);
  }

  async function acceptAppointment(id) {
    // Logic to accept the appointment with the given id
    setShowAccept(true);
  }

  async function rejectAppointment(id) {
    // Logic to reject the appointment with the given id
    setShowReject(true);
  }

  useEffect(() => {
    // Fetch appointments data when component mounts
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Update dashboard counts when appointments data changes
    setAppointmentDataToDashboard();
  }, [appointments]);

  async function fetchAppointments() {
    // Fetch appointments data from the server
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  return (
    <div className="doctor-booking-worker">
      {showAccept && (
        <DialogLayout
          title={"Appointment Accepted"}
          content={"You have accepted the appointment. Please be ready."}
          buttonText={"OK"}
          onClose={() => setShowAccept(false)}
        />
      )}
      {showReject && (
        <DialogLayout
          title={"Appointment Rejected"}
          content={"You have rejected the appointment."}
          buttonText={"OK"}
          onClose={() => setShowReject(false)}
        />
      )}

      <div className="appointment-list">
        <h3>All Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === "pending" && (
                    <>
                      <button onClick={() => acceptAppointment(appointment.id)}>Accept</button>
                      <button onClick={() => rejectAppointment(appointment.id)}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorBookingWorker;

