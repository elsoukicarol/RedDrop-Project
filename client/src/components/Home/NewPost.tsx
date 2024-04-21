import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PostForm {
  title: string;
  description: string;
  blood_type: string;
  quantity: string;
  location: string;
  urgent: boolean;
  status: string;
}

interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps>  = ({ open, handleClose }) => {
  const [postData, setPostData] = useState<PostForm>({
    title: "",
    description: "",
    blood_type: "",
    quantity: "",
    location: "",
    urgent: false,
    status: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent | any
  ) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setPostData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };  // Added closing brace here

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    console.log("Submit post data:", postData);
    try {
      // Call the activate API
      const response = await axios.post(
        "http://localhost:3001/api/post/create", postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      console.log(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error(
          "There was a problem with the request:",
          error.response.status
        );
      } else if (error.request) {
        console.error(
          "The request was made but no response was received:",
          error.request
        );
      } else {
        console.error("Error", error.message);
      }
    }
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={postData.description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Blood Type</InputLabel>
          <Select
            name="blood_type"
            value={postData.blood_type}
            onChange={handleChange}
          >
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="quantity"
          label="Quantity"
          type="text"
          fullWidth
          value={postData.quantity}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={postData.location}
          onChange={handleChange}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={postData.urgent} onChange={handleChange} name="urgent" />}
            label="Urgent"
          />
        </FormGroup>
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          value={postData.status}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePostModal;
