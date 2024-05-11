import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, ToggleButton } from "@mui/material";
import Appointment from "../appointment/Appointment";
import DialogLayout from "../common/DialogLayout";
import { useRouter } from 'next/router';
import Swal from 'sweetalert';

function DoctorBooking() {
  const router = useRouter();
  const { query } = router;

  const [appointments, setAppointments] = useState([]);
  const [appointmentToComplete, setAppointmentToComplete] = useState({});
  const [payment, setPayment] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (query.latitude && query.longitude) {
      // Adjust API call to fetch doctor appointments based on location
      axios.post("http://localhost:5000/get-appointments", {
        latitude: query.latitude,
        longitude: query.longitude,
      }).then((res) => {
        setAppointments(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [query.latitude, query.longitude]);

  // Function to handle completing appointments
  function completeAppointment(appointmentId) {
    // Implement logic to mark appointment as completed
    setAppointmentToComplete(appointmentId);
    setPayment(true);
    // Additional logic for marking appointment as completed
  }

  // Function to handle payment submission
  function handleSubmit() {
    // Implement logic for payment submission
    // For example, show a confirmation dialog
    Swal({
      title: 'Payment Confirmation',
      text: `Your payment request for appointment has been submitted. Do you want to proceed with the payment?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed with payment',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setSubmit(true);
        // Proceed with payment logic
      }
    });
  }

  return (
    <div className="doctor-booking">
      {/* Dialog for payment */}
      {payment && (
        <Dialog open={payment} onClose={() => setPayment(false)}>
          {/* Modify content to reflect payment details */}
          <DialogTitle>Please complete the payment process</DialogTitle>
          <ToggleButton onClick={handleSubmit}>Proceed with Payment</ToggleButton>
        </Dialog>
      )}

      {/* Render list of appointments */}
      <div className="appointment-list">
        <h3>All Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === "pending" && (
                    <button onClick={() => completeAppointment(appointment.id)}>Complete</button>
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

export default DoctorBooking;
