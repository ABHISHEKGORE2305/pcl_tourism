import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.isScrolled ? 'var(--bg-secondary)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px var(--shadow-color)' : 'none'};
  transition: all 0.3s ease;
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  overflow: hidden;
  height: ${props => props.isVisible ? 'auto' : '0'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
`;

const Logo = styled(motion(Link))`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.isScrolled ? 'var(--text-primary)' : 'white'};
  text-decoration: none;
  transition: color 0.3s ease;
  text-shadow: ${props => props.isScrolled ? 'none' : '2px 2px 4px rgba(0, 0, 0, 0.3)'};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion(Link))`
  color: ${props => props.isScrolled ? 'var(--text-primary)' : 'white'};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  text-shadow: ${props => props.isScrolled ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const ThemeToggleButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.isScrolled ? 'var(--text-primary)' : 'white'};
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-shadow: ${props => props.isScrolled ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.isScrolled ? 'var(--text-primary)' : 'white'};
  font-size: 1.5rem;
  text-shadow: ${props => props.isScrolled ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  padding: 2rem;
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
  }
`;

const MobileNavLink = styled(motion(Link))`
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Hide navbar as soon as user starts scrolling
      if (currentScrollY > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      isScrolled={isScrolled}
      isVisible={isVisible}
    >
      <NavContainer isVisible={isVisible}>
        <Logo
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          isScrolled={isScrolled}
        >
          PCL Tourism
        </Logo>

        <NavLinks>
          <NavLink to="/" isScrolled={isScrolled}>Home</NavLink>
          <NavLink to="/destinations" isScrolled={isScrolled}>Destinations</NavLink>
          <NavLink to="/about" isScrolled={isScrolled}>About</NavLink>
          <NavLink to="/contact" isScrolled={isScrolled}>Contact</NavLink>
          <NavLink to="/community" isScrolled={isScrolled}>Community</NavLink>
          <NavLink to="/profile" isScrolled={isScrolled}>Profile</NavLink>
          <ThemeToggleButton
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            isScrolled={isScrolled}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggleButton>
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          isScrolled={isScrolled}
        >
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </CloseButton>
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/destinations" onClick={() => setIsOpen(false)}>Destinations</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            <MobileNavLink to="/community" onClick={() => setIsOpen(false)}>Community</MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>Profile</MobileNavLink>
            <ThemeToggleButton
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </ThemeToggleButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar; 