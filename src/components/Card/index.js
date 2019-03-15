import React from "react"
import PropTypes from "prop-types"
import { Card as CoreCard } from "rebass"
import styled from "styled-components"
import { borderWidth, borderRadius } from "../../constants"
import { borderColor } from "../../theme"

const Card = styled(CoreCard)`
  border: ${borderWidth} solid ${borderColor};
  border-radius: ${borderRadius};
`

Card.defaultProps = {
  variant: "primary",
}

export default Card
