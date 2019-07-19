import React, { SVGProps } from 'react';

const SvgCircleSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 512 512" {...props}>
    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
  </svg>
);

export default SvgCircleSolid;
