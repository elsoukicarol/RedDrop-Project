import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signupSchema from '../validators/SignupSchema';
import ReCAPTCHA from 'react-google-recaptcha';

interface SignupFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    console.log('Form submitted with data:', data);

    if (data.password !== data.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    // Exclude confirmPassword from the data sent to the backend
    const { confirmPassword, ...submitData } = data;

    console.log('Making API request...');
    try {
      const response = await axios.post('http://localhost:3001/api/user/signup', { ...submitData, recaptchaToken }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API response:', response);
      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token);
      navigate('/activate');
    } catch (error: any) {
      if (error.response) {
        console.error('There was a problem with the request:', error.response.status, error.response.data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Sheet
            sx={{
              width: 500,
              mx: 15,
              my: 15,
              py: 3,
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography level="h4" component="h1">
                Welcome to RedDrop!
                <hr style={{ width: '150px' }} />
              </Typography>
            </div>
            <Typography
              level="body-sm"
              sx={{
                textAlign: 'center',
                display: 'block',
                color: '#424242',
              }}
            >
              We are a vibrant community dedicated to saving lives through blood donation. Our mission is simple yet profound: to bridge the gap between generous donors and those in need.
            </Typography>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>First Name</FormLabel>
                <Input {...register('first_name')} name="first_name" type="text" placeholder="First Name" />
                <Typography level="body-xs" color="danger">
                  {errors.first_name?.message}
                </Typography>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>Last Name</FormLabel>
                <Input {...register('last_name')} name="last_name" type="text" placeholder="Last Name" />
                <Typography level="body-xs" color="danger">
                  {errors.last_name?.message}
                </Typography>
              </FormControl>
            </div>

            <div style={{ display: 'flex', gap: '60px', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <Input {...register('email')} name="email" type="email" placeholder="email@example.com" />
                <Typography level="body-xs" color="danger">
                  {errors.email?.message}
                </Typography>
              </FormControl>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <Input {...register('password')} name="password" type="password" placeholder="password" />
                <Typography level="body-xs" color="danger">
                  {errors.password?.message}
                </Typography>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Confirm Password</FormLabel>
                <Input {...register('confirmPassword')} name="confirmPassword" type="password" placeholder="Confirm Password" />
                <Typography level="body-xs" color="danger">
                  {errors.confirmPassword?.message}
                </Typography>
              </FormControl>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
              <ReCAPTCHA
                sitekey="6LccVOwpAAAAAPtuTDkxi-aXGFYm8stVCsHAQWnp"
                onChange={(token: string | null) => setRecaptchaToken(token)}
              />
            </div>

            <Button
              type="submit"
              sx={{
                mt: 1,
                width: 150,
                mx: 'auto',
                bgcolor: '#E53935',
                color: 'white',
                '&:hover': {
                  bgcolor: 'darkred',
                },
              }}
            >
              Sign Up
            </Button>

            <Typography
              endDecorator={<Link href="/login">Log in</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
              Already have an account?
            </Typography>
          </Sheet>
        </form>
        <Sheet
          sx={{
            borderRadius: '3% 0% 0% 3%',
            width: 500,
            height: 730,
            ml: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            boxShadow: 'md',
            backgroundImage: 'url(/img/donatebloodvertical.webp)',
            color: 'white',
            padding: 3,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <Typography
            level="h4"
            component="h1"
            sx={{
              textAlign: 'center',
              mb: 50,
              color: 'black',
              fontWeight: 'bold',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '2.5rem',
            }}
          >
            Welcome to Our Community of Heroes!
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 0,
              color: 'black',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '1rem',
              lineHeight: 1.5,
            }}
          >
            Thank you for your interest in saving lives with us!<br />
            Ready to make a difference?<br /> Let's get started!
          </Typography>
          <Button
            onClick={() => navigate('/login')}
            sx={{
              mb: -5,
              bgcolor: '#E53935',
              color: 'white',
              border: '#E53935',
              '&:hover': {
                bgcolor: 'darkred',
              },
            }}
          >
            Log In
          </Button>
        </Sheet>
      </div>
    </CssVarsProvider>
  );
};

export default SignUp;
