import styled from "styled-components";

interface IStatusImage {
  $size?: string;
}

export const StatusImage = styled.img<IStatusImage>`
  --size: ${({ $size }) => $size || "24px"};
  height: var(--size);
  width: var(--size);
`;
