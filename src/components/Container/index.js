import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { space } from "styled-system"
import { breakpoints } from "../../constants"

const Container = styled.div`
  ${space}
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  ${p =>
    !p.fluid &&
    css`
      @media (min-width: ${breakpoints.sm}) {
        max-width: 540px;
      }
      @media (min-width: ${breakpoints.md}) {
        max-width: 720px;
      }
      @media (min-width: ${breakpoints.lg}) {
        max-width: 960px;
      }
      @media (min-width: ${breakpoints.xl}) {
        max-width: 1140px;
      }
    `}
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px !important;
    `}
`

Container.defaultProps = {
  fluid: false,
  compact: false,
  px: 3,
  maxWidth: undefined,
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
  maxWidth: PropTypes.number,
}

export default Container
