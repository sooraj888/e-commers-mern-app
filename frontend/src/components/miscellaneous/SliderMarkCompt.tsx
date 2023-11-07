import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function SliderMarkCompt({
  maxValue,
  minValue,
  onChange,
}: {
  maxValue: number;
  minValue: number;
  onChange: (e: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(80);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box pt={6} pb={2}>
      <Slider
        ringColor={"red"}
        w={"90%"}
        m={"0px 5%"}
        aria-label="slider-ex-6"
        onChange={(val) => {
          setSliderValue(val);
          onChange(
            Math.round(((maxValue - minValue) * sliderValue) / 100 + minValue)
          );
        }}
      >
        <SliderMark value={0} {...labelStyles}>
          &#8377;{minValue || 0}
        </SliderMark>
        <SliderMark value={25} {...labelStyles}>
          &#8377;{Math.round((maxValue - minValue) / 4 + minValue)}
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          &#8377;{Math.round((maxValue - minValue) / 2 + minValue)}
        </SliderMark>
        <SliderMark value={75} {...labelStyles}>
          &#8377;
          {Math.round((maxValue - minValue) / (4 / 3) + minValue)}
        </SliderMark>
        <SliderMark value={100} {...labelStyles}>
          &#8377;{maxValue}
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="20"
          borderRadius={"10px"}
          fontSize={{ base: "1.5vmax", sm: "1.4vmax", md: "0.9vmax" }}
        >
          &#8377;
          {Math.round(((maxValue - minValue) * sliderValue) / 100 + minValue)}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bg={"blue"} />
      </Slider>
    </Box>
  );
}
