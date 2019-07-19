import React, { Component } from 'react';
import classNames from 'classnames';

interface Props {
  duration?: number;
  update?: any;
  onClose?(): void;
  className?: string;
  closable?: boolean;
  prefixCls?: string;
  style?: object;
  onClick?(): void;
  closeIcon?: React.ReactNode;
}

export default class Notice extends Component<Props> {
  static defaultProps = {
    onEnd() {},
    onClose() {},
    duration: 1.5,
    style: {
      right: '50%',
    },
  };
  closeTimer: any;

  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.duration !== prevProps.duration || this.props.update) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    this.clearCloseTimer();
    this.props.onClose!();
  };

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  };

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  restartCloseTimer() {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render() {
    const props = this.props;
    const componentClass = `${props.prefixCls}-notice`;
    const className = {
      [`${componentClass}`]: 1,
      [`${componentClass}-closable`]: props.closable,
      [props.className!]: !!props.className,
    };
    return (
      <div
        className={classNames(className)}
        style={props.style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
        onClick={props.onClick}
      >
        <div className={`${componentClass}-content`}>{props.children}</div>
        {props.closable ? (
          <a tabIndex={0} onClick={this.close} className={`${componentClass}-close`}>
            {props.closeIcon || <span className={`${componentClass}-close-x`} />}
          </a>
        ) : null}
      </div>
    );
  }
}
