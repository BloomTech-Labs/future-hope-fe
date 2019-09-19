/*Config file to render Navbar based on route.
 */

//Basic readme
//route -> (1) settings (2) links
//default route listed last if route not specified.
//
//To add a link, create an object for a new route or
//select an existing one. Default is probaly what
//you are looking for 99% of the time.
//
//Add the new link to the links array.
//Enter href and text.
//auth is a boolean field -- true = display when user
//logged in -- false = hide when logged in.

const navConfig = {
  "/": {
    //root route
    color: "transparent",
    brand: "Future Hope School in the Sky",
    changeColorOnScroll: {
      set: true,
      height: 200,
      color: "white"
    },
    links: [
      {
        href: "/mentors",
        text: "View Mentors",
        auth: true
      },
      {
        href: "/mission",
        text: "Mission",
        auth: true
      },
      {
        href: "/login",
        text: "Login",
        auth: false
      },
      {
        href: "/signup",
        text: "Sign Up",
        auth: false
      }
    ]
  },
  "/mentors": {
    brand: "Future Hope School in the Sky",
    links: [
      {
        href: "/about",
        text: "About Us",
        auth: true
      },
      {
        href: "/faq",
        text: "How It Works",
        auth: true
      },
      {
        href: "/login",
        text: "Login",
        auth: false
      },
      {
        href: "/signup",
        text: "Sign Up",
        auth: false
      }
    ],
    color: "white"
  },
  default: {
    brand: "Future Hope School in the Sky",
    links: [
      {
        href: "/mentors",
        text: "View Mentors",
        auth: true
      },
      // {
      //   href: '#',
      //   text: 'Any Link You Want',
      //   auth: true
      // },
      {
        href: "/about",
        text: "About Us",
        auth: false
      },
      {
        href: "/faq",
        text: "How It Works",
        auth: false
      },
      {
        href: "/login",
        text: "Login",
        auth: false
      },
      {
        href: "/signup",
        text: "Sign Up",
        auth: false
      }
    ],
    color: "white"
  }
};

export default navConfig;
