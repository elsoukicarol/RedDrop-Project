import { Button, Sheet, Typography } from "@mui/joy";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { jwtDecode } from 'jwt-decode';

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OTP() {
  let navigate = useNavigate();
        const [otp, setOtp] = useState("");
        const verifyOtp = async () => {
          try {
            // Retrieve the stored token
            const token = localStorage.getItem('accessToken');
            if (!token) {
              alert('No access token found.');
              return;
            }
      
            // Decode the token to get the user ID
            const decoded = jwtDecode(token);
            console.log(decoded);
            const userId = decoded.sub;
            console.log(userId);
            // Call the activate API
            const response = await axios.post(`http://localhost:3001/api/user/activate`, {
              id: userId,
              otp: otp
            });
      
            console.log("Activation response:", response.data);
            navigate('/form'); 
          } catch (error: any) {
            console.error("Failed to activate account:", error.response?.data || error.message);
            alert("Activation failed: " + (error.response?.data.message || error.message));
          }
        };

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        // background: "white",
        minHeight: "300px",
        boxSizing: "border-box",
        height:690,
        background:"#EEEEEE",
      }}
    >
            <Typography level="h4" component="h1" sx={{ mb: 15 }}>
    Thanks for joining us! <br></br>
    Check your email to activate your account
  </Typography>
      <Typography level="h4" component="h1" sx={{ mb: 3 }}>
        Enter OTP
      </Typography>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        inputType='tel'
        renderSeparator={<span style={{ width: '16px', display: 'inline-block' }}></span>}
        renderInput={(props) => <input {...props} style={{
            width: '50px', // Making each input larger
            height: '50px',
            fontSize: '20px', // Larger font size for better readability
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '0 8px', // Adds horizontal space between each input
          }}/>}
      />
      <Button
        // variant="contained"
        sx={{ mt: 4, width: "100px" }}
        onClick={verifyOtp}
      >
        Verify
      </Button>
    </Sheet>
  );
}
