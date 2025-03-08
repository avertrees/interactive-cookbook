import { defineConfig, definePattern, PatternProperties } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",

  globalCss: {
    body: {
      fontFamily: "sans",
    },
  },

  patterns: {
    extend: {
      grid: {
        description: "A grid container",
        properties: {
          display: "grid",
          gridTemplateColumns: "gridTemplateColumns",
          gridTemplateRows: "gridTemplateRows",
          gap: "gap",
        } as any,
      },
      flex: {
        description: "A flex container",
        properties: {
          display: "flex",
          flexDirection: "flexDirection",
          alignItems: "alignItems",
          justifyContent: "justifyContent",
          gap: "gap",
          wrap: "flexWrap",
        } as any,
      },
      hstack: {
        description: "A horizontal flex stack",
        base: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        },
        properties: {
          gap: "gap",
          justifyContent: "justifyContent",
        } as any,
      },
      vstack: {
        description: "A vertical flex stack",
        base: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
        properties: {
          gap: "gap",
          justifyContent: "justifyContent",
        } as any,
      },
      card: {
        description: "A card container",
        base: {
          display: "flex",
          flexDirection: "column",
          borderRadius: "md",
          boxShadow: "sm",
          padding: "4",
          backgroundColor: "white",
          border: "1px solid",
          borderColor: "gray.200",
        },
        properties: {
          borderRadius: "borderRadius",
          boxShadow: "boxShadow",
          padding: "padding",
          backgroundColor: "backgroundColor",
        } as any,
      },
      label: {
        description: "A form label",
        base: {
          fontSize: "md",
          fontWeight: "bold",
        },
        properties: {
          fontSize: "fontSize",
          fontWeight: "fontWeight",
          color: "color",
          cursor: "cursor",
        } as any,
      },
      button: {
        description: "A button",
        base: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          paddingX: "4",
          paddingY: "2",
          borderRadius: "md",
          backgroundColor: "blue.500",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.2s",
          _hover: {
            backgroundColor: "blue.600",
          },
          _active: {
            backgroundColor: "blue.700",
          },
        },
        properties: {
          backgroundColor: "backgroundColor",
          color: "color",
          fontSize: "fontSize",
          fontWeight: "fontWeight",
          padding: "padding",
          borderRadius: "borderRadius",
        } as any,
      },
      input: {
        description: "A text input field",
        base: {
          width: "full",
          padding: "2",
          borderRadius: "md",
          border: "1px solid",
          borderColor: "gray.300",
          _focus: {
            borderColor: "blue.500",
            outline: "none",
          },
        },
        properties: {
          width: "width",
          padding: "padding",
          borderRadius: "borderRadius",
          borderColor: "borderColor",
        } as any,
      },
  }
});
