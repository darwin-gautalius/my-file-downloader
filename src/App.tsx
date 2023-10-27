import { useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

import { MyFile } from "./interfaces";
import { sleep } from "./helpers";
import { MyFileUI } from "./MyFileUI";

const maxParallelDownload = 3;

const initialFileState: MyFile[] = [
  { name: "my-file-1.txt", downloadTime: 2000 },
  { name: "my-file-2.txt", downloadTime: 1000 },
  { name: "my-file-3.txt", downloadTime: 1500 },
  { name: "my-file-4.txt", downloadTime: 2500 },
  { name: "my-file-5.txt", downloadTime: 3500 },
  { name: "my-file-6.txt", downloadTime: 3000 },
  { name: "my-file-7.txt", downloadTime: 2000 }
];

export default function App() {
  const [myFiles, setMyFiles] = useState<MyFile[]>(initialFileState);
  const [isDownloading, setIsDownloading] = useState(false);
  const [finishTime, setFinishTime] = useState(0);

  const countRef = useRef(0);

  const setFile = (index: number, file: MyFile) => {
    setMyFiles((prevState) => {
      const newState = prevState.slice();
      newState.splice(index, 1, file);

      return newState;
    });
  };

  const downloadFileByIndex = async (index: number) => {
    let file = myFiles[index];
    setFile(index, { ...file, isDownloading: true });
    await sleep(file.downloadTime);
    setFile(index, { ...file, isDone: true });
  };

  const downloadFiles = async (myFiles: MyFile[], parallel: number) => {
    /**
     * TODO: change the implementation to download files in parallel
     */

    for (let i = 0; i < myFiles.length; i++) {
      await downloadFileByIndex(i);
    }
  };

  const reset = async () => {
    setIsDownloading(false);
    setMyFiles(initialFileState);
    setFinishTime(0);
  };

  const handleDownloadButtonClick = async () => {
    countRef.current = 0;
    reset();
    setIsDownloading(true);
    const start = performance.now();
    await downloadFiles(myFiles, maxParallelDownload);
    setIsDownloading(false);
    setFinishTime(performance.now() - start);
  };

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        My File Downloader
      </Typography>

      <Stack spacing={2}>
        {myFiles.map((myFile) => (
          <MyFileUI key={myFile.name} file={myFile} />
        ))}
      </Stack>

      <Typography variant="caption" gutterBottom color="success.main">
        {finishTime > 0 && `Finished downloading the file in ${finishTime}ms`}
        &nbsp;
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleDownloadButtonClick}
          disabled={isDownloading}
        >
          Download all files
        </Button>
      </Stack>
    </Stack>
  );
}
