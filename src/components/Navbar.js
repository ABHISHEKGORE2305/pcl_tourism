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
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      isScrolled={isScrolled}
    >
      <NavContainer>
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
            <MobileNavLink
              to="/"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/destinations"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              Destinations
            </MobileNavLink>
            <MobileNavLink
              to="/about"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </MobileNavLink>
            <MobileNavLink
              to="/contact"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </MobileNavLink>
            <ThemeToggleButton
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </ThemeToggleButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar; 