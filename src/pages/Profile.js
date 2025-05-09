import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from '../components/ScrollAnimation';
import { FaUser, FaHeart, FaHistory, FaCalendarAlt, FaCog, FaMapMarkerAlt, FaStar, FaHotel, FaPlane, FaCar, FaUtensils, FaUserTie, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const ProfileContainer = styled.div`
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

const ProfileContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProfileHeader = styled.div`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const BookingCard = styled(motion.div)`
  background: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px var(--shadow-color);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BookingIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const BookingTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const BookingDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const BookingButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: var(--accent-hover);
  }
`;

const BookingStatus = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'confirmed':
        return 'var(--success-color)';
      case 'pending':
        return 'var(--warning-color)';
      case 'cancelled':
        return 'var(--error-color)';
      default:
        return 'var(--text-secondary)';
    }
  }};
  color: white;
`;

const BookingContent = styled.div`
  padding: 1.5rem;
`;

const BookingDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const BookingDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);

  &:last-child {
    margin-bottom: 0;
  }
`;

const BookingActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.primary ? 'var(--accent-color)' : 'var(--text-secondary)'};
  color: white;

  &:hover {
    background: ${props => props.primary ? 'var(--accent-hover)' : 'var(--text-primary)'};
  }
`;

const NoBookings = styled.div`
  text-align: center;
  padding: 3rem;
  background: var(--card-bg);
  border-radius: 15px;
  color: var(--text-secondary);
  font-size: 1.2rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled(motion.button)`
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
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: var(--bg-secondary);
  }
`;

const ModalTitle = styled.h2`
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const ModalDetails = styled.div`
  display: grid;
  gap: 1rem;
`;

const ModalDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  color: var(--text-primary);
`;

const ModalLabel = styled.span`
  font-weight: 500;
  color: var(--text-secondary);
`;

const ModalValue = styled.span`
  color: var(--text-primary);
`;

const StatusReason = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${props => {
    switch (props.status) {
      case 'cancelled':
        return 'rgba(255, 0, 0, 0.1)';
      case 'pending':
        return 'rgba(255, 165, 0, 0.1)';
      default:
        return 'rgba(0, 255, 0, 0.1)';
    }
  }};
  border-radius: 8px;
  color: var(--text-primary);
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Tab = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 'var(--accent-color)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'var(--accent-hover)' : 'var(--hover-color)'};
  }
`;

const ContentSection = styled.div`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px var(--shadow-color);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px var(--shadow-color);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
`;

const PreferencesForm = styled.form`
  display: grid;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
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

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  width: fit-content;

  &:hover {
    background: var(--accent-hover);
  }
`;

const ScheduleContainer = styled.div`
  display: grid;
  gap: 2rem;
`;

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddScheduleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: var(--accent-hover);
  }
`;

const ScheduleCard = styled(Card)`
  position: relative;
`;

const ScheduleDate = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ScheduleActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ScheduleActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.delete ? 'var(--error-color)' : 'var(--accent-color)'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.delete ? 'var(--error-hover)' : 'var(--accent-hover)'};
  }
`;

const ScheduleForm = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;

const ScheduleInput = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const ScheduleTextarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const Profile = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings] = useState([
    {
      id: 1,
      destination: 'Bali Paradise',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      status: 'confirmed',
      date: '2024-06-15',
      guests: 2,
      price: '$1,299',
      bookingId: 'BK123456',
      reason: 'Your booking has been confirmed and is ready for your trip.'
    },
    {
      id: 2,
      destination: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      status: 'pending',
      date: '2024-07-20',
      guests: 4,
      price: '$1,899',
      bookingId: 'BK123457',
      reason: 'Your booking is being processed. We will confirm within 24 hours.'
    },
    {
      id: 3,
      destination: 'Santorini Sunset',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      status: 'cancelled',
      date: '2024-08-10',
      guests: 2,
      price: '$1,599',
      bookingId: 'BK123458',
      reason: 'Booking was cancelled due to insufficient payment.'
    }
  ]);

  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState({
    travelStyle: 'adventure',
    preferredDestinations: ['beach', 'mountain'],
    budget: 'medium',
    preferredActivities: ['hiking', 'cultural'],
  });

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: 'Bali Trip',
      date: '2024-06-15',
      activities: [
        { time: '09:00', description: 'Arrival at Ngurah Rai Airport' },
        { time: '11:00', description: 'Check-in at hotel' },
        { time: '14:00', description: 'Visit Ubud Monkey Forest' },
        { time: '19:00', description: 'Dinner at local restaurant' }
      ],
      notes: 'Don\'t forget to bring sunscreen and swimwear'
    },
    {
      id: 2,
      title: 'Swiss Alps Adventure',
      date: '2024-07-20',
      activities: [
        { time: '08:00', description: 'Breakfast at hotel' },
        { time: '10:00', description: 'Hiking in the Alps' },
        { time: '13:00', description: 'Lunch at mountain restaurant' },
        { time: '16:00', description: 'Return to hotel' }
      ],
      notes: 'Bring hiking boots and warm clothes'
    }
  ]);

  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    activities: [{ time: '', description: '' }],
    notes: ''
  });

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: <FaCog /> },
    { id: 'wishlist', label: 'Wishlist', icon: <FaHeart /> },
    { id: 'history', label: 'Travel History', icon: <FaHistory /> },
    { id: 'schedule', label: 'Schedule Planner', icon: <FaCalendarAlt /> },
    { id: 'itineraries', label: 'Itineraries', icon: <FaCalendarAlt /> },
    { id: 'bookings', label: 'Bookings & Planning', icon: <FaCalendarAlt /> },
  ];

  // Sample data - replace with actual data from your backend
  const wishlistItems = [
    {
      id: 1,
      title: 'Bali Paradise',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      location: 'Bali, Indonesia',
      price: '$1,299',
    },
    {
      id: 2,
      title: 'Swiss Alps Adventure',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      location: 'Swiss Alps',
      price: '$1,899',
    },
  ];

  const travelHistory = [
    {
      id: 1,
      title: 'Tokyo Exploration',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      date: 'March 2023',
      rating: 5,
    },
    {
      id: 2,
      title: 'Paris Getaway',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      date: 'January 2023',
      rating: 4,
    },
  ];

  const itineraries = [
    {
      id: 1,
      title: 'Summer in Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      duration: '7 days',
      destinations: ['Athens', 'Santorini', 'Mykonos'],
    },
    {
      id: 2,
      title: 'Japan Adventure',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      duration: '10 days',
      destinations: ['Tokyo', 'Kyoto', 'Osaka'],
    },
  ];

  const bookingOptions = [
    {
      id: 1,
      title: 'Hotel Bookings',
      description: 'Find and book the perfect accommodation for your stay',
      icon: <FaHotel />,
      action: 'Search Hotels',
    },
    {
      id: 2,
      title: 'Flight Bookings',
      description: 'Search and book flights to your destination',
      icon: <FaPlane />,
      action: 'Search Flights',
    },
    {
      id: 3,
      title: 'Tour Packages',
      description: 'Discover and book exciting tour packages',
      icon: <FaMapMarkerAlt />,
      action: 'View Tours',
    },
    {
      id: 4,
      title: 'Local Guides',
      description: 'Hire experienced local guides for your trip',
      icon: <FaUserTie />,
      action: 'Find Guides',
    },
    {
      id: 5,
      title: 'Transportation',
      description: 'Book rental cars and local transport services',
      icon: <FaCar />,
      action: 'Book Transport',
    },
    {
      id: 6,
      title: 'Restaurant Reservations',
      description: 'Make reservations at top restaurants',
      icon: <FaUtensils />,
      action: 'Find Restaurants',
    },
  ];

  const handleCancelBooking = (bookingId) => {
    // Implement cancellation logic
    console.log('Cancelling booking:', bookingId);
  };

  const handleBookAgain = (bookingId) => {
    // Implement book again logic
    console.log('Booking again:', bookingId);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    setNewSchedule(prev => ({
      ...prev,
      activities: [...prev.activities, { time: '', description: '' }]
    }));
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...newSchedule.activities];
    updatedActivities[index][field] = value;
    setNewSchedule(prev => ({
      ...prev,
      activities: updatedActivities
    }));
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = newSchedule.activities.filter((_, i) => i !== index);
    setNewSchedule(prev => ({
      ...prev,
      activities: updatedActivities
    }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const newScheduleWithId = {
      ...newSchedule,
      id: schedules.length + 1
    };
    setSchedules(prev => [...prev, newScheduleWithId]);
    setNewSchedule({
      title: '',
      date: '',
      activities: [{ time: '', description: '' }],
      notes: ''
    });
    setIsAddingSchedule(false);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'preferences':
        return (
          <PreferencesForm>
            <FormGroup>
              <Label>Travel Style</Label>
              <Select
                name="travelStyle"
                value={preferences.travelStyle}
                onChange={handlePreferenceChange}
              >
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="cultural">Cultural</option>
                <option value="luxury">Luxury</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Budget Range</Label>
              <Select
                name="budget"
                value={preferences.budget}
                onChange={handlePreferenceChange}
              >
                <option value="low">Budget</option>
                <option value="medium">Mid-range</option>
                <option value="high">Luxury</option>
              </Select>
            </FormGroup>
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Preferences
            </Button>
          </PreferencesForm>
        );

      case 'wishlist':
        return (
          <Grid>
            {wishlistItems.map(item => (
              <Card
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardImage src={item.image} alt={item.title} />
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardMeta>
                    <span>
                      <FaMapMarkerAlt style={{ marginRight: '0.3rem' }} />
                      {item.location}
                    </span>
                    <span>{item.price}</span>
                  </CardMeta>
                </CardContent>
              </Card>
            ))}
          </Grid>
        );

      case 'history':
        return (
          <Grid>
            {travelHistory.map(item => (
              <Card
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardImage src={item.image} alt={item.title} />
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardMeta>
                    <span>{item.date}</span>
                    <span>
                      <FaStar style={{ color: 'gold', marginRight: '0.3rem' }} />
                      {item.rating}/5
                    </span>
                  </CardMeta>
                </CardContent>
              </Card>
            ))}
          </Grid>
        );

      case 'itineraries':
        return (
          <Grid>
            {itineraries.map(item => (
              <Card
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardImage src={item.image} alt={item.title} />
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>
                    <strong>Duration:</strong> {item.duration}
                  </CardText>
                  <CardText>
                    <strong>Destinations:</strong> {item.destinations.join(', ')}
                  </CardText>
                </CardContent>
              </Card>
            ))}
          </Grid>
        );

      case 'bookings':
        return (
          <Grid>
            {bookingOptions.map(option => (
              <BookingCard
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleBookingOptionClick(option.id)}
              >
                <CardContent>
                  <BookingIcon>{option.icon}</BookingIcon>
                  <BookingTitle>{option.title}</BookingTitle>
                  <BookingDescription>{option.description}</BookingDescription>
                  <BookingButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.action}
                  </BookingButton>
                </CardContent>
              </BookingCard>
            ))}
          </Grid>
        );

      case 'schedule':
        return (
          <ScheduleContainer>
            <ScheduleHeader>
              <h2>My Travel Schedules</h2>
              <AddScheduleButton
                onClick={() => setIsAddingSchedule(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus /> Add New Schedule
              </AddScheduleButton>
            </ScheduleHeader>

            {isAddingSchedule && (
              <ScheduleCard>
                <CardContent>
                  <CardTitle>Add New Schedule</CardTitle>
                  <ScheduleForm onSubmit={handleScheduleSubmit}>
                    <FormGroup>
                      <Label>Title</Label>
                      <ScheduleInput
                        type="text"
                        value={newSchedule.title}
                        onChange={(e) => setNewSchedule(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter schedule title"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Date</Label>
                      <ScheduleInput
                        type="date"
                        value={newSchedule.date}
                        onChange={(e) => setNewSchedule(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Activities</Label>
                      {newSchedule.activities.map((activity, index) => (
                        <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                          <ScheduleInput
                            type="time"
                            value={activity.time}
                            onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                            required
                          />
                          <ScheduleInput
                            type="text"
                            value={activity.description}
                            onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                            placeholder="Activity description"
                            required
                            style={{ flex: 1 }}
                          />
                          {index > 0 && (
                            <ScheduleActionButton
                              type="button"
                              delete
                              onClick={() => handleRemoveActivity(index)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaTrash />
                            </ScheduleActionButton>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={handleAddActivity}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add Activity
                      </Button>
                    </FormGroup>
                    <FormGroup>
                      <Label>Notes</Label>
                      <ScheduleTextarea
                        value={newSchedule.notes}
                        onChange={(e) => setNewSchedule(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Add any additional notes"
                      />
                    </FormGroup>
                    <ScheduleActions>
                      <Button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Schedule
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsAddingSchedule(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </Button>
                    </ScheduleActions>
                  </ScheduleForm>
                </CardContent>
              </ScheduleCard>
            )}

            <Grid>
              {schedules.map(schedule => (
                <ScheduleCard key={schedule.id}>
                  <CardContent>
                    <ScheduleDate>{new Date(schedule.date).toLocaleDateString()}</ScheduleDate>
                    <CardTitle>{schedule.title}</CardTitle>
                    <CardText>
                      {schedule.activities.map((activity, index) => (
                        <div key={index} style={{ marginBottom: '0.5rem' }}>
                          <strong>{activity.time}</strong> - {activity.description}
                        </div>
                      ))}
                    </CardText>
                    {schedule.notes && (
                      <CardText>
                        <strong>Notes:</strong> {schedule.notes}
                      </CardText>
                    )}
                    <ScheduleActions>
                      <ScheduleActionButton
                        delete
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash /> Delete
                      </ScheduleActionButton>
                    </ScheduleActions>
                  </CardContent>
                </ScheduleCard>
              ))}
            </Grid>
          </ScheduleContainer>
        );

      default:
        return null;
    }
  };

  const handleBookingOptionClick = (optionId) => {
    // Handle booking option click
    switch (optionId) {
      case 1:
        // Handle hotel booking
        console.log('Opening hotel booking...');
        break;
      case 2:
        // Handle flight booking
        console.log('Opening flight booking...');
        break;
      case 3:
        // Handle tour package booking
        console.log('Opening tour packages...');
        break;
      case 4:
        // Handle local guide hiring
        console.log('Opening local guides...');
        break;
      case 5:
        // Handle transportation booking
        console.log('Opening transportation booking...');
        break;
      case 6:
        // Handle restaurant reservations
        console.log('Opening restaurant reservations...');
        break;
      default:
        break;
    }
  };

  return (
    <ProfileContainer>
      <ScrollAnimation animation="fadeUp">
        <PageTitle>My Profile</PageTitle>
      </ScrollAnimation>

      <ProfileContent>
        <ProfileHeader>
          <ProfileImage>
            <img src="/images/om.jpg" alt="Profile" />
          </ProfileImage>
          <ProfileInfo>
            <ProfileName>om kudhale</ProfileName>
            <ProfileEmail>om@gmail.com</ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>

        <ScrollAnimation animation="fadeUp">
          <h2 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>My Bookings</h2>
        </ScrollAnimation>

        {bookings.length > 0 ? (
          <BookingsGrid>
            {bookings.map((booking) => (
              <ScrollAnimation key={booking.id} animation="fadeUp">
                <BookingCard whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={booking.image} 
                      alt={booking.destination} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <BookingStatus status={booking.status}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </BookingStatus>
                  </div>
                  <BookingContent>
                    <BookingTitle>{booking.destination}</BookingTitle>
                    <BookingDetails>
                      <BookingDetail>
                        <span>Booking ID</span>
                        <span>{booking.bookingId}</span>
                      </BookingDetail>
                      <BookingDetail>
                        <span>Date</span>
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </BookingDetail>
                      <BookingDetail>
                        <span>Guests</span>
                        <span>{booking.guests}</span>
                      </BookingDetail>
                      <BookingDetail>
                        <span>Price</span>
                        <span>{booking.price}</span>
                      </BookingDetail>
                    </BookingDetails>
                    <BookingActions>
                      <ActionButton
                        onClick={() => handleViewDetails(booking)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        primary
                      >
                        View Details
                      </ActionButton>
                      {booking.status === 'confirmed' && (
                        <ActionButton
                          onClick={() => handleCancelBooking(booking.bookingId)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </ActionButton>
                      )}
                      {booking.status === 'pending' && (
                        <ActionButton
                          onClick={() => handleCancelBooking(booking.bookingId)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </ActionButton>
                      )}
                      {booking.status === 'cancelled' && (
                        <ActionButton
                          onClick={() => handleBookAgain(booking.bookingId)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          primary
                        >
                          Book Again
                        </ActionButton>
                      )}
                    </BookingActions>
                  </BookingContent>
                </BookingCard>
              </ScrollAnimation>
            ))}
          </BookingsGrid>
        ) : (
          <NoBookings>
            <p>You haven't made any bookings yet.</p>
          </NoBookings>
        )}
      </ProfileContent>

      <AnimatePresence>
        {selectedBooking && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <CloseButton
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
              <ModalTitle>{selectedBooking.destination}</ModalTitle>
              <ModalDetails>
                <ModalDetail>
                  <ModalLabel>Booking ID</ModalLabel>
                  <ModalValue>{selectedBooking.bookingId}</ModalValue>
                </ModalDetail>
                <ModalDetail>
                  <ModalLabel>Status</ModalLabel>
                  <ModalValue>{selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</ModalValue>
                </ModalDetail>
                <ModalDetail>
                  <ModalLabel>Date</ModalLabel>
                  <ModalValue>{new Date(selectedBooking.date).toLocaleDateString()}</ModalValue>
                </ModalDetail>
                <ModalDetail>
                  <ModalLabel>Guests</ModalLabel>
                  <ModalValue>{selectedBooking.guests}</ModalValue>
                </ModalDetail>
                <ModalDetail>
                  <ModalLabel>Price</ModalLabel>
                  <ModalValue>{selectedBooking.price}</ModalValue>
                </ModalDetail>
                <StatusReason status={selectedBooking.status}>
                  <strong>Status Information:</strong>
                  <p>{selectedBooking.reason}</p>
                </StatusReason>
              </ModalDetails>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <TabsContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon}
            {tab.label}
          </Tab>
        ))}
      </TabsContainer>

      <ContentSection>
        {renderContent()}
      </ContentSection>
    </ProfileContainer>
  );
};

export default Profile; 