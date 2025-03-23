import React from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack,
  Card,
  SimpleGrid,
  Center,
  Box,
  ThemeIcon,
  rem,
  Paper,
} from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { 
  IconRocket,
  IconPhoto,
  IconChartBar,
  IconMap,
  IconCloud,
  IconDatabase,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

// Custom styles
const useStyles = createStyles((theme) => ({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',

    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  },

  neonButton: {
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 20px rgba(0, 149, 255, 0.2)',
    transition: 'all 0.2s ease',

    '&:hover': {
      boxShadow: '0 0 30px rgba(0, 149, 255, 0.4)',
      border: '1px solid rgba(0, 149, 255, 0.4)',
      transform: 'translateY(-1px)',
    },
  },

  neonText: {
    textShadow: '0 0 10px rgba(0, 149, 255, 0.5)',
  },

  heroSection: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at top right, rgba(0, 149, 255, 0.1) 0%, transparent 60%)',
      pointerEvents: 'none',
    },
  },

  featureIcon: {
    boxShadow: '0 0 20px rgba(0, 149, 255, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.2)',
  },

  gradientBorder: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      background: 'linear-gradient(45deg, rgba(0, 149, 255, 0.5), rgba(0, 247, 255, 0.5))',
      borderRadius: theme.radius.md,
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.2s ease',
    },
    '&:hover::before': {
      opacity: 1,
    },
  },
}));

const features = [
  {
    icon: IconRocket,
    title: 'Mission Management',
    description: 'Plan and execute astronomical missions with precision and ease',
  },
  {
    icon: IconPhoto,
    title: 'Asset Processing',
    description: 'Process and analyze astronomical imagery and data',
  },
  {
    icon: IconChartBar,
    title: 'Data Analysis',
    description: 'Powerful tools for analyzing mission data and results',
  },
  {
    icon: IconMap,
    title: 'Location Tracking',
    description: 'Track and manage observation locations globally',
  },
  {
    icon: IconCloud,
    title: 'Cloud Storage',
    description: 'Secure cloud storage for all your mission assets',
  },
  {
    icon: IconDatabase,
    title: 'Data Organization',
    description: 'Organize data across organizations, projects, and missions',
  },
];

export function Home() {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Paper 
          className={cx(classes.glassCard, classes.gradientBorder)}
          p="xl" 
          radius="md"
        >
          <Stack gap="xs">
            <Title className={classes.neonText}>Welcome to Cursed Web Template</Title>
            <Text c="gray.2">A simple placeholder web application</Text>
          </Stack>
        </Paper>

        <Card className={classes.glassCard} shadow="sm" p="xl">
          <Center>
            <Stack align="center" gap="lg" maw={600}>
              <Title order={2} className={classes.neonText} ta="center">
                This is a placeholder home page
              </Title>
              <Text c="dimmed" ta="center">
                This template can be used as a starting point for your web application.
                Navigate to different sections using the sidebar.
              </Text>
              <Button 
                className={classes.neonButton}
                size="lg"
                onClick={() => navigate('/logs')}
              >
                View Log Entries
              </Button>
            </Stack>
          </Center>
        </Card>

        <Box py={rem(40)}>
          <Stack gap={50}>
            <Stack gap="xs" align="center">
              <Title order={2} className={classes.neonText}>Features</Title>
              <Text c="dimmed" ta="center" maw={600}>
                Here are some of the features this template provides
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30}>
              {features.map((feature) => (
                <Paper 
                  key={feature.title} 
                  className={cx(classes.glassCard, classes.gradientBorder)}
                  p="md" 
                  radius="md"
                >
                  <Group>
                    <ThemeIcon
                      size={44}
                      radius="md"
                      className={classes.featureIcon}
                    >
                      <feature.icon size={rem(26)} stroke={1.5} />
                    </ThemeIcon>
                    <Box>
                      <Text size="lg" fw={500} mb={5} className={classes.neonText}>
                        {feature.title}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {feature.description}
                      </Text>
                    </Box>
                  </Group>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}