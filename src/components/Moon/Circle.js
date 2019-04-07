import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import styled, { css } from 'styled-components';
import lune from 'lune';

const Wrapper = styled(Flex)`
  position: relative;
  transition: transform 1s;
  ${({ size, rotation }) => css`
    width: ${size}px;
    height: ${size}px;
    transform: rotate(${rotation}rad);
  `}
`;

const Half = styled(Box).attrs({ width: 1 })`
  overflow: hidden;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  ${({ invert }) =>
    invert &&
    css`
      transform: scaleX(-1);
    `}
`;

const getNormalizedPhase = phase => (phase <= 0.5 ? phase : 1 - phase);

const getRotationRad = phase => {
  const normalizedPhase = getNormalizedPhase(phase);
  const rad = (Math.PI * normalizedPhase) / 0.5;
  return rad;
};

const Difference = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  background: ${({ phase }) =>
    0.5 / getNormalizedPhase(phase) > 2 ? 'black' : 'white'};
  ${({ size, phase }) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    transform: translateX(-50%) rotateY(${getRotationRad(phase)}rad);
  `}
`;

const Circle = styled.div`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `}
  border-radius: 50%;
  background: white;
`;

const MoonCircle = ({ size, date, rotation, ...props }) => {
  const { phase } = lune.phase(new Date());
  return (
    <Wrapper rotation={rotation} size={size} {...props}>
      <Half size={size} isVisible={phase <= 0.5}>
        <Circle size={size} />
      </Half>
      <Difference size={size} phase={phase} />
      <Half size={size} invert isVisible={phase >= 0.5}>
        <Circle size={size} />
      </Half>
    </Wrapper>
  );
};

MoonCircle.propTypes = {
  size: PropTypes.number,
  moon: PropTypes.object.isRequired,
  rotation: PropTypes.number,
};

MoonCircle.defaultProps = {
  size: 80,
  rotation: 0,
};

export default MoonCircle;
