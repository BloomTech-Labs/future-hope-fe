import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

// core components
import { parallaxStyle } from "./styles";

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    var windowScrollTop = window.pageYOffset / 3;
    this.state = {
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    };
  }
  componentDidMount() {
    var windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
    window.addEventListener("scroll", this.resetTransform);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.resetTransform);
  }
  resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
  };
  render() {
    const {
      classes,
      filter,
      className,
      children,
      style,
      image,
      small
    } = this.props;
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className]: className !== undefined
    });
    return (
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: "url(" + image + ")",
          ...this.state
        }}
      >
        {children}
      </div>
    );
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool
};

export default withStyles(parallaxStyle)(Parallax);
