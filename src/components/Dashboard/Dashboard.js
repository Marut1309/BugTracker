import React, { useEffect, useState } from "react";
import { Card, Title } from "@tremor/react"; // Assuming these components are correctly imported
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [ticketData, setTicketData] = useState([]);
  const [openTicketsData, setOpenTicketsData] = useState([]);
  const [priorityCount, setPriorityCount] = useState([]);
  const [typeCount, setTypeCount] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser")).id;
        axios.defaults.headers.common["currentuser"] = user;

        const res = await axios.get("<API_ENDPOINT>"); // Replace with your API endpoint
        setTicketData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTicketData();
  }, []);

  useEffect(() => {
    let open = 0;
    let inProgress = 0;
    let closed = 0;

    ticketData.forEach((ticket) => {
      if (ticket.status === "Open") {
        open += 1;
      } else if (ticket.status === "In Progress") {
        inProgress += 1;
      } else {
        closed += 1;
      }
    });

    setPriorityCount([
      { name: "Open", count: open },
      { name: "In Progress", count: inProgress },
      { name: "Closed", count: closed },
    ]);
  }, [ticketData]);

  useEffect(() => {
    let severe = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    ticketData.forEach((ticket) => {
      if (ticket.priority === "Severe") {
        severe += 1;
      } else if (ticket.priority === "High") {
        high += 1;
      } else if (ticket.priority === "Medium") {
        medium += 1;
      } else {
        low += 1;
      }
    });

    setPriorityCount([
      { name: "Severe", count: severe },
      { name: "High", count: high },
      { name: "Medium", count: medium },
      { name: "Low", count: low },
    ]);
  }, [ticketData]);

  useEffect(() => {
    let enhancement = 0;
    let feature = 0;
    let security = 0;
    let design = 0;
    let documentation = 0;
    let maintenance = 0;
    let support = 0;

    ticketData.forEach((ticket) => {
      switch (ticket.type) {
        case "Enhancement":
          enhancement += 1;
          break;
        case "Feature":
          feature += 1;
          break;
        case "Design":
          design += 1;
          break;
        case "Security":
          security += 1;
          break;
        case "Documentation":
          documentation += 1;
          break;
        case "Maintenance":
          maintenance += 1;
          break;
        default:
          support += 1;
          break;
      }
    });

    setTypeCount([
      { name: "Enhancement", count: enhancement },
      { name: "Feature", count: feature },
      { name: "Design", count: design },
      { name: "Security", count: security },
      { name: "Documentation", count: documentation },
      { name: "Maintenance", count: maintenance },
      { name: "Support Request", count: support },
    ]);
  }, [ticketData]);

  useEffect(() => {
    setOpenTicketsData(ticketData.filter((ticket) => ticket.status === "Open"));
  }, [ticketData]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get("<ACTIVITY_API_ENDPOINT>"); // Replace with your activity API endpoint
        setActivityData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivity();
  }, []);

  const startTracking = () => {
    setStartTime(Date.now());
    setIsTracking(true);
  };

  const stopTracking = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    setElapsedTime(elapsed);
    setIsTracking(false);
  };

  const resetTracking = () => {
    setElapsedTime(0);
    setStartTime(null);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="issue-summary">
          <Card className="max-w-lg animate__animated animate__fadeInTopLeft">
            <Title>Issues</Title>
            {/* Insert DonutChart component here */}
          </Card>
          <Card className="max-w-lg animate__animated animate__fadeInDown">
            <Title>Priority</Title>
            {/* Insert DonutChart component here */}
          </Card>
          <Card className="max-w-lg animate__animated animate__fadeInTopRight">
            <Title>Ticket Type</Title>
            {/* Insert DonutChart component here */}
          </Card>
        </div>
        <div className="ticket-activity">
          <div className="open-tickets animate__animated animate__fadeInBottomLeft">
            <div className="open-ticket-summary">
              <h2>Open Tickets</h2>
              <div className="ticket-list">
                <ul>
                  {openTicketsData.map((ticket) => (
                    <li key={ticket.id}>
                      <p>
                        <b>Title:</b> {ticket.title}
                      </p>
                      <p>
                        <b>Description:</b> {ticket.description}
                      </p>
                      <p>
                        <b>Priority:</b> {ticket.priority}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="recent-activity animate__animated animate__fadeInBottomRight">
            <div className="recent-activity-summary">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <ul>
                  {activityData.map((activity) => (
                    <li key={activity.id}>
                      <p>{activity.details}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Time tracking section */}
        <div className="time-tracking">
          <h2>Time Tracking</h2>
          <p>Elapsed Time: {formatTime(elapsedTime)}</p>
          {!isTracking ? (
            <button onClick={startTracking}>Start Tracking</button>
          ) : (
            <button onClick={stopTracking}>Stop Tracking</button>
          )}
          <button onClick={resetTracking}>Reset</button>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
