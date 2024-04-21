import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  // Button,
  // Stack,
  Container,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
interface Post {
  user: {
    first_name: string;
    last_name: string;
  };
  id: number;
  title: string;
  description: string;
  blood_type: string;
  quantity: string;
  location: string;
  urgent: boolean;
  status: string;
}

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
        const response = await axios.get('http://localhost:3001/api/post/getAllPosts', {
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
export default function Dashboard() {
  const posts = useFetchPosts();
  return (
    <Container sx={{ display: "inline", p: 3, marginLeft: "240px", maxWidth: "none" }}>
      {posts.map((post) => (
        <Box key={post.id} sx={{ width: 800, mb: 3 }}> {/* Ensuring each post has its own Box */}
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
              {post.user.first_name} {post.user.last_name}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {post.title}
            </Typography>
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {post.description}
            </Typography>
            <Typography component="div" variant="body2" sx={{ mt: 1 }}>
              Blood Type: {post.blood_type}
            </Typography>
            <Typography component="div" variant="body2">
              Quantity: {post.quantity}
            </Typography>
            <Typography component="div" variant="body2">
              Location: {post.location}
            </Typography>
            <Typography component="div" variant="body2">
              Status: {post.status}
            </Typography>
            {/* <Typography component="div" variant="body2">
              Posted by: {post.user.first_name} {post.user.last_name}
            </Typography> */}
            {post.urgent && (
              <Chip label="Urgent" color="error" size="small" sx={{ mt: 1 }} />
            )}
            <Divider sx={{ my: 1 }} /> {/* Divider to visually separate post details */}
          </Paper>
        </Box>
      ))}
    </Container>
  );
}