import * as React from "react";
// import { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from '@mui/material/FormControl'; // or the appropriate subpackage
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from '@mui/joy/Button';
import Link from "@mui/joy/Link";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { MenuItem, Select } from "@mui/material";

export default function SignUp() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    // dob: '',
    password: '',
    // role: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  // Basic validation
  if (formData.password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/api/user/signup', formData, {
    headers: {
        'Content-Type': 'application/json'
      }
    }
    );

    console.log(response.data);

    const { access_token } = response.data;
    
    // Store the token in local storage
    localStorage.setItem('accessToken', access_token);

    navigate('/activate'); 
  } catch (error : any) {
    if (error.response) {
      
      console.error('There was a problem with the request:', error.response.status);
    } else if (error.request) {
      console.error('The request was made but no response was received:', error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};
  return (
    <CssVarsProvider>
<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <form onSubmit={handleSubmit}>
        <Sheet
          sx={{
            width: 500,
            mx: 15,
            my: 15,
            py: 3, 
            px: 2, 
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography level="h4" component="h1">
              Welcome to RedDrop!
              <hr style={{ width: '150px', color: 'red', backgroundColor: 'red' }}></hr>
            </Typography>
          </div>
          <Typography
            level="body-sm"
            sx={{
              textAlign: "center", // Centers the text horizontally
              display: "block",
              color:"#424242" // Ensures the Typography component is treated as a block-level element
            }}
          >
            We are a vibrant community dedicated to saving lives through blood
            donation. Our mission is simple yet profound: to bridge the gap
            between generous donors and those in need.
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl component="fieldset" fullWidth>
              <FormLabel>First Name</FormLabel>
              <Input onChange={handleChange} value={formData.first_name} name="first_name" type="text" placeholder="First Name" />
            </FormControl>
            <FormControl component="fieldset" fullWidth>
              <FormLabel>Last Name</FormLabel>
              <Input onChange={handleChange} value={formData.last_name} name="last_name" type="text" placeholder="Last Name" />
            </FormControl>
          </div>

          {/* Second Row: Email & Password */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="elsoukicarol@email.com"
                onChange={handleChange} value={formData.email}
              />
            </FormControl>
            {/* <FormControl fullWidth>
              <FormLabel>Date of Birth</FormLabel>
              <Input name="dob" type="Date" onChange={handleChange} value={formData.dob}/>
            </FormControl> */}
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center", // Centering content horizontally
              justifyContent: "center",
            }}
          >
            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <Input onChange={handleChange} value={formData.password} name="password" type="password" placeholder="password" />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Confirm Password</FormLabel>
              <Input
              onChange={handleConfirmPasswordChange} value={confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </FormControl>
          </div>

          {/* <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center", // Centering content horizontally
              justifyContent: "center",
            }}
          > */}
            {/* <FormControl fullWidth>
              <FormLabel>Role</FormLabel>
              <Input onChange={handleChange} value={formData.role} name="role" type="select" placeholder="role" />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Confirm Password</FormLabel>
              <Input
              onChange={handleChange} value={formData.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </FormControl>
          </div> */}

          <Button
          type="submit"
            sx={{
              mt: 1,
              width: 150,
              mx: "auto",
              bgcolor: "#E53935", // Background color for the button
              color: "white", // Text color for the button
              "&:hover": {
                bgcolor: "darkred", // Background color for the button on hover
              },
            }}
          >
            Sign Up
          </Button>

          <Typography
            endDecorator={<Link href="/sign-up">Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
            >
            Already have an account?
          </Typography>
        </Sheet>
            </form>
        <Sheet
          sx={{
              borderRadius: "0 50% 0% 0%",
              width: 550,
              height: 730,
              ml: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              gap: 2,
              boxShadow: "md",
              background: "linear-gradient(180deg, #FF5F6D 0%, #FFC371 100%)", 
              color: "white",
              padding: 3, 
            
          }}
        >
          <Typography
            level="h4"
            component="h1"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Welcome!
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: "center", mb: 4 }}>
            Sign in to continue.
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              mb: 2,
              bgcolor: "secondary.main", // Adjust this value or use a specific color to match your design
              color: "white", // Ensuring text is white for contrast
              "&:hover": {
                bgcolor: "secondary.dark", // Darker shade on hover, adjust accordingly
              },
            }}
          >
            Log In

        </Button>
        </Sheet>
        </div>
    </CssVarsProvider>
  );
}