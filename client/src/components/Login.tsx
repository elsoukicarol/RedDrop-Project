import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signinSchema from '../validators/SigninSchema';
import ReCAPTCHA from 'react-google-recaptcha';

interface SigninFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>({
    resolver: yupResolver(signinSchema),
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/user/login',
        { ...data, recaptchaToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token);
      navigate('/main');
    } catch (error: any) {
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Sheet
          sx={{
            borderRadius: '0% 3% 3% 0%',
            width: 500,
            height: 730,
            mr: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
              mb: 65,
              color: 'black',
              fontWeight: 'bold',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '2.5rem',
            }}
          >
            Welcome Back Hero!
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'black',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '1rem',
              lineHeight: 1.5,
            }}
          >
            Ready to make a difference? <br />
            Sign up now
          </Typography>
          <Button
            onClick={() => navigate('/signup')}
            sx={{
              mb: -15,
              my: 1,
              bgcolor: '#E53935',
              color: 'white',
              border: '#E53935',
              '&:hover': {
                bgcolor: 'darkred',
              },
            }}
          >
            Sign Up
          </Button>
        </Sheet>
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography level="h4" component="h1">
                Sign in into RedDrop!
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
              We've Missed You!<br />
              Ready to continue making a difference? <br />
              Sign in to your account and let's keep saving lives together!
            </Typography>

            <div
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></div>

            <div
              style={{
                display: 'flex',
                gap: '60px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register('email')}
                  name="email"
                  type="email"
                  placeholder="elsoukicarol@email.com"
                />
                <Typography level="body-xs" color="danger">
                  {errors.email?.message}
                </Typography>
              </FormControl>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password')}
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <Typography level="body-xs" color="danger">
                  {errors.password?.message}
                </Typography>
              </FormControl>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <ReCAPTCHA
              sitekey="6LccVOwpAAAAAPtuTDkxi-aXGFYm8stVCsHAQWnp"
              onChange={(token: React.SetStateAction<string | null>) => setRecaptchaToken(token)}
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
              Login
            </Button>

            <Typography
              endDecorator={<Link href="/signup">Sign Up</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
              Don't have an account?
            </Typography>
          </Sheet>
        </form>
      </div>
    </CssVarsProvider>
  );
};

export default Login;
