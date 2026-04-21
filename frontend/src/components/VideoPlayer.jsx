import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ streamUrl, streamType }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (streamType === 'hls' && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    video.src = streamUrl;
  }, [streamUrl, streamType]);

  return <video ref={ref} controls className="w-full rounded bg-black" />;
}
