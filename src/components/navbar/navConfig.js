/*Config file to render Navbar based on route.
*/

const navConfig = {
  '/': { //root route
    color: 'transparent',
    brand: "Future Hope School in the Sky",
    changeColorOnScroll: {
      set: true,
      height: 200,
      color: "white"
    },
    links: {
      1: {
        href: '/mentors',
        text: 'View Mentors'
        },
      2: {
        href: '/mission',
        text: 'Mission'
      },
      3: {
        href: '/login',
        text: 'Login'
      },
      4: {
        href: '/signup',
        text: 'Sign Up'
      },
    },

  },
  '/mentors': {
    brand: "Future Hope School in the Sky",
    links: {
      1: {
        href: '/about',
        text: 'About Us'
      },
    2: {
      href: '/faq',
      text: 'How It Works'
    },
    3: {
      href: '/login',
      text: 'Login'
    },
    4: {
      href: '/signup',
      text: 'Sign Up'
    },
    }, 
    color: 'white'
  },
  'default': {
    brand: "Future Hope School in the Sky",
    links: {
      1: {
        href: '/mentors',
        text: 'View Mentors'
      },
    2: {
      href: '/faq',
      text: 'How It Works'
    },
    3: {
      href: '/login',
      text: 'Login'
    },
    4: {
      href: '/signup',
      text: 'Sign Up'
    },
    }, 
    color: 'white'
  }
};

export default navConfig;