import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';

const DestinationsContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: var(--bg-primary);
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin: 2rem 0;
  color: var(--text-primary);
  padding: 0 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? 'var(--accent-color)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px var(--shadow-color);

  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const DestinationCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${DestinationCard}:hover & img {
    transform: scale(1.1);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 25px;
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
  margin-top: 4rem;
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

const BookNowButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-hover);
  }
`;

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    specialRequests: '',
  });

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'beach', name: 'Beach' },
    { id: 'mountain', name: 'Mountain' },
    { id: 'city', name: 'City' },
    { id: 'cultural', name: 'Cultural' },
  ];

  const destinations = [
    {
      id: 1,
      title: 'Bali Paradise',
      description: 'Experience the perfect blend of culture and natural beauty in this tropical paradise.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      price: '$1,299',
      category: 'beach',
    },
    {
      id: 2,
      title: 'Swiss Alps',
      description: 'Discover the majestic beauty of the Swiss mountains and enjoy world-class skiing.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      price: '$1,899',
      category: 'mountain',
    },
    {
      id: 3,
      title: 'Tokyo Adventure',
      description: 'Immerse yourself in the vibrant culture and modern technology of Japan\'s capital.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      price: '$2,199',
      category: 'city',
    },
    {
      id: 4,
      title: 'Santorini Sunset',
      description: 'Witness the most beautiful sunsets in Greece from this iconic island.',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      price: '$1,599',
      category: 'beach',
    },
    {
      id: 5,
      title: 'Kyoto Temples',
      description: 'Explore ancient temples and traditional Japanese culture in this historic city.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      price: '$1,799',
      category: 'cultural',
    },
    {
      id: 6,
      title: 'New York City',
      description: 'Experience the energy of the city that never sleeps.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      price: '$1,999',
      category: 'city',
    },
  ];

  const filteredDestinations = selectedCategory === 'all'
    ? destinations
    : destinations.filter(dest => dest.category === selectedCategory);

  const handleBookingClick = (destination) => {
    setSelectedDestination(destination);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '1',
      specialRequests: '',
    });
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission here
    console.log('Booking submitted:', { destination: selectedDestination, ...bookingData });
    handleCloseModal();
  };

  return (
    <DestinationsContainer>
      <ScrollAnimation animation="fadeUp">
        <PageTitle>Explore Our Destinations</PageTitle>
      </ScrollAnimation>

      <FilterContainer>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterContainer>

      <DestinationsGrid>
        <AnimatePresence mode="wait">
          {filteredDestinations.map((destination) => (
            <ScrollAnimation key={destination.id} animation="fadeUp">
              <DestinationCard
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <CardImage>
                  <img src={destination.image} alt={destination.title} />
                  <CategoryBadge>
                    {categories.find(cat => cat.id === destination.category)?.name}
                  </CategoryBadge>
                </CardImage>
                <CardContent>
                  <CardTitle>{destination.title}</CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                  <Price>From {destination.price}</Price>
                  <BookNowButton
                    onClick={() => handleBookingClick(destination)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </BookNowButton>
                </CardContent>
              </DestinationCard>
            </ScrollAnimation>
          ))}
        </AnimatePresence>
      </DestinationsGrid>

      <AnimatePresence>
        {selectedDestination && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
              <h2>Book Your Trip to {selectedDestination.title}</h2>
              <BookingForm onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select
                    id="guests"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Input
                    type="text"
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or preferences?"
                  />
                </FormGroup>
                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm Booking
                </SubmitButton>
              </BookingForm>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

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
    </DestinationsContainer>
  );
};

export default Destinations; 