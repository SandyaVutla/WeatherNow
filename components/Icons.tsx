
import React from 'react';

type IconProps = {
  className?: string;
};

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.5A5.5 5.5 0 018.5 10H17a5 5 0 010 10H8.5A5.5 5.5 0 013 15.5z" />
  </svg>
);

export const RainIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.5A5.5 5.5 0 018.5 10H17a5 5 0 010 10H8.5A5.5 5.5 0 013 15.5zM8 19v1m4-1v1m4-1v1" />
  </svg>
);

export const SnowIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.5A5.5 5.5 0 018.5 10H17a5 5 0 010 10H8.5A5.5 5.5 0 013 15.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5l-1.5 1.5m3 0L12 17.5m0 0V20m-1.5-4l-1.5-1.5m3 0l1.5-1.5m-3 0h3m-3 0h-3" />
  </svg>
);

export const StormIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.5A5.5 5.5 0 018.5 10H17a5 5 0 010 10H8.5A5.5 5.5 0 013 15.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 19l-2-4h4l-2 4z" />
  </svg>
);

export const FogIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.5A5.5 5.5 0 018.5 10H17a5 5 0 010 10H8.5A5.5 5.5 0 013 15.5zM4 20h16M4 18h16" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
