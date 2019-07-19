declare module 'rc-notification' {
  import React from 'react';

  export interface NotificationProps {
    /** prefix class name for notification container */
    prefixCls?: string;
    /** additional style for notification container. */
    style?: object;
    /** function returning html node which will act as notification container */
    getContainer?(): HTMLElement;
  }

  export interface NoticeProps {
    /** content of notice */
    content: React.ReactNode;
    /** id of this notice */
    key?: string;
    /** whether show close button */
    closable?: boolean;
    /** called when notice close */
    onClose?(): void;
    /** after duration of time, this notice will disappear.(seconds) */
    duration?: number;
    /** additional style for single notice node. */
    style?: object;
    /** max notices show, drop first notice if exceed limit */
    maxCount?: number;
    /** specific the close icon. */
    closeIcon?: React.ReactNode;
  }

  export interface Notification {
    notice(props: NoticeProps): void;
    /**
     * remove single notice with specified key
     * @param key id of this notice
     */
    removeNotice(key: string): void;
    /** destroy current notification */
    destroy(): void;
  }

  /**
   * create new notification instance
   * @param props notification props
   * @param callback
   */
  export function newInstance(props: NotificationProps, callback: (n: Notification) => void): void;
}
