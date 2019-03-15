import theme from "styled-theming"
import { theme as smoothTheme } from "@smooth-ui/core-sc"
import { greys, breakpoints, fontSizes } from "./constants"

export const defaultTheme = {
  ...smoothTheme,
  primary: "white",
  mode: "dark",
  variant: "primary",
  breakpoints: Object.values(breakpoints),
  fontSizes,
}

export const backgroundColor = theme.variants("mode", "variant", {
  primary: {
    dark: "black",
    secondary: greys["900"],
  },
})

export const foregroundColor = theme.variants("mode", "variant", {
  primary: greys["700"],
  secondary: greys["800"],
})

export const textColor = theme.variants("mode", "variant", {
  primary: {
    dark: "white",
  },
  secondary: {
    dark: greys["400"],
  },
})

export const borderColor = theme.variants("mode", "variant", {
  primary: {
    dark: "white",
  },
  secondary: {
    dark: greys["100"],
  },
})
