import React from "react";
import { Typography, useTheme } from "@mui/material";

import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dar;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsorred
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
        <FlexBetween>
          <img
            width="100%"
            height="auto"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            src="http://localhost:3001/assets/info4.jpeg"
            alt="Advert"
          />
          <FlexBetween>
            <Typography color={main}>Mikacosmetics</Typography>
            <Typography color={medium}>mikacosmetics.com</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Yout pathway to stunning and immaculate beauty and mode sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
