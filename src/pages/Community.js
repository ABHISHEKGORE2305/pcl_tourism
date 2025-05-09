import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from '../components/ScrollAnimation';
import { FaStar, FaCamera, FaBook, FaComments, FaUsers, FaHeart, FaComment, FaShare } from 'react-icons/fa';

const CommunityContainer = styled.div`
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

const CommunityContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: var(--card-bg);
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: gold;
`;

const InteractionBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const InteractionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--text-primary);
  }
`;

const ForumPost = styled(Card)`
  margin-bottom: 1rem;
`;

const MeetupCard = styled(Card)`
  position: relative;
`;

const MeetupDate = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Community = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  const tabs = [
    { id: 'reviews', label: 'Reviews & Ratings', icon: <FaStar /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <FaCamera /> },
    { id: 'blogs', label: 'Travel Blogs', icon: <FaBook /> },
    { id: 'forums', label: 'Forums', icon: <FaComments /> },
    { id: 'meetups', label: 'Meetups & Tours', icon: <FaUsers /> },
  ];

  // Sample data - replace with actual data from your backend
  const reviews = [
    {
      id: 1,
      user: {
        name: 'Abhishek',
        avatar: '/images/abhi.jpg',
      },
      destination: 'Bali Paradise',
      rating: 5,
      comment: 'Amazing experience! The beaches were pristine and the local culture was fascinating.',
      date: '2024-03-15',
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      user: {
        name: 'Ronak',
        avatar: '/images/ronak.jpg',
      },
      destination: 'Swiss Alps',
      rating: 4,
      comment: 'Great hiking trails and breathtaking views. Would definitely recommend!',
      date: '2024-03-10',
      likes: 18,
      comments: 3,
    },
  ];

  const photos = [
    {
      id: 1,
      user: {
        name: 'Om',
        avatar: '/images/om.jpg',
      },
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      caption: 'Sunset at Bali Beach',
      likes: 156,
      comments: 23,
    },
    {
      id: 2,
      user: {
        name: 'Adi',
        avatar: '/images/adi.jpg',
      },
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      caption: 'Morning in the Swiss Alps',
      likes: 203,
      comments: 31,
    },
  ];

  const blogs = [
    {
      id: 1,
      user: {
        name: 'Abhishek',
        avatar: '/images/abhi.jpg',
      },
      title: 'My Journey Through Southeast Asia',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Exploring the hidden gems of Thailand, Vietnam, and Cambodia...',
      date: '2024-03-12',
      likes: 89,
      comments: 15,
    },
    {
      id: 2,
      user: {
        name: 'Ronak',
        avatar: '/images/ronak.jpg',
      },
      title: 'A Month in Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      excerpt: 'From Tokyo to Kyoto, experiencing the perfect blend of tradition and modernity...',
      date: '2024-03-08',
      likes: 112,
      comments: 24,
    },
  ];

  const forumPosts = [
    {
      id: 1,
      user: {
        name: 'Om',
        avatar: '/images/om.jpg',
      },
      title: 'Best Time to Visit Bali?',
      content: 'Planning a trip to Bali next year. What\'s the best time to visit considering weather and crowds?',
      category: 'Travel Planning',
      replies: 12,
      views: 245,
    },
    {
      id: 2,
      user: {
        name: 'Adi',
        avatar: '/images/adi.jpg',
      },
      title: 'Solo Female Travel Tips',
      content: 'Looking for advice on solo female travel in Europe. Any recommendations for safe and friendly destinations?',
      category: 'Travel Tips',
      replies: 18,
      views: 312,
    },
  ];

  const meetups = [
    {
      id: 1,
      title: 'Tokyo Food Tour',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      date: '2024-04-15',
      location: 'Tokyo, Japan',
      participants: 12,
      maxParticipants: 20,
      organizer: 'Abhishek\'s Travel Group',
    },
    {
      id: 2,
      title: 'Paris Photography Walk',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      date: '2024-04-20',
      location: 'Paris, France',
      participants: 8,
      maxParticipants: 15,
      organizer: 'Ronak\'s Photography Club',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'reviews':
        return (
          <Grid>
            {reviews.map(review => (
              <Card key={review.id}>
                <CardContent>
                  <UserInfo>
                    <UserAvatar src={review.user.avatar} alt={review.user.name} />
                    <div>
                      <UserName>{review.user.name}</UserName>
                      <Rating>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color={i < review.rating ? 'gold' : 'gray'} />
                        ))}
                      </Rating>
                    </div>
                  </UserInfo>
                  <CardTitle>{review.destination}</CardTitle>
                  <CardText>{review.comment}</CardText>
                  <CardMeta>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </CardMeta>
                  <InteractionBar>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaHeart /> {review.likes}
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaComment /> {review.comments}
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaShare /> Share
                    </InteractionButton>
                  </InteractionBar>
                </CardContent>
              </Card>
            ))}
          </Grid>
        );

      case 'gallery':
        return (
          <Grid>
            {photos.map(photo => (
              <Card key={photo.id}>
                <CardImage src={photo.image} alt={photo.caption} />
                <CardContent>
                  <UserInfo>
                    <UserAvatar src={photo.user.avatar} alt={photo.user.name} />
                    <UserName>{photo.user.name}</UserName>
                  </UserInfo>
                  <CardText>{photo.caption}</CardText>
                  <InteractionBar>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaHeart /> {photo.likes}
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaComment /> {photo.comments}
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaShare /> Share
                    </InteractionButton>
                  </InteractionBar>
                </CardContent>
              </Card>
            ))}
          </Grid>
        );

      case 'blogs':
        return (
          <Grid>
            {blogs.map(blog => (
              <Card key={blog.id}>
                <CardImage src={blog.image} alt={blog.title} />
                <CardContent>
                  <UserInfo>
                    <UserAvatar src={blog.user.avatar} alt={blog.user.name} />
                    <UserName>{blog.user.name}</UserName>
                  </UserInfo>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardText>{blog.excerpt}</CardText>
                  <CardMeta>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </CardMeta>
                  <InteractionBar>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaHeart /> {blog.likes}
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaComment /> {blog.comments}
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaShare /> Share
                    </InteractionButton>
                  </InteractionBar>
                </CardContent>
              </Card>
            ))}
          </Grid>
        );

      case 'forums':
        return (
          <Grid>
            {forumPosts.map(post => (
              <ForumPost key={post.id}>
                <CardContent>
                  <UserInfo>
                    <UserAvatar src={post.user.avatar} alt={post.user.name} />
                    <UserName>{post.user.name}</UserName>
                  </UserInfo>
                  <CardTitle>{post.title}</CardTitle>
                  <CardText>{post.content}</CardText>
                  <CardMeta>
                    <span>Category: {post.category}</span>
                    <span>{post.replies} replies • {post.views} views</span>
                  </CardMeta>
                </CardContent>
              </ForumPost>
            ))}
          </Grid>
        );

      case 'meetups':
        return (
          <Grid>
            {meetups.map(meetup => (
              <MeetupCard key={meetup.id}>
                <CardImage src={meetup.image} alt={meetup.title} />
                <MeetupDate>{new Date(meetup.date).toLocaleDateString()}</MeetupDate>
                <CardContent>
                  <CardTitle>{meetup.title}</CardTitle>
                  <CardMeta>
                    <span>{meetup.location}</span>
                    <span>{meetup.participants}/{meetup.maxParticipants} participants</span>
                  </CardMeta>
                  <CardText>Organized by {meetup.organizer}</CardText>
                  <InteractionBar>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      Join Meetup
                    </InteractionButton>
                    <InteractionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FaShare /> Share
                    </InteractionButton>
                  </InteractionBar>
                </CardContent>
              </MeetupCard>
            ))}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <CommunityContainer>
      <ScrollAnimation animation="fadeUp">
        <PageTitle>Travel Community</PageTitle>
      </ScrollAnimation>

      <CommunityContent>
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

        {renderContent()}
      </CommunityContent>
    </CommunityContainer>
  );
};

export default Community; 