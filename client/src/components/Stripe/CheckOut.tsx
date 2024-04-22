import React, { useEffect, useState } from "react";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const stripePromise = loadStripe(
  "pk_test_51P7yRtP01tJVv9NcqWT9esfkt40ZF0Q171pyTVVFMEc9Ff7BrYznyhpovAJFDIHcAXxGyduWX6AHuEvoljkrkJYb006ehA1e5A"
);

interface Charity {
  id: number; // Add charity_id to the Charity interface
  charity_name: string;
  picture: string;
  description: string;
}

const CheckoutForm: any = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [charity, setCharity] = useState<Charity | null>(null);

  useEffect(() => {
    const fetchCharity = async () => {
      const charityIdRaw = localStorage.getItem("charityId");
      const charityId = charityIdRaw ? parseInt(charityIdRaw, 10) : null;
      if (charityId) {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            console.error("Access token is missing");
            return;
          }
          const response = await axios.get(
            `http://localhost:3001/api/charities/charity/${charityId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          setCharity(response.data[0]);
        } catch (error) {
          console.error("Failed to fetch charity details:", error);
        }
      }
    };
    fetchCharity();
  }, []);

  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const amountInCents = parseInt(amount);
    const charityIdRaw = localStorage.getItem("charityId");
    const charityId = charityIdRaw ? parseInt(charityIdRaw, 10) : null;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token is missing");
      return;
    }
    const decoded = jwtDecode<{ sub: number }>(token);
    const user_id = decoded.sub;
    console.log(charityId);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/stripe/create-payment-intent",
        {
          amount: amountInCents,
          currency: currency,
          user_id: user_id,
          charity_id: charityId,
        }
      );
      const clientSecret = response.data.clientSecret;
      console.log("Received clientSecret:", clientSecret);

      if (!clientSecret) {
        console.error("Client secret is undefined");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name,
              email,
            },
          },
        });

        console.log(paymentResult);

        if (paymentResult.error) {
          console.error("Payment error:", paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            console.log("Payment succeeded:", paymentResult.paymentIntent);
          }
        }
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  console.log(charity);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Charity Information
            </Typography>
            {charity && (
              <Card raised sx={{ width: 1 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={charity.picture}
                  alt={`Picture of ${charity.charity_name}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {charity.charity_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {charity.description}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Donation Details
            </Typography>
            <TextField label="Email" type="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <TextField label="Cardholder name" type="text" variant="outlined" value={name} onChange={e => setName(e.target.value)} fullWidth />
            <TextField label="Amount" type="number" variant="outlined" value={amount} onChange={e => setAmount(e.target.value)} fullWidth />
            <FormControl fullWidth>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                id="currency"
                value={currency}
                label="Currency"
                onChange={e => setCurrency(e.target.value)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="LBP">LBP</MenuItem>
              </Select>
            </FormControl>
            <CardElement />
            <FormControlLabel
              control={<Checkbox checked={saveCard} onChange={e => setSaveCard(e.target.checked)} name="saveCard" color="primary" />}
              label="Save this card for next time"
            />
            <Button type="submit" variant="contained" color="primary" disabled={!stripe} fullWidth>
              Donate
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

const StripeContainer: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeContainer;
