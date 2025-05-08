import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from '../components/ScrollAnimation';

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
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--shadow-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const BookingImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const BookingTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
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
                  <BookingImage>
                    <img src={booking.image} alt={booking.destination} />
                    <BookingStatus status={booking.status}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </BookingStatus>
                  </BookingImage>
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
    </ProfileContainer>
  );
};

export default Profile; 