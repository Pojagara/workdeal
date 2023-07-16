import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import OrderWorker from "../components/acount/OrderWorker";
import UserProfile from "../components/acount/UserProfile";
import Breadcrumb from "../components/common/Breadcrumb";
import Layout from "./../components/layout/Layout";
import { auth } from "../firebase/firebase";
import axios from "axios";
import OrderClient from "../components/acount/OrderClient";
import { Dialog, DialogTitle } from "@mui/material";
import LoginPage from "../components/acount/login";
import SignUpPage from "../components/acount/sign-up";

function Accountpage() {
  const [workeractive, setWorkerActive] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authentication, setAuthentication] = useState(null);
  const [typeofacc, setTypeOfAcc] = useState("worker");
  const [userdata, setUserdata] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const [orderPending, setOrderPending] = useState(0);
  const [orderComplete, setOrderComplete] = useState(0);

  const handleWorkerActive = async () => {
    var checkBox = document.getElementById("checkbox_worker_active");
    if (checkBox && checkBox.checked) {
      if (userdata && userdata.city) {
        await axios
          .post("http://localhost:5000/setworkeractive", {
            uid: auth.currentUser.uid,
            tag: userdata.service.toLowerCase(),
            thumb: "assets/images/cre-service/" + userdata.service + ".png",
            author_thumb: "assets/images/acc.png",
            author_name: userdata.fname + " " + userdata.lname,
            title: userdata.service,
            price: 100,
          })
          .catch((error) => {
            checkBox.checked = false;
            window.alert(error);
          })
          .then((res) => {
            console.log(res.data);
            if (res == "online") {
              checkBox.checked = true;
            }
          });
      } else {
        checkBox.checked = false;
        window.alert("Please complete your profile");
      }
    } else {
      if (userdata) {
        await axios
          .post("http://localhost:5000/setworkeroffline", {
            uid: auth.currentUser.uid,
          })
          .then((res) => {
            if (res.data == "success") {
              checkBox.checked = false;
            }
          })
          .catch((error) => {
            window.alert(error);
            checkBox.checked = true;
          });
      }
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      var checkBox = document.getElementById("checkbox_worker_active");
      axios
        .post("http://localhost:5000/checkworkeractive", {
          uid: auth.currentUser.uid,
        })
        .then((res) => {
          if (res.data == "online") {
            checkBox.checked = true;
          } else {
            checkBox.checked = false;
          }
        });
    }
  }, [auth.currentUser]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setAuthentication(user);
        setShowLogin(false)
      }else{
        setShowLogin(true)
      }
    });
    const getData = async () => {
      if (auth.currentUser) {
        const useruid = auth.currentUser.uid;
        const idtoken = await auth.currentUser.getIdToken();
        axios
          .post(`http://localhost:5000/get-user-data/`, {
            uid: useruid,
            idtoken: idtoken,
          })
          .then((data) => {
            if (data.status == 200) {
              setUserdata(data.data);
              setTypeOfAcc(data.data.typeofacc);
              setAddress1(data.data.address);
              setAddress2(data.data.address2);
            } else {
              window.alert("something went wrong");
            }
          })
          .catch((error) => {
            if (error.response.status == 404) {
              window.location = "/login-google-required";
            } else {
              window.alert(error.message);
            }
          });
      }
    };

    getData();
  }, [authentication]);

  function updateAddress() {
    console.log(userdata.city);
    axios
      .post(`http://localhost:5000/update-user-client/`, {
        fname: userdata.fname,
        lname: userdata.lname,
        email: userdata.email,
        address: address1,
        address2: address2,
        uid: auth.currentUser.uid,
        mobile: userdata.mobile,
        addrcity: userdata.city,
        zipcode: userdata.zipcode,
        addrstatename: userdata.statename,
        addrcountry: userdata.country,
      })
      .then((res) => {
        if (res.status == 200) {
          window.alert("Address updated successfully");
          window.location = "/account";
        } else {
          console.log(res);
          window.alert("Something went wrong");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  async function logout() {
    setShowDialog(false);
    var checkBox = document.getElementById("checkbox_worker_active");
    if (checkBox && checkBox.checked) {
      checkBox.checked = false;
      handleWorkerActive();
      setShowDialog(true);
    } else {
      await auth.signOut().then(() => {
        window.location = "/";
      });
    }
  }

  const [showDialog, setShowDialog] = useState(false);
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const [showLogin, setShowLogin] = useState(false);
  const closeLogin = () => {
    if(auth.currentUser){
      setShowLogin(false);
    }
  };

  const [showSignUp, setShowSignUp] = useState(false);
  const closeSignUp = () => {
    if(auth.currentUser){
      setShowSignUp(false);
    }
  };

 
  return (
    <Layout>
      <Breadcrumb pageTitle="My Account" pageName="My Account" />
      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>You can't accept more works while offline</DialogTitle>
        <input
          className="btn-current-task"
          type="button"
          onClick={logout}
          value="logout"
        />
      </Dialog>
      <Dialog open={showLogin} onClose={closeLogin}>
        <LoginPage signup={setShowSignUp} login={setShowLogin}/>
      </Dialog>
      <Dialog open={showSignUp} onClose={closeSignUp}>
        <SignUpPage signup={setShowSignUp} login={setShowLogin}/>
      </Dialog>
      <section className="account-dashboard sec-m">
        <div className="container">
          <div className="dashboard-informations">
            <div className="dashboard-content align-items-start">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                 {typeofacc == "worker" && (
                <div >
                  <div>
                    <div className="profile-logout">
                      <div>
                        <h4>Let's get to work?</h4>
                        <label class="switch">
                          <input
                            id="checkbox_worker_active"
                            type="checkbox"
                            onClick={handleWorkerActive}
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
                {typeofacc == "worker" && (
                  <button
                    className="nav-link"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="false"
                  >
                    <i className="bi bi-columns-gap" />
                    Dashboard
                  </button>
                )}
                <button
                  className="nav-link active"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-current="page"
                  aria-controls="v-pills-profile"
                  aria-selected="true"
                >
                  <i className="bi bi-person" />
                  My Profile
                </button>

                <button
                  className="nav-link"
                  id="v-pills-order-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-order"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-order"
                  aria-selected="false"
                >
                  <i className="bi bi-bag-check" />
                  All Order
                </button>
                {typeofacc == "client" && (
                  <button
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    <i className="bi bi-house-door" />
                    Address
                  </button>
                )}
                <button
                  className="nav-link"
                  id="v-pills-logout-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-logout"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-logout"
                  aria-selected="false"
                >
                  <i className="bi bi-box-arrow-in-right" />
                  Logout
                </button>
              </div>
             
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="order-box">
                        <h5>Order Pending</h5>
                        <div className="box-inner">
                          <div className="icon">
                            <img
                              src="assets/images/icons/order-box-1.png"
                              alt=""
                            />
                          </div>
                          <h2>
                            {" "}
                            <CountUp
                              start={0}
                              end={orderPending}
                              duration={1}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="order-box">
                        <h5>Order Complate</h5>
                        <div className="box-inner">
                          <div className="icon">
                            <img
                              src="assets/images/icons/order-box-2.png"
                              alt=""
                            />
                          </div>
                          <h2>
                            {" "}
                            <CountUp
                              start={0}
                              end={orderComplete}
                              duration={1}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="order-box">
                        <h5>Total Order</h5>
                        <div className="box-inner">
                          <div className="icon">
                            <img
                              src="assets/images/icons/order-box-4.png"
                              alt=""
                            />
                          </div>
                          <h2>
                            {" "}
                            <CountUp
                              start={0}
                              end={orderPending + orderComplete}
                              duration={3}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div className="user-profile">
                    <div className="user-info">
                      <div className="thumb">
                        <center>
                          {userdata && (
                            <p>
                              {userdata.fname.slice(0, 1).toUpperCase()}
                              {userdata.lname.slice(0, 1).toUpperCase()}
                            </p>
                          )}
                        </center>
                      </div>
                      {userdata != null && (
                        <div>
                          <h3>{userdata.fname + " " + userdata.lname}</h3>
                          <span>{userdata.typeofacc}</span>
                        </div>
                      )}
                    </div>
                    {userdata != null && <UserProfile user={userdata} />}
                  </div>
                </div>
                {authentication &&
                  userdata &&
                  (typeofacc == "worker" ? (
                    <OrderWorker
                      service={userdata.service}
                      pending={setOrderPending}
                      complete={setOrderComplete}
                    />
                  ) : (
                    <OrderClient />
                  ))}
                <div
                  className="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  <div className="user-address">
                    <div className="head">
                      <h3>Save Your Address</h3>
                      <p>
                        Auction sites present consumers with a thrilling,
                        competitivenl way to buy the goods and services they
                        need most.
                      </p>
                    </div>
                    <div className="user-location">
                      <div className="user-loc">
                        <div className="icon">
                          <i className="bi bi-house-door" />
                        </div>
                        <p>Address 1</p>
                        <div className="tooltip">
                          <div
                            className="contact-signle hover-border1 d-flex flex-row align-items-center wow fadeInDown"
                            data-wow-duration="1.5s"
                            data-wow-delay=".2s"
                            style={{
                              visibility: "visible",
                              animationDuration: "1.5s",
                              animationDelay: "0.2s",
                              animationName: "fadeInDown",
                            }}
                          >
                            <div className="icon">
                              <i className="bi bi-geo-alt" />
                            </div>
                            <div className="text">
                              <h4>Location</h4>
                              {userdata && (
                                <div>
                                  <input
                                    type={Text}
                                    id="txt_edit_address"
                                    value={address1}
                                    onChange={(e) => {
                                      setAddress1(e.target.value);
                                    }}
                                  />
                                  <button
                                    className="btn-current-task"
                                    type="button"
                                    onClick={updateAddress}
                                  >
                                    Done
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="user-loc">
                        <div className="icon">
                          <i className="bi bi-house-door" />
                        </div>
                        <p>Address 2</p>
                        <div className="tooltip">
                          <div
                            className="contact-signle hover-border1 d-flex flex-row align-items-center wow fadeInDown"
                            data-wow-duration="1.5s"
                            data-wow-delay=".2s"
                            style={{
                              visibility: "visible",
                              animationDuration: "1.5s",
                              animationDelay: "0.2s",
                              animationName: "fadeInDown",
                            }}
                          >
                            <div className="icon">
                              <i className="bi bi-geo-alt" />
                            </div>
                            <div className="text">
                              <h4>Location</h4>
                              {userdata && (
                                <div>
                                  <input
                                    type={Text}
                                    id="txt_edit_address"
                                    value={address2}
                                    onChange={(e) => {
                                      setAddress2(e.target.value);
                                    }}
                                  />
                                  <button
                                    className="btn-current-task"
                                    type="button"
                                    onClick={updateAddress}
                                  >
                                    Done
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-logout"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  <div className="profile-logout">
                    <center>
                      <h3>Are you sure?</h3>
                      <input
                        className="btn-current-task"
                        type="button"
                        onClick={logout}
                        value="logout"
                      />
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Accountpage;
