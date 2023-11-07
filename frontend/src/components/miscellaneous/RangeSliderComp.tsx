import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function RangeSliderComp({
  priceRange,
  setPriceRange,
  min,
  max,
}: {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  min: number;
  max: number;
}) {
  const handleChange = (value: any) => {
    setPriceRange(value);
  };

  return (
    <Box>
      <Text>
        Price: &#8377;{priceRange[0]} - &#8377;{priceRange[1]}
      </Text>

      <RangeSlider
        colorScheme="teal"
        defaultValue={[min, max]}
        min={min}
        max={max}
        step={10}
        onChange={handleChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} bg={"teal.500"} />
        <RangeSliderThumb index={1} bg={"teal.500"} />
      </RangeSlider>
    </Box>
  );
}
