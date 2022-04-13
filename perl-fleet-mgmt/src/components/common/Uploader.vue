<template>
  <div>
    <vue-anka-cropper
    :options="{aspectRatio: 1,
               closeOnSave: true,
               cropArea: 'box',
               croppedHeight: 400,
               croppedWidth: 400,
               cropperHeight: false,
               dropareaMessage: 'Drop file here or use the button below.',
               frameLineDash: [5,3],
               frameStrokeColor: 'rgba(255, 255, 255, 0.8)',
               handleFillColor: 'rgba(255, 255, 255, 0.2)',
               handleHoverFillColor: 'rgba(255, 255, 255, 0.4)',
               handleHoverStrokeColor: 'rgba(255, 255, 255, 1)',
               handleSize: 10,
               handleStrokeColor: 'rgba(255, 255, 255, 0.8)',
               layoutBreakpoint: 850,
               maxCropperHeight: 768,
               maxFileSize: 8000000,
               overlayFill: 'rgba(0, 0, 0, 0.5)',
               previewOnDrag: true,
               previewQuality: 0.65,
               resultQuality: 0.8,
               resultMimeType: 'image/jpeg',
               selectButtonLabel: 'Select Files',
               showPreview: true,
               skin: 'light',
               uploadData: {},
               uploadTo: false}"
    ></vue-anka-cropper>
  </div>
</template>

<script>

import vueAnkaCropper from 'vue-anka-cropper'
export default {
  name: 'Uploader',
  component: { vueAnkaCropper }

}
</script>

<style scoped>
@import '../../../node_modules/vue-anka-cropper/dist/VueAnkaCropper.css';

</style>
