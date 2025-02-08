document.addEventListener('DOMContentLoaded', () => {
  const dropArea = document.body;

  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    for (const file of files) {
      console.log('変換開始:', file.name);
      convertMedia(file).then(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
          link.click();
        }
      });
    }
  });


  async function convertMedia(mediaFile) {
    return new Promise(async (resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(mediaFile);
      reader.onload = async (event) => {
        const audioCtx = new AudioContext();
        const audioBuffer = await audioCtx.decodeAudioData(event.target.result);

        const offlineAudioCtx = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate
        );

        const source = offlineAudioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(offlineAudioCtx.destination);
        source.start(0);


        offlineAudioCtx.oncomplete = (e) => {
          const renderedBuffer = e.renderedBuffer;
          const blob = bufferToWave(renderedBuffer, 0, renderedBuffer.length);
          resolve(blob);
        }

        offlineAudioCtx.startRendering();
      }
    });
  }

  function bufferToWave(abuffer, offset, len) {
    const numChannels = abuffer.numberOfChannels;
    const sampleRate = abuffer.sampleRate;

    const pcmData = new Float32Array(len * numChannels);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = abuffer.getChannelData(channel);
      for (let i = 0; i < len; i++) {
        pcmData[i * numChannels + channel] = channelData[offset + i];
      }
    }

    const waveData = pcmToWave(pcmData, numChannels, sampleRate);
    const blob = new Blob([waveData], { type: 'audio/wav' });
    return blob;
  }


  function pcmToWave(pcmData, numChannels, sampleRate) {
    const dataLength = pcmData.length * 2;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);

    let offset = 44;
    for (let i = 0; i < pcmData.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, pcmData[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Uint8Array(buffer);
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
});