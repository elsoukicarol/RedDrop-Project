import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/api/user/login', formData, {
    headers: {
        'Content-Type': 'application/json'
      }
    }
    );

    console.log(response.data);

    navigate('/success');
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
      <Sheet
        sx={{
          borderRadius: "0 50% 0% 0%",
          width: 500,
          height: 730,
          mr: "auto", // Centering horizontally
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centering content horizontally
          justifyContent: "center", // Centering content vertically
          gap: 2,
          boxShadow: "md",
          // Adjusting the gradient to be vertical with bright red colors
          background: "linear-gradient(180deg, #FF5F6D 0%, #FFC371 100%)", // A vertical, vibrant red gradient background
          color: "white", // Adjust text color to contrast with the background
          padding: 3, // Add some padding around the content
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
        {/* Buttons for Log In and Sign Up */}
        <Button
          variant="outlined"
          onClick={() => navigate("/signup")}
          sx={{
            borderColor: "white",
            color: "white",
            "&:hover": {
              borderColor: "secondary.main", // Adjust hover color to match your theme
              color: "secondary.main",
            },
          }}
        >
          Sign Up
        </Button>
      </Sheet>
      <form onSubmit={handleSubmit}>
      <Sheet
        sx={{
          width: 300,
          ml: "auto", // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <div>
          <Typography level="h4" component="h1">
            Welcome!
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            onChange={handleChange} value={formData.email}
            name="email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="password" onChange={handleChange} value={formData.password}/>
        </FormControl>

        <Button sx={{ mt: 1 /* margin top */ }} type="submit">Log in</Button>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
      </form>
      </div>
    </CssVarsProvider>
  );
}
