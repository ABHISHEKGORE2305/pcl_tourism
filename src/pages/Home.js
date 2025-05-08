import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';

const HomeContainer = styled.div`
  padding-top: 0;
`;

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: var(--accent-hover);
  }
`;

const FeaturedSection = styled.section`
  padding: 5rem 2rem;
  background: var(--bg-primary);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturedCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${FeaturedCard}:hover & {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const CardText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;

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

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <VideoBackground>
          <Video autoPlay muted loop playsInline>
            <source src="videos/tourism.mp4" type="video/mp4" />
          </Video>
        </VideoBackground>
        <HeroContent>
          <ScrollAnimation animation="fadeUp">
            <Title>Discover the World</Title>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <Subtitle>Experience unforgettable adventures with PCL Tourism</Subtitle>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <CTAButton
              to="/destinations"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Destinations
            </CTAButton>
          </ScrollAnimation>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Featured Destinations</SectionTitle>
        <FeaturedGrid>
          {[
            {
              id: 1,
              title: 'Bali Paradise',
              description: 'Experience the perfect blend of culture and natural beauty.',
              image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
            },
            {
              id: 2,
              title: 'Swiss Alps',
              description: 'Discover the majestic beauty of the Swiss mountains.',
              image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            },
            {
              id: 3,
              title: 'Santorini Sunset',
              description: 'Witness the most beautiful sunsets in Greece.',
              image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
            },
          ].map((destination) => (
            <ScrollAnimation key={destination.id} animation="fadeUp">
              <FeaturedCard
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <CardImage src={destination.image} alt={destination.title} />
                <CardContent>
                  <CardTitle>{destination.title}</CardTitle>
                  <CardText>{destination.description}</CardText>
                  <CardButton to="/destinations">Learn More</CardButton>
                </CardContent>
              </FeaturedCard>
            </ScrollAnimation>
          ))}
        </FeaturedGrid>
      </FeaturedSection>

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
    </HomeContainer>
  );
};

export default Home; 