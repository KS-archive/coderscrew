import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { RadioProps } from '../..';

interface RadioGroupContainerProps extends React.HTMLAttributes<any> {
  layout?: RadioGroupLayout;
  spaceBetween?: number;
}

export type RadioGroupLayout = 'vertical' | 'horizontal';

export interface RadioGroupProps extends RadioGroupContainerProps {
  name: string;
  children: React.ReactElement<RadioProps>[];
}

// @ts-ignore
const RadioGroupContainer = styled.div<RadioGroupContainerProps>(props => {
  const { layout, spaceBetween } = props;
  const isHorizontal = layout === 'horizontal';

  return {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',

    '.cc-radio + .cc-radio': {
      marginTop: !isHorizontal && spaceBetween,
      marginLeft: isHorizontal && spaceBetween,
    },
  };
});

export const RadioGroup = ({ children, name, ...props }: RadioGroupProps) => {
  props.className = classnames(props.className, 'cc-radio-group');

  const childrenWithNames = React.Children.map(children, child => React.cloneElement(child, { name }));

  return <RadioGroupContainer {...props}>{childrenWithNames}</RadioGroupContainer>;
};

RadioGroup.defaultProps = {
  options: [],
  layout: 'vertical',
  spaceBetween: 12,
};
