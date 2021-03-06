/* global window */
import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class HeaderLegacy extends PureComponent {
  state = {
    scrolled: false,
    fixed: false,
    active: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const scroll = window.scrollY || window.document.body.scrollTop;
    const scrolled = scroll > (this.props.distance || 0);
    const fixed = scroll >= (this.props.distance || 0);
    const active = scroll >= (this.props.active || 0);

    if (
      scrolled !== this.state.scrolled ||
      fixed !== this.state.fixed ||
      active !== this.state.active
    ) {
      this.setState({ scrolled, fixed, active });
    }
  };

  render() {
    const { scrolled, fixed, active } = this.state;
    const {
      height,
      offset,
      shadow,
      zIndex,
      background,
      defaultActive,
      dotBackground,
      children
    } = this.props;

    const desktopHeight = height.desktop || Number(height) || 0;
    const mobileHeight = height.mobile || desktopHeight;
    const tabletHeight = height.tablet || desktopHeight;

    return (
      <header>
        <div
          className={classNames('fixed-container', {
            scrolled,
            fixed,
            active: active || defaultActive,
            'show-logo': dotBackground
          })}
        >
          {children}
        </div>
        <style jsx>
          {`
            header {
              left: 0;
              top: 0;
              width: 100%;
              height: ${desktopHeight}px;
            }
            @media screen and (max-width: 960px) {
              header {
                height: ${tabletHeight}px;
              }
            }
            @media screen and (max-width: 640px) {
              header {
                height: ${mobileHeight}px;
              }
            }
            .fixed-container {
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              left: 0;
              z-index: ${zIndex || 1000};
              transition: box-shadow 0.5s ease, background 0.2s ease;
              ${dotBackground
                ? `
                background-image: radial-gradient(circle, #D7D7D7, #D7D7D7 1px, #FFF 1px, #FFF);
                background-size: 28px 28px;
              `
                : 'background: rgba(255, 255, 255, 0);'};
            }
            .fixed {
              position: fixed;
              top: ${offset || 0}px;
              pointer-events: auto;
            }
            .scrolled {
              position: fixed;
              top: ${offset || 0}px;
            }
            .active {
              background: ${background || 'rgba(255, 255, 255, 0.98)'};
              ${shadow
                ? 'box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);'
                : ''} pointer-events: auto;
            }
          `}
        </style>
      </header>
    );
  }
}
