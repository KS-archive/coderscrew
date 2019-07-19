import React, { LabelHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Omit } from 'utility-types';
import { Typography } from '../../atoms/Typography';

export interface LabelProps extends Omit<LabelHTMLAttributes<any>, 'color'> {
  children?: React.ReactNode;
  width?: string | number;
}

const LabelContainer = styled(Typography)(props => {
  const { width, disabled, theme } = props;
  const { space, colors } = theme;

  return {
    display: 'flex',
    alignItems: 'center',
    height: 20,
    width: width || '100%',
    paddingLeft: space[4],
    color: disabled ? colors.fontDisabled : colors.fontPrimary,
  };
});

export const Label = (props: LabelProps) => {
  const className = classnames(props.className, 'cc-label');

  return (
    <LabelContainer {...props} className={className} el="label">
      {props.children}
    </LabelContainer>
  );
};
