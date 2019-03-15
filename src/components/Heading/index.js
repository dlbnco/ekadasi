import { Heading as CoreHeading } from "rebass"
import styled from "styled-components"
import { textColor } from "../../theme"

const Heading = styled(CoreHeading)`
  color: ${textColor};
`

Heading.defaultProps = {
  variant: "primary",
}

export default Heading
