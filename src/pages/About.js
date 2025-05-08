import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import CountUp from 'react-countup';

const AboutContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: var(--bg-primary);
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--accent-color) 0%, transparent 100%);
    opacity: 0.1;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const MissionCard = styled(motion.div)`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const MissionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const MissionTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const MissionText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const TeamSection = styled.section`
  padding: 4rem 2rem;
  background: var(--bg-secondary);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamMember = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MemberImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

`;

const MemberInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  background: var(--bg-secondary);
  padding: 4rem 2rem;
  color: var(--text-primary);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: var(--text-secondary);
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-color);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: var(--bg-primary);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Abhishek Gore',
      role: 'Lead Developer',
      bio: 'With over 20 years of experience in the industry, Abhishek leads our team with passion and expertise.',
      image: 'images/abhi.jpg',
    },
    {
      id: 2,
      name: 'Ronak Shah',
      role: 'Director',
      bio: 'Ronak ensures every project is perfectly planned and executed with attention to detail.',
      image: 'images/ronak.jpg',
    },
    {
      id: 3,
      name: 'Aditya Katepallewar',
      role: 'Useless fellow',
      bio: 'Does nothing',
      image: 'images/adi.jpg',
    },
  ];

  const stats = [
    {
      id: 1,
      number: 10000,
      label: 'Happy Travelers',
      icon: '👥',
      suffix: '+',
    },
    {
      id: 2,
      number: 150,
      label: 'Destinations',
      icon: '🌍',
      suffix: '+',
    },
    {
      id: 3,
      number: 95,
      label: 'Success Rate',
      icon: '⭐',
      suffix: '%',
    },
    {
      id: 4,
      number: 24,
      label: 'Hours Support',
      icon: '⏰',
      suffix: '/7',
    },
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <ScrollAnimation animation="fadeUp">
          <HeroTitle>Our Story</HeroTitle>
        </ScrollAnimation>
        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <HeroSubtitle>
            Creating unforgettable travel experiences since 2010. We believe in making travel accessible,
            enjoyable, and meaningful for everyone.
          </HeroSubtitle>
        </ScrollAnimation>
      </HeroSection>

      <StatsSection>
        <ScrollAnimation animation="fadeUp">
          <SectionTitle>Our Impact</SectionTitle>
        </ScrollAnimation>
        <StatsGrid>
          {stats.map((stat) => (
            <ScrollAnimation key={stat.id} animation="fadeUp">
              <StatCard whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            </ScrollAnimation>
          ))}
        </StatsGrid>
      </StatsSection>

      <ContentSection>
        <ScrollAnimation animation="fadeUp">
          <SectionTitle>Our Mission</SectionTitle>
        </ScrollAnimation>
        <MissionGrid>
          <ScrollAnimation animation="fadeUp">
            <MissionCard whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <MissionIcon>🌍</MissionIcon>
              <MissionTitle>Global Exploration</MissionTitle>
              <MissionText>
                We help travelers discover the world's most beautiful destinations while promoting
                sustainable tourism practices.
              </MissionText>
            </MissionCard>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <MissionCard whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <MissionIcon>🤝</MissionIcon>
              <MissionTitle>Customer First</MissionTitle>
              <MissionText>
                Your satisfaction is our priority. We provide personalized service and support
                throughout your journey.
              </MissionText>
            </MissionCard>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <MissionCard whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <MissionIcon>💫</MissionIcon>
              <MissionTitle>Quality Experience</MissionTitle>
              <MissionText>
                We carefully curate each destination and activity to ensure the highest quality
                experience for our travelers.
              </MissionText>
            </MissionCard>
          </ScrollAnimation>
        </MissionGrid>
      </ContentSection>

      <TeamSection>
        <ScrollAnimation animation="fadeUp">
          <SectionTitle>Meet Our Team</SectionTitle>
        </ScrollAnimation>
        <TeamGrid>
          {teamMembers.map((member) => (
            <ScrollAnimation key={member.id} animation="fadeUp">
              <TeamMember whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <MemberImage src={member.image} alt={member.name} style={(member.name === 'Ronak Shah') ? { objectPosition: 'top' } : { objectPosition: 'center' }} />
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberBio>{member.bio}</MemberBio>
                </MemberInfo>
              </TeamMember>
            </ScrollAnimation>
          ))}
        </TeamGrid>
      </TeamSection>

      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>About PCL Tourism</h3>
            <p>We are dedicated to providing unforgettable travel experiences and creating memories that last a lifetime.</p>
            <SocialLinks>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <FooterLinks>
              <li>📍 123 Travel Street, City</li>
              <li>📞 +1 234 567 890</li>
              <li>✉️ info@pcltourism.com</li>
              <li>⏰ Mon-Fri: 9AM - 6PM</li>
            </FooterLinks>
          </FooterSection>
        </FooterContent>

        <Copyright>
          © {new Date().getFullYear()} PCL Tourism. All rights reserved.
        </Copyright>
      </Footer>
    </AboutContainer>
  );
};

export default About; 