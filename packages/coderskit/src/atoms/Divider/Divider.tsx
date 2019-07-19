import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string;
}

const PureDivider = styled.div<DividerProps>(props => {
  const { colors } = props.theme;

  return {
    height: 1,
    backgroundColor: colors.border,
  };
});

const ContentDivider = styled.div<DividerProps>(props => {
  const { fontSizes, fontWeights, colors, space } = props.theme;

  return {
    display: 'flex',
    alignItems: 'center',
    fontSize: fontSizes.caption1,
    fontWeight: fontWeights.medium,
    textTransform: 'uppercase',
    lineHeight: '1px',
    color: colors.fontPlaceholder,

    '&::before, &::after': {
      content: '""',
      backgroundColor: colors.border,
      flex: 1,
      height: '1px',
    },

    '&::before': {
      marginRight: space[12],
    },

    '&::after': {
      marginLeft: space[12],
    },
  };
});

export const Divider = (props: DividerProps) => {
  const { children } = props;
  const Component = children ? ContentDivider : PureDivider;
  const className = classnames(props.className, 'cc-divider');

  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
};
