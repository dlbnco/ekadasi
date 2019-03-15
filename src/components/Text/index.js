import { Text as CoreText } from "rebass"
import styled from "styled-components"
import { textColor } from "../../theme"

const Text = styled(CoreText)`
  color: ${textColor};
`

Text.defaultProps = {
  variant: "primary",
  fontSize: 1,
}

export default Text
