import { css, keyframes } from '@emotion/core';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export default css`
  .rc-notification {
    position: fixed;
    z-index: 1000;
  }
  .rc-notification-notice {
    background: #fff;
    display: block;
    width: auto;
    line-height: 1.5;
    position: relative;
    padding: 0;
    border-radius: 0;
    background: none;
    margin: 0;
    border: none;
    box-shadow: none;

    & + & {
      margin-top: 16px;
    }
  }
  .rc-notification-notice-closable {
    padding-right: 20px;
  }
  .rc-notification-notice-close {
    position: absolute;
    right: 5px;
    top: 3px;
    color: #000;
    cursor: pointer;
    outline: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    text-decoration: none;
  }
  .rc-notification-notice-close-x:after {
    content: '×';
  }
  .rc-notification-notice-close:hover {
    opacity: 1;
    filter: alpha(opacity=100);
    text-decoration: none;
  }
  .rc-notification-fade-enter {
    opacity: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;
  }
  .rc-notification-fade-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;
  }
  .rc-notification-fade-enter.rc-notification-fade-enter-active {
    animation-name: ${fadeIn};
    animation-play-state: running;
  }
  .rc-notification-fade-leave.rc-notification-fade-leave-active {
    animation-name: ${fadeOut};
    animation-play-state: running;
  }
`;
