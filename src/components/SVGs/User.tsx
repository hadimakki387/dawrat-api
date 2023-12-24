interface Props {
  size?: number;
  fill?: string;
}

function User({ size=16, fill }: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="user"
      className="svg-inline--fa fa-user "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={size}
      height={size}
    >
      <g className="fa-duotone-group">
        <path
          className="fa-secondary"
          fill={fill}
          d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128z"
        ></path>
        <path
          className="fa-primary"
          fill={fill}
          d="M0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
        ></path>
      </g>
    </svg>
  );
}

export default User;
