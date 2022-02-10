export const getThumbnail = file => {
  const fileReader = new FileReader();
  if (file.type.match('image')) {
    fileReader.onload = function () {
      const img = document.createElement('img');
      console.log(img);
      img.src = fileReader.result;
      const removeImg = document.querySelector('#thumbnail img');
      if (removeImg) {
        document.querySelector('#thumbnail').removeChild(removeImg);
      }
      document.querySelector('#thumbnail').appendChild(img);
    };
    fileReader.readAsDataURL(file);
  } else {
    fileReader.onload = function () {
      var blob = new Blob([fileReader.result], { type: file.type });
      var url = URL.createObjectURL(blob);
      var video = document.createElement('video');
      var timeupdate = function () {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
          video.pause();
        }
      };
      video.addEventListener('loadeddata', function () {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
        }
      });
      var snapImage = function () {
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        var image = canvas.toDataURL();
        var success = image.length > 100000;
        if (success) {
          var img = document.createElement('img');
          img.src = image;
          const removeImg = document.querySelector('#thumbnail img');
          if (removeImg) {
            document.querySelector('#thumbnail').removeChild(removeImg);
          }
          document.querySelector('#thumbnail').appendChild(img);
          URL.revokeObjectURL(url);
        }
        return success;
      };
      video.addEventListener('timeupdate', timeupdate);
      video.preload = 'metadata';
      video.src = url;
      // Load video in Safari / IE11
      video.muted = true;
      video.playsInline = true;
      video.play();
    };
    fileReader.readAsArrayBuffer(file);
  }
};
