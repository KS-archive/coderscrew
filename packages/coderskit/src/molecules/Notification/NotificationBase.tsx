import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import createChainedFunction from 'rc-util/lib/createChainedFunction';
import classnames from 'classnames';
import Notice from './Notice';

let seed = 0;
const now = Date.now();

interface Props {
  transitionName?: string;
  animation?: string;
  prefixCls?: string;
  className?: string;
  maxCount?: number;
  closeIcon?: React.ReactNode;
  style: object;
}

interface NoticeProps {
  key?: string;
  updateKey?: string;
  content?: any;
  add(props: NoticeProps): void;
  remove(key: string): void;
  onClick?(): void;
  onClose?(): void;
}

interface State {
  notices: NoticeProps[];
}

function getUuid() {
  return `rcNotification_${now}_${seed++}`;
}

class Notification extends Component<Props, State> {
  static defaultProps = {
    prefixCls: 'rc-notification',
    animation: 'fade',
    style: {
      top: 65,
      left: '50%',
    },
  };

  static newInstance: any;

  state: State = {
    notices: [],
  };

  getTransitionName(): string {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName!;
  }

  add = (notice: NoticeProps) => {
    const key = (notice.key = notice.key || getUuid());
    const { maxCount } = this.props;
    this.setState(previousState => {
      const notices = previousState.notices;
      const noticeIndex = notices.map(v => v.key).indexOf(key);
      const updatedNotices = notices.concat();
      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, notice);
      } else {
        if (maxCount && notices.length >= maxCount) {
          notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
          updatedNotices.shift();
        }
        updatedNotices.push(notice);
      }
      return {
        notices: updatedNotices,
      };
    });
  };

  remove = (key: string) => {
    this.setState(previousState => {
      return {
        notices: previousState.notices.filter(notice => notice.key !== key),
      };
    });
  };

  render() {
    const props = this.props;
    const { notices } = this.state;
    const noticeNodes: any = notices.map((notice, index) => {
      const update = Boolean(index === notices.length - 1 && notice.updateKey);
      const key = notice.updateKey ? notice.updateKey : notice.key;
      const onClose: any = createChainedFunction(this.remove.bind(this, notice.key!), notice.onClose!);
      return (
        <Notice
          prefixCls={props.prefixCls}
          {...notice}
          key={key}
          update={update}
          onClose={onClose}
          onClick={notice.onClick}
          closeIcon={props.closeIcon}
        >
          {notice.content}
        </Notice>
      );
    });
    const className = {
      [props.prefixCls!]: 1,
      [props.className!]: !!props.className,
    };
    return (
      <div className={classnames(className)} style={props.style}>
        <Animate transitionName={this.getTransitionName()}>{noticeNodes}</Animate>
      </div>
    );
  }
}

Notification.newInstance = function newNotificationInstance(properties: any, callback: (notice: any) => any) {
  const { getContainer = null, ...props } = properties || {};
  const div = document.createElement('div');
  if (getContainer) {
    const root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  let called = false;
  function ref(notification: NoticeProps) {
    if (called) {
      return;
    }
    called = true;
    callback({
      notice(noticeProps: NoticeProps) {
        notification.add(noticeProps);
      },
      removeNotice(key: string) {
        notification.remove(key);
      },
      component: notification,
      destroy() {
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode!.removeChild(div);
      },
    });
  }
  return ReactDOM.createPortal(<Notification {...props} ref={ref} />, div);
};

export default Notification;
