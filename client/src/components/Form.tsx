import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  SelectChangeEvent,
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

function Survey() {
  const [role, setRole] = useState<string>("");
  const [blood_type, setBloodType] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [medications, setMedications] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [medical_condition, setMedicalCondition] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");
  const [tattoos, setTattoos] = useState<string>("");
  const [tattos_lately, setTattoosLately] = useState<string>("");
  const [specify_conditions, setConditions] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string> | any) => {
    const { name, value } = event.target;
    switch (name) {
      case "role":
        setRole(value);
        break;
      case "blood_type":
        setBloodType(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "specialNotes":
        setSpecialNotes(value);
        break;
      case "age":
        setAge(value);
        break;
      case "state":
        setState(value);
        break;
      case "medical_condition":
        setMedicalCondition(value);
        break;
      case "tattoos":
        setTattoos(value);
        break;
      case "tattos_lately":
        setTattoosLately(value);
        break;
      case "medications":
        setMedications(value);
        break;
      case "specify_conditions":
        setConditions(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let userData;
    if (role === "Donor") {
      userData = {
        role,
        blood_type,
        weight,
        age,
        medications,
      };
    } else {
      userData = {
        role,
        blood_type,
        state,
      };
    }

    console.log("Sending Data:", userData);

    // Send the data to the backend
    try {
      const response = await axios.post(
        "https://your-backend-endpoint.com/api/data",
        userData
      );
      console.log("Server Response:", response.data);
      // Handle the response based on your application needs
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
component={Paper}
elevation={3}
p={3}
sx={{
  maxWidth: 400,
  margin: "auto",
  display: 'flex',
  marginLeft:2,
  flexDirection: 'column',
  borderRadius: "16px",
  alignItems: 'center', // This will center the items horizontally
}}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#5e35b1' }}> {/* Dark purple color */}
          Tell us about yourself.
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ mb: 4, color: '#5e35b1' }}>
          ALWAY REMEMBER THAT YOUR INFORMATION IS PRIVATE
        </Typography>

        <FormControl fullWidth required sx={{ mb: 2 , width: 300}}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            name="role"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value="Donor">Donor</MenuItem>
            <MenuItem value="Recipient">Recipient</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
          </Select>
        </FormControl>

        {role === "Donor" && (
          // <div>

          //     <TextField
          //       label="Special Notes for Admin"
          //       variant="outlined"
          //       fullWidth
          //       name="specialNotes"
          //       value={specialNotes}
          //       onChange={handleChange}
          //       sx={{ mb: 2 }}
          //     />
          // </div>

          <div>
            <React.Fragment>
              <Grid container spacing={2} sx={{ mb: 2}}>
                {/* Blood Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: 188}} fullWidth>
                    <InputLabel id="blood-select-label">Blood Type</InputLabel>
                    <Select
                      labelId="blood-select-label"
                      id="blood-select"
                      name="blood_type"
                      value={blood_type}
                      label="Blood Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Weight */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Weight (kg)"
                    variant="outlined"
                    fullWidth
                    name="weight"
                    value={weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="age-select-label">Age</InputLabel>
                    <Select
                      labelId="age-select-label"
                      id="age-select"
                      name="age"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value="17">Under 18</MenuItem>
                      <MenuItem value="18">18-24</MenuItem>
                      <MenuItem value="25">25-29</MenuItem>
                      <MenuItem value="30">30-35</MenuItem>
                      <MenuItem value="40">35-40</MenuItem>
                      <MenuItem value="45">45-50</MenuItem>
                      <MenuItem value="50">50-55</MenuItem>
                      <MenuItem value="60">Over 55</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="state-select-label">Region</InputLabel>
                    <Select
                      labelId="state-select-label"
                      id="state-select"
                      name="state"
                      value={state}
                      label="state"
                      onChange={handleChange}
                    >
                      <MenuItem value="Beirut">Beirut</MenuItem>
                      <MenuItem value="Mount Lebanon">Mount Lebanon</MenuItem>
                      <MenuItem value="North Lebanon">North Lebanon</MenuItem>
                      <MenuItem value="Beqaa">Beqaa</MenuItem>
                      <MenuItem value="Nabatieh">Nabatieh</MenuItem>
                      <MenuItem value="South Lebanon">South Lebanon</MenuItem>
                      <MenuItem value="Akkar">Akkar</MenuItem>
                      <MenuItem value="Baalbek-Hermel">Baalbek-Hermel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </React.Fragment>

            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel id="medications-select-label">
                Are you taking any medication?
              </InputLabel>
              <Select
                labelId="medications-select-label"
                id="medications-select"
                name="medications"
                value={medications}
                label="medications"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>

            <FormControl required fullWidth sx={{ mb: 2 }}>
              <InputLabel id="medical-select-label">
                Do you have any medical condition?
              </InputLabel>
              <Select
                labelId="medical-select-label"
                id="medical-select"
                name="medical_condition"
                value={medical_condition}
                label="medications"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>

            {medical_condition === "yes" && (
              <TextField
                label="Specify (Optional)"
                variant="outlined"
                fullWidth
                name="specify_conditions"
                value={specify_conditions}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            )}

            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel id="tattos-select-label">
                Do you have any tattos?
              </InputLabel>
              <Select
                labelId="tattos-select-label"
                id="tattos-select"
                name="tattoos"
                value={tattoos}
                label="tattos"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            {tattoos === "yes" && (
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel id="tattoslately-select-label">
                  Have you received a tattoo within the last three months?
                </InputLabel>
                <Select
                  labelId="tattoslately-select-label"
                  id="tattoslately-select"
                  name="tattos_lately"
                  value={tattos_lately}
                  label="tattos"
                  onChange={handleChange}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        )}

        {role === "Recipient" && (
            <React.Fragment>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Blood Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="blood-select-label">Blood Type</InputLabel>
                    <Select
                      labelId="blood-select-label"
                      id="blood-select"
                      name="blood_type"
                      value={blood_type}
                      label="Blood Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Weight */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Weight (kg)"
                    variant="outlined"
                    fullWidth
                    name="weight"
                    value={weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="age-select-label">Age</InputLabel>
                    <Select
                      labelId="age-select-label"
                      id="age-select"
                      name="age"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value="17">Under 18</MenuItem>
                      <MenuItem value="18">18-24</MenuItem>
                      <MenuItem value="25">25-29</MenuItem>
                      <MenuItem value="30">30-35</MenuItem>
                      <MenuItem value="40">35-40</MenuItem>
                      <MenuItem value="45">45-50</MenuItem>
                      <MenuItem value="50">50-55</MenuItem>
                      <MenuItem value="60">Over 55</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="state-select-label">Region</InputLabel>
                    <Select
                      labelId="state-select-label"
                      id="state-select"
                      name="state"
                      value={state}
                      label="state"
                      onChange={handleChange}
                    >
                      <MenuItem value="Beirut">Beirut</MenuItem>
                      <MenuItem value="Mount Lebanon">Mount Lebanon</MenuItem>
                      <MenuItem value="North Lebanon">North Lebanon</MenuItem>
                      <MenuItem value="Beqaa">Beqaa</MenuItem>
                      <MenuItem value="Nabatieh">Nabatieh</MenuItem>
                      <MenuItem value="South Lebanon">South Lebanon</MenuItem>
                      <MenuItem value="Akkar">Akkar</MenuItem>
                      <MenuItem value="Baalbek-Hermel">Baalbek-Hermel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </React.Fragment>
        )}

    <Button type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#5e35b1', // Use a theme color here
            ':hover': {
              bgcolor: '#4527a0' // Darken the color slightly on hover
            },
            color: 'white'
          }}>
     Submit
    </Button>
    </Box>
     </form>
  );
}

export default Survey;
