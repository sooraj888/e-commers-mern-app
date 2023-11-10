import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function StarSlider({
  maxValue = 5,
  minValue = 0,
  onChange,
}: {
  maxValue?: number;
  minValue?: number;
  onChange: (e: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(0);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
    color: "gray",
  };
  const [stars, setStars] = useState(0);
  useEffect(() => {
    setStars(
      sliderValue == 0
        ? 0
        : sliderValue < 9
        ? 0.5
        : sliderValue < 19
        ? 1
        : sliderValue < 29
        ? 1.5
        : sliderValue < 39
        ? 2
        : sliderValue < 49
        ? 2.5
        : sliderValue < 59
        ? 3
        : sliderValue < 69
        ? 3.5
        : sliderValue < 79
        ? 4
        : sliderValue < 89
        ? 4.5
        : 5
    );
  }, [sliderValue]);

  return (
    <Box mt={2} pt={2} pb={4}>
      <Slider
        onChangeEnd={() => {
          onChange(stars);
        }}
        defaultValue={0}
        ringColor={"red"}
        w={"90%"}
        m={"0px 5%"}
        aria-label="slider-ex-6"
        onChange={(val) => {
          setSliderValue(val);
          // console.log(val);
        }}
      >
        <SliderMark value={0} {...labelStyles}>
          {0}
        </SliderMark>
        <SliderMark value={20} {...labelStyles}>
          {1}
        </SliderMark>
        <SliderMark value={40} {...labelStyles}>
          {2}
        </SliderMark>
        <SliderMark value={60} {...labelStyles}>
          {3}
        </SliderMark>
        <SliderMark value={80} {...labelStyles}>
          {4}
        </SliderMark>
        <SliderMark value={100} {...labelStyles}>
          {5}
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="gray.300"
          color="black"
          mt="-8"
          ml="-5"
          w="10"
          padding={"2px 0px"}
          borderRadius={"10px"}
          fontSize={{ base: "1.5vmax", sm: "1.4vmax", md: "0.9vmax" }}
        >
          ⭐
          {(() => {
            return sliderValue == 0
              ? 0
              : sliderValue < 9
              ? 0.5
              : sliderValue < 19
              ? 1
              : sliderValue < 29
              ? 1.5
              : sliderValue < 39
              ? 2
              : sliderValue < 49
              ? 2.5
              : sliderValue < 59
              ? 3
              : sliderValue < 69
              ? 3.5
              : sliderValue < 79
              ? 4
              : sliderValue < 89
              ? 4.5
              : 5;
          })()}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bg={"blue"} />
      </Slider>
    </Box>
  );
}
