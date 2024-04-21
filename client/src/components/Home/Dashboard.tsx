import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Chip,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CreatePostModal from '../Home/NewPost';

export interface Post {
  user: { first_name: string; last_name: string };
  id: number;
  title: string;
  description: string;
  blood_type: string;
  quantity: string;
  location: string;
  urgent: boolean;
  status: string;
}

export interface CreatePostModalProps {
    open: boolean;
    handleClose: () => void;
  }
  

export default function Dashboard() {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const navigate = useNavigate();
    const useFetchPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Ensure initial state is an array
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            console.error('Access token is missing');
            return;
          }
          const decoded = jwtDecode<{ sub: number }>(token);  // Correctly decode your token
          const response = await axios.get('http://localhost:3001/api/post/userposts', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            params: { userId: decoded.sub }
          });
          if (Array.isArray(response.data)) {
            const sortedPosts = response.data.sort((a, b) => 
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setPosts(sortedPosts);
          } else {
            console.error('Data received is not an array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchPosts();
    }, []);
  
    return posts;
  };
      
  const handleAddPost = () => {
    navigate('/create-post'); // Adjust the route as necessary for your application
  };

  const posts = useFetchPosts();
  return (
    <Container sx={{ display: "flex", flexDirection: "column", p: 3, maxWidth: "none" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Posts
      </Typography>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Box key={post.id} sx={{ width: '90%', mb: 3 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h5">
                {post.title}
              </Typography>
              <Typography variant="body1">
                {post.description}
              </Typography>
              <Typography variant="body2">
                Blood Type: {post.blood_type}
              </Typography>
              <Typography variant="body2">
                Quantity: {post.quantity}
              </Typography>
              <Typography variant="body2">
                Location: {post.location}
              </Typography>
              <Typography variant="body2">
                Status: {post.status}
              </Typography>
              {post.urgent && <Chip label="Urgent" color="error" sx={{ mt: 1 }} />}
            </Paper>
          </Box>
        ))
      ) : (
        <Typography variant="subtitle1">No posts found. Start by creating one!</Typography>
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: 32, bottom: 32 }}
        onClick={handleOpenModal} // Set the onClick to open the modal
      >
        <AddIcon />
      </Fab>
      <CreatePostModal open={isModalOpen} handleClose={handleCloseModal} />
    </Container>
  );
}
