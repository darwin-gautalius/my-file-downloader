import { Box, Stack, Typography } from "@mui/material";
import { MyFile } from "./interfaces";

interface MyFileUIProps {
  file: MyFile;
}

export function MyFileUI({ file }: MyFileUIProps) {
  const borderColor = file.isDownloading
    ? "info.main"
    : file.isDone
    ? "success.main"
    : "grey.300";
  const backgroundColor = file.isDownloading
    ? "info.light"
    : file.isDone
    ? "success.light"
    : "grey.50";
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        sx={{
          width: 16,
          height: 16,
          border: "solid 1px",
          borderColor,
          backgroundColor,
          borderRadius: "50%"
        }}
      />
      <Typography variant="caption">{file.name}</Typography>
    </Stack>
  );
}
