import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WhatsAppButton from '../components/WhatsAppButton'; // Import the WhatsAppButton component

const tiers = [
  {
    title: 'Mes',
    price: '21000',
    description: [
      'Clases guiadas con nuestros entrenadores',
      'Acceso completo al training center por 31 días',

    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Familiar',
    subheader: 'Recommended',
    price: '19000',
    description: [
      'Clases guiadas con nuestros entrenadores',
      'Acceso completo al training center por 31 días',
      'Descuento familiar',

    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Colegiales',
    price: '15000',
    description: [
      'Clases guiadas con nuestros entrenadores',
      'Acceso completo al training center por 31 días',
      'Descuento colegial',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Quincena',
    price: '12000',
    description: [
      'Clases guiadas con nuestros entrenadores',
      'Acceso a nuestro training center por 15 días.'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Semana',
    price: '6500',
    description: [
      'Clases guiadas con nuestros entrenadores',
      'Acceso a nuestro training center por 8 días.'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Sesión',
    price: '2500',
    description: [
      'Clases guiadas con nuestros entrenadores',
      'Acceso a nuestro training center por 1 día.'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

export default function Pricing() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" sx={{ color: (theme) => theme.palette.success.main, }}>
          Precios
        </Typography>
        <Typography variant="body1" sx={{ color: 'white' }}>
          Aquí puedes consultar nuestros planes. <br />
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'Familiar' && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        borderColor: 'hsla(220, 60%, 99%, 0.3)',
                        backgroundColor: 'hsla(220, 60%, 99%, 0.1)',
                        '& .MuiChip-label': {
                          color: 'hsl(0, 0%, 100%)',
                        },
                        '& .MuiChip-icon': {
                          color: 'primary.light',
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    ₡{tier.price}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color: 'primary.main',
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      component={'span'}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ mt: 'auto' }}>
                <WhatsAppButton
                  phoneNumber="87738143" // Replace with your phone number
                  message={`Hola, estoy interesado(a) en el plan ${tier.title}.`}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
