import React from 'react';
import RCNotification from './NotificationBase';
import { NoticeProps } from 'rc-notification';
import { math } from 'polished';
import styled from '@emotion/styled';
import { Icon, Typography, Theme, ThemeColorsKeys } from '../..';

import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';
import ExclamationTriangleSolid from '../../icons/ExclamationTriangleSolid';
import InfoCircleSolid from '../../icons/InfoCircleSolid';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type NotificationVariant = 'contained' | 'outlined';

type NotificationKind = 'info' | 'success' | 'warning' | 'error' | 'default';

interface Props {
  message: string;
  variant?: NotificationVariant;
  kind?: NotificationKind;
}

type ContainerProps = Omit<Props, 'message'>;

type Config = Omit<NoticeProps, 'content'>;

const getColor = (kind: NotificationKind, { colors }: Theme, isOutlined?: boolean) => {
  if (kind === 'error') return colors.error;
  if (kind === 'info') return colors.info;
  if (kind === 'success') return colors.success;
  if (kind === 'warning') return colors.warning;
  return isOutlined ? colors.border : colors.white;
};

const getIconData = (kind: NotificationKind) => {
  if (kind === 'error') return { icon: ExclamationCircleSolid, kind: 'error' as ThemeColorsKeys };
  if (kind === 'info') return { icon: InfoCircleSolid, kind: 'info' as ThemeColorsKeys };
  if (kind === 'success') return { icon: CheckCircleSolid, kind: 'success' as ThemeColorsKeys };
  if (kind === 'warning') return { icon: ExclamationTriangleSolid, kind: 'warning' as ThemeColorsKeys };
  return null;
};

const NotificationBase = styled.div<ContainerProps>(({ theme: { radii, fontSizes, lineHeights } }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 240,
  borderRadius: radii.small,
  fontSize: fontSizes.body2,
  lineHeight: lineHeights.body2,
  fontWeight: 400,
}));

const ContainedNotification = styled(NotificationBase)<ContainerProps>(({ theme, kind }) => ({
  boxShadow: theme.shadows.md,
  padding: `${theme.space[12]} ${theme.space[16]}`,
  backgroundColor: getColor(kind!, theme),
  '.cc-typography': {
    color: kind === 'default' ? theme.colors.fontRegular : theme.colors.white,
  },
}));

const OutlinedNotification = styled(NotificationBase)<ContainerProps>(({ theme, kind }) => ({
  boxShadow: theme.shadows.sm,
  padding: `${math(`${theme.space[12]} - 1`)} ${math(`${theme.space[16]} - 1`)}`,
  backgroundColor: theme.colors.white,
  border: `${theme.borderWidths.regular} solid ${getColor(kind!, theme, true)}`,
  color: theme.colors.fontRegular,
}));

const Notification: React.FC<Props> = ({ message, ...props }) => {
  const NotificationComponent = props!.variant === 'contained' ? ContainedNotification : OutlinedNotification;
  const iconData = props!.variant === 'contained' ? getIconData(props.kind!) : getIconData(props.kind!);

  if (props!.variant === 'contained' && iconData) {
    iconData.kind = 'white';
  }

  return (
    <NotificationComponent {...props}>
      {iconData && <Icon {...iconData} size={24} />}
      <Typography style={{ marginLeft: 16 }}>{message}</Typography>
    </NotificationComponent>
  );
};

Notification.defaultProps = {
  variant: 'contained',
  kind: 'default',
};

let notification: any = null;

export const notify = (message: string, config?: Config, props?: ContainerProps) => {
  const compProps: Props = { ...props, message };

  notification.notice({
    content: <Notification {...compProps} />,
    ...config,
  });
};

export const initializeNotifications = () => RCNotification.newInstance({}, (n: any) => (notification = n));
