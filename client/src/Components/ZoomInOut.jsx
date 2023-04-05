import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

const ZoomBox = () => {
  const [scale, setScale] = useState(1);

  function handleZoomIn() {
    setScale(scale + 0.1);
  }

  function handleZoomOut() {
    setScale(scale - 0.1);
  }

  return (
    <Box
      w="400px"
      h="400px"
      transform={`scale(${scale})`}
      transition="transform 0.2s ease-out"
    >
      <Button onClick={handleZoomIn}>Zoom In</Button>
      <Button onClick={handleZoomOut}>Zoom Out</Button>
    </Box>
  );
};

export default ZoomBox;
